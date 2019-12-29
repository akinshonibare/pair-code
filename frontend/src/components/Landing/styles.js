import styled from "styled-components";

export const LandingWrapper = styled.div`
  min-height: 100vh;
  width: 100%;

  display: grid;
  grid-template-columns: 1fr 1fr;
  overflow-y: auto;
  grid-gap: 20px;
`;

export const LeftContainer = styled.div`
  padding: 10%;
  color: #000000;
  background-color: #21212a;
  display: flex;
  align-items: center;
  justify-content: center;
  flex-direction: column;
`;

export const RightContainer = styled.div`
  padding: 10%;
  ${"" /* color: #000000;
  background-color: #21212a; */}
  display: flex;
  align-items: center;
  justify-content: center;
  flex-direction: column;
  img {
    width: 80%;
    padding: 20px;
  }
`;

export const Footer = styled.div`
  text-align: center;
`;

export const Header = styled.h1`
  color: #FFFFFF;
`;

export const Description = styled.p`
  color: #FFFFFF;
`;
