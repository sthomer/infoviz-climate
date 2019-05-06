import React from 'react';
import * as d3 from 'd3';
import styled from 'styled-components';
import {Title} from './styles';
import temps from './data/sample_temp.csv'

export default class Menu extends React.Component {

  render() {
    d3.csv(temps).then(data => this.props.load({
      temperatures: data.reduce((acc, t) => {
        acc[t.name] = Number(t.temp);
        return acc;
      }, {})
    }));
    return (<>
      <Title>Menu</Title>
    </>)
  }
}