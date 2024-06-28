import { makeStyles } from '@mui/styles';

const styles = makeStyles((theme) => ({
  titulo: {
    '&.MuiTypography-root': {
      fontSize: 30,
      fontWeight: 'bold',
      height: 'fit-content',
      textTransform: 'uppercase',

      [theme.breakpoints.down('sm')]: {
        fontSize: 20,
      },
    },
  },
  subtitulo: {
    '&.MuiTypography-root': {
      fontSize: 20,
      fontWeight: 300,
      height: 'fit-content',
      margin: 0,

      [theme.breakpoints.down('sm')]: {
        fontSize: 15,
      },
    },
  },
}));

export default styles;
