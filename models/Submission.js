import mongoose from 'mongoose';

const SubmissionSchema = new mongoose.Schema({
  id: {
    type: String,
    required: true,
    unique: true
  },
  planType: {
    type: String,
    required: true,
    enum: ['code', 'live']
  },
  fullName: {
    type: String,
    required: true
  },
  email: {
    type: String,
    required: true
  },
  submittedAt: {
    type: String,
    required: true
  },
  status: {
    type: String,
    required: true,
    enum: ['pending', 'in-progress', 'completed'],
    default: 'pending'
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
    vercelPassword: String
  },
  resumeUrl: String,
  uploadedFilesUrl: [String],
  pdfUrl: String,
  adminPdfUrl: String,
  googleDriveId: String,
  googleDriveUrl: String
}, {
  timestamps: true
});

export default mongoose.models.Submission || mongoose.model('Submission', SubmissionSchema);
