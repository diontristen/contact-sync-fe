import { useMediaQuery } from '@mantine/hooks';
import { useMantineTheme } from '@mantine/core';
import DataTable from './DataTable';
import Cards from './Cards';
const ContactsTable = () => {
    const theme = useMantineTheme()
    const tablet = useMediaQuery(`(max-width: ${theme.breakpoints.sm})`);
    return (
        <>
        {!tablet && <DataTable/>}
        {tablet && <Cards/>}
        </>
    );
};

export default ContactsTable;