import React, {Component} from "react";
import {
  ComposableMap,
  ZoomableGroup,
  Geographies,
  Geography,
} from "react-simple-maps";
import {Motion, spring} from 'react-motion';
import * as topojson from 'topojson';
import allcountries from './topojson/world-countries-sans-antarctica.json';

const mapStyle = {
  default: {
    fill: "#ECEFF1",
    stroke: "#607D8B",
    strokeWidth: 0.75,
    outline: "none",
  },
  hover: {
    fill: "#607D8B",
    stroke: "#607D8B",
    strokeWidth: 0.75,
    outline: "none",
  },
  pressed: {
    fill: "#FF5722",
    stroke: "#607D8B",
    strokeWidth: 0.75,
    outline: "none",
  },
};

const geographyPaths = topojson.feature(
  allcountries, allcountries.objects.countries1).features

class Map extends Component {
  constructor(props) {
    super(props);
    this.state = {
      center: [0, 20],
      zoom: 1,
      selected: {},
    };
  }

  select = (geography, e) => {
    this.setState(state => ({
      ...state,
      selected: geography,
    }));
  };

  zoom = (e) => {
    // clientX, clientY have pointer coordinates of client
    const deltaY = e.deltaY;
    this.setState(state => ({
      ...state,
      zoom: Math.max(this.state.zoom * (deltaY < 0 ? 1.1 : 0.9), 1)
    }));
  };

  render() {
    return (
      <div onWheel={this.zoom}>
        <Motion
          defaultStyle={{
            zoom: this.state.zoom,
            x: this.state.center[0],
            y: this.state.center[1],
          }}
          style={{
            zoom: spring(this.state.zoom, {stiffness: 210, damping: 20}),
            x: spring(this.state.center[0], {stiffness: 210, damping: 20}),
            y: spring(this.state.center[1], {stiffness: 210, damping: 20}),
          }}
        >
          {({zoom, x, y}) => (
            <ComposableMap
              projectionConfig={{scale: 205}}
              width={980}
              height={560}
              style={{width: "100%", height: "100%"}}
            >
              <ZoomableGroup center={[x, y]} zoom={zoom}
                             style={{width: "100%", height: "100%"}}>
                <Geographies geography={geographyPaths}>
                  {(geographies, projection) => geographies.map((geography, i) => (
                    <Geography
                      key={i}
                      geography={geography}
                      projection={projection}
                      onClick={this.select}
                      style={mapStyle}
                    />
                  ))}
                </Geographies>
              </ZoomableGroup>
            </ComposableMap>
          )}
        </Motion>
      </div>
    )
  }
}

export default Map
