const koaCasClient = require('http-cas-client/wrap/koa2');
const Koa = require('koa');
const bodyparser = require('koa-bodyparser');

const casServerUrlPrefix = 'https://ecas.acceptance.ec.europa.eu/cas';

const app = new Koa();
//console.log(bodyparser().toString());

// NOTICE: If you put bodyparser after cas client, bodyparser will not receive req.socket data.
// A native body parser is used in handler.
// Sometimes you need to make some adjustments for your especial case.
app.use(bodyparser());


// NOTICE: Put the middleware include casClientHandler before your specific api code.
// For example, put it before routes.
console.log();
app.use(koaCasClient({
    casServerUrlPrefix: casServerUrlPrefix,
    serverName: 'http://localhost'
})).use(ctx => {
    const { principal, ticket } = ctx;

    // your statements...
    console.log(JSON.stringify(principal, null, 2));
    //ctx.body = `<a href="${casServerUrlPrefix}/logout">SLO</a><pre>`
    //ctx.body += JSON.stringify(principal, null, 2);
    //ctx.body += '</pre>'
}).listen(80);