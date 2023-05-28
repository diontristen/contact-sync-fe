export const parseAddress = (contact: Record<string, any>) => {
    return `${contact?.merge_fields?.ADDR1} ${contact?.merge_fields?.ADDR2} ${contact?.merge_fields?.CITY} ${contact?.merge_fields?.STATE} ${contact?.merge_fields?.ZIP} ${contact?.merge_fields?.COUNTRY}`
}