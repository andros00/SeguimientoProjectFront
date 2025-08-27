export interface IProjectIFormalDTO{
   id: string ;
    projectCode: string,
    duration: number,
    startDate: Date,
    endDate: Date,
    notifiedIf: string,
    notifiedFf: string,
    notifiedPa: string,
    notifiedAr: string,
    notifiedDatePe: Date,
    notifiedDateTe: Date,
    userCreate: string,
    dateCreate: Date,
    userModify: string,
    dateModify: Date,
    internalCode: string,
    status: string,
    approvalCode: string,
    approvalDate: Date
}
