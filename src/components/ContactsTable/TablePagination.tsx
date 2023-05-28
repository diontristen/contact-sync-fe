import { useDispatch, useSelector } from "react-redux";
import { Box, Pagination, useMantineColorScheme } from '@mantine/core';
import { RootState } from '../../store/store';
import useStyles from './ContactsTable.styles'
import { setPage } from '../../store/contactSlice';



const TablePagination = () => {
    const dispatch = useDispatch()
    const { colorScheme } = useMantineColorScheme()
    const page = useSelector((state: RootState) => state.contact.page) ?? 1
    const totalPage = useSelector((state: RootState) => state.contact.totalPage) ?? 1

    const { theme } = useStyles()

    const handlePageChange = (value: number) => {
        dispatch(setPage(value))
    }

    return (
        <Box sx={{
            width: '100%',
            display: 'flex',
            justifyContent: 'flex-end',
            alignItems: 'center',
            margin: '16px 0'
        }}>
            <Pagination
                value={page}
                total={totalPage}
                onChange={handlePageChange}
                size="sm"
                withEdges
                sx={{
                    'button:hover': {
                        color: colorScheme === 'dark' ? theme.colors.white[0] : theme.colors.white[0],
                        backgroundColor: (colorScheme === 'dark' ? theme.colors.primary[1] : theme.colors.primary[1]) + '!important',
                    },
                    'button[data-active]': {
                        color: colorScheme === 'dark' ? theme.colors.white[0] : theme.colors.white[0],
                        backgroundColor: colorScheme === 'dark' ? theme.colors.primary[1] : theme.colors.primary[1],
                        ':hover': {
                            backgroundColor: colorScheme === 'dark' ? theme.colors.primary[3] : theme.colors.primary[1],
                        }
                    },
                    'button[data-active]:not([data-disabled]):hover': {
                        color: colorScheme === 'dark' ? theme.colors.white[0] : theme.colors.white[0],
                        backgroundColor: colorScheme === 'dark' ? theme.colors.primary[1] : theme.colors.primary[1],
                    }
                }}
            />
        </Box>
    );
};

export default TablePagination;