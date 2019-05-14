import React from 'react';
import * as d3 from 'd3';
import styled from 'styled-components';
import * as am4core from "@amcharts/amcharts4/core";
import * as am4charts from "@amcharts/amcharts4/charts";
import am4themes_animated from "@amcharts/amcharts4/themes/animated";
import * as am4plugins_regression from "@amcharts/amcharts4/plugins/regression";

am4core.useTheme(am4themes_animated);

export default class Auxiliary extends React.Component {

  loadData = () => this.props.region === undefined ? undefined :
  this.props.primary.dates.map((date, i) =>
  (
    {
      primaryDatasetValue: this.props.primary[this.props.region][i],
      secondaryDatasetValue: this.props.secondary[this.props.region][i]
    }
  ));

  componentDidUpdate(prevProps) {
    if (
      prevProps.region !== this.props.region ||
      prevProps.primary !== this.props.primary ||
      prevProps.secondary !== this.props.secondary) {
      this.chart.data = this.loadData()
      if (this.chart.data.length > 1) {
        const lastInedex = this.chart.data.length-1;
        this.trend.data = [
          { "primaryDatasetValue": this.chart.data[0].primaryDatasetValue,
            "secondaryDatasetValue": this.chart.data[0].secondaryDatasetValue },
          { "primaryDatasetValue": this.chart.data[lastInedex].primaryDatasetValue,
            "secondaryDatasetValue": this.chart.data[lastInedex].secondaryDatasetValue }];
        }
        console.log(this.chart.data)
        console.log(this.trend.data)
    }
  }

  componentDidMount() {
  let chart = am4core.create("scatterdiv", am4charts.XYChart);

  chart.data = this.loadData();
  console.log(this.loadData())

  // Create axes
  let valueAxisX = chart.xAxes.push(new am4charts.ValueAxis());
  valueAxisX.title.text = 'X Axis';
  valueAxisX.renderer.minGridDistance = 40;

  // Create value axis
  let valueAxisY = chart.yAxes.push(new am4charts.ValueAxis());
  valueAxisY.title.text = 'Y Axis';

  let series = chart.series.push(new am4charts.LineSeries());
  series.dataFields.valueX = "primaryDatasetValue";
  series.dataFields.valueY = "secondaryDatasetValue";
  series.strokeOpacity = 0;

  let bullet = series.bullets.push(new am4charts.CircleBullet());
  bullet.strokeWidth = 2;
  bullet.stroke = am4core.color("#fff");
  bullet.setStateOnChildren = true;
  bullet.propertyFields.fillOpacity = "opacity";
  bullet.propertyFields.strokeOpacity = "opacity";

  let trend = chart.series.push(new am4charts.LineSeries());
  trend.dataFields.valueY = "secondaryDatasetValue";
  trend.dataFields.valueX = "primaryDatasetValue";
  trend.strokeWidth = 2
  trend.stroke = chart.colors.getIndex(0);
  trend.strokeOpacity = 0.7;

  var regseries = chart.series.push(new am4charts.LineSeries());
  regseries.dataFields.valueY = "secondaryDatasetValue";
  regseries.dataFields.valueX = "primaryDatasetValue";
  regseries.strokeWidth = 2;
  regseries.name = "Polynomial Regression";
  regseries.tensionX = 0.8;
  regseries.tensionY = 0.8;

  var reg = regseries.plugins.push(new am4plugins_regression.Regression());
  reg.method = "linear";
  reg.simplify = true;

  this.chart = chart;
  this.trend = trend;

  }

  componentWillUnmount() {
  if (this.chart) {
      this.chart.dispose();
  }
  }

  render() {
  return (
      <div id="scatterdiv" style={{ width: "100%", height: "50%" }}></div>
  );
  }
}

