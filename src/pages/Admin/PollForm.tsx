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
import { supabase, Poll } from '@/lib/supabaseClient'; // Assuming Poll type is exported
import { useAuth } from '@/contexts/AuthContext';
// import { useToast } from "@/components/ui/use-toast";

const PollForm: React.FC = () => {
  const { id: pollId } = useParams<{ id?: string }>();
  const navigate = useNavigate();
  const { user } = useAuth();
  // const { toast } = useToast();

  const [titleEn, setTitleEn] = useState('');
  const [titleAr, setTitleAr] = useState('');
  const [date, setDate] = useState('');
  const [summaryEn, setSummaryEn] = useState('');
  const [summaryAr, setSummaryAr] = useState('');
  const [imageUrl, setImageUrl] = useState('');
  const [linkEn, setLinkEn] = useState('');
  const [linkAr, setLinkAr] = useState('');
  const [status, setStatus] = useState<'Draft' | 'Published' | 'Archived'>('Draft');
  const [isTrending, setIsTrending] = useState(false);
  const [isFeatured, setIsFeatured] = useState(false);
  const [sampleSize, setSampleSize] = useState<number | ''>('');
  const [methodologyEn, setMethodologyEn] = useState('');
  const [methodologyAr, setMethodologyAr] = useState('');

  const [loading, setLoading] = useState(false);
  const [formError, setFormError] = useState<string | null>(null);

  const isEditMode = Boolean(pollId);

  useEffect(() => {
    if (isEditMode && pollId) {
      const fetchPoll = async () => {
        setLoading(true);
        const { data, error } = await supabase
          .from('polls')
          .select('*')
          .eq('id', pollId)
          .single();

        if (error) {
          console.error('Error fetching poll:', error);
          setFormError('Failed to load poll data.');
        } else if (data) {
          const p = data as Poll;
          setTitleEn(p.title_en);
          setTitleAr(p.title_ar);
          setDate(p.date || '');
          setSummaryEn(p.summary_en || '');
          setSummaryAr(p.summary_ar || '');
          setImageUrl(p.image_url || '');
          setLinkEn(p.link_en || '');
          setLinkAr(p.link_ar || '');
          setStatus(p.status || 'Draft');
          setIsTrending(p.is_trending || false);
          setIsFeatured(p.is_featured || false);
          setSampleSize(p.sample_size || '');
          setMethodologyEn(p.methodology_en || '');
          setMethodologyAr(p.methodology_ar || '');
        }
        setLoading(false);
      };
      fetchPoll();
    }
  }, [pollId, isEditMode]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!user) {
      setFormError("You must be logged in to submit.");
      return;
    }
    setLoading(true);
    setFormError(null);

    const pollData = {
      title_en: titleEn,
      title_ar: titleAr,
      date: date,
      summary_en: summaryEn,
      summary_ar: summaryAr,
      image_url: imageUrl,
      link_en: linkEn,
      link_ar: linkAr,
      status: status,
      is_trending: isTrending,
      is_featured: isFeatured,
      sample_size: sampleSize === '' ? null : Number(sampleSize),
      methodology_en: methodologyEn,
      methodology_ar: methodologyAr,
    };

    try {
      let error;
      if (isEditMode && pollId) {
        const { error: updateError } = await supabase
          .from('polls')
          .update({ ...pollData, updated_at: new Date().toISOString() })
          .eq('id', pollId);
        error = updateError;
      } else {
        const { error: insertError } = await supabase
          .from('polls')
          .insert([{ ...pollData, user_id: user.id }]);
        error = insertError;
      }

      if (error) throw error;
      // toast({ title: "Success", description: `Poll ${isEditMode ? 'updated' : 'created'} successfully.` });
      navigate('/admin/publications'); // Or a dedicated /admin/polls page if it exists
    } catch (err: any) {
      console.error('Error submitting poll:', err);
      setFormError(err.message || 'An unexpected error occurred.');
    } finally {
      setLoading(false);
    }
  };
  
  if (loading && isEditMode && !titleEn) {
    return (
      <div className="flex min-h-screen bg-gray-100">
        <AdminSidebar />
        <div className="flex-1">
          <AdminHeader title={isEditMode ? "Edit Poll" : "Add New Poll"} />
          <div className="p-6">Loading poll data...</div>
        </div>
      </div>
    );
  }

  return (
    <div className="flex min-h-screen bg-gray-100">
      <AdminSidebar />
      <div className="flex-1">
        <AdminHeader title={isEditMode ? "Edit Poll" : "Add New Poll"} />
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
          
          <div>
            <Label htmlFor="date">Poll Date</Label>
            <Input id="date" type="date" value={date} onChange={(e) => setDate(e.target.value)} required />
          </div>

          <div>
            <Label htmlFor="summaryEn">Summary (English)</Label>
            <Textarea id="summaryEn" value={summaryEn} onChange={(e) => setSummaryEn(e.target.value)} rows={3} />
          </div>
          <div>
            <Label htmlFor="summaryAr">Summary (Arabic)</Label>
            <Textarea id="summaryAr" value={summaryAr} onChange={(e) => setSummaryAr(e.target.value)} dir="rtl" rows={3} />
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <Label htmlFor="imageUrl">Image URL</Label>
              <Input id="imageUrl" value={imageUrl} onChange={(e) => setImageUrl(e.target.value)} placeholder="https://example.com/image.jpg" />
            </div>
            <div>
              <Label htmlFor="status">Status</Label>
              <Select value={status} onValueChange={(value) => setStatus(value as any)}>
                <SelectTrigger><SelectValue placeholder="Select status" /></SelectTrigger>
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
              <Label htmlFor="linkEn">Link (English - e.g., PDF/Report URL)</Label>
              <Input id="linkEn" value={linkEn} onChange={(e) => setLinkEn(e.target.value)} />
            </div>
            <div>
              <Label htmlFor="linkAr">Link (Arabic - optional)</Label>
              <Input id="linkAr" value={linkAr} onChange={(e) => setLinkAr(e.target.value)} />
            </div>
          </div>

          <div>
            <Label htmlFor="sampleSize">Sample Size</Label>
            <Input id="sampleSize" type="number" value={sampleSize} onChange={(e) => setSampleSize(e.target.value === '' ? '' : Number(e.target.value))} />
          </div>

          <div>
            <Label htmlFor="methodologyEn">Methodology (English)</Label>
            <Textarea id="methodologyEn" value={methodologyEn} onChange={(e) => setMethodologyEn(e.target.value)} rows={3} />
          </div>
          <div>
            <Label htmlFor="methodologyAr">Methodology (Arabic)</Label>
            <Textarea id="methodologyAr" value={methodologyAr} onChange={(e) => setMethodologyAr(e.target.value)} dir="rtl" rows={3} />
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
              {loading ? (isEditMode ? 'Updating...' : 'Creating...') : (isEditMode ? 'Update Poll' : 'Create Poll')}
            </Button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default PollForm;
