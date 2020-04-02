import { template } from '../../templates/main';
import { FindRoom } from '../../blocks/findRoom/findRoom';
import { Content } from '../../blocks/content/content';
import { Container } from '../../blocks/_lib/container/container';

template.content.node.classList.add('page-content_index');

const content = new Content();
const findRoom = new FindRoom();
const footname = new Container({
	attr: { class: 'content_footname' },
	content: 'Лучшие номера для вашей работы, отдыха и просто вдохновения',
});

content.setContent([findRoom, footname]);

template.content.node.appendChild(content.node);
