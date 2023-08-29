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
  margin: 2rem auto;
  flex-direction: column;
  position: relative;
  padding: 2rem;
  h2 {
    margin-top: 10px;
  }

  .postsList {
    margin-top: 10px;
    display: flex;
    align-items: center;
    flex-direction: column;
    gap: 1rem;
    width: 100%;
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
    margin: 10px auto 0px auto;
    flex-direction: row;
    justify-content: space-between;
    width: 100%;

    button.dialogConfirmButton {
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

      &:disabled {
        opacity: 0.6;
        cursor: not-allowed;
      }

      svg {
        color: var(--white);
      }
      span {
        font-size: 14px;
        font-weight: 700;
        color: var(--white);
      }
      &:hover {
        background-color: var(--blue);
        border: 1px solid var(--blue);
      }
    }
  }
  .postActions {
    width: 100%;
    display: flex;
    justify-content: flex-start;
    gap: 1rem;
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

      &:disabled {
        opacity: 0.6;
        cursor: not-allowed;
      }

      svg {
        color: var(--white);
      }
      span {
        font-size: 14px;
        font-weight: 700;
        color: var(--white);
      }
      &:hover {
        background-color: var(--blue);
        border: 1px solid var(--blue);
      }
    }
  }
`

export const AddPostFormContainer = styled.section``

export const Overlay = styled(Dialog.Overlay)`
  position: fixed;
  width: 100vw;
  height: 100vh;
  inset: 0;
  background: rgba(0, 0, 0, 0.75);
`

export const Content = styled(Dialog.Content)`
  min-width: 62rem;
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
    textarea {
      min-height: 200px;
    }
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

export const CustomSwitch = styled.div`
  display: flex;
  align-items: center;

  .SwitchRoot {
    cursor: pointer;
    width: 42px;
    height: 25px;
    background-color: var(--gray-400);
    border-radius: 9999px;
    position: relative;
    box-shadow: 0 2px 10px var(--gray-600);
    -webkit-tap-highlight-color: rgba(0, 0, 0, 0);
  }
  .SwitchRoot:focus {
    cursor: pointer;
    box-shadow: 0 0 0 2px var(--gray-500);
  }
  .SwitchRoot[data-state='checked'] {
    background-color: var(--blue);
  }

  .SwitchThumb {
    cursor: pointer;
    display: block;
    width: 21px;
    height: 21px;
    background-color: white;
    border-radius: 9999px;
    box-shadow: 0 2px 2px var(--gray-300);
    transition: transform 100ms;
    transform: translateX(2px);
    will-change: transform;
  }
  .SwitchThumb[data-state='checked'] {
    cursor: pointer;
    transform: translateX(19px);
  }

  .Label {
    cursor: pointer;
    color: white;
    font-size: 15px;
    line-height: 1;
    padding-right: 15px;
  }
`
