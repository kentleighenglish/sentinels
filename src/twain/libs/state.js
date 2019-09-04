const { cloneDeep } = require('lodash');

const initialState = {
	menus: {},
	scenes: {},
	quests: {},
	constants: {}
};

const slotName = (number) => `state_slot_${number}`;

class State {

	constructor(app) {
		this.app = app;

		this._currentState = cloneDeep(initialState);
	}

	load(slot = 1) {
		const loadState = localStorage.getItem(slotName(slot));

		if (!loadState) {
			throw new Error('No save found in that save slot');
		}

		this._setState(JSON.parse(loadState));
	}

	save(slot = 1) {
		const state = this._currentState;

		localStorage.setItem(slotName(slot), JSON.stringify(state));
	}

	_setState(newState) {
		this._currentState = {
			...this._currentState,
			...newState
		}

		debugGroup('STATE_UPDATED', this._currentState);
	}

}

module.exports = State;
