export class NewBlock {
	constructor(onStateChange) {
		this._node = null;
		this._state = {};
		this._stateHistory = [];
		this._stateHistoryLength = 3;

		this._onStateChange = onStateChange;
	}
	set node(newNode) {
		this._node = newNode;
	}
	get node() {
		return this._node;
	}
	set state(newState) {
		this._stateHistory.unshift({ ...this._state });
		this._stateHistory.length > this._stateHistoryLength &&
			this._stateHistory.pop();

		this._state = { ...this._state, ...newState };
	}
	get state() {
		return this._state;
	}
	setState(newState) {
		this.state = newState;

		this.node ? this.updateNode() : this.setNode();
	}
	createNode({ template = null, options = {} }) {
		const div = document.createElement('div');
		div.innerHTML = template ? template(options) : '';
		return div.firstChild;
	}
	setNode() {
		this.node = this.createNode({
			template: this.template,
			options: this.state,
		});

		this.events();
	}
	updateNode() {
		const previousNode = this.node;

		this.setNode();

		previousNode.parentNode &&
			previousNode.parentNode.replaceChild(this.node, previousNode);
	}
	events() {
		this._onStateChange && this._onStateChange(this.state);
	}
}
