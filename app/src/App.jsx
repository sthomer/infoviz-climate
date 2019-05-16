import React from 'react';
import '@atlaskit/css-reset';
import styled from 'styled-components';
import * as d3 from 'd3';
import Auxiliary from './auxiliary';
import Timelines from './timelines';
import Map from './imap';
import Menu from './menu';
import Slider from './slider';
import Timeline from './timeline';
import Doublebar from './doublebar';

import geography from './topojson/world-countries-sans-antarctica.json';

import temperature from './data/GlobalTempByCountryFrom1800-mean.json';
import forestpercent from './data/forest_coverage_percent.json';
import foresttotal from './data/forest_land_total_area_ha';
import co2pp from './data/co2_emissions_tonnes_per_person.json';
import co2total from './data/yearly_co2_emissions_1000_tonnes.json';
import sulfurpp from './data/sulfur_emissions_per_person_kg';

import ForestPerctLineChart from './forestPerctLineChart.jsx';
import CO2LineChart from './co2linechart.jsx';
import PeopleAffectedLineChart from './peopleAffectedLineChart.jsx';
import PeopleDeadLineChart from './peopleDeadLineChart.jsx';

import CO2BarChart from './co2_world_barChart.jsx'

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

const datasetNames = {
  temperature: 'Average Temperature',
  forestpercent: 'Forest Coverage (%)',
  foresttotal: 'Forest Coverage (total)',
  co2pp: 'CO2 Emission (per person)',
  co2total: 'CO2 Emission (total)',
  sulfurpp: 'Sulfur Emissions (per person)',
};

export default class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      region: undefined,
      hoverRegion: undefined,
      range: ["1970", "2000"],
      activePrimary: 'co2pp',
      dataPrimary: datasets['co2pp'],
      activeSecondary: 'co2total',
      dataSecondary: datasets['co2total'],
    }
  }

  onRegionSelect = region => this.setState(state => ({
    ...state,
    region: region,
  }));

  onRegionHover = region => this.setState(state => ({
    ...state,
    hoverRegion: region,
  }));

  onRangeSelect = (startDate, endDate) => {
    this.setState(state => ({
      ...state,
      range: [startDate, endDate],
    }));
  };

  onPrimarySelect = data => {
    const min = Math.min(
      Number(datasets[data].dates[0]),
      Number(this.state.dataSecondary.dates[0]));
    const max = Math.max(
      Number(datasets[data].dates[datasets[data].dates.length - 1]),
      Number(this.state.dataSecondary.dates[this.state.dataSecondary.dates.length - 1]));
    this.setState(state => ({
      ...state,
      range: [min, max],
      minMax: {min: min, max: max},
      activePrimary: data,
      dataPrimary: datasets[data],
    }));
  };

  onSecondarySelect = data => {
    const min = Math.min(
      Number(this.state.dataPrimary.dates[0]),
      Number(datasets[data].dates[0]));
    const max = Math.max(
      Number(this.state.dataPrimary.dates[this.state.dataPrimary.dates.length - 1]),
      Number(datasets[data].dates[datasets[data].dates.length - 1]));
    this.setState(state => ({
      ...state,
      range: [min, max],
      minMax: {min: min, max: max},
      activeSecondary: data,
      dataSecondary: datasets[data],
    }));
  };

  render() {
    return (<>
        <Grid>
          <AuxiliaryPane>
            <Doublebar
              range={this.state.range}
              namePrimary={datasetNames[this.state.activePrimary]}
              nameSecondary={datasetNames[this.state.activeSecondary]}
              primary={this.state.dataPrimary}
              secondary={this.state.dataSecondary}
              hover={this.onRegionHover}
              hoverRegion={this.state.hoverRegion}
            />
          </AuxiliaryPane>
          <MapPane>
            <Map
              geography={geography}
              region={this.state.region}
              hoverRegion={this.state.hoverRegion}
              range={this.state.range}
              active={this.state.activePrimary}
              data={this.state.dataPrimary}
              select={this.onRegionSelect}
              hover={this.onRegionHover}
            />
            <Floating position={'top'}>
              <Menu
                key={'primary'}
                select={this.onPrimarySelect}
                datasets={datasetNames}
                active={this.state.activePrimary}
                direction={'down'}
              />
            </Floating>
            <Floating position={'bottom'}>
              <Menu
                key={'secondary'}
                select={this.onSecondarySelect}
                datasets={datasetNames}
                active={this.state.activeSecondary}
                direction={'up'}
              />
            </Floating>
          </MapPane>
          <TimelinesPane>
            <Slider
              range={this.state.minMax}
              select={this.onRangeSelect}
            />
            <Timeline
              primary={this.state.dataPrimary}
              secondary={this.state.dataSecondary}
              region={this.state.region}
              range={this.state.range}
            />
          </TimelinesPane>
        </Grid>
      </>
    );
  }
}
