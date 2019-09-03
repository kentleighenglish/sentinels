require('./scss/master.scss');

const Twain = require('./twain/twain');
const { requireAll } = require('./twain/utils');

const quests = requireAll(require.context('./quests', false, /\.(js)$/i));

const App = new Twain({
	title: "The Sentinels",
	target: '#root',
	world: {
		size: [ 10, 10 ]
	},
	player: {
		startingPosition: [ 0, 0 ]
	},
	quests,
	init: app => {

	}
});

App.init();
