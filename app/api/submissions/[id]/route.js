import { NextResponse } from "next/server";
import dbConnect from "../../../../lib/dbConnect";
import Submission from "../../../../models/Submission";
import { deleteCloudinaryFolder } from "../../../../utils/cloudinaryUtils";
import { v2 as cloudinary } from "cloudinary";

// Configure Cloudinary
cloudinary.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET,
});

// Enhanced validation function with comprehensive checks
const validateSubmissionData = (data) => {
  const errors = [];

  // Handle null or undefined data
  if (!data || typeof data !== "object") {
    throw new Error("Invalid submission data: expected an object");
  }

  // Plan type validation
  if (data.planType !== undefined) {
    if (!["code", "live"].includes(data.planType)) {
      errors.push('Invalid plan type. Must be either "code" or "live"');
    }
  }

  // Price validation
  if (data.price !== undefined) {
    const price = parseFloat(data.price);
    if (isNaN(price)) {
      errors.push("Price must be a valid number");
    } else if (price < 0) {
      errors.push("Price cannot be negative");
    } else {
      // Convert string to number if it's valid
      data.price = price;
    }
  }

  // Status validation
  if (data.status !== undefined) {
    const validStatuses = [
      "pending",
      "in-progress",
      "completed",
      "rejected",
      "cancelled",
    ];
    if (!validStatuses.includes(data.status)) {
      errors.push(
        `Invalid status. Must be one of: ${validStatuses.join(", ")}`
      );
    }
  }

  // Email validation if present
  if (data.email !== undefined) {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(data.email)) {
      errors.push("Invalid email format");
    }
  }

  // Details object validation
  if (data.details !== undefined && typeof data.details === "object") {
    // Verify GitHub username format if provided
    if (
      data.details.githubUsername !== undefined &&
      data.details.githubUsername !== null &&
      typeof data.details.githubUsername === "string" &&
      !/^[a-z\d](?:[a-z\d]|-(?=[a-z\d])){0,38}$/i.test(
        data.details.githubUsername
      )
    ) {
      errors.push("Invalid GitHub username format");
    }

    // Validate Vercel ID if provided
    if (
      data.details.vercelId !== undefined &&
      data.details.vercelId !== null &&
      typeof data.details.vercelId === "string" &&
      data.details.vercelId.trim() === ""
    ) {
      errors.push("Vercel ID cannot be empty string");
    }
  }

  // If any validation errors, throw with all error messages
  if (errors.length > 0) {
    throw new Error(errors.join("; "));
  }

  return data;
};

// Use renamed function in place of validatePricingData
const validatePricingData = validateSubmissionData;

// Get a single submission
export async function GET(request, { params }) {
  try {
    await dbConnect();
    const { id } = params;

    if (!id) {
      return NextResponse.json(
        { error: "Missing submission ID" },
        { status: 400 }
      );
    }

    const submission = await Submission.findOne({ id });

    if (!submission) {
      return NextResponse.json(
        { error: "Submission not found" },
        { status: 404 }
      );
    }

    return NextResponse.json(submission);
  } catch (error) {
    console.error("Error fetching submission:", error);
    return NextResponse.json(
      {
        error: "Failed to fetch submission",
        details: error.message,
      },
      { status: 500 }
    );
  }
}

// Update a submission
export async function PATCH(request, { params }) {
  try {
    await dbConnect();
    const { id } = params;

    if (!id) {
      return NextResponse.json(
        { error: "Missing submission ID" },
        { status: 400 }
      );
    }

    // Check if request size exceeds limits
    const contentLength = request.headers.get("content-length");
    if (contentLength && parseInt(contentLength) > 10 * 1024 * 1024) {
      // 10MB limit for updates
      return NextResponse.json(
        { error: "Request payload too large. Size limit for updates is 10MB." },
        { status: 413 }
      );
    }

    let data;
    try {
      data = await request.json();
    } catch (parseError) {
      return NextResponse.json(
        {
          error: "Invalid JSON in request body",
          details: parseError.message,
        },
        { status: 400 }
      );
    }

    // Validate submission data if present
    try {
      data = validateSubmissionData(data);
    } catch (validationError) {
      return NextResponse.json(
        { error: validationError.message },
        { status: 400 }
      );
    }

    const submission = await Submission.findOneAndUpdate(
      { id },
      { $set: data },
      { new: true }
    );

    if (!submission) {
      return NextResponse.json(
        { error: "Submission not found" },
        { status: 404 }
      );
    }

    return NextResponse.json(submission);
  } catch (error) {
    console.error("Error updating submission:", error);
    return NextResponse.json(
      {
        error: "Failed to update submission",
        details: error.message,
      },
      { status: 500 }
    );
  }
}

// Delete a submission
export async function DELETE(request, { params }) {
  try {
    await dbConnect();
    const { id } = params;

    if (!id) {
      return NextResponse.json(
        { error: "Missing submission ID" },
        { status: 400 }
      );
    }

    const submission = await Submission.findOneAndDelete({ id });

    if (!submission) {
      return NextResponse.json(
        { error: "Submission not found" },
        { status: 404 }
      );
    }

    // Delete associated files from Cloudinary
    try {
      // Use the utility function to delete folder and contents
      await deleteCloudinaryFolder(id);
      console.log(`Deleted Cloudinary folder for submission ${id}`);
    } catch (cloudinaryError) {
      console.error("Error deleting Cloudinary resources:", cloudinaryError);
      // Continue with the deletion process even if Cloudinary deletion fails
    }

    return NextResponse.json({ message: "Submission deleted successfully" });
  } catch (error) {
    console.error("Error deleting submission:", error);
    return NextResponse.json(
      {
        error: "Failed to delete submission",
        details: error.message,
      },
      { status: 500 }
    );
  }
}
