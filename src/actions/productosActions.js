// Acciones
import {
    AGREGAR_PRODUCTOS,
    AGREGAR_PRODUCTOS_EXITO,
    AGREGAR_PRODUCTOS_ERROR,
    COMENZAR_DESCARGA_PRODUCTOS,
    DESCARGA_PRODUCTOS_EXITOSA,
    DESCARGA_PRODUCTOS_ERROR,
    OBTENER_PRODUCTO_ELIMINAR,
    PRODUCTO_ELIMINADO_EXITO,
    PRODUCTO_ELIMINADO_ERROR,
    OBTENER_PRODUCTO_EDITAR,
    PRODUCTO_EDITAR_EXITO,
    PRODUCTO_EDITAR_ERROR,
    COMENZAR_EDICION_PRODUCTOS,
    PRODUCTO_EDITADO_EXITO,
    PRODUCTO_EDITADO_ERROR
} from '../types'


import clienteAxios from '../config/axios';

// Crear un nuevo Producto - Funcion Principal
export function crearNuevoProductoActions(producto)  {
    return(dispatch) => {
        dispatch( nuevoProducto() )

        // Insertar en la APi
        clienteAxios.post('https://serene-scrubland-47940.herokuapp.com/productos', producto)
        .then(respuesta => {
            console.log(respuesta)

            dispatch( agregarProductoExito( producto ))
        })
        .catch(error => {
            // console.log(error)

            // SI hay un error
            dispatch ( agregarProductoError ())
        })

        
    }
}

export const nuevoProducto = () => ({
    type: AGREGAR_PRODUCTOS
})

export const agregarProductoExito = producto => ({
    type: AGREGAR_PRODUCTOS_EXITO,
    payload: producto
})

export const agregarProductoError = error => ({
    type: AGREGAR_PRODUCTOS_ERROR,
    payload: error
})

// Obtener los resultados de la API
export function obtenerProductosActions(){
    return(dispatch) => {

        dispatch( obtenerProductosComienzo() )
            clienteAxios.get('https://serene-scrubland-47940.herokuapp.com/productos')
            .then(respuesta => {
                // console.log(respuesta)
                dispatch( descargaProductosExitosa(respuesta.data) )
            })
            .catch(error => {
                // console.log(error)
                dispatch ( descargaProductosError() )
            })
    }
}

export const obtenerProductosComienzo = () => ({
    type: COMENZAR_DESCARGA_PRODUCTOS
})

export const descargaProductosExitosa = productos => ({
    type: DESCARGA_PRODUCTOS_EXITOSA,
    payload: productos
})

export const descargaProductosError = () => ({
    type: DESCARGA_PRODUCTOS_ERROR
})


// Borrar los productos 
export function borrarProductoAction(id) {
    return (dispatch) => {
        dispatch( obtenerProductoEliminar() )

        // Eliminar desde la API
        
        clienteAxios.delete(`https://serene-scrubland-47940.herokuapp.com/productos/${id}`)
        .then(respuesta => {
            console.log(respuesta)
            dispatch( eliminarProductoExito(id) )
        })
        .catch(error => {
            console.log(error)
            dispatch( eliminarProductoError() )
        })

    }
}

export const obtenerProductoEliminar = () => ({
    type: OBTENER_PRODUCTO_ELIMINAR
}) 

export const eliminarProductoExito = id => ({
    type: PRODUCTO_ELIMINADO_EXITO,
    payload: id
})

export const eliminarProductoError = () => ({
    type: PRODUCTO_ELIMINADO_ERROR
})

// Obtener el producto a editar

export function obtenerProductoEditarAction(id) {
    return(dispatch) => {
        dispatch( obtenerProductoAction() );

        // Obtener el producto de la api
        clienteAxios.get(`https://serene-scrubland-47940.herokuapp.com/productos/${id}`)
        .then(respuesta => {
            // console.log(respuesta.data)
            dispatch( obtenerProductoEditarExito(respuesta.data))
        })
        .catch(error => {
            // console.log(error)
            dispatch( obtenerProductoEditarError() )
        })
    }
} 

export const obtenerProductoAction = () => ({
    type: OBTENER_PRODUCTO_EDITAR
})

export const obtenerProductoEditarExito = producto => ({
    type: PRODUCTO_EDITAR_EXITO,
    payload: producto
})

export const obtenerProductoEditarError = () => ({
    type: PRODUCTO_EDITAR_ERROR
})

export function editarProductoAction(producto){
    return(dispatch) => {
        dispatch( comenzarEdicionProducto() )

        // Consultar la API
        clienteAxios.put(`https://serene-scrubland-47940.herokuapp.com/productos/${producto.id}`, producto)
        .then(respuesta => {
            console.log(respuesta)
            dispatch(editarProductoExito(respuesta.data))
        })
        .catch(error => {
            console.log(error)
            dispatch(editarProductoError())
        })
    }
}

export const comenzarEdicionProducto = () => ({
    type: COMENZAR_EDICION_PRODUCTOS
})

export const editarProductoExito = producto => ({
    type: PRODUCTO_EDITADO_EXITO,
    payload: producto
})

export const editarProductoError = () => ({
    type: PRODUCTO_EDITADO_ERROR
})