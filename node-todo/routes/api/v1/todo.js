const express 		  = require('express')
const router  		  = express.Router()
const fs      		  = require('fs')
const {validateTodos} = require('../../../services/validations')

//@route api/v1/todos
//@param GET
//@desc fetch collection of todo tasks
//@access public
router.get('/todos', (req,res) =>{
	const JSONdata = JSON.parse(fs.readFileSync('todos.json', 'utf8'))
	res.json(JSONdata)
})

//@route api/v1/todos
//@param POST
//@desc create new todo task
//@access public
router.post('/todos', (req,res)=>{
	const {text, priority} = req.body

	//validation here
	validateTodos(text, priority, false, (err) => {

	if(err.length > 0){
		return res.status(400).json({"errors": err})
	}

	const JSONdata = JSON.parse(fs.readFileSync('todos.json', 'utf8'))

	const lastID   = JSONdata.todos[JSONdata.todos.length -1].id
	const taskPriority = (priority ? priority : 3)
	const task     = 
	{
		"id"       : lastID +1,
		"text"     : text,
		"prorioty" : taskPriority,
		"done"     : false
	}

	JSONdata.todos.push(task)

	fs.writeFileSync('todos.json', JSON.stringify(JSONdata), 'utf8')
	res.json(task)

	})
})

//@route api/v1/todos/:id
//@param GET
//@desc fetch single todo task by id
//@access public
router.get('/todos/:id', (req,res)=>{
	const id = req.params.id

	const JSONdata = JSON.parse(fs.readFileSync('todos.json', 'utf8'))

	JSONdata.todos.forEach((todo, index) =>{
		if(todo.id == id){
			return res.status(200).json(todo)
		}
	})

	res.status(404).json({errors: ['task not found']})
})

//@route api/v1/todos/:id
//@param PUT
//@desc update todo task
//@access public
router.put('/todos/:id', (req,res)=>{
	const {text, priority, done} = req.body
	const id = req.params.id

	validateTodos(text, priority, done, (err) =>{
		if(err.length > 0){
			return res.status(400).json({"errors": err})
		}

		const JSONdata = JSON.parse(fs.readFileSync('todos.json', 'utf8'))
		JSONdata.todos.forEach((todo, index) => {
		if(todo.id == id){

			JSONdata.todos[index].text     = text
			JSONdata.todos[index].priority = priority
			JSONdata.todos[index].done     = done

			fs.writeFileSync('todos.json', JSON.stringify(JSONdata), 'utf8')

			return res.json(JSONdata.todos[index])
			}
		})

		res.status(404).json({errors: ['task not found']})
	})
});


//@route api/v1/todos/:id
//@param DELETE
//@desc delete todo task
//@access public
router.delete('/todos/:id', (req,res)=>{
	const id = req.params.id

	const JSONdata = JSON.parse(fs.readFileSync('todos.json', 'utf8'))

	JSONdata.todos.forEach((todo, index)=>{
		if(todo.id == id){
			JSONdata.todos.splice(index,1)
			fs.writeFileSync('todos.json',JSON.stringify(JSONdata), 'utf8')
			return res.json({"deleted": true})
		}
	})	

	res.status(404).json({errors: ['task not found']})
})

module.exports = router