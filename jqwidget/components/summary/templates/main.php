<table class="summary js-summary <?=$p['css']['']?>">
	<?foreach ($data as $e) {?>
		<tr><td><?=$e['term']?></td><td data-js-summary-item-def="<?=$e['name']?>"><?=$e['def']?></td></tr>
	<?}?>
</table>
