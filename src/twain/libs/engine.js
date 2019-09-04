
class Engine {

	constructor(app) {
		this.app = app;

		this.views = {}
		this._currentView = null;
	}

	render() {

	}

	changeView(view) {
		this._currentView = view;
	}

}

module.exports = Engine;
