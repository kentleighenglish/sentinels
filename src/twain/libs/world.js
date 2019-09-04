
class World {

	constructor(app) {
		this.app = app;

		this._scenes = {}

		this.biomes = {

		}

		this.seed = Math.ceil(Math.random()*100000000);

		debug("World Class Initialised");
	}

	generateWorld() {
	}

	generateSuperBlock() {
	}

}

module.exports = World;
