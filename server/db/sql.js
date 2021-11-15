const sqlite3 = require('sqlite3').verbose();
const path = require('path')
const db_path = path.join(__dirname, "./database.db");
const scripts = require('./scripts')

let db = new sqlite3.Database(db_path, (err) => {
    if (err) {
      console.error(err.message);
    } else {
      db.run(scripts.CREATE_USERS_TABLE);
    };
      console.log('Connected to the database.');
    }
  );

module.exports = db