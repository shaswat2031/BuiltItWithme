import { NextResponse } from "next/server";
import { processAndUploadFile } from "../../../utils/storageUtils";

export const config = {
  api: {
    bodyParser: false,
  },
};

export async function POST(request) {
  try {
    // Get form data
    const formData = await request.formData();
    const file = formData.get("file");

    // Get optional folder ID from the form data, defaulting to "uploads"
    const folderId = formData.get("folderId") || "uploads";

    if (!file) {
      return NextResponse.json({ error: "No file provided" }, { status: 400 });
    }

    // Process and upload file directly to Cloudinary using memory buffer
    const result = await processAndUploadFile(file, folderId);

    // Return success response
    return NextResponse.json({
      success: true,
      url: result.url,
      publicId: result.publicId,
      format: result.format,
      downloadUrl: result.downloadUrl,
    });
  } catch (error) {
    console.error("Upload error:", error);
    return NextResponse.json(
      { error: "Upload failed", details: error.message },
      { status: 500 }
    );
  }
}
