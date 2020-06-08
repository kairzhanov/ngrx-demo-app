var express = require('express');
var app = express();
app.use(express.static('./dist/ngrx-demo-app'));

app.get('/*', function(req, res) {
    res.sendFile('index.html', {root: 'dist/ngrx-demo-app/'}
    );
  });

app.listen(process.env.PORT || 8080);