import React from 'react';
import * as d3 from 'd3';
import { world } from './world'

export default class Map extends React.Component {

  render() {
    const width = 960 //default
    const height = 500 //default
    const projection = d3.geoMercator()
      .scale(width / 2 / Math.PI)
      .translate([width/2, height/2])
    const map = d3.geoPath().projection(projection);
    return (
      <svg width={width} height={height}>
        <path 
          d={map(world)}
          stroke="black"
          fill="none"
        />
      </svg>
    )
  }
}