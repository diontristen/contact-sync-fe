import { createStyles } from '@mantine/core';

export default createStyles((theme) => ({
    tableContainer: {
        borderRadius: '16px',
        border: '2px solid',
        overflow: 'hidden',
        boxShadow: '0 0 20px 0 rgba(255,255,255,.1)',
        '>div': {
            height: '50vh',
            minHeight: '500px'
        }
    },
    thead: {
        position: 'sticky',
        top: 0,
        zIndex: 2,
        transition: 'box-shadow 150ms ease',
        '&::after': {
            content: '""',
            position: 'absolute',
            left: 0,
            right: 0,
            bottom: 0,
        },
        'tr th': {
            border: 'none !important',
            padding: '16px !important'
        }
    },
    trow: {
        'td': {
            border: 'none !important',
            padding: '16px !important'
        }
    },
    scrolled: {
        boxShadow: theme.shadows.sm,
    },
    cardsContainer: {
        display: 'flex',
        flexDirection: 'column',
        gap: '12px',
        marginBottom: '32px'
    },
    cardTitle: {
        fontSize: theme.fontSizes.md,
        fontWeight: 700
    }
}));
