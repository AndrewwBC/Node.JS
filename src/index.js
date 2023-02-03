const http = require('http');
const route = require('../routes/routes');
const {URL} = require('url');

const server = http.createServer((request, response) => {
  const parsedUrl = new URL(`http://localhost:3000${request.url}`)
  console.log({request, response})
  console.log(`Request method: ${request.method} | Endpoint: ${parsedUrl.pathname}`);

  let { pathname } = parsedUrl;
  // Variável pathname adquirida do objeto parsedUrl. Este valor é o que está no URL do Browser.
  console.log(parsedUrl);
  let id = null

  // Split para separar as infos entre as barras
  const splitEndPoint = pathname.split('/').filter(Boolean)

  if(splitEndPoint.length > 1){
    // Pathname com novo valor: agora ele será apenas o users/:id, pois o vazio foi filtrado anteriormente.
    pathname = `/${splitEndPoint[0]}/:id`
    console.log(pathname)
    // Id da url no browser é armazenado nesta variável.
    id = splitEndPoint[1]
  }

  const routes = route.find((routeObj) => (
    routeObj.endpoint === pathname && routeObj.method === request.method
  ));

  if(routes){
    request.query = Object.fromEntries(parsedUrl.searchParams)
    // Dentro de request, cria um objeto chamado params e insere o ID ali.
    request.params = {id}

    response.send = (statusCode, body) => {
      response.writeHead(statusCode, { 'Content-type': 'text/html' });
      response.end(JSON.stringify(body));
    }

    routes.handler(request, response);
  }
  else {
    response.writeHead(404, { 'Content-type': 'text/html' });
    response.end(`Cannot ${request.method} ${parsedUrl.pathname}`);
  }
});

server.listen(3000, () =>
  console.log('Server started at http://localhost:3000'),
);
