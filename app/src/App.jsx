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
import TempLineChart from './tempLineChart.jsx';

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
`;

const MapPane = styled.div`
  grid-area: map;
  overflow: hidden;
  position: relative;
`;

const TimelinesPane = styled.div`
  grid-area: timeline;
`;

const Floating = styled.div`
  position: absolute;
  z-index: 100;
  ${props => props.position}: 0px;
  right: 0px;
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
  temperature: ['#00008b', /*'#e5e5f3',*/ '#ffffff', /*'#f7e8e8',*/ '#b22222'],
  forestpercent: ['#ffffff', '#e8f3e8', '#228b22'],
  foresttotal: ['#ffffff', '#e8f3e8', '#228b22'],
  co2pp: ['#ffffff', '#f7e8e8', '#b22222'],
  co2total: ['#ffffff', '#f7e8e8', '#b22222'],
  sulfurpp: ['#ffffff', '#ffffe5', '#ffff00'],
};

const scale = (data, active) => {
  const values = Object.values(data).slice(1).flat().sort();
  const min = Math.min(...values.slice(values.length * 0.25));
  const max = Math.max(...values.slice(0, values.length * 0.75));
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
      region: undefined,
      range: [1970, 2000],
      activePrimary: 'forestpercent',
      dataPrimary: datasets['forestpercent'],
      activeSecondary: 'foresttotal',
      dataSecondary: datasets['foresttotal'],
    }
  }

  onRegionSelect = region => this.setState(state => ({
    ...state,
    region: region,
  }));

  onRangeSelect = (startDate, endDate) => {
    this.setState(state => ({
      ...state,
      range: [startDate, endDate],
    }));
  };

  onPrimarySelect = data => this.setState(state => ({
    ...state,
    activePrimary: data,
    dataPrimary: datasets[data],
  }));

  onSecondarySelect = data => this.setState(state => ({
    ...state,
    activeSecondary: data,
    dataSecondary: datasets[data],
  }));

  render() {
    return (<>
      <Grid>
        <AuxiliaryPane>
          <Auxiliary
            region={this.state.region}
            range={this.state.range}
            primary={this.state.dataPrimary}
            secondary={this.state.dataSecondary}
          />
        </AuxiliaryPane>
        <MapPane>
          <Map
            geography={geography}
            region={this.state.region}
            range={this.state.range}
            data={this.state.dataPrimary}
            scale={scale(this.state.dataPrimary, this.state.activePrimary)}
            select={this.onRegionSelect}
          />
          <Floating position={'top'}>
            <Menu
              key={'primary'}
              select={this.onPrimarySelect}
              items={datasetList}
              active={this.state.activePrimary}
              direction={'down'}
            />
          </Floating>
          <Floating position={'bottom'}>
            <Menu
              key={'secondary'}
              select={this.onSecondarySelect}
              items={datasetList}
              active={this.state.activeSecondary}
              direction={'up'}
            />
          </Floating>
        </MapPane>
        <TimelinesPane>
          <Timelines
            primary={this.state.dataPrimary}
            secondary={this.state.dataSecondary}
            range={this.state.range}
            updateDate={this.onRangeSelect}
            region={this.state.region}
          />
        </TimelinesPane>
      </Grid>
    </>
  );
  }
  }
