<?php 
	//
 ?>
<?php function printBody($page) { ?>
<div id="content">
	<?php include_once $_SERVER["DOCUMENT_ROOT"] . "/assets/pages/" . $page["page"] . ".php"; ?>
</div>
<?php } ?>