import { Box } from '@mui/material';
import { styled, alpha } from '@mui/material/styles';
import InputBase from '@mui/material/InputBase';

export const Component = styled('div')(({ theme }) => ({
  position: 'relative',
  color: '#263238',
  borderRadius: theme.shape.borderRadius,
  backgroundColor: '#E9EEFA',
  '&:hover': {
    backgroundColor: '#E9EEFA',
  },
  margin: 6,
  width: '95%',
  [theme.breakpoints.up('sm')]: {
    marginLeft: theme.spacing(1),
    width: 'auto',
  },
}));

export const SearchIcon = styled('div')(({ theme }) => ({
  padding: theme.spacing(0, 2),
  height: '100%',
  position: 'absolute',
  pointerEvents: 'none',
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
}));

export const SearchInput = styled(InputBase)(({ theme }) => ({
  color: 'inherit',
  borderWidth: 1,
  borderRadius: 10,
  '& .MuiInputBase-input': {
    padding: theme.spacing(1.2, 1, 1, 0),
    paddingLeft: `calc(1em + ${theme.spacing(4)})`,
    transition: theme.transitions.create('width'),
    width: '93%',
    [theme.breakpoints.up('sm')]: {
      width: '12ch',
      '&:focus': {
        width: '20ch',
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
  display: 'flex',
  justifyContent: 'flex-end',
  alignItems: 'flex-end',
}));
