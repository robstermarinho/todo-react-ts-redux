import styled from 'styled-components'

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
    }
  }
`

export const AddPostFormContainer = styled.section`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  width: 100%;
  padding: 0px 50px 0px 50px;

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
  }
`
