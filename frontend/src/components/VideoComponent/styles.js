import styled from "styled-components";

export const VideoComponentWrapper = styled.div`
  width: 100%;
  height: 100%;
  display: flex;
  align-items: center;
  flex-direction: row;
  div{
      width: 100%;
      height: 100%;
  }
  button {
      margin: 0 10px;
  }
  video{
  height: 60px;
  width: 60px;
  border-radius: 50%;
  margin: 0 10px;
  }
`;
