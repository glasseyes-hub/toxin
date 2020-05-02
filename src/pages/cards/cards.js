import { Component } from '../../services/js/Component';
import { FindRooms } from '../../components/findRooms/findRooms';
import { Page } from '../../services/js/Page';
import { RegistrationForm } from '../../components/registrationForm/registrationForm';
import { RoomSummury } from '../../components/roomSummury/roomSummury';
import { LoginForm } from '../../components/loginForm/loginForm';
import { Calendar } from '../../components/calendar/calendar';
import { Room } from '../../components/room/room';

class Cards extends Component {
	constructor(state) {
		require('./cards.sass');

		state = {
			template: require('./cards.pug'),
			...state,
		};

		super(state);
	}
	render() {
		super.render();
		this.renderFirstColumn();
		this.renderCentralColumn();
		this.renderLastColumn();
	}
	renderFirstColumn() {
		const column = this.node.querySelector('.cards-column_first');

		const findRooms = new FindRooms();
		const registrationForm = new RegistrationForm();

		column.appendChild(findRooms.node);
		column.appendChild(registrationForm.node);
	}
	renderCentralColumn() {
		const column = this.node.querySelector('.cards-column_central');

		const roomSummury = new RoomSummury({
			number: 888,
			isLuxury: true,
			price: 9990,
			serviceFee: 2179,
			serviceFeeDiscount: 2179,
			dates: {
				arrival: new Date(2019, 7, 19),
				leave: new Date(2019, 7, 23),
			},
			guests: {
				adult: 2,
				children: 1,
			},
		});

		const loginForm = new LoginForm();

		column.appendChild(roomSummury.node);
		column.appendChild(loginForm.node);
	}
	renderLastColumn() {
		const column = this.node.querySelector('.cards-column_last');

		const calendar = new Calendar({
			arrival: new Date(2019, 7, 19),
			leave: new Date(2019, 7, 23),
		});

		const room1 = new Room({
			id: 1,
			number: 888,
			isLuxury: true,
			price: 9900,
			rating: 5,
			reviews: 145,
			images: [
				'img/rooms/image-1.png',
				'img/rooms/image-2.png',
				'img/rooms/image-3.png',
				'img/rooms/image-4.png',
			],
		});
		const room2 = new Room({
			id: 2,
			number: 840,
			isLuxury: false,
			price: 9900,
			rating: 4,
			reviews: 65,
			images: [
				'img/rooms/image-22.png',
				'img/rooms/image-2.png',
				'img/rooms/image-3.png',
				'img/rooms/image-4.png',
			],
		});

		column.appendChild(calendar.node);
		column.appendChild(room1.node);
		column.appendChild(room2.node);
	}
}

const cards = new Cards();
const page = new Page();

page.main.appendChild(cards.node);
