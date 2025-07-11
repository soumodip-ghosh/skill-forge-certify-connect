import { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Textarea } from '@/components/ui/textarea';
import { Play, Save, Download, RotateCcw } from 'lucide-react';
import { Badge } from '@/components/ui/badge';

export const CodingInterface = () => {
  const [selectedLanguage, setSelectedLanguage] = useState('javascript');
  const [code, setCode] = useState(`// Welcome to the coding interface
console.log("Hello, World!");

// Start coding here...`);
  const [output, setOutput] = useState('');
  const [isRunning, setIsRunning] = useState(false);

  const languages = [
    { value: 'javascript', label: 'JavaScript' },
    { value: 'python', label: 'Python' },
    { value: 'java', label: 'Java' },
    { value: 'cpp', label: 'C++' },
    { value: 'html', label: 'HTML/CSS' },
    { value: 'sql', label: 'SQL' }
  ];

  const handleRunCode = async () => {
    setIsRunning(true);
    // Simulate code execution
    setTimeout(() => {
      setOutput(`Code executed successfully!\nOutput: Hello, World!\n\n[Executed in 0.23s]`);
      setIsRunning(false);
    }, 1500);
  };

  const handleSaveCode = () => {
    console.log('Saving code...');
    // Implement save functionality
  };

  const handleDownloadCode = () => {
    const element = document.createElement('a');
    const file = new Blob([code], { type: 'text/plain' });
    element.href = URL.createObjectURL(file);
    element.download = `code.${selectedLanguage === 'javascript' ? 'js' : selectedLanguage}`;
    document.body.appendChild(element);
    element.click();
    document.body.removeChild(element);
  };

  const handleResetCode = () => {
    setCode(`// Welcome to the coding interface
console.log("Hello, World!");

// Start coding here...`);
    setOutput('');
  };

  return (
    <div className="h-full flex flex-col">
      <Card className="flex-1 flex flex-col">
        <CardHeader className="pb-3">
          <div className="flex items-center justify-between">
            <CardTitle className="text-lg">Code Editor</CardTitle>
            <div className="flex items-center space-x-2">
              <Badge variant="outline" className="text-xs">
                Powered by OnlineGDB
              </Badge>
              <Select value={selectedLanguage} onValueChange={setSelectedLanguage}>
                <SelectTrigger className="w-32">
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  {languages.map((lang) => (
                    <SelectItem key={lang.value} value={lang.value}>
                      {lang.label}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
          </div>
        </CardHeader>

        <CardContent className="flex-1 flex flex-col space-y-4 p-4">
          {/* Code Editor */}
          <div className="flex-1 min-h-[300px]">
            <Textarea
              value={code}
              onChange={(e) => setCode(e.target.value)}
              placeholder="Write your code here..."
              className="h-full resize-none font-mono text-sm"
              style={{ minHeight: '300px' }}
            />
          </div>

          {/* Action Buttons */}
          <div className="flex flex-wrap gap-2">
            <Button 
              onClick={handleRunCode} 
              disabled={isRunning}
              className="flex-1 sm:flex-none"
            >
              <Play className="mr-2 h-4 w-4" />
              {isRunning ? 'Running...' : 'Run Code'}
            </Button>
            <Button 
              onClick={handleSaveCode}
              variant="outline"
              size="sm"
            >
              <Save className="mr-2 h-4 w-4" />
              Save
            </Button>
            <Button 
              onClick={handleDownloadCode}
              variant="outline"
              size="sm"
            >
              <Download className="mr-2 h-4 w-4" />
              Download
            </Button>
            <Button 
              onClick={handleResetCode}
              variant="outline"
              size="sm"
            >
              <RotateCcw className="mr-2 h-4 w-4" />
              Reset
            </Button>
          </div>

          {/* Output Section */}
          <div className="border-t pt-4">
            <h4 className="font-medium mb-2">Output:</h4>
            <div className="bg-muted p-3 rounded-md min-h-[100px] font-mono text-sm whitespace-pre-wrap">
              {output || 'No output yet. Run your code to see results.'}
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};