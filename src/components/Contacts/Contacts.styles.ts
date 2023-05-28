import { createStyles } from '@mantine/core';

export default createStyles((theme) => ({
    container: {
        width: '100%',
        padding: '16px',
        borderRadius: '16px',
        marginTop: '32px',
       
    },
    title: {
        marginBottom: '16px',
        [`@media (max-width: ${theme.breakpoints.xs})`]: {
            textAlign: 'center'
        },
    },
    ctaContainer: {
        display: 'flex',
        gap: '16px',
        marginBottom: '16px',
        flexWrap: 'wrap',
        '>div:last-child': {
            marginLeft: 'auto',
        },
        [`@media (max-width: ${theme.breakpoints.xs})`]: {
            '>div:last-child': {
                marginLeft: '0',
            },
        },
    },
    reset: {
        marginLeft: 'auto'
    },
    input: {
        marginBottom: '16px'
    },
    iconContainer: {
        display: 'flex',
        gap: '16px',
        justifyContent: 'flex-end',
        '>button': {
            width: 'fit-content',
            margin: 0
        }
    }
}));
