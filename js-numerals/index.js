const express = require('express')
const bodyParser = require('body-parser')
const app = express()

const port = 3000


app.set('view engine', 'ejs')
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({
    extended: true
}));

app.use('/', require('./routes/conversions'))

if(!module.parent){
	app.listen(port, (err) => {
	    if (err) throw err
	    console.log(`Server is running on port ${port}`)
	})
}

module.exports = app