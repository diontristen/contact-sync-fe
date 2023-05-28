import { Drawer } from '@mantine/core';

interface ContactDrawerProps {
    title: string
    opened: boolean
    onClose: () => void
    children: React.ReactNode
}

const ContactDrawer = ({
    title,
    opened,
    onClose,
    children
}: ContactDrawerProps) => {
    return (
        <Drawer
            onClose={onClose}
            opened={opened}
            position='right'
            title={title ?? ''}
        >
            {children}
        </Drawer>
    );
};

export default ContactDrawer;