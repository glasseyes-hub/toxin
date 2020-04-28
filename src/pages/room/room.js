import { Component } from '../../services/js/Component';
import { fakeData } from '../../services/js/fakeData';
import { Tools } from '../../services/js/Tools';
import { RoomInfo } from '../../components/roomInfo/roomInfo';
import { RoomReviewes } from '../../components/roomReviewes/roomReviewes';
import { RoomAdditionals } from '../../components/roomAdditionals/roomAdditionals';
import { RoomDiagram } from '../../components/roomDiagram/roomDiagram';
import { RoomSummury } from '../../components/roomSummury/roomSummury';
import { Page } from '../../services/js/Page';
import { Header } from '../../components/header/header';
import { Footer } from '../../components/footer/footer';
import { Copyright } from '../../components/copyright/copyright';

const tools = new Tools();

class Room extends Component {
	constructor(state) {
		require('./room.sass');

		state = {
			template: require('./room.pug'),
			...state,
		};

		super(state);
	}
	render() {
		super.render();
		this.renderAbout();
		this.renderReviews();
		this.renderAdditionals();
		this.renderSidebar();
	}
	renderAbout() {
		const roomAbout = this.node.querySelector('.room-about');

		const roomInfo = new RoomInfo(this.state.info);

		const roomDiagram = new RoomDiagram(this.state.diagram);

		roomAbout.appendChild(roomInfo.node);
		roomAbout.appendChild(roomDiagram.node);
	}
	renderReviews() {
		const roomReviewes = this.node.querySelector('.room-reviewes');

		const reviewes = new RoomReviewes(this.state.reviewes);

		roomReviewes.replaceWith(reviewes.node);
	}
	renderAdditionals() {
		const roomAdditionals = this.node.querySelector('.room-additional');

		const additionals = new RoomAdditionals({
			className: 'room-additional',
			...this.state.additionals,
		});

		roomAdditionals.replaceWith(additionals.node);
	}
	renderSidebar() {
		const roomSidebar = this.node.querySelector('.room-sidebar');

		const roomSummury = new RoomSummury(this.state.summury);

		roomSummury.addObserver((state) => {
			const { guests, dates } = state;
			tools.url.search.set({ ...dates, ...guests });
		});

		roomSidebar.appendChild(roomSummury.node);
	}
}

const room = new Room({
	images: fakeData.room.images,
	info: {
		comfort: fakeData.room.comfort,
		convenience: fakeData.room.convenience,
		cosiness: fakeData.room.cosiness,
	},
	diagram: {
		data: fakeData.room.diagram,
	},
	reviewes: {
		list: fakeData.room.reviewes,
	},
	additionals: {
		noPets: fakeData.room.noPets,
		noParty: fakeData.room.noParty,
		arrivalTime: fakeData.room.arrivalTime,
		leaveTime: fakeData.room.leaveTime,
		cancelable: fakeData.room.cancelable,
	},
	summury: {
		number: fakeData.room.number,
		isLuxury: fakeData.room.isLuxury,
		price: fakeData.room.price,
		serviceFee: fakeData.room.serviceFee,
		serviceFeeDiscount: fakeData.room.serviceFeeDiscount,
		dates: {
			arrival: tools.url.search.get('arrival'),
			leave: tools.url.search.get('leave'),
		},
		guests: {
			adult: tools.url.search.get('adult'),
			children: tools.url.search.get('children'),
			baby: tools.url.search.get('baby'),
		},
	},
});

const page = new Page();
const header = new Header({
	menu: fakeData.header.menu,
});
const footer = new Footer({
	menu: fakeData.footer.menu,
});
const copyright = new Copyright();

page.header.appendChild(header.node);
page.main.appendChild(room.node);
page.footer.appendChild(footer.node);
page.body.appendChild(copyright.node);
