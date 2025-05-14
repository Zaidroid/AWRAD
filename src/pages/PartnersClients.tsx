import React, { useState, useEffect } from 'react';
import { useLanguage } from '@/contexts/LanguageContext';
import { Card, CardContent } from '@/components/ui/card';

interface PartnerClient {
  name: string;
  logo: string;
  url: string;
}

const PartnersClients = () => {
  const { t, isRTL } = useLanguage();
  const [partnersClients, setPartnersClients] = useState<PartnerClient[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchPartnersClients = async () => {
      try {
        setLoading(true);
        const response = await fetch('/partners-and-clients.json');
        if (!response.ok) {
          throw new Error(`HTTP error! status: ${response.status}`);
        }
        const data = await response.json();
        setPartnersClients(data.partners); // Assuming the JSON has a 'partners' key
        setError(null);
      } catch (err) {
        if (err instanceof Error) {
          setError(err.message);
        } else {
          setError('An unknown error occurred');
        }
        console.error("Failed to fetch partners and clients:", err);
      } finally {
        setLoading(false);
      }
    };

    fetchPartnersClients();
  }, []);

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center" dir={isRTL ? 'rtl' : 'ltr'}>
        <p>{t('loading')}</p>
      </div>
    );
  }

  if (error) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-red-100 text-red-700" dir={isRTL ? 'rtl' : 'ltr'}>
        <p>{t('error.loading_data')} {error}</p>
      </div>
    );
  }

  return (
    <div className="min-h-screen" dir={isRTL ? 'rtl' : 'ltr'}>
      {/* Hero Banner */}
      <section className="relative bg-gradient-to-r from-awrad-blue to-awrad-lightblue py-16 md:py-24">
        <div className="absolute inset-0 bg-[url('https://images.unsplash.com/photo-1488590528505-98d2b5aba04b?ixlib=rb-1.2.1&auto=format&fit=crop&w=1350&q=80')] bg-cover bg-center opacity-10"></div>
        <div className="container mx-auto relative z-10">
          <div className="max-w-3xl mx-auto text-center">
            <h1 className="text-3xl md:text-4xl font-bold text-white mb-6">{t('partners_clients.title')}</h1>
            <p className="text-lg md:text-xl text-gray-100">
              {t('partners_clients.subtitle')}
            </p>
          </div>
        </div>
      </section>

      {/* Partners and Clients Grid */}
      <section className="section bg-gray-50">
        <div className="container mx-auto">
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6 items-center justify-center">
            {partnersClients.map((item, index) => (
              <Card key={index} className="flex items-center justify-center p-4 hover:shadow-lg transition-shadow">
                <a href={item.url} target="_blank" rel="noopener noreferrer">
                  <img src={item.logo} alt={item.name} className="max-h-20 object-contain" />
                </a>
              </Card>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
};

export default PartnersClients;
