import { Component } from '../../services/js/Component';
import { Page } from '../../services/js/Page';
import { ColorsAndTypes } from '../../components/colorsAndTypes/colorsAndTypes';

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
	}
	renderColorsAndTypes() {
		const container = this.node.querySelector('.colorsAndTypes');

		const colorsAndTypes = new ColorsAndTypes();

		container.appendChild(colorsAndTypes.node);
	}
}

const uikit = new UIKit();

const page = new Page();

page.main.appendChild(uikit.node);
