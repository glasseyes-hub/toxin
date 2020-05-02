import { Component } from '../../services/js/Component';
import { Color } from '../../components/color/color';
import { Type } from '../../components/type/type';
import { Page } from '../../services/js/Page';

class ColorsAndTypes extends Component {
	constructor(state) {
		require('./colorsAndTypes.sass');

		state = {
			template: require('./colorsAndTypes.pug'),
			...state,
		};

		super(state);
	}
	render() {
		super.render();
		this.renderColors();
		this.renderTypes();
	}
	renderColors() {
		const container = this.node.querySelector('.colorsAndTypes-colors');

		const dark100 = new Color({
			className: 'color_dark100',
			title: 'Dark Shade 100%',
			subtitle: '#1F2041',
		});

		const dark75 = new Color({
			className: 'color_dark75',
			title: 'Dark Shade 75%',
			subtitle: '#1F2041',
		});

		const dark50 = new Color({
			className: 'color_dark50',
			title: 'Dark Shade 50%',
			subtitle: '#1F2041',
		});

		const dark25 = new Color({
			className: 'color_dark25',
			title: 'Dark Shade 25%',
			subtitle: '#1F2041',
		});

		const dark5 = new Color({
			className: 'color_dark5',
			title: 'Dark Shade 5%',
			subtitle: '#1F2041',
		});

		const purple = new Color({
			className: 'color_purple',
			title: 'Purple',
			subtitle: '#BC9CFF',
		});

		const green = new Color({
			className: 'color_green',
			title: 'Green',
			subtitle: '#6FCF97',
		});

		container.appendChild(dark100.node);
		container.appendChild(dark75.node);
		container.appendChild(dark50.node);
		container.appendChild(dark25.node);
		container.appendChild(dark5.node);
		container.appendChild(purple.node);
		container.appendChild(green.node);
	}
	renderTypes() {
		const container = this.node.querySelector('.colorsAndTypes-types');

		const h1 = new Type({
			tag: 'h1',
			title: 'H1',
			subtitle: 'This one is the sub-section or widget title',
		});

		const h2 = new Type({
			tag: 'h2',
			title: 'H2',
			subtitle: 'Next one is the item title inside widgets',
		});

		const h3 = new Type({
			tag: 'h3',
			title: 'H3',
			subtitle: 'This is a label or CTA text',
		});

		const body = new Type({
			className: 'colorsAndTypes-type colorsAndTypes-type_body',
			tag: 'p',
			title: 'Body',
			subtitle:
				'This is the body text which is used for most of the design, like paragraphs, lists, etc.',
		});

		container.appendChild(h1.node);
		container.appendChild(h2.node);
		container.appendChild(h3.node);
		container.appendChild(body.node);
	}
}

const colorsAndTypes = new ColorsAndTypes();
const page = new Page();

page.main.appendChild(colorsAndTypes.node);
