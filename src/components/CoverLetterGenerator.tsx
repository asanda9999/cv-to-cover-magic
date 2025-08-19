import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { Textarea } from '@/components/ui/textarea';
import { Loader2, Wand2, Copy, Download } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';

interface CoverLetterGeneratorProps {
  cvContent: string;
  jobDescription: string;
}

export const CoverLetterGenerator: React.FC<CoverLetterGeneratorProps> = ({
  cvContent,
  jobDescription,
}) => {
  const [coverLetter, setCoverLetter] = useState('');
  const [isGenerating, setIsGenerating] = useState(false);
  const { toast } = useToast();

  const generateCoverLetter = async () => {
    if (!cvContent.trim() || !jobDescription.trim()) {
      toast({
        title: "Missing information",
        description: "Please upload your CV and enter a job description first.",
        variant: "destructive"
      });
      return;
    }

    setIsGenerating(true);
    
    try {
      // In a real app, you would call your backend API here
      // For this demo, we'll simulate the API call
      await new Promise(resolve => setTimeout(resolve, 3000));
      
      const mockCoverLetter = `Dear Hiring Manager,

I am writing to express my strong interest in the position described in your job posting. After reviewing the requirements and responsibilities, I am confident that my background and skills make me an ideal candidate for this role.

Based on my CV and the job description provided, I bring relevant experience that directly aligns with your needs. My professional background demonstrates the technical skills and industry knowledge required for this position.

Key qualifications that make me a strong fit:
• Proven experience in the field with demonstrable results
• Strong technical skills that match your requirements
• Excellent communication and collaboration abilities
• Passion for contributing to team success and organizational growth

I am particularly excited about this opportunity because it represents a perfect match between my career aspirations and your company's needs. The role aligns perfectly with my professional goals and would allow me to contribute meaningfully to your team.

I would welcome the opportunity to discuss how my background and enthusiasm can contribute to your organization's continued success. Thank you for considering my application, and I look forward to hearing from you soon.

Best regards,
[Your Name]

---
Note: This is a demo cover letter. In a production app, this would be generated using AI based on your actual CV content and the specific job description provided.`;
      
      setCoverLetter(mockCoverLetter);
      
      toast({
        title: "Cover letter generated!",
        description: "Your personalized cover letter is ready.",
      });
    } catch (error) {
      console.error('Error generating cover letter:', error);
      toast({
        title: "Generation failed",
        description: "Please try again. Make sure both CV and job description are provided.",
        variant: "destructive"
      });
    } finally {
      setIsGenerating(false);
    }
  };

  const copyToClipboard = async () => {
    try {
      await navigator.clipboard.writeText(coverLetter);
      toast({
        title: "Copied to clipboard",
        description: "Cover letter copied successfully.",
      });
    } catch (error) {
      toast({
        title: "Copy failed",
        description: "Please select and copy the text manually.",
        variant: "destructive"
      });
    }
  };

  const downloadAsText = () => {
    const blob = new Blob([coverLetter], { type: 'text/plain' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = 'cover-letter.txt';
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url);
    
    toast({
      title: "Download started",
      description: "Your cover letter is being downloaded.",
    });
  };

  const canGenerate = cvContent.trim() && jobDescription.trim();

  return (
    <Card className="p-6 bg-gradient-card shadow-card">
      <div className="space-y-4">
        <div className="flex items-center justify-between">
          <h3 className="text-lg font-semibold text-foreground">Generate Cover Letter</h3>
          {coverLetter && (
            <div className="flex gap-2">
              <Button
                variant="outline"
                size="sm"
                onClick={copyToClipboard}
                className="hover:bg-accent"
              >
                <Copy className="w-4 h-4" />
                Copy
              </Button>
              <Button
                variant="outline"
                size="sm"
                onClick={downloadAsText}
                className="hover:bg-accent"
              >
                <Download className="w-4 h-4" />
                Download
              </Button>
            </div>
          )}
        </div>

        {!coverLetter ? (
          <div className="text-center py-8">
            <Wand2 className="w-16 h-16 text-primary mx-auto mb-4 opacity-50" />
            <p className="text-muted-foreground mb-6">
              Upload your CV and add a job description to generate a personalized cover letter
            </p>
            <Button
              variant="hero"
              size="lg"
              onClick={generateCoverLetter}
              disabled={!canGenerate || isGenerating}
              className="animate-pulse-glow"
            >
              {isGenerating ? (
                <>
                  <Loader2 className="w-4 h-4 animate-spin" />
                  Generating...
                </>
              ) : (
                <>
                  <Wand2 className="w-4 h-4" />
                  Generate Cover Letter
                </>
              )}
            </Button>
          </div>
        ) : (
          <div className="space-y-4">
            <div className="flex items-center justify-between">
              <p className="text-sm text-muted-foreground">
                Generated cover letter (review and customize as needed)
              </p>
              <Button
                variant="hero"
                size="sm"
                onClick={generateCoverLetter}
                disabled={isGenerating}
              >
                {isGenerating ? (
                  <>
                    <Loader2 className="w-4 h-4 animate-spin" />
                    Regenerating...
                  </>
                ) : (
                  <>
                    <Wand2 className="w-4 h-4" />
                    Regenerate
                  </>
                )}
              </Button>
            </div>
            
            <Textarea
              value={coverLetter}
              onChange={(e) => setCoverLetter(e.target.value)}
              className="min-h-[400px] resize-none border-primary/20 focus:border-primary/40 transition-colors font-mono text-sm"
              placeholder="Your generated cover letter will appear here..."
            />
          </div>
        )}
      </div>
    </Card>
  );
};