import './room.sass';

import { template } from '../../templates/main';
import { urlSearchTools, state } from '../../services/js/Page';
import { cmd } from '../../services/js/pageTools';
import { RoomInfo } from '../../blocks/roomInfo/roomInfo';
import { RoomReviewes } from '../../blocks/roomReviewes/roomReviewes';
import { RoomAdditionals } from '../../blocks/roomAdditionals/roomAdditionals';
import { RoomSummury } from '../../blocks/roomSummury/roomSummury';
import { RoomPhotos } from '../../blocks/roomPhotos/roomPhotos';
import { RoomDiagram } from '../../blocks/components/roomDiagram/roomDiagram';

let room = cmd.createBlock({
	template: require('./room.pug'),
});
room = {
	...room,
	header: room.node.querySelector('.room-header'),
	about: room.node.querySelector('.room-about'),
	reviewes: room.node.querySelector('.room-reviewes'),
	additional: room.node.querySelector('.room-additional'),
	sidebar: room.node.querySelector('.room-sidebar'),
};

template.main.node.appendChild(room.node);

const roomPhotos = new RoomPhotos({
	list: ['./img/room1.png', './img/room2.png', './img/room3.png'],
});

const roomInfo = new RoomInfo({
	title: 'Сведения о номере',
	list: [
		{
			iconClass: 'icon_comfort',
			name: 'Комфорт',
			info: 'Шумопоглощающие стены',
		},
		{
			iconClass: 'icon_convenience',
			name: 'Удобство',
			info: 'Окно в каждой из спален',
		},
		{
			iconClass: 'icon_cosiness',
			name: 'Уют',
			info: 'Номер оснащён камином',
		},
	],
});

const roomDiagram = new RoomDiagram({
	data: [130, 65, 65, 90],
});

const roomReviewes = new RoomReviewes({
	title: 'Отзывы посетителей номера',
	list: [
		{
			name: 'Мурад Сарафанов',
			icon: './img/foto1.png',
			date: '5 дней назад',
			likes: 12,
			isLiked: true,
			text:
				'Великолепный матрас на кровати в основной спальне! А пуфик вообще потрясающий. И стены, действительно, шумоподавляющие. Выкрикивал комплименты повару — никто не жаловался из соседей.',
		},
		{
			name: 'Патрисия Стёклышкова',
			icon: './img/foto2.png',
			date: 'Неделю назад',
			likes: 2,
			text:
				'Обслуживание на высоте! Всё аккуратно, чисто. Завтраки в номер советую заказать, каждый день новое блюдо и десерт как комплимент',
		},
	],
});

const roomAdditionals = new RoomAdditionals({
	roolsList: [
		'Нельзя с питомцами',
		'Без вечеринок и мероприятий',
		'Время прибытия — после 13:00, а выезд до 12:00',
	],
	isCancelable: true,
});

const roomSummury = new RoomSummury({
	number: 888,
	isLuxury: true,
	price: 9900,
	isServiceFeeFree: true,
	dates: {
		arrival: state.urlSearch.arrival,
		leave: state.urlSearch.leave,
	},
	guests: {
		adult: state.urlSearch.adult,
		children: state.urlSearch.children,
		baby: state.urlSearch.baby,
	},
});

roomSummury.watcher(_this => {
	const { arrival, leave } = _this.state.dates;
	const { adult, children, baby } = _this.state.guests;

	urlSearchTools.update({ arrival, leave, adult, children, baby });
});

room.header.appendChild(roomPhotos.node);
room.about.appendChild(roomInfo.node);
room.about.appendChild(roomDiagram.node);
room.reviewes.replaceWith(roomReviewes.node);
room.additional.replaceWith(roomAdditionals.node);
room.sidebar.appendChild(roomSummury.node);
