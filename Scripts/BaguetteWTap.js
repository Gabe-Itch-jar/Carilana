/// api_version=2
var script = registerScript({
    name: "Baguette Script",
    version: "1.2",
    authors: ["Du_Couscous, mmk"]
});

script.registerModule({
    name: "BaguetteWTAP",
    description: "Reset your sprint on attack",
    category: "Combat"
	
}, function (module) {
	module.on("disable", function() {
		mc.timer.timerSpeed = 1;
	})
	module.on("attack", function (e) {
		if (mc.thePlayer.moveForward > 0) {
      		mc.thePlayer.setSprinting(true); 
		}
		if (mc.gameSettings.keyBindAttack.isKeyDown()) {
			mc.thePlayer.setSprinting(false)
		}
    });
});
