import { useState, useCallback } from 'react';
import Graphic from "@arcgis/core/Graphic.js";
import SimpleMarkerSymbol from "@arcgis/core/symbols/SimpleMarkerSymbol.js";
import { CONFIG } from '../constants/config';

/**
 * Custom hook for managing map graphics (markers)
 */
export const useMapGraphics = () => {
  const [routeGraphics, setRouteGraphics] = useState([]);
  const [isRouteActive, setIsRouteActive] = useState(false);

  const addGraphic = useCallback((type, point, mapView) => {
    if (!mapView || !point) return;

    const symbolConfig = type === "origin" 
      ? CONFIG.SYMBOLS.ORIGIN_MARKER 
      : CONFIG.SYMBOLS.DESTINATION_MARKER;

    const graphic = new Graphic({
      symbol: new SimpleMarkerSymbol(symbolConfig),
      geometry: point,
      attributes: {
        type: type,
        isRouteMarker: true
      }
    });

    mapView.graphics.add(graphic);
    setRouteGraphics(prev => [...prev, { type, graphic, point }]);
  }, []);

  const clearGraphics = useCallback((mapView) => {
    if (mapView) {
      // Remove only route-related graphics, keep the default marker
      const graphicsToRemove = mapView.graphics.items.filter(graphic => 
        graphic.attributes && 
        (graphic.attributes.isRouteMarker || graphic.attributes.isRoute)
      );
      
      graphicsToRemove.forEach(graphic => {
        mapView.graphics.remove(graphic);
      });
      
      setRouteGraphics([]);
      setIsRouteActive(false);
    }
  }, []);

  const getRouteMarkerCount = useCallback(() => {
    return routeGraphics.filter(g => g.type === 'origin' || g.type === 'destination').length;
  }, [routeGraphics]);

  const removeLastGraphic = useCallback((mapView) => {
    if (mapView && routeGraphics.length > 0) {
      const lastGraphic = routeGraphics[routeGraphics.length - 1];
      mapView.graphics.remove(lastGraphic.graphic);
      setRouteGraphics(prev => prev.slice(0, -1));
    }
  }, [routeGraphics]);

  return {
    routeGraphics,
    isRouteActive,
    setIsRouteActive,
    addGraphic,
    clearGraphics,
    getRouteMarkerCount,
    removeLastGraphic
  };
};
