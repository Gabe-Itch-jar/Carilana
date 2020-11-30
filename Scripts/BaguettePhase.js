/// api_version=2
var script = registerScript({
    name: "Baguette Phase",
    version: "1.2",
    authors: ["Du_Couscous"]
});

var mode;
script.registerModule({
    name: "BaguettePhase",
    description: "Phase through a wall",
    category: "Movement",
    settings: {
    	Mode: Setting.list({
            name: "Mode",
            default: "Matrix",
			values: ["Matrix"]
        })
    }  
}, function (module) {
	module.on("enable", function() {
		dist = mc.thePlayer.posY;
	})
	module.on("motion", function () {
		if (module.settings.Mode.get() == "Matrix" && dist-2 <= mc.thePlayer.posY) {
			mc.thePlayer.setPosition(mc.thePlayer.posX, mc.thePlayer.posY-3, mc.thePlayer.posZ);
			setSpeed(0.1)
		}
    });
});

//functions
function setSpeed(_speed) {
	var playerYaw = Math.radians(mc.thePlayer.rotationYaw);
	mc.thePlayer.motionX = _speed * -Math.sin(playerYaw);
	mc.thePlayer.motionZ = _speed * Math.cos(playerYaw);
}
