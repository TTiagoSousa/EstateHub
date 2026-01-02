import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import { BrowserRouter } from 'react-router-dom'
import App from './App.tsx'
import { ThemeProvider } from './Contexts/Theme_Context.tsx'
import { NavigationProvider } from './Contexts/Navs_Context.tsx'
import { AuthProvider } from './Contexts/Auth_Context.tsx'

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <BrowserRouter>
      <ThemeProvider>
        <NavigationProvider>
          <AuthProvider>
            <App />
          </AuthProvider>
        </NavigationProvider>
      </ThemeProvider>
    </BrowserRouter>
  </StrictMode>,
)