const app     = require('../../../../index')
const request = require('supertest')

describe('test API endpoints', () => { 

	test('GET /todos should return 200 HTTP code', (done) => {
        request(app).get('/api/v1/todos')
            .then(response => {
                expect(response.statusCode).toBe(200)
                done()
            })
            .catch(error => {
                done(error)
            })
    })

    test('GET /todos should return JSON object with todos collection in response',(done)=>{
    	request(app).get('/api/v1/todos')
    	.then(response => {
                expect(typeof response.body).toBe("object")
                expect(response.body).toHaveProperty("todos")
                done()
        })
        .catch(error => {
                done(error)
        })
    })

    test('POST api/v1/todos should return a JSON object with created task', (done)=>{
    	request(app)
    	.post('/api/v1/todos')
    	.send({
    		"text": "This is a task",
    		"priority": 3
    	})
    	.then(response => {
    		expect(response.statusCode).toBe(200)
    		expect(response.body).toHaveProperty("id")
    		expect(response.body).toHaveProperty("text")
    		expect(response.body).toHaveProperty("prorioty")
    		expect(response.body).toHaveProperty("done")
    	})
    	.catch(error => {
            done(error)
        })
    })

    test('GET /todos/:id should response with 200 HTTP code and JSON object with valid fields', (done)=>{
    	request(app).get('/api/v1/todos/1')
    	.then(response => {
    		expect(response.statusCode).toBe(200)
    		expect(typeof response.body).toBe("object")
    		expect(response.body).toHaveProperty("id")
    		expect(response.body.id).toBe(1)
    		expect(response.body).toHaveProperty("text")
    		expect(response.body).toHaveProperty("priority")
    		expect(response.body).toHaveProperty("done")
    	})
    	.catch(error => {
            done(error)
        })
    })

    test('GET /todos/:id should return 404 response and error message when id does not match', (done)=>{
    	request(app).get('/api/v1/todos/99999')
    	.then((response) => {
    		expect(response.statusCode).toBe(404)
    		expect(response.body.errors[0]).toBe("task not found")
    	})
    	.catch(error => {
    		done(error)
    	})
    })

    test('PUT /todos/:id should return changed task', (done)=>{
    	request(app).put('/api/v1/todos/1')
    	.send({
    		"text": "edited",
    		"done": "true"
    	})
    	.then(response => {
    		expect(response.statusCode).toBe(200)
    		expect(response.body.id).toBe(1)
    		expect(response.body.text).toBe('edited')
    		expect(response.body.done).toBe(true)
    	})
    	.catch(error => {
    		done(error)
    	})
    })

    test('DELETE /todos/:id should response with a message and record should no longer be in json file', (done)=>{
    	request(app).delete('/api/v1/todos/1')
    	.then(response => {
    		expect(response.statusCode).toBe(200)
    		expect(response.body.deleted).toBe(true)
    		request(app).get('/api/v1/todos/1')
    		.then(res => {
    			expect(res.statusCode).toBe(404)
    			expect(res.body.errors[0]).toBe("task not found")
    		})
    		.catch(err =>{
    			done(err)
    		})
    	})
    	.catch(error =>{
    		done(error)
    	})
    })

})