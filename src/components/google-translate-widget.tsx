'use client';

import { useEffect } from 'react';

declare global {
  interface Window {
    google: any;
    googleTranslateElementInit: () => void;
  }
}

export function GoogleTranslateWidget() {
  useEffect(() => {
    const addScript = () => {
      const script = document.createElement('script');
      script.src = '//translate.google.com/translate_a/element.js?cb=googleTranslateElementInit';
      script.async = true;
      document.body.appendChild(script);
    };

    window.googleTranslateElementInit = () => {
      new window.google.translate.TranslateElement(
        {
          pageLanguage: 'fr',
          includedLanguages: 'en,es,fr',
          layout: window.google.translate.TranslateElement.InlineLayout.SIMPLE,
        },
        'google_translate_element'
      );
    };

    if (!document.querySelector('script[src*="translate.google.com"]')) {
        addScript();
    }
    
    return () => {
        const script = document.querySelector('script[src*="translate.google.com"]');
        if (script) {
            // It's tricky to fully clean up the Google Translate widget
            // For this app, we will just hide it if the component unmounts
            const widget = document.getElementById('google_translate_element');
            if(widget) widget.style.display = 'none';
            const banner = document.querySelector('.goog-te-banner-frame');
            if(banner) banner.remove();
        }
    }

  }, []);

  return <div id="google_translate_element" />;
}
