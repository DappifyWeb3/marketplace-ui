import { useEffect, useContext } from 'react';
import { DappifyContext } from 'react-dappify';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import { initReactI18next } from "react-i18next";
import i18n from "i18next";
import Routes from 'Routes';
import Template from 'react-dappify/model/Template';

const App = () => {
  const { configuration } = useContext(DappifyContext);
  const theme = createTheme(configuration?.theme);

  useEffect(() => {
    const template = Template.current();

    if (template) {
      i18n
        .use(initReactI18next)
        .init(template?.translation);
    }
  },[configuration]);

  return (
    <ThemeProvider theme={theme}>
      <Routes />
    </ThemeProvider>
  )
};

export default App;
