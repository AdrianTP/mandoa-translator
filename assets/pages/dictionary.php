<?php $root = $_SERVER["DOCUMENT_ROOT"]; ?>
<?php require_once $root . "/assets/php/search.php"; ?>

<form id="translator" name="translator" action="/minimal/" data-action="/assets/php/search_json.php" method="post">
	<fieldset>
		<input type="text" id="query" name="query" />
		
		<noscript class="in-form">
			<input type="hidden" id="mode" name="mode" value="HTML" />
			<input type="submit" id="submit" value="Search" />
		</noscript>
		
		<div class="switch android">
			<input type="radio" id="type-english" name="type" value="english" checked="checked" />
			<label for="type-english" onclick="">English</label>
			
			<input type="radio" id="type-mandoa" name="type" value="mandoa" />
			<label for="type-mandoa" onclick="">Mando'a</label>
			
			<span class="slide-button"></span>
		</div>
		
		<?php /*<input type="radio" id="type-mandoa" name="type" value="mandoa" /><label for="type-mandoa">Mando'a Search</label>
		<input type="radio" id="type-english" name="type" value="english" checked="checked" /><label for="type-english">English Search</label>*/ ?>
		
	</fieldset>
</form>

<div id="resultsContainer">
	<table class="clearfix">
		<thead><tr class="clearfix">
			<th class="col1">Mando'a</th>
			<th class="col2">[Pronunciation]</th>
			<th class="col3">English</th>
		</tr></thead><tbody>
	<?php foreach ($output as $row) { ?>
		<tr data-id="<?php echo $row["ID"]; ?>" id="row<?php echo $row["ID"]; ?>" class="clearfix">
			<td class="col1"><?php //<div class="expand-icon"></div> ?><?php echo $row["mandoa"]; ?></td>
			<td class="col2">[<?php echo $row["pronunciation"]; ?>]</td>
			<td class="col3"><?php echo $row["english"]; ?></td>
		</td>
	<?php } ?></tbody>
	</table>
</div>

<?php //$res->close(); ?>
<?php //$stmt->close(); ?>