import { useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuSeparator, DropdownMenuTrigger } from '@/components/ui/dropdown-menu';
import { Bell, Settings, LogOut, User, BookOpen, Award, Users, Briefcase } from 'lucide-react';
import { Badge } from '@/components/ui/badge';

export const Header = () => {
  const location = useLocation();
  const [user] = useState({
    name: 'John Doe',
    email: 'john@example.com',
    avatar: '',
    type: 'learner',
    notifications: 3
  });

  const getActiveIcon = (path: string) => {
    return location.pathname === path ? 'text-primary' : 'text-muted-foreground hover:text-foreground';
  };

  return (
    <header className="sticky top-0 z-50 w-full border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
      <div className="container flex h-16 items-center justify-between">
        <div className="flex items-center space-x-6">
          <Link to="/" className="flex items-center space-x-2">
            <div className="h-8 w-8 rounded-lg bg-primary flex items-center justify-center">
              <BookOpen className="h-5 w-5 text-primary-foreground" />
            </div>
            <span className="text-xl font-bold">SkillBridge</span>
          </Link>
          
          <nav className="hidden md:flex space-x-6">
            <Link to="/courses" className={`flex items-center space-x-2 text-sm transition-colors ${getActiveIcon('/courses')}`}>
              <BookOpen className="h-4 w-4" />
              <span>Courses</span>
            </Link>
            <Link to="/certifications" className={`flex items-center space-x-2 text-sm transition-colors ${getActiveIcon('/certifications')}`}>
              <Award className="h-4 w-4" />
              <span>Certifications</span>
            </Link>
            <Link to="/mentorship" className={`flex items-center space-x-2 text-sm transition-colors ${getActiveIcon('/mentorship')}`}>
              <Users className="h-4 w-4" />
              <span>Mentorship</span>
            </Link>
            <Link to="/jobs" className={`flex items-center space-x-2 text-sm transition-colors ${getActiveIcon('/jobs')}`}>
              <Briefcase className="h-4 w-4" />
              <span>Jobs</span>
            </Link>
          </nav>
        </div>

        <div className="flex items-center space-x-4">
          <Button variant="ghost" size="icon" className="relative">
            <Bell className="h-5 w-5" />
            {user.notifications > 0 && (
              <Badge variant="destructive" className="absolute -top-1 -right-1 h-5 w-5 flex items-center justify-center p-0 text-xs">
                {user.notifications}
              </Badge>
            )}
          </Button>

          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="ghost" className="relative h-10 w-10 rounded-full">
                <Avatar className="h-10 w-10">
                  <AvatarImage src={user.avatar} alt={user.name} />
                  <AvatarFallback>{user.name.charAt(0)}</AvatarFallback>
                </Avatar>
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent className="w-56" align="end" forceMount>
              <div className="flex items-center justify-start gap-2 p-2">
                <div className="flex flex-col space-y-1 leading-none">
                  <p className="font-medium">{user.name}</p>
                  <p className="w-[200px] truncate text-sm text-muted-foreground">
                    {user.email}
                  </p>
                  <Badge variant="secondary" className="w-fit text-xs">
                    {user.type}
                  </Badge>
                </div>
              </div>
              <DropdownMenuSeparator />
              <DropdownMenuItem asChild>
                <Link to="/profile" className="flex items-center">
                  <User className="mr-2 h-4 w-4" />
                  <span>Profile</span>
                </Link>
              </DropdownMenuItem>
              <DropdownMenuItem>
                <Settings className="mr-2 h-4 w-4" />
                <span>Settings</span>
              </DropdownMenuItem>
              <DropdownMenuSeparator />
              <DropdownMenuItem>
                <LogOut className="mr-2 h-4 w-4" />
                <span>Log out</span>
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        </div>
      </div>
    </header>
  );
};
