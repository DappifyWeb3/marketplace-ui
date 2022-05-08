import { useEffect, useContext } from 'react';
import { DappifyContext } from 'react-dappify';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import i18n from "i18next";
import { initReactI18next } from "react-i18next";
import Routes from 'Routes';


const App = () => {
  const { configuration } = useContext(DappifyContext);

  useEffect(() => {
    if (configuration) {
      i18n
        .use(initReactI18next)
        .init(configuration.translation);
    }
  },[configuration]);

  const theme = createTheme(configuration.theme);

  return (
    <ThemeProvider theme={theme}>
      <Routes />
    </ThemeProvider>
  )
};

export default App;
