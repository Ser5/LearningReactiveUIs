<?
$panels = [];
foreach ($data['materials']['options'] as $value => $material) {
	ob_start()?>
	<div><b>Цвет седушки</b></div>
	<?Component::show('Select', 'colors', $material['colors'])?>
	<?$panels[$value] = ['html' => ob_get_clean()];
}?>

<?
Component::show(
	'Tabs',
	'buttons',
	[
		'buttons'  => $data,
		'panels'   => $panels,
	],
	$p
);
