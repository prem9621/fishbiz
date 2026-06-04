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
  limits: { fileSize: 5 * 1024 * 1024 },
})

router.get('/', async (req, res) => {
  try {
    const products = await all(`
      SELECT id, name, name_hindi, name_english, description, price, price_per_kg, available, availability, image_url AS imageUrl, additional_images AS additionalImages, is_featured AS isFeatured
      FROM fish_products
      ORDER BY is_featured DESC, id DESC
    `)
    return res.json(products)
  } catch (error) {
    return res.status(500).json({ message: 'Failed to load fish products' })
  }
})

router.get('/:id', async (req, res) => {
  try {
    const fish = await get(
      `SELECT id, name, name_hindi, name_english, description, price, price_per_kg, available, availability, image_url AS imageUrl, additional_images AS additionalImages, is_featured AS isFeatured FROM fish_products WHERE id = ?`,
      [req.params.id],
    )
    if (!fish) return res.status(404).json({ message: 'Fish not found' })
    return res.json(fish)
  } catch (error) {
    return res.status(500).json({ message: 'Failed to load fish details' })
  }
})

router.post('/', requireAuth, upload.array('images', 6), async (req, res) => {
  try {
    const { name, description, price = '', availability = 'In Stock', imageUrl = '', isFeatured = 0 } = req.body
    if (!name || !description) {
      return res.status(400).json({ message: 'Name and description are required' })
    }

    let mainImage = imageUrl
    let additionalImages = []

    if (req.files && req.files.length > 0) {
      mainImage = `/uploads/${req.files[0].filename}`
      additionalImages = req.files.slice(1).map(f => `/uploads/${f.filename}`)
    }

    const result = await run(
      `INSERT INTO fish_products (name, description, price, availability, image_url, additional_images, is_featured)
       VALUES (?, ?, ?, ?, ?, ?, ?)`,
      [name, description, price, availability, mainImage, JSON.stringify(additionalImages), isFeatured],
    )

    const fish = await get(
      `SELECT id, name, description, price, availability, image_url AS imageUrl, additional_images AS additionalImages, is_featured AS isFeatured FROM fish_products WHERE id = ?`,
      [result.lastID],
    )

    return res.status(201).json(fish)
  } catch (error) {
    console.error(error)
    return res.status(500).json({ message: 'Failed to add fish product' })
  }
})

router.put('/:id', requireAuth, upload.array('images', 6), async (req, res) => {
  try {
    const current = await get('SELECT * FROM fish_products WHERE id = ?', [req.params.id])
    if (!current) return res.status(404).json({ message: 'Fish not found' })

    const { name, description, price = '', availability = 'In Stock', imageUrl = '', isFeatured = 0, keepOldImages = 'true' } = req.body
    
    let mainImage = imageUrl || current.image_url || ''
    let additionalImages = JSON.parse(current.additional_images || '[]')

    if (req.files && req.files.length > 0) {
      mainImage = `/uploads/${req.files[0].filename}`
      const newAdditionals = req.files.slice(1).map(f => `/uploads/${f.filename}`)
      if (keepOldImages === 'true') {
        additionalImages = [...additionalImages, ...newAdditionals]
      } else {
        additionalImages = newAdditionals
      }
    }

    await run(
      `UPDATE fish_products
       SET name = ?, description = ?, price = ?, availability = ?, image_url = ?, additional_images = ?, is_featured = ?, updated_at = CURRENT_TIMESTAMP
       WHERE id = ?`,
      [
        name || current.name,
        description || current.description,
        price,
        availability,
        mainImage,
        JSON.stringify(additionalImages),
        isFeatured,
        req.params.id,
      ],
    )

    const fish = await get(
      `SELECT id, name, description, price, availability, image_url AS imageUrl, additional_images AS additionalImages, is_featured AS isFeatured FROM fish_products WHERE id = ?`,
      [req.params.id],
    )

    return res.json(fish)
  } catch (error) {
    console.error(error)
    return res.status(500).json({ message: 'Failed to update fish product' })
  }
})

router.delete('/:id', requireAuth, async (req, res) => {
  try {
    const fish = await get('SELECT id FROM fish_products WHERE id = ?', [req.params.id])
    if (!fish) return res.status(404).json({ message: 'Fish not found' })

    await run('DELETE FROM fish_products WHERE id = ?', [req.params.id])
    return res.json({ message: 'Deleted successfully' })
  } catch (error) {
    return res.status(500).json({ message: 'Failed to delete fish product' })
  }
})

module.exports = {
  fishRouter: router,
}
