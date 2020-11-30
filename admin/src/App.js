import { ThemeProvider } from '@material-ui/core';
import React from 'react';
import 'react-draft-wysiwyg/dist/react-draft-wysiwyg.css';
import 'react-perfect-scrollbar/dist/css/styles.css';
import { Provider } from 'react-redux';
import { useRoutes } from 'react-router-dom';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import GlobalStyles from 'src/components/GlobalStyles';
import 'src/libs/StyleCss/app.css';
import 'src/mixins/chartjs';
import routes from 'src/routes';
import theme from 'src/theme';
import { store } from './store';


const App = () => {
  const routing = useRoutes(routes);
  return (
    <Provider store={store}>
      <ThemeProvider theme={theme}>
        <GlobalStyles />
        {routing}
      </ThemeProvider>
      <ToastContainer autoClose={5000} position={'top-right'} />
    </Provider>
  );
};

export default App;
