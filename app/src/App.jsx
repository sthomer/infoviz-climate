import React from 'react';
import '@atlaskit/css-reset';
import styled from 'styled-components';
import Auxiliary from './auxiliary';
import Timelines from './timelines';
import Map from './imap';

import geography from './topojson/world-countries-sans-antarctica.json';

import temperature from './data/GlobalTempByCountryFrom1800.json';
import co2pp from './data/co2_emissions_tonnes_per_person.json'

const Grid = styled.div`
  display: grid;
  overflow: hidden;
  width: 100vw;
  height: 100vh;
  justify-content: center;
  align-content: center;
  grid-template-rows: 60vh 40vh;
  grid-template-columns: 25vw 75vw;
  grid-template-areas: 
    "auxiliary map"
    "auxiliary timeline"; 
  grid-gap: 2px;
`;

const AuxiliaryPane = styled.div`
  grid-area: auxiliary;
  border: 1px solid lightgrey;
`;

const MapPane = styled.div`
  grid-area: map;
  border: 1px solid lightgrey;
  overflow: hidden;
`;

const TimelinesPane = styled.div`
  grid-area: timeline;
  border: 1px solid lightgrey;
`;

const Floating = styled.div`
  position: fixed;
  z-index: 100;
  top: 8px;
  right: 8px;
`;


export default class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      range: [1970, 2000],
      current: 'temperature',
    }
  }

  onRegionSelect = region => this.setState(state => ({
    ...state,
    region: region,
  }));

  onDataLoad = data => this.setState(state => ({
    ...state,
    data: data,
  }));

  onYearSelect = year => this.setState(state => ({
    ...state,
    year: year,
  }));

  render() {
    return (<>
      <Grid>
        <AuxiliaryPane>
          <Auxiliary />
        </AuxiliaryPane>
        <MapPane>
          <Map
            geography={geography}
            range={this.state.range}
            data={{temperature: temperature}}
            select={this.onRegionSelect}
          />
        </MapPane>
        <TimelinesPane>
          <Timelines
            range={this.state.range}
            select={this.onRangeSelect}
          />
        </TimelinesPane>
      </Grid>
      <Floating>
        Button
      </Floating>
    </>);
  }
}
