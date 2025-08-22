export interface IProjectParticipantDTO{
   id: String ;
    project: String ;
    responsible: String ;
    fullName: String;
    group: Number ;
    dedicationMonths: Number ;
    dedicationHours: Number ;
    dedicationMonthsPlan: Number ;
    dedicationHoursPlan: Number ;
    supportedProgramCode: Number ;
    academicProgPercentage: DoubleRange;
    projectParticipantRole: [];
}
