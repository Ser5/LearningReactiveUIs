<?
$data = [
	'basket' => [
		'items' => [
			'1:1:1:7' => ['item'=>'Кресло Басурман',  'material'=>'Кожа',  'color'=>'Вася',    'backColor'=>'Белый',  'count'=>5],
			'1:1:1:8' => ['item'=>'Кресло Басурман',  'material'=>'Кожа',  'color'=>'Вася',    'backColor'=>'Чёрный', 'count'=>6],
			'1:2:4:7' => ['item'=>'Кресло Басурман',  'material'=>'Ткань', 'color'=>'Красный', 'backColor'=>'Белый',  'count'=>7],
			'2:1:1:7' => ['item'=>'Кресло Чингачкук', 'material'=>'Кожа',  'color'=>'Вася',    'backColor'=>'Белый',  'count'=>8],
		],
	],
	'items' => [
		'list' => [
			1 => [
				'id'   => 1,
				'name' => 'Кресло Басурман',
				'prices' => [
					'1' => 1000,
					'2' => 700,
				],
			],
			2 => [
				'id'   => 2,
				'name' => 'Кресло Чингачкук',
				'prices' => [
					'1' => 800,
					'2' => 600,
				],
			],
			3 => [
				'id'   => 3,
				'name' => 'Кресло Блатной',
				'prices' => [
					'1' => 1200,
					'2' => 800,
				],
			],
		],
	],
	'item' => null,
	'itemPopup' => [
		'isShow' => false,
		'itemId' => false,
		'item'   => null,
	],
];

//Данные, общие для всех товаров. Материалы, цвета итд - присутствуют у всех товаров.
$itemBase = [
	'image' => '
		<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 100 100" style="width:100%; height:100%;">
			<polygon points="10,10 20,10 30,45 20,45" stroke-width="0" fill="#333"/>
			<rect x="20" y="45" width="60" height="10" stroke-width="0" fill="#333"/>
			<rect x="45" y="55" width="10" height="30" stroke-width="0" fill="#333"/>
			<rect x="27" y="85" width="46" height="7" stroke-width="0" fill="#333"/>
		</svg>
	',
	'materials' => [
		'label' => 'Материал',
		'options' => [
			1 => [
				'label'  => 'Кожа',
				'value'  => 1,
				'colors' => [
					'refs'  => [1, 2, 3],
					'value' => 1,
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
			2 => ['value' => 2, 'label' => 'Лумумба', 'color' => '#644'],
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
];

//Каждому материалу приделываем соответсвующие ему цвета из общего списка цветов.
//Инпутам цветов назначаем названия, уникальные для каждого материала
foreach ($itemBase['materials']['options'] as $mid => &$material) {
	$material['colors']['inputName'] = "material{$mid}_color";
	$material['colors']['label']     = $itemBase['colors']['label'];
	$material['colors']['options']   = [];
	foreach ($material['colors']['refs'] as $colorId) {
		$material['colors']['options'][$colorId] = $itemBase['colors']['options'][$colorId];
	}
}
unset($material);

//Всем инпутам делаем уникальные названия, учитывающие товар, в котором они находятся.
//Чтобы на одной странице могло выводиться несколько товаров, и названия полей не пересекались.
foreach ($data['items']['list'] as &$item) {
	$item += $itemBase;
	$item['materials']['inputName'] = "item{$item['id']}_{$item['materials']['inputName']}";
	foreach ($item['materials']['options'] as &$material) {
		$material['colors']['inputName'] = "item{$item['id']}_{$material['colors']['inputName']}";
	}
	unset($material);
	$item['backColors']['inputName'] = "item{$item['id']}_{$item['backColors']['inputName']}";
}
unset($item);

//Это товар, отображаемый на детальной странице
$data['item'] = $data['items']['list'][1];
unset($data['items']['list'][1]);
