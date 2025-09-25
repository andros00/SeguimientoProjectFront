export const ENDPOINTS = {
  V1: {
    SHARED_URL: {
      ADMINISTRATIVE_CENTER_LIST: "/compartido/centros-administrativos",
      PROJECT_TYPES_LIST: "/compartido/tipos-proyecto",
    },
    PROJECT_URL: {
      STATUS_BY_USER_LIST: "/proyecto/estados-proyecto",
      FILTER: "/proyectos/consultar",
    },
    ADMIN_URL: {
      FILTER_PROCESS_SELECTION_LIST: "/compartido/filtro-proceso-seleccion"
    },
    ANNOUNCEMENT_URL: {
      ANNOUNCEMENT_LIST: "/convocatoria/lista-convocatorias",
    },
    PARTICIPANT_URL: {
      PARTICIPANT_PROJECT: "v1/proyecto/participante",
    },
    IFORMAL_URL: {
      PROJECT_IFORMAL: "v1/proyecto/inicio-formal",
      PROJECT_IFORMAL_BY_CODE: "v1/proyecto/inicio-formal/code"
    },
    ROL_URL: {
      PARTICIPANT_ROLE: "v1/proyecto/participante/rol",
    },
    GROUP_URL: {
      PARTICIPANT_GROUP: "v1/proyecto/participante/rol",
    }
  }
};
