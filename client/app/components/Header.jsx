import React from 'react';
import styled from 'styled-components';

const Container = styled.header`
  margin: 0;
  padding: 0;
  background-color: rgb(0,102,204);
`;

const Title = styled.h1`
  margin: auto;
  padding: 0;
  color: white;
  text-align: center;
`;

const Header = () => {
  return (
    <Container>
      <Title>FullCalendar IO</Title>
    </Container>
  );
};

export default Header;
