import { Theme } from '@mui/material/styles';
import { makeStyles } from '@mui/styles';
import Box from '@mui/material/Box';
import Divider from '@mui/material/Divider';
import Toolbar from '@mui/material/Toolbar';

const useStyles = makeStyles((theme: Theme) => ({
  header: {
    height: '20px',
    backgroundColor: '#141E55'
  },
  logo: {
    minWidth: '100px',
    height: '20px',
    color: theme.palette.secondary.contrastText,
  },
  divider: {
    paddingLeft: '10px',
    height: '20px',
    paddingTop: '20px',
    borderColor: 'white',
  },
  sublogo: {
    height: '20px',
    paddingLeft: '10px',
    color: theme.palette.secondary.contrastText,
  },
  imageIcon: {
    height: '100%',
  },
  iconRoot: {
    textAlign: 'center',
  },
}));

const userNameStyles = {
  display: {
    sm: 'block',
    color: 'white',
    fontSize: '.9rem',
    paddingTop: '16px',
    textAlign: 'right',
    marginRight: '16px',
    lineHeight: '2',
    fontWeight: '400',
  },
};

export default function Header() {
  const classes = useStyles();
  return (
    <Box sx={{ flexGrow: 1, height: 65, paddingX: 2}} className={classes.header}>
      <Toolbar>
        <Box className={classes.logo}></Box>
        <Divider orientation="vertical" flexItem sx={{ borderRightWidth: 1, borderColor: 'white', 
          paddingLeft: '10px',
          height: '20px',
          marginTop: '20px'}} />
        <Box className={classes.sublogo}>{'Incident Management'}</Box>
      </Toolbar>
    </Box>
  );
}
