<?
require_once __DIR__.'/components/Base.php';
require_once __DIR__.'/components/itemdetail/ItemDetail.php';
require_once __DIR__.'/components/summary/Summary.php';
require_once __DIR__.'/components/materials/Materials.php';
require_once __DIR__.'/components/tabs/Tabs.php';
require_once __DIR__.'/components/select/Select.php';
require_once __DIR__.'/components/amount/Amount.php';
require_once __DIR__.'/components/Component.php';

$data = [
	'item' => [
		'id' => 123,
		'materials' => [
			'label' => 'Материал',
			'options' => [
				1 => [
					'label'  => 'Кожа',
					'value'  => 1,
					'colors' => [
						'refs'  => [1, 2, 3],
						'value' => 2,
					],
				],
				2 => [
					'label'  => 'Ткань',
					'value'  => 2,
					'colors' => [
						'refs'  => [4, 5, 6],
						'value' => 5,
					],
				],
			],
			'value'     => 1,
			'inputName' => 'material',
		],
		'colors' => [
			'label' => 'Цвет седушки',
			'options' => [
				1 => ['value' => 1, 'label' => 'Вася',    'color' => '#fee'],
				2 => ['value' => 2, 'label' => 'Мбука',   'color' => '#644'],
				3 => ['value' => 3, 'label' => 'Ляо',     'color' => '#eec'],
				4 => ['value' => 4, 'label' => 'Красный', 'color' => 'red'],
				5 => ['value' => 5, 'label' => 'Зелёный', 'color' => 'green'],
				6 => ['value' => 6, 'label' => 'Синий',   'color' => 'blue'],
			],
			'value' => 2,
			'inputName' => 'back_color',
		],
		'backColors' => [
			'label' => 'Цвет спинки',
			'options' => [
				7 => ['value' => 7, 'label' => 'Белый',  'color' => '#eee'],
				8 => ['value' => 8, 'label' => 'Чёрный', 'color' => '#444'],
			],
			'value' => 7,
			'inputName' => 'back_color',
		],
		'count' => [
			'value'     => 1,
			'inputName' => 'count',
		],
		'prices' => [
			'1' => 1000,
			'2' => 700,
		],
	],
];

require __DIR__.'/template.php';
