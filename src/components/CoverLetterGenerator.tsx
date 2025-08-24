import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { Textarea } from '@/components/ui/textarea';
import { Loader2, Wand2, Copy, Download, Sparkles, CheckCircle } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';
import { generateCoverLetter as generateCoverLetterAPI } from '@/services/geminiService';

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

  const handleGenerateCoverLetter = async () => {
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
      const result = await generateCoverLetterAPI({
        cvContent,
        jobDescription,
        applicantName: '[Your Name]'
      });

      if (result.success && result.coverLetter) {
        setCoverLetter(result.coverLetter);
        toast({
          title: "Cover letter generated!",
          description: "Your personalized cover letter is ready.",
        });
      } else {
        throw new Error(result.error || 'Failed to generate cover letter');
      }
    } catch (error) {
      console.error('Error generating cover letter:', error);
      const errorMessage = error instanceof Error ? error.message : 'Unknown error occurred';
      toast({
        title: "Generation failed",
        description: errorMessage,
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
    <Card className="p-8">
      <div className="space-y-6">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-4">
            <div className="flex items-center justify-center w-12 h-12 rounded-full bg-primary/10 text-primary">
              <Sparkles className="w-6 h-6" />
            </div>
            <div>
              <h3 className="text-2xl font-semibold text-foreground">Generate Cover Letter</h3>
              <p className="text-muted-foreground">AI-powered personalization</p>
            </div>
          </div>
          
          {coverLetter && (
            <div className="flex gap-2">
              <Button
                variant="outline"
                size="sm"
                onClick={copyToClipboard}
                className="hover:bg-muted"
              >
                <Copy className="w-4 h-4 mr-2" />
                Copy
              </Button>
              <Button
                variant="outline"
                size="sm"
                onClick={downloadAsText}
                className="hover:bg-muted"
              >
                <Download className="w-4 h-4 mr-2" />
                Download
              </Button>
            </div>
          )}
        </div>

        {!coverLetter ? (
          <div className="text-center py-12">
            <div className="flex items-center justify-center w-20 h-20 rounded-full bg-primary/10 text-primary mx-auto mb-6">
              <Wand2 className="w-10 h-10" />
            </div>
            
            <h4 className="text-xl font-semibold text-foreground mb-3">
              Ready to create magic?
            </h4>
            <p className="text-muted-foreground mb-8 max-w-md mx-auto">
              Upload your CV and add a job description to generate a personalized cover letter that stands out
            </p>
            
            <div className="space-y-4">
              <Button
                size="lg"
                onClick={handleGenerateCoverLetter}
                disabled={!canGenerate || isGenerating}
                className="group"
              >
                {isGenerating ? (
                  <>
                    <Loader2 className="w-5 h-5 mr-2 animate-spin" />
                    Generating your cover letter...
                  </>
                ) : (
                  <>
                    <Sparkles className="w-5 h-5 mr-2 group-hover:rotate-12 transition-transform" />
                    Generate Cover Letter
                  </>
                )}
              </Button>
              
              {!canGenerate && (
                <p className="text-sm text-muted-foreground">
                  Complete the steps above to get started
                </p>
              )}
            </div>
          </div>
        ) : (
          <div className="space-y-6">
            <div className="flex items-center justify-between p-4 bg-accent/10 rounded-2xl border border-accent/20">
              <div className="flex items-center gap-3">
                <CheckCircle className="w-5 h-5 text-accent" />
                <div>
                  <p className="font-medium text-foreground">Cover letter generated</p>
                  <p className="text-sm text-muted-foreground">Review and customize as needed</p>
                </div>
              </div>
              
              <Button
                variant="outline"
                size="sm"
                onClick={handleGenerateCoverLetter}
                disabled={isGenerating}
              >
                {isGenerating ? (
                  <>
                    <Loader2 className="w-4 h-4 mr-2 animate-spin" />
                    Regenerating...
                  </>
                ) : (
                  <>
                    <Wand2 className="w-4 h-4 mr-2" />
                    Regenerate
                  </>
                )}
              </Button>
            </div>
            
            <Textarea
              value={coverLetter}
              onChange={(e) => setCoverLetter(e.target.value)}
              className="min-h-[500px] resize-none border-border/50 focus:border-primary/50 transition-colors font-mono text-sm leading-relaxed rounded-2xl"
              placeholder="Your generated cover letter will appear here..."
            />
          </div>
        )}
      </div>
    </Card>
  );
};