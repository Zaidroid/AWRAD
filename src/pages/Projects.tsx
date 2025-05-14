import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { FolderOpen, X, ChevronDown } from 'lucide-react';
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
} from "@/components/ui/dialog";

// Import project data (replace with actual data loading if needed)
import projectsOverview from '../../public/mock-data/projects/projects.md?raw';
import capacProjects from '../../public/mock-data/projects/capac.md?raw';
import democProjects from '../../public/mock-data/projects/democ.md?raw';
import socialProjects from '../../public/mock-data/projects/social.md?raw';
import performProjects from '../../public/mock-data/projects/perform.md?raw';
import legalProjects from '../../public/mock-data/projects/legal.md?raw';

const projectCategories = [
  { name: 'Capacity Building, Research & Development', file: capacProjects },
  { name: 'Democracy, Governance, Public Sector & Media', file: democProjects },
  { name: 'Social & Political Research, Community Participation', file: socialProjects },
  { name: 'Performance Management, Monitoring & Evaluation', file: performProjects },
  { name: 'Legal Reform & Rule of Law', file: legalProjects },
];

const parseProjectsMarkdown = (markdown: string) => {
  const projects: { title: string; description: string }[] = [];
  const lines = markdown.split('\n').filter(line => line.trim() !== '');
  let currentProject: { title: string; description: string } | null = null;

  for (const line of lines) {
    // Simple heuristic to detect a project title line
    if (line.match(/^[A-Z].*(\d{4}|\.):?$/) || line.startsWith('"')) {
      if (currentProject) {
        projects.push(currentProject);
      }
      currentProject = { title: line.replace(/^- /, '').trim(), description: '' };
    } else if (currentProject) {
      currentProject.description += line.trim() + ' ';
    }
  }

  if (currentProject) {
    projects.push(currentProject);
  }

  return projects;
};

const Projects = () => {
  const [selectedCategory, setSelectedCategory] = useState<{ name: string; file: string } | null>(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [expandedProjectIndex, setExpandedProjectIndex] = useState<number | null>(null); // State for expanded project

  const openModal = (category: { name: string; file: string }) => {
    setSelectedCategory(category);
    setIsModalOpen(true);
    setExpandedProjectIndex(null); // Reset expanded project when opening a new category
  };

  const closeModal = () => {
    setSelectedCategory(null);
    setIsModalOpen(false);
    setExpandedProjectIndex(null); // Reset expanded project when closing modal
  };

  const toggleProject = (index: number) => {
    setExpandedProjectIndex(expandedProjectIndex === index ? null : index);
  };

  const renderProjectContent = (fileContent: string) => {
    const projects = parseProjectsMarkdown(fileContent);
    return (
      <div className="mt-4 space-y-4 max-h-[70vh] overflow-y-auto pr-4">
        {projects.map((project, index) => (
          <motion.div
            key={index}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.3, delay: index * 0.05 }}
            className="border border-gray-200 rounded-lg overflow-hidden"
          >
            <button
              className="flex justify-between items-center w-full p-4 text-left bg-gray-50 hover:bg-gray-100 transition-colors duration-200"
              onClick={() => toggleProject(index)}
            >
              <h4 className="font-semibold text-lg text-awrad-blue">{project.title}</h4>
              <motion.div
                initial={false}
                animate={{ rotate: expandedProjectIndex === index ? 180 : 0 }}
                transition={{ duration: 0.2 }}
              >
                <ChevronDown className="w-5 h-5 text-gray-600" />
              </motion.div>
            </button>
            <AnimatePresence>
              {expandedProjectIndex === index && (
                <motion.div
                  initial={{ opacity: 0, height: 0 }}
                  animate={{ opacity: 1, height: 'auto' }}
                  exit={{ opacity: 0, height: 0 }}
                  transition={{ duration: 0.3, ease: 'easeInOut' }}
                  className="p-4 bg-white border-t border-gray-200" // Added border-t
                >
                  <p className="text-gray-700 text-sm">{project.description.trim()}</p>
                </motion.div>
              )}
            </AnimatePresence>
          </motion.div>
        ))}
      </div>
    );
  };

  return (
    <div className="min-h-screen">
      {/* Hero Banner */}
      <motion.section
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.8 }}
        className="relative bg-gradient-to-r from-awrad-blue to-awrad-lightblue py-20 md:py-28"
      >
        <div className="absolute inset-0 bg-[url('https://images.unsplash.com/photo-1517022812141-23620dba5c23?auto=format&fit=crop&q=80')] bg-cover bg-center opacity-10"></div>
        <div className="container mx-auto relative z-10">
          <motion.div
            initial={{ y: 20 }}
            animate={{ y: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="max-w-3xl text-center mx-auto"
          >
            <h1 className="text-white text-4xl md:text-5xl font-bold mb-6">Our Projects</h1>
            <p className="text-lg md:text-xl text-gray-100 leading-relaxed">
              Explore AWRAD's diverse projects across various sectors and regions.
            </p>
          </motion.div>
        </div>
      </motion.section>

      {/* Projects Content */}
      <section className="section bg-white py-16">
        <div className="container mx-auto max-w-4xl">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="mb-12"
          >
            <h2 className="text-3xl font-bold mb-6 text-awrad-blue">Overview</h2>
            <p className="text-gray-700 text-lg leading-relaxed">
              {projectsOverview.split('main categories:')[0].trim()}
            </p>
          </motion.div>

          <h2 className="text-3xl font-bold mb-8 text-awrad-blue">Project Categories</h2>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6"> {/* Changed gap and added grid */}
            {projectCategories.map((category, index) => (
              <motion.div
                key={category.name}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                className="bg-gray-50 p-6 rounded-lg shadow-md hover:shadow-lg transition-shadow duration-300 cursor-pointer flex flex-col items-center text-center" // Added styling for widget
                onClick={() => openModal(category)}
                whileHover={{ scale: 1.05 }} // Added hover animation
              >
                 <FolderOpen className="w-12 h-12 text-awrad-blue mb-4" /> {/* Icon */}
                <h3 className="text-xl font-semibold text-awrad-blue">{category.name}</h3>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Project Details Modal */}
      <Dialog open={isModalOpen} onOpenChange={setIsModalOpen}>
        <DialogContent className="sm:max-w-[900px] md:max-w-[1000px]"> {/* Increased max-width */}
          <DialogHeader>
            <DialogTitle>{selectedCategory?.name}</DialogTitle>
            <DialogDescription>
              Click on a project title to see details.
            </DialogDescription>
          </DialogHeader>
          {selectedCategory && renderProjectContent(selectedCategory.file)}
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default Projects;
