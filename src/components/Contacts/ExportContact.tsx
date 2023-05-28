import { Button, useMantineColorScheme } from '@mantine/core';
import useStyles from './Contacts.styles'
import useGetData from '../../hooks/useGetData';
const ExportContact = () => {
    const { colorScheme } = useMantineColorScheme()
    const { theme } = useStyles()
    const { exportContactsToCsv, exporting } = useGetData()
    const handleExport = async () => {
        const blob = await exportContactsToCsv()
        const url = window.URL.createObjectURL(new Blob([blob]));
        const link = document.createElement('a');
        link.href = url;
        link.setAttribute('download', 'sgs_contacts.csv');
        document.body.appendChild(link);
        link.click();
        document.body.removeChild(link);
    }
    return (
        <div>
            <Button
                onClick={handleExport}
                loading={exporting}
                sx={{
                    color: colorScheme === 'dark' ? theme.colors.white[0] : theme.colors.white[0],
                    backgroundColor: colorScheme === 'dark' ? theme.colors.primary[1] : theme.colors.primary[1],
                    ':hover': {
                        backgroundColor: colorScheme === 'dark' ? theme.colors.primary[3] : theme.colors.primary[1],
                    }
                }}
            >
                {exporting ? 'Exporting' : 'Export'}
            </Button>
        </div>
    );
};

export default ExportContact;