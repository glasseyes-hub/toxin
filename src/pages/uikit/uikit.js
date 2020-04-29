import { Component } from '../../services/js/Component';
import { Page } from '../../services/js/Page';
import { ColorsAndTypes } from '../../components/colorsAndTypes/colorsAndTypes';
import { FormElements } from '../../components/formElements/formElements';

class UIKit extends Component {
	constructor(state) {
		require('./uikit.sass');

		state = {
			template: require('./uikit.pug'),
			...state,
		};

		super(state);
	}
	render() {
		super.render();
		this.renderColorsAndTypes();
		this.renderFormElements();
	}
	renderColorsAndTypes() {
		const container = this.node.querySelector('.uikit-colorsAndTypes');

		const colorsAndTypes = new ColorsAndTypes({
			className: 'uikit-colorsAndTypes',
		});

		container.replaceWith(colorsAndTypes.node);
	}
	renderFormElements() {
		const container = this.node.querySelector('.uikit-formElements');

		const formElements = new FormElements({
			className: 'uikit-formElements',
		});

		container.replaceWith(formElements.node);
	}
}

const uikit = new UIKit();

const page = new Page();

page.main.appendChild(uikit.node);
