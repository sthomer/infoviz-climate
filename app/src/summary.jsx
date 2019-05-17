import React from 'react';
import styled from 'styled-components';
import '../node_modules/react-vis/dist/style.css';
import {
  RadarChart,
  CircularGridLines,
  makeVisFlexible
} from 'react-vis';

const Container = styled.div``;

const Title = styled.h1`
  text-align: center;
  whitespace: nowrap;
`;

const indexRange = (dataset, dateRange) => {
  const range = [
    dataset.dates.findIndex(date => Number(date) === dateRange[0]),
    dataset.dates.findIndex(date => Number(date) === dateRange[1]),
  ];
  range[0] = range[0] >= 0 ? range[0] : 0;
  range[1] = range[1] >= 0 ? range[1] : dataset.dates.length;
  if (range[0] === range[1]) {
    range[0] = 0;
    range[1] = dataset.dates.length;
  }
  return range;
};

export default class Summary extends React.Component {

  // load = () => {
  //   this.domains = Object.entries(this.props.datasets).map(dataset => {
  //     const range = indexRange(dataset[1], this.props.range);
  //     const all = Object.values(dataset[1]).slice(1)
  //       .flatMap(region => region.slice(range[0], range[1]))
  //       .map(s => Number(s));
  //     const domain = [Math.min(...all), Math.max(...all)];
  //     return {name: dataset[0], domain: domain}
  //   });
  //
  //   this.data = {};
  //   Object.entries(this.props.datasets).map(dataset => {
  //     const range = indexRange(dataset[1], this.props.range);
  //     const region = dataset[1][this.props.region];
  //     if (region !== undefined) {
  //       const values = region.slice(range[0], range[1]);
  //       const avg = values.reduce((x, y) => Number(x) + Number(y)) / values.length;
  //       this.data[dataset[0]] = avg;
  //     }
  //   });
  //   debugger;
  // };

  render() {
    return (
      <Container>
        {/*<Title>*/}
        {/*  {this.props.selected}*/}
        {/*</Title>*/}
        <Title>
          {this.props.hover}
        </Title>
      </Container>
    );
  }
}

