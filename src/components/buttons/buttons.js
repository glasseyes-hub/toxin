import { Component } from '../../services/js/Component';
import { Title } from '../title/title';
import { Button } from '../button/button';

export class Buttons extends Component {
	constructor(state) {
		require('./buttons.sass');

		state = {
			template: require('./buttons.pug'),
			...state,
		};

		super(state);
	}
	render() {
		super.render();
		this.renderTitle();
		this.renderButtons();
	}
	renderTitle() {
		const title = new Title({
			className: 'buttons-title',
			title: 'Buttons',
		});

		this.node.prepend(title.node);
	}
	renderButtons() {
		const filledRow = this.node.querySelector('.buttons-row_filled');
		const borderedRow = this.node.querySelector('.buttons-row_bordered');
		const defaultRow = this.node.querySelector('.buttons-row_default');
		const bigRow = this.node.querySelector('.buttons-row_big');
		const buttonFilled = new Button({
			className: 'button_filled',
			text: 'Click me',
		});
		const buttonFilledDisabled = new Button({
			className: 'button_filled button_disabled',
			text: 'Click me',
		});
		const buttonBordered = new Button({
			className: 'button_bordered',
			text: 'Click me',
		});
		const buttonBorderedDisabled = new Button({
			className: 'button_bordered button_disabled',
			text: 'Click me',
		});
		const buttonSimple = new Button({
			className: 'button_simple',
			text: 'Click me',
		});
		const buttonSimpleDisabled = new Button({
			className: 'button_simple button_grey button_disabled',
			text: 'Click me',
		});
		const buttonBig = new Button({
			className: 'button_big button_filled button_arrow',
			text: 'Перейти к оплате',
		});

		filledRow.appendChild(buttonFilled.node);
		filledRow.appendChild(buttonFilledDisabled.node);
		borderedRow.appendChild(buttonBordered.node);
		borderedRow.appendChild(buttonBorderedDisabled.node);
		defaultRow.appendChild(buttonSimple.node);
		defaultRow.appendChild(buttonSimpleDisabled.node);
		bigRow.appendChild(buttonBig.node);
	}
}
