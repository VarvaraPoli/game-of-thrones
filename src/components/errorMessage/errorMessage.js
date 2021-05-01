import React from 'react';
import styled from 'styled-components';

const Err = styled.span`
  color: red;
  font-weight: bold;
`
const ErrorMessage = () => {
  return <Err>Something goes wrong</Err>
}

export default ErrorMessage;