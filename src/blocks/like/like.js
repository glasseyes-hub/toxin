class Block {
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

export class Like extends Block {
	constructor({ likes = 0, isLiked = false }) {
		super({ template: require('./like.pug') });

		require('./like.sass');

		this.state = { likes, isLiked };
	}
	render() {
		super.render();
		this.state.isLiked && this.node.classList.add('liked');
	}
	handles() {
		super.handles();
		this.node.addEventListener('click', () => {
			this.state.isLiked ? this.unlike() : this.like();
		});
	}
	like() {
		if (this.state.isLiked) return false;

		this.state = { likes: this.state.likes + 1, isLiked: true };
	}
	unlike() {
		if (!this.state.isLiked) return false;

		this.state = { likes: this.state.likes - 1, isLiked: false };
	}
}
