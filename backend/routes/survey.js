// routes/surveys.js
const express = require('express');
const router = express.Router();
const pool = require('../db');
const { authRequired } = require('../middleware/auth');
const { v4: uuidv4 } = require('uuid');
const createCsvWriter = require('csv-writer').createObjectCsvStringifier;

// Create survey
router.post('/', authRequired, async (req, res) => {
  const { title, description, is_public = true, questions = [] } = req.body;
  if (!title) return res.status(400).json({ error: 'Title required' });
  const id = uuidv4();
  try {
    await pool.query('INSERT INTO surveys (id, owner_id, title, description, is_public) VALUES (?,?,?,?,?)',
      [id, req.user.userId, title, description || '', is_public]);
    for (let i = 0; i < questions.length; i++) {
      const qid = uuidv4();
      await pool.query('INSERT INTO questions (id, survey_id, question_text, question_type, meta, position) VALUES (?,?,?,?,?,?)',
        [qid, id, questions[i].question_text, questions[i].question_type, JSON.stringify(questions[i].meta || {}), i]);
    }
    res.json({ survey_id: id });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Could not create survey' });
  }
});

// Get public surveys
router.get('/', async (req, res) => {
  try {
    const [rows] = await pool.query('SELECT * FROM surveys WHERE is_public=1 ORDER BY created_at DESC');
    res.json({ surveys: rows });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Server error' });
  }
});

// Get survey with questions
router.get('/:id', async (req, res) => {
  const { id } = req.params;
  try {
    const [s] = await pool.query('SELECT * FROM surveys WHERE id=?', [id]);
    if (!s[0]) return res.status(404).json({ error: 'Not found' });
    const [qs] = await pool.query('SELECT * FROM questions WHERE survey_id=? ORDER BY position ASC', [id]);
    res.json({ survey: { ...s[0], questions: qs } });
  } catch (err) {
    res.status(500).json({ error: 'Server error' });
  }
});

// Submit response
router.post('/:id/responses', async (req, res) => {
  const { id } = req.params;
  const { answers } = req.body;
  if (!answers) return res.status(400).json({ error: 'Answers required' });
  try {
    const rid = uuidv4();
    await pool.query('INSERT INTO responses (id, survey_id, answers) VALUES (?,?,?)',
      [rid, id, JSON.stringify(answers)]);
    res.json({ response_id: rid });
  } catch (err) {
    res.status(500).json({ error: 'Server error' });
  }
});

// Get responses (owner only)
router.get('/:id/responses', authRequired, async (req, res) => {
  const { id } = req.params;
  try {
    const [s] = await pool.query('SELECT owner_id FROM surveys WHERE id=?', [id]);
    if (!s[0]) return res.status(404).json({ error: 'Survey not found' });
    if (s[0].owner_id !== req.user.userId) return res.status(403).json({ error: 'Not allowed' });
    const [rows] = await pool.query('SELECT * FROM responses WHERE survey_id=?', [id]);
    res.json({ responses: rows });
  } catch (err) {
    res.status(500).json({ error: 'Server error' });
  }
});

// Download CSV (owner only)
router.get('/:id/responses/download', authRequired, async (req, res) => {
  const { id } = req.params;
  try {
    const [s] = await pool.query('SELECT owner_id FROM surveys WHERE id=?', [id]);
    if (!s[0]) return res.status(404).json({ error: 'Survey not found' });
    if (s[0].owner_id !== req.user.userId) return res.status(403).json({ error: 'Not allowed' });

    const [rows] = await pool.query('SELECT * FROM responses WHERE survey_id=?', [id]);
    if (!rows.length) return res.json({ message: 'No responses' });

    const allKeys = new Set();
    rows.forEach(r => Object.keys(JSON.parse(r.answers)).forEach(k => allKeys.add(k)));

    const header = [
      { id: 'id', title: 'response_id' },
      { id: 'created_at', title: 'created_at' },
      ...Array.from(allKeys).map(k => ({ id: k, title: k }))
    ];
    const csvWriter = createCsvWriter({ header });

    const records = rows.map(r => {
      const ans = JSON.parse(r.answers);
      const obj = { id: r.id, created_at: r.created_at };
      allKeys.forEach(k => obj[k] = ans[k] || '');
      return obj;
    });

    const csv = csvWriter.getHeaderString() + csvWriter.stringifyRecords(records);
    res.setHeader('Content-disposition', 'attachment; filename=responses.csv');
    res.set('Content-Type', 'text/csv');
    res.send(csv);
  } catch (err) {
    res.status(500).json({ error: 'Server error' });
  }
});

module.exports = router;
