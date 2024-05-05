import { observable, action, makeObservable } from 'mobx';
import API from '../utils/API';
import { CaseBaseType, CaseType, CaseInfoType, AdjustmentBaseType } from "../utils/types"

export class CaseStore {

    caseInfosForCasesPage: CaseInfoType[] = []
    caseInfosForMaterialsPage: CaseInfoType[] = []

    constructor() {
        makeObservable(this, {
            caseInfosForCasesPage: observable,
            caseInfosForMaterialsPage: observable,
            setCaseInfosForCasesPage: action,
            setCaseInfosForMaterialsPage: action,
            createCase: action,
            updateCase: action,
            deleteCase: action,
        });
    }

    setCaseInfosForCasesPage(caseInfos: CaseInfoType[]) {
        this.caseInfosForCasesPage = caseInfos
    }

    setCaseInfosForMaterialsPage(caseInfos: CaseInfoType[]) {
        this.caseInfosForMaterialsPage = caseInfos
    }

    setCaseInfos(caseInfos: CaseInfoType[]) {
        this.setCaseInfosForCasesPage(caseInfos)
        this.setCaseInfosForMaterialsPage(caseInfos)
    }

    getSetCaseInfosByPage(page: string, caseInfos: CaseInfoType[]) {
        if (page == "cases") {
            return this.setCaseInfosForCasesPage(caseInfos)
        } else {
            return this.setCaseInfosForMaterialsPage(caseInfos)
        }
    }

    getCaseInfosByPage(page: string) {
        if (page == "cases") {
            return this.caseInfosForCasesPage
        } else {
            return this.caseInfosForMaterialsPage
        }
    }

    exist(id: number, page: string): boolean {
        const caseInfos = this.getCaseInfosByPage(page)
        for (let i = 0; i < caseInfos.length; i++) {
            if (caseInfos[i].id == id) { 
                return true
            }
        }
        return false
    }

    match(id: number, packinglistId: number, page: string): boolean {
        const caseInfos = this.getCaseInfosByPage(page)
        for (let i = 0; i < caseInfos.length; i++) {
            if (caseInfos[i].id == id && caseInfos[i].packinglistId == packinglistId) { 
                return true
            }
        }
        return false
    }

    getCaseInfoById(id: number, page: string): CaseInfoType {
        const caseInfos = this.getCaseInfosByPage(page)
        for (let i = 0; i < caseInfos.length; i++) {
            if (caseInfos[i].id == id) { 
                return caseInfos[i]
            }
        }
        return {
            id: 0,
            description: "",
            boxType: "",
            weight: 0,
            innerBoxLength: 0,
            innerBoxWidth: 0,
            innerBoxHeight: 0,
            outerBoxLength: 0,
            outerBoxWidth: 0,
            outerBoxHeight: 0,
            quantity: 0,
            boardPlank: false,
            packinglistId: 0,
            cbm: 0,
        }
    }

    async getCaseInfosByPackinglistId(packinglistId: number, page: string | null = null): Promise<boolean> {
        return await API.Case.getCaseInfosByPackinglistId(packinglistId)
            .then((response: CaseInfoType[]) => {
                if (page == null) {
                    this.setCaseInfos(response)
                } else if (page == "cases") {
                    this.setCaseInfosForCasesPage(response)
                } else {
                    this.setCaseInfosForMaterialsPage(response)
                }
                return true
            })
            .catch((error: any) => {
                console.log(error)
                return false
            })
    }

    async createCase(dto: CaseBaseType): Promise<boolean> {
        return await API.Case.createCase(dto)
            .then((response: CaseType) => {
                this.getCaseInfosByPackinglistId(dto.packinglistId)
                return true
            })
            .catch((error: any) => {
                console.log(error)
                return false
            })
    }

    async updateCase(caseId: number, dto: CaseBaseType): Promise<boolean> {
        return await API.Case.updateCase(caseId, dto)
            .then((response: any) => {
                this.getCaseInfosByPackinglistId(dto.packinglistId)
                return true
            })
            .catch((error: any) => {
                console.log(error)
                return false
            })
    }

    deleteCase(caseId: number) {
        API.Case.deleteCase(caseId)
            .then((response: any) => {
                if (response.body !== 200) {
                    console.log(response)
                }
            })
            .catch((error: any) => {
                console.log(error)
            })
    }

    async deleteCaseInfo(caseId: number): Promise<boolean> {
        return await API.Case.deleteCase(caseId)
            .then((response: any) => {
                const caseInfosForCasesPage = this.caseInfosForCasesPage.filter((caseInfo) => {return caseInfo.id != caseId});
                this.setCaseInfosForCasesPage(caseInfosForCasesPage)
                const caseInfosForMaterialsPage = this.caseInfosForMaterialsPage.filter((caseInfo) => {return caseInfo.id != caseId});
                this.setCaseInfosForMaterialsPage(caseInfosForMaterialsPage)
                return true
            })
            .catch((error: any) => {
                console.log(error)
                return false
            })
    }

    /*
    getMaterials(caseId: number) {
        API.Case.getMaterials(caseId)
            .then((response: any) => {
                if (response.body === 200) { // TBD
                    //this.getCases()
                }
            })
            .catch((error: any) => {
                console.log(error)
            })
    }

    createOrUpdateAdjustment(caseId: number, dto: AdjustmentBaseType) {
        API.Case.createOrUpdateAdjustment(caseId, dto)
            .then((response: any) => {
                if (response.body === 200) { // TBD
                    //this.getCases()
                }
            })
            .catch((error: any) => {
                console.log(error)
            })
    }*/
}

export default new CaseStore();