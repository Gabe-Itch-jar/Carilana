/// api_version=2
var script = registerScript({
    name: "Baguette Nofall",
    version: "1.0",
    authors: ["Du_Couscous"]
});

var mode;
script.registerModule({
    name: "BaguetteNoFall",
    description: "Don't take damage",
    category: "Movement",
    settings: {
    	Mode: Setting.list({
            name: "Mode",
            default: "Matrix",
			values: ["Jartex / Spartan","MatrixInfinte", "BAC"]
        }),
    	MatrixFallDistance: Setting.float({
            name: "MatrixFallDistance",
            default: 4,
            max:6,
            min:3
        })
    }  
}, function (module) {
	module.on("enable", function() {
		var dist = 0;
	})
	module.on("motion", function () {

		if (module.settings.Mode.get() == "Jartex / Spartan") {
			if (mc.thePlayer.fallDistance >= 3) {
				mc.thePlayer.motionY = 0;
				setSpeed(0);  
				mc.thePlayer.onGround = 1;
				mc.thePlayer.fallDistance = 0;
			}
		}
		if (module.settings.Mode.get() == "MatrixInfinte") {
			if (mc.thePlayer.fallDistance >= module.settings.MatrixFallDistance.get()) {
				mc.thePlayer.motionY = -0.05;
				setSpeed(0);
				mc.thePlayer.onGround = 1;
				mc.thePlayer.fallDistance = 0;
			}
		}
		if (module.settings.Mode.get() == "BAC") {
			if (mc.thePlayer.fallDistance >= 0.5 && !mc.gameSettings.keyBindJump.isKeyDown()) {
				mc.thePlayer.motionY = 0;
				mc.thePlayer.onGround = 1;
				mc.thePlayer.fallDistance = 0;
			}
		}
    });
});

//functions

function setSpeed(_speed) {
	var playerYaw = Math.radians(mc.thePlayer.rotationYaw);
	mc.thePlayer.motionX = _speed * -Math.sin(playerYaw);
	mc.thePlayer.motionZ = _speed * Math.cos(playerYaw);
}
