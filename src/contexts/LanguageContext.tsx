
import React, { createContext, useState, useContext, ReactNode } from 'react';
import { IntlMessageFormat } from 'intl-messageformat';

type Language = 'en' | 'ar';

interface LanguageContextType {
  language: Language;
  setLanguage: (lang: Language) => void;
  t: (key: string, values?: Record<string, string | number | boolean | Date | null | undefined>) => string;
  isRTL: boolean;
}

const translations = {
  en: {
    'home': 'Home',
    'about': 'About',
    'research': 'Research',
    'publications': 'Publications',
    'team': 'Team',
    'contact': 'Contact',
    'hero.title': 'Quality Research Matters',
    'hero.subtitle': 'AWRAD is a leading research and consulting firm providing high-quality independent research and policy solutions for Palestine and the Arab region.',
    'hero.cta1': 'Explore Research',
    'hero.cta2': 'View Publications',
    'hero.learn_more': 'Learn More',
    'trending.title': 'Trending',
    'mission.title': 'Leading Research for the Arab Region',
    'mission.subtitle': 'AWRAD is dedicated to producing high-quality, independent research that informs policy and contributes to sustainable development and state-building in Palestine and the Arab region.',
    'mission.cta': 'Learn About Our Mission',
    'research.title': 'Our Research Focus',
    'research.subtitle': 'Discover our core research areas where we provide data-driven insights and policy recommendations for the region\'s most pressing challenges.',
    'research.cta': 'View All Research',
    'publications.title': 'Featured Publications',
    'publications.subtitle': 'Explore our recent reports, policy briefs, and research papers addressing key issues in Palestine and the Arab region.',
    'publications.cta': 'Browse All Publications',
    'partner.title': 'Partner With Us',
    'partner.subtitle': 'Looking to collaborate on research projects or seeking data-driven insights for your organization? We offer consultation services and welcome partnerships to address regional challenges.',
    'partner.cta': 'Get in Touch',
    'impact.title': 'Our Impact',
    'impact.subtitle': 'For over 15 years, AWRAD has been conducting research that informs policy decisions and contributes to sustainable development in the Arab region.',
    'impact.publications': 'Research Publications',
    'impact.researchers': 'Expert Researchers',
    'impact.polls': 'Opinion Polls Conducted',
    'impact.countries': 'Countries Covered',
    'research.public-opinion': 'Public Opinion',
    'research.public-opinion.desc': 'Surveys and polls analyzing public perspectives on social, economic, and political issues across Palestine and the MENA region.',
    'research.economic-development': 'Economic Development',
    'research.economic-development.desc': 'Research on sustainable economic growth, labor markets, and development strategies tailored to regional challenges.',
    'research.gender-studies': 'Gender Studies',
    'research.gender-studies.desc': 'Examining gender equality, women\'s empowerment, and the role of gender in development across the Arab world.',
    'research.health': 'Health Studies',
    'research.health.desc': 'Analysis of healthcare systems, public health challenges, and the impact of crises like COVID-19 on regional health.',
    'research.social-development': 'Social Development',
    'research.social-development.desc': 'Research on education, youth empowerment, social inclusion, and community resilience in challenging contexts.',
    'learn-more': 'Learn more',
    'loading': 'Loading...',
    'error.loading_data': 'Error loading data:',
    'hero.no_featured_publication': 'No featured publication available at the moment.',
    'trending.no_publications': 'No trending publications available.',
    'hero.subtitle_default': 'AWRAD is a leading research and consulting firm providing high-quality independent research and policy solutions for Palestine and the Arab region.',
    'hero.subtitle_featured_report_2': 'Key findings on displacement patterns, living conditions, and the effectiveness of humanitarian aid in the aftermath of recent events.',
    'research_category': 'Research', // Generic category translation
    'publications_page.title': 'Publications & Resources', // Renamed key
    'publications_page.subtitle': 'Access our comprehensive collection of research reports, policy briefs, and publications addressing key challenges and opportunities in Palestine and the Arab region.', // Renamed key
    'publications.search_placeholder': 'Search publications...',
    'publications.filter.all': 'All',
    'publications.filter.technology': 'Technology',
    'publications.filter.environment': 'Environment',
    'publications.filter.social_sciences': 'Social Sciences',
    'publications.filter.energy': 'Energy',
    'publications.filter.economics': 'Economics',
    'publications.filter.public_health': 'Public Health',
    'publications.showing_results': 'Showing {count} {count, plural, =1 {publication} other {publications}}',
    'publications.no_results_title': 'No Publications Found',
    'publications.no_results_subtitle': 'No publications match your current search criteria. Try adjusting your filters or search terms.',
    'publications.clear_filters_button': 'Reset Filters',
    "publication": "Publication",
    "poll": "Poll",
    "publication_detail.download_pdf": "Download PDF",
    "error.back_to_publications": "Back to Publications",
    "poll_detail.download_pdf": "Download PDF",
    "error.back_to_polls": "Back to Polls",
    "error.loading_data_details": "Error loading {item} details",
    "error.publication_not_found_message": "The publication you are looking for could not be found.",
    "error.poll_not_found_message": "The poll you are looking for could not be found.",
    "error.invalid_slug": "Invalid item identifier provided.",
    "error.not_found_title": "Not Found",
    "error.unknown_error_occurred": "An unknown error occurred",
    "error.loading_data_list": "Error loading {list_type}",
    "polls.title": "Public Opinion Polls",
    "polls.subtitle": "Access our comprehensive collection of public opinion surveys and polls.",
    "polls.search_placeholder": "Search polls...",
    "polls.filter.all_years": "All Years",
    "polls.showing_results": "Showing {count} {count, plural, =1 {poll} other {polls}}",
    "polls.download_report_button": "Download Report",
    "polls.read_more_button": "Read More",
    "polls.no_results_title": "No Polls Found",
    "polls.no_results_subtitle": "No polls match your current search criteria. Try adjusting your filters or search terms.",
    "polls.clear_filters_button": "Reset Filters",
    "pagination.previous": "Previous",
    "pagination.next": "Next",
    "activities.title": "Activities",
    "activities.subtitle": "Explore our recent activities and events.",
    "activities.search_placeholder": "Search activities...",
    "activities.showing_results": "Showing {count} {count, plural, =1 {activity} other {activities}}",
    "activities.read_more": "Read More",
    "activities.no_results_title": "No Activities Found",
    "activities.no_results_subtitle": "No activities match your current search criteria. Try adjusting your search terms.",
    "activities.clear_search_button": "Clear Search",
    "partners_clients.title": "Partners & Clients",
    "partners_clients.subtitle": "Organizations we have collaborated with.",
  },
  ar: {
    'home': 'الرئيسية',
    'about': 'من نحن',
    'research': 'الأبحاث',
    'publications': 'المنشورات',
    'team': 'فريقنا',
    'contact': 'اتصل بنا',
    'hero.title': 'الأبحاث الجيدة تهم',
    'hero.subtitle': 'أوراد هي شركة رائدة في مجال الأبحاث والاستشارات توفر بحوثًا مستقلة عالية الجودة وحلول سياسات لفلسطين والمنطقة العربية.',
    'hero.cta1': 'استكشاف الأبحاث',
    'hero.cta2': 'عرض المنشورات',
    'hero.learn_more': 'اقرأ المزيد',
    'trending.title': 'الأكثر رواجاً',
    'mission.title': 'أبحاث رائدة للمنطقة العربية',
    'mission.subtitle': 'أوراد مكرسة لإنتاج بحوث مستقلة عالية الجودة تساهم في صنع السياسات والتنمية المستدامة وبناء الدولة في فلسطين والمنطقة العربية.',
    'mission.cta': 'تعرف على مهمتنا',
    'research.title': 'مجالات بحثنا',
    'research.subtitle': 'اكتشف مجالات البحث الأساسية لدينا حيث نقدم رؤى مبنية على البيانات وتوصيات سياسية لأكثر تحديات المنطقة إلحاحًا.',
    'research.cta': 'عرض جميع الأبحاث',
    'publications.title': 'المنشورات المميزة',
    'publications.subtitle': 'استكشف أحدث تقاريرنا وموجزات السياسات والأوراق البحثية التي تتناول القضايا الرئيسية في فلسطين والمنطقة العربية.',
    'publications.cta': 'تصفح جميع المنشورات',
    'partner.title': 'شاركنا',
    'partner.subtitle': 'هل تتطلع إلى التعاون في المشاريع البحثية أو تسعى للحصول على رؤى قائمة على البيانات لمؤسستك؟ نقدم خدمات استشارية ونرحب بالشراكات لمعالجة تحديات المنطقة.',
    'partner.cta': 'تواصل معنا',
    'impact.title': 'أثرنا',
    'impact.subtitle': 'لأكثر من 15 عامًا، تقوم أوراد بإجراء أبحاث تساهم في صنع القرارات السياسية وتساهم في التنمية المستدامة في المنطقة العربية.',
    'impact.publications': 'منشور بحثي',
    'impact.researchers': 'باحث خبير',
    'impact.polls': 'استطلاع رأي أُجري',
    'impact.countries': 'دولة تمت تغطيتها',
    'research.public-opinion': 'الرأي العام',
    'research.public-opinion.desc': 'استطلاعات وسبر آراء تحلل وجهات نظر الجمهور بشأن القضايا الاجتماعية والاقتصادية والسياسية في فلسطين ومنطقة الشرق الأوسط وشمال إفريقيا.',
    'research.economic-development': 'التنمية الاقتصادية',
    'research.economic-development.desc': 'أبحاث حول النمو الاقتصادي المستدام، وأسواق العمل، واستراتيجيات التنمية المصممة خصيصًا للتحديات الإقليمية.',
    'research.gender-studies': 'دراسات المرأة',
    'research.gender-studies.desc': 'دراسة المساواة بين الجنسين، وتمكين المرأة، ودور النوع الاجتماعي في التنمية في جميع أنحاء العالم العربي.',
    'research.health': 'دراسات الصحة',
    'research.health.desc': 'تحليل النظم الصحية، وتحديات الصحة العامة، وتأثير الأزمات مثل كوفيد-19 على الصحة الإقليمية.',
    'research.social-development': 'التنمية الاجتماعية',
    'research.social-development.desc': 'أبحاث حول التعليم، وتمكين الشباب، والشمول الاجتماعي، ومرونة المجتمع في السياقات الصعبة.',
    'learn-more': 'اقرأ المزيد',
    'loading': 'جار التحميل...',
    'error.loading_data': 'خطأ في تحميل البيانات:',
    'hero.no_featured_publication': 'لا يوجد منشور مميز متاح في الوقت الحالي.',
    'trending.no_publications': 'لا توجد منشورات رائجة متاحة.',
    'hero.subtitle_default': 'أوراد هي شركة رائدة في مجال الأبحاث والاستشارات توفر بحوثًا مستقلة عالية الجودة وحلول سياسات لفلسطين والمنطقة العربية.',
    'hero.subtitle_featured_report_2': 'نتائج رئيسية حول أنماط النزوح، الظروف المعيشية، وتقييم فعالية المساعدات الإنسانية في أعقاب الأحداث الأخيرة.',
    'research_category': 'بحث', // Generic category translation
    'publications_page.title': 'المنشورات والمصادر', // Renamed key
    'publications_page.subtitle': 'اطلع على مجموعتنا الشاملة من التقارير البحثية وموجزات السياسات والمنشورات التي تتناول التحديات والفرص الرئيسية في فلسطين والمنطقة العربية.', // Renamed key
    'publications.search_placeholder': 'ابحث في المنشورات...',
    'publications.filter.all': 'الكل',
    'publications.filter.technology': 'التكنولوجيا',
    'publications.filter.environment': 'البيئة',
    'publications.filter.social_sciences': 'العلوم الاجتماعية',
    'publications.filter.energy': 'الطاقة',
    'publications.filter.economics': 'الاقتصاد',
    'publications.filter.public_health': 'الصحة العامة',
    'publications.showing_results': 'عرض {count} {count, plural, =0 {منشورات} =1 {منشور} =2 {منشوران} few {منشورات} many {منشورات} other {منشورات}}',
    'publications.no_results_title': 'لم يتم العثور على منشورات',
    'publications.no_results_subtitle': 'لا توجد منشورات تطابق معايير البحث الحالية. حاول تعديل الفلاتر أو مصطلحات البحث.',
    'publications.clear_filters_button': 'إعادة تعيين الفلاتر',
    "publication": "منشور",
    "poll": "استطلاع",
    "publication_detail.download_pdf": "تحميل PDF",
    "error.back_to_publications": "العودة إلى المنشورات",
    "poll_detail.download_pdf": "تحميل PDF",
    "error.back_to_polls": "العودة إلى الاستطلاعات",
    "error.loading_data_details": "خطأ في تحميل تفاصيل {item}",
    "error.publication_not_found_message": "لم يتم العثور على المنشور الذي تبحث عنه.",
    "error.poll_not_found_message": "لم يتم العثور على الاستطلاع الذي تبحث عنه.",
    "error.invalid_slug": "معرف العنصر المقدم غير صالح.",
    "error.not_found_title": "غير موجود",
    "error.unknown_error_occurred": "حدث خطأ غير معروف",
    "error.loading_data_list": "خطأ في تحميل {list_type}",
    "polls.title": "استطلاعات الرأي العام",
    "polls.subtitle": "اطلع على مجموعتنا الشاملة من استطلاعات الرأي العام والمسوحات.",
    "polls.search_placeholder": "ابحث في الاستطلاعات...",
    "polls.filter.all_years": "كل السنوات",
    "polls.showing_results": "عرض {count} {count, plural, =0 {استطلاعات} =1 {استطلاع} =2 {استطلاعان} few {استطلاعات} many {استطلاعات} other {استطلاعات}}",
    "polls.download_report_button": "تحميل التقرير",
    "polls.read_more_button": "اقرأ المزيد",
    "polls.no_results_title": "لم يتم العثور على استطلاعات",
    "polls.no_results_subtitle": "لا توجد استطلاعات تطابق معايير البحث الحالية. حاول تعديل الفلاتر أو مصطلحات البحث.",
    "polls.clear_filters_button": "إعادة تعيين الفلاتر",
    "pagination.previous": "السابق",
    "pagination.next": "التالي",
    "partners_clients.title": "الشركاء والعملاء",
    "partners_clients.subtitle": "المنظمات التي تعاونا معها."
  }
};

