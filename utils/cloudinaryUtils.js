import { v2 as cloudinary } from "cloudinary";

// Configure Cloudinary
cloudinary.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET,
});

/**
 * Uploads a buffer to Cloudinary
 * @param {Buffer} buffer - The file buffer to upload
 * @param {string} fileName - Name of the file
 * @param {string} folderId - ID to use for the folder name
 * @param {string} mimeType - Optional MIME type of the file
 * @returns {Promise} Promise with upload result
 */
export const uploadBufferToCloudinary = (
  buffer,
  fileName,
  folderId,
  mimeType = "auto"
) => {
  return new Promise((resolve, reject) => {
    const uploadOptions = {
      resource_type: "auto",
      folder: `builtwithme/${folderId}`,
      public_id: fileName.split(".")[0], // Remove extension from public_id
    };

    const uploadStream = cloudinary.uploader.upload_stream(
      uploadOptions,
      (error, result) => {
        if (error) {
          reject(error);
        } else {
          resolve({
            url: result.secure_url,
            publicId: result.public_id,
            format: result.format,
            downloadUrl: result.secure_url,
          });
        }
      }
    );

    // Convert buffer to stream and pipe to uploadStream
    const Readable = require("stream").Readable;
    const readableStream = new Readable();
    readableStream.push(buffer);
    readableStream.push(null);
    readableStream.pipe(uploadStream);
  });
};

// Export the function with an alternative name for backward compatibility
export const uploadBuffer = uploadBufferToCloudinary;

/**
 * Deletes all resources in a folder and the folder itself
 * @param {string} folderId - ID of the folder to delete
 * @returns {Promise} Promise with deletion result
 */
export const deleteCloudinaryFolder = async (folderId) => {
  try {
    // Delete all resources in the folder
    await cloudinary.api.delete_resources_by_prefix(`builtwithme/${folderId}/`);
    // Delete the folder itself
    await cloudinary.api.delete_folder(`builtwithme/${folderId}`);
    return true;
  } catch (error) {
    console.error("Error deleting Cloudinary folder:", error);
    throw error;
  }
};
