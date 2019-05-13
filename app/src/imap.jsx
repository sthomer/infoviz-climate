import React, {Component} from "react";
import {
  ComposableMap,
  ZoomableGroup,
  Geographies,
  Geography,
} from "react-simple-maps";
import {Motion, spring} from 'react-motion';
import * as d3 from 'd3';
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

const colors = {
  temperature: ['#00008b', /*'#e5e5f3',*/ '#ffffff', /*'#f7e8e8',*/ '#b22222'],
  forestpercent: ['#ffffff', '#e8f3e8', '#228b22'],
  foresttotal: ['#ffffff', '#e8f3e8', '#228b22'],
  co2pp: ['#ffffff', '#f7e8e8', '#b22222'],
  co2total: ['#ffffff', '#f7e8e8', '#b22222'],
  sulfurpp: ['#ffffff', '#ffffe5', '#ffff00'],
};

class Map extends Component {
  constructor(props) {
    super(props);
    this.state = {
      center: [0, 0],
      zoom: 0.8,
      selected: {},
    };
  }

  color = (data, scale, geography) => {
    if (this.props.data === undefined) {
      return "#ECEFF1";
    } else {
      const value = data[geography.properties.name];
      if (value === undefined) {
        return "#ECEFF1";
      } else {
        return scale(value)
      }
    }
  };

  select = (geography, e) => {
    this.props.select(geography.properties.name);
    this.setState(state => ({
      ...state,
      center: center(geography.geometry.coordinates),
      zoom: 3,
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

    const range = [
      this.props.data.dates.indexOf(this.props.range[0]),
      this.props.data.dates.indexOf(this.props.range[1])
      ];
    range[0] = range[0] >= 0 ? range[0] : 0;
    range[1] = range[1] >= 0 ? range[1] : this.props.data.dates.length;
    // TODO: Set range state of App?

    const data = {};
    Object.keys(this.props.data).slice(1).map(region => {
      const values = this.props.data[region].slice(range[0], range[1]);
      data[region] = values.reduce((x, y) => Number(x) + Number(y)) / values.length
    });

    const values = Object.values(data).sort((x, y) => x - y);
    const min = Math.min(...values.slice(values.length * 0.05));
    const max = Math.max(...values.slice(0, values.length * 0.95));
    const scale = d3.scaleSymlog()
      .domain([min, (max - min) / 2, max])
      .range(colors[this.props.active])
      .clamp(true);

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
                          fill: this.color(data, scale, geography),
                          stroke: "#607D8B",
                          strokeWidth: 0.75,
                          outline: "none",
                        },
                        hover: {
                          fill: this.color(data, scale, geography),
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
