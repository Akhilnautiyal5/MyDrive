const express = require("express");
const router = express.Router();
const { storage } = require("../config/appwrite.config");
const { upload } = require("../config/multer.config");
const { ID, InputFile } = require("node-appwrite");
const fs = require("fs");
const path = require("path");
const filesModel = require("../models/files.model");
const auth = require("../middleware/auth.middleware");

router.get("/home", auth, (req, res) => {
	res.render("home");
});

router.post("/upload", auth, upload.single("file"), async (req, res) => {
	const file = req.file;
	if (!file) {
		return res.status(400).json({ error: "No file uploaded" });
	} else if (file.size === 0) {
		return res.status(400).json({ error: "Uploaded file is empty." });
	}

	try {
		const bucketId = process.env.APPWRITE_BUCKET_ID;

		const uploadedFile = await storage.createFile(
			bucketId,
			ID.unique(),
			InputFile.fromPath(file.path, file.originalname)
		);

		await fs.promises.unlink(file.path);

		const newfile = await filesModel.create({
			name: uploadedFile.name,
			$id: uploadedFile.$id,
			user: req.user._id,
			sizeOriginal: uploadedFile.sizeOriginal,
			mimeType: uploadedFile.mimeType,
			createdAt: uploadedFile.$createdAt,
		});

		res.redirect("/uploaded_files");
		// response for backend
		// return res.json({ success: true, newfile });
	} catch (error) {
		console.error("Error uploading file:", error.message);
		res.status(500).json({ error: "File upload failed." });
	}
});

router.get("/uploaded_files", auth, async (req, res) => {
	const bucketId = process.env.APPWRITE_BUCKET_ID;
	try {
		const userfiles = await filesModel.find({ user: req.user._id });
		
		const files = await Promise.all(
			userfiles.map(async (file) => {
				const pre_file = await storage.getFilePreview(bucketId, file.$id);
				return {
					...file._doc,
					preview: pre_file.toString("base64"),
				};
			})
		);

		res.render("uploaded_files", { files: files });
		// res.send({ files });
	} catch (error) {
		console.error("Error fetching files:", error.message);
		res.status(500).json({ error: "Error fetching files." });
	}
});

router.get("/download/:fileId", async (req, res) => {
	const bucketId = process.env.APPWRITE_BUCKET_ID;
	const fileId = req.params.fileId;
	try {
		const fileMetaData = await storage.getFile(bucketId, fileId);
		if (!fileMetaData) {
			return res.status(404).json({ error: "File not Found" });
		}

		const file = await storage.getFileDownload(bucketId, fileId);
		res.setHeader("Content-Type", fileMetaData.mimeType);
		res.setHeader(
			"Content-Disposition",
			`attachment; filename=${fileMetaData.name}`
		);
		res.send(file);
	} catch (error) {
		console.error("Error fetching files:", error.message);
		res.status(500).json({ error: "Error fetching files." });
	}
});

router.get("/view/:fileId", async (req, res) => {
	const bucketId = process.env.APPWRITE_BUCKET_ID;
	const fileId = req.params.fileId;
	try {
		const fileMetaData = await storage.getFile(bucketId, fileId);
		if (!fileMetaData) {
			return res.status(404).json({ error: "File not Found" });
		}

		const file = await storage.getFileView(bucketId, fileId);
		res.setHeader("Content-Type", fileMetaData.mimeType);
		res.send(file);
	} catch (error) {
		console.error("Error fetching file:", error.message);
		res.status(500).json({ error: "Error fetching file." });
	}
});

router.delete("/delete/:fileId", async (req, res) => {
	const bucketId = process.env.APPWRITE_BUCKET_ID;
	const fileId = req.params.fileId;
	try {
		await filesModel.deleteOne({ $id: fileId });
		const result = await storage.deleteFile(bucketId, fileId);
		res.status(200).json({ message: "File deleted successfully" });
	} catch (error) {
		console.error("Error deleting file:", error.message);
		res.status(500).json({ error: "Error deleting file." });
	}
});

module.exports = router;
