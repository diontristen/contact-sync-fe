import { createStyles } from '@mantine/core';

export default createStyles((theme) => ({
    container: {
        maxWidth: `${theme.breakpoints.xl}`,
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'space-between',
        height: '100px',
    },
    logoContainer: {
        maxWidth: '250px',
        [`@media (max-width: ${theme.breakpoints.xs})`]: {
            maxWidth: '60px',
        },
    }
}));
