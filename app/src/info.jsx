import React from 'react';
import { Title, Heading } from './styles';

export default class Info extends React.Component {
  render() {
    return (
      <>
        <Title>Questions</Title>
        <Heading>Track 1: Effects of Humanity on Climate Change</Heading>
        <ul>
          <li>
            Which human activities have the most impact on climate change?
          </li>
          <li>
            What countries/regions contribute most to these activities?
          </li>
          <li>
            How are those places trying to mitigate their impact?
          </li>
          <li>
            Are we screwed?
          </li>
        </ul>
        <Heading>Track 2: Effects of Climate Change on Humanity</Heading>
        <ul>
          <li>
            What consequences of climate change have the most impact on humanity?
          </li>
          <li>
            What regions/habitats are most affected?
          </li>
          <li>
            Are weather anomalies more frequent? Where? What are their effects?
          </li>
          <li>
            Are we screwed?
          </li>
        </ul>
        <Title>Propositions</Title>
        <Heading>Track 1: Effects of Humanity on Climate Change</Heading>
        <ul>
          <li>
            CO2/other particulates effect on atmosphere
          </li>
          <li>
            Carbon/Other Emissions according to specific industries e.g. oil, deforestation, farming
          </li>
          <li>
            Countries/regions where these practices are most prevalent/egregious
          </li>
          <li>
            Mitigation steps by governments/organizations
          </li>
          <li>
            Climate projections according to different mitigation scenarios
          </li>
        </ul>
        <Heading>Track 2: Effects of Climate Change on Humanity</Heading>
        <ul>
          <li>
            Sea level rise, droughts, flooding, storm frequency
          </li>
          <li>
            Countries/regions most affected by climate change effects/anomalies
          </li>
          <li>
            Coral degradation, desertification, habitat loss
          </li>
          <li>
            Hurricane/typhoon frequency/severity, flooding/drought severity
          </li>
          <li>
            Climate projections and their consequencies on regions/habitats
          </li>
        </ul>
        <Title>Datasets</Title>
        <Heading>Current:</Heading>
        <ul>
          <li>
            <a href="https://github.com/awesomedata/awesome-public-datasets#climate-weather">
              AwesomeData: Climate + Weather
            </a>: Primarily temperature and precipitation; also has projections
          </li>
          <li>
            <a href="http://geodata.grid.unep.ch/">
              United Nations Environmental Data
            </a>: Habitat and disasters, others
          </li>
          <li>
            <a href="https://www.gapminder.org/data/">
              Gapminder
            </a>: CO2 Data over time
          </li>
        </ul>
        <Heading>Searching:</Heading>
        <ul>
          <li>
            Government mitigation programs with projections
          </li>
        </ul>
        <Title>Visualizations</Title>
        <Heading>Multi-modal Map</Heading>
        <ul>
          <li>
            World/Regional map that will display certain data depending on subject
          </li>
          <li>
            e.g. display temperatures, anomalies, emissions, etc.
          </li>
        </ul>
        <Heading>Time Machine</Heading>
        <ul>
          <li>
            Given a certain data feature, view that over time (100 years?)
          </li>
          <li>
            e.g. display plots and specific maps
          </li>
        </ul>
        <Title>Inspirations</Title>
        <ul>
          <li>
            <a href="http://explorador.cr2.cl/">
              Explorador Climatico
            </a>: Multi-modal map
          </li>
          <li>
            <a href="https://earthobservatory.nasa.gov/blogs/earthmatters/wp-content/uploads/sites/5/2016/09/tempanoms_gis_august2016.gif">
              Earth Observatory
            </a>: Time-varying plot
          </li>
          <li>
            <a href="https://ourworldindata.org/natural-disasters">
              Natural Disasters
            </a>: Many different plots of natural disasters
          </li>
        </ul>
      </>
    );
  }
}