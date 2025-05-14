
import React, { useState, useEffect, useRef } from 'react';
import AdminSidebar from '@/components/Admin/AdminSidebar';
import AdminHeader from '@/components/Admin/AdminHeader';
import { supabase } from '@/lib/supabaseClient';
import { FileObject } from '@supabase/storage-js';
// import { useToast } from "@/components/ui/use-toast";
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { Upload, Image, FileText, File, Grid2x2, List, Trash2 } from 'lucide-react';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Checkbox } from "@/components/ui/checkbox"; // Added
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table"; // Added

const BUCKET_NAME = 'media-library'; // Your bucket name

interface MediaItem extends FileObject {
  publicUrl?: string;
  fileType?: 'image' | 'document' | 'other';
}

const MediaManager = () => {
  const [mediaItems, setMediaItems] = useState<MediaItem[]>([]);
  const [viewMode, setViewMode] = useState<'grid' | 'list'>('grid');
  const [selectedMediaIds, setSelectedMediaIds] = useState<string[]>([]); // Store by item.id (name for now)
  const [loading, setLoading] = useState(true);
  const [uploading, setUploading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);
  // const { toast } = useToast();

  const fetchMedia = async () => {
    setLoading(true);
    setError(null);
    try {
      const { data, error: listError } = await supabase.storage.from(BUCKET_NAME).list(undefined, {
        limit: 100, // Adjust as needed
        offset: 0,
        sortBy: { column: 'created_at', order: 'desc' },
      });

      if (listError) throw listError;

      const itemsWithUrls: MediaItem[] = (data || []).map(file => {
        const { data: { publicUrl } } = supabase.storage.from(BUCKET_NAME).getPublicUrl(file.name);
        let fileType: MediaItem['fileType'] = 'other';
        if (file.metadata?.mimetype?.startsWith('image/')) {
          fileType = 'image';
        } else if (file.metadata?.mimetype === 'application/pdf' || file.metadata?.mimetype?.includes('document')) {
          fileType = 'document';
        }
        return { ...file, publicUrl, fileType };
      });
      setMediaItems(itemsWithUrls);
    } catch (err: any) {
      console.error("Error fetching media:", err);
      setError(err.message || "Failed to fetch media files.");
      // toast({ title: "Error", description: "Failed to fetch media.", variant: "destructive" });
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchMedia();
  }, []);

  const handleFileSelect = (id: string) => {
    setSelectedMediaIds(prev => 
      prev.includes(id) ? prev.filter(item => item !== id) : [...prev, id]
    );
  };

  const handleFileUpload = async (event: React.ChangeEvent<HTMLInputElement>) => {
    const files = event.target.files;
    if (!files || files.length === 0) return;
    
    setUploading(true);
    setError(null);
    // const { toast } = useToast(); // Ensure toast is available if used

    for (const file of Array.from(files)) {
      try {
        // Consider adding a folder structure, e.g., `uploads/${new Date().getFullYear()}/${file.name}`
        const filePath = `${file.name}`; // Simple path for now
        const { error: uploadError } = await supabase.storage
          .from(BUCKET_NAME)
          .upload(filePath, file, {
            cacheControl: '3600',
            upsert: false, // Set to true to overwrite if file exists, false to error
          });

        if (uploadError) throw uploadError;
        // toast({ title: "Success", description: `${file.name} uploaded successfully.` });
      } catch (err: any) {
        console.error("Error uploading file:", file.name, err);
        setError(`Failed to upload ${file.name}: ${err.message}`);
        // toast({ title: "Upload Error", description: `Failed to upload ${file.name}.`, variant: "destructive" });
        // Optionally break or continue on error
      }
    }
    setUploading(false);
    fetchMedia(); // Refresh list
    if (fileInputRef.current) fileInputRef.current.value = ""; // Reset file input
  };

  const handleDeleteSelected = async () => {
    if (selectedMediaIds.length === 0 || !window.confirm(`Delete ${selectedMediaIds.length} selected item(s)?`)) return;

    setLoading(true); // Indicate an operation is in progress
    try {
      const { error: deleteError } = await supabase.storage
        .from(BUCKET_NAME)
        .remove(selectedMediaIds); // selectedMediaIds should be array of file paths (names)

      if (deleteError) throw deleteError;
      // toast({ title: "Success", description: "Selected media deleted." });
      setSelectedMediaIds([]);
      fetchMedia(); // Refresh list
    } catch (err: any) {
      console.error("Error deleting media:", err);
      setError(err.message || "Failed to delete media.");
      // toast({ title: "Error", description: "Failed to delete media.", variant: "destructive" });
    } finally {
      setLoading(false);
    }
  };
  
  const getFileIcon = (fileType?: MediaItem['fileType']) => {
    switch (fileType) {
      case 'image':
        return <Image className="h-10 w-10 text-blue-500" />; // Larger for grid
      case 'document':
        return <FileText className="h-10 w-10 text-red-500" />;
      default:
        return <File className="h-10 w-10 text-gray-500" />;
    }
  };

  const formatBytes = (bytes?: number, decimals = 2) => {
    if (!bytes || bytes === 0) return '0 Bytes';
    const k = 1024;
    const dm = decimals < 0 ? 0 : decimals;
    const sizes = ['Bytes', 'KB', 'MB', 'GB', 'TB'];
    const i = Math.floor(Math.log(bytes) / Math.log(k));
    return parseFloat((bytes / Math.pow(k, i)).toFixed(dm)) + ' ' + sizes[i];
  };
  
  if (loading && mediaItems.length === 0) { // Initial load
    return <div className="flex min-h-screen bg-gray-100"><AdminSidebar /><div className="flex-1 p-6"><AdminHeader title="Media Manager" /><div>Loading media library...</div></div></div>;
  }

  return (
    <div className="flex min-h-screen bg-gray-100">
      <AdminSidebar />
      <div className="flex-1">
        <AdminHeader title="Media Manager" />
        <div className="p-6">
          <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center mb-6 gap-4">
            <h2 className="text-xl font-bold">Media Library</h2>
            <div className="flex items-center gap-3 w-full sm:w-auto">
              <Button variant="outline" size="sm" className="flex items-center gap-1" onClick={() => setViewMode('grid')} disabled={viewMode === 'grid'}>
                <Grid2x2 className="h-4 w-4" />
              </Button>
              <Button variant="outline" size="sm" className="flex items-center gap-1" onClick={() => setViewMode('list')} disabled={viewMode === 'list'}>
                <List className="h-4 w-4" />
              </Button>
              
              <input type="file" multiple ref={fileInputRef} onChange={handleFileUpload} className="hidden" accept="image/*,application/pdf,.doc,.docx,.xls,.xlsx,.ppt,.pptx" />
              <Button onClick={() => fileInputRef.current?.click()} className="bg-awrad-blue hover:bg-awrad-lightblue" disabled={uploading}>
                <Upload className="mr-2 h-4 w-4" />
                {uploading ? 'Uploading...' : 'Upload Files'}
              </Button>
              
              {selectedMediaIds.length > 0 && (
                <Button variant="destructive" onClick={handleDeleteSelected} disabled={loading}>
                  <Trash2 className="mr-2 h-4 w-4" />
                  <span>Delete Selected ({selectedMediaIds.length})</span>
                </Button>
              )}
            </div>
          </div>
          
          <Tabs defaultValue="all">
            <TabsList>
              <TabsTrigger value="all">All Files</TabsTrigger>
              <TabsTrigger value="images">Images</TabsTrigger>
              <TabsTrigger value="documents">Documents</TabsTrigger>
            </TabsList>
            
            {error && <p className="text-red-500 mb-4">Error: {error}</p>}
            {/* Removed duplicate Tabs and TabsList here */}
            {(['all', 'images', 'documents'] as const).map(tabValue => {
                const filteredMedia = mediaItems.filter(item => {
                  if (tabValue === 'images') return item.fileType === 'image';
                  if (tabValue === 'documents') return item.fileType === 'document';
                  return true;
                });

                return (
                  <TabsContent key={tabValue} value={tabValue} className="mt-6">
                    {filteredMedia.length === 0 && !loading && <p>No files found for this type.</p>}
                    {viewMode === 'grid' ? (
                      <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 xl:grid-cols-6 gap-4">
                        {filteredMedia.map((item) => (
                          <Card 
                            key={item.id || item.name} // Use item.id if available from metadata, else name
                            className={`overflow-hidden cursor-pointer group relative ${
                              selectedMediaIds.includes(item.name) ? 'ring-2 ring-awrad-blue' : ''
                            }`}
                            onClick={() => handleFileSelect(item.name)}
                          >
                            <div className="h-32 bg-gray-200 flex items-center justify-center relative">
                              {item.fileType === 'image' && item.publicUrl ? (
                                <img 
                                  src={item.publicUrl} 
                                  alt={item.name} 
                                  className="h-full w-full object-cover"
                                />
                              ) : (
                                getFileIcon(item.fileType)
                              )}
                               <div className={`absolute top-1 right-1 p-0.5 bg-white rounded-full ${selectedMediaIds.includes(item.name) ? 'opacity-100' : 'opacity-0 group-hover:opacity-100'}`}>
                                <Checkbox checked={selectedMediaIds.includes(item.name)} className="h-4 w-4"/>
                              </div>
                            </div>
                            <CardContent className="p-2">
                              <p className="text-xs font-medium truncate" title={item.name}>{item.name}</p>
                              <p className="text-xs text-gray-500">{formatBytes(item.metadata?.size)}</p>
                            </CardContent>
                          </Card>
                        ))}
                      </div>
                    ) : ( // List view
                      <div className="bg-white rounded-md shadow overflow-x-auto">
                        <table className="w-full min-w-full">
                          <TableHeader>
                            <TableRow>
                              <TableHead className="w-10"></TableHead>
                              <TableHead>Name</TableHead>
                              <TableHead>Type</TableHead>
                              <TableHead>Size</TableHead>
                              <TableHead>Uploaded</TableHead>
                            </TableRow>
                          </TableHeader>
                          <TableBody>
                            {filteredMedia.map((item) => (
                              <TableRow 
                                key={item.id || item.name}
                                className={`hover:bg-gray-50 cursor-pointer ${
                                  selectedMediaIds.includes(item.name) ? 'bg-blue-50' : ''
                                }`}
                                onClick={() => handleFileSelect(item.name)}
                              >
                                <TableCell className="p-2 w-12">
                                  {getFileIcon(item.fileType)}
                                </TableCell>
                                <TableCell className="p-2 font-medium">{item.name}</TableCell>
                                <TableCell className="p-2">{item.metadata?.mimetype || 'N/A'}</TableCell>
                                <TableCell className="p-2">{formatBytes(item.metadata?.size)}</TableCell>
                                <TableCell className="p-2">{item.created_at ? new Date(item.created_at).toLocaleDateString() : 'N/A'}</TableCell>
                              </TableRow>
                            ))}
                          </TableBody>
                        </table>
                      </div>
                    )}
                  </TabsContent>
                );
              })}
            {/* Removed </TabsContent> here as it was part of the duplicated structure, the original </TabsContent> is part of the loop */}
          </Tabs>
        </div>
      </div>
    </div>
  );
};

export default MediaManager;
