const path = require('path')
const express = require('express')
const cors = require('cors')
const dotenv = require('dotenv')
const { all, run, initDatabase } = require('./database/db')
const { authRouter, ensureAdmin } = require('./routes/auth.routes')
const { fishRouter } = require('./routes/fish.routes')
const { adminRouter } = require('./routes/admin.routes')

dotenv.config()

const app = express()
const PORT = process.env.PORT || 5000

app.use(
  cors({
    origin: '*',
  }),
)
app.use(express.json())
app.use('/uploads', express.static(path.join(__dirname, 'uploads')))

app.get('/api/health', (req, res) => {
  res.json({ ok: true })
})

app.use('/api/auth', authRouter)
app.use('/api/fish', fishRouter)
app.use('/api/admin', adminRouter)

async function seedFish() {
  const rows = await all('SELECT id FROM fish_products LIMIT 1')
  if (rows.length > 0) return

  await run(
    `INSERT INTO fish_products (name, description, price, availability, image_url) VALUES
    (?, ?, ?, ?, ?),
    (?, ?, ?, ?, ?),
    (?, ?, ?, ?, ?)`,
    [
      'Surmai',
      'Premium king mackerel, cleaned fresh every morning.',
      '₹650 / kg',
      'In Stock',
      'https://images.unsplash.com/photo-1615141982883-c7ad0e69fd62?auto=format&fit=crop&w=900&q=80',
      'Pomfret',
      'Soft, rich taste and perfect for fry or curry.',
      '₹820 / kg',
      'Low Stock',
      'https://images.unsplash.com/photo-1611171711915-905ca7f0b947?auto=format&fit=crop&w=900&q=80',
      'Bangda',
      'Budget-friendly fresh mackerel, ideal for daily meals.',
      '₹350 / kg',
      'In Stock',
      'https://images.unsplash.com/photo-1580476262798-bddd9f4b7369?auto=format&fit=crop&w=900&q=80',
    ],
  )
}

async function start() {
  try {
    await initDatabase()
    await ensureAdmin()
    await seedFish()
    app.listen(PORT, () => {
      console.log(`Backend running on port ${PORT}`)
    })
  } catch (error) {
    console.error('Failed to start server', error)
    process.exit(1)
  }
}

start()
