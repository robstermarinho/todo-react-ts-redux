import { HeaderContainer } from './styles'
import todoLogo from '../../assets/todo-logo.svg'

export function Header() {
  return (
    <HeaderContainer>
      <nav>
        <img src={todoLogo} alt="TOTO logo" />
        <nav>
          <a>A</a>
          <a>B</a>
        </nav>
      </nav>
    </HeaderContainer>
  )
}
