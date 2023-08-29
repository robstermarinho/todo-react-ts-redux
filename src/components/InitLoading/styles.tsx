import { styled, keyframes } from 'styled-components'

const upAndDown = keyframes`
    0% {
        transform: translateY(0px);
        opacity: 1;
    }
    50% {
        transform: translateY(-10px);
        opacity: 0.5;
    }
    100% {
        transform: translateY(0px);
        opacity: 1;
    }
`

export const Container = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  height: 100%;
  width: 100%;
  justify-content: center;
  position: absolute;
  background-color: rgba(15, 15, 15, 0.8);
  border-radius: 8px;

  h1 {
    font-size: 20px;
    color: var(--blue-dark);
    animation: ${upAndDown} 1s infinite;
  }
`
