<div class="buttons-list js-select <?=$p['css']['']?>" data-model='<?=json_encode($data)?>'>
	<?foreach ($data['options'] as $value => $option) {?>
		<label>
			<input class="hidden js-select__input" type="radio" name="<?=$data['inputName']?>" value="<?=$value?>" <?if ($value==$data['value']) echo 'checked'?>>
			<div class="button button_switch buttons-list__item"><?=$option['label']?></div>
		</label>
	<?}?>
</div>
