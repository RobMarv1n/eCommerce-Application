module.exports = {
  ci: {
    collect: {
      url: [
        'https://ecobazar-sprint4.netlify.app/',
        'https://ecobazar-sprint4.netlify.app/catalog',
        'https://ecobazar-sprint4.netlify.app/product',
        'https://ecobazar-sprint4.netlify.app/login',
        'https://ecobazar-sprint4.netlify.app/registration',
        'https://ecobazar-sprint4.netlify.app/profile',
        'https://ecobazar-sprint4.netlify.app/cart',
        'https://ecobazar-sprint4.netlify.app/about-us',
      ],
      exitOnFailure: false,
      numberOfRuns: 1,
      settings: {
        chromeFlags:
          '--no-sandbox --headless --disable-gpu --disable-dev-shm-usage',
        disableStorageReset: true,
        chromePath:
          'C:\\Program Files\\Google\\Chrome\\Application\\chrome.exe',
      },
    },
    assert: {
      assertions: {
        'categories:performance': ['warn', { minScore: 0.7 }],
        'categories:accessibility': ['warn', { minScore: 0.7 }],
        'categories:best-practices': ['warn', { minScore: 0.7 }],
        'categories:seo': ['warn', { minScore: 0.7 }],
      },
    },
    upload: {
      target: 'temporary-public-storage',
    },
  },
};
