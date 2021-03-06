import React from 'react';
import styled from 'styled-components';
import InputRange from 'react-input-range';
import './slider.css';

const Container = styled.div`
  padding: 10px;
  margin: 10px;
`;

export default class Slider extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      range: this.props.range,
    };
  }

  change = range => {
    range.min = Math.max(range.min, this.props.range.min);
    range.max = Math.min(range.max, this.props.range.max);
    this.props.select(range.min, range.max);
    this.setState({range});
  };

  render() {
    return (
      <Container>
        {this.props.range === undefined ? undefined :
          <InputRange
            draggableTrack
            minValue={this.props.range.min}
            maxValue={this.props.range.max}
            value={this.state.range === undefined ? this.props.range : this.state.range}
            onChange={this.change}
            // onChangeComplete={range => this.props.select(range.min, range.max)}
          />
        }
      </Container>
    )
  }
}