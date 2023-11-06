import styled, { keyframes } from 'styled-components'

export const blinkAnimation = keyframes`

  0% {
    opacity: 0;
  }
  50% {
    opacity: 1;
  }
  100%{
    opacity: 0;
  }

`

export const CountdownContainer = styled.div`
  font-family: 'Roboto Mono', monospace;
  font-size: 10rem;
  line-height: 8rem;
  color: var(--gray-100);
  display: flex;
  gap: 1rem;
  @media (max-width: 768px) {
    font-size: 3rem;
    padding: 20px;
  }
  span {
    background: var(--gray-700);
    padding: 2rem 1rem;
    border-radius: 8px;
  }

  .separator {
    line-height: 8rem;
    padding: 2rem 1rem;
    font-family: 'Roboto Mono', monospace;
    color: var(--white);
    width: 4rem;
    overflow: hidden;
    display: flex;
    justify-content: center;
    align-items: center;
    &.is-running {
      animation: ${blinkAnimation} 1s linear infinite;
    }
  }

  &.is-minimal {
    padding: 10px 0px;
    font-size: 2rem;
    gap: 0.3rem;
    width: 100%;
    line-height: 0rem;

    span {
      background: var(--gray-400);
      padding: 2rem 1rem;
    }

    .separator {
      line-height: 0rem;
      padding: 2rem 0;
      color: var(--gray-300);
      width: 1rem;
    }
  }
`
