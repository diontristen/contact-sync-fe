import { Box } from '@mantine/core';
import { Outlet } from 'react-router-dom';
import Navbar from '../Navbar';
import useStyles from './Layout.styles'
const Layout = () => {
    const { classes } = useStyles()
    return (
        <Box className={classes.container}>
            <Navbar />
            <Box>
                <Outlet />
            </Box>
        </Box>
    );
};

export default Layout;