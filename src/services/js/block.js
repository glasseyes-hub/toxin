export class Block {
	constructor({ template, ...options }) {
		this.node = this.createNode(template, options);

		this.content = {
			node: this.node,
			set list(list = []) {
				this._list = Array.isArray(list) ? list : [list];
			},
			get list() {
				return this._list;
			},
		};

		this.isHidden = this.node.classList.contains('-hidden-') ? true : false;

		options.content && this.setContent(options.content);
	}
	createNode(template = require('../pug/block.pug'), options) {
		const div = document.createElement('div');
		div.innerHTML = template(options);
		return div.firstChild;
	}
	contentHandler(list) {
		return Array.isArray(list) ? list : [list];
	}
	appendContent(content) {
		this.setContent([...this.content.list, ...this.contentHandler(content)]);
	}
	prependContent(content) {
		this.setContent([...this.contentHandler(content), ...this.content.list]);
	}
	setContent(content, contentNode = this.content.node) {
		this.content.list = content;

		this.content.list.forEach(content => {
			typeof content === 'object'
				? contentNode.appendChild(content.node)
				: (contentNode.innerHTML = content);
		});
	}
	addContent(content) {
		this.setContent(content);
	}
	createElement(tag, className = null) {
		const element = document.createElement(tag);
		className && element.classList.add(className);

		return element;
	}
	hide() {
		this.isHidden = true;
		this.setStatus('hidden');
	}
	show() {
		this.isHidden = false;
		this.removeStatus('hidden');
	}
	setListener({ type, callbackfn }) {
		if (callbackfn) {
			this.node.addEventListener(type, () => callbackfn());
		} else {
			console.log(type, this.node);
		}
	}
	onClick(callbackfn) {
		const type = 'click';
		this.setListener({ type, callbackfn });
	}
	onChange(callbackfn) {
		const type = 'change';
		this.setListener({ type, callbackfn });
	}
	on(type, callbackfn) {
		this.setListener({ type, callbackfn });
	}
	setStatus(status) {
		this.node.classList.add(`-${status}-`);
	}
	removeStatus(status) {
		this.node.classList.remove(`-${status}-`);
	}
}
