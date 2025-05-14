import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Checkbox } from '@/components/ui/checkbox';
import AdminHeader from '@/components/Admin/AdminHeader';
import AdminSidebar from '@/components/Admin/AdminSidebar';
import { supabase, Publication } from '@/lib/supabaseClient'; // Assuming Publication type is exported
import { useAuth } from '@/contexts/AuthContext';
// import { useToast } from "@/components/ui/use-toast"; // For showing notifications

const PublicationForm: React.FC = () => {
  const { id: publicationId } = useParams<{ id?: string }>();
  const navigate = useNavigate();
  const { user } = useAuth();
  // const { toast } = useToast();

  const [titleEn, setTitleEn] = useState('');
  const [titleAr, setTitleAr] = useState('');
  const [categoryEn, setCategoryEn] = useState('');
  const [categoryAr, setCategoryAr] = useState('');
  const [date, setDate] = useState('');
  const [summaryEn, setSummaryEn] = useState('');
  const [summaryAr, setSummaryAr] = useState('');
  const [imageUrl, setImageUrl] = useState(''); // URL from media manager or direct upload
  const [linkEn, setLinkEn] = useState(''); // PDF link or external URL
  const [linkAr, setLinkAr] = useState('');
  const [status, setStatus] = useState<'Draft' | 'Published' | 'Archived'>('Draft');
  const [isTrending, setIsTrending] = useState(false);
  const [isFeatured, setIsFeatured] = useState(false);
  const [authorEn, setAuthorEn] = useState('');
  const [authorAr, setAuthorAr] = useState('');
  // Add more fields like tags, full_content_en, full_content_ar as needed

  const [loading, setLoading] = useState(false);
  const [formError, setFormError] = useState<string | null>(null);

  const isEditMode = Boolean(publicationId);

  useEffect(() => {
    if (isEditMode && publicationId) {
      const fetchPublication = async () => {
        setLoading(true);
        const { data, error } = await supabase
          .from('publications')
          .select('*')
          .eq('id', publicationId)
          .single();

        if (error) {
          console.error('Error fetching publication:', error);
          setFormError('Failed to load publication data.');
          // toast({ title: "Error", description: "Failed to load publication data.", variant: "destructive" });
        } else if (data) {
          const pub = data as Publication; // Cast to your defined type
          setTitleEn(pub.title_en);
          setTitleAr(pub.title_ar);
          setCategoryEn(pub.category_en || '');
          setCategoryAr(pub.category_ar || '');
          setDate(pub.date || ''); // Ensure date is in YYYY-MM-DD format for input type="date"
          setSummaryEn(pub.summary_en || '');
          setSummaryAr(pub.summary_ar || '');
          setImageUrl(pub.image_url || '');
          setLinkEn(pub.link_en || '');
          setLinkAr(pub.link_ar || '');
          setStatus(pub.status || 'Draft');
          setIsTrending(pub.is_trending || false);
          setIsFeatured(pub.is_featured || false);
          setAuthorEn(pub.author_en || '');
          setAuthorAr(pub.author_ar || '');
        }
        setLoading(false);
      };
      fetchPublication();
    }
  }, [publicationId, isEditMode]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!user) {
      setFormError("You must be logged in to submit.");
      // toast({ title: "Error", description: "Authentication required.", variant: "destructive" });
      return;
    }
    setLoading(true);
    setFormError(null);

    const publicationData = {
      title_en: titleEn,
      title_ar: titleAr,
      category_en: categoryEn,
      category_ar: categoryAr,
      date: date, // Ensure this is a valid date string
      summary_en: summaryEn,
      summary_ar: summaryAr,
      image_url: imageUrl,
      link_en: linkEn,
      link_ar: linkAr,
      status: status,
      is_trending: isTrending,
      is_featured: isFeatured,
      author_en: authorEn,
      author_ar: authorAr,
      // updated_at will be handled by Supabase or trigger
    };

    try {
      let error;
      if (isEditMode && publicationId) {
        const { error: updateError } = await supabase
          .from('publications')
          .update({ ...publicationData, updated_at: new Date().toISOString() })
          .eq('id', publicationId);
        error = updateError;
      } else {
        const { error: insertError } = await supabase
          .from('publications')
          .insert([{ ...publicationData, user_id: user.id /* if you track creator */ }]);
        error = insertError;
      }

      if (error) throw error;

      // toast({ title: "Success", description: `Publication ${isEditMode ? 'updated' : 'created'} successfully.` });
      navigate('/admin/publications');
    } catch (err: any) {
      console.error('Error submitting publication:', err);
      setFormError(err.message || 'An unexpected error occurred.');
      // toast({ title: "Error", description: err.message || "Failed to save publication.", variant: "destructive" });
    } finally {
      setLoading(false);
    }
  };

  if (loading && isEditMode && !titleEn) { // Initial loading for edit mode
    return (
      <div className="flex min-h-screen bg-gray-100">
        <AdminSidebar />
        <div className="flex-1">
          <AdminHeader title={isEditMode ? "Edit Publication" : "Add New Publication"} />
          <div className="p-6">Loading publication data...</div>
        </div>
      </div>
    );
  }

  return (
    <div className="flex min-h-screen bg-gray-100">
      <AdminSidebar />
      <div className="flex-1">
        <AdminHeader title={isEditMode ? "Edit Publication" : "Add New Publication"} />
        <form onSubmit={handleSubmit} className="p-6 space-y-6">
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <Label htmlFor="titleEn">Title (English)</Label>
              <Input id="titleEn" value={titleEn} onChange={(e) => setTitleEn(e.target.value)} required />
            </div>
            <div>
              <Label htmlFor="titleAr">Title (Arabic)</Label>
              <Input id="titleAr" value={titleAr} onChange={(e) => setTitleAr(e.target.value)} dir="rtl" required />
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <Label htmlFor="categoryEn">Category (English)</Label>
              <Input id="categoryEn" value={categoryEn} onChange={(e) => setCategoryEn(e.target.value)} />
            </div>
            <div>
              <Label htmlFor="categoryAr">Category (Arabic)</Label>
              <Input id="categoryAr" value={categoryAr} onChange={(e) => setCategoryAr(e.target.value)} dir="rtl" />
            </div>
          </div>
          
          <div>
            <Label htmlFor="date">Publication Date</Label>
            <Input id="date" type="date" value={date} onChange={(e) => setDate(e.target.value)} required />
          </div>

          <div>
            <Label htmlFor="summaryEn">Summary (English)</Label>
            <Textarea id="summaryEn" value={summaryEn} onChange={(e) => setSummaryEn(e.target.value)} rows={4} />
          </div>
          <div>
            <Label htmlFor="summaryAr">Summary (Arabic)</Label>
            <Textarea id="summaryAr" value={summaryAr} onChange={(e) => setSummaryAr(e.target.value)} dir="rtl" rows={4} />
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <Label htmlFor="imageUrl">Image URL</Label>
              <Input id="imageUrl" value={imageUrl} onChange={(e) => setImageUrl(e.target.value)} placeholder="https://example.com/image.jpg or select from Media Manager" />
              {/* TODO: Add button to open Media Manager to select image */}
            </div>
            <div>
              <Label htmlFor="status">Status</Label>
              <Select value={status} onValueChange={(value) => setStatus(value as any)}>
                <SelectTrigger>
                  <SelectValue placeholder="Select status" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="Draft">Draft</SelectItem>
                  <SelectItem value="Published">Published</SelectItem>
                  <SelectItem value="Archived">Archived</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <Label htmlFor="linkEn">Link (English - e.g., PDF URL or external)</Label>
              <Input id="linkEn" value={linkEn} onChange={(e) => setLinkEn(e.target.value)} />
            </div>
            <div>
              <Label htmlFor="linkAr">Link (Arabic - optional)</Label>
              <Input id="linkAr" value={linkAr} onChange={(e) => setLinkAr(e.target.value)} />
            </div>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <Label htmlFor="authorEn">Author (English)</Label>
              <Input id="authorEn" value={authorEn} onChange={(e) => setAuthorEn(e.target.value)} />
            </div>
            <div>
              <Label htmlFor="authorAr">Author (Arabic)</Label>
              <Input id="authorAr" value={authorAr} onChange={(e) => setAuthorAr(e.target.value)} dir="rtl" />
            </div>
          </div>

          <div className="flex items-center space-x-4">
            <div className="flex items-center space-x-2">
              <Checkbox id="isTrending" checked={isTrending} onCheckedChange={(checked) => setIsTrending(Boolean(checked))} />
              <Label htmlFor="isTrending">Trending</Label>
            </div>
            <div className="flex items-center space-x-2">
              <Checkbox id="isFeatured" checked={isFeatured} onCheckedChange={(checked) => setIsFeatured(Boolean(checked))} />
              <Label htmlFor="isFeatured">Featured</Label>
            </div>
          </div>

          {formError && <p className="text-red-600">{formError}</p>}
          
          <div className="flex justify-end space-x-3">
            <Button type="button" variant="outline" onClick={() => navigate('/admin/publications')} disabled={loading}>
              Cancel
            </Button>
            <Button type="submit" className="bg-awrad-blue hover:bg-awrad-lightblue" disabled={loading}>
              {loading ? (isEditMode ? 'Updating...' : 'Creating...') : (isEditMode ? 'Update Publication' : 'Create Publication')}
            </Button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default PublicationForm;
