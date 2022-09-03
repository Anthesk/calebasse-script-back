import express from 'express';
import bp from 'body-parser';
import { default as addScript } from './post/create_script.js';
import { default as listScripts } from './get/get_script.js';

var app = express();

app.use(bp.json());
app.use(bp.urlencoded({ extended: true }));

app.get('/listScripts', listScripts);
app.post('/addScript', addScript);

var server = app.listen(3000, function () {
   var host = server.address().address;
   var port = server.address().port;
   console.log("Example app listening at http://%s:%s", host, port);
});