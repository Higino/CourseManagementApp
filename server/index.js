// server/index.js

//const Prereqs = require('./model/prereq');
//const Enrollments = require('./model/enrollment')

const Promise = require('bluebird')
const AppDAO = require('./model/AppDao')
const EnrolmentRepository = require('./model/EnrollmentRepository')
const PrereqsRepository = require('./model/PrereqsRepository')
const CourseRepository = require('./model/CourseRepository')

const express = require("express");
const app = express();
const bodyParser = require('body-parser');
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: true}));

const PORT = process.env.PORT || 3001;



const dao = new AppDAO('./database.sqlite3')
const enrollRepo = new EnrolmentRepository(dao)
const prereqRepo = new PrereqsRepository(dao)
const coursesRepo = new CourseRepository(dao)

async function init () {
  await enrollRepo.createTable()
  await prereqRepo.createTable()
  await coursesRepo.createTable()
  //await coursesRepo.createSampleCourses()
}

init()

app.get('/api/courses', async function (req, res) {
  let courses = await coursesRepo.getAll() 
  console.log(courses)
  res.send(courses)
})

app.get('/api/courses/:id', async function (req, res) {
  console.log('Getting course ' + req.params.id)
  let course = await coursesRepo.findById(req.params.id)
  res.send(course)
})

app.post('/api/prereqs', function(req, res) {
  console.log(req.body)
  prereqRepo.deleteAll();
  req.body.map( e=> {
    prereqRepo.create(e.email, e.course, e.courseCompleteDate)
  })
  res.send({status: 'success'})
})



app.post('/api/enrollments', function(req, res) {
  console.log(req.body)
  enrollRepo.deleteAll();
  req.body.map( e=> {
    enrollRepo.create(e.name, e.email, e.title)
  })
  res.send({status: 'success'})
})


app.get("/api/listings/complete", async (req, res) => {
  let pr = await prereqRepo.getAll() 
  console.log(pr)
  let e = await enrollRepo.getAll() 
  console.log(e)

  let temp = e.map( ee => { 
    return {
      email: ee.email, 
      count: pr.filter( pre => { return ee.email === pre.email }).length 
    }
  })
  console.log(temp)

  res.send( temp.filter( e => { return e.count >= 3 }) )
});

app.get("/api/listings/incomplete", async (req, res) => {
  let pr = await prereqRepo.getAll() 
  let e = await enrollRepo.getAll() 

  let temp = e.map( ee => { return {
    email: ee.email, 
    count: pr.filter( pre => { return ee.email === pre.email }).length }})
  console.log(temp)

  //temp.filter( e => { return e.count >= 3 })
  res.send( temp.filter( e => { return e.count < 3 }) )
});

app.listen(PORT, () => {
  console.log(`Server listening on ${PORT}`);
});
