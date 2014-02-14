<?php 

$c = array("00", "33", "66", "99", "CC", "FF");

$backgroundOptions = "";

for ($i = 0; $i < count($c); $i ++) {
	for ($j = 0; $j < count($c); $j ++) {
		for ($k = 0; $k < count($c); $k ++) {
			$selected = ($i == 0 && $j == 0 && $k == 0) ? " selected=\"selected\"" : "";
			$hex = "#" . $c[$i] . $c[$j] . $c[$k];
			$backgroundOptions .= "<option$selected value=\"$hex\" style=\"background-color: $hex;\">$hex</option>\r\n";
			if ($i < count($c) - 1 || $j < count($c) - 1 || $k < count($c) - 1) {
				$backgroundOptions .= "\t\t\t";
			}
		}
	}
}

$textOptions = "";

for ($i = count($c) - 1; $i >= 0; $i --) {
	for ($j = count($c) - 1; $j >= 0; $j --) {
		for ($k = count($c) - 1; $k >= 0; $k --) {
			$selected = ($i == count($c) && $j == count($c) && $k == count($c)) ? " selected=\"selected\"" : "";
			$hex = "#" . $c[$i] . $c[$j] . $c[$k];
			$textOptions .= "<option$selected value=\"$hex\" style=\"color: $hex;\">$hex</option>\r\n";
			if ($i > 0 || $j > 0 || $k > 0) {
				$textOptions .= "\t\t\t";
			}
		}
	}
}

 ?>

<form id="transcriber" name="transcriber" action="#">
	<fieldset>
		<?php //<legend>Transcriber</legend> ?>
		<ul class="responsive-form">
			<li>
				<div class="field"><div id="text">
						<textarea id="auto-text" name="auto-text" class="transcription">Ba'jur bal beskar'gam,
Ara'nov, aliit,
Mando'a bal Mand'alor—
An vencuyan mhi.</textarea>
				</div></div>
			</li>
		</ul>
		<ul class="responsive-form">
			<li>
				<div class="field"><div id="font" class="hidden">
						<label for="text-font">Font: </label>
						<select id="text-font" name="text-font" data-property="fontFamily">
							<option value="MandalorianNew" selected="selected">Mandalorian New</option>
							<option value="MandalorianOld">Mandalorian Old</option>
						</select>
				</div></div>
			</li>
		</ul>
		<ul class="responsive-form">
			<li>
				<div class="field">
					<button id="configure" name="configure" class="hidden" onclick="_gaq.push(['_trackEvent', 'configure button', 'clicked']);">Make Transcription Content Read-Only and Prepare for Export</button>
				</div>
			</li>
		</ul>
	</fieldset>

	<fieldset id="exporter" class="hidden">
		<?php //<legend>Exporter</legend> ?>
		<ul class="responsive-form">
			<li>
				<div class="field">
					<label for="canvas-width">Width: </label><input id="canvas-width" name="canvas-width" data-property="width" data-unit="px" type="number" min="100" max="800" step="1" value="600" />
				</div>
				<div class="field">
					<label for="canvas-height">Height: </label><input id="canvas-height" name="canvas-height" data-property="height" data-unit="px" type="number" min="100" max="600" step="1" value="200" />
				</div>
				<div class="field">
					<label for="canvas-padding">Padding: </label><input id="canvas-padding" name="canvas-padding" data-property="padding" data-unit="px" type="number" min="0" max="50" step="1" value="0" />
				</div>
				<div class="field">
					<label for="canvas-background">Background: </label>
					<select id="canvas-background" name="canvas-background" data-property="backgroundColor">
						<?php print $backgroundOptions; ?>
					</select>
				</div>
			</li>
			<li>
				<div class="field">
					<label for="text-color">Text Colour: </label>
					<select id="text-color" name="text-color" data-property="color">
						<?php print $textOptions; ?>
					</select>
				</div>
				<div class="field">
					<label for="text-align">Text Align: </label>
					<select id="text-align" name="text-align" data-property="textAlign">
						<option value="left" selected="selected">Left</option>
						<option value="center" >Center</option>
						<option value="right">Right</option>
					</select>
				</div>
				<div class="field">
					<label for="text-size">Text Size: </label><input id="text-size" name="text-size" data-property="fontSize" data-unit="px" type="number" min="8" max="100" step="1" value="24" />
				</div>
			</li>
		</ul>
		<ul class="responsive-form">
			<li>
				<div class="field">
					<label for="filename">File name: </label><input id="filename" name="filename" type="text" value="mandoa" />
				</div>
			</li>
			<li>
				<div class="field">
					<button id="save" name="save" onclick="_gaq.push(['_trackEvent', 'save image', 'clicked']);">Save Image</button>
				</div>
			</li>
		</ul>
	</fieldset>
</form>

<div id="resultsContainer">
	<p class="transcription"></p>
</div>