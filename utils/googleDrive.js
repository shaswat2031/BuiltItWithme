import { google } from 'googleapis';
import fs from 'fs';
import path from 'path';

// Create a Google Drive client
export async function createDriveClient() {
  // This assumes you have set up the credentials in your environment variables
  // or a secure configuration file
  try {
    const auth = new google.auth.GoogleAuth({
      keyFile: path.join(process.cwd(), 'google-credentials.json'),
      scopes: ['https://www.googleapis.com/auth/drive'],
    });

    const driveClient = google.drive({
      version: 'v3',
      auth,
    });

    return driveClient;
  } catch (error) {
    console.error('Error creating Google Drive client:', error);
    throw new Error('Failed to initialize Google Drive client');
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
      mimeType: 'application/pdf',
      body: fs.createReadStream(filePath),
    };

    const response = await driveClient.files.create({
      requestBody: fileMetadata,
      media,
      fields: 'id',
    });

    console.log(`File uploaded to Google Drive with ID: ${response.data.id}`);
    return response.data.id;
  } catch (error) {
    console.error('Error uploading to Google Drive:', error);
    throw new Error('Failed to upload file to Google Drive');
  }
}

// Set file permissions (optional - make file accessible via link)
export async function setFilePubliclyAccessible(fileId) {
  try {
    const driveClient = await createDriveClient();

    await driveClient.permissions.create({
      fileId,
      requestBody: {
        role: 'reader',
        type: 'anyone',
      },
    });

    const result = await driveClient.files.get({
      fileId,
      fields: 'webViewLink, webContentLink',
    });

    return {
      webViewLink: result.data.webViewLink,
      webContentLink: result.data.webContentLink,
    };
  } catch (error) {
    console.error('Error setting file permissions:', error);
    throw error;
  }
}
