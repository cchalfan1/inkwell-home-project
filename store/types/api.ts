export interface LocationObj {
    line:   number
    column: number
}

export interface ErrorObj {
    message: string
    status:  number
    locations: Array<LocationObj>
}

export type Data = {
    statusCode?: number
    errors?: Array<ErrorObj>
}
