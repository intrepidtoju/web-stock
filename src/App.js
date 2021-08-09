import { green } from '@material-ui/core/colors';
import CssBaseline from '@material-ui/core/CssBaseline';
import { createMuiTheme, MuiThemeProvider } from '@material-ui/core/styles';
import React, { useState } from 'react';
import PrivateRoutes from './components/privateRoutes';
import PublicRoutes from './components/publicRoutes';
import { session } from './utils';

function App() {
  const [mode, setMode] = useState('light'),
    theme = createMuiTheme({
      palette: {
        primary: green,
        secondary: green,
        type: 'light',
      },
      typography: {
        fontFamily: 'Red Hat Display !important',
        fontSize: 14,
      },
    });
  return (
    <MuiThemeProvider theme={theme}>
      <CssBaseline />
      {/* <Header /> */}
      {session.get('token') && <PrivateRoutes />}

      <PublicRoutes />
      {/* <Footer /> */}
    </MuiThemeProvider>
  );
}

export default App;
