require('mocha')
const chai = require('chai')
const product = require('../src/routes/product')
const request = require('request')

let expect = chai.expect
let assert = chai.assert

const app = require('../src/server')

describe('Server', () => {
    let server 
    before(() => {
        server = app.listen(9898)
    })

    describe('Products', () => {
        it('should return all the products', (done) => {
            request.get('http://localhost:9898/products', (err, response, body) => {
                expect(body).to.be.not.empty
                expect(response.statusCode).to.be.equal(200)
                done()
            })
        })
    })

    after(() => {
        server.close()
    })
})