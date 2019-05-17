import React from 'react';
import styled from 'styled-components';
import '../node_modules/react-vis/dist/style.css';
import {
  FlexibleXYPlot,
  HorizontalRectSeries,
  XAxis,
} from 'react-vis';

const Container = styled.div`
  width: 100%;
  height: 100%;
  position: relative;
`;

const Left = styled.div`
  width: 50%;
  height: 100%;
  z-index: 100;
`;

const Right = styled.div`
  width: 50%;
  height: 100%;
`;

const Underlay = styled.div`
  width: 100%;
  height: 100%;
  display: flow;
  position: absolute;
  top: 0px;
`;

const Overlay = styled.div`
  width: 100%;
  height: 100%;
  position: absolute;
  top: 0px;
  g {
    transform: translate(0,0)
  }
`;

const Header = styled.div`
  text-align: center;
`;

export default class Doublebar extends React.Component {
  state = {};

  load = props => {
    const primaryRange = [
      this.props.primary.dates.findIndex(date => Number(date) === this.props.range[0]),
      this.props.primary.dates.findIndex(date => Number(date) === this.props.range[1]),
    ];
    primaryRange[0] = primaryRange[0] >= 0 ? primaryRange[0] : 0;
    primaryRange[1] = primaryRange[1] >= 0 ? primaryRange[1] : this.props.primary.dates.length;

    const secondaryRange = [
      this.props.secondary.dates.indexOf(this.props.range[0]),
      this.props.secondary.dates.indexOf(this.props.range[1]),
    ];
    secondaryRange[0] = secondaryRange[0] >= 0 ? secondaryRange[0] : 0;
    secondaryRange[1] = secondaryRange[1] >= 0 ? secondaryRange[1] : this.props.secondary.dates.length;

    this.primary = {};
    Object.keys(this.props.primary).slice(1).map(region => {
      const values = this.props.primary[region].slice(primaryRange[0], primaryRange[1]);
      this.primary[region] = values.reduce((x, y) => Number(x) + Number(y)) / values.length
    });

    this.primary = Object.entries(this.primary).sort((x, y) => Number(x[1]) - Number(y[1]))
      .map((entry, index) => ({
        x0: 0, x: -entry[1],
        y0: index - 1, y: index,
        label: entry[0],
        // color: Number(index !== this.state.index),
        color: Number(entry[0] !== this.props.hoverRegion && entry[0] !== this.props.region),
      }));

    this.secondary = {};
    Object.keys(this.props.secondary).slice(1).map(region => {
      const values = this.props.secondary[region].slice(secondaryRange[0], secondaryRange[1]);
      this.secondary[region] = values.reduce((x, y) => Number(x) + Number(y)) / values.length
    });

    this.secondary = Object.entries(this.secondary).sort((x, y) => x[1] - y[1])
      .map(entry => {
        const index = this.primary.findIndex(primary => primary.label === entry[0]);
        return {
          x0: 0, x: entry[1],
          y0: index - 1, y: index,
          label: entry[0],
          // color: Number(index !== this.state.index),
          color: Number(entry[0] !== this.props.hoverRegion && entry[0] !== this.props.region),
        }
      });
  };

  hover = (data, index) => {
    this.props.hover(data.label);
    this.setState(state => ({
      ...state,
      value: data,
      index: index,
    }));
  };

  render() {
    this.load(this.props);
    return (
      <Container>
        <Underlay>
          <Left>
            <Header>{this.props.namePrimary}</Header>
            <FlexibleXYPlot>
              <HorizontalRectSeries
                data={this.primary}
                onNearestXY={data => this.hover(data, data.y)}
              />
            </FlexibleXYPlot>
          </Left>
          <Right>
            <Header>{this.props.nameSecondary}</Header>
            <FlexibleXYPlot>
              <HorizontalRectSeries
                data={this.secondary}
                onNearestXY={data => this.hover(data, data.y)}
              />
            </FlexibleXYPlot>
          </Right>
        </Underlay>
      </Container>
    )
  }
}
