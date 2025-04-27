import { NextResponse } from 'next/server';
import dbConnect from '../../../lib/dbConnect';
import Submission from '../../../models/Submission';
import { writeFile } from 'fs/promises';
import path from 'path';
import fs from 'fs/promises';

// Get all submissions
export async function GET() {
  try {
    await dbConnect();
    const submissions = await Submission.find({}).sort({ submittedAt: -1 });
    return NextResponse.json(submissions);
  } catch (error) {
    console.error('Error fetching submissions:', error);
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}

// Create a new submission
export async function POST(request) {
  try {
    await dbConnect();
    console.log("API route: Received submission request");
    
    // Handle multipart form data
    const formData = await request.formData();
    console.log("API route: Parsed form data");
    
    // Extract basic submission info
    const id = formData.get('id');
    const planType = formData.get('planType');
    const fullName = formData.get('fullName');
    const email = formData.get('email');
    const submittedAt = formData.get('submittedAt');
    const status = formData.get('status');
    
    console.log(`API route: Processing submission ID ${id}`);
    
    // Create details object from form data
    const details = {};
    
    // Text fields to extract
    const textFields = [
      'title', 'jobProfile', 'skills', 'githubProfile', 'designPreferences',
      'colorScheme', 'fontFamily', 'layoutStyle', 'responsivePreference',
      'socialMediaLinks', 'languagePreference', 'targetAudience', 'projectTimeline',
      'additionalRequests', 'githubUsername', 'githubPassword', 'vercelId', 'vercelPassword'
    ];
    
    // Extract text fields
    textFields.forEach(field => {
      const value = formData.get(field);
      if (value) {
        details[field] = value;
      }
    });
    
    // Handle array fields if they exist (for code submissions)
    ['projects', 'experience', 'education'].forEach(arrayField => {
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
      'seoOptimization', 'contactFormNeeded', 'blogSection', 'portfolioGallery'
    ];
    
    // Extract boolean fields
    booleanFields.forEach(field => {
      const value = formData.get(field);
      details[field] = value === 'true' || value === true;
    });
    
    // Create submission object
    const submission = {
      id,
      planType,
      fullName,
      email,
      submittedAt,
      status,
      details
    };
    
    console.log("API route: Created submission object:", JSON.stringify(submission));
    
    // Ensure uploads directory exists
    const uploadsDir = path.join(process.cwd(), 'public', 'uploads');
    try {
      await fs.access(uploadsDir);
    } catch {
      console.log("API route: Creating uploads directory");
      await fs.mkdir(uploadsDir, { recursive: true });
    }
    
    // Handle file uploads
    const resume = formData.get('resume');
    if (resume && resume.name) {
      console.log("API route: Processing resume file");
      const resumeBuffer = await resume.arrayBuffer();
      const resumeBytes = Buffer.from(resumeBuffer);
      const fileName = `${id}-resume-${Date.now()}${path.extname(resume.name)}`;
      const filePath = path.join(process.cwd(), 'public', 'uploads', fileName);
      
      await writeFile(filePath, resumeBytes);
      submission.resumeUrl = `/uploads/${fileName}`;
      console.log(`API route: Saved resume file: ${fileName}`);
    }
    
    // Handle additional files
    const uploadedFiles = formData.getAll('uploadedFiles');
    if (uploadedFiles && uploadedFiles.length > 0) {
      console.log(`API route: Processing ${uploadedFiles.length} additional files`);
      submission.uploadedFilesUrl = [];
      
      for (const file of uploadedFiles) {
        if (file.name) {
          const fileBuffer = await file.arrayBuffer();
          const fileBytes = Buffer.from(fileBuffer);
          const fileName = `${id}-file-${Date.now()}${path.extname(file.name)}`;
          const filePath = path.join(process.cwd(), 'public', 'uploads', fileName);
          
          await writeFile(filePath, fileBytes);
          submission.uploadedFilesUrl.push(`/uploads/${fileName}`);
          console.log(`API route: Saved additional file: ${fileName}`);
        }
      }
    }
    
    // Save to database
    console.log("API route: Saving to database");
    const newSubmission = await Submission.create(submission);
    console.log(`API route: Submission saved successfully with ID: ${newSubmission.id}`);
    
    return NextResponse.json(newSubmission, { status: 201 });
  } catch (error) {
    console.error('Submission error:', error);
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}
