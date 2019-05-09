import React from 'react';
import '@atlaskit/css-reset';
import styled from 'styled-components';
import Auxiliary from './auxiliary';
import Timelines from './timelines';
import Map from './imap';
import Menu from './menu';

import geography from './topojson/world-countries-sans-antarctica.json';

import temperature from './data/GlobalTempByCountryFrom1800.json';
import forestpercent from './data/forest_coverage_percent.json';
import foresttotal from './data/forest_land_total_area_ha';
import co2pp from './data/co2_emissions_tonnes_per_person.json';
import co2total from './data/yearly_co2_emissions_1000_tonnes.json';
import sulfurpp from './data/sulfur_emissions_per_person_kg';

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

const datasets = {
  temperature: temperature,
  forestpercent: forestpercent,
  foresttotal: foresttotal,
  co2pp: co2pp,
  co2total: co2total,
  sulfurpp: sulfurpp,
};

const datasetList = [
  {id: 'temperature', content: 'Average Temperature'},
  {id: 'forestpercent', content: 'Forest Coverage (%)'},
  {id: 'foresttotal', content: 'Forest Coverage (total)'},
  {id: 'co2pp', content: 'CO2 Emission (per person)'},
  {id: 'co2total', content: 'CO2 Emission (total)'},
  {id: 'sulfurpp', content: 'Sulfur Emissions (per person)'},
];


export default class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      data: datasets['forestpercent'],
      range: [1970, 2000],
      active: 'forestpercent',
      region: '',
    }
  }

  onRegionSelect = region => this.setState(state => ({
    ...state,
    region: region,
  }));

  onDataSelect = data => this.setState(state => ({
    ...state,
    active: data,
    data: datasets[data],
  }));

  onYearSelect = year => this.setState(state => ({
    ...state,
    year: year,
  }));

  render() {
    return (<>
      <Grid>
        <AuxiliaryPane>
          <Auxiliary/>
        </AuxiliaryPane>
        <MapPane>
          <Map
            geography={geography}
            range={this.state.range}
            data={this.state.data}
            select={this.onRegionSelect}
            selected={this.state.region}
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
        <Menu
          select={this.onDataSelect}
          items={datasetList}
          active={this.state.active}
        />
      </Floating>
    </>);
  }
}
