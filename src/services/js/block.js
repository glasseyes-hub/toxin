export class Block {
	constructor({ template, ...options }) {
		this.template = template;
		this.node = this.createNode(options);

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
}
