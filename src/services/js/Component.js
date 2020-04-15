export class Component {
	_state = {};
	_observerList = [];
	constructor(state = {}) {
		this.state = state;
		this.render();
		this.handlers();
	}
	set state(state) {
		this._state = { ...this._state, ...state };

		this._observerList.length &&
			this._observerList.forEach((callback) => callback(this.state));
	}
	get state() {
		return this._state;
	}
	createNode() {
		try {
			const div = document.createElement('div');
			div.innerHTML = this.state.template
				? this.state.template(this.state)
				: '';
			return div.firstChild || div;
		} catch (e) {
			console.error('Creating node error: ' + e);
		}
	}
	render() {
		const currentNode = this.node ? this.node : null;

		this.node = this.createNode();

		currentNode && currentNode.replaceWith(this.node);
	}
	handlers() {}
	addObserver(callback) {
		this._observerList.push(callback);
	}
}
