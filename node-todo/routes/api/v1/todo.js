const express = require('express')
const router  = express.Router()
const fs      = require('fs')

//@route api/v1/todos
//@param GET
//@access public
router.get('/todos', (req,res) =>{
    fs.readFile('todos.json', 'utf8',(err, data) =>{
        if (err) throw err
        const JSONdata = JSON.parse(data)
        console.log(JSONdata.todos)
        res.send(JSON.parse(data)) 
    })
})

//@route api/v1/todos
//@param POST
//@access public
router.post('/todos', (req,res)=>{
	const {text, priority} = req.body
	//validation here
	fs.readFile('todos.json', 'utf8', (err,data) =>{
		if (err) throw err
		const JSONdata = JSON.parse(data)
		const lastID   = JSONdata.todos[JSONdata.todos.length -1].id
		const task     = 
		{
			"id"       : lastID +1,
			"text"     : text,
			"prorioty" : 3,
			"done"     : false
		}

		JSONdata.todos.push(task)

		fs.writeFile('todos.json',JSONdata, 'utf8', (err) =>{
			if (err) throw err
			res.json(task)
		})
	})
})

//@route api/v1/todos/:id
//@param GET
//@access public
router.get('/todos/:id', (req,res)=>{
	const id = req.params.id
	//validation here
	fs.readFile('todos.json', 'utf8', (err,data) =>{
		if (err) throw err
		const JSONdata = JSON.parse(data)
		JSONdata.todos.forEach((todo, index) =>{
			if(todo.id === id){
				return res.json(todo[index])
			}
		})
		res.status(404).json({errors: ['task not found']})
	})
})

//@route api/v1/todos/:id
//@param PUT
//@access public
router.put('/todos/:id', (req,res)=>{
	const {text, priority, done} = req.body
	const id = req.params.id
	//validation here
	fs.readFile('todos.json', 'utf8', (err,data)=>{
		if (err) throw err
		const JSONdata = JSON.parse(data)
		JSONdata.todos.forEach((todo, index) => {
			if(todo.id === id){
				JSONdata.todos[index].text     = text
				JSONdata.todos[index].priority = priority
				JSONdata.todos[index].done     = done
				fs.writeFile('todos.json', 'utf8', (err,data)=>{
					if (err) throw err
					return res.json(JSONdata.todo[index])
				})
			}
		})

		res.status(404).json({errors: ['task not found']})
	});
})

//@route api/v1/todos/:id
//@param DELETE
//@access public
router.delete('/todos/:id', (req,res)=>{
	const id = req.params.id
	fs.readFile('todos.json', 'utf8', (err,data) =>{
		if (err) throw err
		const JSONdata = JSON.parse(data)
		JSONdata.todos.forEach((todo, index)=>{
			if(todo.id === id){
				JSONdata.todos.splice(index,1)
				fs.writeFile('todos.json',JSONdata, 'utf8', (err) =>{
					if (err) throw err
					return res.json({"deleted" : true})
				})
			}
		})
	});
})

module.exports = router