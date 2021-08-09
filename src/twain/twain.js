const World = require("./libs/world");
const Engine = require("./libs/engine");
const State = require("./libs/state");
const UI = require("./libs/ui");

const defaults = {
	target: "body"
}

window.debug = (...msgs) => console.log(...msgs);

window.debugGroup = (title, messages, collapsed = false) => {
	collapsed ? console.groupCollapsed(title) : console.group(title);
	messages.map(console.log);
	console.groupEnd();
}

const errorWrap = (cb) => {
	try {
		cb();
	} catch(e) {
		console.error(e);
	}
}

class Main {

	constructor(options) {
		this._events = {};

		this.options = { ...defaults };

		if (options && typeof options === "object") {
			this.options = {
				...this.options,
				...options
			}
		}

		errorWrap(() => {
			this.container = document.querySelector(this.options.target);
			if (!this.container) {
				throw new Error(`Cannot find element ${this.options.target}`);
			}
		});
	}

	init() {
		errorWrap(() => {
			debug("App Initialise...");
			// Holds data for world objects and procedurally generates world
			this.world = new World(this);
			// Renders sprites and updates DOM
			this.engine = new Engine(this);
			// Manages data storage and handles game loading
			this.state = new State(this);
			// Manages user interface and click events
			this.ui = new UI(this);

			debug("App Started");

			this.updateTitle();

			this.createDOMSkeleton();

			if (this.options.init) {
				this.options.init(this);
			}

			this.tick();
		});
	}

	/*
	 * Animation Loop
	 */
	tick() {
		this.engine.render();

		requestAnimationFrame(() => this.tick());
	}

	/*
	 * Subscribe to global events
	 * @param {string} event
	 * @param {function} callback
	 */
	on(event, callback) {
		if(!this._events[event]) this._events[event] = [];
		this._events[event].push(callback);
	}

	/*
	 * Emit a global event
	 * @param {string} event
	 * @param {object} data
	 */
	emit(event, data) {
		if(!this._events[event]) return;
		for (var i = 0; i < this._events[event].length; i++)
			this._events[event][i](data);
	}

	/*
	 * Update the HTML title
	 */
	updateTitle(append) {
		let el = document.querySelector("title");

		const mainTitle = this.options.title || "Twain Game";

		if (!el) {
			el = document.createElement("title");
			document.querySelector("head").appendChild(el);
		}

		el.innerHTML = `${mainTitle} ${append ? " | " + append : ""}`;
	}

	/*
	 * Create the initial DOM skeleton
	 */
	createDOMSkeleton() {
		this.uiContainer = document.createElement("div");
		this.viewportContainer = document.createElement("div");

		this.container.classList.add("twain");

		this.uiContainer.classList.add("twain__ui");
		this.viewportContainer.classList.add("twain__viewport");

		this.container.appendChild(this.uiContainer);
		this.container.appendChild(this.viewportContainer);
	}

}

module.exports = Main;
