import React from 'react';
import * as d3 from 'd3';
import styled from 'styled-components';
import { Title } from './styles';
import * as am4core from "@amcharts/amcharts4/core";
import * as am4charts from "@amcharts/amcharts4/charts";
import am4themes_animated from "@amcharts/amcharts4/themes/animated";

import temp from './data/GlobalTempByCountryFrom1800JSON-MEAN.json';

am4core.useTheme(am4themes_animated);

const colors = {
  selected: am4core.color("#07BEB8"),
  unselectedScroll: am4core.color("#ACACAC"),
  unselectdItem: am4core.color("white"),
  textSelected: am4core.color("white"),
  textUnselected: am4core.color("black"),

};

export default class Timelines extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      region: ''
    }
  }

  updateDateString(str, updateDate) {
    const array = str.split(" ");
    let startDate = array[1]
    let endDate = array[3]
    updateDate(startDate, endDate)
  }

  selectRange(scrollbarX, varObj, updateDateString, updateDate) {
    scrollbarX.thumb.background.fill = colors.selected;
    scrollbarX.thumb.background.fillOpacity = 0.3;
    if (varObj.selectedComponent != undefined) {
      varObj.selectedComponent.background.fill = colors.unselectdItem;
      varObj.selectedComponent.fill = colors.textUnselected;
    }
    updateDateString(scrollbarX.thumb.titleElement.textContent, updateDate);

  }

  selectDate(scrollbarX, varObj, ev, updateDate) {
    if (varObj.selectedComponent != undefined) {
      varObj.selectedComponent.background.fill = colors.unselectdItem;
      varObj.selectedComponent.fill = colors.textUnselected;
    }
    scrollbarX.thumb.background.fill = colors.unselectedScroll;
    scrollbarX.thumb.background.fillOpacity = 0.4;

    ev.target.background.fill = colors.selected;
    ev.target.fill = colors.textSelected
    ev.target.background.fillOpacity = 0.3;
    updateDate(ev.target.text, ev.target.text)
    varObj.selectedComponent = ev.target;
  }

  loadData() {
    // let data = [];
    // let visits = 10;
    // for (let j = 1; j < 119; j++) {
    //   var year = 1900 + j
    //   var date = new Date(year, 0, 0)
    //   visits += Math.round((Math.random() < 0.5 ? 1 : -1) * Math.random() * 10);
    //   data.push({ date: date, name: date, value: visits });
    // }

    let dates = temp.dates
    let countryName = this.props.region
    let tempDataArray = []
    try {
      // let forestPercValue = forestpercent[countryName]
      let tempValue = temp[countryName]
      for (let j = 1; j < dates.length; j++) {
        // forestDataArray.push([dates[j], Number(forestPercValue[j])]);
        tempDataArray.push({ date: dates[j], name: dates[j], value: Number(tempValue[j]) });
      }
      // this.state.region = countryName
    } catch (e) {

    }
    
    return tempDataArray;
  }

  componentDidUpdate(oldProps) {
    this.state.region = this.props.region
      if(oldProps.region !== this.state.region){
      // this.data = this.loadData();
      this.chart.data = this.loadData()
    } 
  }

  componentDidMount() {
    let varObj = { selectedComponent: undefined };

    let chart = am4core.create("chartdiv", am4charts.XYChart);
    chart.paddingRight = 20;
    chart.data = this.loadData();
    
    

    let dateAxis = chart.xAxes.push(new am4charts.DateAxis());
    dateAxis.renderer.grid.template.location = 0;

    let valueAxis = chart.yAxes.push(new am4charts.ValueAxis());
    valueAxis.tooltip.disabled = true;
    valueAxis.renderer.minWidth = 35;
    valueAxis.title.text = '°C'

    let series = chart.series.push(new am4charts.LineSeries());
    series.dataFields.dateX = "date";
    series.dataFields.valueY = "value";
    series.tooltipText = "{valueY.value}";
    chart.cursor = new am4charts.XYCursor();

    dateAxis.renderer.labels.template.cursorOverStyle = am4core.MouseCursorStyle.pointer;

    let scrollbarX = new am4charts.XYChartScrollbar();
    scrollbarX.series.push(series);
    scrollbarX.thumb.background.states.removeKey("hover");
    scrollbarX.thumb.background.states.removeKey("down");
    scrollbarX.thumb.background.fill = colors.selected;
    scrollbarX.thumb.background.fillOpacity = 0.3;
    scrollbarX.thumb.events._listeners.splice(15, 1);
    scrollbarX.background.events._listeners = []
    chart.scrollbarX = scrollbarX;

    const selectRange = this.selectRange
    const updateDateString = this.updateDateString
    const updateDate = this.props.updateDate
    const selectDate = this.selectDate

    dateAxis.renderer.labels.template.events.on("hit", function (ev) {
      selectDate(scrollbarX, varObj, ev, updateDate)
    });

    chart.plotContainer.events.on("up", function (ev) {
      console.log(ev)
      selectRange(scrollbarX, varObj, updateDateString, updateDate)
    });

    // scrollbarX.thumb.events.on("dragstop", function(ev) {
    //   console.log(scrollbarX.thumb.titleElement.textContent)
    // });

    scrollbarX.chart.events.on("rangechanged", function (ev) {
      selectRange(scrollbarX, varObj, updateDateString, updateDate);
    });

    scrollbarX.background.events.on("up", function (ev) {
      selectRange(scrollbarX, varObj, updateDateString, updateDate);
    });

    scrollbarX.thumb.events.on("up", function (ev) {
      selectRange(scrollbarX, varObj, updateDateString, updateDate);
    });

    scrollbarX.startGrip.events.on("up", function (ev) {
      selectRange(scrollbarX, varObj, updateDateString, updateDate);
    });

    scrollbarX.endGrip.events.on("up", function (ev) {
      selectRange(scrollbarX, varObj, updateDateString, updateDate);
    });

    chart.chartCursor = false
    this.chart = chart;


  }

  componentWillUnmount() {
    if (this.chart) {
      this.chart.dispose();
    }
  }

  render() {
    return (
      <div id="chartdiv" style={{ width: "100%", height: "100%" }}></div>
    );
  }
}
