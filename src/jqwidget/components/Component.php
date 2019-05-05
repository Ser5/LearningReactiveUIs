<?
class Component {
	public static function show ($name, $template, $data = [], $p = []) {
		$data = $name::getData($data);
		require __DIR__.'/'.strtolower($name)."/templates/$template.php";
	}



	public static function getHtml ($name, $template, $data, $p = []) {
		ob_start();
		static::show($name, $template, $data, $p);
		return ob_get_clean();
	}
}
