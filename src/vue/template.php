<!DOCTYPE html>
<html lang="ru">
<head>
	<meta charset="UTF-8">
	<title>Item</title>
	<script src="/js/libs/vue.js"></script>
	<link rel="stylesheet" href="/styles/styles.css">
</head>
<body>

<script>
let state = <?=json_encode($data)?>;
state.events = new Vue();



//Присовываем свойства и методы корзине
Object.assign(state.basket, {
	isInBasket (key) {
		return !!this.items[key];
	},
	add (key, data) {
		if (!this.isInBasket(key)) {
			Vue.set(this.items, key, data);
		}
	},
	remove (key) {
		Vue.delete(this.items, key)
	},
	getCount (key) {
		return this.isInBasket(key) ? this.items[key].count : 0;
	},
	setCount (key, count) {
		if (this.isInBasket(key)) {
			this.items[key].count = count;
		}
	},
});



//Присовываем свойства и методы товарам
let itemsToProcess = {[state.item.id]:state.item, ...state.items.list};

for (let itemId in itemsToProcess) {
	let item        = itemsToProcess[itemId];
	item.itemEvents = new Vue();
	item.basket     = state.basket;
	Object.defineProperty(item, 'activeMaterial',  {get: function () { return this.materials.options[this.materials.value] }});
	Object.defineProperty(item, 'activeColor',     {get: function () { return this.activeMaterial.colors.options[this.activeMaterial.colors.value] }});
	Object.defineProperty(item, 'activeBackColor', {get: function () { return this.backColors.options[this.backColors.value] }});
	Object.defineProperty(item, 'summaryEntriesList', {
		get: function () {
			return [
				{term: this.materials.label,  def: this.activeMaterial.label},
				{term: this.colors.label,     def: this.activeColor.label},
				{term: this.backColors.label, def: this.activeBackColor.label},
			];
		},
	});
	Object.defineProperty(item, 'price',      {get: function () { return this.prices[this.activeMaterial.value] }});
	Object.defineProperty(item, 'totalPrice', {get: function () { return this.price * this.count.value }});
	Object.defineProperty(item, 'mainPrice',  {get: function () { return Object.values(this.prices)[0] }});
	Object.defineProperty(item, 'basketKey',  {
		get: function () {
			return `${this.id}:${this.activeMaterial.value}:${this.activeColor.value}:${this.activeBackColor.value}`;
		}},
	);
	Object.defineProperty(item, 'isInBasket', {
		get: function () {
			return this.basket.isInBasket(this.basketKey);
		}},
	);
	Object.assign(item, {
		_countFromBasketToLocal () {
			this.count.value = this.basket.getCount(this.basketKey) || 1;
		},
		_countFromLocalToBasket () {
			this.basket.setCount(this.basketKey, this.count.value);
		},
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
		},
	});
	item._countFromBasketToLocal();
	item.itemEvents.$on('select_change', () => item._countFromBasketToLocal() );
	item.itemEvents.$on('amount_change', () => item._countFromLocalToBasket() );
}



//Присовываем списку товаров
Object.assign(state.items, {
	popupItem (id) {
		state.itemPopup.itemId = id;
		state.events.$emit('item_popup');
	},
});



//Присовываем попапу
Object.defineProperty(state.itemPopup, 'item', {get: function () { return state.items.list[this.itemId] }});
Object.assign(state.itemPopup, {
	show () {
		this.isShow = true;
	},
	hide () {
		this.isShow = false;
	},
});
state.events.$on('item_popup', () => state.itemPopup.show());
</script>

<div id="app">
	<c-basket></c-basket>
	<c-item v-bind:data="state.item"></c-item>

	<br><br>
	<c-items v-bind:data="state.items"></c-items>

	<c-popup></c-popup>
</div>
<br><br><br><br><br>

<script src="/js/js.js"></script>

</body>
</html>
