import { Box, Image } from '@mantine/core';
import { useMediaQuery } from '@mantine/hooks';
import useStyles from './Navbar.styles'
const NavbarLogo = () => {
    const { classes, theme } = useStyles()
    const tablet = useMediaQuery(`(max-width: ${theme.breakpoints.xs})`);
    const imageSrc = tablet ? './assets/images/scs_logo.png' : './assets/images/scs_big.png'
    return (
        <Box>
            <Image
                className={classes.logoContainer}
                mx="auto"
                src={imageSrc}
                alt="SCS Logo" />
        </Box>
    );
};

export default NavbarLogo;