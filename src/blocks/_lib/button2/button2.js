import { Block2 } from '../../../services/js/block2';

export class Button2 extends Block2 {
	constructor(state) {
		super({ template: require('./button2.pug') });

		require('./button2.sass');

		const subClass = state.type ? 'button2_' + state.type : '';

		state.attributes = { class: subClass };
		state.borderRadius = state.width / 2;

		this.styles = {
			width: state.width + 'px',
			height: state.height + 'px',
			borderRadius: state.borderRadius + 'px',
		};

		this.state = state;
	}
	render() {
		super.render();

		this.setStyles(this.node, this.styles);

		const buttonBorder = this.node.querySelector('.button-border');

		switch (this.state.type) {
			case 'bordered':
				const border = this.state.border ? this.state.border : 1;

				this.setStyles(buttonBorder, {
					width: this.state.width - border * 2 + 'px',
					height: this.state.height - border * 2 + 'px',
					lineHeight: this.state.height - border * 2 + 'px',
					borderRadius: this.state.borderRadius + 'px',
					margin: border + 'px',
				});
				break;
		}
	}
	onClick(callback) {
		this.node.addEventListener('click', () => {
			callback();
		});
	}
	setStyles(node, styles) {
		Object.assign(node.style, styles);
	}
}
