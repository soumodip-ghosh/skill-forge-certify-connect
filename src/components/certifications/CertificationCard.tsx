import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Download, Share2, Award, Calendar, Shield } from 'lucide-react';

interface CertificationCardProps {
  certification: {
    id: number;
    title: string;
    courseName: string;
    issueDate: string;
    blockchainHash: string;
    instructorName: string;
    skills: string[];
    grade?: string;
  };
}

export const CertificationCard = ({ certification }: CertificationCardProps) => {
  const handleDownloadPDF = () => {
    console.log('Downloading PDF for certification:', certification.id);
    // Implement PDF generation and download
  };

  const handleShare = () => {
    console.log('Sharing certification:', certification.id);
    // Implement sharing functionality
  };

  const handleVerify = () => {
    console.log('Verifying blockchain certificate:', certification.blockchainHash);
    // Implement blockchain verification
  };

  return (
    <Card className="hover:shadow-lg transition-shadow">
      <CardHeader>
        <div className="flex items-start justify-between">
          <div className="flex-1">
            <CardTitle className="text-lg flex items-center space-x-2">
              <Award className="h-5 w-5 text-yellow-500" />
              <span>{certification.title}</span>
            </CardTitle>
            <p className="text-sm text-muted-foreground mt-1">
              {certification.courseName}
            </p>
            <p className="text-sm text-muted-foreground">
              Instructor: {certification.instructorName}
            </p>
          </div>
          {certification.grade && (
            <Badge variant="secondary" className="ml-2">
              Grade: {certification.grade}
            </Badge>
          )}
        </div>
      </CardHeader>

      <CardContent className="space-y-4">
        <div className="flex items-center space-x-4 text-sm text-muted-foreground">
          <div className="flex items-center space-x-1">
            <Calendar className="h-4 w-4" />
            <span>Issued: {new Date(certification.issueDate).toLocaleDateString()}</span>
          </div>
          <div className="flex items-center space-x-1">
            <Shield className="h-4 w-4 text-green-500" />
            <span>Blockchain Verified</span>
          </div>
        </div>

        <div>
          <p className="text-sm font-medium mb-2">Skills Certified:</p>
          <div className="flex flex-wrap gap-1">
            {certification.skills.map((skill) => (
              <Badge key={skill} variant="outline" className="text-xs">
                {skill}
              </Badge>
            ))}
          </div>
        </div>

        <div className="bg-muted p-3 rounded-md">
          <p className="text-xs text-muted-foreground mb-1">Blockchain Hash:</p>
          <p className="text-xs font-mono break-all">{certification.blockchainHash}</p>
        </div>

        <div className="flex flex-wrap gap-2">
          <Button onClick={handleDownloadPDF} size="sm">
            <Download className="mr-2 h-4 w-4" />
            Download PDF
          </Button>
          <Button onClick={handleShare} variant="outline" size="sm">
            <Share2 className="mr-2 h-4 w-4" />
            Share
          </Button>
          <Button onClick={handleVerify} variant="outline" size="sm">
            <Shield className="mr-2 h-4 w-4" />
            Verify
          </Button>
        </div>
      </CardContent>
    </Card>
  );
};