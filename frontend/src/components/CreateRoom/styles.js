import styled from "styled-components";

export const RoomButton = styled.div`
  position: relative;
  overflow: hidden;
  margin-left: 0 !important;
  margin-right: 0 !important;
`;

export const RoomButtonInput = styled.input`
  position: absolute;
  top: 0;
  right: 0;
  min-width: 100%;
  min-height: 100%;
  font-size: 100px;
  text-align: right;
  filter: alpha(opacity=0);
  opacity: 0;
  outline: none;
  cursor: inherit;
  display: block;
`;
