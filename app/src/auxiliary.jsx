import React from 'react';
import { Title } from './styles';

export default class Auxiliary extends React.Component {

  render() {
    return (<>
      <Title>{this.props.region}</Title>
    </>)
}
}