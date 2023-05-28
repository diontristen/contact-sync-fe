import { useEffect, useState } from 'react';
import { MantineProvider, ColorScheme, ColorSchemeProvider } from '@mantine/core';
import { Notifications } from '@mantine/notifications';
import {
  Route,
  createBrowserRouter,
  createRoutesFromElements,
  RouterProvider,
} from 'react-router-dom'
import { QueryClient, QueryClientProvider } from 'react-query';
import { useCookies } from 'react-cookie'
import Layout from './components/Layout';
import Landing from './components/Landing';
import { GlobalStyle } from './styles/global';
import { theme } from './styles/theme';
import { Poppins } from './styles/fonts/poppins';
import { Provider } from 'react-redux';
import { store } from './store/store'
import { axiosConfig } from './config/axios.config';

function App() {
  const queryClient = new QueryClient();
  axiosConfig()
  const [cookie, setCookie] = useCookies(['sgs-color-scheme'])
  const [colorScheme, setColorScheme] = useState<ColorScheme>(cookie['sgs-color-scheme'] ?? 'dark');

  const toggleColorScheme = (value: ColorScheme) => {
    const nextColorScheme: ColorScheme = value || (colorScheme === 'dark' ? 'light' : 'dark');
    setColorScheme(nextColorScheme);
    setCookie('sgs-color-scheme', nextColorScheme, { maxAge: 60 * 60 * 24 * 30 });
  };

  const router = createBrowserRouter(
    createRoutesFromElements(
      <Route path="/" element={<Layout />}>
        <Route index element={<Landing />} />
      </Route>
    )
  );


  return (

    <ColorSchemeProvider colorScheme={colorScheme} toggleColorScheme={toggleColorScheme} >
      <MantineProvider
        theme={{
          colorScheme,
          ...theme,
          primaryColor: 'primary',
        }}
        withGlobalStyles
        withNormalizeCSS
      >
        <Poppins />
        <GlobalStyle />
        <Notifications />
        <Provider
          store={store}
        >
          <QueryClientProvider client={queryClient}>
            <RouterProvider router={router} />
          </QueryClientProvider>
        </Provider>

      </MantineProvider>
    </ColorSchemeProvider >
  )
}

export default App
