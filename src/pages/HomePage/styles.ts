import { styled } from 'styled-components'

export const HomePageContainer = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  min-height: 10px;
  padding: 0 2rem;
  font-family: 'Inter';
  .content {
    display: flex;
    max-width: 46rem;
    align-items: center;
    width: 100%;
    margin-right: auto;
    margin-left: auto;
    flex-direction: column;
    margin-top: -2rem;

    .header-container {
      display: flex;
      justify-content: center;
      align-items: flex-end;
      flex-direction: column;
      width: 100%;
      margin-bottom: 1rem;
      a {
        display: flex;
        cursor: pointer;
        transition: color 0.2s ease-in-out;
        &:hover {
          color: var(--blue);
        }
      }
    }
    .list-container {
      display: flex;
      width: 100%;
      justify-content: center;
      flex-direction: column;
      align-items: center;
      gap: 0.75rem;
    }
  }
`
