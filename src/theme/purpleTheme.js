import { createTheme } from "@mui/material";


export const lightPurpleTheme = createTheme({
    palette: {
        mode: 'light',
        primary: {
            main: '#6517e2',
            light: '#9c99f4'
        },
        secondary: {
            main: '#acb2ea'
        },
        background: {
            default: '#ffffff',
            paper: '#f5f5f5'
        },
        text: {
            primary: '#000000',
            secondary: '#333333'
        }
    }
});

export const darkPurpleTheme = createTheme({
    palette: {
        mode: 'dark',
        primary: {
            main: '#6517e2',
            light: '#9c99f4'
        },
        secondary: {
            main: '#acb2ea'
        },
        background: {
            default: '#121212',
            paper: '#1e1e1e'
        },
        text: {
            primary: '#ffffff',
            secondary: '#b3b3b3'
        }
    },
    components: {
        MuiButton: {
            styleOverrides: {
                root: {
                    '&:focus': {
                        outline: '2px solid #ab76ff',
                        outlineOffset: '2px'
                    }
                }
            }
        }
    }
});
