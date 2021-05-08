const e = require('express');
const sqlite3 = require('sqlite3');
const db = new sqlite3.Database(':memory:');

db.serialize(() => {
    const sql = 'CREATE TABLE IF NOT EXISTS prereqs (email, course, coursedate)';
    db.run(sql);
    //db.run('INSERT INTO prereqs(email, course, coursedate) VALUES(?, ?, ?)', 'test@test.com', 'a course', '01-01-2021');
});

class Prereqs {
    constructor(email, course, coursedate){
        this.email = email;
        this.course = course;
        this.coursedate = coursedate;
    }

    static all(){
        var prereqs = []
        var r = db.all('SELECT * FROM prereqs', (err, rows) => {
            if( err ) return
            rows.forEach(element => {
                prereqs.push({email: element.email, course: element.coursedate, coursedate: element.coursedate})
            });
            return rows
        });
        console.log(r)
        return r
    };

    static add(prereq){
        const sql = 'INSERT INTO prereqs(email, course, coursedate) VALUES(?, ?, ?)';
        db.run(sql, prereq.email, prereq.course, prereq.coursedate);
    };    

    static deleteAll(callback){
        const sql = 'DELETE FROM prereqs';
        db.run(sql, callback);
    };
}

module.exports = Prereqs
  