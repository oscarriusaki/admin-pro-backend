/*  
Medicos
/api/medicos
 */
const { Router }  = require("express");
const { check } = require("express-validator");
const { validarCampos } = require('../middlewares/validar-campos')
const { validarJWT } = require("../middlewares/validar-jwt");

const {crearMedicos,
       actualizarMedicos,
       borrarMedicos, 
       getMedicos}= require('../controllers/medicos');

const router = Router();
router.get('/', getMedicos);

router.post('/', [
            validarJWT,
            check('nombre','El nombre del medico es necesario').not().isEmpty(),
            check('hospital','El Hospital id debe ser valido').isMongoId(),
            validarCampos
        ] , 
        crearMedicos);

router.put('/:id',
        [],
        actualizarMedicos,
        )
router.delete('/:id',
    borrarMedicos
)

module.exports = router;