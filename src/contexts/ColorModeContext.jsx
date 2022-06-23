import React, { createContext, useState, useMemo } from "react";
import { useTheme, ThemeProvider, createTheme } from '@mui/material/styles';


const ColorModeContext = React.createContext({ toggleColorMode: () => {} });

export default function ToggleColorMode({ children }) {
    const [mode, setMode] = useState('light');
    const colorMode = useMemo(
      () => ({
        toggleColorMode: () => {
          setMode((prevMode) => (prevMode === 'light' ? 'dark' : 'light'));
        },
      }),
      [],
    );
  
    const theme = useMemo(
      () =>
        createTheme({
          palette: {
            mode,
          },
        }),
      [mode],
    );
  
    return (
      <ColorModeContext.Provider value={colorMode}>
        <ThemeProvider theme={theme}>
          {children}
        </ThemeProvider>
      </ColorModeContext.Provider>
    );
  }