import React, { useState, useEffect } from 'react';
import { 
  FileText, // Kept for recent activity icon if needed
  Users, 
  BarChart2, // Kept for recent activity icon if needed
  ImageIcon,
  PlusCircle,
  BarChart3, // For Polls icon
  BookOpen // For Publications icon
} from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle, CardFooter } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Link } from 'react-router-dom';
import AdminSidebar from '@/components/Admin/AdminSidebar';
import AdminHeader from '@/components/Admin/AdminHeader';
import { supabase } from '@/lib/supabaseClient';
import { useAuth } from '@/contexts/AuthContext';
// import { useToast } from "@/components/ui/use-toast";

interface StatCardProps {
  title: string;
  value: string | number;
  icon: React.ReactNode;
}

const StatCard: React.FC<StatCardProps> = ({ title, value, icon }) => (
  <Card>
    <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
      <CardTitle className="text-sm font-medium text-gray-500">{title}</CardTitle>
      {icon}
    </CardHeader>
    <CardContent>
      <div className="text-3xl font-bold">{value}</div>
    </CardContent>
  </Card>
);

interface RecentActivityItem {
  id: string;
  type: 'Publication' | 'Poll';
  title: string;
  timestamp: string; 
  status?: string;
}

const AdminDashboard = () => {
  const [stats, setStats] = useState({
    totalPublications: 0,
    totalPolls: 0,
  });
  const [recentActivity, setRecentActivity] = useState<RecentActivityItem[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const { user } = useAuth();
  // const { toast } = useToast();

  useEffect(() => {
    const fetchDashboardData = async () => {
      if (!user) return; 
      setLoading(true);
      setError(null);
      try {
        const { count: pubCount, error: pubCountError } = await supabase
          .from('publications')
          .select('*', { count: 'exact', head: true });
        if (pubCountError) throw pubCountError;

        const { count: pollCount, error: pollCountError } = await supabase
          .from('polls')
          .select('*', { count: 'exact', head: true });
        if (pollCountError) throw pollCountError;

        setStats({
          totalPublications: pubCount || 0,
          totalPolls: pollCount || 0,
        });

        const { data: recentPubs, error: recentPubsError } = await supabase
          .from('publications')
          .select('id, title_en, created_at, status')
          .order('created_at', { ascending: false })
          .limit(3);
        if (recentPubsError) throw recentPubsError;

        const { data: recentPolls, error: recentPollsError } = await supabase
          .from('polls')
          .select('id, title_en, created_at, status')
          .order('created_at', { ascending: false })
          .limit(2);
        if (recentPollsError) throw recentPollsError;

        const activities: RecentActivityItem[] = [];
        (recentPubs || []).forEach(p => activities.push({ 
            id: p.id, 
            type: 'Publication', 
            title: p.title_en, 
            timestamp: p.created_at,
            status: p.status
        }));
        (recentPolls || []).forEach(p => activities.push({ 
            id: p.id, 
            type: 'Poll', 
            title: p.title_en, 
            timestamp: p.created_at,
            status: p.status
        }));
        
        activities.sort((a, b) => new Date(b.timestamp).getTime() - new Date(a.timestamp).getTime());
        setRecentActivity(activities.slice(0, 5));

      } catch (err: any) {
        console.error("Error fetching dashboard data:", err);
        setError(err.message || "Failed to load dashboard data.");
        // toast({ title: "Error", description: "Failed to load dashboard data.", variant: "destructive" });
      } finally {
        setLoading(false);
      }
    };

    fetchDashboardData();
  }, [user]);

  const getActivityIcon = (type: 'Publication' | 'Poll') => {
    if (type === 'Publication') return <BookOpen className="h-4 w-4 text-awrad-blue" />;
    return <BarChart3 className="h-4 w-4 text-awrad-green" />;
  };
  
  if (loading) {
    return <div className="flex min-h-screen bg-gray-100"><AdminSidebar /><div className="flex-1 p-6"><AdminHeader title="Dashboard" /><div>Loading dashboard...</div></div></div>;
  }
   if (error) {
    return <div className="flex min-h-screen bg-gray-100"><AdminSidebar /><div className="flex-1 p-6"><AdminHeader title="Dashboard" /><div className="text-red-500">Error: {error}</div></div></div>;
  }

  return (
    <div className="flex min-h-screen bg-gray-100">
      {/* Admin Sidebar */}
      <AdminSidebar />
      
      {/* Main Content */}
      <div className="flex-1">
        <AdminHeader title="Dashboard" />
        
        <div className="p-6">
          {/* Dashboard Stats */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
            <StatCard title="Total Publications" value={stats.totalPublications} icon={<BookOpen className="h-5 w-5 text-awrad-blue" />} />
            <StatCard title="Total Polls" value={stats.totalPolls} icon={<BarChart3 className="h-5 w-5 text-awrad-green" />} />
            {/* Add more StatCard components for other stats like Team Members, Visitors if data source is available */}
             <Card>
              <CardHeader className="pb-2">
                <CardTitle className="text-sm font-medium text-gray-500">Team Members</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="text-3xl font-bold">52</div> {/* Placeholder */}
                <p className="text-xs text-gray-500 flex items-center mt-1">
                  (Static Data)
                </p>
              </CardContent>
            </Card>
            <Card>
              <CardHeader className="pb-2">
                <CardTitle className="text-sm font-medium text-gray-500">Website Visitors</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="text-3xl font-bold">1,824</div> {/* Placeholder */}
                <p className="text-xs text-green-500 flex items-center mt-1">
                  (Static Data)
                </p>
              </CardContent>
            </Card>
          </div>
          
          {/* Quick Actions */}
          <h2 className="text-lg font-bold mb-4">Quick Actions</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center">
                  <BookOpen className="mr-2 h-5 w-5 text-awrad-blue" />
                  Manage Publications
                </CardTitle>
              </CardHeader>
              <CardContent className="text-sm text-gray-600">
                Add, edit or delete publications and research reports.
              </CardContent>
              <CardFooter>
                <Link to="/admin/publications/new">
                  <Button className="bg-awrad-blue hover:bg-awrad-lightblue w-full">
                    <PlusCircle className="mr-2 h-4 w-4" /> Add Publication
                  </Button>
                </Link>
              </CardFooter>
            </Card>
             <Card>
              <CardHeader>
                <CardTitle className="flex items-center">
                  <BarChart3 className="mr-2 h-5 w-5 text-awrad-green" /> {/* Assuming awrad-green */}
                  Manage Polls
                </CardTitle>
              </CardHeader>
              <CardContent className="text-sm text-gray-600">
                Add, edit or delete public opinion polls.
              </CardContent>
              <CardFooter>
                <Link to="/admin/polls/new">
                  <Button className="bg-awrad-green hover:bg-awrad-lightgreen w-full"> {/* Assuming awrad-green */}
                    <PlusCircle className="mr-2 h-4 w-4" /> Add Poll
                  </Button>
                </Link>
              </CardFooter>
            </Card>
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center">
                  <ImageIcon className="mr-2 h-5 w-5 text-awrad-blue" />
                  Manage Media
                </CardTitle>
              </CardHeader>
              <CardContent className="text-sm text-gray-600">
                Upload and organize photos, documents and other media files.
              </CardContent>
              <CardFooter>
                <Link to="/admin/media"> {/* Changed from /admin/media/upload */}
                  <Button className="bg-awrad-blue hover:bg-awrad-lightblue w-full">
                    <PlusCircle className="mr-2 h-4 w-4" /> Go to Media
                  </Button>
                </Link>
              </CardFooter>
            </Card>
            {/* Placeholder for Team Management Quick Action if needed later */}
            {/* <Card>
              <CardHeader>
                <CardTitle className="flex items-center">
                  <Users className="mr-2 h-5 w-5 text-awrad-blue" />
                  Manage Team
                </CardTitle>
              </CardHeader>
              <CardContent className="text-sm text-gray-600">
                Add, edit or remove team members and their profiles.
              </CardContent>
              <CardFooter>
                <Link to="/admin/team/new">
                  <Button className="bg-awrad-blue hover:bg-awrad-lightblue w-full">
                    <PlusCircle className="mr-2 h-4 w-4" /> Add Team Member
                  </Button>
                </Link>
              </CardFooter>
            </Card> */}
          </div>
          
          {/* Recent Activity - now dynamically populated */}
          <Card>
            <CardHeader>
              <CardTitle>Recent Activity</CardTitle>
            </CardHeader>
            <CardContent>
              {recentActivity.length === 0 && <p className="text-sm text-gray-500">No recent activity.</p>}
              <div className="space-y-4">
                {recentActivity.map((activity) => (
                  <div key={activity.id} className="flex items-start gap-4 border-b pb-4 last:border-b-0 last:pb-0">
                    <div className="w-8 h-8 rounded-full bg-awrad-lightgray flex items-center justify-center flex-shrink-0">
                      {getActivityIcon(activity.type)}
                    </div>
                    <div>
                      <p className="font-medium">New {activity.type} {activity.status === 'Draft' ? '(Draft)' : 'Added'}</p>
                      <p className="text-sm text-gray-500 truncate max-w-xs" title={activity.title}>{activity.title}</p>
                      <p className="text-xs text-gray-400 mt-1">
                        {new Date(activity.timestamp).toLocaleDateString()} {new Date(activity.timestamp).toLocaleTimeString()}
                      </p>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
};

export default AdminDashboard;
