class PrereqsRepository {
    constructor(dao) {
      this.dao = dao
    }
  
    createTable() {
      const sql = `
      CREATE TABLE IF NOT EXISTS prereqs (id INTEGER PRIMARY KEY AUTOINCREMENT, email TEXT, course TEXT, coursedate TEXT)`
      return this.dao.run(sql)
    }
    
    create(email, course, coursedate) {
        return this.dao.run(
          `INSERT INTO prereqs (email, course, coursedate)
            VALUES (?, ?, ?)`,
          [email, course, coursedate])
    }

    deleteAll() {
        return this.dao.run(
          `DELETE FROM prereqs`,
          []
        )
    }

    getAll() {
        return this.dao.all(`SELECT * FROM prereqs`)
    }

  }
  
  module.exports = PrereqsRepository;