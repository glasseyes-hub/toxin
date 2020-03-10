export { cmd, CMD };

class CMD {
	createBlock = ({ template, state }) => {
		return {
			node: this.createNode({ template, state }),
			state: this.createState(state),
			template,
		};
	};
	createNode = ({ template, state }) => {
		const div = document.createElement('div');
		div.innerHTML = template ? template(state) : '';
		return div.firstChild;
	};
	createState = state => {
		return state || {};
	};
}

const cmd = new CMD();
