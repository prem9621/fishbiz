const path = require('path')
const express = require('express')
const cors = require('cors')
const dotenv = require('dotenv')
const { all, run, initDatabase } = require('./database/db')
const { authRouter, ensureAdmin } = require('./routes/auth.routes')
const { fishRouter } = require('./routes/fish.routes')
const { adminRouter } = require('./routes/admin.routes')
const { publicRouter } = require('./routes/public.routes')
const { fishData } = require('./data/fishData')

dotenv.config()

process.env.ADMIN_EMAIL = process.env.ADMIN_EMAIL || 'sameergodawari189@gmail.com'
process.env.ADMIN_PASSWORD = process.env.ADMIN_PASSWORD || 'Sameer@123'
process.env.JWT_SECRET = process.env.JWT_SECRET || 'godawarifish_secret_2024'
process.env.PORT = process.env.PORT || '5000'

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
  res.json({ ok: true, service: 'Godawari Fish API' })
})

app.use('/api/auth', authRouter)
app.use('/api/fish', fishRouter)
app.use('/api/admin', adminRouter)
app.use('/api', publicRouter)

async function seedLegacyFish() {
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

async function seedStock() {
  const rows = await all('SELECT id FROM fish_stock LIMIT 1')
  if (rows.length > 0) return

  for (const fish of fishData) {
    await run(
      `
      INSERT INTO fish_stock (
        name_en,
        name_hi,
        name_mr,
        price_per_kg,
        available,
        emoji,
        image_url
      )
      VALUES (?, ?, ?, ?, ?, ?, ?)
      `,
      [
        fish.nameEn,
        fish.nameHi,
        fish.nameMr,
        fish.price,
        Number(fish.available),
        fish.emoji,
        fish.img,
      ],
    )
  }
}

async function start() {
  try {
    await initDatabase()
    await ensureAdmin()
    await seedLegacyFish()
    await seedStock()
    app.listen(PORT, () => {
      console.log(`Backend running on port ${PORT}`)
    })
  } catch (error) {
    console.error('Failed to start server', error)
    process.exit(1)
  }
}

start()