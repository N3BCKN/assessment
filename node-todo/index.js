const express    = require('express')
const bodyParser = require('body-parser')
const app        = express()

const port       = 3000


app.use(bodyParser.json());
app.use(bodyParser.urlencoded({
    extended: true
}));

app.get('/', (req,res)=>{
	res.json({"working": true})
})


if(!module.parent){
	app.listen(port, (err) => {
	    if (err) throw err
	    console.log(`Server is running on port ${port}`)
	})
}

module.exports = app