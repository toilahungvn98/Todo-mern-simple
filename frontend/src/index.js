import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';
import store from './store';
import { ThemeProvider } from 'styled-components';
import GlobalStyle from './utils/global-style';
import theme from './utils/theme';
import { BrowserRouter } from 'react-router-dom';
import App from './App';

ReactDOM.render(
<Provider store={store}>
<ThemeProvider theme={theme}>
<>
<BrowserRouter>
<App />
<GlobalStyle />
</BrowserRouter>
</>
</ThemeProvider>
</Provider>, document.getElementById('root'));
