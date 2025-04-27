import pdfMake from 'pdfmake/build/pdfmake';
import pdfFonts from 'pdfmake/build/vfs_fonts';

// Initialize pdfMake - only when in browser environment
if (typeof window !== 'undefined') {
  pdfMake.vfs = pdfFonts.vfs; // Correct access to vfs property
}

// Function to convert form data to a PDF document definition
export function createPdfDefinition(formData, includePrice = false) {
  // Extract data for easier access
  const {
    id,
    fullName,
    email,
    title,
    briefSummary,
    jobProfile,
    skills,
    projects,
    experience,
    education,
    githubProfile,
    designPreferences,
    colorScheme,
    fontFamily,
    layoutStyle,
    seoOptimization,
    contactFormNeeded,
    blogSection,
    portfolioGallery,
    responsivePreference,
    socialMediaLinks,
    languagePreference,
    targetAudience,
    projectTimeline,
    additionalRequests,
    submittedAt,
  } = formData;

  // Create PDF document definition
  const docDefinition = {
    content: [
      { text: 'CODE REQUEST SUBMISSION', style: 'header' },
      { text: `Reference ID: ${id || 'Not assigned'}`, style: 'subheader' },
      { text: `Submitted on: ${submittedAt || new Date().toLocaleDateString()}`, style: 'date' },
      
      // Include price if needed (for admin version)
      includePrice ? { text: `Price: $499`, style: 'price', margin: [0, 0, 0, 15] } : {},
      
      // Personal Details
      { text: 'Personal Details', style: 'sectionHeader' },
      {
        table: {
          widths: ['30%', '70%'],
          body: [
            ['Full Name', fullName || 'Not provided'],
            ['Email', email || 'Not provided'],
            ['Title', title || 'Not provided'],
            ['Brief Summary', briefSummary || 'Not provided'],
          ]
        },
        layout: 'lightHorizontalLines'
      },
      
      // Projects
      { text: 'Projects', style: 'sectionHeader' },
      ...generateProjectsContent(projects),
      
      // Experience
      { text: 'Experience', style: 'sectionHeader' },
      ...generateExperienceContent(experience),
      
      // Education
      { text: 'Education', style: 'sectionHeader' },
      ...generateEducationContent(education),
      
      // Professional Profile
      { text: 'Professional Profile', style: 'sectionHeader' },
      {
        table: {
          widths: ['30%', '70%'],
          body: [
            ['GitHub Profile', githubProfile || 'Not provided'],
            ['Skills', skills || 'Not provided'],
          ]
        },
        layout: 'lightHorizontalLines'
      },
      
      // Design Preferences
      { text: 'Design Preferences', style: 'sectionHeader' },
      {
        table: {
          widths: ['30%', '70%'],
          body: [
            ['Design Preferences', designPreferences || 'Not provided'],
            ['Color Scheme', colorScheme || 'Not provided'],
            ['Font Family', fontFamily || 'Not provided'],
            ['Layout Style', layoutStyle || 'Not provided'],
          ]
        },
        layout: 'lightHorizontalLines'
      },
      
      // Website Features
      { text: 'Website Features', style: 'sectionHeader' },
      {
        ul: [
          `SEO Optimization: ${seoOptimization ? 'Yes' : 'No'}`,
          `Contact Form: ${contactFormNeeded ? 'Yes' : 'No'}`,
          `Blog Section: ${blogSection ? 'Yes' : 'No'}`,
          `Portfolio Gallery: ${portfolioGallery ? 'Yes' : 'No'}`,
        ]
      },
      
      // Additional Details
      { text: 'Additional Details', style: 'sectionHeader' },
      {
        table: {
          widths: ['30%', '70%'],
          body: [
            ['Responsive Preference', responsivePreference || 'Not provided'],
            ['Language Preference', languagePreference || 'Not provided'],
            ['Target Audience', targetAudience || 'Not provided'],
            ['Project Timeline', projectTimeline || 'Not provided'],
            ['Social Media Links', socialMediaLinks || 'Not provided'],
            ['Additional Requests', additionalRequests || 'Not provided'],
          ]
        },
        layout: 'lightHorizontalLines'
      },
    ],
    styles: {
      header: {
        fontSize: 22,
        bold: true,
        alignment: 'center',
        margin: [0, 0, 0, 10]
      },
      subheader: {
        fontSize: 14,
        bold: true,
        alignment: 'center',
        margin: [0, 0, 0, 5]
      },
      date: {
        fontSize: 12,
        alignment: 'center',
        margin: [0, 0, 0, 20],
        color: '#666'
      },
      price: {
        fontSize: 16,
        bold: true,
        alignment: 'center',
        color: '#2563eb'
      },
      sectionHeader: {
        fontSize: 14,
        bold: true,
        margin: [0, 15, 0, 5],
        color: '#4338ca'
      }
    },
    defaultStyle: {
      fontSize: 10,
    },
    pageMargins: [40, 60, 40, 60],
    footer: function(currentPage, pageCount) { 
      return { text: currentPage.toString() + ' of ' + pageCount, alignment: 'center' }; 
    }
  };
  
  return docDefinition;
}

