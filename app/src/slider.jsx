import React from 'react';
import styled from 'styled-components';
import InputRange from 'react-input-range';
import 'react-input-range/lib/css/index.css';

const Container = styled.div`
  padding: 10px;
  margin: 10px;
`;

export default class Slider extends React.Component {
  state = {
    range: this.props.range,
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
            onChange={range => {
              this.props.select(range.min, range.max);
              this.setState({range});
            }}
            // onChangeComplete={range => this.props.select(range.min, range.max)}
          />
        }
      </Container>
    )
  }
}