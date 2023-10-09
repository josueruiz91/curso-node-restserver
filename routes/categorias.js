const {Router} = require('express');
const { check } = require('express-validator');

const { validarJWT, validarCampos, esAdminRole } = require('../middlewares');

const { existeCategoria, nombreCategoriaExiste } = require('../helpers/db-validators');

const { crearCategoria,
        obtenerCategorias, 
        obtenerCategoria,
        actualizarCategoria,
        borrarCategoria} = require('../controllers/categorias');
        

const router = Router();

/* {{url}}/api/categorias */

//Obtener todas las categorias - publico
router.get('/', obtenerCategorias);

//Obtener una categoria por id - publico
router.get('/:id', [
    check('id', 'No es un id valido').isMongoId(),
    check('id').custom(existeCategoria),
    validarCampos
],obtenerCategoria);

//crear categoria - privado - cualquier persona con un token valido
router.post('/', [
    validarJWT,
    check('nombre','El nombre es obligatorio').not().isEmpty(),
    validarCampos
], crearCategoria);

//Actualizar categoria por id - privado - cualquiera con token valido
router.put('/:id', [
    validarJWT,
    check('id', 'No es un id valido').isMongoId(),
    check('id').custom(existeCategoria),
    check('nombre').custom(nombreCategoriaExiste),
    validarCampos
],actualizarCategoria);

//Borrar una categoria - Admin
router.delete('/:id', [
    validarJWT,
    esAdminRole,
    check('id', 'No es un id valido').isMongoId(),
    check('id').custom(existeCategoria),
    validarCampos
], borrarCategoria);

module.exports = router;