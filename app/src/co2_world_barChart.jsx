import React from 'react';
import * as d3 from 'd3';
import styled from 'styled-components';
import * as am4core from "@amcharts/amcharts4/core";
import * as am4charts from "@amcharts/amcharts4/charts";
import am4themes_animated from "@amcharts/amcharts4/themes/animated";

import co2emission from './data/test.txt';


am4core.useTheme(am4themes_animated);

const colors = {
  selected: am4core.color("#07BEB8"),
  unselectedScroll: am4core.color("#ACACAC"),
  unselectdItem: am4core.color("white"),
  textSelected: am4core.color("white"),
  textUnselected: am4core.color("black"),
};

export default class CO2BarChart extends React.Component {


  componentDidMount() {
      const chart = am4core.create("chartdivBis", am4charts.XYChart);
      chart.scrollbarX = new am4core.Scrollbar();

      //get the dates from the json file
      chart.data = co2emission;
      console.log(chart.data)
      // Create axes
      let categoryAxis = chart.xAxes.push(new am4charts.CategoryAxis());
      categoryAxis.dataFields.category = "country";
categoryAxis.renderer.grid.template.location = 0;
categoryAxis.renderer.minGridDistance = 30;
categoryAxis.renderer.labels.template.horizontalCenter = "right";
categoryAxis.renderer.labels.template.verticalCenter = "middle";
categoryAxis.renderer.labels.template.rotation = 270;
categoryAxis.tooltip.disabled = true;
categoryAxis.renderer.minHeight = 110;

      let valueAxis = chart.yAxes.push(new am4charts.ValueAxis());
      valueAxis.renderer.minWidth = 50;

      // Create series
      let series = chart.series.push(new am4charts.ColumnSeries());
      series.sequencedInterpolation = true;
      series.dataFields.valueY = "visits";
      series.dataFields.categoryX = "country";
      series.tooltipText = "[{categoryX}: bold]{valueY}[/]";
      series.columns.template.strokeWidth = 0;

      series.tooltip.pointerOrientation = "vertical";

      series.columns.template.column.cornerRadiusTopLeft = 10;
      series.columns.template.column.cornerRadiusTopRight = 10;
      series.columns.template.column.fillOpacity = 0.8;

      // on hover, make corner radiuses bigger
let hoverState = series.columns.template.column.states.create("hover");
hoverState.properties.cornerRadiusTopLeft = 0;
hoverState.properties.cornerRadiusTopRight = 0;
hoverState.properties.fillOpacity = 1;


      series.columns.template.adapter.add("fill", function(fill, target) {
          return chart.colors.getIndex(target.dataItem.index);
      });

      chart.cursor = new am4charts.XYCursor();

  }


  render() {
    return (
      <div id="chartdivBis" style={{ width: "100%", height: "100%" }} />
    );
  }
}
