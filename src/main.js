require('./scss/master.scss');

const Twain = require('./twain');

const App = new Twain({
	target: '#root'
});

App.init();