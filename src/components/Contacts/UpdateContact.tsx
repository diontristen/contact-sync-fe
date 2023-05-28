import { notifications } from '@mantine/notifications';
import { Contact } from '../../types/contact';
import ContactDrawer from './ContactDrawer';
import ContactForm from './ContactForm';
import useGetData from '../../hooks/useGetData';
import { useDisclosure } from '@mantine/hooks';
import { useSelector } from 'react-redux';
import { RootState } from '../../store/store';
import { useEffect } from 'react';
import { resetSelected } from '../../store/contactSlice';

const UpdateContact = () => {
    const page = useSelector((state: RootState) => state.contact.page) ?? 1
    const { updateContact, deleteContact } = useGetData(page);
    const [opened, { open, close }] = useDisclosure(false);
    const selected = useSelector((state: RootState) => state.contact.selected)

    useEffect(() => {
        if (selected) {
            open()
        }

        return () => {
            resetSelected()
        }
    }, [selected])

    const onSubmit = async (contact: Contact) => {
        try {
            await updateContact(contact)
            notifications.show({
                title: 'Success!',
                message: `${contact.first_name} ${contact.last_name} was successfully updated.`,
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

    const onDelete = async () => {
        try {
            if (selected) {
                await deleteContact(selected.email)
                notifications.show({
                    title: 'Success!',
                    message: `${selected.first_name} ${selected.last_name} was successfully removed to your contact`,
                    withBorder: true,
                    withCloseButton: true,
                    autoClose: 3000
                })
            }
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
        <ContactDrawer
            title='Update Contact'
            opened={opened}
            onClose={close}
        >
            {selected && <ContactForm
                initialValues={{ ...selected }}
                apiCall={onSubmit}
                withDelete={true}
                extraApiCall={onDelete}
            />}
        </ContactDrawer>
    );
};

export default UpdateContact;