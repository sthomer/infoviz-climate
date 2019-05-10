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

const geographyPaths = topojson.feature(
  allcountries, allcountries.objects.countries1).features;


const center = (coordinates) => {
  const central = coordinates.length === 1
    ? coordinates[0]
    : coordinates.reduce((x, y) => x[0].length > y[0].length ? x : y)[0];
  const min0 = central.map(x => x[0]).reduce((x, y) => Math.min(x, y));
  const max0 = central.map(x => x[0]).reduce((x, y) => Math.max(x, y));
  const min1 = central.map(x => x[1]).reduce((x, y) => Math.min(x, y));
  const max1 = central.map(x => x[1]).reduce((x, y) => Math.max(x, y));
  const geoCenter = [(max0 - min0) / 2 + min0, (max1 - min1) / 2 + min1];
  return geoCenter;
};

const mean = ns => ns === undefined ? undefined
  : ns.reduce((x, y) => Number(x) + Number(y)) / ns.length;

class Map extends Component {
  constructor(props) {
    super(props);
    this.state = {
      center: [0, 0],
      zoom: 0.8,
      selected: {},
    };
  }

  color = (geography, scale) => {
    if (this.props.data === undefined) {
      return "#ECEFF1";
    } else if (this.props.selected === geography.properties.name) {
      return "#FF5722";
    } else {
      // const dates = this.props.data.temperature.dates.map(s => Number(s.split('-')[0]));
      // const rangeIndex = [dates.indexOf(this.props.range[0]), dates.indexOf(this.props.range[1])];
      // const temps = this.props.data.temperature[geography.properties.name];
      // const rangeTemps = temps === undefined ? undefined : temps.slice(rangeIndex[0], rangeIndex[1]);
      // return tempScale(mean(rangeTemps));
      const data = this.props.data[geography.properties.name];
      if (data === undefined) {
        return "orange"; //"#ECEFF1";
      } else {
        return this.props.scale(data[data.length - 1])
      }
    }
  };

  select = (geography, e) => {
    this.props.select(geography.properties.name);
    this.setState(state => ({
      ...state,
      center: center(geography.geometry.coordinates),
      zoom: 4,
    }));
  };

  zoom = (e) => {
    // clientX, clientY have pointer coordinates of client
    const deltaY = e.deltaY;
    this.setState(state => ({
      ...state,
      zoom: Math.max(this.state.zoom * (deltaY < 0 ? 1.1 : 0.9), 0.8)
    }));
  };

  render() {
    const geographyPaths = topojson.feature(
      this.props.geography, this.props.geography.objects.countries1).features;

    return (
      <div onWheel={this.zoom}>
        <Motion
          defaultStyle={{
            zoom: this.state.zoom,
            x: this.state.center[0],
            y: this.state.center[1],
          }}
          style={{
            zoom: spring(this.state.zoom, {stiffness: 200, damping: 20}),
            x: spring(this.state.center[0], {stiffness: 200, damping: 20}),
            y: spring(this.state.center[1], {stiffness: 200, damping: 20}),
          }}
        >
          {({zoom, x, y}) => (
            <ComposableMap
              projectionConfig={{scale: 200}}
              style={{width: "100%", height: "auto"}}
            >
              <ZoomableGroup center={this.state.center} zoom={this.state.zoom}
                             style={{width: "100%", height: "100%"}}>
                <Geographies
                  geography={geographyPaths}
                  disableOptimization={true}
                >
                  {(geographies, projection) => geographies.map((geography, i) => (
                    <Geography
                      key={i}
                      geography={geography}
                      projection={projection}
                      onClick={this.select}
                      style={{
                        default: {
                          fill: this.color(geography),
                          stroke: "#607D8B",
                          strokeWidth: 0.75,
                          outline: "none",
                        },
                        hover: {
                          fill: this.color(geography),
                          stroke: "#607D8B",
                          strokeWidth: 0.75,
                          outline: "none",
                          opacity: 0.9,
                        },
                        pressed: {
                          fill: "#FF5722",
                          stroke: "#607D8B",
                          strokeWidth: 0.75,
                          outline: "none",
                        },
                      }}
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
