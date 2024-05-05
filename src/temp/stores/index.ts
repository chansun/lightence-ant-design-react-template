import authStore, { AuthStore } from './authStore';
import caseStore, { CaseStore } from './caseStore';
import gridRelationStore, { GridRelationStore } from './gridRelationStore';
import gridstore, { GridStore } from './gridStore';
import packinglistStore, { PackinglistStore } from './packinglistStore';
import userStore, { UserStore } from './userStore';

export type RootStore = {
  authStore: AuthStore;
  caseStore: CaseStore; // TBD
  gridRelationStore: GridRelationStore;
  gridstore: GridStore;
  packinglistStore: PackinglistStore;
  userStore: UserStore;
}

const rootStore: RootStore = {
  authStore,
  caseStore,
  gridRelationStore,
  gridstore,
  packinglistStore,
  userStore
};

export default rootStore;