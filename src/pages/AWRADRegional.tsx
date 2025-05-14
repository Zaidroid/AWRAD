import React, { useState, useEffect } from 'react';
import ReactMarkdown from 'react-markdown';
import RegionalMap from '../components/RegionalMap'; // Import the map component
import CountryPopup from '../components/CountryPopup'; // Import the popup component

const AWRADRegional: React.FC = () => {
  const [regionalContent, setRegionalContent] = useState('');
  const [countryContent, setCountryContent] = useState<{ [key: string]: string }>({});
  const [selectedCountry, setSelectedCountry] = useState<string | null>(null);

  useEffect(() => {
    // Read regional.md
    fetch('/regional.md')
      .then((res) => res.text())
      .then((text) => setRegionalContent(text));

    // Read country-specific markdown files
    const countries = ['egypt', 'jordan', 'algeria']; // Add more countries as needed
    countries.forEach(country => {
      fetch(`/mock-data/${country}.md`)
        .then((res) => res.text())
        .then((text) => setCountryContent(prevState => ({ ...prevState, [country]: text })))
        .catch(error => console.error(`Error reading ${country}.md:`, error));
    });

  }, []);

  const handleCountryClick = (country: string) => {
    setSelectedCountry(country);
  };

  const handleClosePopup = () => {
    setSelectedCountry(null);
  };

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold mb-4">AWRAD Regional</h1>
      <div className="prose max-w-none">
        <ReactMarkdown>{regionalContent}</ReactMarkdown>
      </div>

      <div className="mt-8">
        <h2 className="text-2xl font-bold mb-4">Regional Presence</h2>
        {/* Map component */}
        <RegionalMap onCountryClick={handleCountryClick} />
      </div>

      {/* Pop-up widget */}
      {selectedCountry && countryContent[selectedCountry] && (
        <CountryPopup
          country={selectedCountry}
          content={countryContent[selectedCountry]}
          onClose={handleClosePopup}
        />
      )}
    </div>
  );
};

export default AWRADRegional;
