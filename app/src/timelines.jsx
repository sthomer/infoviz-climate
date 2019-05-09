import React from 'react';
import * as d3 from 'd3';
import styled from 'styled-components';
import { Title } from './styles';
import * as am4core from "@amcharts/amcharts4/core";
import * as am4charts from "@amcharts/amcharts4/charts";
import am4themes_animated from "@amcharts/amcharts4/themes/animated";

am4core.useTheme(am4themes_animated);

export default class Timelines extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      selectedStartDate: undefined,
      selectedendDate: undefined
    };
    var selectedComponent = undefined;
  }

  updateDate(startDate, endDate){
    console.log(startDate + " " + endDate)
    // this.props.selectedDate = startDate;
    // this.props.selectedDate = endDate;
  }

  updateDateString(str){
    const array = str.split(" ");
    let startDate = array[1]
    let endDate = array[3]
    console.log(startDate + " " + endDate)
    // this.props.selectedDate = startDate;
    // this.props.selectedDate = endDate;

  }

  loadData() {
    let data = [];
    let visits = 10;
    for (let j = 1; j < 119; j++) {
      var year = 1900 + j
      var date = new Date(year, 0, 0)
      visits += Math.round((Math.random() < 0.5 ? 1 : -1) * Math.random() * 10);
      data.push({ date: date, name: date, value: visits });
    }
    return data;
  }

  componentDidMount() {
    const updateDateBounds = this.updateDate
    const updateDateBoundsString = this.updateDateString
    var selectedComponent = undefined
    var selectedDate = undefined

    let chart = am4core.create("chartdiv", am4charts.XYChart);

    chart.paddingRight = 20;

    chart.data = this.loadData();

    let dateAxis = chart.xAxes.push(new am4charts.DateAxis());
    dateAxis.renderer.grid.template.location = 0;

    let valueAxis = chart.yAxes.push(new am4charts.ValueAxis());
    valueAxis.tooltip.disabled = true;
    valueAxis.renderer.minWidth = 35;

    let series = chart.series.push(new am4charts.LineSeries());
    series.dataFields.dateX = "date";
    series.dataFields.valueY = "value";
    series.tooltipText = "{valueY.value}";
    chart.cursor = new am4charts.XYCursor();

    dateAxis.renderer.labels.template.cursorOverStyle = am4core.MouseCursorStyle.pointer;

    let scrollbarX = new am4charts.XYChartScrollbar();
    scrollbarX.series.push(series);
    chart.scrollbarX = scrollbarX;

    scrollbarX.thumb.background.states.removeKey("hover");
    scrollbarX.thumb.background.states.removeKey("down");
    scrollbarX.thumb.background.fill = am4core.color("#07BEB8");
    scrollbarX.thumb.background.fillOpacity = 0.4;
    dateAxis.renderer.labels.template.events.on("hit", function(ev) {
      if(selectedComponent != undefined){
        selectedComponent.background.fill = am4core.color("white");
        selectedComponent.fill = am4core.color("black");
      }
      scrollbarX.thumb.background.fill = am4core.color("#ACACAC");
      scrollbarX.thumb.background.fillOpacity = 0.4;

      ev.target.background.fill = am4core.color("#07BEB8");
      ev.target.fill = am4core.color("white");
      updateDateBounds(ev.target.text, ev.target.text)
      selectedComponent = ev.target;
      selectedDate = ev.target.text;
    });

    scrollbarX.events.on("rangechanged", function(ev) {
      scrollbarX.thumb.background.fill = am4core.color("#07BEB8");
      scrollbarX.thumb.background.fillOpacity = 0.4;

      if(selectedComponent != undefined){
        selectedComponent.background.fill = am4core.color("white");
        selectedComponent.fill = am4core.color("black");
        selectedComponent = undefined;
      }
      updateDateBoundsString(scrollbarX.thumb.titleElement.textContent);
    });

    scrollbarX.thumb.events.on("up", function(ev) {
      scrollbarX.thumb.background.fill = am4core.color("#07BEB8");
      scrollbarX.thumb.background.fillOpacity = 0.4;

      if(selectedComponent != undefined){
        selectedComponent.background.fill = am4core.color("white");
        selectedComponent.fill = am4core.color("black");
        selectedComponent = undefined;
      }
      updateDateBoundsString(scrollbarX.thumb.titleElement.textContent);
    });


    scrollbarX.scrollbarChart.events.on("up", function(ev) {
      scrollbarX.thumb.background.fill = am4core.color("#07BEB8");
      scrollbarX.thumb.group.node.children[0].fill = am4core.color("#07BEB8");
      scrollbarX.thumb.background.fillOpacity = 0.3;
      if(selectedComponent != undefined){
        selectedComponent.background.fill = am4core.color("white");
        selectedComponent.fill = am4core.color("black");
      }
      updateDateBoundsString(scrollbarX.thumb.titleElement.textContent);
    });

    chart.plotContainer.events.on("up", function(ev) {
      scrollbarX.thumb.background.fill = am4core.color("#07BEB8");
      scrollbarX.thumb.group.node.children[0].fill = am4core.color("#07BEB8");
      scrollbarX.thumb.background.fillOpacity = 0.3;
      if(selectedComponent != undefined){
        selectedComponent.background.fill = am4core.color("white");
        selectedComponent.fill = am4core.color("black");
      }
      updateDateBoundsString(scrollbarX.thumb.titleElement.textContent);
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
