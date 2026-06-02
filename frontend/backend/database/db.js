const path = require('path')
const Database = require('better-sqlite3')

const dbPath = path.join(__dirname, 'fishbiz.db')
const db = new Database(dbPath)

function run(sql, params = []) {
  try {
    const stmt = db.prepare(sql)
    const result = stmt.run(params)
    return Promise.resolve({ lastID: result.lastInsertRowid, changes: result.changes })
  } catch (err) {
    return Promise.reject(err)
  }
}

function get(sql, params = []) {
  try {
    const stmt = db.prepare(sql)
    const row = stmt.get(params)
    return Promise.resolve(row)
  } catch (err) {
    return Promise.reject(err)
  }
}

function all(sql, params = []) {
  try {
    const stmt = db.prepare(sql)
    const rows = stmt.all(params)
    return Promise.resolve(rows)
  } catch (err) {
    return Promise.reject(err)
  }
}

async function initDatabase() {
  db.exec(`
    CREATE TABLE IF NOT EXISTS users (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      email TEXT UNIQUE NOT NULL,
      password_hash TEXT NOT NULL,
      created_at DATETIME DEFAULT CURRENT_TIMESTAMP
    )
  `)

  db.exec(`
    CREATE TABLE IF NOT EXISTS fish_products (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      name TEXT NOT NULL,
      description TEXT NOT NULL,
      price TEXT,
      availability TEXT NOT NULL DEFAULT 'In Stock',
      image_url TEXT,
      additional_images TEXT,
      is_featured INTEGER DEFAULT 0,
      created_at DATETIME DEFAULT CURRENT_TIMESTAMP,
      updated_at DATETIME DEFAULT CURRENT_TIMESTAMP
    )
  `)

  try { db.exec('ALTER TABLE fish_products ADD COLUMN additional_images TEXT') } catch (e) {}
  try { db.exec('ALTER TABLE fish_products ADD COLUMN is_featured INTEGER DEFAULT 0') } catch (e) {}

  db.exec(`
    CREATE TABLE IF NOT EXISTS inquiries (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      buyer_name TEXT NOT NULL,
      phone TEXT NOT NULL,
      city_country TEXT,
      fish_interested_in TEXT,
      message TEXT,
      status TEXT DEFAULT 'New',
      created_at DATETIME DEFAULT CURRENT_TIMESTAMP
    )
  `)

  db.exec(`
    CREATE TABLE IF NOT EXISTS settings (
      key TEXT PRIMARY KEY,
      value TEXT
    )
  `)

  db.exec(`
    CREATE TABLE IF NOT EXISTS gallery (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      image_url TEXT NOT NULL,
      category TEXT,
      description TEXT,
      created_at DATETIME DEFAULT CURRENT_TIMESTAMP
    )
  `)
}

module.exports = { db, run, get, all, initDatabase }