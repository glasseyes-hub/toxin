import { fakeData } from '../services/js/fakeData';
import { Header } from '../blocks/header/header';
import { Menu } from '../blocks/menu/menu';
import { Authorization } from '../blocks/authorization/authorization';
import { Logout } from '../blocks/logout/logout';

export { header };

const header = new Header();
const menu = new Menu({
	content: fakeData.header.menu,
});

const userControls = fakeData.user
	? new Logout({
			content: fakeData.user.name,
	  })
	: new Authorization();

header.controls.addContent([menu, userControls]);
