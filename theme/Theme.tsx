"use client"

import { CssBaseline, ThemeProvider, createTheme } from "@mui/material"
import { grey, orange } from "@mui/material/colors"

const theme = createTheme({
  components: {
    MuiCssBaseline: {
      styleOverrides: {
        body: {
          margin: 0,
        },
      },
    },
  },
  palette: {
    primary: {
      main: grey[800]
    },
    secondary: {
      main: grey[200]
    }
  }
})

const Theme = ({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) => {
  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      {children}
    </ThemeProvider>
  )
}

export default Theme