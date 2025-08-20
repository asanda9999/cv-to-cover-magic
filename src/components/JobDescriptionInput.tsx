import React from 'react';
import { Textarea } from '@/components/ui/textarea';
import { Card } from '@/components/ui/card';
import { Label } from '@/components/ui/label';
import { FileText } from 'lucide-react';

interface JobDescriptionInputProps {
  value: string;
  onChange: (value: string) => void;
}

export const JobDescriptionInput: React.FC<JobDescriptionInputProps> = ({
  value,
  onChange,
}) => {
  return (
    <Card className="p-8">
      <div className="space-y-6">
        <div className="flex items-start gap-4">
          <div className="flex items-center justify-center w-12 h-12 rounded-full bg-primary/10 text-primary flex-shrink-0">
            <FileText className="w-6 h-6" />
          </div>
          <div className="flex-1">
            <Label htmlFor="job-description" className="text-2xl font-semibold text-foreground block mb-2">
              Job Description
            </Label>
            <p className="text-muted-foreground">
              Paste the complete job posting to create a tailored cover letter
            </p>
          </div>
        </div>
        
        <Textarea
          id="job-description"
          placeholder="Paste the job description here...

Include details such as:
• Job title and company name
• Key responsibilities and requirements
• Required skills and qualifications
• Company culture and values

The more details you provide, the better your cover letter will be!"
          value={value}
          onChange={(e) => onChange(e.target.value)}
          className="min-h-[300px] resize-none border-border/50 focus:border-primary/50 transition-colors text-base leading-relaxed rounded-2xl"
        />
        
        {value.trim() && (
          <div className="flex items-center gap-2 text-sm text-muted-foreground">
            <div className="w-2 h-2 rounded-full bg-accent"></div>
            <span>{value.trim().split(/\s+/).length} words • Ready to generate</span>
          </div>
        )}
      </div>
    </Card>
  );
};