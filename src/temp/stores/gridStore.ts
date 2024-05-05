import { observable, action, makeObservable } from 'mobx';
import API from '../utils/API';
import { GridBaseType, GridType } from "../utils/types"

export class GridStore {
    
    grids: GridType[] = []

    constructor() {
        makeObservable(this, {
            grids: observable,
            setGrids: action,
            getGrids: action,
            createGrid: action,
            updateGrid: action,
            deleteGrid: action,
        });
    }

    setGrids(grids: GridType[]) {
        this.grids = grids
    }

    getGrids() {
        API.Grid.getGrids()
            .then((response: any) => {
                const grids: GridType[] = response.body
                this.setGrids(grids)
            })
            .catch((error: any) => {
                console.log(error)
            })
    }

    createGrid(dto: GridBaseType) {
        API.Grid.createGrid(dto)
            .then((response: any) => {
                if (response.status === 200) { // TBD
                    this.getGrids()
                }
            })
            .catch((error: any) => {
                console.log(error)
            })
    }

    updateGrid(gridId: number, dto: GridBaseType) {
        API.Grid.updateGrid(gridId, dto)
            .then((response: any) => {
                if (response.status === 200) { // TBD
                    this.getGrids()
                }
            })
            .catch((error: any) => {
                console.log(error)
            })
    }

    deleteGrid(gridId: number) {
        API.Grid.deleteGrid(gridId)
            .then((response: any) => {
                if (response.body === 200) { // TBD
                    this.getGrids()
                }
            })
            .catch((error: any) => {
                console.log(error)
            })
    }
}

export default new GridStore();