import React from 'react';
import '@atlaskit/css-reset';
import { data } from './state';
import styled from 'styled-components';
import Info from './info';
import Spec from './spec';
import Map from './map';
import Navigation from './navigation';

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

  views = {
    'info': <Info />,
    'spec': <Spec />,
    'map': <Map />,
  }

  onViewSelect = id => this.setState(state => ({
    ...state,
    view: id,
  }))

  render() {
    return (
      <GrowOuter>
        <Navigation 
          onSelect={this.onViewSelect} 
          selected={this.state.view}
          items={this.state.views}
        />
        <GrowInner>
          {this.views[this.state.view]}
        </GrowInner>
      </GrowOuter>
    );
  }
}
