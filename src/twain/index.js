const World = require('./world');
const Engine = require('./engine');
const State = require('./state');
const UI = require('./ui');

const defaults = {
	target: 'body'
}

class Main {
	
	constructor(options) {
		this._events = {};
		
		this.options = { ...defaults };
		
		if (options && typeof options === 'object') {
			this.options = {
				...this.options,
				...options
			}
		}
		
		this.container = document.querySelector(this.options.target);
	}
	
	init() {
		// Holds data for world objects and procedurally generates world
		this.world = new World(this);
		// Renders sprites and updates DOM
		this.engine = new Engine(this);
		// Manages data storage and handles game loading
		this.state = new State(this);
		// Manages user interface and click events
		this.ui = new UI(this);
		
		this.tick();
	}
	
	tick() {
		this.engine.render();
		
		requestAnimationFrame(() => this.tick());
	}
	
	on(event, callback) {
		if(!this._events[event]) this._events[event] = [];
		this._events[event].push(callback);
	}
	
	emit(event, data) {
		if(!this._events[event]) return;
		for (var i = 0; i < this._events[event].length; i++)
			this._events[event][i](data);
	}
}

module.exports = Main;