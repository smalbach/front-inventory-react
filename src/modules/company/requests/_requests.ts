import axios, { AxiosResponse } from "axios"

import { CompanyModel } from "../models/Company"

const API_URL = process.env.REACT_APP_API_URL
const COMPANYS_URL = `${API_URL}/companies`

const getCompanyByNIT = (nit: string): Promise<CompanyModel | undefined> => {
  return axios.post(`${COMPANYS_URL}/searchByNIT`, {nit: nit}).then((response: AxiosResponse) => {
    return response.data as CompanyModel
  })
}


const getCompanies = (): Promise<CompanyModel[] | undefined> => {
  return axios.get(`${COMPANYS_URL}`).then((response: AxiosResponse) => {

    return response.data.data as CompanyModel[]
  })
    
}

const saveCompany = (company: CompanyModel): Promise<CompanyModel> => {
  return axios.post(`${COMPANYS_URL}`, company).then((response: AxiosResponse) => {
    const frmval = response.data
    return frmval as CompanyModel
  })
}

const updateCompany = (company: CompanyModel): Promise<CompanyModel> => {
  return axios.put(`${COMPANYS_URL}/${company.id}`, company).then((response: AxiosResponse) => {
    const frmval = response.data
    return frmval as CompanyModel
  })
}

const deleteCompany = (company: CompanyModel): Promise<CompanyModel> => {
  return axios.delete(`${COMPANYS_URL}/${company.id}`).then((response: AxiosResponse) => {
    return response.data as CompanyModel
  })
}


export {getCompanyByNIT,saveCompany,getCompanies,updateCompany,deleteCompany}
