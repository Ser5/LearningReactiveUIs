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

let itemsToProcess = {...{[state.item.id]:state.item}, ...state.itemsList};

for (let itemId in itemsToProcess) {
	let item = itemsToProcess[itemId];
	item.itemEvents = new Vue();
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
			return !!state.basket[this.basketKey];
		}},
	);
}

Object.defineProperty(state.itemPopup, 'item', {get: function () { return state.itemsList[this.itemId] }});

state.events = new Vue();
</script>

<div id="app">
	<c-basket></c-basket>
	<c-item v-bind:data="state.item"></c-item>

	<br><br>
	<c-items v-bind:list="state.itemsList"></c-items>

	<c-popup></c-popup>
</div>
<br><br><br><br><br>

<script src="/js/js.js"></script>

</body>
</html>
