# Project Folder Structure

## Core Directories

- `/app`: Next.js app directory containing routes and pages
- `/components`: Reusable UI components
- `/lib`: Core libraries and database connections
- `/models`: Database models for MongoDB
- `/public`: Static assets
- `/utils`: Utility functions and helpers

## Utility Modules

- `/utils/pdfGenerator.js`: PDF generation using PDFMake
- `/utils/googleDrive.js`: Google Drive API integration
- `/utils/fileSystem.js`: File system operations
- `/utils/cloudinary.js`: Cloudinary API integration
- `/utils/index.js`: Exports all utility functions for easier imports

## API Routes

- `/app/api/submissions/route.js`: Handles form submissions
- `/app/api/submissions/[id]/route.js`: Handles operations on individual submissions

## Main Pages

- `/app/page.jsx`: Landing page
- `/app/admin_page/page.jsx`: Admin dashboard
- `/app/submit/page.jsx`: Submission form
