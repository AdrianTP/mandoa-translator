<?php require_once "./assets/php/search.php"; ?>
<?php if ($params["mode"] == "HTML") { ?>
<!DOCTYPE html>
<!--[if lt IE 7 ]> <html lang="en" class="ie6 old-ie"> <![endif]-->
<!--[if IE 7 ]>    <html lang="en" class="ie7 old-ie"> <![endif]-->
<!--[if IE 8 ]>    <html lang="en" class="ie8 old-ie"> <![endif]-->
<!--[if IE 9 ]>    <html lang="en" class="ie9">        <![endif]-->
<!--[if (gt IE 9)|!(IE)]><!-->
<html lang="en"> 
<!--<![endif]-->

<head>
    <meta charset="utf-8" />
    <meta http-equiv="X-UA-Compatible" content="IE=edge" />
    <meta name="description" content="Description goes here!" />
    <meta name="keywords" content="keywords, go, here" />
    <meta name="author" content="Adrian Thomas-Prestemon" />
    <meta name="viewport" content="initial-scale=1.0,minimum-scale=1.0,maximum-scale=1.0,width=device-width" />
    <title>Mandoa.Org | Dictionary List</title>
    <link rel="stylesheet" href="./assets/css/style.css" />
	<script src="/assets/js/ga.js"></script>
</head>
<body>
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
		<tr data-id="<?php print $row["id"]; ?>" id="<?php print $row["ID"]; ?>">
			<td class="col1"><?php print $row["mandoa"]; ?></td>
			<td class="col2"><?php print $row["pronunciation"]; ?></td>
			<td class="col3"><?php print $row["english"]; ?></td>
		</tr>
	<?php } ?>
	</tbody>
</table>
<?php 
} else {
	if (!empty($output)) {
		print json_encode($output);
	} else {
		"[]";
	}
}


 ?>