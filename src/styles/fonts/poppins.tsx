import { Global } from '@mantine/core';

export function Poppins() {
  return (
    <Global styles={[
      {
        '@font-face': {
          fontFamily: 'Poppins',
          src: 'url("/assets/fonts/Poppins/Poppins-Light.woff") format("woff")',
          fontStyle: 'normal',
          fontWeight: 300,
        },
      },
      {
        '@font-face': {
          fontFamily: 'Poppins',
          src: 'url("/assets/fonts/Poppins/Poppins-Regular.woff") format("woff")',
          fontStyle: 'normal',
          fontWeight: 400,
        },
      },
      {
        '@font-face': {
          fontFamily: 'Poppins',
          src: 'url("/assets/fonts/Poppins/Poppins-Medium.woff") format("woff")',
          fontStyle: 'normal',
          fontWeight: 500,
        },
      },
      {
        '@font-face': {
          fontFamily: 'Poppins',
          src: 'url("/assets/fonts/Poppins/Poppins-SemiBold.woff") format("woff")',
          fontStyle: 'normal',
          fontWeight: 600,
        },
      },
      {
        '@font-face': {
          fontFamily: 'Poppins',
          src: 'url("/assets/fonts/Poppins/Poppins-Bold.woff") format("woff")',
          fontStyle: 'normal',
          fontWeight: 700,
        },
      },
    ]}
    />
  );
}
