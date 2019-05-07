class Basket {
	constructor ({basket}) {
		Object.assign(this, basket);
	}
	isInBasket (key) {
		return !!this.items[key];
	}
	add (key, data) {
		if (!this.isInBasket(key)) {
			Vue.set(this.items, key, data);
		}
	}
	remove (key) {
		Vue.delete(this.items, key)
	}
	getCount (key) {
		return this.isInBasket(key) ? this.items[key].count : 0;
	}
	setCount (key, count) {
		if (this.isInBasket(key)) {
			this.items[key].count = count;
		}
	}
}



class Select {
	constructor ({select, itemEvents}) {
		Object.assign(this, select);
		this.itemEvents = itemEvents;
	}

	get activeOption () { return this.options[this.value] }

	isActiveOption (option) {
		return option.value == this.activeOption.value;
	}
	setValue (value) {
		this.value = value;
		this.itemEvents.$emit('select_change');
	}
}



class Materials extends Select {
	constructor ({select, itemEvents}) {
		super({select, itemEvents});
		for (let a in this.options) {
			this.options[a].colors = new Colors({select: this.options[a].colors, itemEvents});
		}
	}
}



class Colors extends Select {
}



class Count {
	constructor ({count, itemEvents}) {
		Object.assign(this, count);
		this.itemEvents = itemEvents;
	}
	decrementCount () {
		if (this.value > 1) {
			this.value--;
		}
		this.itemEvents.$emit('count_change');
	}
	incrementCount () {
		if (this.value < 10) {
			this.value++;
		}
		this.itemEvents.$emit('count_change');
	}
}



class Item {
	constructor ({item, basket}) {
		Object.assign(this, item);
		this.itemEvents = new Vue();
		this.basket     = basket;
		this.materials  = new Materials({select: this.materials,  itemEvents: this.itemEvents});
		this.backColors = new Colors(   {select: this.backColors, itemEvents: this.itemEvents});
		this.count      = new Count(    {count:  this.count,      itemEvents: this.itemEvents});
		this._countFromBasketToLocal();
		this.itemEvents.$on('select_change', () => this._countFromBasketToLocal() );
		this.itemEvents.$on('count_change',  () => this._countFromLocalToBasket() );
	}

	get activeMaterial     () { return this.materials.options[this.materials.value] }
	get activeColor        () { return this.activeMaterial.colors.options[this.activeMaterial.colors.value] }
	get activeBackColor    () { return this.backColors.options[this.backColors.value] }
	get summaryEntriesList () {
		return [
			{term: this.materials.label,  def: this.activeMaterial.label},
			{term: this.colors.label,     def: this.activeColor.label},
			{term: this.backColors.label, def: this.activeBackColor.label},
		];
	};
	get price      () { return this.prices[this.activeMaterial.value] }
	get totalPrice () { return this.price * this.count.value }
	get mainPrice  () { return Object.values(this.prices)[0] }
	get basketKey  () { return `${this.id}:${this.activeMaterial.value}:${this.activeColor.value}:${this.activeBackColor.value}` }
	get isInBasket () { return this.basket.isInBasket(this.basketKey) }

	_countFromBasketToLocal () {
		this.count.value = this.basket.getCount(this.basketKey) || 1;
	}
	_countFromLocalToBasket () {
		this.basket.setCount(this.basketKey, this.count.value);
	}
	buy () {
		if (!this.isInBasket) {
			let basketData = {
				item:      this.name,
				material:  this.activeMaterial.label,
				color:     this.activeColor.label,
				backColor: this.activeBackColor.label,
				count:     this.count.value,
			};
			this.basket.add(this.basketKey, basketData);
		}
	}
}



class Items {
	constructor ({items, basket, itemPopup, pageEvents}) {
		Object.assign(this, items);
		this.itemPopup  = itemPopup;
		this.pageEvents = pageEvents;
		for (let itemId in this.list) {
			this.list[itemId] = new Item({item: this.list[itemId], basket});
		}
	}
	popupItem (id) {
		this.itemPopup.itemId = id;
		this.pageEvents.$emit('item_popup');
	}
}



class ItemPopup {
	constructor ({itemPopup, itemsList, pageEvents}) {
		Object.assign(this, itemPopup);
		this.itemsList  = itemsList;
		this.pageEvents = pageEvents;
		this.pageEvents.$on('item_popup', () => this.show());
	}
	get item () {
		return this.itemsList[this.itemId];
	}
	show () {
		this.isShow = true;
	}
	hide () {
		this.isShow = false;
	}
}



class State {
	constructor ({state}) {
		Object.assign(this, state);
		let itemsList   = this.items.list;
		this.pageEvents = new Vue();
		this.basket = new Basket({
			basket: this.basket,
		});
		this.item = new Item({
			item:   this.item,
			basket: this.basket,
		});
		this.itemPopup  = new ItemPopup({
			itemPopup:  this.itemPopup,
			pageEvents: this.pageEvents,
			itemsList,
		});
		this.items = new Items({
			items:      this.items,
			basket:     this.basket,
			itemPopup:  this.itemPopup,
			pageEvents: this.pageEvents,
		});
	}
}



