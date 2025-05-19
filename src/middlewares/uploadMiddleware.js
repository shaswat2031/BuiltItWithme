const multer = require("multer");
const path = require("path");
const { ensureDirectoryExists } = require("../utils/fileSystem");

// Determine if we're in a serverless environment (more comprehensive check)
const isServerless =
  process.env.VERCEL ||
  process.env.NETLIFY ||
  process.env.AWS_LAMBDA_FUNCTION_NAME ||
  process.env.NEXT_RUNTIME === "edge" ||
  process.env.NODE_ENV === "production"; // Safer default for serverless

// Always use memory storage in serverless environments
let storage = multer.memoryStorage();

if (!isServerless) {
  // Try to use disk storage in traditional environments only
  try {
    // Ensure uploads directory exists
    const uploadDirectory = path.join(process.cwd(), "public", "uploads");
    const directoryExists = ensureDirectoryExists(uploadDirectory);

    // Only use disk storage if directory creation succeeded
    if (directoryExists) {
      console.log("Using disk storage for file uploads");
      storage = multer.diskStorage({
        destination: function (req, file, cb) {
          cb(null, uploadDirectory);
        },
        filename: function (req, file, cb) {
          const uniqueSuffix =
            Date.now() + "-" + Math.round(Math.random() * 1e9);
          const extension = path.extname(file.originalname);
          cb(null, file.fieldname + "-" + uniqueSuffix + extension);
        },
      });
    } else {
      console.log("Falling back to memory storage (directory creation failed)");
    }
  } catch (error) {
    console.log(
      "Using memory storage for file uploads (fallback due to error)"
    );
  }
} else {
  console.log("Using memory storage for file uploads (serverless environment)");
}

// Set up size limits
const limits = {
  fileSize: 10 * 1024 * 1024, // 10MB
};

const upload = multer({
  storage,
  limits,
});

module.exports = upload;
