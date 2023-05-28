import { Box } from '@mantine/core';
import ThemeSwitch from '../ColorScheme';
import NavbarLogo from './NavbarLogo';
import useStyles from './Navbar.styles'

const Navbar = () => {
    const { classes } = useStyles()

    return (
        <Box className={classes.container}>
            <NavbarLogo />
            <ThemeSwitch />
        </Box>
    );
};

export default Navbar;