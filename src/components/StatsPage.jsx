import React from 'react';
import { listUrls } from '../utils/storage';
import { Box, Typography, Paper } from '@mui/material';

export default function StatsPage() {
  const urls = listUrls();
  return (
    <Box sx={{p:2}}>
      <Typography variant="h5">Statistics</Typography>
      {urls.map(u=> (
        <Paper key={u.shortcode} sx={{p:2, my:1}}>
          <Typography variant="h6">{u.shortcode} — {u.longUrl}</Typography>
          <Typography>Created: {new Date(u.createdAt).toLocaleString()}</Typography>
          <Typography>Expiry: {u.expiryAt ? new Date(u.expiryAt).toLocaleString() : 'Never'}</Typography>
          <Typography>Total Clicks: {(u.clicks || []).length}</Typography>
          <Box sx={{mt:1}}>
            <Typography>Click details:</Typography>
            {(u.clicks || []).map((c,i)=>(
              <Paper key={i} sx={{p:1, my:1}}>
                <Typography>Time: {new Date(c.ts).toLocaleString()}</Typography>
                <Typography>Referrer: {c.referrer || '—'}</Typography>
                <Typography>Source (URL): {c.source}</Typography>
                <Typography>Geo coarse: {JSON.stringify(c.geo)}</Typography>
              </Paper>
            ))}
          </Box>
        </Paper>
      ))}
    </Box>
  );
}
