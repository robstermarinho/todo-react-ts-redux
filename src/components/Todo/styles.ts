import { styled } from 'styled-components'
import { motion } from 'framer-motion'

export const TodoContainer = styled(motion.div)`
  width: 100%;
  display: flex;
  align-items: center;
  flex-direction: row;
  justify-content: space-between;
  border: 1px solid blue;
  border: 1px solid red;
  background-color: var(--gray-500);
  box-shadow: 0px 2px 8px rgba(0, 0, 0, 0.06);
  border-radius: 8px;
  padding: 1rem;
  border: 1px solid var(--gray-400);
  gap: 0.75rem;

  a {
    text-decoration: none;
    display: flex;
    justify-content: flex-start;
    align-items: center;
    gap: 0.75rem;
    cursor: pointer;
    color: #fff;
    flex: 1;

    .todo-info {
      width: 100%;
      display: flex;
      flex-direction: column;
      gap: 0.5rem;
      h4 {
        font-size: 1.5rem;
        font-weight: 600;
      }
      h5 {
        color: var(--blue);
      }
      small {
        font-size: 0.6rem;
      }
      .todo-info-small {
        display: flex;
      }
    }
    svg {
      color: var(--blue);
      transition: all 0.2s ease-in-out;
      margin: 1rem;
    }

    &:hover {
      svg {
        color: var(--purple);
      }
      h5 {
        color: var(--purple);
      }
    }
    &:visited {
      color: var(--gray-100);
    }
  }
  &:hover {
    background-color: var(--gray-600);
  }

  > button {
    border: none;
    background-color: transparent;
    cursor: pointer;
    line-height: 0;
    border-radius: 2px;
    padding: 2px;
    &:hover {
      background-color: var(--gray-400);

      svg {
        color: var(--danger);
      }
    }
    svg {
      color: var(--gray-300);
    }
  }
`
