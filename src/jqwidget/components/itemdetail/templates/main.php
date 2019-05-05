<div class="item-detail js-item-detail" data-model='<?=json_encode($data['item'])?>'>
	<div class="item-detail__section">
		<div class="item-detail__section-title">Материал</div>
		<?Component::show(
			'Materials',
			'main',
			[
				'materials' => $data['item']['materials'],
				'colors'    => $data['item']['colors'],
			],
			['css' => [''=>'js-item-detail__materials']]
		)?>
	</div>

	<div class="item-detail__section">
		<div class="item-detail__section-title">Цвет спинки</div>
		<?Component::show('Select', 'colors', $data['item']['backColors'], ['css' => [''=>'js-item-detail__back-colors']])?>
	</div>

	<div class="item-detail__section">
		<div class="item-detail__section-title">Выбрано</div>
		<?Component::show('Summary', 'main', $data['summaryData'], ['css' => [''=>'js-item-detail__summary']])?>
	</div>

	<div class="item-detail__section">
		<?Component::show('Amount', 'main', $data['item']['count'], ['css' => [''=>'js-item-detail__count']])?>
	</div>

	<div class="item-detail__section">
		<b>Цена:</b>
		<span class="price">
			<span class="price__value js-item-detail__total-price"><?=$data['totalPrice']?></span>
			<span class="price__currency">wtf</span>
		</span>
	</div>

	<div class="item-detail__section">
		<div class="button button_buy js-item-detail__buy">
			В корзину
		</div>
	</div>

</div>
