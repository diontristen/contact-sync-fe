import { useState, useRef } from 'react';
import { Box, Button, Group, Text, Modal, useMantineColorScheme } from '@mantine/core'
import { useDisclosure } from '@mantine/hooks';
import { Dropzone, MIME_TYPES } from '@mantine/dropzone';
import useStyles from './Contacts.styles'
import { IconCloudUpload, IconDownload, IconX } from '@tabler/icons-react';
import useGetData from '../../hooks/useGetData';
import { RootState } from '../../store/store';
import { useSelector } from 'react-redux';
import { notifications } from '@mantine/notifications';

interface UploadContactProps {
    type: 'add' | 'replace'
}

const UploadContact = ({
    type = 'add'
}: UploadContactProps) => {
    const page = useSelector((state: RootState) => state.contact.page) ?? 1
    const { uploading, addContactByCsv, replaceContactByCsv, replaceUploading } = useGetData(page);
    const openRef = useRef<() => void>(null);
    const [file, setFile] = useState<File | null>(null);
    const { colorScheme } = useMantineColorScheme()
    const { theme } = useStyles()
    const [opened, { open, close }] = useDisclosure(false);
    const handleUpload = () => {
        open()
    }

    const handleClose = () => {
        close()
        setFile(null)
    }

    const handleDrop = (files: File[]) => {
        setFile(files[0]);
    };

    const handleSubmit = async () => {
        if (!file) {
            alert("no file")
            return;
        }

        const formData = new FormData();
        formData.append('file', file)
        if (type === 'add') addContact(formData)
        if (type === 'replace') replaceContact(formData)
    }

    const addContact = async (formData: FormData) => {
        try {
            await addContactByCsv(formData)
            notifications.show({
                title: 'Success!',
                message: `You modified your contact list!`,
                withBorder: true,
                withCloseButton: true,
                autoClose: 3000
            })
        } catch (error) {
            notifications.show({
                title: 'Failed!',
                message: 'Something went wrong! Could be a mismatch of csv file.',
                withBorder: true,
                withCloseButton: true,
                autoClose: 3000
            })
            console.error('Error uploading file:', error);
        }
    }

    const replaceContact = async (formData: FormData) => {
        try {
            await replaceContactByCsv(formData)
            notifications.show({
                title: 'Success!',
                message: `You replaced  your contact list with your csv!`,
                withBorder: true,
                withCloseButton: true,
                autoClose: 3000
            })
        } catch (error) {
            notifications.show({
                title: 'Failed!',
                message: 'Something went wrong! Could be a mismatch of csv file.',
                withBorder: true,
                withCloseButton: true,
                autoClose: 3000
            })
            console.error('Error uploading file:', error);
        }
    }

    return (
        <>
            <Button
                onClick={handleUpload}
                sx={{
                    color: colorScheme === 'dark' ? theme.colors.white[0] : theme.colors.white[0],
                    backgroundColor: colorScheme === 'dark' ? theme.colors.primary[1] : theme.colors.primary[1],
                    ':hover': {
                        backgroundColor: colorScheme === 'dark' ? theme.colors.primary[3] : theme.colors.primary[1],
                    }
                }}
            >
                {type === 'add' ? 'Add Contact by CSV' : 'Replace Contact List by CSV'}
            </Button>

            <Modal
                opened={opened}
                onClose={handleClose}
                centered
                size='xl'
                radius='lg'
                title="Upload Contact List">
                <Box sx={{
                    padding: '16px'
                }}>
                    <Text mb="sm">
                        {type === 'add' ?
                            'You are trying to add a list of new contacts by uploading a csv file.' :
                            'You are trying to replace your contact list by uploading a csv file.'
                        }
                    </Text>


                    <Dropzone
                        openRef={openRef}
                        onDrop={handleDrop}
                        maxFiles={1}
                        accept={[MIME_TYPES.csv]}
                        radius="md"
                    >
                        <div style={{ pointerEvents: 'none' }}>
                            <Group position="center">
                                <Dropzone.Accept>
                                    <IconDownload
                                        color={theme.colors[theme.primaryColor][6]}
                                        stroke={1.5}
                                    />
                                </Dropzone.Accept>
                                <Dropzone.Reject>
                                    <IconX
                                        color={theme.colors.red[6]}
                                        stroke={1.5} />
                                </Dropzone.Reject>
                                <Dropzone.Idle>
                                    <IconCloudUpload
                                        color={theme.colorScheme === 'dark' ? theme.colors.dark[0] : theme.black}
                                        stroke={1.5}
                                    />
                                </Dropzone.Idle>
                            </Group>

                            <Text ta="center" fw={700} fz="lg" mt="xl">
                                <Dropzone.Accept>Drop files here</Dropzone.Accept>
                                <Dropzone.Reject>Csv file less than 30mb</Dropzone.Reject>
                                <Dropzone.Idle>Upload Contact List</Dropzone.Idle>
                            </Text>
                            <Text ta="center" fz="sm" mt="xs" c="dimmed">
                                Drag&apos;n&apos;drop files here to upload. We can accept only <i>.csv</i> files that
                                are less than 30mb in size.
                            </Text>
                            {file && <Text ta="center" fz='md' mt="sm">You uploaded:  {file && file.name}</Text>}
                        </div>
                    </Dropzone>
                    {type === 'replace' && <Text my='sm' color='primary'>Warning: In case your csv file has a bad data or it causes error. Your list will be flushed. Act accordingly.</Text>}
                    <Button
                        onClick={handleSubmit}
                        loading={type === 'add' ? uploading : replaceUploading }
                        disabled={file === null}
                        sx={{
                            width: '100%',
                            marginTop: '16px',
                            color: colorScheme === 'dark' ? theme.colors.white[0] : theme.colors.white[0],
                            backgroundColor: colorScheme === 'dark' ? theme.colors.primary[1] : theme.colors.primary[1],
                            ':hover': {
                                backgroundColor: colorScheme === 'dark' ? theme.colors.primary[3] : theme.colors.primary[1],
                            }
                        }}
                    >
                        {type === 'add' && (uploading ? 'Uploading' : 'Upload CSV')}
                        {type === 'replace' && (replaceUploading ? 'Uploading' : 'Upload CSV')}
                    </Button>
                    {type === 'replace' && <Text my='sm' color='primary'>This may take atleast 5 seconds as we process to remove all your contacts.</Text>}
                </Box>
            </Modal>
        </>
    );
};

export default UploadContact;