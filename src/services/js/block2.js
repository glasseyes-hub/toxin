export class Block2 {
	_state = {};
	_watcher = null;
	constructor({ template }) {
		this.template = template;
	}
	set state(state) {
		this._state = { ...this._state, ...state };

		this.render();
		this.handles();

		this._watcher && this._watcher(this);
	}
	get state() {
		return this._state;
	}
	createNode({ template, state }) {
		const div = document.createElement('div');
		div.innerHTML = template ? template(state) : '';
		return div.firstChild;
	}
	render() {
		const oldNode = this.node ? this.node : null;

		this.node = this.createNode({
			template: this.template,
			state: this.state,
		});

		oldNode && oldNode.replaceWith(this.node);
	}
	handles() {}
	watcher(watcher) {
		this._watcher = watcher;
	}
}
