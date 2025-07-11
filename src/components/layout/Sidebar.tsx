import { Link, useLocation } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { BookOpen, Award, Users, Briefcase, User, Home, Plus, MessageSquare } from 'lucide-react';
import { cn } from '@/lib/utils';

interface SidebarProps {
  userType: 'learner' | 'mentor' | 'recruiter';
}

export const Sidebar = ({ userType }: SidebarProps) => {
  const location = useLocation();

  const isActive = (path: string) => location.pathname === path;

  const learnerLinks = [
    { href: '/dashboard', label: 'Dashboard', icon: Home },
    { href: '/courses', label: 'My Courses', icon: BookOpen },
    { href: '/certifications', label: 'Certifications', icon: Award },
    { href: '/mentorship', label: 'Mentorship', icon: Users },
    { href: '/jobs', label: 'Job Search', icon: Briefcase },
    { href: '/profile', label: 'Profile', icon: User },
  ];

  const mentorLinks = [
    { href: '/dashboard', label: 'Dashboard', icon: Home },
    { href: '/courses', label: 'My Courses', icon: BookOpen },
    { href: '/mentorship', label: 'Mentees', icon: Users },
    { href: '/profile', label: 'Profile', icon: User },
  ];

  const recruiterLinks = [
    { href: '/dashboard', label: 'Dashboard', icon: Home },
    { href: '/jobs', label: 'Job Postings', icon: Briefcase },
    { href: '/candidates', label: 'Candidates', icon: Users },
    { href: '/profile', label: 'Profile', icon: User },
  ];

  const getLinks = () => {
    switch (userType) {
      case 'mentor':
        return mentorLinks;
      case 'recruiter':
        return recruiterLinks;
      default:
        return learnerLinks;
    }
  };

  const links = getLinks();

  return (
    <div className="hidden lg:fixed lg:inset-y-0 lg:z-50 lg:flex lg:w-72 lg:flex-col">
      <div className="flex grow flex-col gap-y-5 overflow-y-auto border-r bg-background px-6 pb-4">
        <div className="flex h-16 shrink-0 items-center">
          <Badge variant="outline" className="px-3 py-1">
            {userType.charAt(0).toUpperCase() + userType.slice(1)} Portal
          </Badge>
        </div>
        <nav className="flex flex-1 flex-col">
          <ul role="list" className="flex flex-1 flex-col gap-y-7">
            <li>
              <ul role="list" className="-mx-2 space-y-1">
                {links.map((item) => {
                  const Icon = item.icon;
                  return (
                    <li key={item.href}>
                      <Link
                        to={item.href}
                        className={cn(
                          'group flex gap-x-3 rounded-md p-2 text-sm leading-6 font-semibold transition-colors',
                          isActive(item.href)
                            ? 'bg-primary text-primary-foreground'
                            : 'text-muted-foreground hover:text-foreground hover:bg-muted'
                        )}
                      >
                        <Icon className="h-6 w-6 shrink-0" />
                        {item.label}
                      </Link>
                    </li>
                  );
                })}
              </ul>
            </li>
            
            {userType === 'mentor' && (
              <li>
                <div className="text-xs font-semibold leading-6 text-muted-foreground">
                  Actions
                </div>
                <ul role="list" className="-mx-2 mt-2 space-y-1">
                  <li>
                    <Button variant="ghost" className="w-full justify-start">
                      <Plus className="mr-2 h-4 w-4" />
                      Add Course
                    </Button>
                  </li>
                  <li>
                    <Button variant="ghost" className="w-full justify-start">
                      <MessageSquare className="mr-2 h-4 w-4" />
                      Messages
                    </Button>
                  </li>
                </ul>
              </li>
            )}

            {userType === 'recruiter' && (
              <li>
                <div className="text-xs font-semibold leading-6 text-muted-foreground">
                  Actions
                </div>
                <ul role="list" className="-mx-2 mt-2 space-y-1">
                  <li>
                    <Button variant="ghost" className="w-full justify-start">
                      <Plus className="mr-2 h-4 w-4" />
                      Post Job
                    </Button>
                  </li>
                </ul>
              </li>
            )}
          </ul>
        </nav>
      </div>
    </div>
  );
};