export interface IProjectParticipantDTO{
   id: string ;
    project: string ;
    responsible: string ;
    fullName: string;
    group: number ;
    dedicationMonths: number ;
    dedicationHours: number ;
    dedicationMonthsPlan: number ;
    dedicationHoursPlan: number ;
    supportedProgramCode: number ;
    academicProgPercentage: DoubleRange;
    projectParticipantRole: [];
}
