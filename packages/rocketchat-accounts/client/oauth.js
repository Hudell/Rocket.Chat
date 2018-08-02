const OAuth = Package.oauth.OAuth;

// Allow server to specify a specify subclass of errors. We should come
// up with a more generic way to do this!
const convertError = function(err) {
	if (err && err instanceof Meteor.Error && err.error === Accounts.LoginCancelledError.numericError) {
		return new Accounts.LoginCancelledError(err.reason);
	} else {
		return err;
	}
};

// Send an OAuth login method to the server. If the user authorized
// access in the popup this should log the user in, otherwise
// nothing should happen.
Accounts.oauth.tryLoginAfterPopupClosed = function(credentialToken, callback) {
	const credentialSecret = OAuth._retrieveCredentialSecret(credentialToken) || null;
	Accounts.callLoginMethod({
		_suppressLoggingIn: true,
		methodArguments: [{oauth: {
			credentialToken,
			credentialSecret
		}}],
		userCallback: callback && function(err) {
			callback(convertError(err));
		}});
};
