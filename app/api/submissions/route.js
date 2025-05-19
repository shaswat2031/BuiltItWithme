import { NextResponse } from "next/server";
import dbConnect from "../../../lib/dbConnect";
import Submission from "../../../models/Submission";
import { processAndUploadFile } from "../../../utils/storageUtils";
import { generatePdfBuffer } from "../../../utils/utilities";

// Get all submissions
export async function GET() {
  try {
    await dbConnect();
    const submissions = await Submission.find({}).sort({ submittedAt: -1 });
    return NextResponse.json(submissions);
  } catch (error) {
    console.error("Error fetching submissions:", error);
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}

// Create a new submission
export async function POST(request) {
  try {
    await dbConnect();
    console.log("API route: Received submission request");

    // Check if request size exceeds limits
    const contentLength = request.headers.get("content-length");
    if (contentLength && parseInt(contentLength) > 50 * 1024 * 1024) {
      // 50MB limit
      return NextResponse.json(
        { error: "Request payload too large. File size limit is 50MB." },
        { status: 413 }
      );
    }

    // Handle multipart form data
    let formData;
    try {
      formData = await request.formData();
      console.log("API route: Parsed form data");
    } catch (formDataError) {
      console.error("Error parsing form data:", formDataError);
      return NextResponse.json(
        { error: "Failed to parse form data", details: formDataError.message },
        { status: 400 }
      );
    }

    // Extract basic submission info
    const id = formData.get("id");
    const planType = formData.get("planType");
    const fullName = formData.get("fullName");
    const email = formData.get("email");
    const submittedAt = formData.get("submittedAt");
    const status = formData.get("status");

    console.log(`API route: Processing submission ID ${id}`);

    // Create details object from form data
    const details = {};

    // Text fields to extract
    const textFields = [
      "title",
      "jobProfile",
      "skills",
      "githubProfile",
      "designPreferences",
      "colorScheme",
      "fontFamily",
      "layoutStyle",
      "responsivePreference",
      "socialMediaLinks",
      "languagePreference",
      "targetAudience",
      "projectTimeline",
      "additionalRequests",
      "githubUsername",
      "githubPassword",
      "vercelId",
      "vercelPassword",
    ];

    // Extract text fields
    textFields.forEach((field) => {
      const value = formData.get(field);
      if (value) {
        details[field] = value;
      }
    });

    // Handle array fields if they exist (for code submissions)
    ["projects", "experience", "education"].forEach((arrayField) => {
      const value = formData.get(arrayField);
      if (value) {
        try {
          details[arrayField] = JSON.parse(value);
        } catch (e) {
          console.error(`Error parsing ${arrayField}:`, e);
          details[arrayField] = value; // Store as string if parsing fails
        }
      }
    });

    // Boolean fields to extract
    const booleanFields = [
      "seoOptimization",
      "contactFormNeeded",
      "blogSection",
      "portfolioGallery",
    ];

    // Extract boolean fields
    booleanFields.forEach((field) => {
      const value = formData.get(field);
      details[field] = value === "true" || value === true;
    });

    // Create submission object
    const submission = {
      id,
      planType,
      fullName,
      email,
      submittedAt,
      status,
      details,
    };

    // Generate PDF from submission data
    try {
      const pdfBuffer = await generatePdfBuffer(submission, true);
      const fileName = `${id}-submission.pdf`;

      // Upload PDF to cloud storage
      const pdfUploadResult = await processAndUploadFile(
        {
          arrayBuffer: async () => pdfBuffer,
          name: fileName,
          type: "application/pdf",
        },
        id
      );

      submission.pdfUrl = pdfUploadResult.url;
      submission.pdfDownloadUrl = pdfUploadResult.downloadUrl;
      submission.storageProvider = pdfUploadResult.provider;

      console.log(
        `API route: Generated and uploaded PDF: ${submission.pdfUrl}`
      );
    } catch (pdfError) {
      console.error("Error generating/uploading PDF:", pdfError);
      // Continue with submission even if PDF generation fails
    }

    // Handle resume file upload
    const resume = formData.get("resume");
    if (resume && resume.name) {
      console.log("API route: Processing resume file");
      try {
        const resumeUploadResult = await processAndUploadFile(resume, id);
        submission.resumeUrl = resumeUploadResult.url;
        submission.resumeDownloadUrl = resumeUploadResult.downloadUrl;
        submission.resumeStorageProvider = resumeUploadResult.provider;
        console.log(`API route: Uploaded resume file: ${submission.resumeUrl}`);
      } catch (resumeError) {
        console.error("Error processing resume file:", resumeError);
      }
    }

    // Handle additional files
    const uploadedFiles = formData.getAll("uploadedFiles");
    if (uploadedFiles && uploadedFiles.length > 0) {
      console.log(
        `API route: Processing ${uploadedFiles.length} additional files`
      );
      submission.uploadedFilesUrl = [];
      submission.uploadedFilesDownloadUrl = [];
      submission.uploadedFilesProvider = [];

      for (const file of uploadedFiles) {
        if (file.name) {
          try {
            const fileUploadResult = await processAndUploadFile(file, id);
            submission.uploadedFilesUrl.push(fileUploadResult.url);
            submission.uploadedFilesDownloadUrl.push(
              fileUploadResult.downloadUrl
            );
            submission.uploadedFilesProvider.push(fileUploadResult.provider);
            console.log(`API route: Uploaded additional file: ${file.name}`);
          } catch (fileError) {
            console.error("Error processing uploaded file:", fileError);
          }
        }
      }
    }

    // Save to database
    console.log("API route: Saving to database");
    const newSubmission = await Submission.create(submission);
    console.log(
      `API route: Submission saved successfully with ID: ${newSubmission.id}`
    );

    return NextResponse.json(newSubmission, { status: 201 });
  } catch (error) {
    console.error("Submission error:", error);
    return NextResponse.json(
      {
        error: error.message,
        stack: process.env.NODE_ENV === "development" ? error.stack : undefined,
      },
      { status: 500 }
    );
  }
}
