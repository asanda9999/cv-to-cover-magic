import React, { useState } from 'react';
import { FileUpload } from '@/components/FileUpload';
import { JobDescriptionInput } from '@/components/JobDescriptionInput';
import { CoverLetterGenerator } from '@/components/CoverLetterGenerator';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { Sparkles, FileText, Wand2, CheckCircle } from 'lucide-react';
import heroImage from '@/assets/hero-bg.jpg';

const Index = () => {
  const [cvContent, setCvContent] = useState('');
  const [jobDescription, setJobDescription] = useState('');
  const [uploadedFileName, setUploadedFileName] = useState<string | null>(null);

  const handleFileContent = (content: string) => {
    setCvContent(content);
    setUploadedFileName(content ? 'CV uploaded' : null);
  };

  const steps = [
    {
      number: 1,
      title: "Upload Your CV",
      description: "Upload your resume in PDF or text format",
      icon: FileText,
      completed: !!cvContent,
    },
    {
      number: 2,
      title: "Add Job Description",
      description: "Paste the job posting you're applying for",
      icon: Wand2,
      completed: !!jobDescription.trim(),
    },
    {
      number: 3,
      title: "Generate Cover Letter",
      description: "AI creates a personalized cover letter",
      icon: Sparkles,
      completed: false,
    },
  ];

  return (
    <div className="min-h-screen bg-background">
      {/* Hero Section */}
      <section className="relative py-20 px-4 overflow-hidden">
        <div 
          className="absolute inset-0 bg-cover bg-center bg-no-repeat opacity-10"
          style={{ backgroundImage: `url(${heroImage})` }}
        />
        <div className="absolute inset-0 bg-gradient-hero opacity-90" />
        
        <div className="relative max-w-6xl mx-auto text-center">
          <div className="animate-fade-up">
            <h1 className="text-5xl md:text-7xl font-bold text-primary-foreground mb-6">
              Vocara
              <span className="block text-primary-glow">Cover Letters</span>
            </h1>
            <p className="text-xl md:text-2xl text-primary-foreground/90 mb-8 max-w-3xl mx-auto">
              Transform your CV and any job description into a compelling, personalized cover letter using AI
            </p>
            <div className="flex flex-wrap justify-center gap-4 text-primary-foreground/80">
              <span className="flex items-center gap-2">
                <CheckCircle className="w-5 h-5" />
                AI-Powered Generation
              </span>
              <span className="flex items-center gap-2">
                <CheckCircle className="w-5 h-5" />
                Instant Results
              </span>
              <span className="flex items-center gap-2">
                <CheckCircle className="w-5 h-5" />
                Professional Quality
              </span>
            </div>
          </div>
        </div>
      </section>

      {/* Steps Section */}
      <section className="py-16 px-4 bg-muted/30">
        <div className="max-w-6xl mx-auto">
          <h2 className="text-3xl font-bold text-center text-foreground mb-12">
            How It Works
          </h2>
          <div className="grid md:grid-cols-3 gap-8">
            {steps.map((step) => (
              <Card key={step.number} className="p-6 text-center bg-gradient-card shadow-card hover:shadow-elegant transition-all duration-300">
                <div className={`inline-flex items-center justify-center w-16 h-16 rounded-full mb-4 transition-all duration-300 ${
                  step.completed 
                    ? 'bg-primary text-primary-foreground shadow-elegant' 
                    : 'bg-primary/10 text-primary'
                }`}>
                  {step.completed ? (
                    <CheckCircle className="w-8 h-8" />
                  ) : (
                    <step.icon className="w-8 h-8" />
                  )}
                </div>
                <h3 className="text-xl font-semibold text-foreground mb-2">
                  {step.title}
                </h3>
                <p className="text-muted-foreground">
                  {step.description}
                </p>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Main Content */}
      <section className="py-16 px-4">
        <div className="max-w-6xl mx-auto space-y-8">
          <div className="grid lg:grid-cols-2 gap-8">
            <div className="space-y-6">
              <FileUpload 
                onFileContent={handleFileContent}
                uploadedFileName={uploadedFileName}
              />
              <JobDescriptionInput
                value={jobDescription}
                onChange={setJobDescription}
              />
            </div>
            
            <div className="lg:col-span-1">
              <CoverLetterGenerator
                cvContent={cvContent}
                jobDescription={jobDescription}
              />
            </div>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="py-8 px-4 bg-muted/50 border-t">
        <div className="max-w-6xl mx-auto text-center">
          <p className="text-muted-foreground">
            Hydra Tech - Crafted with creativity 
          </p>
        </div>
      </footer>
    </div>
  );
};

export default Index;