import { Component } from '../../services/js/Component';
import { Page } from '../../services/js/Page';
import { Header } from '../../components/header/header';
import { fakeData } from '../../services/js/fakeData';
import { Footer } from '../../components/footer/footer';
import { FindRooms } from '../../components/findRooms/findRooms';

class Index extends Component {
	constructor(state) {
		require('./index.sass');

		state = {
			template: require('./index.pug'),
			...state,
		};

		super(state);
	}
	render() {
		super.render();
		this.renderFindRooms();
	}
	renderFindRooms() {
		const container = this.node.querySelector('.index-container');

		const findRooms = new FindRooms({
			className: 'index-findRoom',
			dates: this.state.dates,
			guests: this.state.guests,
		});

		container.prepend(findRooms.node);
	}
}

const index = new Index({
	dates: {
		arrival: new Date(2019, 7, 19),
		leave: new Date(2019, 7, 23),
	},
	guests: {
		adult: 2,
		children: 1,
		baby: 1,
	},
});

const page = new Page();
const header = new Header({
	menu: fakeData.header.menu,
});
const footer = new Footer({
	menu: fakeData.footer.menu,
});

page.header.appendChild(header.node);
page.main.appendChild(index.node);
page.footer.appendChild(footer.node);
