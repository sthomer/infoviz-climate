import React from 'react';
import * as d3 from 'd3';
import styled from 'styled-components';
import {Title} from './styles';
import { Dropdown, DropdownButton } from 'react-bootstrap';

export default class Menu extends React.Component {

  render() {
    return (<>
      <DropdownButton
        title={'\u2630'}
        variant={'secondary'}
      >
        {this.props.items.map(item =>
          <Dropdown.Item
            key={item.id}
            eventKey={item.id}
            onSelect={this.props.select}
            active={this.props.active === item.id ? 'active' : undefined}
          >
            {item.content}
          </Dropdown.Item>
        )}
      </DropdownButton>
    </>)
  }
}