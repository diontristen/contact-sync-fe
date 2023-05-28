import { Box, Title, useMantineColorScheme } from '@mantine/core'
import ContactsTable from '../ContactsTable';
import AddContact from './AddContact';
import UploadContact from './UploadContact';
import ExportContact from './ExportContact';
import UpdateContact from './UpdateContact';
import useStyles from './Contacts.styles'
const Contacts = () => {
    const { classes, theme } = useStyles()
    const { colorScheme } = useMantineColorScheme()
    return (
        <Box 
        className={classes.container}
        sx={{
            backgroundColor: colorScheme === 'dark' ? theme.colors.secondary[3] : theme.colors.white[6],
            borderColor: (colorScheme === 'dark' ? theme.colors.secondary[0] : theme.colors.white[3]),
            boxShadow: colorScheme === 'dark' ?  '0 0 20px 0 rgba(255,255,255,.1)' :  '0 0 20px 0 rgba(0,0,0,.4)',
        }}
        >
            <Title
                order={2}
                className={classes.title}
                sx={{
                    color: colorScheme === 'dark' ? theme.colors.primaryContrast[2] : theme.colors.primary[1]
                }}
            >
                Contact List
            </Title>
            <Box className={classes.ctaContainer}>
                <AddContact/>
                <UploadContact type='add'/>
                <UploadContact type='replace'/>
                <ExportContact/>
            </Box>
            <ContactsTable />
            <UpdateContact/>
        </Box>
    );
};

export default Contacts;