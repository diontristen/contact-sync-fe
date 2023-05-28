import { PayloadAction, createSlice } from '@reduxjs/toolkit';
import { Contact } from '../types/contact';

interface ContactState {
    page: number;
    totalPage: number
    totalItems: number
    selected?: Contact
}

const initialState: ContactState = {
    page: 1,
    totalPage: 1,
    totalItems: 0,
    selected: undefined,
};

const contactSlice = createSlice({
    name: 'counter',
    initialState,
    reducers: {
        setPage: (state, action: PayloadAction<number>) => {
            state.page = action.payload
        },
        setTotalpage: (state, action: PayloadAction<number>) => {
            state.totalPage = action.payload
        },
        setTotalItems: (state, action: PayloadAction<number>) => {
            state.totalItems = action.payload
        },
        setSelected: (state, action: PayloadAction<Contact>) => {
            state.selected = action.payload
        },
        resetSelected: (state) => {
            state.selected = undefined
        }
    },
});

export const {
    setPage,
    setTotalpage,
    setTotalItems,
    setSelected,
    resetSelected
} = contactSlice.actions;
export default contactSlice.reducer;