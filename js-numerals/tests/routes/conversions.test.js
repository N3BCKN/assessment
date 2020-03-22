const app = require('../../index')
const request = require('supertest')

describe('test app endpoints', () => {

    test('index page should return 200 code', (done) => {
        request(app).get('/')
            .then((response) => {
                expect(response.statusCode).toBe(200)
                done()
            })
            .catch((error) => {
                done(error)
            })
    })

    test('should receive generated words from numbers', (done) => {
        request(app)
            .post('/convert')
            .send({
                "number": 1234
            })
            .then((response) => {
                const {
                    body,
                    statusCode
                } = response
                expect(statusCode).toEqual(200)
                expect(body.response).toEqual("one thousand, two hundred and thirty-four")
                done()
            })
            .catch((error) => {
                done(error)
            })
    })

    test('should receive error status and message with wrong input from client', (done) => {
        request(app)
            .post('/convert')
            .send({
                "number": "qwerty"
            })
            .then((response) => {
                const {
                    body,
                    statusCode
                } = response
                expect(statusCode).toEqual(400)
                expect(body.response).toEqual("Please provide a valid number.")
                done()
            })
            .catch((error) => {
                done(error)
            })
    })
})