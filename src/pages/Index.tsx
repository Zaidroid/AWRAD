import React from 'react';
import Hero from '@/components/Hero';
import ResearchArea from '@/components/ResearchArea';
import PublicationCard from '@/components/PublicationCard';
import ImpactSection from '@/components/ImpactSection';
import { Button } from '@/components/ui/button';
import { Link } from 'react-router-dom';
import { BarChart3, Users, HeartPulse, TrendingUp, LineChart } from 'lucide-react';
import { useLanguage } from '@/contexts/LanguageContext';
import { motion } from 'framer-motion';

const Index = () => {
  const { t, isRTL } = useLanguage();
  
  const researchAreas = [
    {
      id: "public-opinion",
      title: t('research.public-opinion'),
      description: t('research.public-opinion.desc'),
      icon: <BarChart3 size={24} />,
      link: "/public-opinion-polls"  // Updated to link to the new page
    },
    {
      id: "economic-development",
      title: t('research.economic-development'),
      description: t('research.economic-development.desc'),
      icon: <TrendingUp size={24} />,
      link: "/research#economic-development"
    },
    {
      id: "gender-studies",
      title: t('research.gender-studies'),
      description: t('research.gender-studies.desc'),
      icon: <Users size={24} />,
      link: "/research#gender-studies"
    },
    {
      id: "health",
      title: t('research.health'),
      description: t('research.health.desc'),
      icon: <HeartPulse size={24} />,
      link: "/research#health"
    },
    {
      id: "social-development",
      title: t('research.social-development'),
      description: t('research.social-development.desc'),
      icon: <LineChart size={24} />,
      link: "/research#social-development"
    }
  ];

  const featuredPublications = [
    {
      title: "COVID-19 Impact on Palestinian Economy",
      description: "A comprehensive analysis of how the pandemic affected businesses, employment, and economic stability in Palestine during 2020-2021.",
      date: "January 2022",
      categories: ["Health", "Economic Development"],
      imageUrl: "https://images.unsplash.com/photo-1584483766114-2cea6facdf57?ixlib=rb-1.2.1&auto=format&fit=crop&w=1350&q=80"
    },
    {
      title: "Women's Political Participation in MENA Region",
      description: "Examining the trends, challenges, and opportunities for women's involvement in political processes across the Middle East and North Africa.",
      date: "March 2022",
      categories: ["Gender Studies", "Public Opinion"],
      imageUrl: "https://images.unsplash.com/photo-1596524430615-b46475ddff6e?ixlib=rb-1.2.1&auto=format&fit=crop&w=1350&q=80"
    },
    {
      title: "Youth Perspectives on Educational Reform",
      description: "A survey-based study capturing young people's views on education system challenges and proposed improvements in Palestine.",
      date: "June 2022",
      categories: ["Social Development", "Public Opinion"],
      imageUrl: "https://images.unsplash.com/photo-1523240795612-9a054b0db644?ixlib=rb-1.2.1&auto=format&fit=crop&w=1350&q=80"
    }
  ];

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
    hidden: { y: 50, opacity: 0 },
    visible: { y: 0, opacity: 1 },
  };

  return (
    <div className="min-h-screen" dir={isRTL ? 'rtl' : 'ltr'}>
      <Hero />
      
      {/* Impact Section */}
      <motion.section 
        className="section bg-white"
        variants={containerVariants}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, margin: '-100px 0px' }}
      >
        <ImpactSection />
      </motion.section>
      
      {/* Mission Statement */}
      <motion.section 
        className="section bg-gray-50"
        variants={containerVariants}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, margin: '-100px 0px' }}
      >
        <div className="container mx-auto max-w-4xl text-center">
          <motion.h2 variants={itemVariants} className="text-2xl md:text-3xl font-bold mb-6">{t('mission.title')}</motion.h2>
          <motion.p variants={itemVariants} className="text-lg text-gray-700 mb-8">
            {t('mission.subtitle')}
          </motion.p>
          <motion.div variants={itemVariants}>
            <Button asChild variant="outline" className="border-awrad-blue text-awrad-blue hover:bg-awrad-blue hover:text-white">
              <Link to="/about">{t('mission.cta')}</Link>
            </Button>
          </motion.div>
        </div>
      </motion.section>
      
      {/* Research Areas */}
      <motion.section 
        className="section bg-white" // Changed background for contrast
        variants={containerVariants}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, margin: '-100px 0px' }}
      >
        <div className="container mx-auto">
          <div className="text-center mb-12">
            <motion.h2 variants={itemVariants} className="text-2xl md:text-3xl font-bold mb-4">{t('research.title')}</motion.h2>
            <motion.p variants={itemVariants} className="text-lg text-gray-600 max-w-3xl mx-auto">
              {t('research.subtitle')}
            </motion.p>
          </div>
          
          <motion.div 
            className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6"
            variants={containerVariants} // Stagger children animations
          >
            {researchAreas.map((area) => (
              <motion.div key={area.id} variants={itemVariants}> {/* Apply item variant to each ResearchArea */}
                <ResearchArea
                  id={area.id}
                  title={area.title}
                  description={area.description}
                  icon={area.icon}
                  link={area.link}
                />
              </motion.div>
            ))}
          </motion.div>
          
          <motion.div variants={itemVariants} className="mt-10 text-center">
            <Button asChild size="lg" className="bg-awrad-blue hover:bg-awrad-lightblue">
              <Link to="/research">{t('research.cta')}</Link>
            </Button>
            <Button asChild size="lg" variant="outline" className="border-awrad-blue text-awrad-blue hover:bg-awrad-blue hover:text-white ml-4">
              <Link to="/public-opinion-polls">View Public Opinion Polls</Link>
            </Button>
          </motion.div>
        </div>
      </motion.section>
      
      {/* Featured Publications */}
      <motion.section 
        className="section bg-gray-50" // Changed background for contrast
        variants={containerVariants}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, margin: '-100px 0px' }}
      >
        <div className="container mx-auto">
          <div className="text-center mb-12">
            <motion.h2 variants={itemVariants} className="text-2xl md:text-3xl font-bold mb-4">{t('publications.title')}</motion.h2>
            <motion.p variants={itemVariants} className="text-lg text-gray-600 max-w-3xl mx-auto">
              {t('publications.subtitle')}
            </motion.p>
          </div>
          
          <motion.div 
            className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6"
            variants={containerVariants} // Stagger children animations
          >
            {featuredPublications.map((pub, index) => (
              <motion.div key={index} variants={itemVariants}> {/* Apply item variant to each PublicationCard */}
                <PublicationCard
                  title={pub.title}
                  description={pub.description}
                  date={pub.date}
                  categories={pub.categories}
                  imageUrl={pub.imageUrl}
                />
              </motion.div>
            ))}
          </motion.div>
          
          <motion.div variants={itemVariants} className="mt-10 text-center">
            <Button asChild variant="outline" className="border-awrad-blue text-awrad-blue hover:bg-awrad-blue hover:text-white">
              <Link to="/publications">{t('publications.cta')}</Link>
            </Button>
          </motion.div>
        </div>
      </motion.section>
      
      {/* Partner With Us (Call to Action) */}
      <motion.section 
        className="section bg-awrad-blue text-white"
        variants={containerVariants}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, margin: '-100px 0px' }}
      >
        <div className="container mx-auto max-w-4xl text-center">
          <motion.h2 variants={itemVariants} className="text-2xl md:text-3xl font-bold mb-6 text-white">{t('partner.title')}</motion.h2>
          <motion.p variants={itemVariants} className="text-lg mb-8">
            {t('partner.subtitle')}
          </motion.p>
          <motion.div variants={itemVariants}>
            <Button asChild size="lg" className="bg-white text-awrad-blue hover:bg-gray-100">
              <Link to="/contact">{t('partner.cta')}</Link>
            </Button>
          </motion.div>
        </div>
      </motion.section>
    </div>
  );
};

export default Index;
