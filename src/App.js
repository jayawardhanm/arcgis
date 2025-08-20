import React, { useState, useEffect, useCallback } from 'react';
import { setAssetPath } from "@esri/calcite-components/dist/components";
import "@arcgis/map-components/dist/components/arcgis-placement";

// Components
import MapComponent from './components/MapComponent';
import DirectionsPanel from './components/DirectionsPanel';
import ErrorBoundary from './components/ErrorBoundary';

// Hooks
import { useMapGraphics } from './hooks/useMapGraphics';
import { useRouting } from './hooks/useRouting';

// Constants
import { CONFIG } from './constants/config';

// Styles
import './App.css';

// Set the asset path for Calcite components
setAssetPath(CONFIG.CALCITE_ASSETS_PATH);

/**
 * Main Application Component
 * GIS Route Planning Application with ArcGIS Maps SDK
 */
function App() {
  // State management
  const [mapView, setMapView] = useState(null);
  const [isMapReady, setIsMapReady] = useState(false);
  
  // Custom hooks
  const {
    routeGraphics,
    isRouteActive,
    setIsRouteActive,
    addGraphic,
    clearGraphics,
    getRouteMarkerCount
  } = useMapGraphics();
  
  const {
    isCalculating,
    routeError,
    directions,
    calculateRoute,
    clearRoute
  } = useRouting();

  // Handle map click events
  const handleMapClick = useCallback((mapPoint, mapViewInstance) => {
    if (!mapViewInstance || !mapPoint) return;

    // Use the same logic as your original - count route markers directly from the map
    const routeMarkers = mapViewInstance.graphics.items.filter(graphic => 
      graphic.attributes && graphic.attributes.isRouteMarker
    );

    console.log('Current route markers on map:', routeMarkers.length);

    if (routeMarkers.length === 0) {
      // First click - add origin point
      addGraphic("origin", mapPoint, mapViewInstance);
    } else if (routeMarkers.length === 1) {
      // Second click - add destination and calculate route
      addGraphic("destination", mapPoint, mapViewInstance);
      setIsRouteActive(true);
      calculateRoute(mapViewInstance);
    } else {
      // Third click - reset and start over (like your original)
      clearGraphics(mapViewInstance);
      clearRoute();
      addGraphic("origin", mapPoint, mapViewInstance);
    }
  }, [addGraphic, calculateRoute, clearGraphics, clearRoute, setIsRouteActive]);

  // Handle map ready event
  const handleMapReady = useCallback((mapViewInstance, mapElement) => {
    setMapView(mapViewInstance);
    setIsMapReady(true);
  }, []);

  // Handle clear route action
  const handleClearRoute = useCallback(() => {
    if (mapView) {
      clearGraphics(mapView);
      clearRoute();
    }
  }, [mapView, clearGraphics, clearRoute]);

  // Handle errors
  const handleError = useCallback((error, errorInfo) => {
    console.error('Application Error:', error, errorInfo);
    // Here you could send error to monitoring service
  }, []);

  // Effect for keyboard shortcuts
  useEffect(() => {
    const handleKeyPress = (event) => {
      if (event.key === 'Escape' && mapView) {
        handleClearRoute();
      }
    };

    document.addEventListener('keydown', handleKeyPress);
    return () => document.removeEventListener('keydown', handleKeyPress);
  }, [mapView, handleClearRoute]);

  return (
    <ErrorBoundary onError={handleError}>
      <div className="app">
        <header className="app-header">
          <h1 className="app-title">GIS Route Planner</h1>
          <div className="app-status">
            {!isMapReady && <span className="status-loading">Loading map...</span>}
            {isMapReady && !isRouteActive && (
              <span className="status-ready">Click on map to start routing</span>
            )}
            {isCalculating && <span className="status-calculating">Calculating route...</span>}
          </div>
        </header>

        <main className="app-main">
          <MapComponent 
            onMapClick={handleMapClick}
            onMapReady={handleMapReady}
          >
            <arcgis-placement position="top-right">
              <DirectionsPanel
                directions={directions}
                isCalculating={isCalculating}
                routeError={routeError}
                onClearRoute={handleClearRoute}
                showInstructions={directions.length > 0}
              />
            </arcgis-placement>
          </MapComponent>
        </main>

        {/* Accessibility info */}
        <div className="sr-only" aria-live="polite">
          {isCalculating && "Calculating route, please wait"}
          {routeError && `Route error: ${routeError}`}
          {directions.length > 0 && `Route calculated with ${directions.length} steps`}
        </div>
      </div>
    </ErrorBoundary>
  );
}

export default App;
