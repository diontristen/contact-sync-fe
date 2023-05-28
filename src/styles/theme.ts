import {
    MantineThemeOverride,
    MantineTheme,
    Tuple,
  } from '@mantine/core';
import { colors } from './color';

declare module '@mantine/core' {
    export interface MantineThemeOther {
      primary: string;
      secondary: string;
      backgroundLight: string;
      backgroundDark: string;
      getBrandShades: (
        theme: MantineTheme,
        type: 'primary' | 'accent'
      ) => Tuple<string, 10>;
    }
  }

const theme: MantineThemeOverride = {
    colorScheme: 'dark',
    colors,
    fontFamily: 'Poppins, sans-serif',
    lineHeight: '1.25em',
    fontSizes: {
        xs: '12px',
        sm: '16px',
        md: '24px',
        lg: '32px',
        xl: '40px',
    },
    headings: {
      fontFamily: 'Poppins, sans-serif',
        sizes: {
            h1: { fontSize: '64px' },
            h2: { fontSize: '56px' },
            h3: { fontSize: '48px' },
        },
    },
    breakpoints: {
      xs: '640px',
      sm: '768px',
      md: '1024px',
      lg: '1208px',
      xl: '1536px',
    },
};

export { theme };
