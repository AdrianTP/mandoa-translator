<?php
// Get the list of pages from the server
// For now this is a static JSON file; someday it might maybe be a database call
 ?>

<?php function printNavigation($pages) { ?>
	<nav>
		<h2>Navigation</h2>
		<ul>
			<?php foreach($pages as $page) {
				if (array_key_exists("publish", $page) && $page["publish"]) {
					$state = ($page["active"]) ? ' class="active"' : "";
					$ga = "onclick=\"_gaq.push(['_trackEvent', '" . $page["display"] . "', 'clicked']);\""; ?>
					<li<?php echo $state; ?>><a href="<?php echo $page["href"]; ?>" target="<?php echo $page["target"] ?>" <?php echo $ga; ?>><?php echo $page["display"]; ?></a></li>
				<?php }
			} ?>
		</ul>
	</nav>
<?php } ?>