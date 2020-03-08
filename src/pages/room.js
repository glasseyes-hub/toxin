import './room.sass';

import { template } from '../templates/main';
import { cmd } from '../services/js/pageTools';
import { RoomInfo } from '../blocks/roomInfo/roomInfo';

let room = cmd.createBlock({
	template: require('./room.pug'),
});
room = {
	...room,
	about: room.node.querySelector('.about'),
	reviewes: room.node.querySelector('.reviewes'),
	additional: room.node.querySelector('.additional'),
	sidebar: room.node.querySelector('.sidebar'),
};

template.content.node.appendChild(room.node);

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

room.about.appendChild(roomInfo.node);
