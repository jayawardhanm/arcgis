import React from 'react';
import './App.css';
import ReactDOM from 'react-dom';
import "@arcgis/map-components/dist/components/arcgis-map";
import "@arcgis/map-components/dist/components/arcgis-zoom";
import "@arcgis/map-components/dist/components/arcgis-placement";
import "@esri/calcite-components/dist/components/calcite-panel";
import "@esri/calcite-components/dist/components/calcite-notice";
import { setAssetPath } from "@esri/calcite-components/dist/components";
import Graphic from "@arcgis/core/Graphic.js";
import FeatureLayer from '@arcgis/core/layers/FeatureLayer.js';
import * as route from "@arcgis/core/rest/route.js";
import RouteParameters from "@arcgis/core/rest/support/RouteParameters.js";
import FeatureSet from "@arcgis/core/rest/support/FeatureSet.js";
import SimpleLineSymbol from "@arcgis/core/symbols/SimpleLineSymbol.js";
import SimpleMarkerSymbol from "@arcgis/core/symbols/SimpleMarkerSymbol.js";

// Set the asset path for Calcite components
setAssetPath("https://cdn.jsdelivr.net/npm/@esri/calcite-components/dist/calcite/assets");

function App() {
  const routeUrl =
        "https://route-api.arcgis.com/arcgis/rest/services/World/Route/NAServer/Route_World";

  
  async function getRoute(mapView){
    const routeParams = new RouteParameters({
      stops: new FeatureSet({
        features:mapView.graphics.toArray(),
    }),
      returnDirections: true,
  });

    try{
      const response = await route.solve(routeUrl, routeParams);
      response.routeResults.forEach((results)=>{
        results.route.symbol = new SimpleLineSymbol({
          color : [5, 150, 255],
          width : 3,
        });
        mapView.graphics.add(results.route);
      });
          if (response.routeResults.length > 0) {
            const directions = document.createElement("calcite-list");

            const features = response.routeResults[0].directions.features;
            features.forEach((feature, index) => {
              const direction = document.createElement("calcite-list-item");

              const step = document.createElement("span");
              step.innerText = `${index + 1}.`;
              step.slot = "content-start";
              step.style.marginLeft = "10px";
              direction.appendChild(step);

              direction.label = `${feature.attributes.text}`;
              direction.description = `${feature.attributes.length.toFixed(2)} miles`;
              directions.appendChild(direction);
            });

            document.querySelector("#directions-container").appendChild(directions);
          }
    } catch(error){
      console.error("Error getting route:", error);
    }
  }

  function addGraphic(type, point, mapView) {
            const graphic = new Graphic({
          symbol: new SimpleMarkerSymbol({
            color: type === "origin" ? "white" : "black",
            size: "8px",
          }),
          geometry: point,
        });
    mapView.graphics.add(graphic);
  }
  const handleViewReady = (event) => {
    const viewElement = event.target;
    
    var esriConfig = {
    apiKey: "AAPTxy8BH1VEsoebNVZXo8HurLn3M0o6rZcFRtCivb6l7ukvq1liE9WG0qWX1M7-j_dkBOZCtjg20S1yxm48ryHmGH2HQtDNR5LfAtNjWM_yxaxjy4EHaekNJ4Sabq2_4xPlUD-BuHsfgsPtXHo8tAXjydqNWd1zIcac9AxlvakO_9dMwQMZLxzmV1LpHY-lWAoGugYIefIAJ2JMcrI0m64gmqpTsCr3rj0OePORtPorGeE.AT1_a6NpXGel",
  };
    const point = {
      type: "point",
      longitude: -118.38,
      latitude: 33.34,
    };

    const markerSymbol = {
      type: "simple-marker",
      style: "triangle",
      size: 15,
      color: "red",
      outline: {
        color: "white",
        width: 2,
      },
    };

    const pointGraphic = new Graphic({
      geometry: point,
      symbol: markerSymbol,
    });

    const trailheadsLayer = new FeatureLayer({
      url:"https://services3.arcgis.com/GVgbJbqm8hXASVYi/arcgis/rest/services/Trailheads/FeatureServer/0"
    });

    const trailsLayer = new FeatureLayer({
          url: "https://services3.arcgis.com/GVgbJbqm8hXASVYi/arcgis/rest/services/Trails/FeatureServer/0",
        });

     const parksLayer = new FeatureLayer({
          url: "https://services3.arcgis.com/GVgbJbqm8hXASVYi/arcgis/rest/services/Parks_and_Open_Space/FeatureServer/0",
        });

    // Add the trailheads layer to the map
    viewElement.map.add(trailheadsLayer);
    viewElement.map.add(trailsLayer,0);
    viewElement.map.add(parksLayer,0);

    viewElement.graphics.add(pointGraphic);
    
    // Wait for the view to be ready before setting up click handler
    viewElement.view.when(() => {
      const mapView = viewElement.view;
      
      viewElement.addEventListener("arcgisViewClick", (event) => {
        const directionsNotice = document.querySelector("#direction-notice");
        if (viewElement.view.graphics.length === 0) {
          addGraphic("origin", event.detail.mapPoint, mapView);
        } else if (viewElement.view.graphics.length === 1) {
          directionsNotice.open = false;
          addGraphic("destination", event.detail.mapPoint, mapView);
          getRoute(mapView);
        } else {
          viewElement.view.graphics.removeAll();
          directionsNotice.open = true;
          document.querySelector("#directions-container").innerHTML = "";
          addGraphic("origin", event.detail.mapPoint, mapView);
        }
      });
    }).catch((error) => {
      console.error("Error setting up map view:", error);
    });
  };

  return (
    <div className="App">
      <arcgis-map 
        basemap="streets-navigation-vector" 
        zoom="12" 
        center="-118.43,34.22"
        onarcgisViewReadyChange={handleViewReady}
        style={{ height: "100vh" }}
      >
        <arcgis-zoom position="top-left" />
        <arcgis-placement position ="top-right">
          <calcite-panel heading="Directions">
            <calcite-notice id="direction-notice" icon="driving-distance">
              <div slot="message">Click on the map in two different locations to solve the route.</div>
            </calcite-notice>
            <div id="directions-container"></div>
          </calcite-panel>
        </arcgis-placement>
      </arcgis-map>
    </div>
  );
}

export default App;
