export { cmd, CMD };

class CMD {
	createBlock = state => {
		return {
			node: this.createNode(state),
			state: this.createState(state),
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
