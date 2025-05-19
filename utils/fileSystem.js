const fs = require("fs");
const path = require("path");

/**
 * Ensures that a directory exists, creating it if necessary
 * @param {string} dirPath - The directory path to check/create
 * @returns {boolean} - Whether the directory exists or was created
 */
const ensureDirectoryExists = (dirPath) => {
  // Skip directory creation in serverless environments
  if (
    process.env.VERCEL ||
    process.env.NETLIFY ||
    process.env.AWS_LAMBDA_FUNCTION_NAME
  ) {
    console.log(
      `Skipping directory creation in serverless environment: ${dirPath}`
    );
    return false;
  }

  try {
    if (!fs.existsSync(dirPath)) {
      fs.mkdirSync(dirPath, { recursive: true });
      console.log(`Directory created: ${dirPath}`);
    }
    return true;
  } catch (error) {
    console.error(`Error creating directory ${dirPath}:`, error);
    return false;
  }
};

module.exports = {
  ensureDirectoryExists,
};
