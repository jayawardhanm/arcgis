import React, { useCallback, useRef } from 'react';
import PropTypes from 'prop-types';
import "@arcgis/map-components/dist/components/arcgis-map";
import "@arcgis/map-components/dist/components/arcgis-zoom";
import "@arcgis/map-components/dist/components/arcgis-placement";
import Graphic from "@arcgis/core/Graphic.js";
import FeatureLayer from '@arcgis/core/layers/FeatureLayer.js';
import { CONFIG } from '../constants/config';

/**
 * Map Component
 * Handles map initialization, layers, and user interactions
 */
const MapComponent = ({ 
  onMapClick, 
  onMapReady,
  children 
}) => {
  const mapViewRef = useRef(null);

  const handleViewReady = useCallback((event) => {
    const viewElement = event.target;
    mapViewRef.current = viewElement;
    
    try {
      // Add default marker
      const defaultPoint = {
        type: "point",
        longitude: CONFIG.DEFAULT_MARKER.longitude,
        latitude: CONFIG.DEFAULT_MARKER.latitude,
      };

      const defaultMarkerGraphic = new Graphic({
        geometry: defaultPoint,
        symbol: CONFIG.SYMBOLS.DEFAULT_MARKER,
        attributes: {
          type: 'default',
          isDefaultMarker: true
        }
      });

      // Create and add feature layers
      const trailheadsLayer = new FeatureLayer({
        url: CONFIG.LAYERS.trailheads,
        title: "Trailheads"
      });

      const trailsLayer = new FeatureLayer({
        url: CONFIG.LAYERS.trails,
        title: "Trails"
      });

      const parksLayer = new FeatureLayer({
        url: CONFIG.LAYERS.parks,
        title: "Parks and Open Space"
      });

      // Add layers to map (in reverse order for proper layering)
      viewElement.map.add(parksLayer, 0);
      viewElement.map.add(trailsLayer, 0);
      viewElement.map.add(trailheadsLayer);
      
      // Add default marker
      viewElement.graphics.add(defaultMarkerGraphic);
      
      // Setup map interaction when view is ready
      viewElement.view.when(() => {
        const mapView = viewElement.view;
        
        // Add click event listener
        viewElement.addEventListener("arcgisViewClick", (event) => {
          if (onMapClick && event.detail.mapPoint) {
            onMapClick(event.detail.mapPoint, mapView);
          }
        });

        // Notify parent component that map is ready
        if (onMapReady) {
          onMapReady(mapView, viewElement);
        }
      }).catch((error) => {
        console.error("Error setting up map view:", error);
      });

    } catch (error) {
      console.error("Error in map initialization:", error);
    }
  }, [onMapClick, onMapReady]);

  return (
    <div className="map-container">
      <arcgis-map 
        basemap={CONFIG.MAP_CONFIG.basemap}
        zoom={CONFIG.MAP_CONFIG.zoom}
        center={CONFIG.MAP_CONFIG.center}
        onarcgisViewReadyChange={handleViewReady}
        style={{ height: "100%", width: "100%" }}
      >
        <arcgis-zoom position="top-left" />
        {children}
      </arcgis-map>
    </div>
  );
};

MapComponent.propTypes = {
  onMapClick: PropTypes.func,
  onMapReady: PropTypes.func,
  children: PropTypes.node,
};

export default MapComponent;
