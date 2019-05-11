import React from 'react';
import * as d3 from 'd3';
import styled from 'styled-components';
import { Title } from './styles';
import ReactChartkick, { LineChart } from 'react-chartkick'
import Chart from 'chart.js'

// import forestpercent from './data/forest_coverage_percent.json';
import co2emission from './data/co2_emissions_tonnes_per_person.json';



ReactChartkick.addAdapter(Chart)


export default class CO2LineChart extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      region: ''
    }
  }
  render() {

    //get the dates from the json file
    let dates = co2emission.dates
    //get the country name when we click on the map file
    let countryName = this.props.region
    
    if (countryName == '') {
      //return an empty page
      return (<>
      </>)
    }

    // console.log(countryName)
    //modifies the state variable to the countryName
    this.state.region = countryName
    debugger


    //create the data array for the ReactChartkick
    //it is based on the form of array of arrays 
    // [ [1990,23],[1991,21]]
    // let forestDataArray = []
    let co2DataArray = []
    try {
      // let forestPercValue = forestpercent[countryName]
      let co2Value = co2emission[countryName]
      for (let j = 1; j < dates.length; j++) {
        // forestDataArray.push([dates[j], Number(forestPercValue[j])]);
        co2DataArray.push([dates[j], Number(co2Value[j])]);
      }
    } catch (e) {
      alert('Couldn\'t update the linechart: possibly beacause of the name of region doesn\'t match the one in the dataset, ')
    }

    return (<>
      <LineChart data={
        [
          { "name": "CO2", "data": co2DataArray }
          // , { "name": "CO2 emmision", "data": co2DataArray }
        ]
      } responsive={true} maintainAspectRatio={false} title={'CO2 emissions evolution over time (per tonne)'} colors={["#B00B1E"]}/>
    </>)


  }
}