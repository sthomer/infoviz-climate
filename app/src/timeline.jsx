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
import {colors} from './colors';

const Container = styled.div`
  width: 100%;
  height: 80%;
  position: relative;
`;

const Left = styled.div`
  width: 100%;
  height: 100%;
  position: absolute; 
  top: 0px;
`;

const Right = styled.div`
  width: 100%;
  height: 100%;
  position: absolute; 
  top: 0px;
`;

const Center = styled.div`
  text-align: center;
`;

export default class Timeline extends React.Component {

  load = props => {

    if (props.region === undefined) {
      this.primary = undefined;
      this.secondary = undefined;

    } else {
      const primaryRange = [
        props.primary.dates.indexOf(props.range[0]),
        props.primary.dates.indexOf(props.range[1]),
      ];
      primaryRange[0] = primaryRange[0] >= 0 ? primaryRange[0] : 0;
      primaryRange[1] = primaryRange[1] >= 0 ? primaryRange[1] : props.primary.dates.length;

      const secondaryRange = [
        props.secondary.dates.indexOf(props.range[0]),
        props.secondary.dates.indexOf(props.range[1]),
      ];
      secondaryRange[0] = secondaryRange[0] >= 0 ? secondaryRange[0] : 0;
      secondaryRange[1] = secondaryRange[1] >= 0 ? secondaryRange[1] : props.secondary.dates.length;

      const primaryRegion = props.primary[props.region];
      this.primary = primaryRegion === undefined ? undefined :
        primaryRegion.slice(primaryRange[0], primaryRange[1])
          .map((value, index) => ({x: props.primary.dates[index], y: Number(value)}));
      const secondaryRegion = props.secondary[props.region];
      this.secondary = secondaryRegion === undefined ? undefined :
        secondaryRegion.slice(secondaryRange[0], secondaryRange[1])
          .map((value, index) => ({x: props.secondary.dates[index], y: Number(value)}));

      // const allPrimary = Object.values(props.primary)
      //   .flatMap(region => region.slice(primaryRange[0], primaryRange[1]))
      //   .map(s => Number(s));
      // this.primaryDomain = [Math.min(...allPrimary), Math.max(...allPrimary)];
      //
      // const allSecondary = Object.values(props.secondary)
      //   .flatMap(region => region.slice(secondaryRange[0], secondaryRange[1]))
      //   .map(s => Number(s));
      // this.secondaryDomain = [Math.min(...allSecondary), Math.max(...allSecondary)];
    }
  };

  render() {
    this.load(this.props);
    return (
      this.primary === undefined || this.secondary === undefined
        ? <Center>Data unavailable for this country</Center> :
        <Container>
          <Left>
            <FlexibleXYPlot key={'left'} margin={{left: 80, right: 80}}
                            xDomain={this.props.range}>
              <HorizontalGridLines/>
              <XAxis tickFormat={year => year}/>
              <YAxis title={this.props.namePrimary}/>
              <LineSeries
                data={this.primary}
                stroke={colors.primary}
              />
            </FlexibleXYPlot>
          </Left>
          <Right>
            <FlexibleXYPlot key={'right'} margin={{left: 80, right: 80}}
                            xDomain={this.props.range}>
              <XAxis tickFormat={year => year}/>
              <YAxis orientation={'right'} title={this.props.nameSecondary}/>
              <LineSeries
                data={this.secondary}
                stroke={colors.secondary}
              />
            </FlexibleXYPlot>
          </Right>
        </Container>
    )
  }
}
