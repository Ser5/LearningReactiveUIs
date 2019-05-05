<!DOCTYPE html>
<html lang="ru">
<head>
	<meta charset="UTF-8">
	<title>Item</title>
	<script src="/js/libs/jquery-3.3.1.min.js"></script>
	<script src="/js/libs/jquery-ui.min.js"></script>
	<script src="/js/jquery.s5select.js"></script>
	<script src="/js/jquery.s5tabs.js"></script>
	<script src="/js/jquery.s5itemdetail.js"></script>
	<script src="/js/jquery.s5summary.js"></script>
	<script src="/js/jquery.s5amount.js"></script>
	<link rel="stylesheet" href="/styles/styles.css">
</head>
<body>

<?Component::show('ItemDetail', 'main', $data)?>

<?//Component::show('Select', 'colors', $data['item']['backColors'], ['css' => [''=>'_root', 'text'=>'_text', 'input'=>'_input']])?>

<br><br>
<div class="ctree"></div>
<br><br>

<script src="/js/js.js"></script>

</body>
</html>
