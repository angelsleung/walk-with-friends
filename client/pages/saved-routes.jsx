import React from 'react';

export default class SavedRoutes extends React.Component {
  render() {
    return (
        <div className="page">
          <h1 className="page-title">Saved Routes</h1>
          <div className="route-list">
            <div className="route-list-item">
              <div className="route-item-locations">
                <div className="route-item-icon-location">
                  <i className="walk-icon fas fa-walking"></i>
                  <div className="route-item-start-location">1 Martin Rd</div>
                </div>
                <div className="route-item-icon-location stop-location">
                  <i className="marker-icon fas fa-map-marker-alt"></i>
                  <div className="route-item-stop-location">8 Off Grand Dr</div>
                </div>
                <div className="route-item-icon-location stop-location">
                  <i className="marker-icon fas fa-map-marker-alt"></i>
                  <div className="route-item-stop-location">5 Robinson Dr</div>
                </div>
              </div>
              <div className="route-item-totals">
                <div className="route-item-distance">0.7 mi</div>
                <div className="route-item-duration">15 min</div>
              </div>
            </div>
            <div className="route-list-item">
              <div className="route-item-locations">
                <div className="route-item-icon-location">
                  <i className="walk-icon fas fa-walking"></i>
                  <div className="route-item-start-location">1 Martin Rd</div>
                </div>
                <div className="route-item-icon-location stop-location">
                  <i className="marker-icon fas fa-map-marker-alt"></i>
                  <div className="route-item-stop-location">8 Off Grand Dr</div>
                </div>
                <div className="route-item-icon-location stop-location">
                  <i className="marker-icon fas fa-map-marker-alt"></i>
                  <div className="route-item-stop-location">5 Robinson Dr</div>
                </div>
              </div>
              <div className="route-item-totals">
                <div className="route-item-distance">0.7 mi</div>
                <div className="route-item-duration">15 min</div>
              </div>
            </div>
          </div>
        </div>
    );
  }
}
