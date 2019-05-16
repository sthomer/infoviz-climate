import React from 'react';
import styled from 'styled-components';
import '../node_modules/react-vis/dist/style.css';
import {
  FlexibleXYPlot,
  XAxis,
  YAxis,
  HorizontalGridLines,
  LineSeries,
  Borders,
} from 'react-vis';

const Title = styled.h1`
  text-align: center;
`;

export default class Summary extends React.Component {
  render() {
    return (
      <Title>{this.props.name}</Title>
    );
  }
}
