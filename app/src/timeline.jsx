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

  constructor(props) {
    super(props);
    this.state = {
      crosshairValues: []
    };
  }

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
      <Container>
        {this.primary === undefined ?
          <Center>{this.props.namePrimary} data unavailable for {this.props.region}</Center> :
          <Left>
            <FlexibleXYPlot key={'left'} margin={{left: 80, right: 80}}
                            xDomain={this.props.range} onMouseLeave={() => this.setState({crosshairValues: []})}>
              <HorizontalGridLines/>
              <XAxis title={this.props.region} tickFormat={year => year}/>
              <YAxis title={this.props.namePrimary}/>
              <LineSeries
                data={this.primary}
                stroke={colors.primary}
              />
            </FlexibleXYPlot>
          </Left>}
        {this.secondary === undefined ?
          <Center>{this.props.nameSecondary} data unavailable for {this.props.region}</Center> :
          <Right>
            <FlexibleXYPlot key={'right'} margin={{left: 80, right: 80}}
                            xDomain={this.props.range} onMouseLeave={() => this.setState({crosshairValues: []})}>
              <XAxis tickFormat={year => year}/>
              <YAxis orientation={'right'} title={this.props.nameSecondary}/>
              {this.primary === undefined ? <HorizontalGridLines/> : undefined}
              <LineSeries
                data={this.secondary}
                stroke={colors.secondary}
                // onNearestX={(value, { index }) =>
                //   this.setState({
                //     crosshairValues: [
                //       { x: this.primary[index].x == undefined ? '-' : this.primary[index].x, y: this.primary[index].y == undefined ? '-' : this.primary[index].y },
                //       { x: this.primary[index].x == undefined ? '-' : this.primary[index].x, y: this.secondary[index].y == undefined ? '-' : this.secondary[index].y }
                //     ]
                //   }
                //   )}
              />
              {/* <Crosshair values={this.state.crosshairValues}
                titleFormat={(d) => ({ title: 'Year', value: d[0].x })}
                itemsFormat={(d) => [{ title: this.props.namePrimary, value: d[0].y }, { title: this.props.nameSecondary, value: d[1].y }]}
              /> */}
            </FlexibleXYPlot>
          </Right>}
      </Container>
    )
  }
}
