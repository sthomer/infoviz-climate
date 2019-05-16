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
      chart.data = [{"country": "Afghanistan", "co2": "0.299"}, {"country": "Albania", "co2": "1.96"}, {"country": "Algeria", "co2": "3.72"}, {"country": "Andorra", "co2": "5.83"}, {"country": "Angola", "co2": "1.29"}, {"country": "Antigua and Barbuda", "co2": "5.38"}, {"country": "Argentina", "co2": "4.75"}, {"country": "Armenia", "co2": "1.9"}, {"country": "Australia", "co2": "15.4"}, {"country": "Austria", "co2": "6.8"}, {"country": "Azerbaijan", "co2": "3.94"}, {"country": "Bahamas", "co2": "6.32"}, {"country": "Bahrain", "co2": "23.4"}, {"country": "Bangladesh", "co2": "0.459"}, {"country": "Barbados", "co2": "4.49"}, {"country": "Belarus", "co2": "6.69"}, {"country": "Belgium", "co2": "8.32"}, {"country": "Belize", "co2": "1.41"}, {"country": "Benin", "co2": "0.614"}, {"country": "Bhutan", "co2": "1.29"}, {"country": "Bolivia", "co2": "1.93"}, {"country": "Bosnia and Herzegovina", "co2": "6.23"}, {"country": "Botswana", "co2": "3.24"}, {"country": "Brazil", "co2": "2.59"}, {"country": "Brunei", "co2": "22.1"}, {"country": "Bulgaria", "co2": "5.87"}, {"country": "Burkina Faso", "co2": "0.162"}, {"country": "Burundi", "co2": "0.0445"}, {"country": "Cambodia", "co2": "0.438"}, {"country": "Cameroon", "co2": "0.315"}, {"country": "Canada", "co2": "15.1"}, {"country": "Cape Verde", "co2": "0.933"}, {"country": "Central African Republic", "co2": "0.0666"}, {"country": "Chad", "co2": "0.0538"}, {"country": "Chile", "co2": "4.69"}, {"country": "China", "co2": "7.4"}, {"country": "Colombia", "co2": "1.76"}, {"country": "Comoros", "co2": "0.203"}, {"country": "Democratic Republic of the Congo", "co2": "0.0634"}, {"country": "Republic of the Congo", "co2": "0.635"}, {"country": "Costa Rica", "co2": "1.63"}, {"country": "Cote d'Ivoire", "co2": "0.49"}, {"country": "Croatia", "co2": "3.96"}, {"country": "Cuba", "co2": "3.05"}, {"country": "Cyprus", "co2": "5.26"}, {"country": "Czech Republic", "co2": "9.1"}, {"country": "Denmark", "co2": "5.91"}, {"country": "Djibouti", "co2": "0.792"}, {"country": "Dominica", "co2": "1.86"}, {"country": "Dominican Republic", "co2": "2.07"}, {"country": "Ecuador", "co2": "2.76"}, {"country": "Egypt", "co2": "2.2"}, {"country": "El Salvador", "co2": "1"}, {"country": "Equatorial Guinea", "co2": "4.73"}, {"country": "Eritrea", "co2": "0.147"}, {"country": "Estonia", "co2": "14.8"}, {"country": "Ethiopia", "co2": "0.119"}, {"country": "Fiji", "co2": "1.32"}, {"country": "Finland", "co2": "8.66"}, {"country": "France", "co2": "4.72"}, {"country": "Gabon", "co2": "2.77"}, {"country": "Gambia", "co2": "0.268"}, {"country": "Georgia", "co2": "2.25"}, {"country": "Germany", "co2": "8.83"}, {"country": "Ghana", "co2": "0.537"}, {"country": "Greece", "co2": "5.98"}, {"country": "Grenada", "co2": "2.28"}, {"country": "Guatemala", "co2": "1.15"}, {"country": "Guinea", "co2": "0.207"}, {"country": "Guinea Bissau", "co2": "0.157"}, {"country": "Guyana", "co2": "2.63"}, {"country": "Haiti", "co2": "0.271"}, {"country": "Honduras", "co2": "1.08"}, {"country": "Hungary", "co2": "4.29"}, {"country": "Iceland", "co2": "6.04"}, {"country": "India", "co2": "1.73"}, {"country": "Indonesia", "co2": "1.82"}, {"country": "Iran", "co2": "8.28"}, {"country": "Iraq", "co2": "4.81"}, {"country": "Ireland", "co2": "7.27"}, {"country": "Israel", "co2": "8.13"}, {"country": "Italy", "co2": "5.38"}, {"country": "Jamaica", "co2": "2.59"}, {"country": "Japan", "co2": "9.47"}, {"country": "Jordan", "co2": "3"}, {"country": "Kazakhstan", "co2": "14.2"}, {"country": "Kenya", "co2": "0.31"}, {"country": "Kiribati", "co2": "0.564"}, {"country": "Kuwait", "co2": "25.2"}, {"country": "Kyrgyz Republic", "co2": "1.66"}, {"country": "Lao", "co2": "0.297"}, {"country": "Latvia", "co2": "3.46"}, {"country": "Lebanon", "co2": "4.3"}, {"country": "Lesotho", "co2": "1.15"}, {"country": "Liberia", "co2": "0.213"}, {"country": "Libya", "co2": "9.19"}, {"country": "Liechtenstein", "co2": "1.19"}, {"country": "Lithuania", "co2": "4.33"}, {"country": "Luxembourg", "co2": "17.4"}, {"country": "Macedonia, FYR", "co2": "3.61"}, {"country": "Madagascar", "co2": "0.13"}, {"country": "Malawi", "co2": "0.0748"}, {"country": "Malaysia", "co2": "8.03"}, {"country": "Maldives", "co2": "3.27"}, {"country": "Mali", "co2": "0.0832"}, {"country": "Malta", "co2": "5.51"}, {"country": "Marshall Islands", "co2": "1.94"}, {"country": "Mauritania", "co2": "0.667"}, {"country": "Mauritius", "co2": "3.36"}, {"country": "Mexico", "co2": "3.87"}, {"country": "Micronesia, Fed. Sts.", "co2": "1.45"}, {"country": "Moldova", "co2": "1.21"}, {"country": "Mongolia", "co2": "7.13"}, {"country": "Montenegro", "co2": "3.52"}, {"country": "Morocco", "co2": "1.74"}, {"country": "Mozambique", "co2": "0.31"}, {"country": "Myanmar", "co2": "0.417"}, {"country": "Namibia", "co2": "1.58"}, {"country": "Nauru", "co2": "4.31"}, {"country": "Nepal", "co2": "0.284"}, {"country": "Netherlands", "co2": "9.91"}, {"country": "New Zealand", "co2": "7.59"}, {"country": "Nicaragua", "co2": "0.809"}, {"country": "Niger", "co2": "0.111"}, {"country": "Nigeria", "co2": "0.546"}, {"country": "North Korea", "co2": "1.61"}, {"country": "Norway", "co2": "9.27"}, {"country": "Oman", "co2": "15.4"}, {"country": "Pakistan", "co2": "0.896"}, {"country": "Palau", "co2": "12.3"}, {"country": "Palestine", "co2": "0.626"}, {"country": "Panama", "co2": "2.25"}, {"country": "Papua New Guinea", "co2": "0.815"}, {"country": "Paraguay", "co2": "0.87"}, {"country": "Peru", "co2": "1.99"}, {"country": "Philippines", "co2": "1.06"}, {"country": "Poland", "co2": "7.46"}, {"country": "Portugal", "co2": "4.3"}, {"country": "Qatar", "co2": "45.4"}, {"country": "Romania", "co2": "3.5"}, {"country": "Russia", "co2": "11.9"}, {"country": "Rwanda", "co2": "0.074"}, {"country": "Samoa", "co2": "1.03"}, {"country": "Sao Tome and Principe", "co2": "0.594"}, {"country": "Saudi Arabia", "co2": "19.5"}, {"country": "Senegal", "co2": "0.609"}, {"country": "Republic of Serbia", "co2": "4.24"}, {"country": "Seychelles", "co2": "5.31"}, {"country": "Sierra Leone", "co2": "0.185"}, {"country": "Singapore", "co2": "10.3"}, {"country": "Slovak Republic", "co2": "5.65"}, {"country": "Slovenia", "co2": "6.19"}, {"country": "Solomon Islands", "co2": "0.35"}, {"country": "Somalia", "co2": "0.045"}, {"country": "South Africa", "co2": "8.98"}, {"country": "South Korea", "co2": "11.7"}, {"country": "South Sudan", "co2": "0.13"}, {"country": "Spain", "co2": "5.03"}, {"country": "Sri Lanka", "co2": "0.892"}, {"country": "St. Kitts and Nevis", "co2": "4.3"}, {"country": "St. Lucia", "co2": "2.31"}, {"country": "St. Vincent and the Grenadines", "co2": "1.91"}, {"country": "Sudan", "co2": "0.407"}, {"country": "Suriname", "co2": "3.63"}, {"country": "Swaziland", "co2": "0.929"}, {"country": "Sweden", "co2": "4.48"}, {"country": "Switzerland", "co2": "4.29"}, {"country": "Syria", "co2": "1.6"}, {"country": "Tajikistan", "co2": "0.62"}, {"country": "United Republic of Tanzania", "co2": "0.221"}, {"country": "Thailand", "co2": "4.62"}, {"country": "Timor-Leste", "co2": "0.387"}, {"country": "Togo", "co2": "0.363"}, {"country": "Tonga", "co2": "1.14"}, {"country": "Trinidad and Tobago", "co2": "34.2"}, {"country": "Tunisia", "co2": "2.59"}, {"country": "Turkey", "co2": "4.49"}, {"country": "Turkmenistan", "co2": "12.5"}, {"country": "Tuvalu", "co2": "1.01"}, {"country": "Uganda", "co2": "0.135"}, {"country": "Ukraine", "co2": "5.06"}, {"country": "United Arab Emirates", "co2": "23.3"}, {"country": "United Kingdom", "co2": "6.46"}, {"country": "United States of America", "co2": "16.5"}, {"country": "Uruguay", "co2": "1.97"}, {"country": "Uzbekistan", "co2": "3.45"}, {"country": "Vanuatu", "co2": "0.595"}, {"country": "Venezuela", "co2": "6.03"}, {"country": "Vietnam", "co2": "1.8"}, {"country": "Yemen", "co2": "0.865"}, {"country": "Zambia", "co2": "0.288"}, {"country": "Zimbabwe", "co2": "0.78"}];
      // console.log(chart.data)
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
      series.dataFields.valueY = "co2";
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
      <div id="chartdivBis" style={{ width: "100%", height: "50%" }} />
    );
  }
}
