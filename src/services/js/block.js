export class Block {
	constructor({ template, ...options }) {
		this.template = template;
		this.node = this.createNode(options);
		this.content = options.content ? this.contentHandler(options.content) : [];
		this.hidden = this.node.classList.contains('-hidden-') ? true : false;
	}
	createNode(options) {
		const div = document.createElement('div');
		div.innerHTML = this.template(options);
		return div.firstChild;
	}
	contentHandler(list) {
		list = Array.isArray(list) ? list : [list];

		return list.map(elem => {
			typeof elem === 'object'
				? this.node.appendChild(elem.node)
				: (this.node.innerHTML = elem);

			return elem;
		});
	}
	appendContent(content) {
		this.content.push(...this.contentHandler(content));
	}
	prependContent(content) {
		this.content.unshift(...this.contentHandler(content));
	}
	setContent(content) {
		this.content = this.contentHandler(content);
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
		this.hidden = true;
		this.node.classList.add('-hidden-');
	}
	show() {
		this.hidden = false;
		this.node.classList.remove('-hidden-');
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
}
