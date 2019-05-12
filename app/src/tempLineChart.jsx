import React from 'react';
import * as d3 from 'd3';
import styled from 'styled-components';
import { Title } from './styles';
import ReactChartkick, { ScatterChart } from 'react-chartkick'
import Chart from 'chart.js'

// import forestpercent from './data/forest_coverage_percent.json';
import temp from './data/GlobalTempByCountryFrom1800JSON-MEAN.json';


ReactChartkick.addAdapter(Chart)


export default class TempLineChart extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      region: ''
    }
  }
  render() {

    //get the dates from the json file
    let dates = temp.dates
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
    let tempDataArray = []
    try {
      // let forestPercValue = forestpercent[countryName]
      let tempValue = temp[countryName]
      for (let j = 1; j < dates.length; j++) {
        // forestDataArray.push([dates[j], Number(forestPercValue[j])]);
        tempDataArray.push([dates[j], Number(tempValue[j])]);
      }
    } catch (e) {
      alert('Couldn\'t update the linechart: possibly beacause of the name of region doesn\'t match the one in the dataset, ')
    }

    return (<>
      <ScatterChart data={
        [
          { "name": "°C", "data": tempDataArray }
          // , { "name": "CO2 emmision", "data": co2DataArray }
        ]
      } 
      responsive={true}
      maintainAspectRatio={false} 
      title={'Temperature over the year'}
      colors={["#707020"]}
      
        />
    </>)


  }
}