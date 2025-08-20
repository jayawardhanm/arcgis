import { useState, useCallback } from 'react';
import * as route from "@arcgis/core/rest/route.js";
import RouteParameters from "@arcgis/core/rest/support/RouteParameters.js";
import FeatureSet from "@arcgis/core/rest/support/FeatureSet.js";
import SimpleLineSymbol from "@arcgis/core/symbols/SimpleLineSymbol.js";
import { CONFIG } from '../constants/config';

/**
 * Custom hook for handling routing functionality
 */
export const useRouting = () => {
  const [isCalculating, setIsCalculating] = useState(false);
  const [routeError, setRouteError] = useState(null);
  const [directions, setDirections] = useState([]);

  const calculateRoute = useCallback(async (mapView) => {
    if (!mapView) {
      setRouteError('Map view not available');
      return;
    }

    // Get only route markers (origin/destination)
    const routeMarkers = mapView.graphics.items.filter(graphic => 
      graphic.attributes && graphic.attributes.isRouteMarker
    );

    if (routeMarkers.length < 2) {
      setRouteError('Need at least 2 points to calculate route');
      return;
    }

    setIsCalculating(true);
    setRouteError(null);

    try {
      const routeParams = new RouteParameters({
        stops: new FeatureSet({
          features: routeMarkers,
        }),
        returnDirections: true,
      });

      const response = await route.solve(CONFIG.ROUTE_SERVICE_URL, routeParams);
      
      if (response.routeResults && response.routeResults.length > 0) {
        // Add route line to map
        response.routeResults.forEach((result) => {
          result.route.symbol = new SimpleLineSymbol(CONFIG.SYMBOLS.ROUTE_LINE);
          // Mark this as a route graphic
          result.route.attributes = { isRoute: true };
          mapView.graphics.add(result.route);
        });

        // Extract directions
        const features = response.routeResults[0].directions.features;
        const directionsData = features.map((feature, index) => ({
          id: index,
          step: index + 1,
          instruction: feature.attributes.text,
          distance: feature.attributes.length.toFixed(2)
        }));

        setDirections(directionsData);
        return directionsData;
      }
    } catch (error) {
      console.error("Error calculating route:", error);
      setRouteError(error.message || 'Failed to calculate route');
    } finally {
      setIsCalculating(false);
    }
  }, []);

  const clearRoute = useCallback(() => {
    setDirections([]);
    setRouteError(null);
    setIsCalculating(false);
  }, []);

  return {
    isCalculating,
    routeError,
    directions,
    calculateRoute,
    clearRoute
  };
};
