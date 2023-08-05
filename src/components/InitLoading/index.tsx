import { Container } from './styles'

interface InitLoadingProps {
  msg?: string
}
export function InitLoading({ msg }: InitLoadingProps) {
  return (
    <Container>
      <h1>{msg || 'Loading...'}</h1>
    </Container>
  )
}

export default InitLoading
