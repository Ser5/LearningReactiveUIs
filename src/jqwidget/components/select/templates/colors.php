<div class="colors js-select <?=@$p['css']['']?>" data-model='<?=json_encode($data)?>'>
	<div class="colors__selected">
		Выбран: <span class="colors__selected-text js-select__text <?=@$p['css']['text']?>"></span>
	</div>
	<div class="colors__list">
		<?foreach ($data['options'] as $value => $option) {?>
			<label class="colors__label">
				<input class="colors__input js-select__input <?=@$p['css']['input']?>" type="radio" name="<?=$data['inputName']?>" value="<?=$option['value']?>" <?if ($value==$data['value']) echo 'checked'?>>
				<div class="colors__item">
					<div class="colors__image colors__image" style="background:<?=$option['color']?>"></div>
				</div>
			</label>
		<?}?>
	</div>
</div>
