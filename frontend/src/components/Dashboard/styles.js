import styled from "styled-components";

export const DashboardWrapper = styled.div`
  height: 100vh;
  width: 100%;
`;
export const DashboardEmptyWrapper = styled.div`
  height: 100vh;
  width: 100%;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
`;

export const LogoWrapper = styled.div`
  display: flex;
  flex-direction: row;
  height: 40px;
  background: rgba(255, 255, 255, 0.2);
  margin: 16px;

  span {
    line-height: 40px;
    margin-left: 10px;
  }
`;

export const RoomWrapper = styled.div`
  width: 100%;
  min-height: 100%;
  display: flex;
  flex-direction: column;
  color: #000000;
  align-items: center;
  justify-content: center;
`;

export const UsersWrapper = styled.div`
  margin-top: 50px;
  width: 100%;
  min-height: 100%;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;

  ul {
    width: 80%;

    li {
      color: white;
    }
  }
`;
