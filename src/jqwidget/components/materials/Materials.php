<?
class Materials extends Base {
	public static function getData ($data) {
		foreach ($data['materials'] as &$material) {
			$material['colors'] = [
				'options'   => [],
				'value'     => $material['refs'][0],
				'inputName' => $data['colors']['inputName'],
			];
			foreach ($material['refs'] as $colorId) {
				$material['colors']['options'][$colorId] = $data['colors']['options'][$colorId];
			}
		}
		unset($material);
		return $data;
	}
}
