Package.describe({
	name: 'rocketchat:accounts',
	version: '0.0.1',
	summary: 'JS-Accounts integration',
	git: ''
});

Package.onUse(function(api) {
	api.use([
		'underscore',
		'ecmascript',
		'accounts-oauth'
	]);

	api.use('mongo', ['client', 'server']);

	api.mainModule('server/index.js', 'server');
	api.mainModule('client/oauth.js', 'client');
});

Npm.depends({
	'@accounts/server': '0.0.18',
	'@accounts/mongo': '0.0.12'
});
