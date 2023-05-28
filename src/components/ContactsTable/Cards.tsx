import { Box, Card, Center, Loader, Text, useMantineColorScheme } from '@mantine/core';
import { useEffect, useState, memo } from 'react';
import InfiniteScroll from 'react-infinite-scroll-component';
import useStyles from './ContactsTable.styles'
import { useDispatch } from 'react-redux';
import useGetData from '../../hooks/useGetData';
import { ContactRaw } from '../../types/contact';
import { setSelected } from '../../store/contactSlice';

interface ItemData {
    isItemLoaded: (index: number) => boolean
    items: ContactRaw[],
}

const Cards = () => {
    const dispatch = useDispatch()
    const { colorScheme } = useMantineColorScheme()
    const { classes, theme } = useStyles()
    const [page, setPage] = useState<number>(1);
    const { data, refetchData } = useGetData(page);
    const [contactList, setContactList] = useState<ContactRaw[]>([])
    const [hasMore, setHasMore] = useState<boolean>(true)

    const handleUpdate = (contact: ContactRaw) => {
        dispatch(setSelected({
            first_name: contact?.merge_fields?.FNAME ?? '',
            last_name: contact?.merge_fields?.LNAME ?? '',
            email: contact?.email_address ?? '',
            phone_number: contact?.merge_fields?.PHONE ?? '',
            address_1: contact?.merge_fields?.ADDR1 ?? '',
            address_2: contact?.merge_fields?.ADDR2 ?? '',
            city: contact?.merge_fields?.CITY ?? '',
            state: contact?.merge_fields?.STATE ?? '',
            zip: contact?.merge_fields?.ZIP ?? '',
            country: contact?.merge_fields?.COUNTRY ?? '',
        }))
    }

    const loadMore = async () => {
        const newPage = page + 1
        const result = await refetchData(newPage)
        const members = result?.members ?? []
        if (members.length > 0) {
            setContactList((el) => el ? [...el, ...members] : members)
            setPage(newPage)
        } else {
            setHasMore(false)
        }

    }

    useEffect(() => {
        if (data) {
            const members = data?.members ?? []
            setContactList(members)
        }
    }, [data])

    return (
        <Box
            className={classes.cardsContainer}
        >
            <InfiniteScroll
                dataLength={contactList.length}
                next={loadMore}
                hasMore={hasMore}
                loader={<Center mx="auto" p='16px' >
                    <Loader />
                </Center>}
                endMessage={
                    <Center mx="auto" p='16px' >
                        No more data.
                    </Center>
                }
            >
                {contactList && contactList.length > 0 && contactList.map((contact) => (
                    <Card
                        shadow="sm"
                        padding="lg"
                        radius="md"
                        withBorder
                        key={contact?.id}
                        onClick={() => handleUpdate(contact)}
                        sx={{
                            border: '2px solid !important',
                            boxShadow: '0 0 7.5px 0 rgba(255,255,255,.1)',
                            borderColor: (colorScheme === 'dark' ? theme.colors.secondary[0] : theme.colors.white[3]) + '!important',
                            backgroundColor: (colorScheme === 'dark' ? theme.colors.secondary[3] : theme.colors.white[3]) + '!important',
                            marginBottom: '16px'
                        }}
                    >
                        <Text
                            className={classes.cardTitle}
                            sx={{
                                color: colorScheme === 'dark' ? theme.colors.primary[2] : theme.colors.primary[4]
                            }}
                        >
                            {contact?.merge_fields?.FNAME} {contact?.merge_fields?.LNAME}
                        </Text>
                        <Text>{contact?.email_address}</Text>
                        <Text>{contact?.merge_fields?.PHONE}</Text>
                        <Text>{contact?.merge_fields?.ADDR1}</Text>
                        <Text sx={{
                            color: colorScheme === 'dark' ? theme.colors.secondaryContrast[4] : theme.colors.primary[4]
                        }}>
                            Last Changed: {contact?.last_changed}
                        </Text>
                    </Card>
                ))}
            </InfiniteScroll>
        </Box>
    );
};

export default Cards;