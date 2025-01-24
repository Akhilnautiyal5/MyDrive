const sdk = require("node-appwrite");  // Change this line

// Initialize Appwrite client
const client = new sdk.Client();
client
    .setEndpoint(process.env.APPWRITE_ENDPOINT)
    .setProject(process.env.APPWRITE_PROJECT_ID)
    .setKey(process.env.APPWRITE_API_KEY);

// Initialize Appwrite Storage service
const storage = new sdk.Storage(client);

module.exports = { storage };
