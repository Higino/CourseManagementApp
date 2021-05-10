class EnrollmentRepository {
    constructor(dao) {
      this.dao = dao
    }
  
    createTable() {
      const sql = `
      CREATE TABLE IF NOT EXISTS enrollments (id INTEGER PRIMARY KEY AUTOINCREMENT, courseid INTEGER, name TEXT, email TEXT, title TEXT)`
      return this.dao.run(sql)
    }

    create(courseid, name, email, title) {
        return this.dao.run(
          'INSERT INTO enrollments ( courseid, name, email, title) VALUES (?, ?, ?, ?)',
          [courseid, name, email, title])
    }

    deleteAll(courseid) {
        return this.dao.run(
          `DELETE FROM enrollments WHERE courseid = ?`,
          [courseid]
        )
    }

    getAll(courseid) {
        return this.dao.all(`SELECT * FROM enrollments WHERE courseid = ?`, 
        [courseid])
    }
      
}
  
module.exports = EnrollmentRepository;