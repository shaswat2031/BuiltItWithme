import mongoose from "mongoose";

const SubmissionSchema = new mongoose.Schema(
  {
    id: {
      type: String,
      required: true,
      unique: true,
    },
    planType: {
      type: String,
      required: true,
      enum: ["code", "live"],
    },
    fullName: {
      type: String,
      required: true,
    },
    email: {
      type: String,
      required: true,
    },
    submittedAt: {
      type: String,
      required: true,
    },
    status: {
      type: String,
      required: true,
      enum: ["pending", "in-progress", "completed", "rejected", "cancelled"],
      default: "pending",
    },
    details: {
      title: String,
      jobProfile: String,
      skills: String,
      githubProfile: String,
      designPreferences: String,
      colorScheme: String,
      fontFamily: String,
      layoutStyle: String,
      contactFormNeeded: Boolean,
      blogSection: Boolean,
      portfolioGallery: Boolean,
      seoOptimization: Boolean,
      responsivePreference: String,
      socialMediaLinks: String,
      languagePreference: String,
      targetAudience: String,
      projectTimeline: String,
      additionalRequests: String,
      githubUsername: String,
      githubPassword: String,
      vercelId: String,
      vercelPassword: String,
      projects: Array,
      experience: Array,
      education: Array,
    },
    price: Number,
    resumeUrl: String,
    resumeDownloadUrl: String,
    resumeStorageProvider: String,
    uploadedFilesUrl: [String],
    uploadedFilesDownloadUrl: [String],
    uploadedFilesProvider: [String],
    pdfUrl: String,
    pdfDownloadUrl: String,
    storageProvider: String,
    adminPdfUrl: String,
    googleDriveId: String,
    googleDriveUrl: String,
  },
  {
    timestamps: true,
  }
);

export default mongoose.models.Submission ||
  mongoose.model("Submission", SubmissionSchema);
