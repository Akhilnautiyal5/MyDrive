const threeDotMenus = document.querySelectorAll(".three-dot-menu");
const menuLists = document.querySelectorAll(".menu-list");
const toDeleteFile = document.getElementById("file-to-delete");
const deletePopup = document.getElementById("delete-popup");
// const { storage } = require("../config/appwrite.config");

document.addEventListener("click", (e) => {
	threeDotMenus.forEach((menu, index) => {
		if (menu.contains(e.target)) {
			menuLists[index].classList.remove("hidden");
		} else {
			menuLists[index].classList.add("hidden");
		}
	});
});

const deleteFile = (fileId, fileName) => {
	toDeleteFile.innerText = fileName;
	deletePopup.classList.remove("hidden");

	document
		.getElementById("confirm-delete")
		.addEventListener("click", async (e) => {
			try {
				const response = await fetch(`/delete/${fileId}`, { method: "DELETE" });
				deletePopup.classList.add("hidden");
				if (response.status === 200) {
					window.location.reload();
				}
			} catch (error) {
				console.error("Error deleting file:", error.message);
			}
		});
	document.getElementById("cancel-delete").addEventListener("click", (e) => {
		deletePopup.classList.add("hidden");
	});
};

deletePopup.addEventListener("click", (e) => {
	if (e.target === e.currentTarget) {
		deletePopup.classList.add("hidden");
	}
});

const fileDetails = (fileName, fileCreatedAt, fileMimeType, fileSize) => {
	const sidebar = document.getElementById("details-sidebar");
	
	// Format the file size
	const fileSizeFormatted =
		fileSize > 1024 ? (fileSize / 1024).toFixed(2) + " MB" : fileSize + " KB";

	// Update the sidebar with file details
	document.getElementById("file-name").innerHTML = fileName;
	document.getElementById("file-created-at").innerHTML = new Date(
		fileCreatedAt
	).toLocaleString();;
	document.getElementById("file-mime-type").innerHTML = fileMimeType;
	document.getElementById("file-size").innerHTML = fileSizeFormatted;

	// Show the sidebar
	sidebar.classList.remove("hidden");

	// Close the sidebar when the "Close" button is clicked
	document.getElementById("close-sidebar").onclick = () => {
		sidebar.classList.add("hidden");
	};
};

