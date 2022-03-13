import React from 'react';
import { Theme } from '@mui/material/styles';
import { makeStyles } from '@mui/styles';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import { CssBaseline, TextField, Typography, Container, Button } from '@mui/material';

const useStyles = makeStyles((theme: Theme) => ({
  paper: {
    marginTop: theme.spacing(8),
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
  },
  form: {
    width: '100%', // Fix IE 11 issue.
    marginTop: theme.spacing(1),
  },
  submit: {
    margin: theme.spacing(3, 0, 2),
  },
}));

const theme = createTheme({
  typography: {
    subtitle1: {
      fontSize: 16,
    },
  },
});
export default function Login() {
  const classes = useStyles();
  return (
    <Container component="main" maxWidth="xs">
      <CssBaseline />
      <div className={classes.paper}>
        <Typography component="h1" variant="h5">
          Please LogIn
        </Typography>
        <form className={classes.form} noValidate>
          <ThemeProvider theme={theme}>
            <Typography variant="subtitle1">User Name</Typography>
            <TextField
              margin="normal"
              required
              fullWidth
              id="email"
              name="email"
              autoComplete="email"
              autoFocus
            />
            <Typography variant="subtitle1">Password</Typography>
            <TextField
              margin="normal"
              required
              fullWidth
              name="password"
              type="password"
              id="password"
              autoComplete="current-password"
            />
            <Button type="submit" variant="contained" color="primary" className={classes.submit}>
              <Typography variant="subtitle1">Submit</Typography>
            </Button>
          </ThemeProvider>
        </form>
      </div>
    </Container>
  );
}
