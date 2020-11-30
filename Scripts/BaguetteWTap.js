/// api_version=2
var script = registerScript({
    name: "Baguette Script",
    version: "1.2",
    authors: ["Du_Couscous, mmk"]
});

var state = 0;
var sstate = 0;
var pressed = 0;
var pressed2 = 0;
var sprinting = 0;
script.registerModule({
    name: "BaguetteWTAP",
    description: "Reset your sprint on attack",
    category: "Combat",
    settings: {
    }  
}, function (module) {
	module.on("enable", function() {
		pressed = 0;
		pressed2 = 0;
		sprinting = 0;
	})
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
