import '@fontsource/roboto/300.css'
import '@fontsource/roboto/400.css'
import '@fontsource/roboto/500.css'
import '@fontsource/roboto/700.css'
import {createTheme, CssBaseline, ThemeProvider, useMediaQuery} from '@mui/material'
import {useMemo} from 'react'
import Site from './Site.tsx'

export default function App() {
  const prefersDarkMode = useMediaQuery('(prefers-color-scheme: dark)')
  const theme = useMemo(() => createTheme({palette: {mode: prefersDarkMode ? 'dark' : 'light'}}), [prefersDarkMode])
  return (
    <ThemeProvider theme={theme}>
      <CssBaseline/>
      <Site/>
    </ThemeProvider>
  )
}
