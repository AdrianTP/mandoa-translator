<?php $root = $_SERVER["DOCUMENT_ROOT"]; ?>
<?php require_once $root . "/assets/php/search.php"; ?>

<?php if (array_key_exists("mode", $params) && $params["mode"] == "HTML") { ?>
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
    <meta name="description" content="Description goes here!" />
    <meta name="keywords" content="keywords, go, here" />
    <meta name="author" content="Adrian Thomas-Prestemon" />
    <meta name="viewport" content="initial-scale=1.0,minimum-scale=1.0,maximum-scale=1.0,width=device-width" />
    <title>Mandoa.Org | Learn Mando'a</title>
    <link rel="stylesheet" href="/assets/css/style.css" />
	<script src="/assets/js/ga.js"></script>
</head>

<body>
<div id="content">
	<form id="translator" name="translator" action="./" method="post">
		<fieldset>
			<input type="text" id="query" name="query"<?php if (array_key_exists("query", $params)) { ?> value="<?php print $params["query"]; ?>"<?php } ?> />
			
			<div class="in-form"><input type="submit" id="submit" value="Search" /></div>
			
			<input type="radio" id="type-mandoa" name="type" value="mandoa"<?php if(array_key_exists("type", $params) && $params["type"] == "mandoa") { ?> checked="checked"<?php } ?> /><label for="type-mandoa">Mando'a Search</label>
			<input type="radio" id="type-english" name="type" value="english" <?php if((array_key_exists("type", $params) && $params["type"] == "english") || !array_key_exists("type", $params)) { ?> checked="checked"<?php } ?> /><label for="type-english">English Search</label>
			<input type="hidden" id="mode" name="mode" value="HTML" />
		</fieldset>
	</form>

	<div id="resultsContainer">
		<?php if (!empty($output)) { ?>
		<table>
			<thead>
				<tr>
					<th class="col1">Mando'a</th>
					<th class="col2">Pronunciation</th>
					<th class="col3">English</th>
				</tr>
			</thead>
			<tbody>
			<?php foreach ($output as $row) { ?>
				<tr data-id="<?php print $row["ID"]; ?>" id="row<?php print $row["ID"]; ?>">
					<td class="col1"><?php print $row["mandoa"]; ?></td>
					<td class="col2"><?php print $row["pronunciation"]; ?></td>
					<td class="col3"><?php print $row["english"]; ?></td>
				</tr>
			<?php } ?>
			</tbody>
		</table>
		<?php } else { ?>
			<div class="no-results">
				<span>No Results found.</span>
			</div>
		<?php } ?>
	</div>
</div>
</body>

</html>

<?php 
} else {
	if (!empty($output)) {
		print json_encode($output);
	} else {
		print "[]";
	}
}

 ?>