const express = require('express')
const bcrypt = require('bcryptjs')
const jwt = require('jsonwebtoken')
const { get, run } = require('../database/db')

const router = express.Router()

async function ensureAdmin() {
  const existing = await get('SELECT id FROM users WHERE email = ?', [process.env.ADMIN_EMAIL])
  if (existing) return

  const hash = await bcrypt.hash(process.env.ADMIN_PASSWORD, 10)
  await run('INSERT INTO users (email, password_hash) VALUES (?, ?)', [
    process.env.ADMIN_EMAIL,
    hash,
  ])
}

router.post('/login', async (req, res) => {
  try {
    const { email, password } = req.body
    if (!email || !password) {
      return res.status(400).json({ message: 'Email and password are required' })
    }

    await ensureAdmin()
    const user = await get('SELECT * FROM users WHERE email = ?', [email])
    if (!user) return res.status(401).json({ message: 'Invalid credentials' })

    const valid = await bcrypt.compare(password, user.password_hash)
    if (!valid) return res.status(401).json({ message: 'Invalid credentials' })

    const token = jwt.sign({ id: user.id, email: user.email }, process.env.JWT_SECRET, {
      expiresIn: '12h',
    })

    return res.json({
      token,
      user: { id: user.id, email: user.email },
    })
  } catch (error) {
    return res.status(500).json({ message: 'Login failed' })
  }
})

module.exports = {
  authRouter: router,
  ensureAdmin,
}
