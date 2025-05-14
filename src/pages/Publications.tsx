
import React, { useState, useEffect } from 'react';
import PublicationCard from '@/components/PublicationCard';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Badge } from '@/components/ui/badge';
import { Search } from 'lucide-react';
import { useLanguage } from '@/contexts/LanguageContext';

interface Publication {
  id: string;
  title_en: string;
  title_ar: string;
  category_en: string;
  category_ar: string;
  date: string;
  link: string;
  summary_en: string;
  summary_ar: string;
  image_url: string;
}

const Publications = () => {
const { t, isRTL, language } = useLanguage();
const [searchQuery, setSearchQuery] = useState("");
const [activeFilter, setActiveFilter] = useState("all");
const [filteredPublications, setFilteredPublications] = useState<Publication[]>([]);
  const [publications, setPublications] = useState<Publication[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchPublications = async () => {
      try {
        setLoading(true);
        const response = await fetch('/mock-data/all-publications.json');
        if (!response.ok) {
          throw new Error(`HTTP error! status: ${response.status}`);
        }
        const data = await response.json();
        setPublications(data);
        setError(null);
      } catch (err) {
        if (err instanceof Error) {
          setError(err.message);
        } else {
          setError('An unknown error occurred');
        }
        console.error("Failed to fetch publications:", err);
      } finally {
        setLoading(false);
      }
    };

    fetchPublications();
  }, []);

  const categories = [
    { id: "all", labelKey: "publications.filter.all" },
    { id: "technology", labelKey: "publications.filter.technology" },
    { id: "environment", labelKey: "publications.filter.environment" },
    { id: "social sciences", labelKey: "publications.filter.social_sciences" },
    { id: "energy", labelKey: "publications.filter.energy" },
    { id: "economics", labelKey: "publications.filter.economics" },
    { id: "public health", labelKey: "publications.filter.public_health" },
  ];

  // Filter and sort publications based on search and category
  useEffect(() => {
    const filterPublications = () => {
      const results = publications.filter(pub => {
        const title = (language === 'ar' ? pub?.title_ar : pub?.title_en) || '';
        const summary = (language === 'ar' ? pub?.summary_ar : pub?.summary_en) || '';
        const category = (language === 'ar' ? pub?.category_ar : pub?.category_en) || '';

        const matchesSearch = title?.toLowerCase()?.includes(searchQuery.toLowerCase()) || 
                              summary?.toLowerCase()?.includes(searchQuery.toLowerCase());
        
        const categoryId = category?.toLowerCase()?.replace(/\s+/g, '-') || '';
        const matchesCategory = activeFilter === "all" || 
                                categoryId.includes(activeFilter.toLowerCase());
        
        return matchesSearch && matchesCategory;
      });
      setFilteredPublications(results);
    };

    filterPublications();
  }, [publications, searchQuery, activeFilter, language]);


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
        <p>{t('error.loading_data')} {error}</p>
      </div>
    );
  }
  
  return (
    <div className="min-h-screen">
      {/* Hero Banner */}
      <section className="relative bg-gradient-to-r from-awrad-blue to-awrad-lightblue py-16 md:py-24" dir={isRTL ? 'rtl' : 'ltr'}>
        <div className="absolute inset-0 bg-[url('https://images.unsplash.com/photo-1488590528505-98d2b5aba04b?ixlib=rb-1.2.1&auto=format&fit=crop&w=1350&q=80')] bg-cover bg-center opacity-10"></div>
        <div className="container mx-auto relative z-10">
          <div className="max-w-3xl mx-auto text-center">
            <h1 className="text-3xl md:text-4xl font-bold text-white mb-6">{t('publications_page.title')}</h1>
            <p className="text-lg md:text-xl text-gray-100">
              {t('publications_page.subtitle')}
            </p>
          </div>
        </div>
      </section>
      
      {/* Search and Filter Section */}
      <section className="py-8 bg-white border-b">
        <div className="container mx-auto">
          <div className="flex flex-col md:flex-row items-center justify-between gap-4">
            <div className={`w-full md:w-1/3 relative ${isRTL ? 'md:text-right' : 'md:text-left'}`}>
              <Search className={`absolute top-1/2 -translate-y-1/2 text-gray-400 ${isRTL ? 'right-3' : 'left-3'}`} size={18} />
              <Input
                placeholder={t('publications.search_placeholder')}
                className={isRTL ? 'pr-10' : 'pl-10'}
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
              />
            </div>
            
            <div className={`flex flex-wrap gap-2 justify-center ${isRTL ? 'md:justify-start' : 'md:justify-end'}`}>
              {categories.map((category) => (
                <Badge
                  key={category.id}
                  variant={activeFilter === category.id ? "default" : "outline"}
                  className={`cursor-pointer ${activeFilter === category.id 
                    ? "bg-awrad-blue hover:bg-awrad-lightblue text-white" 
                    : "hover:bg-awrad-lightgray"}`}
                  onClick={() => setActiveFilter(category.id)}
                >
                  {t(category.labelKey)}
                </Badge>
              ))}
            </div>
          </div>
        </div>
      </section>
      
      {/* Publications Grid */}
      <section className="section bg-gray-50">
        <div className="container mx-auto">
          {filteredPublications.length > 0 ? (
            <>
              <div className="text-sm text-gray-500 mb-6">
                {t('publications.showing_results', { count: filteredPublications.length })}
              </div>
              
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {filteredPublications.map((pub) => (
                  <PublicationCard
                    key={pub.id}
                    title={language === 'ar' ? pub.title_ar : pub.title_en}
                    description={language === 'ar' ? pub.summary_ar : pub.summary_en}
                    date={pub.date}
                    categories={[language === 'ar' ? pub.category_ar : pub.category_en].filter(Boolean)}
                    pdfUrl={pub.link} // Pass the PDF download link
                    imageUrl={pub.image_url}
                  />
                ))}
              </div>
              
              {/* Basic Pagination - Consider a more robust solution for larger datasets */}
              <div className="mt-12 flex justify-center">
                <div className="flex items-center space-x-2">
                  <Button variant="outline" size="sm" disabled>Previous</Button>
                  <Button variant="outline" size="sm" className="bg-awrad-blue text-white hover:bg-awrad-lightblue">1</Button>
                  <Button variant="outline" size="sm">2</Button>
                  <Button variant="outline" size="sm">3</Button>
                  <span className="text-gray-500">...</span>
                  <Button variant="outline" size="sm">Next</Button>
                </div>
              </div>
            </>
          ) : (
            <div className="text-center py-12">
              <h3 className="text-xl font-medium mb-2">{t('publications.no_results_title')}</h3>
              <p className="text-gray-600 mb-6">
                {t('publications.no_results_subtitle')}
              </p>
              <Button onClick={() => {setSearchQuery(''); setActiveFilter('all');}}>
                {t('publications.clear_filters_button')}
              </Button>
            </div>
          )}
        </div>
      </section>
    </div>
  );
};

export default Publications;
