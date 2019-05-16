import React from 'react';
import { Container, Button, Title } from './styles';
import styled from 'styled-components';

const Spread = styled.div`
  display: flex;
  justify-content: space-between;
`;

export default class Navigation extends React.Component {
  render() {
    return (
      <Container>
        <Spread>
          <Title>Exploring Climate Change</Title>
          <div>
            {this.props.items.map(item =>
              <Button
                key={item.id}
                selected={this.props.selected === item.id}
                onClick={() => this.props.onSelect(item.id)}
              >
                {item.content}
              </Button>
            )}
          </div>
        </Spread>
      </Container>
    )
  }
}
