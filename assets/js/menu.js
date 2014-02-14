var toggleMenu = function(e) {
	Util.toggleClass(document.body, "menu-open");
	if (!!e && Util.hasProperty(e, "preventDefault") && Util.hasProperty(e, "stopPropagation")) {
		e.preventDefault();
		e.stopPropagation();
	} else {
		return false;
	}
};


Util.on("click.menuButton, tap.menuButton", document, "a.button.mobile-toggle-menu, button.mobile-toggle-menu", toggleMenu);