export type TokenType = {
    accessToken: string | null
    tokenType: string | null
}

export type GridRelationBaseType = {
    packinglistId: number
    gridId: number
}

export type GridRelationType = {
    id: number
    packinglistId: number
    gridId: number
}

export type GridBaseType = {
    data: string
}

export type GridType = {
    id: number
    data: string
    userId: number
    gridrelations: GridRelationType[]
}

export type AdjustmentBaseType = {
    data: string
}

export type AdjustmentType = {
    caseId: number
    data: string
}

export type CaseInfoTableRow = {
    key: number
    description: string
    boxType: string
    weight: number
    innerBoxLength: number
    innerBoxWidth: number
    innerBoxHeight: number
    outerBoxLength: number
    outerBoxWidth: number
    outerBoxHeight: number
    quantity: number
    boardPlank: boolean
    packinglistId: number
    cbm: number
}

export type CaseInfoType = {
    id: number
    description: string
    boxType: string
    weight: number
    innerBoxLength: number
    innerBoxWidth: number
    innerBoxHeight: number
    outerBoxLength: number
    outerBoxWidth: number
    outerBoxHeight: number
    quantity: number
    boardPlank: boolean
    packinglistId: number
    cbm: number
}

export type CaseBaseType = {
    description: string
    boxType: string
    weight: number
    length: number // innerBoxLength
    width: number // innerBoxWidth
    height: number // innerBoxHeight
    quantity: number
    boardPlank: boolean
    packinglistId: number
}

export type CaseType = {
    id: number
    description: string
    boxType: string
    weight: number
    length: number // innerBoxLength
    width: number // innerBoxWidth
    height: number // innerBoxHeight
    quantity: number
    boardPlank: boolean
    packinglistId: number
    adjustment: AdjustmentType[]
}

export interface PackinglistTableRow {
    key: number;
    customerName: string;
    forkliftType: number;
}

export type PackinglistBaseType = {
    customerName: string
    forkliftType: number
}

export type PackinglistType = {
    id: number
    customerName: string
    forkliftType: number
    userId: number
    cases: CaseType[]
    gridrelation: GridRelationType[]
}

export type UserPasswordBaseType = {
    password: string
}

export type UserBaseType = {
    email: string,
    password: string
}

export type UserType = {
    id: number,
    email: string,
    password: string
}

export interface Pagination {
    current: number;
    pageSize: number;
    total?: number;
}
