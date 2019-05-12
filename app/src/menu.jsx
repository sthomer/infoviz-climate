import React from 'react';
import * as d3 from 'd3';
import styled from 'styled-components';
import {Title} from './styles';
import {Dropdown, DropdownButton} from 'react-bootstrap';

const Container = styled.div`
  padding: 8px;
`;

export default class Menu extends React.Component {

  render() {
    return (
      <Container>
        <DropdownButton
          title={this.props.items.find(item => item.id === this.props.active).content}
          variant={'outline-secondary'}
          drop={this.props.direction}
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
      </Container>
    )
  }
}