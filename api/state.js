/* ===========================================================
   /api/state.js — Función serverless de Vercel para guardar/leer
   el estado de "ya salió" en Vercel Blob.
   - GET  /api/state?sid=XXX   -> { state: {...} }
   - POST /api/state  body { sid, state } -> { ok:true }
   Si no hay token de Blob configurado, responde vacío sin romper.
   Requiere la variable de entorno BLOB_READ_WRITE_TOKEN en Vercel
   (se crea sola al conectar un Blob Store al proyecto).
   =========================================================== */
import { put, list } from '@vercel/blob';

function pathFor(sid) {
  const safe = String(sid || 'default').replace(/[^a-zA-Z0-9_-]/g, '').slice(0, 40) || 'default';
  return `pfpg-state/${safe}.json`;
}

export default async function handler(req, res) {
  try {
    if (req.method === 'GET') {
      const sid = (req.query && req.query.sid) || 'default';
      const path = pathFor(sid);
      const { blobs } = await list({ prefix: path });
      const hit = blobs.find((b) => b.pathname === path) || blobs[0];
      if (!hit) return res.status(200).json({ state: {} });
      const r = await fetch(hit.url, { cache: 'no-store' });
      const state = await r.json().catch(() => ({}));
      return res.status(200).json({ state: state || {} });
    }

    if (req.method === 'POST') {
      const body = (req.body && typeof req.body === 'object')
        ? req.body
        : JSON.parse(req.body || '{}');
      const path = pathFor(body.sid);
      const state = body.state || {};
      await put(path, JSON.stringify(state), {
        access: 'public',
        addRandomSuffix: false,
        allowOverwrite: true,
        contentType: 'application/json',
      });
      return res.status(200).json({ ok: true });
    }

    return res.status(405).json({ error: 'method not allowed' });
  } catch (e) {
    // Sin token / sin Blob: respondemos vacío para que el cliente use localStorage.
    return res.status(200).json({ state: {}, error: String((e && e.message) || e) });
  }
}
