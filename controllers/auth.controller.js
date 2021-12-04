const User = require('../models/user.model');
const bcrypt = require('bcryptjs');
const {generarJWT} = require('../helpers/jwt');
const {TEXT} = require('../helpers/text');

const crearUsuario = async (req,res)=>{
    const {email,password} = req?.body;
    try{
        let usuario = await User.findOne({email});

        if(usuario){
            return res.status(400).json({
                ok: false,
                msg: TEXT.USER_ALREADY_EXIST
            });
        }

        usuario = new User(req?.body);

        //encriptar password
        const salt = bcrypt.genSaltSync();
        usuario.password = bcrypt.hashSync(password,salt);

        await usuario.save();

        //generar JWT
        const token = await generarJWT(usuario.id,usuario.name);


        res.status(201).json({
            ok : true,
            uid: usuario.id,
            name: usuario.name,
            token
        });
    }catch (err) {
        res.status(500).json({
            ok: false,
            msg: err
        });
    }
};

const loginUsuario = async (req,res)=>{
    const {email,password}  = req?.body;
    try {
        const usuario = await User.findOne({email});
        const {id,name} = usuario;
        if(!usuario){
            return res.status(400).json({
                ok: false,
                msg: TEXT.USER_NOT_EXIST
            });
        }
        //confirmar
        const validarPassword = bcrypt.compareSync(password,usuario.password);
        if(!validarPassword){
            return res.status(400).json({
                ok:false,
                msg: TEXT.PASSWORD_NOT_MATCH
            });
        }

        //generar JWT
        const token = await generarJWT(id,name);

        res.json({
            ok : true,
            uid: usuario.id,
            name: usuario.name,
            token
        });

    }catch (err) {
        res.status(500).json({
            ok: false,
            msg: err
        });
    }
};

const revalidarToken = async(req,res)=>{
    const {uid,name} = req;
    const token = await generarJWT(uid,name);
    res.json({
        name,
        ok : true,
        token,
        uid
    });
};

module.exports = {
    crearUsuario,
    loginUsuario,
    revalidarToken
};