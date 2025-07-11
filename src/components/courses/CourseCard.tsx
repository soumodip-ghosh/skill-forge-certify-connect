import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Progress } from '@/components/ui/progress';
import { Play, Clock, Users, Award } from 'lucide-react';

interface CourseCardProps {
  course: {
    id: number;
    title: string;
    description: string;
    instructor: string;
    duration: string;
    students: number;
    progress?: number;
    topics: string[];
    level: 'Beginner' | 'Intermediate' | 'Advanced';
    isEnrolled?: boolean;
  };
  onEnroll?: (courseId: number) => void;
  onResume?: (courseId: number) => void;
}

export const CourseCard = ({ course, onEnroll, onResume }: CourseCardProps) => {
  const getLevelColor = (level: string) => {
    switch (level) {
      case 'Beginner':
        return 'bg-green-100 text-green-800';
      case 'Intermediate':
        return 'bg-yellow-100 text-yellow-800';
      case 'Advanced':
        return 'bg-red-100 text-red-800';
      default:
        return 'bg-gray-100 text-gray-800';
    }
  };

  return (
    <Card className="h-full flex flex-col hover:shadow-lg transition-shadow">
      <CardHeader>
        <div className="flex items-start justify-between">
          <div className="flex-1">
            <CardTitle className="text-lg">{course.title}</CardTitle>
            <p className="text-sm text-muted-foreground mt-1">by {course.instructor}</p>
          </div>
          <Badge className={`${getLevelColor(course.level)} border-0`}>
            {course.level}
          </Badge>
        </div>
        <p className="text-sm text-muted-foreground">{course.description}</p>
      </CardHeader>

      <CardContent className="flex-1 flex flex-col">
        <div className="flex items-center space-x-4 text-sm text-muted-foreground mb-4">
          <div className="flex items-center space-x-1">
            <Clock className="h-4 w-4" />
            <span>{course.duration}</span>
          </div>
          <div className="flex items-center space-x-1">
            <Users className="h-4 w-4" />
            <span>{course.students} students</span>
          </div>
        </div>

        {course.isEnrolled && course.progress !== undefined && (
          <div className="mb-4">
            <div className="flex items-center justify-between mb-2">
              <span className="text-sm font-medium">Progress</span>
              <span className="text-sm text-muted-foreground">{course.progress}%</span>
            </div>
            <Progress value={course.progress} className="h-2" />
          </div>
        )}

        <div className="mb-4">
          <p className="text-sm font-medium mb-2">Topics covered:</p>
          <div className="flex flex-wrap gap-1">
            {course.topics.slice(0, 4).map((topic, index) => (
              <Badge key={topic} variant="outline" className="text-xs">
                {topic}
              </Badge>
            ))}
            {course.topics.length > 4 && (
              <Badge variant="outline" className="text-xs">
                +{course.topics.length - 4} more
              </Badge>
            )}
          </div>
        </div>

        <div className="mt-auto">
          {course.isEnrolled ? (
            <Button 
              onClick={() => onResume?.(course.id)} 
              className="w-full"
            >
              <Play className="mr-2 h-4 w-4" />
              {course.progress && course.progress > 0 ? 'Resume' : 'Start'} Course
            </Button>
          ) : (
            <Button 
              onClick={() => onEnroll?.(course.id)} 
              variant="outline" 
              className="w-full"
            >
              Enroll Now
            </Button>
          )}
        </div>
      </CardContent>
    </Card>
  );
};