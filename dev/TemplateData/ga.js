(() => {
  const GA_ID = 'G-ZERQV1P57M';    
  const CONSENT_DEFAULT = 'denied'; 

  if (!GA_ID || !/^G-[A-Z0-9]+$/i.test(GA_ID)) return;

  // Respect Do Not Track
  const dnt = (navigator.doNotTrack || window.doNotTrack || navigator.msDoNotTrack) === '1';
  if (dnt) return;

  // Set up dataLayer/gtag queue before loading the GA library
  window.dataLayer = window.dataLayer || [];
  function gtag(){ dataLayer.push(arguments); }
  window.gtag = window.gtag || gtag;

  // Consent Mode (v2-ready). With "granted", GA sets cookies.
  // With "denied", GA sends cookieless pings (limited/aggregated).
  gtag('consent', 'default', {
    ad_storage:           CONSENT_DEFAULT,
    ad_user_data:         CONSENT_DEFAULT,
    ad_personalization:   CONSENT_DEFAULT,
    analytics_storage:    CONSENT_DEFAULT,
    wait_for_update:      500
  });

  // Timestamp
  gtag('js', new Date());

  // Load GA script
  const s = document.createElement('script');
  s.async = true;
  s.src = 'https://www.googletagmanager.com/gtag/js?id=' + encodeURIComponent(GA_ID);
  s.onerror = function(){ /* silently ignore missing/blocked GA */ };
  document.head.appendChild(s);

  // Basic page view
  gtag('config', GA_ID);

  // Optional helper for custom events from your game:
  window.gaEvent = function(name, params){
    try { gtag('event', name, params || {}); } catch(e) { /* no-op */ }
  };
})();
