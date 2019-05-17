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
  Crosshair,
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
      const primaryRegion = this.props.primary[this.props.region];
      this.primary = primaryRegion === undefined ? undefined : primaryRegion
          .map((value, index) => ({x: this.props.primary.dates[index], y: Number(value)}));
      const secondaryRegion = this.props.secondary[this.props.region];
      this.secondary = secondaryRegion === undefined ? undefined : secondaryRegion
          .map((value, index) => ({x: this.props.secondary.dates[index], y: Number(value)}));

      // const allPrimary = Object.values(props.primary)
      //   .flatMap(region => region.slice(primaryRange[0], primaryRange[1]))
      //   .map(s => Number(s));
      // this.primaryDomain = [Math.min(...allPrimary), Math.max(...allPrimary)];
      //
      // const allSecondary = Object.values(props.secondary)
      //   .flatMap(region => region.slice(secondaryRange[0], secondaryRange[1]))
      //   .map(s => Number(s));
      // this.secondaryDomain = [Math.min(...allSecondary), Math.max(...allSecondary)];
    // }
  };

  render() {
    this.load();
    return (
      this.primary === undefined || this.secondary === undefined
        ? <Center>Data unavailable for this country</Center> :
        <Container>
          <Left>
            <FlexibleXYPlot key={'left'} margin={{left: 80, right: 80}}
                            xDomain={this.props.range}>
              <HorizontalGridLines/>
              <XAxis title={this.props.region} tickFormat={year => year}/>
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
