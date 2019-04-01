import React from 'react';
import 'bootstrap/dist/css/bootstrap-reboot.css';
import { Title, Container } from './styles';
import Info from './info';

export default class App extends React.Component {
  render() {
    return (
      <Container>
        <Title>Exploring Climate Change</Title>
        <Info/>
      </Container>
    );
  }
}
