require('./scss/master.scss');

const Twain = require('./twain/twain');
const { requireAll } = require('./twain/utils');

const quests = requireAll(require.context('./quests', false, /\.(js)$/i));
const menus = requireAll(require.context('./menus', false, /\.js$/i));

window.queryParams = window.location.search.match(/[^\?\&]+\=?[^\?\&]*/g).reduce((obj, q) => {
	const split = q.split('=');
	const key = split[0];
	let val = split[1] || "true";

	const number = Number.parseFloat(val);

	val = Number.isNaN(number) ? val : number;

	return {
		...obj,
		[key]: (val === "true" || val === "false") ? val === "true" : val
	}
}, {});

const App = new Twain({
	title: "The Sentinels",
	target: '#root',
	scenes: {
		world: {
			type: 'worldspace',
			size: [ 10, 10 ]
		}
	},
	player: {
		startingPosition: [ 0, 0 ],
		sprite: 'o',
		color: '#999999'
	},
	quests,
	ui: {
		defaultMenu: 'main',
		menus
	},
	init: app => {
		const slot = queryParams.slot || 1;

		try {
			app.state.load(slot);
		} catch(e) {

		}

		// app.ui.loadMenu('main');
	}
});

App.init();
