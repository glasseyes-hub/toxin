import { fakeData } from '../services/js/fakeData';
import { Header } from '../blocks/header/header';
import { Menu } from '../blocks/menu/menu';
import { Authorization } from '../blocks/authorization/authorization';

const page = {
	node: document.querySelector('.page'),
	header: {
		node: document.querySelector('.page-header'),
	},
	content: {
		node: document.querySelector('.page-content'),
	},
	footer: {
		node: document.querySelector('.page-footer'),
	},
};
const header = new Header();
const menu = new Menu({
	attr: { class: 'hello' },
	content: fakeData.menuList,
});

const authorization = new Authorization();

header.controls.addContent([menu, authorization]);

page.header.node.appendChild(header.node);

console.log(header);
console.log(header.node);
