import React, { useState } from 'react';
import { ComposableMap, Geographies, Geography } from 'react-simple-maps';

interface RegionalMapProps {
  onCountryClick: (country: string) => void;
}

const geoUrl = "https://cdn.jsdelivr.net/npm/topojson-client@3/dist/world-110m.json";

const RegionalMap: React.FC<RegionalMapProps> = ({ onCountryClick }) => {
  const [hoveredCountry, setHoveredCountry] = useState<string | null>(null);

  return (
    <ComposableMap
      projection="geoMercator"
      width={800}
      height={500}
      style={{ width: "100%", height: "auto" }}
    >
      <Geographies geography={geoUrl}>
        {({ geographies }) =>
          geographies.map((geo) => (
            <Geography
              key={geo.rsmKey}
              geography={geo}
              onMouseEnter={() => {
                setHoveredCountry(geo.properties.name);
              }}
              onMouseLeave={() => {
                setHoveredCountry(null);
              }}
              onClick={() => {
                onCountryClick(geo.properties.name.toLowerCase()); // Use country name as identifier
              }}
              style={{
                default: {
                  fill: hoveredCountry === geo.properties.name ? "#a0a0a0" : "#D6D6DA",
                  outline: "none"
                },
                hover: {
                  fill: "#a0a0a0",
                  outline: "none"
                },
                pressed: {
                  fill: "#a0a0a0",
                  outline: "none"
                }
              }}
            />
          ))
        }
      </Geographies>
    </ComposableMap>
  );
};

export default RegionalMap;
