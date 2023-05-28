import { Global, useMantineColorScheme } from '@mantine/core';

export const GlobalStyle = () => {
  const { colorScheme } = useMantineColorScheme();

  return (
    <Global styles={(theme) => ({
      body: {
        fontSize: '16px',
        color: colorScheme === 'dark' ? theme.colors.white[0] : theme.colors.dark[1],
        background: colorScheme === 'dark' ? theme.colors.secondary[6] : theme.colors.white[1],
        fontFamily: 'Poppins',
        fontWeight: 400,
      },
    })}
    />
  );
}
