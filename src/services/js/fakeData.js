export const fakeData = {
	menuList: [
		{ content: 'О нас' },
		{
			submenu: {
				title: 'Услуги',
				content: [{ content: 'Трансфер' }, { content: 'Экскурсии' }],
			},
		},
		{ content: 'Вакансии' },
		{ content: 'Новости' },
		{
			submenu: {
				title: 'Соглашения',
				content: [{ content: 'Договор' }],
			},
		},
	],
};
