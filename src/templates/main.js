import './main.sass';
import { header } from './header';
import { footer } from './footer';
import { Copyright } from '../blocks/copyright/copyright';

export const template = {
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

template.header.node.appendChild(header.node);
template.footer.node.appendChild(footer.node);
template.copyright.node.appendChild(copyright.node);
