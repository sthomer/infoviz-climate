import styled from 'styled-components';

export const Container = styled.div`
  margin: 8px;
  border: 1px solid lightgrey;
  border-radius: 2px;
  background-color: white;
`;

export const Title = styled.h1`
  padding: 8px;
  white-space: nowrap;
`;

export const Button = styled.button`
  background-color: ${props => props.selected ? 'lightgray' : 'inherit'};
  color: ${props => props.selected ? 'white' : 'inherit'};
  border: 1px solid lightgrey;
  border-radius: 2px;
  padding: 8px;
  margin: 8px;
  &:focus {
    outline: none;
  };
  &:hover {
    transition: background-color 0.2s ease;
    background-color: lightgray;
    color: white;
  };
  font-size: medium;
  font-weight: bold;
`;