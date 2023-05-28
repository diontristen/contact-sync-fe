import { useState } from 'react'
import { Box, Table, ScrollArea, useMantineColorScheme } from '@mantine/core';
import TableBody from './TableBody';
import useStyles from './ContactsTable.styles'
import TablePagination from './TablePagination';
const TableContent = () => {
    const { classes, theme, cx } = useStyles()
    const { colorScheme } = useMantineColorScheme()
    const [scrolled, setScrolled] = useState<boolean>(false);
    const [deleteSelected, setDeleteSelected] = useState<boolean>(false);
    return (
        <Box>
            <TablePagination />
            <Box
                className={classes.tableContainer}
                sx={{
                    borderColor: (colorScheme === 'dark' ? theme.colors.secondary[0] : theme.colors.white[3]),
                }}>
                <ScrollArea onScrollPositionChange={({ y }) => setScrolled(y !== 0)}>
                    <Table
                        verticalSpacing="xl"
                        horizontalSpacing="md"
                        striped
                        highlightOnHover
                        sx={{
                            'tr': {
                                cursor: 'pointer'
                            },
                            'th, td': {
                                color: colorScheme === 'dark' ? theme.colors.white[9] : theme.colors.black[5] + '!important'
                            },
                            'thead': {
                                backgroundColor: colorScheme === 'dark' ? theme.colors.secondary[6] : theme.colors.white[1]
                            },
                            'tbody tr:nth-of-type(even)': {
                                backgroundColor: 'transparent',
                                ':hover': {
                                    backgroundColor: (colorScheme === 'dark' ? theme.colors.secondary[4] : theme.colors.white[3]) + '!important',
                                }
                            },
                            'tbody tr:nth-of-type(odd)': {
                                backgroundColor: (colorScheme === 'dark' ? theme.colors.secondary[2] : theme.colors.white[3]) + '!important',
                                ':hover': {
                                    backgroundColor: (colorScheme === 'dark' ? theme.colors.secondary[4] : theme.colors.white[3]) + '!important',
                                }
                            }
                        }}
                    >
                        <thead
                            className={cx(classes.thead, { [classes.scrolled]: scrolled })}>
                            <tr>
                                {/* <th></th> */}
                                <th>First Name</th>
                                <th>Last name</th>
                                <th>Email</th>
                                <th>Phone</th>
                                <th>Address</th>
                                <th>Last Changed</th>
                            </tr>
                        </thead>
                        <TableBody />
                    </Table>
                </ScrollArea>
            </Box>
            <TablePagination />
        </Box>

    );
};

export default TableContent;