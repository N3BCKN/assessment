module.exports.validateTodos = function(text, priority, done, callback){
	let errors = []
	if(text == ""){
		errors.push("text cannot be empty")
	}
	if(text.length < 4 || text.length > 256){
		errors.push("text range from 4 to 256 characters")
	}
	if(priority == null || priority < 1 || priority > 5){
		errors.push("priority range from 1 to 5")
	}
	if(typeof done !== 'boolean'){
		errors.push('done value must be only true or false')
	}

	return callback(errors)
}