import styled from "@emotion/styled";

export const HomeContainer = styled.div`
  width: 100%;
  height: 100vh;
`;

export const Header = styled.header`
  width: 100%;
  height: 8rem;
  text-align: center;
`;

export const ProfileWrapper = styled.div`
  width: 250px;
  height: 500px;
  overflow-y: scroll;
  gap: 5px;
  margin: 0 auto;
`;

export const ProfileBox = styled.div`
  width: 200px;
  height: 4rem;
  background-color: greenyellow;
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 0 1rem;
  margin-bottom: 1rem;
  cursor: pointer;
  span {
  }
`;
