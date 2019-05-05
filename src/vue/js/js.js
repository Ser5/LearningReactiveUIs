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



let cSelectBase = {
	props: {
		data:       Object,
		itemEvents: Object,
	},
	computed: {
		activeOption () { return this.data.options[this.data.value]; },
	},
	methods: {
		isActiveOption (option) { return option.value == this.activeOption.value; },
		setValue (value) {
			this.data.value = value;
			this.itemEvents.$emit('select_change');
		},
	},
};



Vue.component('c-select-buttons', {
	mixins: [cSelectBase],
	template: `
<div class="tabs">
	<div class="item-detail__section">
		<div class="buttons-list">
			<label v-for="material in data.options">
				<input class="hidden" type="radio" :name="data.inputName" :value="material.value" :checked="isActiveOption(material)" @click="setValue(material.value)">
				<div class="button button_switch buttons-list__item">{{ material.label }}</div>
			</label>
		</div>
	</div>
	<div class="tabs__panels">
		<div v-for="material in data.options" v-bind:key="material.value" :class="{'tabs__panel':true, 'tabs__panel_active':isActiveOption(material)}">
			<div class="item-detail__section-title">{{ material.colors.label }}:</div>
			<c-select-colors v-bind:data="material.colors" v-bind:itemEvents="itemEvents"></c-select-colors>
		</div>
	</div>
</div>
`,
});



Vue.component('c-select-colors', {
	mixins: [cSelectBase],
	template: `
<div class="colors">
	<div class="colors__selected">
		Выбран: <span class="colors__selected-text">{{ activeOption.label }}</span>
	</div>
	<div class="colors__list">
		<label class="colors__label" v-for="color in data.options">
			<input class="colors__input" type="radio" :name="data.inputName" :value="color.value" :checked="color.value == activeOption.value" @click="setValue(color.value)">
			<div class="colors__item">
				<div class="colors__image colors__image" :style="{background:color.color}"></div>
			</div>
		</label>
	</div>
</div>
`,
});



Vue.component('c-summary', {
	props: {
		data: Array,
	},
	template: `
<table class="summary">
	<tr v-for="e of data">
		<td>{{ e.term }}</td><td>{{ e.def }}</td>
	</tr>
</table>
`
});



Vue.component('c-amount', {
	props: {
		data:       Object,
		itemEvents: Object,
	},
	methods: {
		decrementCount () {
			if (this.data.value > 1) {
				this.data.value--;
			}
			this.itemEvents.$emit('amount_change');
		},
		incrementCount () {
			if (this.data.value < 10) {
				this.data.value++;
			}
			this.itemEvents.$emit('amount_change');
		},
	},
	template: `
<div class="amount">
	<div class="amount__button amount__button_m" @click="decrementCount()">&minus;</div>
	<input class="amount__input js-amount__input" type="text" :name="data.inputName" :value="data.value" readonly>
	<div class="amount__button amount__button_p" @click="incrementCount()">+</div>
</div>
`
});



Vue.component('c-item', {
	props: {
		data: Object,
	},
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
				<c-select-buttons v-bind:data="data.materials" v-bind:itemEvents="data.itemEvents"></c-select-buttons>
			</div>
			<div class="item-detail__section">
				<div class="item-detail__section-title">{{ data.backColors.label }}:</div>
				<c-select-colors v-bind:data="data.backColors" v-bind:itemEvents="data.itemEvents"></c-select-colors>
			</div>
			<div class="item-detail__buy-block">
				<div>
					<div class="item-detail__section-title">Выбрано:</div>
					<c-summary v-bind:data="data.summaryEntriesList"></c-summary>
				</div>
				<div>
					<div class="item-detail__section">
						<div class="price">
							<span class="price__value">{{ data.totalPrice }}</span>
							<span class="price__currency">wtf</span>
						</div>
					</div>
					<div class="item-detail__count-buy">
						<c-amount v-bind:data="data.count" v-bind:itemEvents="data.itemEvents"></c-amount>
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
	props: {
		data: Object,
	},
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
				<c-item v-bind:data="data.item"></c-item>
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
