import React from 'react';
import '@atlaskit/css-reset';
import {data} from './state';
import styled from 'styled-components';
import Navigation from './navigation';
import Info from './info';
import Spec from './spec';
import Auxiliary from './auxiliary';
import Timelines from './timelines';
import Menu from './menu';
import Map from './imap';


const GrowOuter = styled.div`
  display: flex;
  flex-direction: column;
  height: 100%;
`;

const GrowInner = styled.div`
  flex: 1 1 auto;
  margin: 8px;
  padding: 8px;
  border: 1px solid lightgrey;
  border-radius: 2px;
  background-color: white;
  overflow: auto;
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
    return (
      <GrowOuter>
        <Navigation
          onSelect={this.onViewSelect}
          selected={this.state.view}
          items={this.state.views}
        />
        <GrowInner>
          {this.state.view === 'info' ? <Info/> : undefined}
          {this.state.view === 'spec' ? <Spec/> : undefined}
          {this.state.view === 'map' ? <Map data={this.state.data}/> : undefined}
          {this.state.view === 'aux' ? <Auxiliary/> : undefined}
          {this.state.view === 'time' ? <Timelines/> : undefined}
          {this.state.view === 'menu' ? <Menu load={this.onDataLoad}/> : undefined}
        </GrowInner>
      </GrowOuter>
    );
  }
}
