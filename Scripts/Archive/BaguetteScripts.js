/// api_version=2
var script = registerScript({
    name: "Baguette Script",
    version: "1",
    authors: ["Du_Couscous"]
});
function readTextFile(file)
{
    var rawFile = new XMLHttpRequest();
    rawFile.open("GET", file, false);
    rawFile.onreadystatechange = function ()
    {
        if(rawFile.readyState === 4)
        {
            if(rawFile.status === 200 || rawFile.status == 0)
            {
                var allText = rawFile.responseText;
                Chat.print(allText);
            }
        }
    }
    rawFile.send(null);
}

var fstate = 0;
var mstate = 0;
var state2 = 0;
var state3 = 0;
var jumpstate;
var teststate;
var hasReset;
var ncp;
var hivestate;
var dist;

function setSpeed(_speed) {
	var playerYaw = Math.radians(mc.thePlayer.rotationYaw);
	mc.thePlayer.motionX = _speed * -Math.sin(playerYaw);
	mc.thePlayer.motionZ = _speed * Math.cos(playerYaw);
}

script.registerModule({
    name: "BaguetteFly",
    description: "Be a bird",
    category: "Movement",
    settings: {
        Mode: Setting.list({
            name: "Mode",
            default: "NewMatrix",
			values: ["BoatMatrix", "OldACR","BrwServ","Matrix","MatrixNoVoid","MatrixNoVoid2","BoatLastAAC","Cubecraft","Cubecraft2","NewMatrix","Taka / Redesky","AntiAC","Redesky","Redesky2"]
        }),
        BrwTick: Setting.float({
            name: "BrwSpeed",
            default: 21.49,
			min: 10,
			max:40
        }),
        BrwTimer: Setting.float({
            name: "BrwTimer",
            default: 2,
			min: 0.5,
			max:3
        }),
        RedeV: Setting.float({
            name: "RedeskyY",
            default: 1.5,
			min: 0.5,
			max:4
        })
	}  
}, function (module) {
    module.on("enable", function () {

		jumpstate = 0;
    	mstate = 21.49;
    	dist = mc.thePlayer.posY;
    	mc.thePlayer.ticksExisted = 0;
		if (module.settings.Mode.get() == "Cubecraft") {
    	  	MovementUtils.setSpeed(0.0);
    	  	mc.thePlayer.motionY = -0.800000011920929;
		}
		if (module.settings.Mode.get() == "Redesky") {
			if (mc.thePlayer.onGround) {
				vClip(module.settings.RedeV.get());
			}
		}
		if (module.settings.Mode.get() == "Redesky2") {
			if (mc.thePlayer.onGround) {
				hClip2(10);
				vClip2(10);
				vClip(2);
				setSpeed(0.5);
			}
		}

		if (module.settings.Mode.get() == "BrwServ") {
			mc.thePlayer.jump();
			mc.timer.timerSpeed = module.settings.BrwTimer.get();
			mstate = module.settings.BrwTick.get();
		}
		if (module.settings.Mode.get() == "Matrix") {
			mc.timer.timerSpeed = 0.2;
		}
		if (module.settings.Mode.get() == "MatrixNoVoid") {
			mc.timer.timerSpeed = 0.4;
		}
		matrixfly = 0;
    });
		module.on("packet", function (event) {
		var packet = event.getPacket();
		if (packet instanceof S08 && jumpstate == 1 && mc.thePlayer.onGround) {
			jumpstate = 0;
			mc.thePlayer.motionX = 0;
			mc.thePlayer.motionZ = 0;
		}
		
		if (packet instanceof S12 && packet.getEntityID() == mc.thePlayer.getEntityId() && hasReset) {
			hasReset = false;
			event.cancelEvent();
		}      
    });

    module.on("move", function (event) {
      	if (jumpstate == 1 && !mc.thePlayer.onGround) {
			event.setX(0);
			event.setZ(0);
		}
    });
	module.on("disable", function () {
		mc.timer.timerSpeed = 1;
		ncp = 0;
		setSpeed(0);
		if (module.settings.Mode.get() == "Redesky") {
			hClip2(0);
		}
    });

var pl = [];
var matrixfly = 0;
var sword;
	module.on("update", function () {
		if (module.settings.Mode.get() == "BoatMatrix") {
			if (mc.thePlayer.isRiding()) {
				jumpstate = 1;
				ncp = 0;
			} else { 
				if (jumpstate == 1) {
					jumpstate = 0;
					mc.timer.timerSpeed = 1;
					mc.thePlayer.motionY = 0.5;
					setSpeed(2.5);
				}
			}
		}
		if (module.settings.Mode.get() == "BoatLastAAC") {
			if (mc.thePlayer.isRiding()) {
				jumpstate = 1;
				ncp = 0;
			} else { 
				if (jumpstate == 1) {
					jumpstate = 0;
					mc.timer.timerSpeed = 1;
					mc.thePlayer.motionY = 0.5;
					setSpeed(5);
				}
			}
		}
		if (module.settings.Mode.get() == "Redesky") {
			mc.timer.timerSpeed = 0.3;
			hClip2(7);
			vClip2(10);
			vClip(-0.5);
			hClip(2);
			setSpeed(1);
			mc.thePlayer.motionY = -0.01;
		}
		if (module.settings.Mode.get() == "LastAAC") {
			if (mc.thePlayer.onGround) {
				mc.thePlayer.jump();
			}
			mc.timer.timerSpeed = 0.4;
			if (mc.thePlayer.moveForward) {
				setSpeed(0.66254);
			}
		}
		if (module.settings.Mode.get() == "MatrixNoVoid") {
			if (mc.thePlayer.onGround) {
				mc.thePlayer.jump();
			}
			mc.timer.timerSpeed = 0.4;
		}
	})
		module.on("motion", function () {

		fstate++;
		if (ncp) {
			mc.thePlayer.motionY =-0.1;
		}
		if (module.settings.Mode.get() == "BrwServ") {
		}
		if (module.settings.Mode.get() == "OldACR") {
			if (mc.thePlayer.fallDistance >= 0.5) {
				mc.thePlayer.motionY = 0;
				mc.thePlayer.onGround = 1;
				mc.thePlayer.fallDistance = 0;
			}
		}
		if (fstate == 7 || fstate == 4 || fstate == 14 || fstate == 17) {
			if (module.settings.Mode.get() == "MatrixNoVoid" && mc.thePlayer.fallDistance >= 1) {
				mc.thePlayer.motionY = -0.05;
			}
		}
		if (module.settings.Mode.get() == "Cubecraft") {
		    mc.timer.timerSpeed = 0.1;
		    mc.thePlayer.onGround = false;
		    mc.thePlayer.jumpMovementFactor = 0.0;
		    if (mc.thePlayer.ticksExisted % 2 == 0) {
		      	setSpeed(2.0);
		      	mc.thePlayer.motionY = 0.20000000298023224;
		    } else {
		      	mc.thePlayer.motionY = 0.0;
		    	setSpeed(0.0);
		    }
		}
		if (module.settings.Mode.get() == "Cubecraft2") {
		    mc.timer.timerSpeed = 0.2;
		    if (mc.thePlayer.onGround) {
		    	mc.thePlayer.motionY = 0.5;
		    }
		    setSpeed(0.5);
		    mc.thePlayer.jumpMovementFactor = 0.0;
		    if (mc.thePlayer.ticksExisted % 2 == 0) {
		    	hClip(1);
		    }
		}
		if (module.settings.Mode.get() == "AntiAC") {
		    mc.timer.timerSpeed = 2;
		    mc.thePlayer.onGround = false;
		    mc.thePlayer.jumpMovementFactor = 0.0;
		    if (mc.thePlayer.ticksExisted % 3 == 0) {
		      	mc.thePlayer.motionY = 0.080000000298023224;
		    	setMoveSpeed(2);
		    	if (mc.gameSettings.keyBindJump.isKeyDown()) {
		    		vClip(1);
		    	}
		    	if (mc.gameSettings.keyBindSneak.isKeyDown()) {
		    		vClip(-1);
		    	}
		    } else {
		      	mc.thePlayer.motionY = -0.04;
		    	setSpeed(0);
		    }
		}
		if (module.settings.Mode.get() == "Taka / Redesky") {
		    mc.thePlayer.onGround = true;
		    mc.thePlayer.jumpMovementFactor = 0.0;
		    mc.thePlayer.motionY = -0.05;
		    mc.timer.timerSpeed = 0.1;
		    if (mc.thePlayer.ticksExisted % 2 == 0) {
		    	hClip2(10);
		    	vClip2(4);
		    	setSpeed(2);
		    } else {
		      	//mc.thePlayer.motionY = 0.0;
		    	setSpeed(0);
		    }
		}
		if (module.settings.Mode.get() == "TestSpartan") {
			if (mc.gameSettings.keyBindAttack.isKeyDown()) {
		      	sword = mc.thePlayer.getCurrentEquippedItem();
		      	sword.useItemRightClick(mc.theWorld, mc.thePlayer);
	    	} 
		}
		if (module.settings.Mode.get() == "NewMatrix") {
			if (mc.thePlayer.fallDistance > 3) {
			    mc.timer.timerSpeed = 0.2;
			    mc.thePlayer.onGround = false;
			    if (mc.thePlayer.ticksExisted % 3 == 0) {
			      	mc.thePlayer.motionY = -0.05;
			    }
			}
		}
		if (module.settings.Mode.get() == "MatrixNoVoid2") {
			if (mc.thePlayer.fallDistance > 3) {
			    mc.timer.timerSpeed = 0.4;
			    mc.thePlayer.onGround = false;
			    if (mc.thePlayer.ticksExisted % 2 == 0) {
			      	mc.thePlayer.motionY = -0.01;
			    }
			}
		}
		if (fstate == 7 || fstate == 14 || fstate == 17) {
			if (module.settings.Mode.get() == "Matrix" && mc.thePlayer.fallDistance >= 2) {
				mc.thePlayer.motionY = -0.05;
			}
		}
		if (fstate >= mstate) {
			fstate = 0
			if (module.settings.Mode.get() == "BrwServ") {
				mc.thePlayer.jump();
			}
		}
    });
});
var mode;
script.registerModule({
    name: "BaguetteNoFall",
    description: "I don't take damage ! :D",
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
var mode;
script.registerModule({
    name: "BaguettePhase",
    description: "I like go through wall",
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
var state = 0;
var sstate = 0;
var pressed = 0;
var pressed2 = 0;
var sprinting = 0;
script.registerModule({
    name: "BaguetteWTAP",
    description: "Reset Sprint on Hit",
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
	module.on("motion", function () {
		if (mc.thePlayer.moveForward > 0) {
      		mc.thePlayer.setSprinting(true); 
		}
		if (mc.gameSettings.keyBindAttack.isKeyDown()) {
			mc.thePlayer.setSprinting(false)
		}
    });
});

function vClip(d) {
	mc.thePlayer.setPosition(mc.thePlayer.posX, mc.thePlayer.posY + d, mc.thePlayer.posZ);
}
function xClip(d) {
	mc.thePlayer.setPosition(mc.thePlayer.posX + d, mc.thePlayer.posY, mc.thePlayer.posZ);
}
function zClip(d) {
	mc.thePlayer.setPosition(mc.thePlayer.posX, mc.thePlayer.posY, mc.thePlayer.posZ + d);
}
function hClip(d) {
	var playerYaw = Math.radians(mc.thePlayer.rotationYaw);
	mc.thePlayer.setPosition(mc.thePlayer.posX + d * -Math.sin(playerYaw), mc.thePlayer.posY, mc.thePlayer.posZ + d * Math.cos(playerYaw));
}
function dClip(d) {
	var playerYaw = Math.radians(mc.thePlayer.rotationYaw) + 90;
	mc.thePlayer.setPosition(mc.thePlayer.posX + d * -Math.sin(playerYaw), mc.thePlayer.posY, mc.thePlayer.posZ + d * Math.cos(playerYaw));
}
function hClip2(d) {
	var playerYaw = Math.radians(mc.thePlayer.rotationYaw);
	mc.getNetHandler().addToSendQueue(new C04(mc.thePlayer.posX + d * -Math.sin(playerYaw), mc.thePlayer.posY, mc.thePlayer.posZ + d * Math.cos(playerYaw), false));
}
function vClip2(d) {
	mc.getNetHandler().addToSendQueue(new C04(mc.thePlayer.posX, mc.thePlayer.posY+d, mc.thePlayer.posZ, false));
}
function chatSyntax(message) {
    Chat.print("§8[§9§lMacros§8] §3Syntax: §7" + prefix + message);
}

function chatText(message) {
    Chat.print("§8[§9§lMacros§8] §3" + message);
}

function aacDamage(damages) {
	mc.thePlayer.motionY = (5 * damages);
}

function ncpDamage() {
	vClip(4);
}

function setSpeed(_speed) {
	var playerYaw = Math.radians(mc.thePlayer.rotationYaw);
	mc.thePlayer.motionX = _speed * -Math.sin(playerYaw);
	mc.thePlayer.motionZ = _speed * Math.cos(playerYaw);
}
function setDiagSpeed(_speed) {
	var playerYaw = Math.radians(mc.thePlayer.rotationYaw + 90);
	mc.thePlayer.motionX = _speed * -Math.sin(playerYaw);
	mc.thePlayer.motionZ = _speed * Math.cos(playerYaw);
}
function setMoveSpeed(_speed) {
	if (mc.gameSettings.keyBindLeft.isKeyDown() || mc.gameSettings.keyBindRight.isKeyDown()) {
		setDiagSpeed(_speed*-mc.thePlayer.moveStrafing);
	} else {
		setSpeed(_speed * mc.thePlayer.moveForward);
	}
}
function getSpeed() {
	return Math.sqrt(Math.pow(mc.thePlayer.motionX,2) + Math.pow(mc.thePlayer.motionZ,2))
}
function getRandom(max) {return Math.floor(Math.random() * Math.floor(max))};

var C04 = Java.type("net.minecraft.network.play.client.C03PacketPlayer.C04PacketPlayerPosition");
var C02 = Java.type("net.minecraft.network.play.client.C03PacketPlayer.C04PacketPlayerPosition");
var S08 = Java.type('net.minecraft.network.play.server.S08PacketPlayerPosLook');
var S12 = Java.type('net.minecraft.network.play.server.S12PacketEntityVelocity');

Math.radians = function(degrees) {
    return degrees * Math.PI / 180;
};
