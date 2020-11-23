export default function validarCrearProducto (valores){
    let errores = {};

    if(!valores.nombre){
        errores.nombre = "El nombre es obligatorio";
    }

    if(!valores.empresa){
        errores.empresa = "Nombre de Empresa es Obligatorio"
    }

    if(!valores.url){
        errores.url = "La URL del producto es Obligatoria";
    }else if(!/^(ftp|http|https):\/\/[^ "]+$/.test(valores.url)){
        errores.url = "URL no valida";
    }

    if(!valores.descripcion){
        errores.descripcion="Agrega una Descripcion de tu Producto";
    }


    return errores;
}