const {Router} = require('express');
const {check} = require('express-validator');
const validarJWT = require('../middlewares/validar-jwt');
const validarCampos = require('../middlewares/validar-campos');
const isDate = require('../helpers/isDate');
const {FIELDS,EXPRESS_VALIDATOR} = require('../helpers/text');

const {
    getEventos,
    crearEvento,
    eliminarEvento,
    actualizarEvento
} = require('../controllers/events.controller');

const router = Router();

router.use(validarJWT);

router.get('/',getEventos);
router.post(
    '/',
    [
        check(FIELDS.TITLE, EXPRESS_VALIDATOR.TITLE_REQUIRED).not().isEmpty(),
        check(FIELDS.START_DATE, EXPRESS_VALIDATOR.START_DATE_REQUIRED).custom(isDate),
        check(FIELDS.END_DATE, EXPRESS_VALIDATOR.END_DATE_REQUIRED).custom(isDate),
        validarCampos
    ],
    crearEvento);
router.put('/:id',actualizarEvento);
router.delete('/:id',eliminarEvento);

module.exports = router;