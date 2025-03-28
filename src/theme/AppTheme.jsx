import { ThemeProvider } from "@emotion/react"
import { CssBaseline } from "@mui/material"
import { darkPurpleTheme, lightPurpleTheme } from "./purpleTheme"


export const AppTheme = ({children}) => {
  return (
    <ThemeProvider theme={darkPurpleTheme}>
        <CssBaseline/>
        {children}
    </ThemeProvider>

  )
}
