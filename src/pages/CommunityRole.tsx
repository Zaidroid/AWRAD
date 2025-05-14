import React, { useEffect, useState } from 'react';
import { useLanguage } from '@/contexts/LanguageContext';
import Markdown from 'react-markdown';
import remarkGfm from 'remark-gfm';
import { motion } from 'framer-motion';
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion"; // Assuming Accordion is in ui components

const CommunityRole = () => {
  const { t, isRTL } = useLanguage();
  const [content, setContent] = useState(null);
  const [sections, setSections] = useState([]);

  useEffect(() => {
    fetch('/mock-data/community-role.json')
      .then(response => response.json())
      .then(data => {
        setContent(data.communityRole);
        // Simple parsing based on markdown headings
        const rawContent = data.communityRole;
        const splitContent = rawContent.split('#### ');
        const parsedSections = splitContent.map((section, index) => {
          if (index === 0) {
            // This is the introductory part before the first heading
            const introSplit = section.split('\n\n');
            const title = introSplit[0];
            const introText = introSplit.slice(1).join('\n\n');
            return { title: title, content: introText, type: 'intro' };
          } else {
            const lines = section.split('\n');
            const title = lines[0];
            const content = lines.slice(1).join('\n');
            return { title: title, content: content, type: 'section' };
          }
        });
        setSections(parsedSections);
      })
      .catch(error => console.error('Error fetching community role data:', error));
  }, []);

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.3
      }
    }
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0 }
  };

  return (
    <div className="min-h-screen" dir={isRTL ? 'rtl' : 'ltr'}>
      {/* Hero Section */}
      <section className="relative bg-gradient-to-r from-awrad-blue to-awrad-lightblue py-16 md:py-24">
        <div className="absolute inset-0 bg-[url('https://images.unsplash.com/photo-1517022812141-23620dba5c23?auto=format&fit=crop&q=80')] bg-cover bg-center opacity-10"></div>
        <div className="container mx-auto relative z-10">
          <div className="max-w-3xl mx-auto text-center">
            <h1 className="text-white mb-6">Community Role</h1>
            <p className="text-lg md:text-xl text-gray-100">
              Learn about AWRAD's Community Development Fund and its initiatives.
            </p>
          </div>
        </div>
      </section>

      {/* Content Section */}
      <section className="py-16 bg-white">
        <motion.div
          className="container mx-auto"
          variants={containerVariants}
          initial="hidden"
          animate="visible"
        >
          {sections.map((section, index) => (
            <motion.div key={index} variants={itemVariants} className="mb-8">
              {section.type === 'intro' ? (
                <div>
                  <h2 className="mb-6">{section.title}</h2>
                  <Markdown remarkPlugins={[remarkGfm]}>{section.content}</Markdown>
                </div>
              ) : (
                <Accordion type="single" collapsible className="w-full">
                  <AccordionItem value={`item-${index}`}>
                    <AccordionTrigger><h3 className="text-xl font-bold">{section.title}</h3></AccordionTrigger>
                    <AccordionContent>
                      <Markdown remarkPlugins={[remarkGfm]}>{section.content}</Markdown>
                    </AccordionContent>
                  </AccordionItem>
                </Accordion>
              )}
            </motion.div>
          ))}
        </motion.div>
      </section>
    </div>
  );
};

export default CommunityRole;
