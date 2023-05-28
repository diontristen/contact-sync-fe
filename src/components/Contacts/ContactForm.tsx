import {
    Box,
    Button,
    TextInput,
    ActionIcon,
    useMantineColorScheme,
    Accordion
} from '@mantine/core'
import { useForm } from '@mantine/form';
import { IconPlus, IconReload, IconTrash } from '@tabler/icons-react';
import { type Contact } from '../../types/contact';
import useStyles from './Contacts.styles'
interface AddContactFormProps {
    initialValues: Contact,
    withDelete?: boolean
    apiCall: (contact: Contact) => Promise<void>
    extraApiCall?: () => Promise<void>
}

const ContactForm = ({
    initialValues,
    withDelete = false,
    apiCall,
    extraApiCall
}: AddContactFormProps) => {
    const { classes, theme } = useStyles()
    const { colorScheme } = useMantineColorScheme()
    const form = useForm({
        initialValues,
        validate: {
            first_name: (value) => (value.length < 1 ? 'First name is required.' : null),
            last_name: (value) => (value.length < 1 ? 'Last name is required.' : null),
            email: (value) => (/^\S+@\S+$/.test(value) ? null : 'Invalid email'),
            phone_number: (value) => (value.length < 1 ? 'Phone number is required.' : null),
        },
    });

    const onSubmit = async () => {
        form.validate();
        const valid = form.isValid()
        if (valid && form.values) {
            await apiCall(form.values)
        }
    }

    const onReset = () => {
        form.reset()
    }

    return (
        <Box>
            <Box className={classes.iconContainer}>
                {withDelete && <ActionIcon
                    onClick={extraApiCall}
                    className={classes.reset}>
                    <IconTrash />
                </ActionIcon>}
                <ActionIcon
                    onClick={onReset}
                    className={classes.reset}>
                    <IconReload />
                </ActionIcon>
            </Box>
            <form>
                <TextInput
                    withAsterisk
                    label="First name"
                    placeholder="John"
                    className={classes.input}
                    {...form.getInputProps('first_name')}
                />
                <TextInput
                    withAsterisk
                    label="Last name"
                    placeholder="Doe"
                    className={classes.input}
                    {...form.getInputProps('last_name')}
                />
                <TextInput
                    withAsterisk
                    label="Email"
                    placeholder="your@email.com"
                    className={classes.input}
                    {...form.getInputProps('email')}
                />
                <TextInput
                    withAsterisk
                    label="Phone Number"
                    placeholder="(000) 000-0000"
                    className={classes.input}
                    {...form.getInputProps('phone_number')}
                />

                <Accordion
                    defaultValue=""
                    chevron={<IconPlus size="16px" />}
                    styles={{
                        item: {
                            marginBottom: '16px'
                        },
                        label: {
                            fontSize: '16px',
                            padding: '8px 0'
                        },
                        control: {
                            padding: 0
                        },
                        content: {
                            marginTop: '8px',
                            padding: 0
                        },
                        chevron: {
                            '&[data-rotate]': {
                                transform: 'rotate(45deg)',
                            },
                        },
                    }}
                >
                    <Accordion.Item value="address">
                        <Accordion.Control>Address (optional)</Accordion.Control>
                        <Accordion.Panel>

                            <TextInput
                                label="Address 1"
                                placeholder="197 Russel Spring"
                                className={classes.input}
                                {...form.getInputProps('address_1')}
                            />
                            <TextInput
                                label="Address 2"
                                placeholder="Suite 745"
                                className={classes.input}
                                {...form.getInputProps('address_2')}
                            />
                            <TextInput
                                label="City"
                                placeholder="Roweberg"
                                className={classes.input}
                                {...form.getInputProps('city')}
                            />
                            <TextInput
                                label="State (Abbrv)"
                                placeholder="OK"
                                className={classes.input}
                                {...form.getInputProps('state')}
                            />
                            <TextInput
                                label="Zip"
                                placeholder="12345"
                                className={classes.input}
                                {...form.getInputProps('zip')}
                            />
                            <TextInput
                                label="Country"
                                placeholder="USA"
                                className={classes.input}
                                {...form.getInputProps('country')}
                            />
                        </Accordion.Panel>
                    </Accordion.Item>


                </Accordion>

                <Button
                    sx={{
                        color: colorScheme === 'dark' ? theme.colors.white[0] : theme.colors.white[0],
                        backgroundColor: colorScheme === 'dark' ? theme.colors.primary[1] : theme.colors.primary[1],
                        ':hover': {
                            backgroundColor: colorScheme === 'dark' ? theme.colors.primary[3] : theme.colors.primary[1],
                        }
                    }}
                    onClick={onSubmit}>Submit</Button>
            </form>
        </Box>
    )
}

export default ContactForm;