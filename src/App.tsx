import { BrowserRouter } from 'react-router-dom'
import { Router } from './Router'
import { ThemeProvider, StyleSheetManager } from 'styled-components'
import { defaultTheme } from './styles/themes/default'

function App() {
  return (
    <ThemeProvider theme={defaultTheme}>
      <StyleSheetManager shouldForwardProp={(prop) => prop !== 'theme'}>
        <BrowserRouter>
          <Router />
        </BrowserRouter>
      </StyleSheetManager>
    </ThemeProvider>
  )
}

export default App
