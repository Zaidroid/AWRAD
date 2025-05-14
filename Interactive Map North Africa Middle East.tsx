import React, { useState } from 'react';

const InteractiveMap = () => {
  const [hoveredCountry, setHoveredCountry] = useState(null);
  const [selectedCountry, setSelectedCountry] = useState(null);
  
  // Country data with flag emoji and information
  const countryData = {
    'MOROCCO': {
      flag: '🇲🇦',
      info: 'Morocco is a North African country with a rich history, known for its diverse culture, ancient cities like Marrakech and Fez, and stunning landscapes from the Atlas Mountains to the Sahara Desert.'
    },
    'ALGERIA': {
      flag: '🇩🇿',
      info: 'Algeria is the largest country in Africa, with a diverse landscape that includes Mediterranean coastline, the Sahara Desert, and the Atlas Mountains. It has a rich history influenced by Berber, Arab, Ottoman, and French cultures.'
    },
    'TUNISIA': {
      flag: '🇹🇳',
      info: 'Tunisia is the northernmost country in Africa, known for its ancient ruins, beautiful Mediterranean beaches, and as the birthplace of the Arab Spring movements.'
    },
    'LIBYA': {
      flag: '🇱🇾',
      info: 'Libya is a North African country with the largest oil reserves in Africa. It has a rich ancient history including Phoenician, Greek, and Roman influences, and features both Mediterranean coastline and Sahara Desert landscapes.'
    },
    'EGYPT': {
      flag: '🇪🇬',
      info: 'Egypt is home to one of the world\'s oldest civilizations, famous for the Pyramids of Giza, the Sphinx, and the ancient temples of Luxor. The Nile River valley remains central to Egyptian life and culture.'
    },
    'SUDAN': {
      flag: '🇸🇩',
      info: 'Sudan is located in Northeast Africa, with the Nile River running through its heart. It has a diverse cultural heritage and is known for its ancient Nubian civilization and pyramids.'
    },
    'WESTERN SHARAH': {
      flag: '🇪🇭',
      info: 'Western Sahara is a disputed territory in Northwest Africa, largely controlled by Morocco. It features coastal areas along the Atlantic and desert landscape inland.'
    },
    'MAURITANIA': {
      flag: '🇲🇷',
      info: 'Mauritania is a country in Northwest Africa, largely covered by the Sahara Desert. It has significant mineral resources and a culture influenced by Arab-Berber and African traditions.'
    },
    'SYRIA': {
      flag: '🇸🇾',
      info: 'Syria is home to some of the world\'s oldest civilizations, with Damascus being one of the oldest continuously inhabited cities. It has diverse geography including mountains, plains, and desert regions.'
    },
    'LEBANON': {
      flag: '🇱🇧',
      info: 'Lebanon is a small country on the eastern Mediterranean with a rich history, diverse religious and cultural landscape, and renowned cuisine. It features beautiful coastal areas and mountain ranges.'
    },
    'PALESTINE': {
      flag: '🇵🇸',
      info: 'Palestine refers to territories in the Middle East including the West Bank and Gaza Strip. It is home to important religious sites sacred to Judaism, Christianity, and Islam.'
    },
    'JORDAN': {
      flag: '🇯🇴',
      info: 'Jordan is known for the ancient city of Petra, carved into rose-colored rock, as well as the Dead Sea and Wadi Rum desert. It has played a significant role as a crossroads of religion and trade throughout history.'
    },
    'IRAQ': {
      flag: '🇮🇶',
      info: 'Iraq is often called the "Cradle of Civilization," home to ancient Mesopotamia where writing, agriculture, and urban civilization began. The Tigris and Euphrates rivers form its heartland.'
    },
    'KUWAIT': {
      flag: '🇰🇼',
      info: 'Kuwait is a small, oil-rich country located at the head of the Persian Gulf. It has a constitutional monarchy system and one of the world\'s highest per capita incomes.'
    },
    'BAHRAIN': {
      flag: '🇧🇭',
      info: 'Bahrain is an island nation in the Persian Gulf known for its banking and financial services sector. It has a rich history as a trading center and is connected to Saudi Arabia by the King Fahd Causeway.'
    },
    'QATAR': {
      flag: '🇶🇦',
      info: 'Qatar is a peninsula country extending into the Persian Gulf, known for its modern skyline, wealth from natural gas reserves, and hosting the 2022 FIFA World Cup.'
    },
    'UNITED ARAB EMIRATES': {
      flag: '🇦🇪',
      info: 'The UAE is a federation of seven emirates known for ultramodern architecture, luxury shopping, and a skyline dominated by the Burj Khalifa in Dubai, the world\'s tallest building.'
    },
    'SAUDI ARABIA': {
      flag: '🇸🇦',
      info: 'Saudi Arabia occupies most of the Arabian Peninsula and is the birthplace of Islam, home to Mecca and Medina. It has the world\'s second-largest oil reserves and is largely desert.'
    },
    'OMAN': {
      flag: '🇴🇲',
      info: 'Oman is known for its diverse landscape of mountains, deserts, and pristine coastline. It has a rich maritime history and culture shaped by its position as a trading hub between East and West.'
    },
    'YEMEN': {
      flag: '🇾🇪',
      info: 'Yemen is located at the southern end of the Arabian Peninsula with a landscape that includes highlands, deserts, and coastal plains. It has a rich cultural heritage including distinctive architecture.'
    },
    'DJIBOUTI': {
      flag: '🇩🇯',
      info: 'Djibouti is a small country located at the Horn of Africa, strategically positioned at the entrance to the Red Sea. It features unique geological formations like Lake Assal, the lowest point in Africa.'
    },
    'SOMALIA': {
      flag: '🇸🇴',
      info: 'Somalia is located in the Horn of Africa with the longest coastline on Africa\'s mainland. It has a pastoral and nomadic cultural heritage and a history that stretches back to ancient times.'
    }
  };

  const handleCountryClick = (country) => {
    setSelectedCountry(country === selectedCountry ? null : country);
  };

  // SVG map paths for each country
  const countryPaths = {
    'MOROCCO': "M242,184 L182,235 L163,264 L172,284 L185,314 L212,339 L256,339 L281,339 L301,314 L322,284 L332,254 L332,224 L322,204 L301,184 L282,174 L261,174 L242,184 Z",
    'ALGERIA': "M322,204 L332,224 L332,254 L322,284 L301,314 L301,339 L332,339 L363,339 L393,339 L424,339 L454,339 L484,364 L544,374 L574,394 L604,394 L634,384 L664,354 L694,324 L694,294 L694,264 L664,234 L634,214 L604,194 L574,174 L544,164 L514,154 L484,154 L454,164 L424,174 L393,174 L363,184 L332,194 L322,204 Z",
    'TUNISIA': "M332,194 L363,184 L393,174 L424,174 L454,164 L484,154 L514,154 L544,164 L544,134 L534,114 L514,114 L484,124 L454,134 L424,144 L393,154 L363,164 L332,194 Z",
    'LIBYA': "M664,234 L694,264 L694,294 L694,324 L724,324 L754,324 L784,324 L814,324 L844,324 L854,304 L854,274 L854,244 L854,214 L854,184 L854,154 L844,124 L824,104 L794,104 L764,124 L734,144 L704,164 L674,184 L644,204 L634,214 L664,234 Z",
    'EGYPT': "M854,124 L844,154 L854,184 L854,214 L854,244 L854,274 L854,304 L874,304 L904,304 L934,284 L964,264 L994,244 L1024,224 L1024,194 L1024,164 L1024,134 L994,134 L964,144 L934,154 L904,134 L874,124 L854,124 Z",
    'SUDAN': "M844,324 L854,304 L874,304 L904,304 L934,284 L964,264 L994,244 L1024,224 L1054,234 L1084,254 L1114,284 L1144,314 L1144,344 L1144,374 L1114,404 L1084,434 L1054,464 L1024,494 L994,524 L964,554 L934,524 L904,494 L874,464 L844,434 L814,404 L784,374 L784,324 L814,324 L844,324 Z",
    'WESTERN SHARAH': "M182,235 L163,264 L172,284 L152,314 L132,344 L122,374 L122,404 L142,404 L162,404 L182,384 L202,364 L222,339 L242,339 L256,339 L212,339 L185,314 L172,284 L163,264 L182,235 Z",
    'MAURITANIA': "M122,404 L142,404 L162,404 L182,384 L202,364 L227,348 L252,339 L281,339 L301,339 L331,339 L331,364 L331,394 L321,424 L301,454 L271,474 L241,484 L211,474 L181,454 L151,434 L122,414 L122,404 Z",
    'SYRIA': "M964,144 L994,134 L1024,134 L1054,134 L1084,134 L1114,134 L1144,124 L1144,154 L1124,164 L1094,174 L1064,174 L1034,184 L1004,194 L974,194 L964,144 Z",
    'LEBANON': "M964,144 L974,194 L954,194 L954,174 L964,144 Z",
    'PALESTINE': "M954,194 L974,194 L1004,194 L994,214 L974,224 L954,214 L954,194 Z",
    'JORDAN': "M994,214 L1004,194 L1034,184 L1064,174 L1054,204 L1034,224 L1014,234 L994,214 Z",
    'IRAQ': "M1054,204 L1064,174 L1094,174 L1124,164 L1144,154 L1174,144 L1204,144 L1234,144 L1264,144 L1294,164 L1324,184 L1324,214 L1294,234 L1264,254 L1234,274 L1204,254 L1174,234 L1144,214 L1114,194 L1084,184 L1054,204 Z",
    'KUWAIT': "M1234,274 L1264,254 L1294,234 L1294,254 L1274,264 L1254,284 L1234,274 Z",
    'BAHRAIN': "M1294,254 L1304,264 L1294,274 L1274,264 L1294,254 Z",
    'QATAR': "M1304,264 L1324,274 L1324,294 L1304,304 L1294,284 L1294,274 L1304,264 Z",
    'UNITED ARAB EMIRATES': "M1324,294 L1344,304 L1364,314 L1384,304 L1404,284 L1424,274 L1444,264 L1444,284 L1424,304 L1404,324 L1384,344 L1364,354 L1344,334 L1324,314 L1324,294 Z",
    'SAUDI ARABIA': "M1084,184 L1114,194 L1144,214 L1174,234 L1204,254 L1234,274 L1254,284 L1274,264 L1294,254 L1294,274 L1294,284 L1304,304 L1324,294 L1324,314 L1344,334 L1364,354 L1364,384 L1344,414 L1324,444 L1304,474 L1274,474 L1244,474 L1214,474 L1184,454 L1154,434 L1124,414 L1094,394 L1064,374 L1044,344 L1024,314 L1024,284 L1024,254 L1024,224 L1024,194 L1034,224 L1054,204 L1084,184 Z",
    'OMAN': "M1384,344 L1404,324 L1424,304 L1444,284 L1444,304 L1444,334 L1444,364 L1444,394 L1444,424 L1414,444 L1384,464 L1354,484 L1324,464 L1324,444 L1344,414 L1364,384 L1364,354 L1384,344 Z",
    'YEMEN': "M1184,454 L1214,474 L1244,474 L1274,474 L1304,474 L1324,464 L1354,484 L1344,504 L1314,524 L1284,534 L1254,534 L1224,534 L1194,524 L1164,504 L1184,454 Z",
    'DJIBOUTI': "M1144,414 L1164,414 L1174,424 L1154,434 L1144,414 Z",
    'SOMALIA': "M1224,534 L1254,534 L1284,534 L1314,524 L1344,504 L1354,484 L1384,464 L1414,444 L1444,424 L1454,454 L1464,484 L1474,514 L1464,544 L1444,574 L1414,604 L1384,634 L1354,664 L1324,694 L1294,664 L1264,634 L1244,604 L1234,574 L1224,544 L1224,534 Z"
  };

  return (
    <div className="relative max-w-5xl mx-auto">
      <svg 
        viewBox="100 100 1400 700" 
        className="w-full border border-gray-300 bg-gray-50"
      >
        {/* Map paths */}
        {Object.entries(countryPaths).map(([country, path]) => (
          <path
            key={country}
            d={path}
            fill={selectedCountry === country ? "#4299e1" : hoveredCountry === country ? "#90cdf4" : "#e2e8f0"}
            stroke="#2d3748"
            strokeWidth="2"
            onMouseEnter={() => setHoveredCountry(country)}
            onMouseLeave={() => setHoveredCountry(null)}
            onClick={() => handleCountryClick(country)}
            className="transition-colors duration-200 cursor-pointer"
          />
        ))}
        
        {/* Country labels */}
        {Object.entries(countryPaths).map(([country]) => {
          // Calculate approximate center positions for labels
          // This is a simplified approach - a proper implementation would calculate centroids
          const path = document.createElementNS("http://www.w3.org/2000/svg", "path");
          path.setAttribute("d", countryPaths[country]);
          
          // These positions are manually adjusted - in a real implementation you would calculate bbox centers
          const positions = {
            'MOROCCO': [242, 264],
            'ALGERIA': [454, 264],
            'TUNISIA': [484, 134],
            'LIBYA': [754, 214],
            'EGYPT': [904, 194],
            'SUDAN': [964, 394],
            'WESTERN SHARAH': [182, 339],
            'MAURITANIA': [231, 424],
            'SYRIA': [1054, 144],
            'LEBANON': [954, 174],
            'PALESTINE': [974, 214],
            'JORDAN': [1034, 204],
            'IRAQ': [1174, 184],
            'KUWAIT': [1264, 264],
            'BAHRAIN': [1294, 264],
            'QATAR': [1304, 284],
            'UNITED ARAB EMIRATES': [1384, 304],
            'SAUDI ARABIA': [1174, 334],
            'OMAN': [1384, 394],
            'YEMEN': [1244, 504],
            'DJIBOUTI': [1154, 424],
            'SOMALIA': [1344, 564]
          };
          
          const [x, y] = positions[country];
          
          return (
            <text
              key={`label-${country}`}
              x={x}
              y={y}
              textAnchor="middle"
              fontSize={country.length > 10 ? "10" : "12"}
              fontWeight={selectedCountry === country ? "bold" : "normal"}
              fill="#1a202c"
              pointerEvents="none"
            >
              {country}
            </text>
          );
        })}
      </svg>
      
      {/* Information popup */}
      {selectedCountry && countryData[selectedCountry] && (
        <div className="absolute top-4 right-4 w-64 p-4 bg-white border border-gray-300 rounded-lg shadow-lg">
          <div className="flex items-center justify-between mb-2">
            <h3 className="text-lg font-bold">{selectedCountry}</h3>
            <span className="text-3xl">{countryData[selectedCountry].flag}</span>
          </div>
          <p className="text-sm">{countryData[selectedCountry].info}</p>
          <button 
            onClick={() => setSelectedCountry(null)}
            className="mt-3 px-2 py-1 bg-gray-200 text-gray-700 rounded text-sm hover:bg-gray-300"
          >
            Close
          </button>
        </div>
      )}
      
      {/* Hover indicator */}
      {hoveredCountry && !selectedCountry && (
        <div className="absolute top-4 left-4 px-3 py-2 bg-gray-800 text-white rounded-md">
          {hoveredCountry} {countryData[hoveredCountry]?.flag}
        </div>
      )}
      
      {/* Instructions */}
      <div className="mt-4 text-sm text-gray-600 text-center">
        <p>Hover over countries to see their names. Click on a country to view more information.</p>
      </div>
    </div>
  );
};

export default InteractiveMap;
