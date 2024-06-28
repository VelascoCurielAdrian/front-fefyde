import { createTheme, responsiveFontSizes } from '@mui/material';
import { esES } from '@mui/x-data-grid';
import paleta from './paleta';

export const theme = responsiveFontSizes(createTheme({
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
    MuiDivider: {
      styleOverrides: {
        root: {
          '&::before, &::after': {
            borderColor: paleta.login.main,
          },
        },
      },
    },
    MuiButton: {
      variants: [
        {
          props: { variant: 'contained' },
          style: {
            backgroundColor: '#081B3A',
            textTransform: 'none',
            fontWeight: 'bold',
            fontSize: 12,
            '&:hover': {
              color: '#FFFF',
              backgroundColor: '#0D2C52',
            },
          },
        },
        {
          props: { variant: 'outlined' },
          style: {
            color: '#081B3A',
            backgroundColor: '#FFFF',
            textTransform: 'none',
            fontWeight: 'bold',
            fontSize: 12,
            '&:hover': {
              color: '#081B3A',
              backgroundColor: '#F5F5F5',
            },
          },
        },
      ],
      styleOverrides: {
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
    MuiFormHelperText: {
      styleOverrides: {
        root: {
          fontWeight: 500,
          fontSize: '11px',
        },
      },
    },
    MuiSelect: {
      styleOverrides: {
        root: {
          backgroundColor: '#fafaf9',
          border: '1px solid rgba(0, 0, 0, 0.23)',
          borderRadius: 6,
          marginBottom: -1,
          '&.Mui-error': {
            border: `1px solid ${paleta.error}`,
            backgroundImage: 'url("data:image/svg+xml,%3csvg xmlns=\'http://www.w3.org/2000/svg\' viewBox=\'0 0 12 12\' width=\'12\' height=\'12\' fill=\'none\' stroke=\'%23dc3545\'%3e%3ccircle cx=\'6\' cy=\'6\' r=\'4.5\'/%3e%3cpath stroke-linejoin=\'round\' d=\'M5.8 3.6h.4L6 6.5z\'/%3e%3ccircle cx=\'6\' cy=\'8.2\' r=\'.6\' fill=\'%23dc3545\' stroke=\'none\'/%3e%3c/svg%3e")',
            backgroundRepeat: 'no-repeat',
            backgroundPosition: 'right calc(1.875em + 0.1875rem) center',
            backgroundSize: 'calc(0.75em + 0.375rem) calc(0.75em + 0.375rem)',
            marginBottom: 3,
          },
          '&.Mui-focused': {
            borderColor: '#ffff',
            borderWidth: 1,
          },
        },
      },
    },
    MuiTextField: {
      variants: [
        {
          props: { variant: 'outlined' },
          style: {
            '& .MuiOutlinedInput-root': {
              marginBottom: 3,
              borderRadius: 6,
              border: '1px solid rgba(0, 0, 0, 0.23)',
              backgroundColor: '#fafaf9',
              '&.Mui-error': {
                paddingRight: 'calc(1.5em + 0.75rem)',
                backgroundImage: 'url("data:image/svg+xml,%3csvg xmlns=\'http://www.w3.org/2000/svg\' viewBox=\'0 0 12 12\' width=\'12\' height=\'12\' fill=\'none\' stroke=\'%23dc3545\'%3e%3ccircle cx=\'6\' cy=\'6\' r=\'4.5\'/%3e%3cpath stroke-linejoin=\'round\' d=\'M5.8 3.6h.4L6 6.5z\'/%3e%3ccircle cx=\'6\' cy=\'8.2\' r=\'.6\' fill=\'%23dc3545\' stroke=\'none\'/%3e%3c/svg%3e")',
                backgroundRepeat: 'no-repeat',
                backgroundPosition: 'right calc(0.375em + 0.1875rem) center',
                backgroundSize: 'calc(0.75em + 0.375rem) calc(0.75em + 0.375rem)',
              },
              '&.Mui-focused': {
                borderColor: '#ffff',
                borderWidth: 1,
              },
            },
          },
        },
      ],
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
    MuiTab: {
      styleOverrides: {
        root: {
          backgroundColor: '#fffff',
          color: '#081B3A',
          fontWeight: 'bold',
          fontSize: '11px',
          '&.Mui-selected': {
            color: '#BE8B3C',
          },
        },
      },
    },
    MuiTabs: {
      styleOverrides: {
        root: {
          '& .MuiTabs-indicator': {
            borderBottom: '2px solid #BE8B3C',
            backgroundColor: '#BE8B3C',
          },
        },
      },
    },
  },
  palette: {
    action: {
      focus: 'rgba(55, 65, 81, 0.12)',
      selected: 'rgba(55, 65, 81, 0.08)',
      disabledBackground: 'rgba(55, 65, 81, 0.12)',
      disabled: 'rgba(55, 65, 81, 0.26)',
    },
    background: {
      default: 'rgb(243 244 246 / 1)',
    },
    divider: '#E6E8F0',
    primary: {
      main: '#081B3A',
      light: '#828DF8',
      dark: '#3832A0',
      contrastText: '#ffff',
    },
    secondary: {
      main: '#ffff',
      light: '#3FC79A',
      dark: '#0B815A',
      contrastText: '#ffff',
    },
    success: {
      main: '#00695f',
      light: '#43C6B7',
      dark: '#0E8074',
      contrastText: '#ffff',
    },
    info: {
      main: '#1769aa',
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
      main: '#ab003c',
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
    borderRadius: 7,
  },
  typography: {
    fontSize: 12,
    fontFamily: '"Helvetica", "Arial", sans-serif',
  },
}, esES));
