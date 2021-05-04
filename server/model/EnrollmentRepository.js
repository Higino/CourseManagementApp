class EnrollmentRepository {
    constructor(dao) {
      this.dao = dao
    }
  
    createTable() {
      const sql = `
      CREATE TABLE IF NOT EXISTS enrollments (id INTEGER PRIMARY KEY AUTOINCREMENT, name TEXT, email TEXT, title TEXT)`
      return this.dao.run(sql)
    }

    create(name, email, title) {
        return this.dao.run(
          'INSERT INTO enrollments (name, email, title) VALUES (?, ?, ?)',
          [name, email, title])
    }

    deleteAll() {
        return this.dao.run(
          `DELETE FROM enrollments`,
          []
        )
    }

    getAll() {
        return this.dao.all(`SELECT * FROM enrollments`)
    }
      
}
  
module.exports = EnrollmentRepository;