// Helper function to generate projects content
function generateProjectsContent(projects) {
  if (!projects || !projects.length || typeof projects === 'string') {
    return [{ text: 'No projects provided', italics: true }];
  }
  
  return projects.map((project, index) => {
    return {
      stack: [
        { text: `Project ${index + 1}: ${project.title || 'Untitled'}`, style: 'subsubheader' },
        {
          table: {
            widths: ['30%', '70%'],
            body: [
              ['Description', project.description || 'Not provided'],
              ['Technologies', project.technologies || 'Not provided'],
              ['Link', project.link || 'Not provided'],
            ]
          },
          layout: 'lightHorizontalLines'
        }
      ],
      margin: [0, 0, 0, 10]
    };
  });
}

// Helper function to generate experience content
function generateExperienceContent(experience) {
  if (!experience || !experience.length || typeof experience === 'string') {
    return [{ text: 'No experience provided', italics: true }];
  }
  
  return experience.map((exp, index) => {
    return {
      stack: [
        { text: `${exp.company || 'Unknown Company'} - ${exp.position || 'Position not specified'}`, style: 'subsubheader' },
        {
          table: {
            widths: ['30%', '70%'],
            body: [
              ['Duration', exp.duration || 'Not provided'],
              ['Description', exp.description || 'Not provided'],
            ]
          },
          layout: 'lightHorizontalLines'
        }
      ],
      margin: [0, 0, 0, 10]
    };
  });
}

// Helper function to generate education content
function generateEducationContent(education) {
  if (!education || !education.length || typeof education === 'string') {
    return [{ text: 'No education provided', italics: true }];
  }
  
  return education.map((edu, index) => {
    return {
      stack: [
        { text: `${edu.institution || 'Unknown Institution'} - ${edu.degree || 'Degree not specified'}`, style: 'subsubheader' },
        {
          table: {
            widths: ['30%', '70%'],
            body: [
              ['Year', edu.year || 'Not provided'],
              ['Description', edu.description || 'Not provided'],
            ]
          },
          layout: 'lightHorizontalLines'
        }
      ],
      margin: [0, 0, 0, 10]
    };
  });
}

// Generate PDF on the client side
export function generatePdf(formData, includePrice = false, fileName = 'code-request.pdf') {
  const docDefinition = createPdfDefinition(formData, includePrice);
  return pdfMake.createPdf(docDefinition);
}

// For server-side PDF generation (to be used in API routes)
export async function generatePdfBuffer(formData, includePrice = false) {
  const docDefinition = createPdfDefinition(formData, includePrice);
  
  return new Promise((resolve, reject) => {
    try {
      const pdfDoc = pdfMake.createPdf(docDefinition);
      
      pdfDoc.getBuffer((buffer) => {
        resolve(buffer);
      });
    } catch (error) {
      reject(error);
    }
  });
}
