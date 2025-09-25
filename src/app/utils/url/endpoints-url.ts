export const ENDPOINTS = {
  V1: {
    SHARED_URL: {
      ADMINISTRATIVE_CENTER_LIST: "v1/compartido/centros-administrativos",
      PROJECT_TYPES_LIST: "v1/compartido/tipos-proyecto",
    },
    PROJECT_URL: {
      STATUS_BY_USER_LIST: "v1/proyecto/estados-por-usuario",
      FILTER: "v1/proyecto/filtrar",
    },
    ADMIN_URL: {
      FILTER_PROCESS_SELECTION_LIST: "v1/administrador/filtro-proceso-seleccion"
    },
    ANNOUNCEMENT_URL: {
      ANNOUNCEMENT_LIST: "v1/convocatoria/lista-convocatorias",
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
