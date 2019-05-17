import React from 'react';
import styled from 'styled-components';
import '../node_modules/react-vis/dist/style.css';
import {
  FlexibleXYPlot,
  HorizontalRectSeries,
  XAxis,
} from 'react-vis';
import {colors} from './colors';

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

  load = () => {

    this.primary = Object.entries(this.props.avgPrimary)
      .sort((x, y) => Number(x[1]) - Number(y[1]))
      .map((entry, index) => ({
        x0: 0, x: -entry[1],
        y0: index - 1, y: index,
        label: entry[0],
        color: Number(entry[0] !== this.props.hoverRegion
          && entry[0] !== this.props.region) ? 0 : 1,
      }));

    this.secondary = Object.entries(this.props.avgSecondary)
      .sort((x, y) => x[1] - y[1])
      .map(entry => {
        const index = this.primary.findIndex(primary => primary.label === entry[0]);
        return {
          x0: 0, x: entry[1],
          y0: index - 1, y: index,
          label: entry[0],
          color: Number(entry[0] !== this.props.hoverRegion
            && entry[0] !== this.props.region) ? 0 : 1,
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
            <FlexibleXYPlot colorRange={[colors.primary, colors.tertiary]}>
              <HorizontalRectSeries
                data={this.primary}
                onNearestXY={data => this.hover(data, data.y)}
                // fill={colors.primary}
                stroke={'none'}
              />
            </FlexibleXYPlot>
          </Left>
          <Right>
            <Header>{this.props.nameSecondary}</Header>
            <FlexibleXYPlot colorRange={[colors.secondary, colors.tertiary]}>
              <HorizontalRectSeries
                data={this.secondary}
                onNearestXY={data => this.hover(data, data.y)}
                // fill={colors.secondary}
                stroke={'none'}
              />
            </FlexibleXYPlot>
          </Right>
        </Underlay>
      </Container>
    )
  }
}
