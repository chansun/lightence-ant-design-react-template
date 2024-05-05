import { observable, action, makeObservable } from 'mobx';
import API from '../utils/API';
import { GridRelationBaseType, GridRelationType } from "../utils/types"

export class GridRelationStore {

    gridRelations: GridRelationType[] = []

    constructor() {
        makeObservable(this, {
            gridRelations: observable,
            setGridRelations: action,
            getGridRelations: action,
            createGridRelation: action,
            updateGridRelation: action,
            deleteGridRelation: action,
        });
    }

    setGridRelations(gridRelations: GridRelationType[]) {
        this.gridRelations = gridRelations
    }

    getGridRelations() {
        API.GridRelation.getGridRelations()
            .then((response: any) => {
                const gridRelations: GridRelationType[] = response.body
                this.setGridRelations(gridRelations)
            })
            .catch((error: any) => {
                console.log(error)
            })
    }

    createGridRelation(dto: GridRelationBaseType) {
        API.GridRelation.createGridRelation(dto)
            .then((response: any) => {
                if (response.status === 200) { // TBD
                    this.getGridRelations()
                }
            })
            .catch((error: any) => {
                console.log(error)
            })
    }

    updateGridRelation(gridRelationId: number, dto: GridRelationBaseType) {
        API.GridRelation.updateGridRelation(gridRelationId, dto)
            .then((response: any) => {
                if (response.status === 200) { // TBD
                    this.getGridRelations()
                }
            })
            .catch((error: any) => {
                console.log(error)
            })
    }

    deleteGridRelation(gridRelationId: number) {
        API.GridRelation.deleteGridRelation(gridRelationId)
            .then((response: any) => {
                if (response.body === 200) { // TBD
                    this.getGridRelations()
                }
            })
            .catch((error: any) => {
                console.log(error)
            })
    }
}

export default new GridRelationStore();