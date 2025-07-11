import { useState } from 'react';
import { CourseCard } from './CourseCard';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Badge } from '@/components/ui/badge';
import { Search, Filter, Plus } from 'lucide-react';

interface CourseListProps {
  userType: 'learner' | 'mentor' | 'recruiter';
}

export const CourseList = ({ userType }: CourseListProps) => {
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedLevel, setSelectedLevel] = useState('all');
  const [selectedCategory, setSelectedCategory] = useState('all');

  const courses = [
    {
      id: 1,
      title: 'Web Development Fundamentals',
      description: 'Learn the basics of HTML, CSS, JavaScript, and web APIs',
      instructor: 'Sarah Johnson',
      duration: '8 weeks',
      students: 1234,
      progress: userType === 'learner' ? 65 : undefined,
      topics: ['HTML', 'CSS', 'JavaScript', 'Database', 'API', 'Responsive Design'],
      level: 'Beginner' as const,
      isEnrolled: userType === 'learner',
      category: 'Web Development'
    },
    {
      id: 2,
      title: 'React Development Masterclass',
      description: 'Build modern web applications with React and its ecosystem',
      instructor: 'Mike Chen',
      duration: '10 weeks',
      students: 892,
      progress: userType === 'learner' ? 30 : undefined,
      topics: ['React', 'Hooks', 'State Management', 'Routing', 'Testing'],
      level: 'Intermediate' as const,
      isEnrolled: userType === 'learner',
      category: 'Web Development'
    },
    {
      id: 3,
      title: 'Mobile App Development with React Native',
      description: 'Create cross-platform mobile apps using React Native',
      instructor: 'Emily Rodriguez',
      duration: '12 weeks',
      students: 567,
      topics: ['React Native', 'Navigation', 'State Management', 'APIs', 'Publishing'],
      level: 'Advanced' as const,
      isEnrolled: false,
      category: 'Mobile Development'
    },
    {
      id: 4,
      title: 'Data Science with Python',
      description: 'Learn data analysis, visualization, and machine learning',
      instructor: 'Dr. James Wilson',
      duration: '14 weeks',
      students: 2103,
      topics: ['Python', 'Pandas', 'NumPy', 'Machine Learning', 'Data Visualization'],
      level: 'Intermediate' as const,
      isEnrolled: false,
      category: 'Data Science'
    }
  ];

  const filteredCourses = courses.filter(course => {
    const matchesSearch = course.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         course.description.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesLevel = selectedLevel === 'all' || course.level === selectedLevel;
    const matchesCategory = selectedCategory === 'all' || course.category === selectedCategory;
    
    return matchesSearch && matchesLevel && matchesCategory;
  });

  const categories = ['Web Development', 'Mobile Development', 'Data Science', 'Cloud Computing', 'Cybersecurity'];

  const handleEnroll = (courseId: number) => {
    console.log('Enrolling in course:', courseId);
  };

  const handleResume = (courseId: number) => {
    console.log('Resuming course:', courseId);
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h1 className="text-3xl font-bold">
          {userType === 'learner' ? 'My Courses' : userType === 'mentor' ? 'Course Management' : 'Available Courses'}
        </h1>
        {userType === 'mentor' && (
          <Button>
            <Plus className="mr-2 h-4 w-4" />
            Create Course
          </Button>
        )}
      </div>

      {/* Filters */}
      <div className="flex flex-col sm:flex-row gap-4">
        <div className="relative flex-1">
          <Search className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
          <Input
            placeholder="Search courses..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="pl-10"
          />
        </div>
        <Select value={selectedLevel} onValueChange={setSelectedLevel}>
          <SelectTrigger className="w-full sm:w-[180px]">
            <SelectValue placeholder="Level" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="all">All Levels</SelectItem>
            <SelectItem value="Beginner">Beginner</SelectItem>
            <SelectItem value="Intermediate">Intermediate</SelectItem>
            <SelectItem value="Advanced">Advanced</SelectItem>
          </SelectContent>
        </Select>
        <Select value={selectedCategory} onValueChange={setSelectedCategory}>
          <SelectTrigger className="w-full sm:w-[180px]">
            <SelectValue placeholder="Category" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="all">All Categories</SelectItem>
            {categories.map(category => (
              <SelectItem key={category} value={category}>{category}</SelectItem>
            ))}
          </SelectContent>
        </Select>
      </div>

      {/* Course Stats for Learners */}
      {userType === 'learner' && (
        <div className="flex flex-wrap gap-4">
          <Badge variant="secondary" className="px-3 py-1">
            {courses.filter(c => c.isEnrolled).length} Enrolled
          </Badge>
          <Badge variant="secondary" className="px-3 py-1">
            {courses.filter(c => c.isEnrolled && c.progress === 100).length} Completed
          </Badge>
          <Badge variant="secondary" className="px-3 py-1">
            {courses.filter(c => c.isEnrolled && c.progress && c.progress > 0 && c.progress < 100).length} In Progress
          </Badge>
        </div>
      )}

      {/* Course Grid */}
      <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
        {filteredCourses.map((course) => (
          <CourseCard
            key={course.id}
            course={course}
            onEnroll={handleEnroll}
            onResume={handleResume}
          />
        ))}
      </div>

      {filteredCourses.length === 0 && (
        <div className="text-center py-12">
          <p className="text-muted-foreground">No courses found matching your criteria.</p>
        </div>
      )}
    </div>
  );
};