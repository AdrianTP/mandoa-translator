<?php 

require_once $_SERVER["DOCUMENT_ROOT"] . "/assets/components/views.php";
$bag = new ViewBag;

require_once $bag->root . $bag->comp . "header.php";
require_once $bag->root . $bag->comp . "navigation.php";
require_once $bag->root . $bag->comp . "body.php";
require_once $bag->root . $bag->comp . "footer.php";
 ?>
<!DOCTYPE html>
<!--[if lt IE 7 ]> <html lang="en" class="ie6 old-ie"> <![endif]-->
<!--[if IE 7 ]>    <html lang="en" class="ie7 old-ie"> <![endif]-->
<!--[if IE 8 ]>    <html lang="en" class="ie8 old-ie"> <![endif]-->
<!--[if IE 9 ]>    <html lang="en" class="ie9">        <![endif]-->
<!--[if (gt IE 9)|!(IE)]><!-->
<html lang="en"> 
<!--<![endif]-->	

<head>
    <meta charset='utf-8' />
    <meta http-equiv="X-UA-Compatible" content="IE=edge" />
    <meta name="description" content="<?php echo $bag->currentPage["description"]; ?>" />
    <meta name="keywords" content="<?php echo $bag->currentPage["keywords"]; ?>" />
    <meta name="author" content="Adrian Thomas-Prestemon" />
    <meta name="viewport" content="initial-scale=1.0,minimum-scale=1.0,maximum-scale=1.0,width=device-width" />
	<link rel="shortcut icon" href="/favicon.ico" type="image/x-icon">
	<link rel="icon" href="/favicon.ico" type="image/x-icon">
    <title><?php echo ucwords($bag->currentPage["title"]); ?></title>
    <link rel="stylesheet" href="<?=$bag->vers($bag->css . "style.css");?>" />
	<link rel="stylesheet" href="<?=$bag->vers($bag->css . "fonts.css");?>" />
	<link rel="stylesheet" href="<?=$bag->vers($bag->css . "toggle-switch.css");?>" />
	<?php echo $bag->getStyles(); ?>
	<script src="<?=$bag->vers($bag->js . "ga.js");?>"></script>
	<!--[if lt IE 9 ]>
	<script src="<?=$bag->vers($bag->js . "html5shiv.js");?>"></script>
	<script src="<?=$bag->vers($bag->js . "querySelector.min.js");?>"></script>
	<script src="<?=$bag->vers($bag->js . "json2.js");?>"></script>
	<script src="<?=$bag->vers($bag->js . "indexOf.js");?>"></script>
	<![endif]-->
</head>

<body>
<div class="wrapper">
	<?php printNavigation($bag->allPages); ?>
	<div class="body-wrapper">
		<ul class="infobar">
			<noscript><li class="error message clearfix">
				<span>Many of the features on this site will not function without JavaScript. Please either <a href="http://www.enable-javascript.com/" target="_blank">enable JavaScript</a> or try the <a href="/minimal" target="_parent">minimal JavaScript-optional translator</a>. Thank you.</span><button class="close">&times;</button>
			</li></noscript>
			<!--[if lt IE 8 ]><li class="info message clearfix">
				<span>No testing was performed for your browser. We cannot guarantee this website will function correctly. We recommend using a <a href="http://www.whatbrowser.org" target="_blank">modern web browser</a>. If you do not wish to update your browser and you experience any problems with this site, please try the <a href="/minimal" target="_parent">minimal JavaScript-optional translator</a>.</span><button class="close">&times;</button>
			</li><![endif]-->
			<?php /*<li class="warning message">Warning</li>
			<li class="info message">Message</li>*/ ?>
		</ul>
		<?php printHeader(); ?>
		<div class="content-wrapper"><?php printBody($bag->currentPage); ?></div>
		<?php printFooter(); ?>
		<!--<div id="overlay">&nbsp;</div>-->
	</div>
</div>
<script src="<?=$bag->vers($bag->js . "XMLHttpRequest.js");?>"></script>
<script src="<?=$bag->vers($bag->js . "util.js");?>"></script>
<script src="<?=$bag->vers($bag->js . "menu.js");?>"></script>
<?php echo $bag->getScripts(); ?>
</body>

</html>