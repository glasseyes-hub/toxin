import './main.sass';
import { header } from './header';
import { footer } from './footer';
import { Copyright } from '../blocks/copyright/copyright';

export { page };

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
	copyright: {
		node: document.querySelector('.page-copyright'),
	},
};

const copyright = new Copyright();

page.header.node.appendChild(header.node);
page.footer.node.appendChild(footer.node);
page.copyright.node.appendChild(copyright.node);
