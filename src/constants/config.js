// Application configuration constants
export const CONFIG = {
  // ArcGIS API Configuration
  ROUTE_SERVICE_URL: "https://route-api.arcgis.com/arcgis/rest/services/World/Route/NAServer/Route_World",
  CALCITE_ASSETS_PATH: "https://cdn.jsdelivr.net/npm/@esri/calcite-components/dist/calcite/assets",
  
  // Map Configuration
  MAP_CONFIG: {
    basemap: "streets-navigation-vector",
    zoom: 12,
    center: "-118.43,34.22"
  },
  
  // Layer URLs
  LAYERS: {
    trailheads: "https://services3.arcgis.com/GVgbJbqm8hXASVYi/arcgis/rest/services/Trailheads/FeatureServer/0",
    trails: "https://services3.arcgis.com/GVgbJbqm8hXASVYi/arcgis/rest/services/Trails/FeatureServer/0",
    parks: "https://services3.arcgis.com/GVgbJbqm8hXASVYi/arcgis/rest/services/Parks_and_Open_Space/FeatureServer/0"
  },
  
  // Default marker location
  DEFAULT_MARKER: {
    longitude: -118.38,
    latitude: 33.34
  },
  
  // Styling constants
  SYMBOLS: {
    ROUTE_LINE: {
      color: [5, 150, 255],
      width: 3
    },
    ORIGIN_MARKER: {
      color: "white",
      size: "8px"
    },
    DESTINATION_MARKER: {
      color: "black", 
      size: "8px"
    },
    DEFAULT_MARKER: {
      type: "simple-marker",
      style: "triangle",
      size: 15,
      color: "red",
      outline: {
        color: "white",
        width: 2
      }
    }
  }
};

// API Key (In production, this should come from environment variables)
export const API_KEY = "AAPTxy8BH1VEsoebNVZXo8HurLn3M0o6rZcFRtCivb6l7ukvq1liE9WG0qWX1M7-j_dkBOZCtjg20S1yxm48ryHmGH2HQtDNR5LfAtNjWM_yxaxjy4EHaekNJ4Sabq2_4xPlUD-BuHsfgsPtXHo8tAXjydqNWd1zIcac9AxlvakO_9dMwQMZLxzmV1LpHY-lWAoGugYIefIAJ2JMcrI0m64gmqpTsCr3rj0OePORtPorGeE.AT1_a6NpXGel";
