const { comprobarJWT } = require('../helpers/jwt');
const { io } = require('../index');
const {usuarioConectado, usuarioDesconectado, grabarMensaje} = require('../controllers/socket')

// Mensajes de Sockets
io.on('connection', client => {
    console.log('Cliente conectado');
    const [valido, uid] = comprobarJWT(client.handshake.headers['x-token']);
    //Verificar autentificación
    if(!valido){return client.disconnect();}
    //Cliente  autenticado
    usuarioConectado(uid);

    //Ingresar al usuario a una sala en particular
    //sala global, client.id, 603464a858661f05428d8f98
    client.join(uid);
    //escuchar del cliente el mensaje personal
    client.on('mensaje-personal', async(payload)=>{
        //TODO:Guardar Mensaje
        await grabarMensaje(payload);
        //console.log(payload);
        //enviar
        io.to(payload.para).emit('mensaje-personal',payload);
    })




    client.on('disconnect', () => {
        usuarioDesconectado(uid);
    });

    /* client.on('mensaje', ( payload ) => {
        console.log('Mensaje', payload);

        io.emit( 'mensaje', { admin: 'Nuevo mensaje' } );

    }); */


});
