import React from 'react';
import { listUrls, deleteUrl } from '../utils/storage';
import { Box, Typography, Paper, Button } from '@mui/material';
import { logEvent } from '../utils/loggingMiddleware';

export default function ShortenedList() {
  const urls = listUrls();

  const remove = (code) => {
    deleteUrl(code);
    logEvent('SHORTLINK_DELETED', { shortcode: code });
    window.location.reload();
  };

  return (
    <Box sx={{p:2}}>
      <Typography variant="h6">Your Shortened URLs</Typography>
      {urls.length === 0 && <Typography>No links yet.</Typography>}
      {urls.map(u => (
        <Paper key={u.shortcode} sx={{p:2, my:1}}>
          <Typography>Short: <a href={`${window.location.origin}/${u.shortcode}`} target="_blank" rel="noreferrer">{window.location.origin}/{u.shortcode}</a></Typography>
          <Typography>Original: {u.longUrl}</Typography>
          <Typography>Created: {new Date(u.createdAt).toLocaleString()}</Typography>
          <Typography>Expires: {u.expiryAt ? new Date(u.expiryAt).toLocaleString() : 'Never'}</Typography>
          <Typography>Total Clicks: {(u.clicks || []).length}</Typography>
          <Button sx={{mt:1}} variant="outlined" color="error" onClick={()=>remove(u.shortcode)}>Delete</Button>
        </Paper>
      ))}
    </Box>
  );
}
