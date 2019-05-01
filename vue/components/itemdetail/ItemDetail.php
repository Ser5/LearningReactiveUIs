<?
class ItemDetail extends Base {
	public static function getData ($data) {
		$data['summaryData'] = [];
		$activeMaterialValue = false;
		foreach (['materials','colors','backColors'] as $key) {
			$param                 = $data['item'][$key];
			$option                = $param['options'][$param['value']];
			$data['summaryData'][] = ['name' => $key,   'term' => $param['label'],  'def' => $option['label']];
			if ($key == 'materials') {
				$activeMaterialValue = $option['value'];
			}
		}

		$data['price']      = $data['item']['prices'][$activeMaterialValue];
		$data['totalPrice'] = $data['price'] * $data['item']['count']['value'];

		return $data;
	}
}
