import React from 'react';
import styled from 'styled-components';
import {Dropdown, DropdownButton} from 'react-bootstrap';

const Container = styled.div`
  padding: 8px;
`;

export default class Menu extends React.Component {

  componentDidMount() {
    this.props.select(this.props.active)
  }

  render() {
    return (
      <Container>
        <DropdownButton
          title={this.props.datasets[this.props.active]}
          variant={'light'}
          drop={this.props.direction}
        >
          {Object.keys(this.props.datasets).map(item =>
            <Dropdown.Item
              key={item}
              eventKey={item}
              onSelect={this.props.select}
              active={this.props.active === item ? 'active' : undefined}
            >
              {this.props.datasets[item]}
            </Dropdown.Item>
          )}
        </DropdownButton>
      </Container>
    )
  }
}