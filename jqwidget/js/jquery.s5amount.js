$.widget('s5.amount', {
	_create: function () {
		this.$minus = this.element.find('.js-amount__minus');
		this.$plus  = this.element.find('.js-amount__plus');
		this.$input = this.element.find('.js-amount__input');
		this.model  = $.parseJSON(this.element.attr('data-model'));
		this.$minus.click(() => this.minus());
		this.$plus.click(() => this.plus());
	},
	_init: function () {
		this._update();
	},
	getValue: function (value) {
		return this.model.value;
	},
	minus: function () {
		if (this.model.value > 1) {
			this.model.value--;
		}
		this._update();
		this._triggerInput();
	},
	plus: function () {
		if (this.model.value < 100) {
			this.model.value++;
		}
		this._update();
		this._triggerInput();
	},
	_update: function () {
		this.$input.val(this.model.value);
	},
	_triggerInput: function () {
		return this._trigger('input', null, {name:this.model.inputName, value:this.model.value});
	},
});
