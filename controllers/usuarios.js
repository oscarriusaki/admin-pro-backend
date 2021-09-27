const { response } = require("express");
const bcrypt = require("bcryptjs");
const { generarJWT } = require('../helpers/jwt');
const Usuario = require('../models/usuario');

const getUsuarios = async (req,res) => {
    const usuarios = await Usuario.find({}, 'nombre email password');
    res.json({
        ok:true,
        usuarios,
        uid: req.uid
    })
}
const crearUsuario = async (req,res=response) => {
    const {email,password,nombre} = req.body

    try{

        const existeEmail = await Usuario.findOne({email});
        if(existeEmail){
            return res.status(400).json({
                ok: false,
                msg: 'El correo ya esta registrado'
            })
        }

        const usuario = new Usuario(req.body);
        // Encriptar contraseña
        const salt= bcrypt.genSaltSync();
        usuario.password = bcrypt.hashSync(password, salt);
    
        // Guardar usuario
        await usuario.save();

        const token = await generarJWT(usuario.id);
    
        res.json({
            ok: true,
            usuario,
            token
        })
    }catch(error) {
        console.log(error);
        res.status(500).json({
            ok:false,
            msg: "Error Inesperado ...  revisar logs"
        });
    }
}
const actualizarUsuario = async (req, res=response) => {
    // TODO Validar token y comprobar si es el usaurio corecto


    const uid = req.params.id;
    

    try{
        const usuarioDB = await Usuario.findById(uid);
        if(!usuarioDB){
            return res.status(404).json({
                ok: false,
                msg: "No existe un usuario por ese id"
            });
        }
        // Actualizacion
        const { password, google, email,...campos } = req.body;
        if(usuarioDB.email !== email){
            
            const existeEmail = await Usuario.findOne({email});
            if(existeEmail){
                return res.status(400).json({
                    ok: false,
                    msg: "Ya existe un usaurio con ese email"
                })
            }
        }
        campos.email = email;

        const usuarioActualizado = await Usuario.findByIdAndUpdate(uid, campos, {new: true});

        res.json({
            ok: true,
            usuario:usuarioActualizado
        })
    }catch(error){
        console.log(error);
        res.status(500).json({
            ok: false,
            msg: "Error insesperado"
        })
    }
}
const borrarUsuario =async (req,res=response) => {
    const uid=req.params.id
    try{

        const usuarioDB = await Usuario.findById(uid);
        if(!usuarioDB) {
            return res.status(400).json({
                ok: false,
                msg: "No existe un usuario por ese ID"
            })
        }
        await Usuario.findByIdAndDelete(uid);

        res.json({
            ok: true,
            msg: 'Usuario Eliminado'
        })
    }catch(error){
        console.log(error);
        res.status(500).json({
            ok: false,
            msg: "Error inesperado"
        })
    }

}
module.exports = {
    getUsuarios,
    crearUsuario,
    actualizarUsuario,
    borrarUsuario
}