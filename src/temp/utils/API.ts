import superagentPromise from 'superagent-promise';
import _superagent, { ResponseError, Request, Response } from 'superagent';
import authStore from '../stores/authStore';
import { 
  UserPasswordBaseType, 
  UserBaseType, 
  PackinglistBaseType, 
  CaseBaseType,
  AdjustmentBaseType,
  GridBaseType,
  GridRelationBaseType
} from "./types"

declare type ResponseError = typeof ResponseError
declare type Request = typeof Request
declare type Response = typeof Response

const superagent = superagentPromise(_superagent, global.Promise);

const BASE_URL = process.env.REACT_APP_BASE_URL

const handleErrors = (err: ResponseError) => {
  if (err && err.response && err.response.status === 401) { // token needs to be refreshed
    authStore.logout();
  }
  return err;
};

const responseBody = (res: Response) => res.body;

const tokenPlugin = (req: Request) => {
  if (authStore.token.accessToken && authStore.token.tokenType) {
    req.set('Authorization', `${authStore.token.tokenType} ${authStore.token.accessToken}`);
  }
};

const requests = {
  del: (endpoint: string) =>
    superagent
      .del(`${BASE_URL}${endpoint}`)
      .use(tokenPlugin)
      .end(handleErrors)
      .then(responseBody),
  get: (endpoint: string) =>
    superagent
      .get(`${BASE_URL}${endpoint}`)
      .use(tokenPlugin)
      .end(handleErrors)
      .then(responseBody),
  put: (endpoint: string, body: any) =>
    superagent
      .put(`${BASE_URL}${endpoint}`, body)
      .use(tokenPlugin)
      .end(handleErrors)
      .then(responseBody),
  post: (endpoint: string, body: any) =>
    superagent
      .post(`${BASE_URL}${endpoint}`, body)
      .use(tokenPlugin)
      .end(handleErrors)
      .then(responseBody),
  postForm: (endpoint: string, form: any) =>
    superagent
      .post(`${BASE_URL}${endpoint}`)
      .accept('application/json')
      .field('username', form.email)
      .field('password', form.password)
};

const Auth = {
  login: (email: string, password: string) =>
    requests.postForm('/auth/login', { email: email, password: password }),
  getAccount: () =>
    requests.get('/auth/account'),
};

const User = {
  createUser: (userbase: UserBaseType) =>
    requests.post('/users', userbase),
  updateUserPassword: (userId: number, userpasswordbase: UserPasswordBaseType) =>
    requests.put(`/users/${userId}/password`, userpasswordbase),
}

const Packinglist = {
  getPackinglists: (skip: number = 0, limit: number = 10000) =>
    requests.get(`/packinglists?skip=${skip}&limit=${limit}`),
  createPackinglist: (packinglistbase: PackinglistBaseType) =>
    requests.post('/packinglists', packinglistbase),
  updatePackinglist: (packinglistId: number, packinglistbase: PackinglistBaseType) =>
    requests.put(`/packinglists/${packinglistId}`, packinglistbase),
  deletePackinglist: (packinglistId: number) =>
    requests.del(`/packinglists/${packinglistId}`),
}

const Case = {
  getCaseInfosByPackinglistId: (packinglistId: number, skip: number = 0, limit: number = 10000) =>
    requests.get(`/packinglists/${packinglistId}/cases?skip=${skip}&limit=${limit}`),
  createCase: (casebase: CaseBaseType) =>
    requests.post('/cases', casebase),
  updateCase: (caseId: number, casebase: CaseBaseType) =>
    requests.put(`/cases/${caseId}`, casebase),
  deleteCase: (caseId: number) =>
    requests.del(`/cases/${caseId}`),
  // getMaterials: (caseId: number) =>
  //   requests.get(`/cases/${caseId}/materials`),
  // createOrUpdateAdjustment: (caseId: number, adjustmentbase: AdjustmentBaseType) =>
  //   requests.put(`/cases/${caseId}/adjustments`, adjustmentbase),
}

const Grid = {
  getGrids: () =>
    requests.get('/grids'),
  createGrid: (gridbase: GridBaseType) =>
    requests.post('/grids', gridbase),
  updateGrid: (gridId: number, gridbase: GridBaseType) =>
    requests.put(`/grids/${gridId}`, gridbase),
  deleteGrid: (gridId: number) =>
    requests.del(`/grids/${gridId}`),
}

const GridRelation = {
  getGridRelations: () =>
    requests.get('/gridrelations'),
  createGridRelation: (gridrelationbase: GridRelationBaseType) =>
    requests.post('/gridrelations', gridrelationbase),
  updateGridRelation: (gridRelationId: number, gridrelationbase: GridRelationBaseType) =>
    requests.put(`/gridrelations/${gridRelationId}`, gridrelationbase),
  deleteGridRelation: (gridRelationId: number) =>
    requests.del(`/gridrelations/${gridRelationId}`),
}

const API = {
  Auth,
  User,
  Packinglist,
  Case,
  Grid,
  GridRelation,
};

export default API;
