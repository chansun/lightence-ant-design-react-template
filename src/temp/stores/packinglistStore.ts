import { observable, action, makeObservable } from 'mobx';
import API from '../utils/API';
import { PackinglistBaseType, PackinglistType } from "../utils/types"

export class PackinglistStore {

    packinglists: PackinglistType[] = []

    constructor() {
        makeObservable(this, {
            packinglists: observable,
            setPackinglists: action,
            getPackinglists: action,
            createPackinglist: action,
            updatePackinglist: action,
            deletePackinglist: action,
        });
    }

    setPackinglists(packinglists: PackinglistType[]) {
        this.packinglists = packinglists
    }

    exist(id: number): boolean {
        for (let i = 0; i < this.packinglists.length; i++) {
            if (this.packinglists[i].id == id) { 
                return true
            }
        }
        return false
    }

    getById(id: number): PackinglistType {
        for (let i = 0; i < this.packinglists.length; i++) {
            if (this.packinglists[i].id == id) { 
                return this.packinglists[i]
            }
        }
        return {
            id: 0,
            customerName: "",
            forkliftType: 0,
            userId: 0,
            cases: [],
            gridrelation: [],
        }
    }

    async getPackinglists(): Promise<boolean> {
        return await API.Packinglist.getPackinglists()
            .then((response: PackinglistType[]) => {
                this.setPackinglists(response)
                return true
            })
            .catch((error: any) => {
                console.log(error)
                return false
            })
    }

    async createPackinglist(dto: PackinglistBaseType): Promise<boolean> {
        return await API.Packinglist.createPackinglist(dto)
            .then((response: PackinglistType) => {
                this.setPackinglists([...this.packinglists, response])
                return true
            })
            .catch((error: any) => {
                console.log(error)
                return false
            })
    }

    async updatePackinglist(packinglistId: number, dto: PackinglistBaseType): Promise<boolean> {
        return await API.Packinglist.updatePackinglist(packinglistId, dto)
            .then((response: any) => {
                const newPackinglists = this.packinglists.map((packinglist) => {
                    if (packinglist.id == response.id) {
                        return response
                    }
                    return packinglist
                })
                this.setPackinglists(newPackinglists)
                return true
            })
            .catch((error: any) => {
                console.log(error)
                return false
            })
    }

    async deletePackinglist(packinglistId: number): Promise<boolean> {
        return await API.Packinglist.deletePackinglist(packinglistId)
            .then((response: any) => {
                const newPackinglist = this.packinglists.filter((packinglist) => { return packinglist.id != packinglistId })
                this.setPackinglists(newPackinglist)
                return true
            })
            .catch((error: any) => {
                console.log(error)
                return false
            })
    }
}

export default new PackinglistStore();