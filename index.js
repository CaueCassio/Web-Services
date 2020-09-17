'use strict';
//const Hapi = require('hapi')
const Joi = require('@hapi/joi');
const Hapi = require('@hapi/hapi');

const init = async () => {
    const server = Hapi.Server({
        port: 3000,
        host: 'localhost'
    });
    server.route({
        method: 'GET',
        path: '/',
        handler: (request, h) => {
            return 'retorno test :D';
        }
    })
    server.route({
        method: 'POST',
        path: '/account',
        config: {
            validate: {
                payload: Joi.object({
                    name: Joi.string().max(20),
                    lastname: Joi.string().required(),
                    timestamp: Joi.any().forbidden().default((new Date).getTime())
                    // password: Joi.string().min(7),
            })
        }
    },
        handler: (request, h) => {
            return ( request.payload)
        }
    });
    await server.start();
    console.log('Server ON', server.info.uri);
}

process.on('unhandledRejection', (err) => {
    console.log(err);
    process.exit(1);
})

init();