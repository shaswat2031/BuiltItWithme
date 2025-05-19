/** @type {import('next').NextConfig} */
const nextConfig = {
  // Existing configuration
  // ...

  // Updated API configuration for larger file uploads
  api: {
    bodyParser: {
      sizeLimit: "50mb", // Limit size to 50MB
    },
    responseLimit: "50mb",
  },

  // Increase serverless function timeout if needed
  serverRuntimeConfig: {
    maxDuration: 60, // Seconds
  },

  // Exclude server-only modules from client bundle
  experimental: {
    serverComponentsExternalPackages: ["cloudinary", "multer", "sharp"],
  },
};

module.exports = nextConfig;
