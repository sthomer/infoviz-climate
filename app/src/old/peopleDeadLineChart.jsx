import React from 'react';
import * as d3 from 'd3';
import styled from 'styled-components';
import { Title } from './styles';
import ReactChartkick, { LineChart } from 'react-chartkick'
import Chart from 'chart.js'

import data from '../data/people_dead_extreme_temp.json';



ReactChartkick.addAdapter(Chart)


export default class PeopleDeadLineChart extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      region: ''
    }
  }
  render() {

    //get the dates from the json file
    // console.log(data)
    // console.log(data.Jordan)
    // let dates = co2emission.dates
    //get the country name when we click on the map file
    // let countryName = this.props.region
    
    if (this.props.region == '') {
      //return an empty page
      return (<>
      </>)
    }
    

    return (<>
      <LineChart data={
        [
          { "name": "Casualties", "data": data[this.props.region] }
        ]
      } responsive={true} maintainAspectRatio={false} title={'People who died by extreme temp'} colors={["#1A5E25"]}/>
    </>)


  }
}