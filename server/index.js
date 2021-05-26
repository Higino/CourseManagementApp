
const Promise = require('bluebird')
const AppDAO = require('./model/AppDao')
const EnrolmentRepository = require('./model/EnrollmentRepository')
const PrereqsRepository = require('./model/PrereqsRepository')
const CourseRepository = require('./model/CourseRepository')

const express = require("express");
const app = express();


app.use(express.json({limit: '50mb'}));
app.use(express.urlencoded({limit: '50mb'}));


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
  await coursesRepo.createDefaultCourses()
}

init()


// =================
// === API/COURSES
// =================
app.get('/api/courses', async function (req, res) {
  let courses = await coursesRepo.getAllOpened() 
  console.log(courses)
  res.send(courses)
})

app.get('/api/courses/:id', async function (req, res) {
  console.log('Getting course ' + req.params.id)
  let course = await coursesRepo.findById(req.params.id)
  res.send(course)
})

app.delete('/api/courses', async function (req, res) {
  const courseName = req.body
  if( !req.body || !courseName.id ) {
    console.log('No course id found in body')
    console.log(req.body)
    res.status(400).send('An id must be given to close a course');
  } else {
    console.log('Closing course ' + courseName.id)
    await coursesRepo.closeCourse(courseName.id)
    res.send({})
  }
})

app.post('/api/courses', async function (req, res) {
  const courseName = req.body
  if( !req.body || !courseName.name ) {
    console.log('No name found in body')
    console.log(req.body)
    res.status(400).send('A name must be given to a course');
  } else {
    console.log('Creating course ' + courseName.name)
    await coursesRepo.create(courseName.name)
    res.send({})
  }
})

app.post('/api/courses/enrollment/:courseid', function(req, res) {
  console.log(req.body)
  enrollRepo.deleteAll(req.params.courseid);
  req.body.map( e=> {
    enrollRepo.create(req.params.courseid, e.name, e.email, e.title)
  })
  res.send({status: 'success'})
})

// =================
// === API/PREREQS
// =================
app.post('/api/prereqs', function(req, res) {
  console.log(req.body)
  prereqRepo.deleteAll();
  req.body.map( e=> {
    prereqRepo.create(e.email, e.course, e.courseCompleteDate)
  })
  res.send({status: 'success'})
})

// =================
// === API/LISTINGS
// =================
app.get("/api/listings/complete/:courseid", async (req, res) => {
  let pr = await prereqRepo.getAll() 
  console.log(pr)
  let e = await enrollRepo.getAll(req.params.courseid) 
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


app.get("/api/listings/incomplete/:courseid", async (req, res) => {
  let pr = await prereqRepo.getAll() 
  let e = await enrollRepo.getAll(req.params.courseid) 

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
