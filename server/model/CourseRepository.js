class CourseRepository {
    constructor(dao) {
      this.dao = dao
    }
  
    createTable() {
      const sql = `
      CREATE TABLE IF NOT EXISTS courses (id INTEGER PRIMARY KEY AUTOINCREMENT, name TEXT)`
      return this.dao.run(sql)
    }

    createSampleCourses () {
        this.create("Test Course 1")
        this.create("Test Course 2")
        this.create("Test Course 3")
        this.create("Test Course 4")
    }

    create(name) {
        return this.dao.run(
          'INSERT INTO courses (name) VALUES (?)',
          [name])
    }

    findById (id) {
        return this.dao.all(
            'SELECT * FROM courses WHERE id = ?',
            [id])
      }

    deleteAll() {
        return this.dao.run(
          `DELETE FROM courses`,
          []
        )
    }
    deleteById (id) {
        return this.dao.run(
            'DELETE FROM courses WHERE id = ?',
            [id])
      }

    getAll() {
        return this.dao.all(`SELECT * FROM courses`)
    }
      
}
  
module.exports = CourseRepository;