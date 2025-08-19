import React from 'react';
import { Textarea } from '@/components/ui/textarea';
import { Card } from '@/components/ui/card';
import { Label } from '@/components/ui/label';

interface JobDescriptionInputProps {
  value: string;
  onChange: (value: string) => void;
}

export const JobDescriptionInput: React.FC<JobDescriptionInputProps> = ({
  value,
  onChange,
}) => {
  return (
    <Card className="p-6 bg-gradient-card shadow-card">
      <div className="space-y-4">
        <div className="space-y-2">
          <Label htmlFor="job-description" className="text-lg font-semibold text-foreground">
            Job Description
          </Label>
          <p className="text-sm text-muted-foreground">
            Paste the job description for the position you're applying to
          </p>
        </div>
        
        <Textarea
          id="job-description"
          placeholder="Paste the job description here... Include details about the role, requirements, responsibilities, and company information."
          value={value}
          onChange={(e) => onChange(e.target.value)}
          className="min-h-[200px] resize-none border-primary/20 focus:border-primary/40 transition-colors"
        />
      </div>
    </Card>
  );
};