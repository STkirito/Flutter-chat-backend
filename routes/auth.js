/*

path: api/login

*/

const { Router, response }  = require('express');
const { check } = require('express-validator');
const { crearUsuario, login, renewToken } = require('../controllers/auth');
const { validarCampos } = require('../middlewares/validar-campos');
const { validarJWT } = require('../middlewares/validar-jwt');
const router = Router();


router.post('/new',[
    check('nombre','El Nombre es obligarotio').not().isEmpty(),
    check('email','El Email es obligarotio').isEmail(),
    check('password','El Password es obligarotio').not().isEmpty(),
    validarCampos
],crearUsuario);

//post: /
// validar email, password
router.post('/',[
    check('password','El Password es obligarotio').not(),
    check('email','El Email es obligarotio').isEmail(),
],login);
//validarJWT
router.get('/renew',validarJWT,renewToken);

module.exports = router;