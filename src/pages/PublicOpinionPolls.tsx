
import React, { useState, useEffect } from 'react'; // Added useEffect
import { Link } from 'react-router-dom'; // Added Link
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Badge } from '@/components/ui/badge';
import { Search, Calendar, Download, ArrowRight } from 'lucide-react'; // Added ArrowRight
import { useLanguage } from '@/contexts/LanguageContext';
// import { useIsMobile } from '@/hooks/use-mobile'; // useIsMobile not used, can be removed

interface Poll {
  id: string;
  title_en: string;
  title_ar: string;
  // category_en: string; // Not strictly needed for this page's current display if always "Public Opinion Poll"
  // category_ar: string;
  date: string;
  link: string; // URL to the PDF
  link_ar?: string;
  summary_en: string;
  summary_ar: string;
  image_url?: string;
}

const PublicOpinionPolls = () => {
  const [searchQuery, setSearchQuery] = useState("");
  const [yearFilter, setYearFilter] = useState("all"); // Year filter logic can be refined or use actual year from date
  const { t, isRTL, language } = useLanguage();
  // const isMobile = useIsMobile(); // Not used

  const [polls, setPolls] = useState<Poll[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchPolls = async () => {
      try {
        setLoading(true);
        const response = await fetch('/mock-data/all-polls.json');
        if (!response.ok) {
          throw new Error(`HTTP error! status: ${response.status}`);
        }
        const data = await response.json();
        setPolls(data.polls || []);
        setError(null);
      } catch (err) {
        if (err instanceof Error) {
          setError(err.message);
        } else {
          setError(t('error.unknown_error_occurred'));
        }
        console.error("Failed to fetch polls:", err);
      } finally {
        setLoading(false);
      }
    };

    fetchPolls();
  }, [t]);
  
  // Years for filtering - this could be dynamic based on fetched poll dates
  const uniqueYears = Array.from(new Set(polls.map(poll => new Date(poll.date).getFullYear().toString()))).sort((a, b) => parseInt(b) - parseInt(a));
  const years = [
    { id: "all", labelKey: "polls.filter.all_years" },
    ...uniqueYears.map(year => ({ id: year, labelKey: year }))
  ];
  
  const filteredPolls = polls.filter(poll => {
    const title = language === 'ar' && poll.title_ar ? poll.title_ar : poll.title_en;
    const summary = language === 'ar' && poll.summary_ar ? poll.summary_ar : poll.summary_en;
    
    const matchesSearch = title.toLowerCase().includes(searchQuery.toLowerCase()) || 
                          summary.toLowerCase().includes(searchQuery.toLowerCase());
    
    const pollYear = new Date(poll.date).getFullYear().toString();
    const matchesYear = yearFilter === "all" || pollYear === yearFilter;
    
    return matchesSearch && matchesYear;
  });

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center" dir={isRTL ? 'rtl' : 'ltr'}>
        <p>{t('loading')}</p>
      </div>
    );
  }

  if (error) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-red-100 text-red-700" dir={isRTL ? 'rtl' : 'ltr'}>
        <p>{t('error.loading_data_list', { list_type: t('polls')})}: {error}</p>
      </div>
    );
  }
  
  return (
    <div className="min-h-screen" dir={isRTL ? 'rtl' : 'ltr'}>
      {/* Hero Banner */}
      <section className="relative bg-gradient-to-r from-awrad-blue to-awrad-lightblue py-12 md:py-20">
        <div className="absolute inset-0 bg-[url('https://images.unsplash.com/photo-1517457373958-b7bdd4587205?ixlib=rb-1.2.1&auto=format&fit=crop&w=1350&q=80')] bg-cover bg-center opacity-10"></div>
        <div className="container mx-auto relative z-10">
          <div className="max-w-3xl mx-auto text-center">
            <h1 className="text-3xl md:text-4xl font-bold text-white mb-6">{t('polls.title')}</h1>
            <p className="text-lg md:text-xl text-gray-100">
              {t('polls.subtitle')}
            </p>
          </div>
        </div>
      </section>
      
      {/* Search and Filter Section */}
      <section className="py-6 bg-white border-b">
        <div className="container mx-auto">
          <div className="flex flex-col md:flex-row items-center justify-between gap-4">
            <div className="w-full md:w-1/3 relative">
              <Search className={`absolute ${isRTL ? 'right-3' : 'left-3'} top-1/2 -translate-y-1/2 text-gray-400`} size={18} />
              <Input
                placeholder={t('polls.search_placeholder')}
                className={isRTL ? "pr-10" : "pl-10"}
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
              />
            </div>
            
            <div className="flex flex-wrap gap-2 justify-center md:justify-end">
              {years.map((year) => (
                <Badge
                  key={year.id}
                  variant={yearFilter === year.id ? "default" : "outline"}
                  className={`cursor-pointer ${yearFilter === year.id 
                    ? "bg-awrad-blue hover:bg-awrad-lightblue text-white" 
                    : "hover:bg-awrad-lightgray"}`}
                  onClick={() => setYearFilter(year.id)}
                >
                  {year.id === "all" ? t(year.labelKey) : year.id}
                </Badge>
              ))}
            </div>
          </div>
        </div>
      </section>
      
      {/* Polls List */}
      <section className="section bg-gray-50">
        <div className="container mx-auto">
          {filteredPolls.length > 0 ? (
            <>
              <div className="text-sm text-gray-500 mb-6">
                {t('polls.showing_results', { count: filteredPolls.length })}
              </div>
              
              <div className="grid grid-cols-1 gap-6">
                {filteredPolls.map((poll) => {
                  const displayTitle = language === 'ar' && poll.title_ar ? poll.title_ar : poll.title_en;
                  const displaySummary = language === 'ar' && poll.summary_ar ? poll.summary_ar : poll.summary_en;
                  const pdfLink = language === 'ar' && poll.link_ar ? poll.link_ar : poll.link;
                  return (
                    <div 
                      key={poll.id} 
                      className="bg-white rounded-lg shadow-sm overflow-hidden transition-shadow hover:shadow-md"
                    >
                      <div className="flex flex-col md:flex-row">
                        {poll.image_url && (
                          <div className="md:w-1/4 h-48 md:h-auto">
                            <img 
                              src={poll.image_url} 
                              alt={displayTitle} 
                              className="w-full h-full object-cover"
                            />
                          </div>
                        )}
                        <div className={`p-4 md:p-6 ${poll.image_url ? 'md:w-3/4' : 'w-full'} flex flex-col justify-between`}>
                          <div>
                            <div className="flex items-center text-sm text-gray-500 mb-2">
                              <Calendar size={14} className={`${isRTL ? 'ml-1' : 'mr-1'}`} />
                              <span>{poll.date}</span>
                            </div>
                            <h3 className="text-xl font-semibold mb-2">{displayTitle}</h3>
                            <p className="text-gray-600 mb-4 line-clamp-3">{displaySummary}</p>
                          </div>
                          <div className="flex mt-2 gap-3">
                            <Button asChild size="sm">
                              <a href={pdfLink} target="_blank" rel="noopener noreferrer" className="flex items-center gap-2">
                                <Download size={16} />
                                {t('polls.download_report_button')}
                              </a>
                            </Button>
                            <Button asChild variant="outline" size="sm">
                              <Link to={`/public-opinion-polls/${poll.id}`} className="flex items-center gap-2">
                                {t('polls.read_more_button')} <ArrowRight size={16} />
                              </Link>
                            </Button>
                          </div>
                        </div>
                      </div>
                    </div>
                  );
                })}
              </div>
              
              {/* Basic Pagination - Consider a more robust solution for larger datasets */}
              <div className="mt-12 flex justify-center">
                <div className="flex items-center space-x-2">
                  <Button variant="outline" size="sm" disabled>{t('pagination.previous')}</Button>
                  <Button variant="outline" size="sm" className="bg-awrad-blue text-white hover:bg-awrad-lightblue">1</Button>
                  <Button variant="outline" size="sm">2</Button>
                  <Button variant="outline" size="sm">3</Button>
                  <span className="text-gray-500">...</span>
                  <Button variant="outline" size="sm">{t('pagination.next')}</Button>
                </div>
              </div>
            </>
          ) : (
            <div className="text-center py-12">
              <h3 className="text-xl font-medium mb-2">
                {t('polls.no_results_title')}
              </h3>
              <p className="text-gray-600 mb-6">
                {t('polls.no_results_subtitle')}
              </p>
              <Button onClick={() => {setSearchQuery(''); setYearFilter('all');}}>
                {t('polls.clear_filters_button')}
              </Button>
            </div>
          )}
        </div>
      </section>
    </div>
  );
};

export default PublicOpinionPolls;
