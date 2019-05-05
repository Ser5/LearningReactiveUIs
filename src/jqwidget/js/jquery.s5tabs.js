$.widget('s5.tabs', {
	_create: function () {
		let self     = this;
		this.options = {...{activeClass:'active'}, ...this.options};
		this.$select = this.element.find('.js-tabs__select');
		this.$panels = this.element.find('.js-tabs__panel');
		this.$select.on('selectinput', function (el,e) {
			self._update(e);
		});
	},
	setActiveTab: function (value) {
		this.$select.select('setActiveValue', value);
	},
	_update: function (e) {
		let option = this.$select.select('getActiveOption');
		if (option !== undefined) {
			this.$panels.removeClass(this.options.activeClass);
			this.$panels.filter(`[data-js-tabs-panel='${option.value}']`).addClass(this.options.activeClass);
		}
		this._triggerChange(e);
	},
	_triggerChange: function (e) {
		this._trigger('change', null, e);
	},
});