state = new State({state});



Vue.component('c-basket', {
	data () {return {
		data: state.basket,
	}},
	template: `
<div class="basket">
	<div class="basket__item" v-for="(e,key) in data.items">
		<div class="basket__delete" @click="data.remove(key)">&times;</div>
		<div class="basket__name">{{ e.item }}, {{ e.material }}, {{ e.color }}, {{ e.backColor }}:</div>
		<div class="basket__count">{{ e.count }}</div>
	</div>
</div>
`
});



Vue.component('c-select-buttons', {
	props: {data: Object},
	template: `
<div class="tabs">
	<div class="item-detail__section">
		<div class="buttons-list">
			<label v-for="material in data.options">
				<input class="hidden" type="radio" :name="data.inputName" :value="material.value" :checked="data.isActiveOption(material)" @click="data.setValue(material.value)">
				<div class="button button_switch buttons-list__item">{{ material.label }}</div>
			</label>
		</div>
	</div>
	<div class="tabs__panels">
		<div v-for="material in data.options" :key="material.value" :class="{'tabs__panel':true, 'tabs__panel_active':data.isActiveOption(material)}">
			<div class="item-detail__section-title">{{ material.colors.label }}:</div>
			<c-select-colors :data="material.colors"></c-select-colors>
		</div>
	</div>
</div>
`,
});



Vue.component('c-select-colors', {
	props: {data: Object},
	template: `
<div class="colors">
	<div class="colors__selected">
		Выбран: <span class="colors__selected-text">{{ data.activeOption.label }}</span>
	</div>
	<div class="colors__list">
		<label class="colors__label" v-for="color in data.options">
			<input class="colors__input" type="radio" :name="data.inputName" :value="color.value" :checked="data.isActiveOption(color)" @click="data.setValue(color.value)">
			<div class="colors__item">
				<div class="colors__image colors__image" :style="{background:color.color}"></div>
			</div>
		</label>
	</div>
</div>
`,
});



Vue.component('c-summary', {
	props: {data: Array},
	template: `
<table class="summary">
	<tr v-for="e of data">
		<td>{{ e.term }}</td><td>{{ e.def }}</td>
	</tr>
</table>
`
});



Vue.component('c-count', {
	props: {data: Object},
	template: `
<div class="count">
	<div class="count__button count__button_m" @click="data.decrementCount()">&minus;</div>
	<input class="count__input js-count__input" type="text" :name="data.inputName" :value="data.value" readonly>
	<div class="count__button count__button_p" @click="data.incrementCount()">+</div>
</div>
`
});



Vue.component('c-item', {
	props: {data: Object},
	template: `
<div class="item-detail">
	<div class="item-detail__section">
		<div class="item-detail__name">{{ data.name }}</div>
	</div>
	<div class="item-detail__not-name">
		<div class="item-detail__image" v-html="data.image"></div>
		<div class="item-detail__data">
			<div class="item-detail__section">
				<div class="item-detail__section-title">{{ data.materials.label }}:</div>
				<c-select-buttons :data="data.materials"></c-select-buttons>
			</div>
			<div class="item-detail__section">
				<div class="item-detail__section-title">{{ data.backColors.label }}:</div>
				<c-select-colors :data="data.backColors"></c-select-colors>
			</div>
			<div class="item-detail__buy-block">
				<div>
					<div class="item-detail__section-title">Выбрано:</div>
					<c-summary :data="data.summaryEntriesList"></c-summary>
				</div>
				<div>
					<div class="item-detail__section">
						<div class="price">
							<span class="price__value">{{ data.totalPrice }}</span>
							<span class="price__currency">wtf</span>
						</div>
					</div>
					<div class="item-detail__count-buy">
						<c-count :data="data.count"></c-count>
						<div :class="{button:true, button_buy:true, button_bought:data.isInBasket}" @click="data.buy()">{{ !data.isInBasket ? 'В корзину' : 'В корзине'}}</div>
					</div>
				</div>
			</div>
		</div>
	</div>
</div>
`
});



Vue.component('c-items', {
	props: {data: Object},
	template: `
<div>
	<div class="items-list-name">Другие товары</div>
	<div class="items-list">
		<div class="items-list__item" v-for="item in data.list" @click="data.popupItem(item.id)">
			<div class="items-list__item-section items-list__item-image" v-html="item.image"></div>
			<div class="items-list__item-section items-list__item-name">{{ item.name }}</div>
			<div class="items-list__item-section items-list__item-price">
				<div class="price">
					<span class="price__value">{{ item.mainPrice }}</span>
					<span class="price__currency">wtf</span>
				</div>
			</div>
		</div>
	</div>
</div>
`,
});



Vue.component('c-popup', {
	data () {return {
		data: state.itemPopup,
	}},
	template: `
<div class="popup" v-if="data.isShow">
	<div class="popup__bg" @click="data.hide()">
		<div class="popup__window" @click.stop>
			<div class="popup__content">
				<c-item :data="data.item"></c-item>
			</div>
		</div>
	</div>
</div>
`
});



let vue = new Vue({
	el:'#app',
	data: {
		state: state,
	}
});