const LanguageContext = createContext<LanguageContextType>({
  language: 'en',
  setLanguage: () => {},
  t: (key: string, values?: Record<string, string | number | boolean | Date | null | undefined>) => key, // Updated default t function
  isRTL: false
});

export const useLanguage = () => useContext(LanguageContext);

interface LanguageProviderProps {
  children: ReactNode;
}

export const LanguageProvider: React.FC<LanguageProviderProps> = ({ children }) => {
  const [language, setLanguage] = useState<Language>('en');
  
  const t = (key: string, values?: Record<string, string | number | boolean | Date | null | undefined>): string => {
    const message = translations[language][key as keyof typeof translations[typeof language]] || key;
    if (values && typeof message === 'string' && message.includes('{')) {
      try {
        const msgFormat = new IntlMessageFormat(message, language);
        return msgFormat.format(values) as string;
      } catch (error) {
        console.error(`Error formatting message for key "${key}":`, error);
        // Fallback to simple replacement or raw message if IntlMessageFormat fails
        let formattedMessage = message;
        for (const valueKey in values) {
          formattedMessage = formattedMessage.replace(new RegExp(`\\{${valueKey}\\}`, 'g'), String(values[valueKey]));
        }
        return formattedMessage;
      }
    }
    return message;
  };
  
  const isRTL = language === 'ar';
  
  // Set document direction based on language
  React.useEffect(() => {
    document.documentElement.dir = isRTL ? 'rtl' : 'ltr';
    document.documentElement.lang = language;
    
    // Add specific font for Arabic text
    const fontFamily = isRTL ? 
      "'Open Sans', 'Droid Arabic Kufi', sans-serif" : 
      "'Open Sans', sans-serif";
    
    document.documentElement.style.fontFamily = fontFamily;
  }, [language, isRTL]);
  
  return (
    <LanguageContext.Provider value={{ language, setLanguage, t, isRTL }}>
      {children}
    </LanguageContext.Provider>
  );
};
