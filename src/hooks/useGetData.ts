import axios from 'axios';
import { useQuery, useMutation } from 'react-query';
import { AxiosResponse } from 'axios';
import { ContactRaw, Contact } from '../types/contact';
interface Data {
    members: ContactRaw[]
    total_items: number
    total_pages: number
}

interface DataCSV {
    new_members: ContactRaw[]
    updated_members: ContactRaw[]
    failed_members: ContactRaw[]
}

const fetchData = async (page?: number): Promise<Data> => {
    const response: AxiosResponse = await axios.get<AxiosResponse>(`/v1/contacts?page=${page ?? 1}`);
    const data: Data = response?.data
    return data;
};

const addData = async (newData: Contact): Promise<Data> => {
    const response: AxiosResponse = await axios.post<AxiosResponse>('/v1/contacts', newData);
    const data: Data = response?.data
    return data;
};

const updateData = async (newData: Contact): Promise<Data> => {
    const response: AxiosResponse = await axios.put<AxiosResponse>('/v1/contacts', newData);
    const data: Data = response?.data
    return data;
};

const deleteData = async (email: string): Promise<Data> => {
    const response: AxiosResponse = await axios.delete<AxiosResponse>('/v1/contacts/' + email);
    const data: Data = response?.data
    return data;
};

const uploadCsv = async (formData: FormData): Promise<DataCSV> => {
    const response: AxiosResponse = await axios.post<AxiosResponse>('/v1/contacts/csv', formData, {
        headers: {
            'Content-Type': 'text/csv',
        },
    });
    const data: DataCSV = response?.data
    return data;
};

const replaceCsv = async (formData: FormData): Promise<DataCSV> => {
    const response: AxiosResponse = await axios.post<AxiosResponse>('/v1/contacts/csv/replace', formData, {
        headers: {
            'Content-Type': 'text/csv',
        },
    });
    const data: DataCSV = response?.data
    return data;
};

const exportCsv = async (): Promise<Blob> => {
    const response: AxiosResponse = await axios.get<AxiosResponse>('/v1/contacts/csv',  { responseType: 'blob' });
    const data: Blob = response?.data
    return data;
};

const useGetData = (page?: number): {
    data: Data | undefined;
    isLoading: boolean
    uploading: boolean
    exporting: boolean
    replaceUploading: boolean
    error: any;
    refetch: () => void;
    addContact: (newData: Contact) => Promise<Data>;
    updateContact: (newData: Contact) => Promise<Data>;
    deleteContact: (email: string) => Promise<Data>;
    addContactByCsv: (formData: FormData) => Promise<DataCSV>;
    replaceContactByCsv: (formData: FormData) => Promise<DataCSV>;
    exportContactsToCsv: () => Promise<Blob>;
    refetchData: (page: number) => Promise<Data>
} => {
    const { data, isLoading, error, refetch } = useQuery<Data>(['users', page], () => fetchData(page), {
        enabled: false, // Disable automatic data fetching
    });

    const { mutateAsync: add } = useMutation(addData, {
        onSuccess: () => {
            if (page === 1) {
                refetch();
            }
        }
    });

    const { mutateAsync: update } = useMutation(updateData, {
        onSuccess: () => {
            refetch();
        }
    });

    const { mutateAsync: remove } = useMutation(deleteData, {
        onSuccess: () => {
            refetch();
        }
    });


    const { mutateAsync: addCsv, isLoading: uploading } = useMutation(uploadCsv, {
        onSuccess: () => {
            refetch();
        }
    });

    const { mutateAsync: repCsv, isLoading: replaceUploading } = useMutation(replaceCsv, {
        onSuccess: () => {
            refetch();
        }
    });

    const { mutateAsync: exportContact, isLoading: exporting } = useMutation(exportCsv);


    const refetchData = async (page: number): Promise<Data> => {
        return fetchData(page);
    };

    const addContact = async (newData: Contact): Promise<Data> => {
        return add(newData);
    };

    const updateContact = async (newData: Contact): Promise<Data> => {
        return update(newData);
    };
    const deleteContact = async (email: string): Promise<Data> => {
        return remove(email);
    };
    const addContactByCsv = async (formData: FormData): Promise<DataCSV> => {
        return addCsv(formData);
    };

    const replaceContactByCsv = async (formData: FormData): Promise<DataCSV> => {
        return repCsv(formData);
    };


    const exportContactsToCsv = async (): Promise<Blob> => {
        return exportContact();
    };



    return {
        data,
        isLoading,
        error,
        uploading,
        replaceUploading,
        exporting,
        refetch,
        addContact,
        updateContact,
        deleteContact,
        addContactByCsv,
        replaceContactByCsv,
        exportContactsToCsv,
        refetchData
    };
};

export default useGetData;