import { GoogleGenerativeAI } from '@google/generative-ai';

// Initialize the Gemini API client
const genAI = new GoogleGenerativeAI(import.meta.env.VITE_GEMINI_API_KEY);

// Get the Gemini model (updated model name)
const model = genAI.getGenerativeModel({ model: 'gemini-1.5-flash' });

export interface CoverLetterRequest {
  cvContent: string;
  jobDescription: string;
  applicantName?: string;
  companyName?: string;
}

export interface CoverLetterResponse {
  coverLetter: string;
  success: boolean;
  error?: string;
}

/**
 * Generate a personalized cover letter using Google Gemini AI
 */
export const generateCoverLetter = async ({
  cvContent,
  jobDescription,
  applicantName = '[Your Name]',
  companyName = 'the company'
}: CoverLetterRequest): Promise<CoverLetterResponse> => {
  try {
    // Validate inputs
    if (!cvContent?.trim() || !jobDescription?.trim()) {
      throw new Error('Both CV content and job description are required');
    }

    if (!import.meta.env.VITE_GEMINI_API_KEY) {
      throw new Error('Gemini API key is not configured. Please add VITE_GEMINI_API_KEY to your .env file');
    }

    // Create a detailed prompt for cover letter generation
    const prompt = `
You are a professional career advisor helping to write a compelling cover letter. 

Based on the following CV and job description, create a personalized, professional cover letter that:
1. Highlights relevant experience and skills from the CV that match the job requirements
2. Shows genuine interest in the specific role and company
3. Demonstrates how the candidate can add value to the organization
4. Uses a professional but engaging tone
5. Is approximately 3-4 paragraphs long
6. Includes specific examples from the CV when relevant

CV Content:
${cvContent}

Job Description:
${jobDescription}

Applicant Name: ${applicantName}
Company Name: ${companyName}

Please generate a cover letter that is ATS-friendly and feels authentic and tailored to this specific opportunity. Do not use generic phrases or templates. Make it compelling and specific to the role.

Format the response as a proper business letter with:
- Professional greeting
- 3-4 well-structured paragraphs
- Professional closing
- Signature line

Do not include any explanatory text before or after the cover letter - just return the cover letter itself.
`;

    // Generate content using Gemini
    const result = await model.generateContent(prompt);
    const response = await result.response;
    const coverLetter = response.text();

    if (!coverLetter?.trim()) {
      throw new Error('Failed to generate cover letter content');
    }

    return {
      coverLetter: coverLetter.trim(),
      success: true
    };

  } catch (error) {
    console.error('Error generating cover letter with Gemini:', error);
    
    // Log detailed error information for debugging
    if (error instanceof Error) {
      console.error('Error name:', error.name);
      console.error('Error message:', error.message);
      console.error('Error stack:', error.stack);
    }
    
    // Check if it's a fetch/network error
    if (error && typeof error === 'object' && 'cause' in error) {
      console.error('Error cause:', error.cause);
    }
    
    let errorMessage = 'Failed to generate cover letter';
    
    if (error instanceof Error) {
      if (error.message.includes('API key') || error.message.includes('API_KEY')) {
        errorMessage = 'Invalid or missing API key. Please check your Gemini API key configuration.';
      } else if (error.message.includes('quota') || error.message.includes('limit')) {
        errorMessage = 'API quota exceeded. Please try again later or check your Gemini API usage limits.';
      } else if (error.message.includes('network') || error.message.includes('fetch') || error.message.includes('Failed to fetch')) {
        errorMessage = `Network error: ${error.message}. Please check your internet connection and try again.`;
      } else if (error.message.includes('403')) {
        errorMessage = 'API access forbidden. Please check your Gemini API key permissions.';
      } else if (error.message.includes('401')) {
        errorMessage = 'API authentication failed. Please verify your Gemini API key.';
      } else {
        errorMessage = `API Error: ${error.message}`;
      }
    }

    return {
      coverLetter: '',
      success: false,
      error: errorMessage
    };
  }
};

/**
 * Test the Gemini API connection
 */
export const testGeminiConnection = async (): Promise<{ success: boolean; error?: string; details?: any }> => {
  try {
    if (!import.meta.env.VITE_GEMINI_API_KEY) {
      throw new Error('Gemini API key is not configured');
    }

    console.log('Testing Gemini API connection...');
    console.log('API Key present:', !!import.meta.env.VITE_GEMINI_API_KEY);
    console.log('API Key length:', import.meta.env.VITE_GEMINI_API_KEY?.length);

    const result = await model.generateContent('Hello, please respond with "API connection successful"');
    const response = await result.response;
    const text = response.text();

    console.log('API test response:', text);

    return {
      success: true,
      details: { responseText: text }
    };
  } catch (error) {
    console.error('API connection test failed:', error);
    
    if (error instanceof Error) {
      console.error('Test error name:', error.name);
      console.error('Test error message:', error.message);
      console.error('Test error stack:', error.stack);
    }

    return {
      success: false,
      error: error instanceof Error ? error.message : 'Unknown error occurred',
      details: error
    };
  }
};

export default {
  generateCoverLetter,
  testGeminiConnection
};
