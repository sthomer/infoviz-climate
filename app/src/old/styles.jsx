import styled from 'styled-components';

export const Container = styled.div`
  margin: 8px;
  padding: 8px;
  border: 1px solid lightgrey;
  border-radius: 2px;
  background-color: white;
`;

export const Title = styled.h1`
  white-space: nowrap;
`;

export const Heading = styled.h4`
  white-space: nowrap;
`;

export const Button = styled.button`
  background-color: ${props => props.selected ? 'lightgray' : 'inherit'};
  color: ${props => props.selected ? 'white' : 'inherit'};
  border: 1px solid lightgrey;
  border-radius: 2px;
  margin: 0px 4px 0px 4px;
  padding: 8px;
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