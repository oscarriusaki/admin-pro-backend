const { response } = require("express");
const { v4: uuidv4 } = require('uuid');

const fileUpload = (req,res = response) =>  {

    const tipo = req.params.tipo;
    const id = req.params.id;

    const tiposValidos = ['hopitales','medicos','usuarios']

    if(!tiposValidos.includes(tipo)) {
        return res.status(400).json({
            ok: false,
            msg: 'No es medico usuario u hospital'
        })
    }
    // validar que exista in archivo
    if(!req.files || Object.keys(req.files).length === 0){
        return res.status(400).json({
            ok:false,
            msg:'No files were upload.'   
        })
    }
    // procesar la imagen
    const file = req.files.imagen;
    const nombreCortado = file.name.split('.'); /// wolverine 
    const extensionArchivo = nombreCortado [nombreCortado.length-1];


    const extencionesValida = ['png','pge','jpeg','gif'];
    if(!extencionesValida.includes(extensionArchivo)) {
        return res.status(404).json({
            ok: false,
            msg: 'No es una extencion valida'
        })
    }
    const nombreArchivo = `${uuidv4()}.${extensionArchivo}`

    // 
    const path = `./upload/${tipo}/${nombreArchivo}`

    file.mv(path, (err)=>{
        if(err)
        {
            console.log(err);
            return res.status(500).json({
                ok: false,
                msg: 'Error al mover la imagen'
            });
        }
        res.json({
            ok: true,
            msg: 'Archivo subido',
            nombreArchivo
        })
    })
    
    res.json({
        ok: true,
        nombreArchivo
        
    })

}

module.exports = {
    fileUpload
}
