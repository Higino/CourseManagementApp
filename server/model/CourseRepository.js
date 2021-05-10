class CourseRepository {
    constructor(dao) {
      this.dao = dao
    }
  
    createTable() {
      const sql = `
      CREATE TABLE IF NOT EXISTS courses (id INTEGER PRIMARY KEY AUTOINCREMENT, name TEXT, status INTEGER)`
      return this.dao.run(sql)
    }

    async createDefaultCourses () {
      const defaultCourse = (await this.getAll()).filter( e => { return e.name === 'default-course' })
      console.log(defaultCourse)
      const sql = `
      INSERT INTO courses (name, status) VALUES ('default-course', 1)`
      if( defaultCourse.length === 0 ) {
        console.log("Creating default course")
        return this.dao.run(sql)
      }

    }

    create(name) {
      return this.dao.run(
        'INSERT INTO courses (name, status) VALUES (?, 1)',
        [name])
    }

    findById (id) {
      return this.dao.all(
          'SELECT * FROM courses WHERE id = ? AND status = 1',
          [id])
    }

    findAllById (id) {
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

    getAllOpened() {
      return this.dao.all(`SELECT * FROM courses WHERE status = 1`)
    }

    closeCourse(id) {
    return this.dao.run(
      'UPDATE courses SET status = 0 WHERE id = ?',
      [id])
  }
      
}
  
module.exports = CourseRepository;