export const urlSearchTools = (() => {
	const urlSearchParams = new URLSearchParams(window.location.search);

	const _filter = state => {
		return Object.entries(state).reduce((acc, [key, value]) => {
			if (value != false) acc[key] = value;

			return acc;
		}, {});
	};
	const _clear = () => {
		[...urlSearchParams.keys()].forEach(key => urlSearchParams.delete(key));
	};
	const _set = state => {
		_clear();

		state = _filter(state);
		Object.entries(state).forEach(([key, value]) => {
			value && urlSearchParams.set(key, value);
		});

		const { origin, pathname } = window.location;
		const url = origin + pathname + '?' + urlSearchParams.toString();

		window.history.pushState('', '', url);
	};
	const _get = () => {
		return [...urlSearchParams.entries()].reduce((acc, [key, value]) => {
			acc[key] = value;
			return acc;
		}, {});
	};

	return new (class URLSearchTools {
		set = state => {
			_set(state);
			this._handler && this._handler(_get());
		};
		get = () => _get();
		update = state => {
			this.set({ ..._get(), ...state });
		};
		handler(callback) {
			this._handler = callback;
		}
	})();
})();
