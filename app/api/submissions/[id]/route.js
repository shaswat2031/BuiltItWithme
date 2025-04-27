import { NextResponse } from 'next/server';
import dbConnect from '../../../../lib/dbConnect';
import Submission from '../../../../models/Submission';
import path from 'path';
import fs from 'fs/promises';

// Enhanced validation function with comprehensive checks
const validateSubmissionData = (data) => {
  const errors = [];
  
  // Handle null or undefined data
  if (!data || typeof data !== 'object') {
    throw new Error('Invalid submission data: expected an object');
  }
  
  // Plan type validation
  if (data.planType !== undefined) {
    if (!['code', 'live'].includes(data.planType)) {
      errors.push('Invalid plan type. Must be either "code" or "live"');
    }
  }
  
  // Price validation
  if (data.price !== undefined) {
    const price = parseFloat(data.price);
    if (isNaN(price)) {
      errors.push('Price must be a valid number');
    } else if (price < 0) {
      errors.push('Price cannot be negative');
    } else {
      // Convert string to number if it's valid
      data.price = price;
    }
  }
  
  // Status validation
  if (data.status !== undefined) {
    const validStatuses = ['pending', 'in-progress', 'completed', 'rejected', 'cancelled'];
    if (!validStatuses.includes(data.status)) {
      errors.push(`Invalid status. Must be one of: ${validStatuses.join(', ')}`);
    }
  }
  
  // Email validation if present
  if (data.email !== undefined) {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(data.email)) {
      errors.push('Invalid email format');
    }
  }
  
  // Details object validation
  if (data.details !== undefined && typeof data.details === 'object') {
    // Verify GitHub username format if provided
    if (data.details.githubUsername !== undefined && 
        data.details.githubUsername !== null && 
        typeof data.details.githubUsername === 'string' && 
        !/^[a-z\d](?:[a-z\d]|-(?=[a-z\d])){0,38}$/i.test(data.details.githubUsername)) {
      errors.push('Invalid GitHub username format');
    }
    
    // Validate Vercel ID if provided
    if (data.details.vercelId !== undefined && 
        data.details.vercelId !== null && 
        typeof data.details.vercelId === 'string' && 
        data.details.vercelId.trim() === '') {
      errors.push('Vercel ID cannot be empty string');
    }
  }
  
  // If any validation errors, throw with all error messages
  if (errors.length > 0) {
    throw new Error(errors.join('; '));
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
      return NextResponse.json({ error: 'Missing submission ID' }, { status: 400 });
    }
    
    const submission = await Submission.findOne({ id });
    
    if (!submission) {
      return NextResponse.json({ error: 'Submission not found' }, { status: 404 });
    }
    
    return NextResponse.json(submission);
  } catch (error) {
    console.error('Error fetching submission:', error);
    return NextResponse.json({ 
      error: 'Failed to fetch submission',
      details: error.message 
    }, { status: 500 });
  }
}

// Update a submission
export async function PATCH(request, { params }) {
  try {
    await dbConnect();
    const { id } = params;
    
    if (!id) {
      return NextResponse.json({ error: 'Missing submission ID' }, { status: 400 });
    }
    
    let data;
    try {
      data = await request.json();
    } catch (parseError) {
      return NextResponse.json({ 
        error: 'Invalid JSON in request body',
        details: parseError.message 
      }, { status: 400 });
    }
    
    // Validate submission data if present
    try {
      data = validateSubmissionData(data);
    } catch (validationError) {
      return NextResponse.json({ error: validationError.message }, { status: 400 });
    }
    
    const submission = await Submission.findOneAndUpdate(
      { id },
      { $set: data },
      { new: true }
    );
    
    if (!submission) {
      return NextResponse.json({ error: 'Submission not found' }, { status: 404 });
    }
    
    return NextResponse.json(submission);
  } catch (error) {
    console.error('Error updating submission:', error);
    return NextResponse.json({ 
      error: 'Failed to update submission',
      details: error.message 
    }, { status: 500 });
  }
}

// Delete a submission
export async function DELETE(request, { params }) {
  try {
    await dbConnect();
    const { id } = params;
    
    if (!id) {
      return NextResponse.json({ error: 'Missing submission ID' }, { status: 400 });
    }
    
    const submission = await Submission.findOneAndDelete({ id });
    
    if (!submission) {
      return NextResponse.json({ error: 'Submission not found' }, { status: 404 });
    }
    
    // Also delete associated files if they exist
    if (submission.resumeUrl) {
      try {
        const filePath = path.join(process.cwd(), 'public', submission.resumeUrl);
        await fs.unlink(filePath);
      } catch (fileError) {
        console.error('Error deleting resume file:', fileError);
      }
    }
    
    if (submission.uploadedFilesUrl && submission.uploadedFilesUrl.length > 0) {
      for (const fileUrl of submission.uploadedFilesUrl) {
        try {
          const filePath = path.join(process.cwd(), 'public', fileUrl);
          await fs.unlink(filePath);
        } catch (fileError) {
          console.error('Error deleting uploaded file:', fileError);
        }
      }
    }
    
    return NextResponse.json({ message: 'Submission deleted successfully' });
  } catch (error) {
    console.error('Error deleting submission:', error);
    return NextResponse.json({ 
      error: 'Failed to delete submission',
      details: error.message 
    }, { status: 500 });
  }
}
