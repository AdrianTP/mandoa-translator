<?php 
class ViewBag {
	
	public $allPages;
	public $currentPage;
	public $root;
	public $css;
	public $js;
	public $comp;
	
	public function __construct() {
		$this->allPages = json_decode(file_get_contents($_SERVER["DOCUMENT_ROOT"] . "/assets/pages/pages.json"), true);
		$this->currentPage = $this->getCurrentPage((array_key_exists("page", $_REQUEST)) ? $_REQUEST["page"] : "");
		$this->root = $_SERVER["DOCUMENT_ROOT"];
		$this->css = "/assets/css/";
		$this->js = "/assets/js/";
		$this->comp = "/assets/components/";
	}
	
	public function vers($file) {
		if (strpos($file, "/") !== 0 || !file_exists($this->root . $file)) {
			return $file;
		}
		$mtime = filemtime($this->root . $file);
		return preg_replace('{\\.([^./]+)$}', ".$mtime.\$1", $file);
	}
	
	public function pageExists($name) {
		foreach ($this->allPages as $page) {
			if (array_key_exists("page", $page) && $page["page"] == $name) {
				return true;
			}
		}
		return false;
	}
	
	public function getScripts() {
		$output = "";
		foreach($this->currentPage["scripts"] as $script) {
			$vers = $this->vers($script);
			$output .= "<script src=\"$vers\"></script>\r\n";
		}
		return $output;
	}
	
	public function getStyles() {
		$output = "";
		foreach($this->currentPage["styles"] as $style) {
			$vers = $this->vers($style);
			$output .= "<link rel=\"stylesheet\" href=\"$vers\" />";
		}
		return $output;
	}
	
	private function getCurrentPage($page) {
		$output = $this->allPages[0]; // if page request var is not set or is not present in the list, return the first page by default
		
		if (isset($page) && $this->pageExists($page)) {
			for ($i = 0; $i < count($this->allPages); $i ++) {
				$this->allPages[$i]["active"] = false; // reset all pages to inactive state
				if (array_key_exists("page", $this->allPages[$i]) && $this->allPages[$i]["page"] == $page) {
					$this->allPages[$i]["active"] = true; // set the current page "active" state to true
					$output = $this->allPages[$i]; // if the page request var is set and is present in the list, return it
				}
			}
		}
		return $output;
	}
}
 ?>