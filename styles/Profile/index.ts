import styled from "@emotion/styled";

export const ProfileContainer = styled.div`
  width: 100%;
  height: 100vh;
  display: flex;
  justify-content: center;
  align-items: center;
`;

export const InfoWrapper = styled.div`
  width: 400px;
  height: 400px;
  background-color: greenyellow;
  display: flex;
  flex-direction: column;
  align-items: center;
  padding: 2rem 0;
  border-radius: 1rem;
  span {
    margin-top: 2rem;
    font-size: 20px;
    font-weight: 600;
  }
`;
