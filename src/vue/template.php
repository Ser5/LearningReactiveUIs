<!DOCTYPE html>
<html lang="ru">
<head>
	<meta charset="UTF-8">
	<title>Item</title>
	<script src="/js/libs/vue.js"></script>
	<link rel="stylesheet" href="/styles/styles.css">
</head>
<body>

<div id="app">
	<c-basket></c-basket>
	<c-item :data="state.item"></c-item>

	<br><br>
	<c-items :data="state.items"></c-items>

	<c-popup></c-popup>
</div>
<br><br><br><br><br>

<script>let state = <?=json_encode($data)?></script>
<script src="/js/js.js"></script>

</body>
</html>
