import styled from 'styled-components'

export const FormContainer = styled.div`
  width: 100%;
  display: flex;
  align-items: center;
  justify-content: center;

  color: var(--gray-300);
  font-size: 1.125rem;
  font-weight: bold;

  background-color: var(--gray-500);
  border-radius: 0.25rem;
  border: 1px solid var(--gray-700);
  padding: 0 1rem;

  width: 100%;
  height: 4rem;
  gap: 0.5rem;
`

const BaseInput = styled.input`
  background: transparent;
  height: 2.5rem;
  border: 0;
  border-bottom: 1px solid var(--gray-400);
  font-weight: bold;
  font-size: 1.125rem;
  padding: 0 0.5rem;
  color: var(--gray-100);
  &:focus {
    box-shadow: none;
    outline: 0;
    border-bottom: 1px solid var(--gray-300);
  }
  &::placeholder {
    color: var(--gray-500);
  }
`

export const TaskInput = styled(BaseInput)``
export const TaskOptions = styled.select`
  border: 1px solid green;
  background: transparent;
  height: 2.5rem;
  border: 0;
  border-bottom: 1px solid var(--gray-400);
  font-weight: bold;
  font-size: 1.125rem;
  padding: 0 0.5rem;
  color: var(--gray-100);
  flex: 1;
  cursor: pointer;
  &:focus {
    box-shadow: none;
    outline: 0;
    border-bottom: 1px solid var(--gray-300);
  }
  &::placeholder {
    color: var(--gray-500);
  }
`

export const MinutesAmountInput = styled(BaseInput)`
  width: 4rem;
`
