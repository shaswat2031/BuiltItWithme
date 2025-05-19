const cloudinary = require("cloudinary").v2;

cloudinary.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET,
});

/**
 * Uploads a buffer to Cloudinary
 * @param {Buffer} buffer - The file buffer to upload
 * @param {string} fileName - Name of the file
 * @param {string} folder - Folder path in Cloudinary
 * @param {string} resourceType - Type of resource ('auto', 'image', etc)
 * @returns {Promise} Promise with upload result
 */
const uploadBuffer = (
  buffer,
  fileName,
  folder = "uploads",
  resourceType = "auto"
) => {
  return new Promise((resolve, reject) => {
    const uploadOptions = {
      resource_type: resourceType,
      folder: folder,
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

module.exports = {
  cloudinary,
  uploadBuffer,
};
