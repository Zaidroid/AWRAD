import React from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Link } from 'react-router-dom';
import { ChevronRight } from 'lucide-react';
import { useLanguage } from '@/contexts/LanguageContext';
import { motion } from 'framer-motion';
import { useInView } from 'react-intersection-observer';

interface ResearchAreaProps {
  id: string;
  title: string;
  description: string;
  icon: React.ReactNode;
  link: string;
}

const ResearchArea = ({ id, title, description, icon, link }: ResearchAreaProps) => {
  const { t, isRTL } = useLanguage();
  const [ref, inView] = useInView({
    triggerOnce: true,
    threshold: 0.1,
    rootMargin: '-50px 0px'
  });

  const variants = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0 }
  };

  return (
    <motion.div
      ref={ref}
      initial="hidden"
      animate={inView ? "visible" : "hidden"}
      variants={variants}
      transition={{ duration: 0.5 }}
    >
      <Card className="h-full transition-all hover:shadow-lg hover:translate-y-[-5px] group">
        <CardHeader className="pb-3">
          <motion.div
            className="w-12 h-12 rounded-full bg-awrad-lightgray flex items-center justify-center text-awrad-blue mb-4 group-hover:bg-awrad-blue group-hover:text-white transition-colors duration-300"
            whileHover={{ scale: 1.1 }}
          >
            {icon}
          </motion.div>
          <CardTitle className="text-xl">{title}</CardTitle>
        </CardHeader>
        <CardContent>
          <CardDescription className="text-base text-gray-700 mb-4">
            {description}
          </CardDescription>
          <Link 
            to={link}
            id={id}
            className="inline-flex items-center text-awrad-blue hover:text-awrad-lightblue font-medium transition-all duration-300 group-hover:translate-x-1"
          >
            {t('learn-more')} {isRTL ? (
              <ChevronRight size={16} className="mr-1 rotate-180 transition-transform group-hover:translate-x-[-4px]" />
            ) : (
              <ChevronRight size={16} className="ml-1 transition-transform group-hover:translate-x-1" />
            )}
          </Link>
        </CardContent>
      </Card>
    </motion.div>
  );
};

export default ResearchArea;
