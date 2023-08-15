import styled, { keyframes } from 'styled-components'
import * as Dialog from '@radix-ui/react-dialog'

const spin = keyframes`
  from {
    transform: rotate(0deg);
  }
  to {
    transform: rotate(360deg);
  }
`

export const BlogPageContainer = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  max-width: 1200px;
  margin: 0px auto;
  flex-direction: column;
  position: relative;

  .postsList {
    margin-top: 10px;
    display: flex;
    align-items: center;
    flex-direction: column;
    gap: 1rem;
    .post {
      width: 100%;
      display: flex;
      flex-direction: column;
      justify-content: space-between;
      background-color: var(--gray-500);
      box-shadow: 0px 2px 8px rgba(0, 0, 0, 0.06);
      border-radius: 8px;
      padding: 1rem;
      border: 1px solid var(--gray-400);
      gap: 0.75rem;

      .postInfo {
        display: flex;
        justify-content: center;
        align-items: flex-start;
        gap: 1rem;
        .postInfoContent {
          display: flex;
          justify-content: flex-start;
          flex-direction: column;
          gap: 0.2rem;
          flex: 1;

          h2 {
            border-bottom: 1px solid var(--gray-400);
            padding: 0.2rem 0px;
            margin-bottom: 0.2rem;
          }
        }

        .dateInfo {
          display: flex;
          justify-content: flex-end;
          flex-direction: column;
          gap: 0.2rem;
          font-size: 12px;
          width: 15%;
          text-align: right;
        }
      }
    }
  }

  .headerActions {
    display: flex;
    max-width: 1200px;
    margin: 0px auto;
    flex-direction: column;
  }
  .postActions,
  .headerActions {
    width: 100%;
    display: flex;
    justify-content: space-between;

    button {
      display: flex;
      justify-content: center;
      align-items: center;
      gap: 0.5rem;
      cursor: pointer;
      border-radius: 0.25rem;
      border: none;
      background-color: var(--blue-dark);
      border: 1px solid var(--blue-dark);
      transition: all 0.2s;
      padding: 0.5rem;
      color: var(--white);

      svg {
        color: var(--white);
      }
      span {
        font-size: 14px;
        font-weight: 700;
        color: var(--white);
      }
    }
  }
`

export const AddPostFormContainer = styled.section`
  /* display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  width: 100%;
  padding: 0px 50px 0px 50px; */
  /* 
  form {
    width: 100%;
    display: flex;
    align-items: flex-start;
    justify-content: flex-start;

    color: var(--gray-300);
    font-size: 1.125rem;
    font-weight: bold;

    background-color: var(--gray-500);
    border-radius: 0.25rem;
    border: 1px solid var(--gray-700);
    padding: 0 1rem;

    width: 100%;
    padding: 20px;
    gap: 0.5rem;

    input,
    textarea {
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
    }

    textarea {
      flex: 1;
      min-height: 8rem;
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
  } */
`

export const Overlay = styled(Dialog.Overlay)`
  position: fixed;
  width: 100vw;
  height: 100vh;
  inset: 0;
  background: rgba(0, 0, 0, 0.75);
`

export const Content = styled(Dialog.Content)`
  min-width: 32rem;
  border-radius: 6px;
  padding: 2.5rem 3rem;
  background: var(--gray-500);

  position: fixed;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);

  form {
    margin-top: 2rem;

    display: flex;
    flex-direction: column;
    gap: 1rem;

    input,
    textarea {
      border-radius: 6px;
      border: 0;
      background: var(--gray-700);
      color: var(--gray-200);
      padding: 1rem;

      &::placeholder {
        color: var(--gray-300);
      }
    }

    button.loadingButton {
      svg {
        animation: ${spin} 1.6ms linear infinite;
      }
    }

    button[type='submit'],
    button.loadingButton {
      height: 50px;
      border: 0;
      background: var(--blue-dark);
      color: var(--white);
      font-weight: bold;
      padding: 0 1.25rem;
      border-radius: 6px;
      margin-top: 1.25rem;
      cursor: pointer;
      align-items: center;
      display: flex;
      justify-content: center;
      gap: 0.5rem;
      &:disabled {
        opacity: 0.6;
        cursor: not-allowed;
      }

      &:not(:disabled):hover {
        background: var(--blue);
        transition: background-color 0.2s;
      }
    }
  }
`

export const CloseButton = styled(Dialog.Close)`
  position: absolute;
  background: transparent;
  border: 0;
  top: 1.5rem;
  right: 1.5rem;
  line-height: 0;
  cursor: pointer;
  color: var(--gray-300);
`
