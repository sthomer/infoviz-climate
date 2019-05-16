import React from 'react';
import styled from 'styled-components';
import 'react-input-range/lib/css/index.css';
import '../node_modules/react-vis/dist/style.css';
import {
  FlexibleXYPlot,
  XAxis,
  YAxis,
  HorizontalGridLines,
  LineSeries,
  Borders,
} from 'react-vis';

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
        this.props.primary.dates.indexOf(this.props.range[0]),
        this.props.primary.dates.indexOf(this.props.range[1]),
      ];
      primaryRange[0] = primaryRange[0] >= 0 ? primaryRange[0] : 0;
      primaryRange[1] = primaryRange[1] >= 0 ? primaryRange[1] : this.props.primary.dates.length;

      const secondaryRange = [
        this.props.secondary.dates.indexOf(this.props.range[0]),
        this.props.secondary.dates.indexOf(this.props.range[1]),
      ];
      secondaryRange[0] = secondaryRange[0] >= 0 ? secondaryRange[0] : 0;
      secondaryRange[1] = secondaryRange[1] >= 0 ? secondaryRange[1] : this.props.secondary.dates.length;

      const primaryRegion = props.primary[props.region];
      this.primary = primaryRegion === undefined ? undefined :
        primaryRegion.slice(primaryRange[0], primaryRange[1])
          .map((value, index) => ({x: props.primary.dates[index], y: Number(value)}));
      const secondaryRegion = props.secondary[props.region];
      this.secondary = secondaryRegion === undefined ? undefined :
        secondaryRegion.slice(secondaryRange[0], secondaryRange[1])
          .map((value, index) => ({x: props.secondary.dates[index], y: Number(value)}));

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
              <YAxis/>
              <LineSeries data={this.primary}/>
            </FlexibleXYPlot>
          </Left>
          <Right>
            <FlexibleXYPlot key={'right'} margin={{left: 80, right: 80}}
                            xDomain={this.props.range}>
              <XAxis tickFormat={year => year}/>
              <YAxis orientation={'right'}/>
              <LineSeries data={this.secondary}/>
            </FlexibleXYPlot>
          </Right>
        </Container>
    )
  }
}
