// setup for express
const express = require('express');
const app = express();

const port = 3000;

// require some data form your data.js file
let {
  students,
  instructors: teachers,
  getStudents,
  getTeachers,
} = require('./data');

// just a simple middleware to show you how it works
// you will always see that console.log when you visit any page
app.use((req, res, next) => {
  console.log('Hello im the middleware');
  next();
});

// letting your middleware know where to find all static files
app.use(express.static(__dirname + '/public'));

// ROUTES DEFINED BELOW

// app.get('/', (req, res) => {
//   res.sendFile(__dirname + '/views/landing.html');
// });

// app.get('/home/:country', (req, res) => {
//   console.log(req.params);
//   res.send('My dynamic route');
// });

// app.get('/user/:name', (req, res) => {
//   let { name } = req.params;
//   res.send(`My dynamic user route ${name}`);
// });

// app.get('/', (req, res) => {
//   res.send('Hi there, welcome to my assignment!');
// });

// app.get('/speak/:animal', (req, res) => {
//   let { animal } = req.params;
//   let sound = '';

//   if (animal == 'pig') {
//     sound = 'Oink!';
//   } else if (animal == 'cow') {
//     sound = 'Moo';
//   } else if (animal == 'dog') {
//     sound = 'Woof Woof!';
//   }

//   res.send(`The ${animal} says ${sound}`);
// });

// app.get('/greet/:first/:number', (req, res) => {
//   let { first, number } = req.params;
//   let output = '';

//   if (first == 'hello') {
//     if (number == '3') {
//       output = 'hello hello hello';
//     } else if (number == '5') {
//       output = 'hello hello hello hello hello';
//     }
//   } else if (first == 'blah') {
//     if (number == '2') {
//       output = 'blah blah';
//     } else if (number == '3') {
//       output = 'blah blah blah';
//     }
//   }
//   res.send(output);
// });

// app.get('*', (req, res) => {
//   res.send('Sorry, page not found...Blame our developer');
// });

app.set('view engine', 'hbs');

const hbs = require('hbs');
hbs.registerPartials(__dirname + '/views/partials');

app.get('/', (req, res) => {
  let name = 'Manish';
  res.render(__dirname + '/views/landing.hbs', { text: name, age: 21 });
});

app.get('/students', (req, res) => {
  getStudents()
    .then((data) => {
      //the promise returns us some informations which we store in 'data' parameter

      //we use that data to send it our hbs file
      res.render(__dirname + '/views/students.hbs', {
        students: data,
        layout: false,
      });
    })
    .catch(() => {
      console.log('Error while fetching students');
    });
});

app.get('/teachers', (req, res) => {
  let upperCaseTeachers = teachers.map((teacher) => {
    teacher.name = teacher.name.toUpperCase();
    return teacher;
  });

  res.render(__dirname + '/views/teachers.hbs', {
    teachers: upperCaseTeachers,
  });
});

app.get('*', (req, res) => {
  res.render('Page not found.');
});

// Express setup to listen for all client requests on a certain port
app.listen(port, () =>
  console.log(`Example app listening at http://localhost:${port}`)
);
