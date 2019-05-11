import React from 'react';
import '@atlaskit/css-reset';
import styled from 'styled-components';
import * as d3 from 'd3';
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

import ForestPerctLineChart from './forestPerctLineChart.jsx';
import CO2LineChart from './co2linechart.jsx';
import PeopleAffectedLineChart from './peopleAffectedLineChart.jsx';
import PeopleDeadLineChart from './peopleDeadLineChart.jsx';

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
  overflow-y: scroll;
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

const colors = {
  temperature:['#00008b', /*'#e5e5f3',*/ '#ffffff', /*'#f7e8e8',*/ '#b22222'],
  forestpercent: ['#ffffff', '#e8f3e8', '#228b22'],
  foresttotal: ['#ffffff', '#e8f3e8', '#228b22'],
  co2pp: ['#ffffff', '#f7e8e8', '#b22222'],
  co2total: ['#ffffff', '#f7e8e8', '#b22222'],
  sulfurpp: ['#ffffff', '#ffffe5', '#ffff00'],
};

const scale = (data, active) => {
  const values = Object.values(data).slice(1).flat().sort();
  const min = Math.min(...values.slice(values.length*0.25));
  const max = Math.max(...values.slice(0, values.length*0.75));
  const domain = [min, (max - min) / 2, max];
  const scale = d3.scaleSymlog()
    .domain(domain)
    .range(colors[active]);
  debugger;
  return scale;
};

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

  updateDate = (startDate, endDate) => {
    let range = [startDate, endDate];
    this.setState(state => ({
      ...state,
      range: range,
    }));
  };

  render() {
    return (<>
      <Grid>
        <AuxiliaryPane >
          <Auxiliary region={this.state.region}/>
          <ForestPerctLineChart region={this.state.region}/>
          <CO2LineChart region={this.state.region}/>
          <PeopleAffectedLineChart region={this.state.region}/>
          <PeopleDeadLineChart region={this.state.region}/>
        </AuxiliaryPane>
        <MapPane>
          <Map
            geography={geography}
            range={this.state.range}
            data={this.state.data}
            scale={scale(this.state.data, this.state.active)}
            select={this.onRegionSelect}
            selected={this.state.region}   
          />
        </MapPane>
        <TimelinesPane>
          <Timelines
            range={this.state.range}
            select={this.onRangeSelect}
            updateDate = {this.updateDate}
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
