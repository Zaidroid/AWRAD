import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { useLanguage } from '@/contexts/LanguageContext';
import { Button } from '@/components/ui/button';
import { ArrowLeft, Download } from 'lucide-react';
import { Link } from 'react-router-dom';

// Using the same interface as Publication for consistency,
// category_en will just be "Public Opinion Poll"
interface Poll {
  id: string;
  title_en: string;
  title_ar: string;
  category_en: string;
  category_ar: string;
  date: string;
  link: string; // URL to the PDF
  link_ar?: string; // Optional URL to an Arabic PDF
  summary_en: string;
  summary_ar: string;
  image_url?: string; // Optional image
}

const PollDetailPage = () => {
  const { slug } = useParams<{ slug: string }>();
  const { t, isRTL, language } = useLanguage();
  const [poll, setPoll] = useState<Poll | null | undefined>(undefined); // undefined for loading, null for not found
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchPollDetail = async () => {
      if (!slug) {
        setError(t('error.invalid_slug'));
        setLoading(false);
        return;
      }
      try {
        setLoading(true);
        const response = await fetch('/mock-data/all-polls.json');
        if (!response.ok) {
          throw new Error(`HTTP error! status: ${response.status}`);
        }
        const data = await response.json();
        const foundPoll = data.polls?.find((p: Poll) => p.id === slug);
        setPoll(foundPoll || null);
        setError(null);
      } catch (err) {
        if (err instanceof Error) {
          setError(err.message);
        } else {
          setError(t('error.unknown_error_occurred'));
        }
        console.error("Failed to fetch poll details:", err);
        setPoll(null);
      } finally {
        setLoading(false);
      }
    };

    fetchPollDetail();
  }, [slug, t]);

  if (loading || poll === undefined) {
    return (
      <div className="container mx-auto py-12 px-4 text-center" dir={isRTL ? 'rtl' : 'ltr'}>
        <p>{t('loading')}</p>
      </div>
    );
  }

  if (error) {
    return (
      <div className="container mx-auto py-12 px-4 text-center bg-red-100 text-red-700" dir={isRTL ? 'rtl' : 'ltr'}>
        <p>{t('error.loading_data_details', { item: t('poll') })}: {error}</p>
      </div>
    );
  }

  if (!poll) {
    return (
      <div className="container mx-auto py-12 px-4 text-center" dir={isRTL ? 'rtl' : 'ltr'}>
        <h1 className="text-2xl font-bold mb-4">{t('error.not_found_title')}</h1>
        <p className="mb-6">{t('error.poll_not_found_message')}</p>
        <Button asChild variant="outline">
          <Link to="/public-opinion-polls">
            {isRTL ? <ArrowLeft className="ml-2 h-4 w-4" /> : <ArrowLeft className="mr-2 h-4 w-4" />}
            {t('error.back_to_polls')}
          </Link>
        </Button>
      </div>
    );
  }

  const displayTitle = language === 'ar' && poll.title_ar ? poll.title_ar : poll.title_en;
  const displaySummary = language === 'ar' && poll.summary_ar ? poll.summary_ar : poll.summary_en;
  const displayCategory = language === 'ar' && poll.category_ar ? poll.category_ar : poll.category_en;
  const pdfLink = language === 'ar' && poll.link_ar ? poll.link_ar : poll.link;

  return (
    <div className="container mx-auto py-8 md:py-12 px-4" dir={isRTL ? 'rtl' : 'ltr'}>
      <article className="max-w-4xl mx-auto bg-white shadow-lg rounded-lg overflow-hidden">
        {poll.image_url && (
          <img 
            src={poll.image_url} 
            alt={displayTitle} 
            className="w-full h-64 md:h-96 object-cover" 
          />
        )}
        <div className="p-6 md:p-8">
          <div className="mb-4">
            <span className="text-sm text-awrad-blue font-semibold uppercase tracking-wider">{displayCategory}</span>
            <span className="text-sm text-gray-500 mx-2">•</span>
            <span className="text-sm text-gray-500">{poll.date}</span>
          </div>
          <h1 className="text-3xl md:text-4xl font-bold text-gray-800 mb-6 leading-tight">{displayTitle}</h1>
          
          <div 
            className="prose prose-lg max-w-none text-gray-700 mb-8"
            style={{ whiteSpace: 'pre-wrap' }}
          >
            {displaySummary}
          </div>

          <div className="flex flex-col sm:flex-row gap-4">
            <Button asChild>
              <a href={pdfLink} target="_blank" rel="noopener noreferrer" className="flex items-center">
                <Download className={`${isRTL ? 'ml-2' : 'mr-2'} h-4 w-4`} />
                {t('poll_detail.download_pdf')}
              </a>
            </Button>
            <Button asChild variant="outline">
              <Link to="/public-opinion-polls" className="flex items-center">
                {isRTL ? <ArrowLeft className="ml-2 h-4 w-4" /> : <ArrowLeft className="mr-2 h-4 w-4" />}
                {t('error.back_to_polls')}
              </Link>
            </Button>
          </div>
        </div>
      </article>
    </div>
  );
};

export default PollDetailPage;
