import React, { useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { getUrl, addClick } from '../utils/storage';
import { logEvent } from '../utils/loggingMiddleware';

function getCoarseGeoFallback() {
  return {
    language: navigator.language || null,
    timezone: Intl.DateTimeFormat().resolvedOptions().timeZone || null
  };
}

export default function RedirectHandler() {
  const { shortcode } = useParams();
  const navigate = useNavigate();

  useEffect(() => {
    const u = getUrl(shortcode);
    if (!u) {
      logEvent('REDIRECT_MISS', { shortcode });
      navigate('/not-found', { replace: true });
      return;
    }
    if (u.expiryAt && Date.now() > u.expiryAt) {
      logEvent('REDIRECT_EXPIRED', { shortcode });
      navigate('/expired', { replace: true });
      return;
    }

    const click = {
      ts: Date.now(),
      referrer: document.referrer || null,
      source: window.location.href,
      geo: getCoarseGeoFallback()
    };
    addClick(shortcode, click);
    logEvent('SHORTLINK_CLICK', { shortcode, click });

    window.location.href = u.longUrl;
  }, [shortcode, navigate]);

  return <div>Redirecting...</div>;
}
