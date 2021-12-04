const {TEXT} = require('../helpers/text');
const Evento = require('../models/events.model');
/**
 *
 * @param {Request} request
 * @param {Response} response
 */
const getEventos =async (request,response)=>{
    try{
        const eventsBD = await Evento.find().populate('user','name');
        response.status(200).json({
            ok : true,
            eventsBD
        });
    }catch (e) {
        return response.status(500).json({
            ok : false,
            msg: e
        });
    }
};

/**
 *
 * @param {Request} request
 * @param {Response} response
 */
const crearEvento =async (request,response)=>{
    const evento = new Evento(request?.body);
    const {uid} = request;
    try{
        evento.user = uid;
        const eventoGuardado = await evento.save();
        response.status(201).json({
            ok : true,
            eventoGuardado
        });

    }catch (e) {
        return response.status(500).json({
            ok : false,
            msg: e
        })
    }
};

/**
 *
 * @param {Request} request
 * @param {Response} response
 */
const actualizarEvento = async (request,response)=>{
    const {id} = request?.params;
    const {uid} = request;

    try{
        const evento = await Evento.findById(id);

        if(!evento){
            return response.status(404).json({
                ok : false,
                msg: TEXT.EVENT_NOT_EXIST
            });
        }

        if(evento.user.toString() !== uid ){
            return response.status(401).json({
                ok : false,
                msg :  TEXT.NOT_ALLOWED
            });
        }

        const newEvento = {
            ...request.body,
            user: uid
        };
        const eventoActualizado = await Evento.findOneAndUpdate(id,newEvento,{new: true});

        response.status(200).json({
            ok : true,
            eventoActualizado
        });
    }catch (e) {
        response.status(500).json({
            ok : false,
            msg: e
        });
    }
};

/**
 *
 * @param {Request} request
 * @param {Response} response
 */
const eliminarEvento =async (request,response)=>{
    const {id} = request?.params;
    const {uid} = request;

    try {
        const evento = await Evento.findById(id);

        if(!evento){
            return response.status(404).json({
                ok : false,
                msg: TEXT.EVENT_NOT_EXIST
            });
        }

        if(evento.user.toString() !== uid){
           return response.status(401).json({
               ok : false,
               msg: TEXT.NOT_ALLOWED
           });
        }

        await Evento.findByIdAndDelete(id);

        response.status(200).json({
            ok : true,
            evento
        });
    }catch (e) {
        response.status(500).json({
            ok : false,
            msg : e
        })
    }
};

module.exports = {
    getEventos,
    crearEvento,
    actualizarEvento,
    eliminarEvento
};