import React, { useState, useEffect } from 'react';
import { FileText, Users, BarChart, Globe } from 'lucide-react';
import { motion, useInView, AnimatePresence } from 'framer-motion'; // Import motion, useInView, AnimatePresence
import { useRef } from 'react'; // Import useRef

interface CounterProps {
  end: number;
  label: string;
  icon: React.ReactNode;
  suffix?: string;
}

const Counter = ({ end, label, icon, suffix = "+" }: CounterProps) => {
  const [count, setCount] = useState(0);
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: '-100px 0px' }); // Use useInView

  useEffect(() => {
    if (isInView) {
      let startTime: number | null = null;
      const duration = 2000; // Animation duration in ms
      
      const animate = (timestamp: number) => {
        if (!startTime) startTime = timestamp;
        const progress = Math.min((timestamp - startTime) / duration, 1);
        
        setCount(Math.floor(progress * end));
        
        if (progress < 1) {
          requestAnimationFrame(animate);
        }
      };
      
      requestAnimationFrame(animate); // Start animation when in view
    }
  }, [end, isInView]); // Depend on isInView

  const itemVariants = {
    hidden: { y: 50, opacity: 0 },
    visible: { y: 0, opacity: 1 },
  };
  
  return (
    <motion.div 
      ref={ref} // Attach ref
      className="flex flex-col items-center"
      variants={itemVariants} // Apply item variants
      whileHover={{ scale: 1.05 }} // Add hover effect
      transition={{ type: 'spring', stiffness: 300 }}
    >
      <div className="text-awrad-blue mb-4">
        {icon}
      </div>
      <div className="text-4xl md:text-5xl font-bold text-awrad-blue mb-2">
        {count}{suffix}
      </div>
      <div className="text-gray-600 text-sm md:text-base">
        {label}
      </div>
    </motion.div>
  );
};

const ImpactSection = () => {
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
    <motion.section 
      className="py-16 bg-white"
      variants={containerVariants} // Apply container variants
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, margin: '-200px 0px' }} // Adjusted margin
    >
      <div className="container mx-auto px-4">
        <div className="text-center mb-12">
          <motion.h2 variants={itemVariants} className="text-3xl md:text-4xl font-bold mb-6">Our Impact</motion.h2> {/* Apply item variant */}
          <motion.p variants={itemVariants} className="text-lg text-gray-600 max-w-3xl mx-auto"> {/* Apply item variant */}
            For over 15 years, AWRAD has been conducting research that informs policy decisions and contributes to
            sustainable development in the Arab region.
          </motion.p>
        </div>
        
        <motion.div 
          className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8 max-w-5xl mx-auto"
          variants={containerVariants} // Apply container variants for staggered counters
        >
          <Counter 
            end={200} 
            label="Research Publications" 
            icon={<FileText size={40} />} 
          />
          <Counter 
            end={50} 
            label="Expert Researchers" 
            icon={<Users size={40} />} 
          />
          <Counter 
            end={100} 
            label="Opinion Polls Conducted" 
            icon={<BarChart size={40} />} 
          />
          <Counter 
            end={15} 
            label="Countries Covered" 
            icon={<Globe size={40} />} 
          />
        </motion.div>
      </div>
    </motion.section>
  );
};

export default ImpactSection;
