import React from 'react';
import { Link } from 'react-router-dom'; // Import Link
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Calendar, Download } from 'lucide-react';
import { motion } from 'framer-motion';

interface Publication {
  id?: number;
  title: string;
  category?: string;
  date?: string;
  link: string;
  subtitle_key?: string;
  imageUrl?: string;
  description?: string; // Added description to Publication interface
  pdfUrl?: string; // Added pdfUrl to Publication interface
}

interface PublicationCardProps {
  publication?: Publication; // Make publication optional
  title?: string; // Make individual props optional
  description?: string;
  date?: string;
  categories?: string[];
  pdfUrl?: string;
  imageUrl?: string;
  isTrending?: boolean; // Added isTrending prop
}

const PublicationCard = ({ 
  publication,
  title, 
  description,
  date, 
  categories = [], 
  pdfUrl, 
  imageUrl,
  isTrending // Destructure isTrending
}: PublicationCardProps) => {

  // Use data from publication object if provided, otherwise use individual props
  const currentTitle = publication?.title || title || '';
  const currentDescription = publication?.description || description || '';
  const currentDate = publication?.date || date || '';
  const currentCategories = publication?.category ? [publication.category] : categories; // Use category from publication if available
  const currentPdfUrl = publication?.pdfUrl || pdfUrl;
  const currentImageUrl = publication?.imageUrl || imageUrl;
  const currentLink = publication?.link; // Get link from publication

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: '-50px 0px' }}
      transition={{ duration: 0.5 }}
    >
      <Card className="h-full flex flex-col hover:shadow-lg transition-shadow duration-300 ease-in-out overflow-hidden group">
        {currentImageUrl && (
          <motion.div
            className="block w-full h-48 overflow-hidden relative" // Added relative positioning
            whileHover={{ scale: 1.02 }}
            transition={{ duration: 0.3 }}
          >
            <img
              src={currentImageUrl}
              alt={currentTitle}
              className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-105"
            />
            {/* Title Overlay */}
            <div className="absolute inset-0 bg-black bg-opacity-50 flex items-center justify-center transition-opacity duration-300">
              <h3 className="text-white text-lg font-semibold text-center px-4 line-clamp-2">
                {currentTitle}
              </h3>
            </div>
          </motion.div>
        )}
        {/* CardTitle was moved from here */}
        <CardHeader className="pb-3 pt-0"> {/* Adjust padding */}
          {currentDate && (
            <motion.div 
              className="flex items-center text-xs text-gray-500 mb-1.5"
              whileHover={{ x: 5 }}
              transition={{ type: 'spring', stiffness: 300 }}
            >
              <Calendar size={14} className="mr-1.5 text-awrad-blue" />
              <time dateTime={currentDate}>{currentDate}</time>
            </motion.div>
          )}
        </CardHeader>
        <CardContent className="pb-3 flex-grow">
          <p className="text-gray-700 text-sm line-clamp-3 leading-relaxed">{currentDescription}</p>
        </CardContent>
        <CardFooter className="flex flex-col items-start pt-2 pb-4 px-4">
          {currentCategories.length > 0 && (
            <div className="flex flex-wrap gap-1.5 mb-3">
              {currentCategories.map((category, index) => (
                <motion.div
                  key={index}
                  whileHover={{ scale: 1.05 }}
                  transition={{ type: 'spring', stiffness: 500 }}
                >
                  <Badge variant="secondary" className="text-xs">
                    {category}
                  </Badge>
                </motion.div>
              ))}
            </div>
          )}
          <motion.div
            whileHover={{ scale: 1.05 }}
            transition={{ type: 'spring', stiffness: 500 }}
          >
            <Button
              asChild
              variant="link"
              className="p-0 h-auto text-sm text-awrad-blue hover:text-awrad-darkblue"
            >
              {currentPdfUrl ? (
                <a href={currentPdfUrl} target="_blank" rel="noopener noreferrer">
                  Download PDF <Download size={14} className="ml-1" />
                </a>
              ) : currentLink ? (
                <Link to={currentLink}>
                  Read More
                </Link>
              ) : (
                <span>Read More</span>
              )}
            </Button>
          </motion.div>
        </CardFooter>
      </Card>
    </motion.div>
  );
};

export default PublicationCard;
