import React, { useState } from 'react';
import { FileUpload } from '@/components/FileUpload';
import { JobDescriptionInput } from '@/components/JobDescriptionInput';
import { CoverLetterGenerator } from '@/components/CoverLetterGenerator';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { Sparkles, FileText, Wand2, CheckCircle, ArrowRight, Upload, Download, Zap } from 'lucide-react';

const Index = () => {
  const [cvContent, setCvContent] = useState('');
  const [jobDescription, setJobDescription] = useState('');
  const [uploadedFileName, setUploadedFileName] = useState<string | null>(null);

  const handleFileContent = (content: string) => {
    setCvContent(content);
    setUploadedFileName(content ? 'CV uploaded' : null);
  };

  const features = [
    {
      icon: Zap,
      title: "Lightning Fast",
      description: "Generate professional cover letters in seconds, not hours"
    },
    {
      icon: Sparkles,
      title: "AI-Powered",
      description: "Advanced AI analyzes your CV and job requirements for perfect matches"
    },
    {
      icon: CheckCircle,
      title: "ATS-Friendly",
      description: "Optimized for Applicant Tracking Systems to get past initial screening"
    }
  ];

  const steps = [
    {
      number: 1,
      title: "Upload Your CV",
      description: "Simply drag and drop your resume or browse to upload",
      icon: Upload,
      completed: !!cvContent,
    },
    {
      number: 2,
      title: "Paste Job Description",
      description: "Copy the job posting you're interested in",
      icon: FileText,
      completed: !!jobDescription.trim(),
    },
    {
      number: 3,
      title: "Generate & Download",
      description: "Get your personalized cover letter instantly",
      icon: Download,
      completed: false,
    },
  ];

  return (
    <div className="min-h-screen bg-background">
      {/* Navigation */}
      <nav className="fixed top-0 left-0 right-0 z-50 glass border-b border-border/20">
        <div className="max-w-7xl mx-auto container-padding">
          <div className="flex items-center justify-between h-16">
            <div className="flex items-center space-x-2">
              <Sparkles className="w-8 h-8 text-primary" />
              <span className="text-xl font-semibold text-foreground">CoverCraft</span>
            </div>
            <Button variant="ghost" size="sm">
              Sign In
            </Button>
          </div>
        </div>
      </nav>

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
              CV to Cover Letter
              <span className="block text-primary-glow">Magic</span>
            </h1>
            <p className="text-xl md:text-2xl text-muted-foreground mb-12 max-w-3xl mx-auto leading-relaxed">
              Transform your CV and any job description into a compelling, personalized cover letter using advanced AI technology
            </p>
            
            <div className="flex flex-col sm:flex-row gap-4 justify-center mb-16">
              <Button size="xl" className="group">
                Get Started
                <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
              </Button>
              <Button variant="outline" size="xl">
                Watch Demo
              </Button>
            </div>

            {/* Features Grid */}
            <div className="grid md:grid-cols-3 gap-8 mb-20">
              {features.map((feature, index) => (
                <div 
                  key={feature.title}
                  className="animate-slide-up"
                  style={{ animationDelay: `${index * 0.1}s` }}
                >
                  <Card className="p-8 text-center hover-lift">
                    <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-primary/10 text-primary mb-6">
                      <feature.icon className="w-8 h-8" />
                    </div>
                    <h3 className="text-xl font-semibold text-foreground mb-3">
                      {feature.title}
                    </h3>
                    <p className="text-muted-foreground leading-relaxed">
                      {feature.description}
                    </p>
                  </Card>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* How It Works Section */}
      <section className="section-padding bg-muted/30">
        <div className="max-w-7xl mx-auto container-padding">
          <div className="text-center mb-20">
            <h2 className="text-foreground mb-6">
              How it works
            </h2>
            <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
              Three simple steps to create your perfect cover letter
            </p>
          </div>

          <div className="grid lg:grid-cols-3 gap-12">
            {steps.map((step, index) => (
              <div 
                key={step.number}
                className="relative animate-scale-in"
                style={{ animationDelay: `${index * 0.2}s` }}
              >
                {/* Connection Line */}
                {index < steps.length - 1 && (
                  <div className="hidden lg:block absolute top-8 left-full w-full h-0.5 bg-gradient-to-r from-primary/50 to-transparent transform translate-x-6 z-0" />
                )}
                
                <Card className="p-8 text-center relative z-10 hover-lift">
                  <div className={`inline-flex items-center justify-center w-16 h-16 rounded-full mb-6 transition-all duration-300 ${
                    step.completed 
                      ? 'bg-accent text-accent-foreground shadow-apple-lg' 
                      : 'bg-primary/10 text-primary'
                  }`}>
                    {step.completed ? (
                      <CheckCircle className="w-8 h-8" />
                    ) : (
                      <step.icon className="w-8 h-8" />
                    )}
                  </div>
                  
                  <div className="text-sm font-medium text-primary mb-2">
                    Step {step.number}
                  </div>
                  
                  <h3 className="text-xl font-semibold text-foreground mb-3">
                    {step.title}
                  </h3>
                  
                  <p className="text-muted-foreground leading-relaxed">
                    {step.description}
                  </p>
                </Card>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Main Application Section */}
      <section className="section-padding">
        <div className="max-w-7xl mx-auto container-padding">
          <div className="text-center mb-16">
            <h2 className="text-foreground mb-6">
              Create your cover letter
            </h2>
            <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
              Upload your CV and paste the job description to get started
            </p>
          </div>

          <div className="grid lg:grid-cols-2 gap-12 items-start">
            <div className="space-y-8">
              <div className="animate-fade-in">
                <FileUpload 
                  onFileContent={handleFileContent}
                  uploadedFileName={uploadedFileName}
                />
              </div>
              
              <div className="animate-fade-in" style={{ animationDelay: '0.1s' }}>
                <JobDescriptionInput
                  value={jobDescription}
                  onChange={setJobDescription}
                />
              </div>
            </div>
            
            <div className="animate-fade-in" style={{ animationDelay: '0.2s' }}>
              <div className="sticky top-24">
                <CoverLetterGenerator
                  cvContent={cvContent}
                  jobDescription={jobDescription}
                />
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="section-padding bg-gradient-hero">
        <div className="max-w-4xl mx-auto container-padding text-center">
          <div className="animate-fade-in">
            <h2 className="text-white mb-6">
              Ready to land your dream job?
            </h2>
            <p className="text-xl text-white/90 mb-12 max-w-2xl mx-auto">
              Join thousands of professionals who have successfully landed interviews with our AI-powered cover letters
            </p>
            <Button size="xl" variant="secondary">
              Start Creating Now
              <ArrowRight className="w-5 h-5 ml-2" />
            </Button>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="py-8 px-4 bg-muted/50 border-t">
        <div className="max-w-6xl mx-auto text-center">
          <p className="text-muted-foreground">
            Built with ❤️ using React, TypeScript, and AI
          </p>
        </div>
      </footer>
    </div>
  );
};

export default Index;