import { uploadBufferToCloudinary } from "./cloudinaryUtils";

/**
 * Generic function to upload a file buffer to cloud storage
 * @param {Buffer} buffer - The file buffer to upload
 * @param {string} fileName - Original file name
 * @param {string} folder - Folder or prefix for storage
 * @param {string} mimeType - MIME type of the file
 * @returns {Promise<{url: string, downloadUrl: string, provider: string}>}
 */
export async function uploadFileBuffer(
  buffer,
  fileName,
  folder,
  mimeType = "auto"
) {
  try {
    // Use Cloudinary as the primary storage provider
    const result = await uploadBufferToCloudinary(
      buffer,
      fileName,
      folder,
      mimeType
    );

    return {
      url: result.url,
      downloadUrl: result.downloadUrl || result.url,
      provider: "cloudinary",
      publicId: result.publicId,
    };
  } catch (error) {
    console.error("Error uploading file buffer:", error);
    throw new Error(`Failed to upload file: ${error.message}`);
  }
}

/**
 * Processes and uploads a file directly to Cloudinary
 * @param {File} file - The file from FormData
 * @param {string} folderId - ID to use for the folder name
 * @returns {Promise} Promise with upload result
 */
export async function processAndUploadFile(file, folderId) {
  try {
    // Convert File to Buffer
    const bytes = await file.arrayBuffer();
    const buffer = Buffer.from(bytes);

    // Get file name and type
    const fileName = file.name || "untitled";
    const mimeType = file.type || "auto";

    // Upload directly to Cloudinary using buffer
    const result = await uploadBufferToCloudinary(
      buffer,
      fileName,
      folderId,
      mimeType
    );

    return result;
  } catch (error) {
    console.error("Error processing and uploading file:", error);
    throw error;
  }
}
