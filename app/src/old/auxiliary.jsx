import React from 'react';
import * as d3 from 'd3';
import styled from 'styled-components';
import * as am4core from "@amcharts/amcharts4/core";
import * as am4charts from "@amcharts/amcharts4/charts";
import am4themes_animated from "@amcharts/amcharts4/themes/animated";
import * as am4plugins_regression from "@amcharts/amcharts4/plugins/regression";


am4core.useTheme(am4themes_animated);

function findLineByLeastSquares( values_x, values_y ) {
  var sum_x = 0;
  var sum_y = 0;
  var sum_xy = 0;
  var sum_xx = 0;
  var count = 0;

  /*
   * We'll use those variables for faster read/write access.
   */
  var x = 0;
  var y = 0;
  var values_length = values_x.length;

  if ( values_length != values_y.length ) {
    throw new Error( 'The parameters values_x and values_y need to have same size!' );
  }

  /*
   * Nothing to do.
   */
  if ( values_length === 0 ) {
    return [
      [],
      []
    ];
  }

  /*
   * Calculate the sum for each of the parts necessary.
   */
  for ( var v = 0; v < values_length; v++ ) {
    x = parseFloat(values_x[ v ]);
    y = parseFloat(values_y[ v ]);
    sum_x += x;
    sum_y += y;
    sum_xx += x * x;
    sum_xy += x * y;
    count++;
  }

  /*
   * Calculate m and b for the formular:
   * y = x * m + b
   */
  var m = ( count * sum_xy - sum_x * sum_y ) / ( count * sum_xx - sum_x * sum_x );
  var b = ( sum_y / count ) - ( m * sum_x ) / count;
  /*
   * We will make the x and y result line now
   */
  var result_values_x = [];
  var result_values_y = [];

  for ( var v = 0; v < values_length; v++ ) {
    x = values_x[ v ];
    y = x * m + b;
    result_values_x.push( x );
    result_values_y.push( y );
  }

  return [ result_values_x, result_values_y ];
}

export default class Auxiliary extends React.Component {

  loadData = () => this.props.region === undefined ? undefined :
  this.props.primary.dates.map((date, i) =>
  (
    {
      primaryDatasetValue: this.props.primary[this.props.region][i],
      secondaryDatasetValue: this.props.secondary[this.props.region][i],
      primaryReg: this.props.primary[this.props.region][i],
      secondaryReg: this.props.secondary[this.props.region][i]
    }
  ));

  componentDidUpdate(prevProps) {
    if (
      prevProps.region !== this.props.region ||
      prevProps.primary !== this.props.primary ||
      prevProps.secondary !== this.props.secondary)
    {
      this.chart.data = this.loadData()
      console.log(this.chart.data)
      this.regression()
    }
  }

  regression() {
    if(this.chart.data !== undefined)
    {
      let x = this.chart.data.map(point=> point.primaryDatasetValue);
      let y = this.chart.data.map(point=> point.secondaryDatasetValue);
      let regression = findLineByLeastSquares(x,y);
      this.chart.data = this.chart.data.map(function(point,i) {
        return (
          {
            primaryDatasetValue: point.primaryDatasetValue,
            secondaryDatasetValue: point.secondaryDatasetValue,
            primaryReg: regression[0][i],
            secondaryReg: regression[1][i]+""
          })
      });

      this.valueAxisX.title.text = this.props.datasetList.find(dataset =>
        {return dataset.id == this.props.activePrimary
        }).content;
      this.valueAxisY.title.text = this.props.datasetList.find(dataset =>
        {return dataset.id == this.props.activeSecondary
        }).content;
    }
  }



  componentDidMount() {
  let chart = am4core.create("scatterdiv", am4charts.XYChart);
  this.chart = chart;
  chart.data = this.loadData();

  // Create axes
  let valueAxisX = chart.xAxes.push(new am4charts.ValueAxis());
  valueAxisX.title.text = 'X Axis';
  valueAxisX.renderer.minGridDistance = 40;
  this.valueAxisX = valueAxisX

  // Create value axis
  let valueAxisY = chart.yAxes.push(new am4charts.ValueAxis());
  valueAxisY.title.text = 'Y Axis';
  this.valueAxisY = valueAxisY

  this.regression()

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


  let lineSeries = chart.series.push(new am4charts.LineSeries());
  lineSeries.dataFields.valueX = "primaryReg";
  lineSeries.dataFields.valueY = "secondaryReg";
  lineSeries.stroke = am4core.color("#00008b");
  lineSeries.strokeWidth = 2;

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

