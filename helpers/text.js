const TEXT = {
    //TOKEN
    NO_TOKEN: 'No existe token en la petición',
    INVALID_TOKEN: 'El token no es válido',
    TOKEN_CREATION_FAIL: 'No se pudo generar el token',
    TOKEN_EXPIRES: '2hr',
    //AUTH
    USER_ALREADY_EXIST: 'El usuario ya existe en el sistema',
    USER_NOT_EXIST: 'El usuario no existe en el sistema',
    PASSWORD_NOT_MATCH: 'password no coincide',
    //EVENTS
    EVENT_NOT_EXIST:'No existe este evento',
    NOT_ALLOWED:'No tiene privilegios para modificar ese evento',
    //DATABASE
    DATABASE_CONNECTED: 'Base de datos conectada con éxito',
    CONNECTION_FAIL: 'Error de conexión a la base de datos'
};
const EXPRESS_VALIDATOR ={
    NAME_REQUIRED: 'El nombre es obligatorio',
    EMAIL_REQUIRED: 'El email es obligatorio',
    PASSWORD_REQUIRED: 'El password debe ser tener mínimo 6 caracteres',
    TITLE_REQUIRED: 'El titulo es obligatorio',
    START_DATE_REQUIRED: 'La fecha de inicio es obligatoria',
    END_DATE_REQUIRED: 'La fecha de fin es obligatoria',
};
const FIELDS ={
    NAME: 'name',
    EMAIL: 'email',
    PASSWORD: 'password',
    TITLE: 'title',
    START_DATE: 'start',
    END_DATE: 'end',
};

module.exports = {
    TEXT,
    EXPRESS_VALIDATOR,
    FIELDS
};