import React from 'react';
import '@atlaskit/css-reset';
import styled from 'styled-components';
import Map from './imap';
import Menu from './menu';
import Slider from './slider';
import Timeline from './timeline';
import Doublebar from './doublebar';
import Summary from './summary';


import temperature from './data/GlobalTempByCountryFrom1850-mean';
import forestpercent from './data/forest_coverage_percent';
import foresttotal from './data/forest_land_total_area_ha';
import co2pp from './data/co2_emissions_tonnes_per_personFrom1850';
import co2total from './data/yearly_co2_emissions_1000_tonnesFrom1850';
import sulfurpp from './data/sulfur_emissions_per_person_kg';
// import affectedtemp from './data/people_affected_extreme_temp';
// import deadtemp from './data/people_affected_extreme_temp';

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
  // affectedtemp: affectedtemp,
  // deadtemp: deadtemp,
};

const datasetNames = {
  temperature: 'Average Temperature',
  forestpercent: 'Forest Coverage (%)',
  foresttotal: 'Forest Coverage (total)',
  co2pp: 'CO2 Emission (per person)',
  co2total: 'CO2 Emission (total)',
  sulfurpp: 'Sulfur Emissions (per person)',
  // affectedtemp: 'People Affected by Extreme Temp',
  // deadtemp: 'People Killed by Extreme Temp',
};

const avgOverRange = (data, min, max) => {
  const avg = {};
  Object.keys(data).slice(1).map(region => {
    const values = data[region].slice(min, max);
    avg[region] = values.reduce((x, y) => Number(x) + Number(y)) / values.length;
  });
  return avg;
};


export default class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      region: 'Global',
      hoverRegion: 'Global',
      range: ["1970", "2000"],
      activePrimary: 'co2pp',
      dataPrimary: datasets['co2pp'],
      rangePrimary: [0, datasets['co2pp'].length],
      avgPrimary: avgOverRange(datasets['co2pp'], 0, datasets['co2pp'].length),
      activeSecondary: 'co2total',
      dataSecondary: datasets['co2total'],
      rangeSecondary: [0, datasets['co2total'].length],
      avgSecondary: avgOverRange(datasets['co2total'], 0, datasets['co2total'].length),
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
    const primaryRange = [
      this.state.dataPrimary.dates.findIndex(date => Number(date) === this.state.range[0]),
      this.state.dataPrimary.dates.findIndex(date => Number(date) === this.state.range[1]),
    ];
    primaryRange[0] = primaryRange[0] >= 0 ? primaryRange[0] : 0;
    primaryRange[1] = primaryRange[1] >= 0 ? primaryRange[1] : this.state.primary.dates.length;
    if (primaryRange[0] === primaryRange[1]) {
      primaryRange[0] = 0;
      primaryRange[1] = this.state.dataPrimary.dates.length;
    }

    const secondaryRange = [
      this.state.dataSecondary.dates.findIndex(date => Number(date) === this.state.range[0]),
      this.state.dataSecondary.dates.findIndex(date => Number(date) === this.state.range[1]),
    ];
    secondaryRange[0] = secondaryRange[0] >= 0 ? secondaryRange[0] : 0;
    secondaryRange[1] = secondaryRange[1] >= 0 ? secondaryRange[1] : this.state.dataSecondary.dates.length;
    if (secondaryRange[0] === secondaryRange[1]) {
      secondaryRange[0] = 0;
      secondaryRange[1] = this.state.dataSecondary.dates.length;
    }

    const avgPrimary = {};
    Object.keys(this.state.dataPrimary).slice(1).map(region => {
      const values = this.state.dataPrimary[region].slice(primaryRange[0], primaryRange[1]);
      avgPrimary[region] = values.reduce((x, y) => Number(x) + Number(y)) / values.length;
    });

    const avgSecondary = {};
    Object.keys(this.state.dataSecondary).slice(1).map(region => {
      const values = this.state.dataSecondary[region].slice(secondaryRange[0], secondaryRange[1]);
      avgSecondary[region] = values.reduce((x, y) => Number(x) + Number(y)) / values.length;
    });

    this.setState(state => ({
      ...state,
      range: [startDate, endDate],
      rangePrimary: primaryRange,
      rangeSecondary: secondaryRange,
      avgPrimary: avgPrimary,
      avgSecondary: avgSecondary,
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
      avgPrimary: avgOverRange(datasets[data]),
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
      avgSecondary: avgOverRange(datasets[data]),
    }));
  };

  render() {
    return (<>
        <Grid>
          <AuxiliaryPane>
            <Summary
              selected={this.state.region}
              hover={this.state.hoverRegion}
            />
            <Doublebar
              namePrimary={datasetNames[this.state.activePrimary]}
              rangePrimary={this.state.rangePrimary}
              avgPrimary={this.state.avgPrimary}
              nameSecondary={datasetNames[this.state.activeSecondary]}
              rangeSecondary={this.state.rangeSecondary}
              avgSecondary={this.state.avgSecondary}
              hover={this.onRegionHover}
              hoverRegion={this.state.hoverRegion}
              region={this.state.region}
            />
          </AuxiliaryPane>
          <MapPane>
            <Map
              region={this.state.region}
              hoverRegion={this.state.hoverRegion}
              active={this.state.activePrimary}
              avg={this.state.avgPrimary}
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
              namePrimary={datasetNames[this.state.activePrimary]}
              rangePrimary={this.state.rangePrimary}
              secondary={this.state.dataSecondary}
              nameSecondary={datasetNames[this.state.activeSecondary]}
              rangeSecondary={this.state.rangeSecondary}
              region={this.state.region === 'Global' ? this.state.hoverRegion : this.state.region}
              range={this.state.range}
            />
          </TimelinesPane>
        </Grid>
      </>
    );
  }
}
