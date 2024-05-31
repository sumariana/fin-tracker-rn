export interface CountryListResponse{
    data: Country[]
}

export interface Country{
    id: number,
    name: string,
    phoneCode: string,
}

export interface CountryLogin{
    accessToken: string
}