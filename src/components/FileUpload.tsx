import React, { useCallback, useState } from 'react';
import { Upload, FileText, X, CheckCircle } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { useToast } from '@/hooks/use-toast';

interface FileUploadProps {
  onFileContent: (content: string) => void;
  uploadedFileName: string | null;
}

export const FileUpload: React.FC<FileUploadProps> = ({ onFileContent, uploadedFileName }) => {
  const [isDragging, setIsDragging] = useState(false);
  const [isProcessing, setIsProcessing] = useState(false);
  const { toast } = useToast();

  const processFile = useCallback(async (file: File) => {
    if (!file) return;

    // Check file type
    const validTypes = ['application/pdf', 'text/plain', '.pdf', '.txt'];
    const isValidType = validTypes.some(type => 
      file.type === type || file.name.toLowerCase().endsWith(type.replace('application/', '').replace('text/', ''))
    );

    if (!isValidType) {
      toast({
        title: "Invalid file type",
        description: "Please upload a PDF or text file.",
        variant: "destructive"
      });
      return;
    }

    setIsProcessing(true);
    
    try {
      let content = '';
      
      if (file.type === 'text/plain' || file.name.toLowerCase().endsWith('.txt')) {
        content = await file.text();
      } else if (file.type === 'application/pdf' || file.name.toLowerCase().endsWith('.pdf')) {
        // For demo purposes, we'll simulate PDF text extraction
        content = `[PDF Content from ${file.name}]\n\nThis is a placeholder for PDF text extraction. In a production app, you would use a library like pdf-parse or pdf2pic to extract text from the PDF file.`;
        
        toast({
          title: "PDF uploaded successfully",
          description: "PDF text extraction is simulated for this demo.",
        });
      }
      
      onFileContent(content);
      
      toast({
        title: "File uploaded successfully",
        description: `${file.name} has been processed.`,
      });
    } catch (error) {
      console.error('Error processing file:', error);
      toast({
        title: "Error processing file",
        description: "Please try again with a different file.",
        variant: "destructive"
      });
    } finally {
      setIsProcessing(false);
    }
  }, [onFileContent, toast]);

  const handleDrop = useCallback((e: React.DragEvent) => {
    e.preventDefault();
    setIsDragging(false);
    
    const files = Array.from(e.dataTransfer.files);
    if (files.length > 0) {
      processFile(files[0]);
    }
  }, [processFile]);

  const handleFileSelect = useCallback((e: React.ChangeEvent<HTMLInputElement>) => {
    const files = e.target.files;
    if (files && files.length > 0) {
      processFile(files[0]);
    }
  }, [processFile]);

  const handleDragOver = useCallback((e: React.DragEvent) => {
    e.preventDefault();
    setIsDragging(true);
  }, []);

  const handleDragLeave = useCallback((e: React.DragEvent) => {
    e.preventDefault();
    setIsDragging(false);
  }, []);

  const clearFile = useCallback(() => {
    onFileContent('');
  }, [onFileContent]);

  return (
    <Card className="p-8">
      <div className="space-y-6">
        <div className="flex items-center justify-between">
          <div>
            <h3 className="text-2xl font-semibold text-foreground mb-2">Upload Your CV</h3>
            <p className="text-muted-foreground">
              Upload your resume to get started with your personalized cover letter
            </p>
          </div>
          {uploadedFileName && (
            <Button
              variant="ghost"
              size="sm"
              onClick={clearFile}
              className="text-muted-foreground hover:text-destructive"
            >
              <X className="w-4 h-4" />
            </Button>
          )}
        </div>
        
        {uploadedFileName ? (
          <div className="flex items-center gap-4 p-6 bg-accent/10 rounded-2xl border border-accent/20">
            <div className="flex items-center justify-center w-12 h-12 rounded-full bg-accent text-accent-foreground">
              <CheckCircle className="w-6 h-6" />
            </div>
            <div className="flex-1">
              <p className="font-medium text-foreground">CV uploaded successfully</p>
              <p className="text-sm text-muted-foreground">Ready to generate your cover letter</p>
            </div>
          </div>
        ) : (
          <div
            className={`relative border-2 border-dashed rounded-2xl p-12 text-center transition-all duration-300 ${
              isDragging
                ? 'border-primary bg-primary/5 scale-105'
                : 'border-border hover:border-primary/60 hover:bg-muted/50'
            }`}
            onDrop={handleDrop}
            onDragOver={handleDragOver}
            onDragLeave={handleDragLeave}
          >
            <div className="flex flex-col items-center space-y-4">
              <div className={`flex items-center justify-center w-16 h-16 rounded-full transition-all duration-300 ${
                isDragging ? 'bg-primary text-primary-foreground scale-110' : 'bg-primary/10 text-primary'
              }`}>
                <Upload className="w-8 h-8" />
              </div>
              
              <div className="space-y-2">
                <p className="text-lg font-medium text-foreground">
                  {isProcessing ? 'Processing your file...' : 'Drop your CV here'}
                </p>
                <p className="text-muted-foreground">
                  or click to browse • PDF, TXT files supported
                </p>
              </div>

              <Button 
                variant="outline" 
                disabled={isProcessing}
                className="mt-4"
              >
                {isProcessing ? 'Processing...' : 'Choose File'}
              </Button>
            </div>
            
            <input
              type="file"
              accept=".pdf,.txt,application/pdf,text/plain"
              onChange={handleFileSelect}
              className="absolute inset-0 w-full h-full opacity-0 cursor-pointer"
              disabled={isProcessing}
            />
          </div>
        )}
      </div>
    </Card>
  );
};