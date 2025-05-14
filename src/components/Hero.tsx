import React, { useEffect, useState } from 'react';
import { motion, useScroll, useTransform, AnimatePresence } from 'framer-motion';
import { Button } from '@/components/ui/button';
import { Link } from 'react-router-dom';
import { useLanguage } from '@/contexts/LanguageContext';
import { useIsMobile } from '@/hooks/use-mobile';
import { ArrowRight, ChevronRight } from 'lucide-react';
import PublicationCard from './PublicationCard'; // Import PublicationCard

interface Publication {
  id?: number;
  title: string;
  category?: string;
  date?: string;
  link: string;
  subtitle_key?: string;
  imageUrl?: string; // Added imageUrl for PublicationCard
}

const Hero = () => {
  const { t, isRTL } = useLanguage();
  const isMobile = useIsMobile();

  const [featuredPublication, setFeaturedPublication] = useState<Publication | null>(null);
  const [trendingPublications, setTrendingPublications] = useState<Publication[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);
  const [currentSlide, setCurrentSlide] = useState(0);

  useEffect(() => {
    const fetchPublications = async () => {
      try {
        setLoading(true);
        const response = await fetch('/mock-data/publications.json');
        if (!response.ok) {
          throw new Error(`HTTP error! status: ${response.status}`);
        }
        const data = await response.json();
        setFeaturedPublication(data.featuredPublication);
        setTrendingPublications(data.trendingPublications);
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

  useEffect(() => {
    if (trendingPublications.length > 0) {
      const interval = setInterval(() => {
        setCurrentSlide((prevSlide) => (prevSlide + 1) % trendingPublications.length);
      }, 5000); // Auto-transition every 5 seconds
      return () => clearInterval(interval);
    }
  }, [trendingPublications]);

  const { scrollYProgress } = useScroll();
  const scale = useTransform(scrollYProgress, [0, 1], [1, 0.8]);
  const opacity = useTransform(scrollYProgress, [0, 0.5], [1, 0]);

  if (loading) {
    return (
      <section className="relative bg-gradient-to-r from-awrad-blue to-awrad-lightblue text-white py-20" dir={isRTL ? 'rtl' : 'ltr'}>
        <div className="container mx-auto text-center">
          <motion.div
            animate={{ 
              opacity: [0.5, 1, 0.5],
              scale: [0.98, 1, 0.98]
            }}
            transition={{ 
              duration: 1.5,
              repeat: Infinity,
              ease: "easeInOut"
            }}
          >
            <p>{t('loading')}</p>
          </motion.div>
        </div>
      </section>
    );
  }

  if (error) {
    return (
      <section className="relative bg-red-700 text-white py-20" dir={isRTL ? 'rtl' : 'ltr'}>
        <div className="container mx-auto text-center">
          <p>{t('error.loading_data')} {error}</p>
        </div>
      </section>
    );
  }

  if (!featuredPublication) {
    return (
      <section className="relative bg-gradient-to-r from-awrad-blue to-awrad-lightblue text-white py-20" dir={isRTL ? 'rtl' : 'ltr'}>
        <div className="container mx-auto text-center">
          <p>{t('hero.no_featured_publication')}</p>
        </div>
      </section>
    );
  }
  
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
      },
    },
  };

  const itemVariants = {
    hidden: { y: 20, opacity: 0 },
    visible: { y: 0, opacity: 1 },
  };

  return (
    <motion.section 
      className="relative bg-gradient-to-r from-awrad-blue to-awrad-lightblue text-white overflow-hidden min-h-[60vh] flex items-center" // Reduced height
      dir={isRTL ? 'rtl' : 'ltr'}
      style={{ scale, opacity }}
    >
      {/* Background Animation */}
      <motion.div 
        className="absolute inset-0 bg-[url('/hero.jpg')] bg-cover bg-center opacity-50" // Added opacity-50 class
        initial={{ scale: 1.1 }}
        animate={{ scale: 1 }}
        transition={{ duration: 1.5, ease: "easeOut" }}
      ></motion.div>
      
      <div className="container mx-auto relative z-10 py-8 md:py-12"> {/* Adjusted padding */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 items-center"> {/* Adjusted grid */}
          {/* Main hero content */}
          <motion.div 
            className="px-4 lg:px-8"
            variants={containerVariants}
            initial="hidden"
            animate="visible"
          >
            <div className={`max-w-2xl ${isMobile ? 'text-center' : ''}`}> {/* Adjusted max-width */}
              {/* Featured publication badge */}
              {featuredPublication.category && featuredPublication.date && (
                <motion.div variants={itemVariants} className="mb-4 inline-block">
                  <span className="bg-white/20 text-white text-xs uppercase tracking-wider py-1 px-3 rounded-full backdrop-blur-sm">
                    {t(featuredPublication.category.toLowerCase() === 'research' ? 'research_category' : featuredPublication.category.toLowerCase()) || featuredPublication.category} • {featuredPublication.date}
                  </span>
                </motion.div>
              )}
              
              <motion.h1 
                className="text-3xl md:text-4xl lg:text-5xl font-bold mb-4 text-white leading-tight" // Adjusted margin
                variants={itemVariants}
              >
                {featuredPublication.title}
              </motion.h1>
              
              <motion.p 
                className="text-md md:text-lg mb-6 text-gray-100 max-w-xl" // Adjusted margin and max-width
                variants={itemVariants}
              >
                {t(featuredPublication.subtitle_key || 'hero.subtitle_default', { title: featuredPublication.title })}
              </motion.p>
              
              <motion.div 
                className={`flex ${isMobile ? 'flex-col items-center' : 'flex-row'} gap-4`}
                variants={itemVariants}
              >
                <Button asChild size="lg" className="bg-white text-awrad-blue hover:bg-gray-100">
                  <Link to={featuredPublication.link}>
                    {t('hero.learn_more')} <ChevronRight className="ml-1" size={18} />
                  </Link>
                </Button>
                <Button 
                  asChild 
                  size="lg" 
                  className="bg-transparent border-2 border-white text-white hover:bg-white hover:text-awrad-blue transition-colors duration-200"
                >
                  <Link to="/publications" className="flex items-center">
                    {t('hero.cta2')} <ArrowRight className="ml-1" size={18} />
                  </Link>
                </Button>
              </motion.div>
            </div>
          </motion.div>

          {/* Trending Slider */}
          <motion.div 
            className="px-4 lg:px-8 flex items-center justify-center"
            variants={containerVariants}
            initial="hidden"
            animate="visible"
          >
            <div className="w-full max-w-sm"> {/* Container for slider */}
              <h3 className="text-xl font-bold mb-4 text-white border-b border-white/20 pb-2 text-center">
                {t('trending.title') || 'Trending'}
              </h3>
              <AnimatePresence mode="wait">
                {trendingPublications.length > 0 && (
                  <motion.div
                    key={currentSlide}
                    initial={{ opacity: 0, x: isRTL ? 50 : -50 }}
                    animate={{ opacity: 1, x: 0 }}
                    exit={{ opacity: 0, x: isRTL ? -50 : 50 }}
                    transition={{ duration: 0.5 }}
                  >
                    <PublicationCard 
                      publication={trendingPublications[currentSlide]} 
                      isTrending={true} // Pass isTrending prop
                    />
                  </motion.div>
                )}
              </AnimatePresence>
            </div>
          </motion.div>
        </div>
      </div>
    </motion.section>
  );
};

export default Hero;
