
import React, { useState, useEffect, useMemo } from 'react';
import AdminSidebar from '@/components/Admin/AdminSidebar';
import AdminHeader from '@/components/Admin/AdminHeader';
import { Button } from '@/components/ui/button';
import { Plus, Search, Filter, MoreHorizontal, Eye, Edit, Trash2, FileText, BarChart3 } from 'lucide-react';
import { Link, useNavigate } from 'react-router-dom';
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { supabase, Publication, Poll } from '@/lib/supabaseClient'; // Import Supabase client and types
import { useAuth } from '@/contexts/AuthContext';
// import { useToast } from "@/components/ui/use-toast"; // For notifications

// Combined type for items in the table
type ContentItem = (Publication & { item_type: 'publication' }) | (Poll & { item_type: 'poll' });

const AdminPublications = () => {
  const [allItems, setAllItems] = useState<ContentItem[]>([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const navigate = useNavigate();
  const { user } = useAuth();
  // const { toast } = useToast();

  const fetchData = async () => {
    setLoading(true);
    setError(null);
    try {
      const { data: publicationsData, error: pubError } = await supabase
        .from('publications')
        .select('*')
        .order('date', { ascending: false });

      if (pubError) throw pubError;

      const { data: pollsData, error: pollError } = await supabase
        .from('polls')
        .select('*')
        .order('date', { ascending: false });

      if (pollError) throw pollError;
      
      const combinedItems: ContentItem[] = [
        ...(publicationsData || []).map(p => ({ ...p, title_en: p.title_en || 'N/A', item_type: 'publication' as const })),
        ...(pollsData || []).map(p => ({ ...p, title_en: p.title_en || 'N/A', item_type: 'poll' as const }))
      ];
      
      // Sort by date again after combining, most recent first
      combinedItems.sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime());

      setAllItems(combinedItems);
    } catch (err: any) {
      console.error("Error fetching data:", err);
      setError(err.message || "Failed to fetch data.");
      // toast({ title: "Error", description: "Failed to fetch content.", variant: "destructive" });
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (user) { // Fetch data only if user is authenticated (admin)
        fetchData();
    }
  }, [user]);

  const handleDelete = async (id: string, itemType: 'publication' | 'poll') => {
    if (!window.confirm(`Are you sure you want to delete this ${itemType}?`)) return;

    const tableName = itemType === 'publication' ? 'publications' : 'polls';
    try {
      const { error: deleteError } = await supabase
        .from(tableName)
        .delete()
        .eq('id', id);

      if (deleteError) throw deleteError;

      // toast({ title: "Success", description: `${itemType.charAt(0).toUpperCase() + itemType.slice(1)} deleted successfully.` });
      fetchData(); // Refresh data
    } catch (err: any) {
      console.error(`Error deleting ${itemType}:`, err);
      setError(err.message || `Failed to delete ${itemType}.`);
      // toast({ title: "Error", description: `Failed to delete ${itemType}.`, variant: "destructive" });
    }
  };
  
  const toggleTrending = async (item: ContentItem) => {
    const tableName = item.item_type === 'publication' ? 'publications' : 'polls';
    const newTrendingState = !item.is_trending;
    try {
      const { error: updateError } = await supabase
        .from(tableName)
        .update({ is_trending: newTrendingState, updated_at: new Date().toISOString() })
        .eq('id', item.id);

      if (updateError) throw updateError;
      // toast({ title: "Success", description: "Trending status updated." });
      fetchData(); // Refresh data
    } catch (err: any) {
      console.error("Error updating trending status:", err);
      // toast({ title: "Error", description: "Failed to update trending status.", variant: "destructive" });
    }
  };
  
  const filteredItems = useMemo(() => {
    return allItems.filter(item => 
      (item.title_en?.toLowerCase() || '').includes(searchTerm.toLowerCase()) ||
      (item.item_type === 'publication' && (item as Publication).category_en?.toLowerCase().includes(searchTerm.toLowerCase()))
    );
  }, [allItems, searchTerm]);

  if (loading) {
    return (
        <div className="flex min-h-screen bg-gray-100">
            <AdminSidebar />
            <div className="flex-1 p-6">
                <AdminHeader title="Content Management" />
                <div>Loading content...</div>
            </div>
        </div>
    );
  }

  if (error) {
     return (
        <div className="flex min-h-screen bg-gray-100">
            <AdminSidebar />
            <div className="flex-1 p-6">
                <AdminHeader title="Content Management" />
                <div className="text-red-600">Error: {error}</div>
            </div>
        </div>
    );
  }
  
  return (
    <div className="flex min-h-screen bg-gray-100">
      <AdminSidebar />
      
      <div className="flex-1">
        <AdminHeader title="Content Management" /> {/* Updated title */}
        
        <div className="p-6">
          <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center mb-6 gap-4">
            <div className="relative w-full sm:w-auto">
              <input
                type="text"
                placeholder="Search publications..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="pl-9 pr-4 py-2 rounded-md border border-gray-300 focus:outline-none focus:ring-2 focus:ring-awrad-blue w-full sm:w-80"
              />
              <Search className="absolute left-3 top-2.5 h-4 w-4 text-gray-400" />
            </div>
            
            <div className="flex items-center gap-3 w-full sm:w-auto">
              <Button variant="outline" size="sm" className="flex items-center gap-1">
                <Filter className="h-4 w-4" />
                <span>Filter</span>
              </Button>
              <Link to="/admin/publications/new" className="w-full sm:w-auto">
                <Button className="bg-awrad-blue hover:bg-awrad-lightblue w-full sm:w-auto flex items-center">
                  <FileText className="mr-2 h-4 w-4" />
                  <span>Add Publication</span>
                </Button>
              </Link>
              <Link to="/admin/polls/new" className="w-full sm:w-auto">
                <Button className="bg-awrad-green hover:bg-awrad-lightgreen w-full sm:w-auto flex items-center"> {/* Assuming awrad-green color */}
                  <BarChart3 className="mr-2 h-4 w-4" />
                  <span>Add Poll</span>
                </Button>
              </Link>
            </div>
          </div>
          
          <div className="bg-white rounded-md shadow">
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead className="w-[300px]">Title</TableHead>
                  <TableHead>Type</TableHead>
                  <TableHead>Category/Methodology</TableHead>
                  <TableHead>Date</TableHead>
                  <TableHead>Status</TableHead>
                  <TableHead>Trending</TableHead>
                  <TableHead className="text-right">Actions</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {filteredItems.map((item) => (
                  <TableRow key={item.id}>
                    <TableCell className="font-medium">{item.title_en}</TableCell>
                    <TableCell>
                      <span className={`inline-flex items-center px-2 py-0.5 rounded-full text-xs font-medium ${
                        item.item_type === 'publication' ? 'bg-blue-100 text-blue-800' : 'bg-green-100 text-green-800'
                      }`}>
                        {item.item_type === 'publication' ? 'Publication' : 'Poll'}
                      </span>
                    </TableCell>
                    <TableCell>
                      {item.item_type === 'publication' ? (item as Publication).category_en : (item as Poll).methodology_en?.substring(0,30)+'...'}
                    </TableCell>
                    <TableCell>{new Date(item.date).toLocaleDateString()}</TableCell>
                    <TableCell>
                      <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${
                        item.status === 'Published' ? 'bg-green-100 text-green-800' : 
                        item.status === 'Draft' ? 'bg-yellow-100 text-yellow-800' : 'bg-gray-100 text-gray-800'
                      }`}>
                        {item.status}
                      </span>
                    </TableCell>
                    <TableCell>
                      <Button 
                        size="sm" 
                        variant={item.is_trending ? "default" : "outline"} 
                        onClick={() => toggleTrending(item)}
                        className={item.is_trending ? "bg-awrad-blue hover:bg-awrad-lightblue" : ""}
                      >
                        {item.is_trending ? "Yes" : "No"}
                      </Button>
                    </TableCell>
                    <TableCell className="text-right">
                      <DropdownMenu>
                        <DropdownMenuTrigger asChild>
                          <Button variant="ghost" size="icon">
                            <MoreHorizontal className="h-4 w-4" />
                            <span className="sr-only">Actions</span>
                          </Button>
                        </DropdownMenuTrigger>
                        <DropdownMenuContent align="end">
                          <DropdownMenuItem>
                            <Eye className="mr-2 h-4 w-4" />
                            {/* TODO: Link to public view page */}
                            <span>View</span>
                          </DropdownMenuItem>
                          <DropdownMenuItem onClick={() => navigate(`/admin/${item.item_type === 'publication' ? 'publications' : 'polls'}/edit/${item.id}`)}>
                            <Edit className="mr-2 h-4 w-4" />
                            <span>Edit</span>
                          </DropdownMenuItem>
                          <DropdownMenuSeparator />
                          <DropdownMenuItem className="text-red-600" onClick={() => handleDelete(item.id, item.item_type)}>
                            <Trash2 className="mr-2 h-4 w-4" />
                            <span>Delete</span>
                          </DropdownMenuItem>
                        </DropdownMenuContent>
                      </DropdownMenu>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AdminPublications;
