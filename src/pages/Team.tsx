
import React from 'react';
import TeamMember from '@/components/TeamMember';

const Team = () => {
  const teamMembers = [
    {
      name: "Dr. Ahmed Rahman",
      position: "Founder & Director",
      bio: "Dr. Rahman has over 20 years of experience in research and policy development across the Middle East. He founded AWRAD with a vision to provide independent, quality research that drives evidence-based policymaking in the region.",
      imageUrl: "https://images.unsplash.com/photo-1560250097-0b93528c311a?ixlib=rb-1.2.1&auto=format&fit=crop&w=1350&q=80",
      expertise: ["Public Policy", "Economic Development", "Research Methods"]
    },
    {
      name: "Dr. Layla Nasser",
      position: "Research Director",
      bio: "Dr. Nasser leads AWRAD's research department, overseeing methodology design and quality assurance. She specializes in gender studies and has published extensively on women's economic participation in Palestine.",
      imageUrl: "https://images.unsplash.com/photo-1573497019940-1c28c88b4f3e?ixlib=rb-1.2.1&auto=format&fit=crop&w=1350&q=80",
      expertise: ["Gender Studies", "Research Methods", "Policy Analysis"]
    },
    {
      name: "Dr. Omar Khalidi",
      position: "Senior Economist",
      bio: "Dr. Khalidi specializes in labor markets and economic development. His research focuses on sustainable economic policies for conflict-affected regions and post-crisis recovery strategies.",
      imageUrl: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?ixlib=rb-1.2.1&auto=format&fit=crop&w=1350&q=80",
      expertise: ["Economic Analysis", "Labor Markets", "Development Economics"]
    },
    {
      name: "Dr. Nadia Hamdan",
      position: "Health Research Lead",
      bio: "Dr. Hamdan directs AWRAD's health research initiatives, with expertise in public health systems and epidemiology. Her work has been instrumental in analyzing healthcare access in conflict-affected areas.",
      imageUrl: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?ixlib=rb-1.2.1&auto=format&fit=crop&w=1350&q=80",
      expertise: ["Public Health", "Healthcare Systems", "Epidemiology"]
    },
    {
      name: "Dr. Karim Bishara",
      position: "Public Opinion Research Lead",
      bio: "Dr. Bishara specializes in survey methodology and public opinion analysis. He has designed and implemented numerous polling projects across the Middle East on political and social issues.",
      imageUrl: "https://images.unsplash.com/photo-1519085360753-af0119f7cbe7?ixlib=rb-1.2.1&auto=format&fit=crop&w=1350&q=80",
      expertise: ["Survey Methods", "Public Opinion", "Statistical Analysis"]
    },
    {
      name: "Fatima Al-Zaher",
      position: "Social Development Specialist",
      bio: "Fatima leads research on education and youth development. With a background in educational policy, she focuses on creating inclusive educational systems that prepare youth for changing labor markets.",
      imageUrl: "https://images.unsplash.com/photo-1580489944761-15a19d654956?ixlib=rb-1.2.1&auto=format&fit=crop&w=1350&q=80",
      expertise: ["Education", "Youth Development", "Social Policy"]
    },
    {
      name: "Sami Al-Khatib",
      position: "Data Science Manager",
      bio: "Sami oversees AWRAD's data collection, management, and analysis processes. He specializes in implementing innovative methodologies for data collection in challenging environments.",
      imageUrl: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?ixlib=rb-1.2.1&auto=format&fit=crop&w=1350&q=80",
      expertise: ["Data Science", "Research Methods", "Statistical Analysis"]
    },
    {
      name: "Rania Mansour",
      position: "Policy Analyst",
      bio: "Rania specializes in translating research findings into actionable policy recommendations. Her work focuses on connecting research with policymakers and stakeholders to create meaningful impact.",
      imageUrl: "https://images.unsplash.com/photo-1551836022-d5d88e9218df?ixlib=rb-1.2.1&auto=format&fit=crop&w=1350&q=80",
      expertise: ["Policy Analysis", "Stakeholder Engagement", "Advocacy"]
    }
  ];
  
  return (
    <div className="min-h-screen">
      {/* Hero Banner */}
      <section className="relative bg-gradient-to-r from-awrad-blue to-awrad-lightblue py-16 md:py-24">
        <div className="absolute inset-0 bg-[url('https://images.unsplash.com/photo-1517245386807-bb43f82c33c4?ixlib=rb-1.2.1&auto=format&fit=crop&w=1350&q=80')] bg-cover bg-center opacity-10"></div>
        <div className="container mx-auto relative z-10">
          <div className="max-w-3xl mx-auto text-center">
            <h1 className="text-white mb-6">Our Team</h1>
            <p className="text-lg md:text-xl text-gray-100">
              Meet the dedicated researchers, analysts, and specialists who drive AWRAD's mission to produce
              high-quality research that matters.
            </p>
          </div>
        </div>
      </section>
      
      {/* Leadership Introduction */}
      <section className="section bg-white">
        <div className="container mx-auto max-w-3xl text-center">
          <h2 className="mb-6">Leadership & Expertise</h2>
          <p className="text-lg text-gray-700">
            AWRAD's team brings together experts from diverse academic and professional backgrounds, 
            united by a commitment to rigorous research that addresses the region's most pressing challenges.
            Our researchers combine strong methodological skills with deep contextual understanding
            of Palestine and the Arab region.
          </p>
        </div>
      </section>
      
      {/* Team Members Grid */}
      <section className="section bg-gray-50">
        <div className="container mx-auto">
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {teamMembers.map((member, index) => (
              <TeamMember
                key={index}
                name={member.name}
                position={member.position}
                bio={member.bio}
                imageUrl={member.imageUrl}
                expertise={member.expertise}
              />
            ))}
          </div>
        </div>
      </section>
      
      {/* Collaboration Section */}
      <section className="section bg-white">
        <div className="container mx-auto">
          <div className="max-w-3xl mx-auto text-center">
            <h2 className="mb-6">Join Our Team</h2>
            <p className="text-lg text-gray-700 mb-8">
              AWRAD is always looking for talented researchers, analysts, and specialists who are passionate 
              about contributing to sustainable development in the region through quality research.
            </p>
            <div className="bg-awrad-lightgray p-8 rounded-lg">
              <h3 className="text-xl font-semibold mb-4">Current Opportunities</h3>
              <p className="text-gray-700 mb-6">
                We currently have openings for research associates, data analysts, and field researchers.
                If you're interested in joining our team, please send your CV and a brief cover letter to:
              </p>
              <p className="font-medium text-awrad-blue">careers@awrad.org</p>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Team;
