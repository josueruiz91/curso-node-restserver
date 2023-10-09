const { Router } = require('express');
const { check } = require('express-validator');

const { validarJWT, validarCampos, esAdminRole } = require('../middlewares');

const { existeCategoria, existeProducto, nombreProductoExiste } = require('../helpers/db-validators');

const { crearProducto,
        obtenerProductos, 
        obtenerProducto,
        actualizarProducto,
        borrarProducto} = require('../controllers/productos');
        

const router = Router();

/* {{url}}/api/Productos */

//Obtener todas las Productos - publico
 router.get('/', obtenerProductos);

//Obtener una Producto por id - publico
router.get('/:id', [
    check('id', 'No es un id valido').isMongoId(),
    check('id').custom(existeProducto),
    validarCampos
],obtenerProducto);

//crear Producto - privado - cualquier persona con un token valido
router.post('/', [
    validarJWT,
    check('nombre','El nombre es obligatorio').not().isEmpty(),
    check('nombre').custom(nombreProductoExiste),
    check('categoria', 'La categoría no es un id válido').isMongoId(),
    check('categoria').custom(existeCategoria),
    validarCampos
], crearProducto);

//Actualizar Producto por id - privado - cualquiera con token valido
router.put('/:id', [
    validarJWT,
    check('id', 'No es un id valido').isMongoId(),
    check('id').custom(existeProducto),
    check('nombre').custom(nombreProductoExiste),
    check('categoria', 'La categoría no es un id válido').isMongoId(),
    check('categoria').custom(existeCategoria),
    validarCampos
],actualizarProducto);

//Borrar una Producto - Admin
router.delete('/:id', [
    validarJWT,
    esAdminRole,
    check('id', 'No es un id valido').isMongoId(),
    check('id').custom(existeProducto),
    validarCampos
], borrarProducto);

module.exports = router;