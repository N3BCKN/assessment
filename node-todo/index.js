const express    = require('express')
const bodyParser = require('body-parser')
const app        = express()
const todo       = require('./routes/api/v1/todo')

const port       = 3000


app.use(bodyParser.json());
app.use(bodyParser.urlencoded({
    extended: true
}));

app.use('/api/v1', todo)

if(!module.parent){
	app.listen(port, (err) => {
	    if (err) throw err
	    console.log(`Server is running on port ${port}`)
	})
}

module.exports = app