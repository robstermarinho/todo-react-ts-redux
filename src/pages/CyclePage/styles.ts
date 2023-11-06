import styled from 'styled-components'

export const CycleContainer = styled.main`
  flex: 1;

  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;

  form {
    @media (max-width: 768px) {
      padding: 20px;
    }
    gap: 2rem;
    display: flex;
    max-width: 46rem;
    align-items: center;
    width: 100%;
    margin-right: auto;
    margin-left: auto;
    flex-direction: column;
    margin-top: -2rem;
  }
  .todoHeader {
    display: flex;
    gap: 2rem;
    margin: 0px;
    width: 100%;
    a {
      display: flex;
      justify-content: flex-start;
      align-items: center;
      text-decoration: none;
      gap: 0.2rem;
      padding: 10px 0px;
      color: var(--gray-300);
      border-radius: 8px;
      transition: color 0.2s ease-in-out;
      cursor: pointer;
      &:hover {
        color: var(--blue);
      }
    }
    button {
      border: 0;
      background: transparent;

      display: flex;
      justify-content: flex-start;
      align-items: center;
      text-decoration: none;
      gap: 0.2rem;
      padding: 10px 0px;
      color: var(--gray-300);
      border-radius: 8px;
      transition: color 0.2s ease-in-out;
      cursor: pointer;
      &:hover {
        color: var(--blue);
        span {
          color: var(--blue);
        }
      }
    }
  }
`

export const BaseCountdownButton = styled.button`
  width: 100%;
  border: 0;
  padding: 1rem;
  border-radius: 4px;

  display: flex;
  align-items: center;
  justify-content: center;
  color: var(--gray-100);

  gap: 0.5rem;
  font-weight: bold;

  cursor: pointer;

  &:disabled {
    opacity: 0.7;
    cursor: not-allowed;
  }
`

export const StartCountdownButton = styled(BaseCountdownButton)`
  background: var(--blue);
  color: var(--gray-100);

  &:not(:disabled):hover {
    background: var(--blue-dark);
  }
`

export const StopCountdownButton = styled(BaseCountdownButton)`
  background: var(--danger);

  &:not(:disabled):hover {
    background: var(--danger-dark);
  }
`
