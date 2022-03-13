import { render, screen } from '@testing-library/react';
import Login from './Login';
import { ThemeProvider } from '@mui/material';
import { theme } from 'app/theme';

test('renders Login', () => {
  const loginComponent = (
    <ThemeProvider theme={theme}>
      <Login
      ></Login>
    </ThemeProvider>
  );
  render(loginComponent);
  const titleElement = screen.getByText(/Please LogIn/);
  expect(titleElement).toBeInTheDocument();
});
