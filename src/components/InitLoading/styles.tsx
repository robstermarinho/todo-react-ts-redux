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
  height: 100vh;
  border: 1px solid red;
  justify-content: center;
  h1 {
    font-size: 20px;
    color: var(--blue-dark);
    animation: ${upAndDown} 1s infinite;
  }
`
