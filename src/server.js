import { telefunc } from 'telefunc'
// import '../dist/server/entry.js'

// Telefunc middleware
app.all('/_telefunc', async (req, res) => {
  const httpResponse = await telefunc({
    // HTTP Request URL, which is '/_telefunc' if we didn't modify config.telefuncUrl
    url: req.url,
    // HTTP Request Method (GET, POST, ...)
    method: req.method,
    // HTTP Request Body, which can be a string, buffer, or stream
    body: req.body,
  })
  console.log('httpResponse', httpResponse);
  const { body, statusCode, contentType } = httpResponse
  res.status(statusCode).type(contentType).send(body)
})
