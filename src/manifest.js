module.exports = (isProd, platform) => ({
  name: 'Superhero',
  description: 'Superhero Wallet',
  version: process.env.npm_package_version,
  manifest_version: 2,
  ...(platform === 'extension-firefox' && {
    applications: {
      gecko: {
        strict_min_version: '53.0',
      },
    },
  }),
  permissions: [
    'storage',
    'unlimitedStorage',
    'videoCapture',
    'activeTab',
    'clipboardWrite',
    'contextMenus',
    'notifications',
    'tabs',
    'webRequest',
    'webRequestBlocking',
    'webNavigation',
    '*://*.chain/*',
    '*://*.google.com/*',
    'https://*.twitter.com/*',
    'https://twitter.com/*',
    'https://*.youtube.com/watch?v=*',
    'https://wallet.superhero.com/*',
  ],
  icons: {
    48: './icons/icon_48.png',
    128: './icons/icon_128.png',
  },
  content_security_policy: `script-src 'self'${isProd ? '' : " 'unsafe-eval'"}; object-src 'self'`,
  browser_action: {
    default_title: 'Superhero',
    default_popup: 'popup/popup.html',
  },
  background: {
    scripts: ['background.js'],
    persistent: true,
  },
  content_scripts: [
    {
      run_at: 'document_start',
      all_frames: true,
      matches: ['https://*/*', 'http://*/*'],
      js: ['other/inject.js'],
    },
    {
      run_at: 'document_start',
      matches: ['https://*.twitter.com/*', 'https://twitter.com/*'],
      js: ['other/twitter.js'],
    },
    {
      run_at: 'document_start',
      matches: ['https://*.youtube.com/watch?v=*'],
      js: ['other/youtube.js'],
    },
  ],
  web_accessible_resources: [
    'inject.js',
    'phishing/phishing.html',
    'phishing/phishing.js',
    'popup/CameraRequestPermission.html',
    'other/tipButton.css',
    'popup/popup.html',
  ],
});
