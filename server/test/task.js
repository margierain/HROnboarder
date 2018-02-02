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
      done();
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

  describe('/POST task', () => {
    it('should create an onboarding task', (done) => {
      let onboard = {
        "employeeName": "Godwin",
        "beforeHireTask":
          [
            {
              "task": "buy mac", "completed": false, "dueDate": "1-2-2018"
            },
            {
              "task": "buy mac cover", "completed": true, "dueDate": "1-2-2018"
            }
          ],
        "afterHireTask":
          [
            {
              "task": "isssue mac", "completed": false, "dueDate": "1-2-2018"
            },
            {
              "task": "issue mac cover", "completed": false, "dueDate": "1-2-2018"
            }
          ],
        "adminEmail": "margaret.ochieng@andela.com"
      }

      chai.request(server)
        .post('/task')
        .send(onboard)
        .end((err, res) => {
          res.should.have.status(201);
          res.body.should.have.a('object');
          res.body.onboard.should.have.property("adminEmail");
          res.body.onboard.should.have.property("employeeName");
        done();
        })
    })

    it('should not create an onboarding task if missing a required field ', (done) => {
      let newTask = {
        "beforeHireTask":
          [
            {
              "task": "buy mac", "completed": false, "dueDate": "1-2-2018"
            },
            {
              "task": "buy mac cover", "completed": true, "dueDate": "1-2-2018"
            }
          ],
        "afterHireTask":
          [
            {
              "task": "isssue mac", "completed": false, "dueDate": "1-2-2018"
            },
            {
              "task": "issue mac cover", "completed": false, "dueDate": "1-2-2018"
            }
          ],
        "adminEmail": "margaret.ochieng@andela.com"
      }

      chai.request(server)
        .post('/task')
        .send(newTask)
        .end((err, res) => {
          res.should.have.status(400);
          res.body.should.have.a('object');
          res.body.should.have.property('errors');
          res.body.errors.should.have.property('employeeName');
          res.body.errors.employeeName.should.have.property('kind').eql('required')
        done();
        })
    })
  })
})