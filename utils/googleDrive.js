import { google } from "googleapis";
import fs from "fs";
import path from "path";

// Create a Google Drive client
export async function createDriveClient() {
  try {
    const auth = new google.auth.GoogleAuth({
      keyFile: path.join(process.cwd(), "google-credentials.json"),
      scopes: ["https://www.googleapis.com/auth/drive"],
    });

    const driveClient = google.drive({
      version: "v3",
      auth,
    });

    return driveClient;
  } catch (error) {
    console.error("Error creating Google Drive client:", error);
    throw new Error("Failed to initialize Google Drive client");
  }
}

// Create a folder in Google Drive
export async function createDriveFolder(folderName) {
  try {
    const driveClient = await createDriveClient();

    // Check if folder already exists
    const response = await driveClient.files.list({
      q: `mimeType='application/vnd.google-apps.folder' and name='${folderName}' and trashed=false`,
      fields: "files(id, name)",
    });

    if (response.data.files.length > 0) {
      console.log(
        `Folder "${folderName}" already exists with ID: ${response.data.files[0].id}`
      );
      return response.data.files[0].id;
    }

    // Create folder if it doesn't exist
    const fileMetadata = {
      name: folderName,
      mimeType: "application/vnd.google-apps.folder",
    };

    const folder = await driveClient.files.create({
      resource: fileMetadata,
      fields: "id",
    });

    console.log(`Folder "${folderName}" created with ID: ${folder.data.id}`);
    return folder.data.id;
  } catch (error) {
    console.error("Error creating Google Drive folder:", error);
    throw new Error("Failed to create Google Drive folder");
  }
}

// Upload a file to Google Drive
export async function uploadFileToDrive(filePath, fileName, folderId = null) {
  try {
    const driveClient = await createDriveClient();

    const fileMetadata = {
      name: fileName,
      ...(folderId && { parents: [folderId] }),
    };

    const media = {
      mimeType: "application/pdf",
      body: fs.createReadStream(filePath),
    };

    const response = await driveClient.files.create({
      requestBody: fileMetadata,
      media,
      fields: "id",
    });

    console.log(`File uploaded to Google Drive with ID: ${response.data.id}`);
    return response.data.id;
  } catch (error) {
    console.error("Error uploading to Google Drive:", error);
    throw new Error("Failed to upload file to Google Drive");
  }
}

// Set file permissions (optional - make file accessible via link)
export async function setFilePubliclyAccessible(fileId) {
  try {
    const driveClient = await createDriveClient();

    await driveClient.permissions.create({
      fileId,
      requestBody: {
        role: "reader",
        type: "anyone",
      },
    });

    const result = await driveClient.files.get({
      fileId,
      fields: "webViewLink, webContentLink",
    });

    return {
      webViewLink: result.data.webViewLink,
      webContentLink: result.data.webContentLink,
      webkitURL: `https://drive.google.com/uc?id=${fileId}`,
    };
  } catch (error) {
    console.error("Error setting file permissions:", error);
    throw error;
  }
}

// Upload a buffer to Google Drive
export async function uploadBufferToDrive(
  buffer,
  fileName,
  mimeType,
  folderId = null
) {
  try {
    const driveClient = await createDriveClient();

    const fileMetadata = {
      name: fileName,
      ...(folderId && { parents: [folderId] }),
    };

    const media = {
      mimeType: mimeType || "application/octet-stream",
      body: buffer,
    };

    const response = await driveClient.files.create({
      requestBody: fileMetadata,
      media,
      fields: "id",
    });

    console.log(`Buffer uploaded to Google Drive with ID: ${response.data.id}`);
    return response.data.id;
  } catch (error) {
    console.error("Error uploading buffer to Google Drive:", error);
    throw new Error("Failed to upload buffer to Google Drive");
  }
}
