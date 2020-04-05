const express = require('express')
const router = express.Router()

//@route api/v1/todos
//@param GET
//@access public
router.get('/todos', (req,res) =>{

})

//@route api/v1/todos
//@param POST
//@access public
router.post('/todos', (req,res)=>{

})

//@route api/v1/todos/:id
//@param GET
//@access public
router.get('/todos/:id', (req,res)=>{

})

//@route api/v1/todos/:id
//@param PUT
//@access public
router.put('/todos/:id', (req,res)=>{

})

//@route api/v1/todos/:id
//@param DELETE
//@access public
router.delete('/todos/:id', (req,res)=>{

})

module.exports = router