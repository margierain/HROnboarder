process.env.NODE_ENV = 'test';

let chai = require('chai');
let chatHttp = require('chai-http');
let should = chai.should();

let server = require('../../index');
let task = require('../routes/task');
let onboarderSchema = require('../model/task');

chai.use(chatHttp);


describe('HR onboarder', () => {
  beforeEach((done) => {
    onboarderSchema.remove({}, err => {
      done(0);
    })
  })

  describe('/GET HR task', () => {
    it('should retrieve all HR tasks from the db ', (done) => {
      chai.request(server)
        .get('/task')
        .end((err, res) => {
          res.should.have.status(200);
          res.body.should.be.a('array')
          res.body.length.should.be.eql(0);
          done();
        })
    })
  })
})