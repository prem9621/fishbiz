const express = require('express')
const { all, run } = require('../database/db')

const router = express.Router()

function requireAdminToken(req, res, next) {
  const providedToken =
    req.headers['x-admin-token'] ||
    req.headers.authorization?.replace(/^Bearer\s+/i, '') ||
    req.body?.adminToken

  if (!process.env.ADMIN_TOKEN || providedToken !== process.env.ADMIN_TOKEN) {
    return res.status(401).json({ message: 'Invalid admin token' })
  }

  return next()
}

router.get('/stock', async (req, res) => {
  try {
    const rows = await all(
      `
      SELECT
        id,
        name_en,
        name_hi,
        name_mr,
        price_per_kg,
        available,
        emoji,
        image_url,
        updated_at
      FROM fish_stock
      ORDER BY available DESC, name_en ASC
      `,
    )

    return res.json(rows)
  } catch (error) {
    console.error(error)
    return res.status(500).json({ message: 'Failed to load stock' })
  }
})

router.get('/stock/available', async (req, res) => {
  try {
    const rows = await all(
      `
      SELECT
        id,
        name_en,
        name_hi,
        name_mr,
        price_per_kg,
        available,
        emoji,
        image_url,
        updated_at
      FROM fish_stock
      WHERE available = 1
      ORDER BY name_en ASC
      `,
    )

    return res.json(rows)
  } catch (error) {
    console.error(error)
    return res.status(500).json({ message: 'Failed to load available stock' })
  }
})

router.post('/stock/update', requireAdminToken, async (req, res) => {
  try {
    const { id, price_per_kg, available } = req.body

    if (!id) {
      return res.status(400).json({ message: 'Stock item id is required' })
    }

    await run(
      `
      UPDATE fish_stock
      SET
        price_per_kg = COALESCE(?, price_per_kg),
        available = COALESCE(?, available),
        updated_at = CURRENT_TIMESTAMP
      WHERE id = ?
      `,
      [price_per_kg ?? null, typeof available === 'boolean' ? Number(available) : available ?? null, id],
    )

    const [updated] = await all(
      `
      SELECT
        id,
        name_en,
        name_hi,
        name_mr,
        price_per_kg,
        available,
        emoji,
        image_url,
        updated_at
      FROM fish_stock
      WHERE id = ?
      `,
      [id],
    )

    return res.json(updated)
  } catch (error) {
    console.error(error)
    return res.status(500).json({ message: 'Failed to update stock' })
  }
})

router.post('/order', async (req, res) => {
  try {
    const {
      customer_name,
      phone,
      fish_requested,
      quantity_kg,
      delivery_address,
      preferred_time,
      message,
    } = req.body

    if (!customer_name || !phone || !fish_requested || !quantity_kg || !delivery_address) {
      return res.status(400).json({
        message: 'Name, phone, fish, quantity, and delivery address are required',
      })
    }

    const result = await run(
      `
      INSERT INTO orders (
        customer_name,
        phone,
        fish_requested,
        quantity_kg,
        delivery_address,
        preferred_time,
        message
      )
      VALUES (?, ?, ?, ?, ?, ?, ?)
      `,
      [
        customer_name,
        phone,
        fish_requested,
        quantity_kg,
        delivery_address,
        preferred_time || '',
        message || '',
      ],
    )

    const whatsappText = encodeURIComponent(
      `New order for Godawari Fish:%0AName: ${customer_name}%0APhone: ${phone}%0AFish: ${fish_requested}%0AQuantity: ${quantity_kg} kg%0AAddress: ${delivery_address}%0ATime: ${preferred_time || 'Not specified'}%0AMessage: ${message || 'None'}`,
    )

    return res.status(201).json({
      id: result.lastID,
      message: 'Order saved successfully',
      whatsappUrl: `https://wa.me/919371306189?text=${whatsappText}`,
    })
  } catch (error) {
    console.error(error)
    return res.status(500).json({ message: 'Failed to save order' })
  }
})

router.post('/contact', async (req, res) => {
  try {
    const { name, phone, email, message } = req.body

    if (!name || !phone || !message) {
      return res.status(400).json({ message: 'Name, phone, and message are required' })
    }

    const result = await run(
      `
      INSERT INTO contact_messages (name, phone, email, message)
      VALUES (?, ?, ?, ?)
      `,
      [name, phone, email || '', message],
    )

    return res.status(201).json({
      id: result.lastID,
      message: 'Contact message saved successfully',
    })
  } catch (error) {
    console.error(error)
    return res.status(500).json({ message: 'Failed to save contact message' })
  }
})

module.exports = {
  publicRouter: router,
}
