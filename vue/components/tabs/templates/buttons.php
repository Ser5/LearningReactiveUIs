<div class="tabs js-tabs <?=$p['css']['']?>">
	<?Component::show('Select', 'buttons', $data['buttons'], ['css' => [''=>'js-tabs__select']])?>
	<div class="tabs__panels">
		<br>
		<?foreach ($data['panels'] as $value => $panel) {?>
			<div class="tabs__panel js-tabs__panel <?if ($value==$data['buttons']['value']) echo 'tabs__panel_active'?>" data-js-tabs-panel="<?=$value?>">
				<?=$panel['html']?>
			</div>
		<?}?>
	</div>
</div>
