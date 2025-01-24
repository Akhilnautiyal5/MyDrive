// Show Popup
const showPopup = () => {
	document.getElementById("popup").classList.remove("hidden");
};

// Hide Popup
const hidePopup = () => {
	document.getElementById("popup").classList.add("hidden");
};

// Add Event Listeners
document.getElementById("show-popup-btn").addEventListener("click", showPopup);
document.getElementById("close-popup-btn").addEventListener("click", hidePopup);

// Close popup when e.target(anywhere) === e.currentTarget(popup) [popup's child(dropzone) is not popup so false]
document.getElementById("popup").addEventListener("click", (e) => {
	if (e.target === e.currentTarget) hidePopup();
});

// Drag-and-Drop Logic
const dropzone = document.getElementById("dropzone");
const fileInput = document.getElementById("dropzone-file");
const dropzoneContent = document.getElementById("dropzone-content");

// Highlight dropzone on drag events
["dragenter", "dragover"].forEach((event) => {
	dropzone.addEventListener(event, (e) => {
		e.preventDefault();
		e.stopPropagation();
		dropzone.classList.add("border-blue-500", "bg-blue-50");
	});
});

// Remove highlight on dragleave
["dragleave", "drop"].forEach((event) => {
	dropzone.addEventListener(event, (e) => {
		e.preventDefault();
		e.stopPropagation();
		dropzone.classList.remove("border-blue-500", "bg-blue-50");
	});
});

// Handle file drop
dropzone.addEventListener("drop", (e) => {
	e.preventDefault();
	e.stopPropagation();

	const files = e.dataTransfer.files;
	if (files.length) {
		fileInput.files = files; // Assign dropped files to the input element
		dropzoneContent.innerHTML = `<p class="text-sm text-green-500">File selected: ${files[0].name}</p>`;
	}
});

// Handle file selection via input
fileInput.addEventListener("change", (e) => {
	const files = e.target.files;
	if (files.length) {
		dropzoneContent.innerHTML = `<p class="text-sm text-green-500">File selected: ${files[0].name}</p>`;
	}
});
