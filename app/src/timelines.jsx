import React from 'react';
import * as d3 from 'd3';
import styled from 'styled-components';
import * as am4core from "@amcharts/amcharts4/core";
import * as am4charts from "@amcharts/amcharts4/charts";
import am4themes_animated from "@amcharts/amcharts4/themes/animated";


am4core.useTheme(am4themes_animated);

const colors = {
  selected: am4core.color("#07BEB8"),
  unselectedScroll: am4core.color("#ACACAC"),
  unselectdItem: am4core.color("white"),
  textSelected: am4core.color("white"),
  textUnselected: am4core.color("black"),
};

export default class Timelines extends React.Component {
  state = {};

  updateDateString(str, updateDate) {
    const array = str.split(" ");
    let startDate = array[1];
    let endDate = array[3];
    updateDate(startDate, endDate)
  }

  selectRange = (scrollbarX, varObj, updateDateString, updateDate) => {
    scrollbarX.thumb.background.fill = colors.selected;
    scrollbarX.thumb.background.fillOpacity = 0.3;
    if (varObj.selectedComponent != undefined) {
      varObj.selectedComponent.background.fill = colors.unselectdItem;
      varObj.selectedComponent.fill = colors.textUnselected;
    }
    updateDateString(scrollbarX.thumb.titleElement.textContent, updateDate);
  };

  selectDate = (scrollbarX, varObj, ev, updateDate) => {
    if (varObj.selectedComponent != undefined) {
      varObj.selectedComponent.background.fill = colors.unselectdItem;
      varObj.selectedComponent.fill = colors.textUnselected;
    }
    scrollbarX.thumb.background.fill = colors.unselectedScroll;
    scrollbarX.thumb.background.fillOpacity = 0.4;

    ev.target.background.fill = colors.selected;
    ev.target.fill = colors.textSelected;
    ev.target.background.fillOpacity = 0.3;
    updateDate(ev.target.text, ev.target.text);
    varObj.selectedComponent = ev.target;
  };

  //primaryDatasetValue and secondaryDatasetValue can be considered as keys for the each series
  //see line 125 : series2.dataFields.valueY = "secondaryDatasetValue"; 
  //and line 118 : series.dataFields.valueY = "primaryDatasetValue";
  loadData = () => this.props.region === undefined ? undefined :
      this.props.primary.dates.map((date, i) =>
        (
          { 
          date: date, 
          primaryDatasetValue: this.props.primary[this.props.region][i], 
          secondaryDatasetValue: this.props.secondary[this.props.region][i] 
          }
        ));

  // loadData() {
  //   let data = []
    
  //   if (this.props.region !== undefined) {
  //     let cdates = this.props.primary.dates  
  //     let fdates = this.props.secondary.dates
  //     let len = Math.max(cdates.length,fdates.length)
  //     let primaryDValue = this.props.primary[this.props.region]
  //     let secondaryDValue = this.props.secondary[this.props.region]
  //     for (let i = 1; i < len; i++) 
  //         data.push({ date: cdates[i], primaryDatasetValue: primaryDValue[i], secondaryDatasetValue: secondaryDValue[i] });
  //     this.state.region = this.props.region
  //   }
  //   return data

  // }

  componentDidUpdate(prevProps) {
    if (
      prevProps.region !== this.props.region ||
      prevProps.primary !== this.props.primary ||
      prevProps.secondary !== this.props.secondary
    ) {
      this.chart.data = this.loadData()
    }
  }

  componentDidMount() {
    let varObj = { selectedComponent: undefined };

    const chart = am4core.create("chartdiv", am4charts.XYChart);
    chart.data = this.loadData();


    const dateAxis = chart.xAxes.push(new am4charts.CategoryAxis());
    dateAxis.dataFields.category = "date";
    dateAxis.renderer.grid.template.location = 0;

    chart.cursor = new am4charts.XYCursor();

    // First value axis
    let valueAxis = chart.yAxes.push(new am4charts.ValueAxis());
    valueAxis.title.text = "primary dataset";

    // Second value axis
    let valueAxis2 = chart.yAxes.push(new am4charts.ValueAxis());
    valueAxis2.title.text = "secondary dataset";
    valueAxis2.renderer.opposite = true;

    // First series
    let series = chart.series.push(new am4charts.ColumnSeries());
    series.dataFields.valueY = "primaryDatasetValue";
    series.dataFields.categoryX = "date";
    series.name = "first dataset";
    series.tooltipText = "{name}: [bold]{valueY}[/]";

    // Second series
    let series2 = chart.series.push(new am4charts.LineSeries());
    series2.dataFields.valueY = "secondaryDatasetValue";
    series2.dataFields.categoryX = "date";
    series2.name = "secondary dataset";
    series2.tooltipText = "{name}: [bold]{valueY}[/]";
    series2.strokeWidth = 3;
    series2.yAxis = valueAxis2;

    dateAxis.renderer.labels.template.cursorOverStyle = am4core.MouseCursorStyle.pointer;

    const scrollbarX = new am4charts.XYChartScrollbar();
    scrollbarX.series.push(series);
    scrollbarX.thumb.background.states.removeKey("hover");
    scrollbarX.thumb.background.states.removeKey("down");
    scrollbarX.thumb.background.fill = colors.selected;
    scrollbarX.thumb.background.fillOpacity = 0.3;
    scrollbarX.thumb.events._listeners.splice(15, 1);
    scrollbarX.background.events._listeners = []
    chart.scrollbarX = scrollbarX;

    const selectRange = this.selectRange;
    const updateDateString = this.updateDateString;
    const updateDate = this.props.updateDate;
    const selectDate = this.selectDate;

    dateAxis.renderer.labels.template.events.on("hit", ev =>
      selectDate(scrollbarX, varObj, ev, updateDate)
    );

    chart.plotContainer.events.on("up", () =>
      selectRange(scrollbarX, varObj, updateDateString, updateDate)
    );

    scrollbarX.chart.events.on("rangechanged", () =>
      selectRange(scrollbarX, varObj, updateDateString, updateDate)
    );

    scrollbarX.background.events.on("up", () =>
      selectRange(scrollbarX, varObj, updateDateString, updateDate)
    );

    scrollbarX.thumb.events.on("up", () =>
      selectRange(scrollbarX, varObj, updateDateString, updateDate)
    );

    scrollbarX.startGrip.events.on("up", () =>
      selectRange(scrollbarX, varObj, updateDateString, updateDate)
    );

    scrollbarX.endGrip.events.on("up", () =>
      selectRange(scrollbarX, varObj, updateDateString, updateDate)
    );

    chart.chartCursor = false;
    this.chart = chart;
  }

  componentWillUnmount() {
    if (this.chart) {
      this.chart.dispose();
    }
  }

  render() {
    return (
      <div id="chartdiv" style={{ width: "100%", height: "100%" }} />
    );
  }
}
