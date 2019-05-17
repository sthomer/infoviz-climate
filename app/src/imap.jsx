import React, {Component} from 'react';
import styled from 'styled-components';
import {Button} from 'react-bootstrap';
import {
  ComposableMap,
  ZoomableGroup,
  Geographies,
  Geography,
  Markers,
  Marker,
} from "react-simple-maps";
import {Motion, spring} from 'react-motion';
import * as d3 from 'd3';
import * as topojson from 'topojson';
import '../node_modules/react-vis/dist/style.css';
import {
  ContinuousColorLegend,
} from 'react-vis';

import allcountries from './topojson/world-countries-sans-antarctica.json';

const Container = styled.div`
  position: relative;
`;

const ZoomOut = styled.div`
  position: absolute;
  top: 8px;
  left: 8px;
`;

const Legend = styled.div`
  position: absolute;
  transform: rotate(-0.25turn);
  top: 300px;
  left: -125px;
`;

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
  const geoCenter = [(max0 - min0) / 2 + min0, (max1 - min1) / 2 + min1 - 10];
  return geoCenter;
};

const colors = {
  temperature: ['#00008b', /*'#e5e5f3',*/ '#ffffff', /*'#f7e8e8',*/ '#b22222'],
  forestpercent: ['#ffffff', '#e8f3e8', '#228b22'],
  foresttotal: ['#ffffff', '#e8f3e8', '#228b22'],
  co2pp: ['#ffffff', '#f7e8e8', '#b22222'],
  co2total: ['#ffffff', '#f7e8e8', '#b22222'],
  sulfurpp: ['#ffffff', '#ffffe5', '#ffff00'],
  // affectedtemp: ['white', 'lightgrey', 'darkgrey'],
  // deadtemp: ['white', 'lightgrey', 'darkgrey'],
};

class Map extends Component {
  constructor(props) {
    super(props);
    this.state = {
      center: [0, 0],
      zoom: 0.8,
      hover: true,
    };

    this.geographyPaths = topojson.feature(
      this.props.geography, this.props.geography.objects.countries1).features;

    this.centers = {};
    geographyPaths.map(geography =>
      this.centers[geography.properties.name] = center(geography.geometry.coordinates));
  }

  color = (scale, geography) => {
    if (this.props.avg === undefined) {
      return "#ECEFF1";
    } else if (this.props.hoverRegion === geography.properties.name
      || this.props.region === geography.properties.name) {
      return "#FF5722";
    } else {
      const value = this.props.avg[geography.properties.name];
      if (value === undefined) {
        return "#ECEFF1";
      } else {
        return scale(value)
      }
    }
  };

  select = (geography, e) => {
    if (this.state.hover) {
      this.setState(state => ({
        ...state,
        center: this.centers[geography.properties.name],
        zoom: 2,
        hover: false,
      }));
      this.props.select(geography.properties.name);
    } else if (this.props.region === geography.properties.name) {
      this.setState(state => ({
        ...state,
        hover: true,
      }));
      this.props.select('World')
    } else {
      this.setState(state => ({
        ...state,
        center: this.centers[geography.properties.name],
        zoom: 2,
        hover: false,
      }));
      this.props.select(geography.properties.name);
      this.props.hover(geography.properties.name);
    }
  };

  zoom = e => {
    // clientX, clientY have pointer coordinates of client
    const deltaY = e.deltaY;
    this.setState(state => ({
      ...state,
      zoom: Math.max(this.state.zoom * (deltaY < 0 ? 1.1 : 0.9), 0.8)
    }));
  };

  zoomOut = () => {
    this.setState(state => ({
      center: [0, 0],
      zoom: 0.8,
      hover: true,
    }));
    this.props.select('Global');
    this.props.hover('Global');
  };

  render() {
    const values = Object.values(this.props.avg).sort((x, y) => x - y);
    const min = Math.min(...values.slice(values.length * 0.05));
    const max = Math.max(...values.slice(0, values.length * 0.95));
    const mid = (max - min) / 2;
    const scale = d3.scaleSymlog()
      .domain([min, mid, max])
      .range(colors[this.props.active])
      .clamp(true);

    return (
      <Container onWheel={this.zoom}>
        <ZoomOut>
          <Button variant={'light'} onClick={this.zoomOut}>{'\u2014'}</Button>
        </ZoomOut>
        <Legend>
          <ContinuousColorLegend
            endColor={colors[this.props.active][2]}
            endTitle={max.toFixed(2)}
            midColor={colors[this.props.active][1]}
            midTitle={mid.toFixed(2)}
            startColor={colors[this.props.active][0]}
            startTitle={min.toFixed(2)}
            width={300}
          />
        </Legend>
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
                  geography={this.geographyPaths}
                  disableOptimization={true}
                >
                  {(geographies, projection) => geographies.map((geography, i) => (
                    <Geography
                      key={i}
                      geography={geography}
                      projection={projection}
                      onClick={this.select}
                      onMouseEnter={() => this.state.hover &&
                        this.props.hover(geography.properties.name)}
                      style={{
                        default: {
                          fill: this.color(scale, geography),
                          stroke: "#607D8B",
                          strokeWidth: 0.75,
                          outline: "none",
                        },
                        hover: {
                          fill: this.color(scale, geography),
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
                {/*<Markers>*/}
                {/*  {this.geographyPaths.map(geography =>*/}
                {/*    <Marker*/}
                {/*      key={geography.properties.name}*/}
                {/*      marker={{coordinates: this.centers[geography.properties.name]}}*/}
                {/*    >*/}
                {/*      <text*/}
                {/*        style={{*/}
                {/*          opacity: this.props.region === geography.properties.region ? 1 : 0,*/}
                {/*          pointerEvents: 'none',*/}
                {/*        }}*/}
                {/*      >*/}
                {/*        {geography.properties.name}*/}
                {/*      </text>*/}
                {/*    </Marker>*/}
                {/*  )}*/}
                {/*</Markers>*/}
              </ZoomableGroup>
            </ComposableMap>
          )}
        </Motion>
      </Container>
    )
  }
}

export default Map
