const express = require('express')
const path = require('path')
const multer = require('multer')
const { all, get, run } = require('../database/db')
const { requireAuth } = require('../middleware/auth')

const router = express.Router()

const storage = multer.diskStorage({
  destination: path.join(__dirname, '..', 'uploads'),
  filename: (req, file, cb) => {
    const ext = path.extname(file.originalname)
    cb(null, `${Date.now()}-${Math.round(Math.random() * 1e9)}${ext}`)
  },
})

const upload = multer({
  storage,
  limits: { fileSize: 10 * 1024 * 1024 },
})

// --- Inquiries ---
router.get('/inquiries', requireAuth, async (req, res) => {
  try {
    const inquiries = await all('SELECT * FROM inquiries ORDER BY created_at DESC')
    res.json(inquiries)
  } catch (error) {
    res.status(500).json({ message: 'Failed to load inquiries' })
  }
})

router.post('/inquiries', async (req, res) => {
  try {
    const { buyer_name, phone, city_country, fish_interested_in, message } = req.body
    if (!buyer_name || !phone) {
      return res.status(400).json({ message: 'Name and phone are required' })
    }
    await run(
      'INSERT INTO inquiries (buyer_name, phone, city_country, fish_interested_in, message) VALUES (?, ?, ?, ?, ?)',
      [buyer_name, phone, city_country, fish_interested_in, message]
    )
    res.status(201).json({ message: 'Inquiry sent successfully' })
  } catch (error) {
    res.status(500).json({ message: 'Failed to send inquiry' })
  }
})

// --- Settings ---
router.get('/settings', async (req, res) => {
  try {
    const rows = await all('SELECT * FROM settings')
    const settings = {}
    rows.forEach(row => {
      settings[row.key] = row.value
    })
    res.json(settings)
  } catch (error) {
    res.status(500).json({ message: 'Failed to load settings' })
  }
})

router.post('/settings', requireAuth, upload.single('file'), async (req, res) => {
  try {
    const { key, value } = req.body
    let finalValue = value
    if (req.file) {
      finalValue = `/uploads/${req.file.filename}`
    }
    await run(
      'INSERT INTO settings (key, value) VALUES (?, ?) ON CONFLICT(key) DO UPDATE SET value = ?',
      [key, finalValue, finalValue]
    )
    res.json({ key, value: finalValue })
  } catch (error) {
    res.status(500).json({ message: 'Failed to update settings' })
  }
})

// --- Gallery ---
router.get('/gallery', async (req, res) => {
  try {
    const items = await all('SELECT * FROM gallery ORDER BY created_at DESC')
    res.json(items)
  } catch (error) {
    res.status(500).json({ message: 'Failed to load gallery' })
  }
})

router.post('/gallery', requireAuth, upload.single('image'), async (req, res) => {
  try {
    const { category, description } = req.body
    if (!req.file) {
      return res.status(400).json({ message: 'Image is required' })
    }
    const imageUrl = `/uploads/${req.file.filename}`
    const result = await run(
      'INSERT INTO gallery (image_url, category, description) VALUES (?, ?, ?)',
      [imageUrl, category, description]
    )
    const item = await get('SELECT * FROM gallery WHERE id = ?', [result.lastID])
    res.status(201).json(item)
  } catch (error) {
    res.status(500).json({ message: 'Failed to add gallery item' })
  }
})

router.delete('/gallery/:id', requireAuth, async (req, res) => {
  try {
    await run('DELETE FROM gallery WHERE id = ?', [req.params.id])
    res.json({ message: 'Gallery item deleted' })
  } catch (error) {
    res.status(500).json({ message: 'Failed to delete gallery item' })
  }
})

module.exports = {
  adminRouter: router
}
