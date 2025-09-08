import React from 'react';
import { BrowserRouter as Router, Routes, Route, Link } from 'react-router-dom';
import { Container, AppBar, Toolbar, Button } from '@mui/material';
import ShortenerForm from './components/ShortenerForm';
import ShortenedList from './components/ShortenedList';
import StatsPage from './components/StatsPage';
import RedirectHandler from './components/RedirectHandler';

export default function App() {
  return (
    <Router>
      <AppBar position="static">
        <Toolbar>
          <Button color="inherit" component={Link} to="/">Shorten</Button>
          <Button color="inherit" component={Link} to="/list">My Links</Button>
          <Button color="inherit" component={Link} to="/stats">Stats</Button>
        </Toolbar>
      </AppBar>
      <Container maxWidth="md" sx={{mt:3}}>
        <Routes>
          <Route path="/" element={<ShortenerForm />} />
          <Route path="/list" element={<ShortenedList />} />
          <Route path="/stats" element={<StatsPage />} />
          <Route path="/not-found" element={<div>Shortlink not found.</div>} />
          <Route path="/expired" element={<div>Link expired.</div>} />
          <Route path="/:shortcode" element={<RedirectHandler />} />
        </Routes>
      </Container>
    </Router>
  );
}
