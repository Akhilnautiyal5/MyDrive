# MyDrive - File Storage and Sharing Platform

MyDrive is a web-based file storage application that allows users to upload, view, and download files securely across different devices. It uses Appwrite as the backend storage solution and implements user authentication for secure file management.

## Features

- 🔐 User authentication (register/login)
- 📁 File upload with drag & drop support
- 🔍 File preview functionality
- ⬇️ File download capabilities
- 📱 Responsive design for multiple devices
- 📊 File metadata display (e.g., file name, size)
- ⚡ Fast file transfer
- 💾 File size limit of 50MB (due to Appwrite's free-tier limit)

## Tech Stack

- **Frontend**: HTML, CSS, JavaScript, TailwindCSS
- **Backend**: Node.js, Express.js
- **Database**: MongoDB
- **Storage**: Appwrite
- **Authentication**: JWT (JSON Web Tokens)
- **File Handling**: Multer (for file uploads)
- **Template Engine**: EJS

## Prerequisites

- Node.js (v14 or higher)
- MongoDB (for database)
- Appwrite account (for storage and authentication)
- npm or yarn (for package management)

## Installation

### 1. Clone the repository
```bash
git clone https://github.com/yourusername/my-drive.git
cd my-drive
```

### 2. Install dependencies
```bash
npm install
```

### 3. Set up the environment variables
Create a `.env` file in the root directory with the following configuration:

```env
CONNECTION_STRING=your_mongodb_connection_string
JWT_SECRET=your_jwt_secret
APPWRITE_ENDPOINT=your_appwrite_endpoint
APPWRITE_PROJECT_ID=your_appwrite_project_id
APPWRITE_API_KEY=your_appwrite_api_key
APPWRITE_BUCKET_ID=your_appwrite_bucket_id
PORT=3001
```

Make sure to replace `your_mongodb_connection_string`, `your_jwt_secret`, and Appwrite-related values with your actual credentials and details. You can get these from your Appwrite console.

### 4. Start the server
Once your environment is set up, you can start the application using:

```bash
npm start
```

The application should be running locally on [http://localhost:3001](http://localhost:3001).

## Usage

1. **Register/Login**: 
   - Register for a new account or login with existing credentials. 
   - JWT tokens are used to authenticate users.

2. **Upload Files**:
   - Use the "Upload File" button or drag and drop files into the application interface.
   - Files up to 50MB in size can be uploaded (Appwrite's free tier limitation).

3. **View Uploaded Files**:
   - After uploading, your files will be displayed in a file gallery where you can preview or download them.

4. **Download Files**:
   - Click on any file to view its details or download it to your local device.

5. **File Details**:
   - View metadata for each uploaded file, including the file name, size, and upload time.

6. **Delete Files**:
   - Remove files from the storage by clicking on the delete option in the three-dot menu in each file.

## Limitations

- Maximum file size: 50MB (due to Appwrite free-tier storage limits)
- Storage space is based on Appwrite free-tier limits
- No preview for files other than images(png, jpeg, etc.)

## API Endpoints

### Authentication
- `POST /user/register` - Register a new user
- `POST /user/login` - User login
- `POST /user/logout` - User logout

### File Operations
- `POST /upload` - Upload file
- `GET /uploaded_files` - Get a list of all uploaded files
- `GET /download/:fileId` - Download a specific file by ID
- `GET /view/:fileId` - View a file (e.g., for images)
- `DELETE /delete/:fileId` - Delete a file by ID

---
