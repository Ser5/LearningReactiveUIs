$.widget('s5.select', {
	_create: function () {
		this.$text   = this.element.find('.js-select__text');
		this.$inputs = this.element.find('.js-select__input');
		if (this.$text.lenght == 0) {
			this.$text = null;
		}
		this.model             = $.parseJSON(this.element.attr('data-model'));
		this.activeValueBackup = this.model.value;
		this.$inputs.click(el => this.setActiveValue(el.target.value));
	},
	_init: function () {
		this._update();
	},
	getOption: function (value) {
		return this.model.options[value];
	},
	getActiveOption: function () {
		return this.model.value ? this.getOption(this.model.value) : undefined;
	},
	setActiveValue: function (value) {
		this._backupActiveValue();
		this.model.value = value;
		let isAllowed = this._triggerInput();
		if (isAllowed) {
			this._update();
		} else {
			this._restoreActiveValue();
		}
		return isAllowed;
	},
	getEvent: function (name) {
		let e;
		switch (name) {
			case 'input': e = {name:this.model.inputName, option:this.getActiveOption()}; break;
		}
		return e;
	},
	_backupActiveValue: function () {
		this.activeValueBackup = this.model.value;
	},
	_restoreActiveValue: function () {
		this.model.value = this.activeValueBackup;
	},
	_update: function () {
		let option = this.getActiveOption();
		if (option !== undefined) {
			this.$inputs.filter(`[value=${option.value}]`).prop('checked',true);
			if (this.$text) {
				this.$text.html(option.label);
			}
		}
	},
	_triggerInput: function () {
		return this._trigger('input', null, this.getEvent('input'));
	},
});
