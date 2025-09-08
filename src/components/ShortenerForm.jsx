import React, { useState } from 'react';
import { Box, Button, TextField, Typography, Grid, Paper } from '@mui/material';
import { generateShortcode, isValidShortcode } from '../utils/shortcode';
import { putUrl, listUrls } from '../utils/storage';
import { logEvent } from '../utils/loggingMiddleware';

const DEFAULT_VALIDITY_MIN = 30; // minutes

export default function ShortenerForm() {
  const [rows, setRows] = useState([{ longUrl: '', validity: '', shortcode: '' }]);
  const [msg, setMsg] = useState(null);

  const onChange = (idx, field, value) => {
    const n = [...rows]; n[idx][field] = value; setRows(n);
  };

  const addRow = () => {
    if (rows.length >= 5) return setMsg('Max 5 URLs at a time.');
    setRows([...rows, { longUrl: '', validity: '', shortcode: '' }]);
  };

  const removeRow = (i) => {
    const n = rows.filter((_, idx) => idx!==i); setRows(n);
  };

  const validateUrl = (u) => {
    try { new URL(u); return true; } catch(e){ return false; }
  };

  const submitAll = () => {
    setMsg(null);
    const existing = listUrls();
    const existingSet = new Set(existing.map(e => e.shortcode));

    for (let i=0;i<rows.length;i++) {
      const r = rows[i];
      if (!r.longUrl || !validateUrl(r.longUrl)) { setMsg(`Row ${i+1}: invalid long URL.`); return; }
      const validity = r.validity ? parseInt(r.validity,10) : DEFAULT_VALIDITY_MIN;
      if (Number.isNaN(validity) || validity <= 0) { setMsg(`Row ${i+1}: validity must be integer minutes.`); return; }

      let code = r.shortcode && r.shortcode.trim() !== '' ? r.shortcode.trim() : generateShortcode(6);
      if (r.shortcode && !isValidShortcode(code)) { setMsg(`Row ${i+1}: custom shortcode invalid.`); return; }

      // uniqueness check
      let attempts = 0;
      while (existingSet.has(code) && attempts < 5) {
        code = generateShortcode(6); attempts++;
      }
      if (existingSet.has(code)) {
        setMsg(`Row ${i+1}: shortcode collision. Choose another shortcode.`);
        return;
      }
      const now = Date.now();
      const expiry = now + validity * 60 * 1000;

      const obj = {
        longUrl: r.longUrl,
        shortcode: code,
        createdAt: now,
        expiryAt: expiry,
        clicks: []
      };
      putUrl(obj);
      existingSet.add(code);
      logEvent('SHORTLINK_CREATED', { shortcode: code, longUrl: r.longUrl, validityMinutes: validity });
    }

    setMsg('Short links created successfully.');
    setRows([{ longUrl: '', validity: '', shortcode: '' }]);
  };

  return (
    <Box sx={{ p:2 }}>
      <Typography variant="h5">Shorten URLs (up to 5 at once)</Typography>
      {rows.map((r, idx) => (
        <Paper key={idx} sx={{ p:2, my:1 }}>
          <Grid container spacing={2}>
            <Grid item xs={12}><TextField fullWidth label="Long URL" value={r.longUrl} onChange={e => onChange(idx,'longUrl',e.target.value)} /></Grid>
            <Grid item xs={6}><TextField fullWidth label={`Validity (minutes) — default ${DEFAULT_VALIDITY_MIN}`} value={r.validity} onChange={e=>onChange(idx,'validity',e.target.value)} /></Grid>
            <Grid item xs={6}><TextField fullWidth label="Custom shortcode (optional)" value={r.shortcode} onChange={e=>onChange(idx,'shortcode',e.target.value)} /></Grid>
            <Grid item xs={12}>
              <Button variant="outlined" color="error" onClick={()=>removeRow(idx)} disabled={rows.length===1}>Remove</Button>
            </Grid>
          </Grid>
        </Paper>
      ))}
      <Box sx={{mt:2}}>
        <Button variant="contained" onClick={addRow} sx={{mr:2}}>Add row</Button>
        <Button variant="contained" color="primary" onClick={submitAll}>Create Shortlinks</Button>
      </Box>
      {msg && <Typography sx={{mt:2}}>{msg}</Typography>}
    </Box>
  );
}
