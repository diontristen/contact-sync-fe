
export interface Address {
    addr1: string
    addr2: string
    city: string
    state: string
    zip: string
    country: string
}

export interface ContactRaw {
    id?: string,
    email_address: string
    status?: string
    merge_fields: {
        FNAME?: string
        LNAME?: string
        BIRTHDAY?: string
        PHONE?: string
        ADDRESS?: Address
        ADDR1?: string
        ADDR2?: string
        CITY?: string
        STATE?: string
        ZIP?: string
        COUNTRY?: string
    }
    last_changed?: string
}
export interface Contact {
    first_name: string
    last_name: string
    email: string
    phone_number: string
    address_1: string
    address_2: string
    city: string
    state: string
    zip: string
    country: string
}

