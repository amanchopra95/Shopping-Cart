const app = require('./src/server')

app.listen(process.env.PORT || 9898, () => {
    let port = process.env.PORT || 9898
    console.log("The port is listening on http://localhost:" + port);
});