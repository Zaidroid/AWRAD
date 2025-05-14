import React from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { motion } from 'framer-motion';

interface TeamMemberProps {
  name: string;
  position: string;
  bio: string;
  imageUrl: string;
  expertise: string[];
}

const TeamMember = ({ name, position, bio, imageUrl, expertise }: TeamMemberProps) => {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: '-50px 0px' }}
      transition={{ duration: 0.5 }}
    >
      <Card className="h-full overflow-hidden hover:shadow-md transition-all duration-300 group">
        <motion.div 
          className="aspect-square w-full overflow-hidden"
          whileHover={{ scale: 1.02 }}
          transition={{ duration: 0.3 }}
        >
          <img 
            src={imageUrl} 
            alt={name} 
            className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
          />
        </motion.div>
        <CardHeader className="pb-2">
          <motion.div
            whileHover={{ x: 5 }}
            transition={{ type: 'spring', stiffness: 300 }}
          >
            <CardTitle className="text-xl text-awrad-blue">{name}</CardTitle>
            <CardDescription className="text-awrad-blue font-medium">{position}</CardDescription>
          </motion.div>
        </CardHeader>
        <CardContent>
          <p className="text-gray-600 text-sm mb-3 line-clamp-3">{bio}</p>
          <div className="flex flex-wrap gap-1">
            {expertise.map((skill, index) => (
              <motion.div
                key={index}
                whileHover={{ scale: 1.05 }}
                transition={{ type: 'spring', stiffness: 500 }}
              >
                <span className="inline-block bg-awrad-lightgray text-awrad-blue text-xs px-2 py-1 rounded-full transition-colors duration-300 hover:bg-awrad-blue hover:text-white">
                  {skill}
                </span>
              </motion.div>
            ))}
          </div>
        </CardContent>
      </Card>
    </motion.div>
  );
};

export default TeamMember;
