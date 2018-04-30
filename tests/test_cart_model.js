require('mocha')
const request = require('request')
const chai = require('chai')
const cart = require('../routes/cart')

const expect = chai.expect
const assert = chai.assert

const app = require('../server')

describe("Server start", () => {
    let server
    before(() => {
        server = app.listen(9898)
    })

    describe("Carts Model", () => {
        describe("#GET carts", () => {
            it("Should return all the carts", (done) => {
                request.get('http://localhost:9898/cart', (err, res, body) => {
                    expect(res.statusCode).to.be.equal(200)
                    expect(body).to.be.not.empty
                    done()
                })
            })
        })
    })

    after(() => {
        server.close()
    })
})
