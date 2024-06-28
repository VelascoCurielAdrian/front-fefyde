import Box from '@mui/material/Box';
import { styled, alpha } from '@mui/material/styles';
import InputBase from '@mui/material/InputBase';

export const Component = styled('div')(({ theme }) => ({
  position: 'relative',
  color: '#263238',
  borderRadius: theme.shape.borderRadius,
  backgroundColor: theme.palette.secondary.main,
  '&:hover': {
    backgroundColor: theme.palette.secondary.main,
  },
  margin: 6,
  width: '95%',
  [theme.breakpoints.up('sm')]: {
    marginLeft: theme.spacing(1),
    width: 'auto',
  },
}));

export const SearchIconContainer = styled('div')(({ theme }) => ({
  padding: theme.spacing(0, 2),
  height: '100%',
  position: 'absolute',
  pointerEvents: 'none',
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
}));

export const SearchInput = styled(InputBase)(({ theme }) => ({
  borderWidth: 1,
  borderRadius: 10,
  '& .MuiInputBase-input': {
    padding: theme.spacing(1.2, 1, 1, 0),
    paddingLeft: `calc(1em + ${theme.spacing(4)})`,
    transition: theme.transitions.create('width'),
    width: '93%',
    [theme.breakpoints.up('sm')]: {
      width: '20ch',
      '&:focus': {
        width: '25ch',
      },
    },
  },
}));

export const ContentButton = styled('div')(({ theme }) => ({
  position: 'relative',
  borderRadius: theme.shape.borderRadius,
  backgroundColor: alpha(theme.palette.common.white, 0.15),
  '&:hover': {
    backgroundColor: alpha(theme.palette.common.white, 0.25),
  },
  margin: 6,
  alignItems: 'center',
  width: '95%',
  [theme.breakpoints.up('sm')]: {
    width: 'auto',
  },
}));

export const TitleContainer = styled('div')(() => ({
  alignItems: 'center',
  marginLeft: '15px',
  flexGrow: 1,
  display: { xs: 'none', sm: 'block' },
}));

export const Container = styled(Box)(({ theme }) => ({
  display: 'flex',
  flexDirection: 'row',
  marginBottom: 10,
  [theme.breakpoints.only('xs')]: {
    marginBottom: 50,
    flexDirection: 'column',
    maxHeight: 100,
  },
}));

export const Actions = styled('div')(() => ({
  marginTop: 10,
  display: 'flex',
  justifyContent: 'flex-end',
  alignItems: 'flex-end',
}));
