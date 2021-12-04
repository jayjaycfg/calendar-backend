const {Router} = require('express');
const router = Router();
const {check} = require('express-validator');
const {crearUsuario,loginUsuario, revalidarToken} = require('../controllers/auth.controller');
const validarCampos = require('../middlewares/validar-campos');
const validarJWT = require('../middlewares/validar-jwt');
const {FIELDS,EXPRESS_VALIDATOR} = require('../helpers/text');

router.post('/new',[
    check(FIELDS.NAME,EXPRESS_VALIDATOR.NAME_REQUIRED).not().isEmpty(),
    check(FIELDS.EMAIL,EXPRESS_VALIDATOR.EMAIL_REQUIRED).isEmail(),
    check(FIELDS.PASSWORD,EXPRESS_VALIDATOR.PASSWORD_REQUIRED).isLength({min : 6}),
    validarCampos
], crearUsuario);

router.post(
    '/',
    [
        check(FIELDS.EMAIL,EXPRESS_VALIDATOR.EMAIL_REQUIRED).isEmail(),
        check(FIELDS.PASSWORD,EXPRESS_VALIDATOR.PASSWORD_REQUIRED).isLength({min : 6}),
        validarCampos
    ],
    loginUsuario);

router.get(
    '/renew',
    validarJWT,
    revalidarToken
);

module.exports = router;