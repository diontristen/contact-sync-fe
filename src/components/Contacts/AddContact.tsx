import {
    Button,
    useMantineColorScheme,
} from '@mantine/core'
import { useDisclosure } from '@mantine/hooks';
import { notifications } from '@mantine/notifications';
import useGetData from '../../hooks/useGetData';
import ContactDrawer from './ContactDrawer';
import ContactForm from './ContactForm';
import useStyles from './Contacts.styles'
import { useSelector } from "react-redux";
import { Contact } from '../../types/contact';
import { RootState } from '../../store/store';

const init = {
    first_name: '',
    last_name: '',
    email: '',
    phone_number: '',
    address_1: '',
    address_2: '',
    city: '',
    state: '',
    zip: '',
    country: '',
}

const AddContact = () => {
    const page = useSelector((state: RootState) => state.contact.page) ?? 1
    const [opened, { open, close }] = useDisclosure(false);
    const { addContact } = useGetData(page);
    const { colorScheme } = useMantineColorScheme()
    const { theme } = useStyles()

    const handleAdd = () => {
        open()
    }

    const onSubmit = async (contact: Contact) => {
        try {
            await addContact(contact)
            notifications.show({
                title: 'Success!',
                message: `${contact.first_name} ${contact.last_name} was successfully added to your contact`,
                withBorder: true,
                withCloseButton: true,
                autoClose: 3000
            })
        } catch (error) {
            notifications.show({
                title: 'Failed!',
                message: 'Something went wrong!',
                withBorder: true,
                withCloseButton: true,
                autoClose: 3000
            })
        }
    }

    return (
        <>
            <Button
                onClick={handleAdd}
                sx={{
                    color: colorScheme === 'dark' ? theme.colors.white[0] : theme.colors.white[0],
                    backgroundColor: colorScheme === 'dark' ? theme.colors.primary[1] : theme.colors.primary[1],
                    ':hover': {
                        backgroundColor: colorScheme === 'dark' ? theme.colors.primary[3] : theme.colors.primary[1],
                    }
                }}
            >
                Add Contact
            </Button>
            <ContactDrawer
                title='Add Contact'
                opened={opened}
                onClose={close}
            >
                <ContactForm
                    initialValues={init}
                    apiCall={onSubmit}
                />
            </ContactDrawer>
        </>
    );
};



export default AddContact;

