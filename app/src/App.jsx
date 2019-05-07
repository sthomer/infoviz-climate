import React from 'react';
import '@atlaskit/css-reset';
import {data} from './state';
import styled from 'styled-components';
import Auxiliary from './auxiliary';
import Timelines from './timelines';
import Map from './imap';
import { PushButton } from './styles';


const Grid = styled.div`
  display: grid;
  overflow: hidden;
  width: 100vw;
  height: 100vh;
  justify-content: center;
  align-content: center;
  grid-template-rows: 60vh 40vh;
  grid-template-columns: 25vw 75vw;
  grid-template-areas: 
    "auxiliary map"
    "auxiliary timeline"; 
  grid-gap: 2px;
`;

const AuxiliaryPane = styled.div`
  grid-area: auxiliary;
  border: 1px solid lightgrey;
`;

const MapPane = styled.div`
  grid-area: map;
  border: 1px solid lightgrey;
  overflow: hidden;
`;

const TimelinesPane = styled.div`
  grid-area: timeline;
  border: 1px solid lightgrey;
`;

const Floating = styled.div`
  position: fixed;
  z-index: 100;
  top: 8px;
  right: 8px;
`;


export default class App extends React.Component {
  state = data;

  onViewSelect = id => this.setState(state => ({
    ...state,
    view: id,
  }));

  onDataLoad = data => this.setState(state => ({
    ...this.state,
    data: data,
  }));

  render() {
    return (<>
      <Grid>
        <AuxiliaryPane>
          <Auxiliary />
        </AuxiliaryPane>
        <MapPane>
          <Map data={this.state.data}/>
        </MapPane>
        <TimelinesPane>
          <Timelines/>
        </TimelinesPane>
      </Grid>
      <Floating>
        Button
      </Floating>
    </>);
  }
}
