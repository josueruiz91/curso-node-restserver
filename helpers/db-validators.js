const { Usuario, Role, Categoria, Producto } = require('../models');

const esRolValido = async(rol = '') => {
    const existeRol = await Role.findOne({rol});
    if(!existeRol){
        throw new Error(`El rol ${rol} no está registrado en la BD`)
    }
}

const emailExiste = async(correo = '') => {
    const existeEmail = await Usuario.findOne({ correo });
    if(existeEmail){
        throw new Error(`El correo: ${correo} ya está registrado`)
    }
}

const existeUsuarioPorId = async(id) => {
    const existeUsuario = await Usuario.findById(id);
    if (!existeUsuario) {
        throw new Error(`El id: ${id} no está registrado`);
    }
}

//Categorías

const existeCategoria = async(id) => {
    const existeCat = await Categoria.findOne({_id:id,estado:true});
    if (!existeCat) {
        throw new Error(`El id: ${id} no está registrado`);
    }
}

const nombreCategoriaExiste = async(nombre = '') => {
    const nombreCategoria = nombre.toUpperCase()
    const categoriaExiste = await Categoria.findOne({ nombre: nombreCategoria });
    if(categoriaExiste){
        throw new Error(`La categoría: ${nombre} ya está registrada`)
    }
}

//Productos

const existeProducto = async(id) => {
    const existeProd = await Producto.findOne({_id:id,estado:true});
    if (!existeProd) {
        throw new Error(`El id: ${id} no está registrado`);
    }
}

const nombreProductoExiste = async(nombre = '') => {
    const nombreProducto = nombre.toUpperCase()
    const productoExiste = await Producto.findOne({ nombre: nombreProducto });
    if(productoExiste){
        throw new Error(`El producto: ${nombre} ya está registrado`)
    }
}

module.exports = {
    esRolValido,
    emailExiste,
    existeUsuarioPorId,
    existeCategoria,
    nombreCategoriaExiste,
    existeProducto,
    nombreProductoExiste
}