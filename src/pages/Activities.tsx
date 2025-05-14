import React, { useState, useEffect } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Badge } from '@/components/ui/badge';
import { Search } from 'lucide-react';
import { useLanguage } from '@/contexts/LanguageContext';
import { Card, CardHeader, CardTitle, CardDescription, CardContent, CardFooter } from '@/components/ui/card';

interface Activity {
  title: string;
  url: string;
  image_url: string;
  description: string;
  date: string;
}

const Activities = () => {
  const { t, isRTL, language } = useLanguage();
  const [searchQuery, setSearchQuery] = useState("");
  const [activities, setActivities] = useState<Activity[]>([]);
  const [filteredActivities, setFilteredActivities] = useState<Activity[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchActivities = async () => {
      try {
        setLoading(true);
        const response = await fetch('/mock-data/all-activities.json');
        if (!response.ok) {
          throw new Error(`HTTP error! status: ${response.status}`);
        }
        const data = await response.json();
        setActivities(data);
        setError(null);
      } catch (err) {
        if (err instanceof Error) {
          setError(err.message);
        } else {
          setError('An unknown error occurred');
        }
        console.error("Failed to fetch activities:", err);
      } finally {
        setLoading(false);
      }
    };

    fetchActivities();
  }, []);

  // Filter activities based on search
  useEffect(() => {
    const results = activities.filter(activity => {
      return activity.title.toLowerCase().includes(searchQuery.toLowerCase()) || 
             activity.description.toLowerCase().includes(searchQuery.toLowerCase());
    });
    setFilteredActivities(results);
  }, [activities, searchQuery]);

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
            <h1 className="text-3xl md:text-4xl font-bold text-white mb-6">{t('activities.title')}</h1>
            <p className="text-lg md:text-xl text-gray-100">
              {t('activities.subtitle')}
            </p>
          </div>
        </div>
      </section>
      
      {/* Search Section */}
      <section className="py-8 bg-white border-b">
        <div className="container mx-auto">
          <div className="flex flex-col md:flex-row items-center justify-between gap-4">
            <div className={`w-full md:w-1/3 relative ${isRTL ? 'md:text-right' : 'md:text-left'}`}>
              <Search className={`absolute top-1/2 -translate-y-1/2 text-gray-400 ${isRTL ? 'right-3' : 'left-3'}`} size={18} />
              <Input
                placeholder={t('activities.search_placeholder')}
                className={isRTL ? 'pr-10' : 'pl-10'}
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
              />
            </div>
          </div>
        </div>
      </section>
      
      {/* Activities Grid */}
      <section className="section bg-gray-50">
        <div className="container mx-auto">
          {filteredActivities.length > 0 ? (
            <>
              <div className="text-sm text-gray-500 mb-6">
                {t('activities.showing_results', { count: filteredActivities.length })}
              </div>
              
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 items-stretch"> {/* Added items-stretch */}
                {filteredActivities.map((activity, index) => (
                  <Card key={index} className="hover:shadow-lg transition-shadow flex flex-col"> {/* Added flex flex-col */}
                    <CardHeader>
                      <div className="aspect-video relative mb-4">
                        <img 
                          src={activity.image_url || '/placeholder.svg'} 
                          alt={activity.title}
                          className="w-full h-full object-cover rounded"
                        />
                      </div>
                      <CardTitle>{activity.title}</CardTitle>
                      <CardDescription className="text-sm text-gray-500">
                        {activity.date}
                      </CardDescription>
                    </CardHeader>
                    <CardContent className="flex-grow h-32"> {/* Added flex-grow and h-32 */}
                      <p className="text-gray-600 line-clamp-3">
                        {activity.description}
                      </p>
                    </CardContent>
                    <CardFooter className="mt-auto"> {/* Added mt-auto to push footer to bottom */}
                      <Button asChild variant="link" className="text-awrad-blue">
                        <a href={activity.url} target="_blank" rel="noopener noreferrer">
                          {t('activities.read_more')}
                        </a>
                      </Button>
                    </CardFooter>
                  </Card>
                ))}
              </div>
            </>
          ) : (
            <div className="text-center py-12">
              <h3 className="text-xl font-medium mb-2">{t('activities.no_results_title')}</h3>
              <p className="text-gray-600 mb-6">
                {t('activities.no_results_subtitle')}
              </p>
              <Button onClick={() => setSearchQuery('')}>
                {t('activities.clear_search_button')}
              </Button>
            </div>
          )}
        </div>
      </section>
    </div>
  );
};

export default Activities;
