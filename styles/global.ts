import { css } from "@emotion/react";

export const global = css`
  * {
    margin: 0;
    padding: 0;
  }
  body {
    background-color: skyblue;
  }
  &::-webkit-scrollbar {
    width: 4px;
    height: 5px;
    border-radius: 5px;
  }
  &::-webkit-scrollbar-thumb {
    background: #5f99ff;
    border-radius: 5px;
  }
`;
