/* eslint-disable import/prefer-default-export */
import { createTheme } from '@mui/material';

export const theme = createTheme({
  components: {
    MuiListItemButton: {
      styleOverrides: {
        root: {
          '&.Mui-selected': {
            borderLeft: '5px solid red',
          },
        },
      },
    },
    MuiDataGrid: {
      styleOverrides: {
        root: {
          border: 'none',
        },
      },
    },
    MuiButton: {
      styleOverrides: {
        root: {
          textTransform: 'none',
        },
        sizeSmall: {
          padding: '6px 16px',
        },
        sizeMedium: {
          padding: '8px 20px',
        },
        sizeLarge: {
          padding: '11px 24px',
        },
        textSizeSmall: {
          padding: '7px 12px',
        },
        textSizeMedium: {
          padding: '9px 16px',
        },
        textSizeLarge: {
          padding: '12px 16px',
        },
      },
    },
    MuiCardContent: {
      styleOverrides: {
        root: {
          padding: '32px 24px',
          '&:last-child': {
            paddingBottom: '32px',
          },
        },
      },
    },
    MuiCardHeader: {
      defaultProps: {
        titleTypographyProps: {
          variant: 'h6',
        },
        subheaderTypographyProps: {
          variant: 'body2',
        },
      },
      styleOverrides: {
        root: {
          padding: '32px 24px',
        },
      },
    },
    MuiCssBaseline: {
      styleOverrides: {
        '*': {
          boxSizing: 'border-box',
          margin: 0,
          padding: 0,
        },
        html: {
          MozOsxFontSmoothing: 'grayscale',
          WebkitFontSmoothing: 'antialiased',
          display: 'flex',
          flexDirection: 'column',
          minHeight: '100%',
          width: '100%',
        },
        body: {
          display: 'flex',
          flex: '1 1 auto',
          flexDirection: 'column',
          minHeight: '100%',
          width: '100%',
        },
        '#__next': {
          display: 'flex',
          flex: '1 1 auto',
          flexDirection: 'column',
          height: '100%',
          width: '100%',
        },
      },
    },
    MuiOutlinedInput: {
      styleOverrides: {
        notchedOutline: {
          borderColor: '#E6E8F0',
        },
      },
    },
    MuiTableHead: {
      styleOverrides: {
        root: {
          backgroundColor: '#f6f6e9',
          '.MuiTableCell-root': {
            color: '#0d47a1',
            backgroundColor: '#E6E8F0',
          },
          borderBottom: 'none',
          '& .MuiTableCell-root': {
            borderBottom: 'none',
            fontSize: 12,
            fontWeight: 700,
            lineHeight: 1,
            letterSpacing: 0.5,
            textTransform: 'uppercase',
          },
          '& .MuiTableCell-paddingCheckbox': {
            paddingTop: 4,
            paddingBottom: 4,
          },
        },
      },
    },
  },
  palette: {
    action: {
      active: '#0d47a1',
      focus: 'rgba(55, 65, 81, 0.12)',
      selected: 'rgba(55, 65, 81, 0.08)',
      disabledBackground: 'rgba(55, 65, 81, 0.12)',
      disabled: 'rgba(55, 65, 81, 0.26)',
    },
    background: {
      default: '#f6f6e9',
      paper: '#ffff',
    },
    divider: '#E6E8F0',
    primary: {
      main: '#0d47a1',
      light: '#828DF8',
      dark: '#3832A0',
      contrastText: '#ffff',
    },
    secondary: {
      main: '#0d47a1',
      light: '#3FC79A',
      dark: '#0B815A',
      contrastText: '#ffff',
    },
    success: {
      main: '#14B8A6',
      light: '#43C6B7',
      dark: '#0E8074',
      contrastText: '#ffff',
    },
    info: {
      main: '#2196F3',
      light: '#64B6F7',
      dark: '#0B79D0',
      contrastText: '#ffff',
      masculino: '#2196f3',
      femenino: '#f50057',
    },
    warning: {
      main: '#FFB020',
      light: '#FFBF4C',
      dark: '#B27B16',
      contrastText: '#ffff',
    },
    error: {
      main: '#D14343',
      light: '#DA6868',
      dark: '#922E2E',
      contrastText: '#ffff',
    },
    text: {
      primary: '#121828',
      secondary: '#65748B',
      disabled: 'rgba(55, 65, 81, 0.48)',
    },
    generos: {
      main: '#f50057',
      primary: '#2196f3',
      secondary: '#f50057',
    },
  },
  shape: {
    borderRadius: 8,
  },
  typography: {
    fontSize: 12,
    fontWeight: 400,
    button: {
      fontSize: 12,
      fontWeight: 700,
    },
    typography: {
      fontFamily: 'Roboto, Helvetica, Arial, sans-serif',
    },
    components: {
      MuiCssBaseline: { styleOverrides: ' @font-face { font-style: normal; font-display: swap; font-weight: 700; } ' },
    },
  },
});
