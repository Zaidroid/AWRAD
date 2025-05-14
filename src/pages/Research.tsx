import React from 'react';
import { Button } from '@/components/ui/button';
import { Link } from 'react-router-dom';
import { useLanguage } from '@/contexts/LanguageContext';
import { BarChart3, TrendingUp, Users, HeartPulse, LineChart } from 'lucide-react';

const Research = () => {
  const { t, isRTL } = useLanguage();
  
  const researchAreas = [
    {
      id: "public-opinion",
      title: "Public Opinion Research",
      description: "Our public opinion polling captures diverse perspectives across Palestine and the Arab region on political, social, and economic issues.",
      icon: <BarChart3 size={48} className="text-awrad-blue mb-4" />,
      examples: [
        "Palestinian Public Opinion Poll (Quarterly)",
        "Youth Perspectives Survey Series",
        "Governance and Political Participation Studies"
      ],
      link: "/public-opinion-polls"
    },
    {
      id: "economic-development",
      title: "Economic Development",
      description: "We analyze economic trends, labor markets, and development strategies tailored to the unique challenges of the region.",
      icon: <TrendingUp size={48} className="text-awrad-blue mb-4" />,
      examples: [
        "Labor Market Analysis",
        "Small Business Development Reports",
        "Economic Impact Assessments"
      ]
    },
    {
      id: "gender-studies",
      title: "Gender Studies",
      description: "Our gender-focused research examines equality, women's empowerment, and gender-responsive policies across sectors.",
      icon: <Users size={48} className="text-awrad-blue mb-4" />,
      examples: [
        "Women's Political Participation Index",
        "Gender-Based Violence Research",
        "Gender Equality in Education"
      ]
    },
    {
      id: "health",
      title: "Health Research",
      description: "We study healthcare systems, public health challenges, and the impact of crises on health outcomes in the region.",
      icon: <HeartPulse size={48} className="text-awrad-blue mb-4" />,
      examples: [
        "COVID-19 Impact Studies",
        "Healthcare Access Analysis",
        "Mental Health Assessment"
      ]
    },
    {
      id: "social-development",
      title: "Social Development",
      description: "Our work explores education, youth empowerment, social inclusion, and community resilience in challenging contexts.",
      icon: <LineChart size={48} className="text-awrad-blue mb-4" />,
      examples: [
        "Education Quality Assessment",
        "Social Cohesion Index",
        "Youth Empowerment Programs Evaluation"
      ]
    }
  ];

  return (
    <div className="min-h-screen" dir={isRTL ? 'rtl' : 'ltr'}>
      {/* Hero Section */}
      <section className="relative bg-gradient-to-r from-awrad-blue to-awrad-lightblue py-16 md:py-24">
        <div className="absolute inset-0 bg-[url('https://images.unsplash.com/photo-1551836022-d5d88e9218df?ixlib=rb-1.2.1&auto=format&fit=crop&w=1350&q=80')] bg-cover bg-center opacity-10"></div>
        <div className="container mx-auto relative z-10">
          <div className="max-w-3xl mx-auto text-center">
            <h1 className="text-white mb-6">Research Areas</h1>
            <p className="text-lg md:text-xl text-gray-100">
              Our research covers a wide range of topics relevant to sustainable development and policy-making in Palestine and the Arab region. We combine rigorous methodologies with deep contextual understanding to provide actionable insights.
            </p>
          </div>
        </div>
      </section>

      {/* Research Areas Section */}
      <section className="py-16 bg-white">
        <div className="container mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-2xl md:text-3xl font-bold mb-4">Our Core Research Areas</h2>
            <p className="text-lg text-gray-600 max-w-3xl mx-auto">
              Explore the key fields where AWRAD provides data-driven insights and policy recommendations for addressing the region's most pressing challenges.
            </p>
          </div>

          {/* Featured/Highlighted Research Area - Public Opinion */}
          <div className="mb-16 bg-gray-50 rounded-lg p-8 border border-gray-100 shadow-sm">
            <div className="flex flex-col lg:flex-row items-center">
              <div className="lg:w-1/4 flex justify-center mb-6 lg:mb-0">
                <BarChart3 size={120} className="text-awrad-blue" />
              </div>
              <div className="lg:w-3/4 lg:pl-8">
                <h3 className="text-2xl font-bold mb-4">Public Opinion Research</h3>
                <p className="text-lg text-gray-700 mb-6">
                  Our flagship research area focuses on capturing diverse perspectives across Palestine and the Arab region on political, social, and economic issues. Through rigorous polling methodologies, we provide valuable insights into public attitudes, preferences, and concerns.
                </p>
                <div className="bg-white p-4 rounded-md border border-gray-200 mb-6">
                  <h4 className="font-semibold mb-3">Recent Public Opinion Studies:</h4>
                  <ul className="space-y-2">
                    <li className="flex items-start">
                      <div className="h-5 w-5 rounded-full bg-awrad-blue flex items-center justify-center text-white text-xs mr-2 mt-1">•</div>
                      <span>Palestinian Public Opinion Poll (Quarterly)</span>
                    </li>
                    <li className="flex items-start">
                      <div className="h-5 w-5 rounded-full bg-awrad-blue flex items-center justify-center text-white text-xs mr-2 mt-1">•</div>
                      <span>Youth Perspectives on Political Participation</span>
                    </li>
                    <li className="flex items-start">
                      <div className="h-5 w-5 rounded-full bg-awrad-blue flex items-center justify-center text-white text-xs mr-2 mt-1">•</div>
                      <span>Public Trust in Institutions Survey</span>
                    </li>
                  </ul>
                </div>
                <Button asChild size="lg" className="bg-awrad-blue hover:bg-awrad-lightblue">
                  <Link to="/public-opinion-polls">View All Public Opinion Polls</Link>
                </Button>
              </div>
            </div>
          </div>

          {/* Other Research Areas */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {researchAreas.slice(1).map((area) => (
              <div key={area.id} className="bg-white rounded-lg p-6 border border-gray-200 shadow-sm" id={area.id}>
                <div className="flex justify-center mb-4">
                  {area.icon}
                </div>
                <h3 className="text-xl font-bold mb-3 text-center">{area.title}</h3>
                <p className="text-gray-700 mb-4">{area.description}</p>
                <div className="bg-gray-50 p-4 rounded-md">
                  <h4 className="font-semibold mb-2">Example Studies:</h4>
                  <ul className="space-y-1">
                    {area.examples.map((example, idx) => (
                      <li key={idx} className="flex items-start">
                        <span className="text-awrad-blue mr-2">•</span>
                        <span>{example}</span>
                      </li>
                    ))}
                  </ul>
                </div>
                <div className="mt-4 text-center">
                  <Button asChild variant="outline" className="border-awrad-blue text-awrad-blue hover:bg-awrad-blue hover:text-white">
                    <Link to={area.link || `#${area.id}`}>Learn More</Link>
                  </Button>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Research Methodology Section */}
      <section className="py-16 bg-gray-50">
        <div className="container mx-auto">
          <div className="max-w-3xl mx-auto">
            <h2 className="text-2xl md:text-3xl font-bold mb-6 text-center">Our Research Methodology</h2>
            <p className="text-lg text-gray-700 mb-8 text-center">
              AWRAD employs rigorous research methodologies tailored to each project's specific needs, ensuring high-quality, reliable results that inform effective policy decisions.
            </p>
            
            <div className="space-y-6">
              <div className="bg-white p-6 rounded-lg shadow-sm">
                <h3 className="text-xl font-bold mb-3">Mixed Methods Approach</h3>
                <p className="text-gray-700">
                  We combine quantitative and qualitative research methods to provide comprehensive insights into complex social, economic, and political issues.
                </p>
              </div>
              
              <div className="bg-white p-6 rounded-lg shadow-sm">
                <h3 className="text-xl font-bold mb-3">Data Collection</h3>
                <p className="text-gray-700">
                  Our data collection methods include surveys, focus groups, in-depth interviews, and analysis of existing datasets, ensuring a holistic understanding of the issues.
                </p>
              </div>
              
              <div className="bg-white p-6 rounded-lg shadow-sm">
                <h3 className="text-xl font-bold mb-3">Quality Control</h3>
                <p className="text-gray-700">
                  We implement rigorous quality control measures throughout the research process, from questionnaire design to data analysis, ensuring the validity and reliability of our findings.
                </p>
              </div>
              
              <div className="bg-white p-6 rounded-lg shadow-sm">
                <h3 className="text-xl font-bold mb-3">Ethical Standards</h3>
                <p className="text-gray-700">
                  All our research adheres to international ethical standards, including informed consent, confidentiality, and data protection, particularly when working with vulnerable populations.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Call to Action */}
      <section className="py-16 bg-awrad-blue text-white">
        <div className="container mx-auto text-center">
          <h2 className="text-2xl md:text-3xl font-bold mb-6 text-white">Interested in Collaborating?</h2>
          <p className="text-lg mb-8 max-w-2xl mx-auto">
            We welcome partnerships with academic institutions, NGOs, governments, and international organizations interested in research collaboration or commissioning studies.
          </p>
          <Button asChild size="lg" className="bg-white text-awrad-blue hover:bg-gray-100">
            <Link to="/contact">Contact Our Research Team</Link>
          </Button>
        </div>
      </section>
    </div>
  );
};

export default Research;
