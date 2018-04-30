const app = require('./server').app

app.listen(9898, () => {
    console.log("The port is listening on http://localhost:9898");
});