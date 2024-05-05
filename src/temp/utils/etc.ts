export const sleep = async (ms: number) => {
    return new Promise((r) => setTimeout(r, ms));
};

export const convertForkliftTypeToText = (forkliftType: number) => {
    return forkliftType == 1 ? "일반 3단" : (forkliftType == 2 ? "활자 3단" : (forkliftType == 3 ? "활자 2단" : ""))
}

export const getPackinglistIdFromPathname = (pathname: string) => {
    const packinglistId = Number(window.location.pathname.split("/")[2])
    if (Number.isNaN(packinglistId)) {
        return 0
    }
    return packinglistId
}
  
export const getCaseIdFromPathname = (pathname: string) => {
    const caseId = Number(window.location.pathname.split("/")[4])
    if (Number.isNaN(caseId)) {
        return 0
    }
    return caseId
}

export const trunc = (text: string, index: number) => {
    const limit = index - 3
    if (text.length > index) {
        return text.slice(0, limit) + " ..."
    } 
    return text
}

export const convertIdToUrl = (packinglistId: number, caseId: number = nonce) => {
    if (caseId == nonce) {
        return `/packinglists/${packinglistId}/cases`
    } else {
        return `/packinglists/${packinglistId}/cases/${caseId}/materials`
    }
}

export const nonce = -80827
  