export class Block {
	constructor({ template, ...options }) {
		this.template = template;
		this.node = this.createNode(options);
		this.hidden = this.node.classList.contains('-hidden-') ? true : false;

		options.content && this.addContent(options.content);
	}
	createNode(options) {
		const div = document.createElement('div');
		div.innerHTML = this.template(options);
		return div.firstChild;
	}
	addContent(content) {
		this.content = content;
		if (typeof content === 'string') {
			this.node.innerHTML = content;
		} else {
			content.forEach(block => {
				block && this.node.appendChild(block.node);
			});
		}
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
	onClick(callbackfn) {
		if (callbackfn) {
			this.node.addEventListener('click', () => callbackfn());
		} else {
			console.log('onClick:');
			console.log(this.node);
		}
	}
}
