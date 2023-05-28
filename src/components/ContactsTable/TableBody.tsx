import useStyles from './ContactsTable.styles'
import { parseAddress } from '../../utils';
import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import useGetData from '../../hooks/useGetData';
import { ContactRaw } from '../../types/contact'
import { RootState } from '../../store/store';
import { setTotalpage, setSelected } from '../../store/contactSlice';
import { Skeleton, useMantineColorScheme } from '@mantine/core';

const TableBody = () => {
    const { classes, theme } = useStyles()
    const dispatch = useDispatch()
    const { colorScheme } = useMantineColorScheme()
    const page = useSelector((state: RootState) => state.contact.page) ?? 1
    const { data, isLoading, error, refetch } = useGetData(page);
    const [contactList, setContactList] = useState<ContactRaw[]>()

    useEffect(() => {
        if (data && !isLoading) {
            const members = data?.members ?? []
            const totalPage = data?.total_pages ?? 1
            setContactList(members)
            dispatch(setTotalpage(totalPage))
        }
    }, [data, isLoading])

    useEffect(() => {
        if (page) {
            refetch()
        }
    }, [page])

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

    const renderRows = () => {
        return contactList?.map((contact: ContactRaw) => {
            return <tr
                onClick={() => handleUpdate(contact)}
                key={contact?.id}
                className={classes.trow}
            >
                <td>{contact?.merge_fields?.FNAME}</td>
                <td>{contact?.merge_fields?.LNAME}</td>
                <td>{contact?.email_address}</td>
                <td>{contact?.merge_fields?.PHONE}</td>
                <td>{parseAddress(contact)}</td>
                <td>{contact?.last_changed}</td>
            </tr>
        })
    }

    return (
        <tbody>
            {isLoading && Array(10).fill(null).map((_data, index) => (
                <tr key={index}>
                    {Array(6).fill(null).map((_data, innerIndex) => (
                        <td>  <Skeleton
                            key={`${index}-${innerIndex}`}
                            sx={{
                                ':after': {
                                    backgroundColor: colorScheme === 'dark' ? theme.colors.white[2] : theme.colors.black[2]
                                }
                            }}
                            height={12} radius="xl" />
                        </td>
                    ))}
                </tr>
            ))
            }
            {!isLoading && contactList && contactList?.length > 0 && renderRows()}
        </tbody>
    );
};

export default TableBody;