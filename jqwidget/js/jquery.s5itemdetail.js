$.widget('s5.itemdetail', {
	_create: function () {
		this.$materials  = this.element.find('.js-item-detail__materials');
		this.$backColors = this.element.find('.js-item-detail__back-colors');
		this.$summary    = this.element.find('.js-item-detail__summary');
		this.$count      = this.element.find('.js-item-detail__count');
		this.$totalPrice = this.element.find('.js-item-detail__total-price');
		this.$buy        = this.element.find('.js-item-detail__buy');

		this.model = $.parseJSON(this.element.attr('data-model'));

		this.model.colors = {};

		for (let mx in this.model.materials.options) {
			let material = this.materials[mx];
			for (let cx in material.colors.options) {
				this.model.colors[cx] = material.colors.options[cx];
			}
		}

		Object.defineProperty(this, 'price', {
			get: function () { return this.model.prices[this.model.materials.value]; }
		});
		Object.defineProperty(this, 'totalPrice', {
			get: function () { return this.price * this.count.value; }
		});


		this.$materials.on('tabschange',   (el,p) => this.setMaterial(p.option.value));
		this.$backColors.on('selectinput', (el,p) => {this.$summary.summary('setDefinition', {term: p.name, def: p.option.label})});
		this.$count.on('amountinput', (el,p) => this.setCount(p.value));
		this.$buy.on('click', () => this._buy());
	},
	setMaterial: function (value) {
		this.model.materials.value = value;
		this._update();
	},
	setColor: function (value) {
		this.model.colors.value = value;
		this._update();
	},
	setBackColor: function (value) {
		this.model.backColors.value = value;
		this._update();
	},
	setCount: function (value) {
		this.count.value = value;
		this._update();
	},
	_update: function () {
		for (let key of ['materials', 'colors', 'backColors']) {
			let param  = this.model[key];
			let option = param.options[param.value];
			this.$summary.summary('setDefinition', {term: param.inputName, def: option.label});
		}
		this.$totalPrice.html(this.totalPrice);
	},
	_buy: function () {
		alert('Чёт купил');
	},
});
