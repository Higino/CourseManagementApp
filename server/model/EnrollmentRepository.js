class EnrollmentRepository {
    constructor(dao) {
      this.dao = dao
    }
  
    createTable() {
      const sql = `
      CREATE TABLE IF NOT EXISTS enrollments (id INTEGER PRIMARY KEY AUTOINCREMENT, courseid INTEGER, name TEXT, email TEXT, title TEXT, confirmedflag INTEGER DEFAULT 0)`
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

    getAllUnconfirmed(courseid) {
      return this.dao.all(`SELECT * FROM enrollments WHERE courseid = ? AND confirmedflag = 0`, 
      [courseid])
    }

    confirmEnrollment(courseid, email) {
      return this.dao.run(
        'UPDATE enrollments SET confirmedflag = 1 WHERE courseid = ? AND email = ?',
        [courseid, email])
  
    }

    getAllConfirmed(courseid) {
      return this.dao.all(`SELECT * FROM enrollments WHERE courseid = ? AND confirmedflag = 1`, 
      [courseid])
    }
}
  
module.exports = EnrollmentRepository;