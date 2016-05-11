Package.describe({
  name: 'alertify',
  version: '0.0.1',
  summary: 'A wrapper of alertifyjs.org for meteor',
  documentation: 'README.md'
});

Package.onUse(function (api) {
  api.versionsFrom('1.3.2');
  api.use([]);
  api.addFiles('alertify.js', 'client');
  api.addFiles('alertify.css', 'client');
  api.export('Alertify', 'client');
});

// Package.onTest(function (api) {
//
// });
