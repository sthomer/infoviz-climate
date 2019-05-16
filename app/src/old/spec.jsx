import React from 'react';
import { Title, Heading } from './styles';

export default class Spec extends React.Component {
  render() {
    return (<>
      <Title>Multimodal Map</Title>
      <Heading>Functionality</Heading>
      <ul>
        <li>View: main, largest pane</li>
        <li>Purpose: Heatmap of specified variable(s)</li>
      </ul>
      <Heading>Core Actions</Heading>
      <ul>
        <li>Zoom: change granularity of visible region</li>
        <li>Pan: change focus of visible region</li>
        <li>Hover: hover over region for quick info</li>
        <li>Selection: select region for auxiliary view</li>
      </ul>
      <Heading>Extended Actions</Heading>
      <ul>
        <li>Search: jump to specified region e.g. country, continent, etc.</li>
        <li>Area selection: select multiple regions simultaneously</li>
      </ul>
        
      <Title>Auxiliary Views</Title>
      <Heading>Functionality</Heading>
      <ul>
        <li>View: Vertical side pane</li>
        <li>Purpose: Detailed view for selected region of plots and graphs related to selected variable(s)</li>
      </ul>
      <Heading>Core Actions</Heading>
      <ul>
        <li>Hover: highlighting quantity on one plot highlights same quantity on other plots</li>
        <li>Plot Selection: select plot for detailed modal</li>
        <li>Quantity Seletion: select quantity for for timeline modal</li>
      </ul>
      <Heading>Extended Actions</Heading>
      <ul>
        <li>Customization: choose which plots and graphs are displayed</li>
      </ul>
      
      <Title>Timelines</Title>
      <Heading>Functionality</Heading>
      <ul>
        <li>View: Large modal</li>
        <li>Purpose: Dynamic plot of selected variable for selected region showing changes over time</li>
      </ul>
      <Heading>Core Actions</Heading>
      <ul>
        <li>Play/pause/stop: control dynamically changing plot</li>
        <li>Slide: scrub over timeline to move to specific point in time</li>
        <li>Hover: quick info of hightlighted quantity</li>
      </ul>
      <Heading>Extended Actions</Heading>
      <ul>
        <li>Customization: choose which plots and graphs are displayed</li>
      </ul>

      <Heading>Example/Inspiration</Heading>
      <ul>
        <li><a href="https://www.climate.gov/maps-data ">There are a couple of maps diagrams that show timelines of tempratures and different interesting changes over time</a> </li>
        <li> what missing in the link above is the interactivity, however, we could access the data they have used from  <a href="https://www.ncei.noaa.gov/access"> NCEI </a> </li>
      </ul>

      <Title>Variable Selection</Title>
      <Heading>Functionality</Heading>
      <ul>
        <li>View: either vertical side pane or top nav bar</li>
        <li>Purpose: select which variable(s) will be visualized by loading data for visualization (must clean data beforehand)</li>
      </ul>
      <Heading>Core Actions</Heading>
      <ul>
        <li>Selection: choose variable(s) to be visualized</li>
        <li>Filter: apply filter to variable e.g. time span, clip values, etc.</li>
      </ul>
      <Heading>Extended Actions</Heading>
      <ul>
        <li>Hover: display description of variables</li>
        <li>Suggestion: display interesting combinations of variables</li>
      </ul>
      <Heading> Example/Inspiration </Heading>
      <ul>
        <li><a href="http://www.impactlab.org/map/">This is a nice representation of selecting one variable at time </a> </li>
      </ul>
    </>);
  }
}