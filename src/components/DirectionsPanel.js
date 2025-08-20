import React from 'react';
import PropTypes from 'prop-types';
import '@esri/calcite-components/dist/components/calcite-panel';
import '@esri/calcite-components/dist/components/calcite-notice';
import '@esri/calcite-components/dist/components/calcite-list';
import '@esri/calcite-components/dist/components/calcite-list-item';
import '@esri/calcite-components/dist/components/calcite-button';
import '@esri/calcite-components/dist/components/calcite-loader';

/**
 * Directions Panel Component
 * Displays routing instructions and controls
 */
const DirectionsPanel = ({ 
  directions = [], 
  isCalculating = false, 
  routeError = null, 
  onClearRoute,
  showInstructions = false 
}) => {
  return (
    <calcite-panel heading="Route Directions" style={{ width: '350px', maxHeight: '70vh' }}>
      {/* Instructions Notice */}
      {!showInstructions && (
        <calcite-notice 
          id="direction-notice" 
          icon="driving-distance"
          kind="info"
          open="true"
        >
          <div slot="message">
            Click on the map to set start point, then click again to set destination and calculate route.
          </div>
        </calcite-notice>
      )}

      {/* Loading State */}
      {isCalculating && (
        <div style={{ padding: '20px', textAlign: 'center' }}>
          <calcite-loader active></calcite-loader>
          <p style={{ marginTop: '10px', color: '#6B6B6B' }}>Calculating route...</p>
        </div>
      )}

      {/* Error State */}
      {routeError && (
        <calcite-notice kind="danger" open="true">
          <div slot="message">{routeError}</div>
        </calcite-notice>
      )}

      {/* Directions List */}
      {directions.length > 0 && !isCalculating && (
        <div style={{ padding: '10px' }}>
          <div style={{ 
            display: 'flex', 
            justifyContent: 'space-between', 
            alignItems: 'center', 
            marginBottom: '10px',
            padding: '0 10px'
          }}>
            <h4 style={{ margin: 0, color: '#2c3e50' }}>
              Route Instructions ({directions.length} steps)
            </h4>
            {onClearRoute && (
              <calcite-button 
                size="s" 
                kind="neutral" 
                onClick={onClearRoute}
                icon-start="trash"
              >
                Clear
              </calcite-button>
            )}
          </div>
          
          <calcite-list style={{ maxHeight: '50vh', overflow: 'auto' }}>
            {directions.map((direction) => (
              <calcite-list-item
                key={direction.id}
                label={direction.instruction}
                description={`${direction.distance} miles`}
              >
                <span 
                  slot="content-start" 
                  style={{ 
                    backgroundColor: '#007ac3',
                    color: 'white',
                    borderRadius: '50%',
                    width: '24px',
                    height: '24px',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    fontSize: '12px',
                    fontWeight: 'bold'
                  }}
                >
                  {direction.step}
                </span>
              </calcite-list-item>
            ))}
          </calcite-list>
        </div>
      )}
    </calcite-panel>
  );
};

DirectionsPanel.propTypes = {
  directions: PropTypes.arrayOf(
    PropTypes.shape({
      id: PropTypes.number.isRequired,
      step: PropTypes.number.isRequired,
      instruction: PropTypes.string.isRequired,
      distance: PropTypes.string.isRequired,
    })
  ),
  isCalculating: PropTypes.bool,
  routeError: PropTypes.string,
  onClearRoute: PropTypes.func,
  showInstructions: PropTypes.bool,
};

export default DirectionsPanel;
