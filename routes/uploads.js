/* 
 
*/
const { Router } = require('express');
const expressFileUpload = require('express-fileupload');
const { validarJWT } = require('../middlewares/validar-jwt');
const { fileUpload } = require('../controllers/upload');
const router = Router();

router.use(expressFileUpload);
router.put('/:tipo/:id', validarJWT, fileUpload);


module.exports = router;