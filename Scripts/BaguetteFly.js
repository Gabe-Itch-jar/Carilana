/// api_version=2
var script = registerScript({
	name: "Baguette Fly",
	version: "3.0",
	authors: ["Du_Couscous, mmk"]
});
 
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
var blink = moduleManager.getModule("Blink");
var blocks = [];
var jump = 0;
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
	    default: "AACLongJump",
	    values: ["OldBoatMatrix","OldMatrix","Verus", "BrwServ","OldMatrixNoVoid","OldMatrixNoVoid2","BoatLastAAC","OldCubecraft","OldCubecraft2","OldMatrix","OldAntiAC","OldRedesky","OldRedesky2", "OldRedesky3", "OldRedesky4", "OldRedesky5","OldRedesky6/Taka", "AACLongJump", "Matrix6.0.1Longjump" ,"NewAntiAC", "TestAntiAC", "ACR", "SpieleOase"]
	}),
    TimerBoost: Setting.boolean({
        name: "AntiAC-Boost",
        default: false
	}),
    ACRTicks: Setting.integer({
        name: "ACR-Ticks",
        default: 7,
        min: 2,
        max: 8
    }),
    ACRY: Setting.float({
        name: "ACR-MotionY",
        default: 0.03,
        min: 0.01,
        max: 0.05
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
	    name: "OldRedeskyY",
	    default: 1.54,
	    min: 0.5,
	    max:4
	}),
	RedeBoost: Setting.float({
	    name: "OldRedeskyBoost",
	    default: 9.30,
	    min: 2,
	    max:12
	}),
	Rede5B: Setting.float({
	    name: "OldRedesky5Boost",
	    default: 3,
	    min: 1.0,
	    max:7
	}),
	Rede5Y: Setting.float({
	    name: "OldRedesky5Y",
	    default: 10,
	    min:4.0,
	    max:12
	}),
	RedeBlink: Setting.boolean({
	    name: "OldRedeskyUseBlink",
	    default: false
	}),
	RedeTimer: Setting.boolean({
	    name: "OldRedeskyTimerBoost",
	    default: false
	}),
	RedeTimerVal: Setting.float({
	    name: "OldRedeskyTimer",
	    default: 1.05,
	    min: 1.0,
	    max:1.2
	}),
	BoatY: Setting.float({
	    name: "JartexBoatY",
	    default: 0.5,
	    min:0.5,
	    max:5
	}),
	BoatBoost: Setting.float({
	    name: "JartexBoatBoost",
	    default: 3,
	    min:3,
	    max:5
	}),
    AutoSneak: Setting.boolean({
        name: "JartexAutoSneak",
        default: true
	}),
    BoatJartex: Setting.boolean({
        name: "JartexBoatJartex",
        default: true
	}),
	MsgOnToggle: Setting.boolean({
	    name: "ToggleMessage",
	    default: false
	}),
	}
}, function (module) {
	module.on("enable", function () {
 
		jumpstate = 0;
		mstate = 21.49;
		dist = mc.thePlayer.posY;
		mc.thePlayer.ticksExisted = 0;
		if (module.settings.Mode.get() == "OldCubecraft") {
		  	MovementUtils.setSpeed(0.0);
		  	mc.thePlayer.motionY = -0.800000011920929;
		}

		if (module.settings.Mode.get() == "AACLongJump") {
			candisable = false;
		}

		if (module.settings.Mode.get() == "ACR") {
			Chat.print("§b[BaguetteFly] §cWorks for 5 blocks, try to change the settings and find a better bypass")
			mc.timer.timerSpeed = 1;
			jumpstate = 0;
        }
		if (module.settings.Mode.get() == "NewAntiAC" && module.settings.TimerBoost.get()) {
            mc.timer.timerSpeed = 2;
        }
		if (module.settings.Mode.get() == "OldRedesky") {
			if (module.settings.RedeBlink.get() == true) {
				blink.setState(true);
			}
			if (mc.thePlayer.onGround) {
				vClip(module.settings.RedeV.get());
			}
		}

		if (module.settings.Mode.get() == "SpieleOase") {
			ncpDamage();
		}
 
        if (module.settings.Mode.get() == "ACR") {
            setSpeed(0.2*mc.thePlayer.moveForward);
            if (mc.thePlayer.ticksExisted % module.settings.ACRTicks.get() == 0 && !mc.thePlayer.onGround) {
                if (mc.thePlayer.motionY <= 0) {
                    mc.thePlayer.motionY = -(module.settings.ACRY.get());
                }
            }
            mc.thePlayer.setSprinting(false);
        }
 
		if (module.settings.Mode.get() == "OldRedesky5") {
			dist = mc.thePlayer.posY
		}
		if (module.settings.Mode.get() == "OldRedesky2") {
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
		if (module.settings.Mode.get() == "OldMatrix") {
			mc.timer.timerSpeed = 0.2;
		}
		if (module.settings.Mode.get() == "OldMatrixNoVoid") {
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
		if(module.settings.Mode.get() == "OldRedesky5") {
			if(mc.gameSettings.keyBindJump.isKeyDown() == true) {
				vClip2(4.151)
			}
		}
	});
	module.on("disable", function () {
		mc.thePlayer.capabilities.flying = false;
		mc.timer.timerSpeed = 1;
		mc.thePlayer.speedInAir = 0.02;
		blink.setState(false)
		if (module.settings.RedeBlink.get() == true) {
			blink.setState(true);
			blink.setState(false);
		}
		ncp = 0;
		setSpeed(0);
		if (module.settings.Mode.get() == "OldRedesky") {
			hClip2(0);
		}
	});
 
var pl = [];
var matrixfly = 0;
var sword;
	module.on("update", function () {
 
		if (module.settings.Mode.get() == "OldBoatMatrix") {
			if (mc.thePlayer.isRiding()) {
			if (module.settings.AutoSneak.get()) {
			mc.gameSettings.keyBindSneak.pressed = true;
			}
			jumpstate = 1;
			if (module.settings.BoatJartex.get()) {
			mc.timer.timerSpeed = 0.3;
			}	
			} else { 
				mc.timer.timerSpeed = 1;
				if (jumpstate == 1) {
					if (module.settings.AutoSneak.get()) {
					mc.gameSettings.keyBindSneak.pressed = false;
					}
					jumpstate = 0;
					mc.timer.timerSpeed = 1;
					mc.thePlayer.sendQueue.addToSendQueue(new C03(true));
					mc.thePlayer.motionY = module.settings.BoatY.get();
					setSpeed(module.settings.BoatBoost.get());
				}
			}
		}
 
		if (module.settings.Mode.get() == "AACLongJump") {
			mc.timer.timerSpeed = 1;
        
        	if (mc.thePlayer.onGround && candisable) {
            	module.toggle();
            	return;
        	}
        
        	if (mc.thePlayer.onGround) {
           		mc.thePlayer.jump();
            	mc.thePlayer.speedInAir = 0.05;
            	candisable = true;
        	}
			if (mc['thePlayer']['fallDistance'] > -0x12e * -0x18 + 0x1 * -0x1f67 + 0x317) {
    			if (mc['thePlayer']['fallDistance'] < -0x19a3 * -0x1 + 0x810 + -0x10d9 * 0x2) {
        			mc['thePlayer']['speedInAir'] *= 0x237e + -0x1 * -0x1dd5 + -16722.15;
        			mc['thePlayer']['motionY'] *= 0x2525 + 0x7 * -0xb + -9431.25;
    			} else if (mc['thePlayer']['fallDistance'] < -0x1fba + 0x1da3 + 0x3 * 0xb3) {
        			mc['thePlayer']['speedInAir'] *= -0x166 * -0x5 + 0xb41 + -4670.25;
        			mc['thePlayer']['motionY'] *= 0x892 + 0x450 + -3297.15;
    			} else {
        			mc['thePlayer']['speedInAir'] = -0x1a * 0xd6 + -0x25e2 + 15262.02;
    			}
			}
        	if (mc.thePlayer.motionY > 0) {
            	if (mc.thePlayer.motionY < 0.3) {
                	mc.thePlayer.motionY *= 1.25;
                	mc.thePlayer.speedInAir *= 1.21;
            	}
        	}
		}

		if (module.settings.Mode.get() == "Matrix6.0.1Longjump") {
			if (mc.theWorld.isAirBlock(new BlockPos(mc.thePlayer.posX,mc.thePlayer.posY-1,mc.thePlayer.posZ)) || mc.thePlayer.inWater) {
            	if (mc.thePlayer.fallDistance >= 1) {
                	mc.theWorld.setBlockState(new BlockPos(mc.thePlayer.posX, mc.thePlayer.posY-1, mc.thePlayer.posZ), Blocks.barrier.getDefaultState());
                	blocks.push(new BlockPos(mc.thePlayer.posX,mc.thePlayer.posY-1,mc.thePlayer.posZ));
            	}
        	}
        	if (mc.thePlayer.onGround) {
            	mc.thePlayer.jump();
        	}
		}

        if (module.settings.Mode.get() == "ACR") {
            setSpeed(0.2*mc.thePlayer.moveForward);
            if (mc.thePlayer.ticksExisted % module.settings.ACRTicks.get() == 0 && !mc.thePlayer.onGround) {
                if (mc.thePlayer.motionY <= 0) {
                    mc.thePlayer.motionY = -(module.settings.ACRY.get());
                }
            }
            mc.thePlayer.setSprinting(false);
        }
 
		if (module.settings.Mode.get() == "OldMatrix") {
            if (mc.thePlayer.fallDistance > 3) {
                mc.timer.timerSpeed = 0.2;
                mc.thePlayer.onGround = false;
                if (mc.thePlayer.ticksExisted % 3 == 0) {
                    mc.thePlayer.motionY = -0.05;
                mc.timer.timerSpeed += 0.01;
                }
            }
        }
 
		if (module.settings.Mode.get() == "NewAntiAC") {
            //mc.timer.timerSpeed = 0.2;
            if (mc.gameSettings.keyBindJump.isKeyDown() && mc.thePlayer.onGround) {
                //vClip(0.3);
            }
            if (mc.thePlayer.ticksExisted % 2 == 0 && mc.thePlayer.motionY <= 0 && !mc.thePlayer.onGround) {
                mc.thePlayer.motionY = -0.005;
            }
            mc.thePlayer.setSprinting(false);
            setSpeed(0.2*moveForward);
		}
 
		if (module.settings.Mode.get() == "TestAntiAC") {
			mc.thePlayer.capabilities.flying = true;
			mc.thePlayer.motionY = 0;
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
 
		if (module.settings.Mode.get() == "OldRedesky") {
			mc.timer.timerSpeed = 0.3;
			if(module.settings.RedeTimer.get() == true) {
				mc.timer.timerSpeed = module.settings.RedeTimerVal.get();
			}
			hClip2(module.settings.RedeBoost.get());
			vClip2(10);
			if(module.settings.RedeTimer.get() == true) {
				mc.timer.timerSpeed = 0.3;
			}
			vClip(-0.5);
			hClip(2);
			setSpeed(1);
			if (module.settings.RedeBlink.get() == true) {
				if(mc.thePlayer.onGround == true) {
					blink.setState(true);
					blink.setState(false);
					packet.onGround = false;
					packet.onGround = true;
				}
			}
			if (module.settings.RedeBlink.get() == true) {
				blink.setState(false);
			}
			mc.thePlayer.motionY = -0.01;
		}
 
		if(module.settings.Mode.get() == "OldRedesky3") {
			if (mc.thePlayer.onGround) {
				Chat.print("§b[BaguetteFly] §cYou must jump into the void and activate this fly!")
				Chat.print("§b[BaguetteFly] §c[Disabled]")
				module.setState(false);
			} else {
				setSpeed(0.5)
				mc.timer.timerSpeed = 0.31;
				vClip2(10)
				if(mc.thePlayer.keyBindForwards.isKeyDown()) {
					hClip2(6.38)
					vClip(-0.1)
					hClip(1)
					setSpeed(1)
				}
			}
		}
 
 
		if(module.settings.Mode.get() == "OldRedesky4") {
			if (mc.thePlayer.onGround) {
				Chat.print("§b[BaguetteFly] §cYou must jump into the void and activate this fly!")
				Chat.print("§b[BaguetteFly] §c[Disabled]")
				module.setState(false);
			} else {
				mc.timer.timerSpeed = 0.3;
				hClip2(module.settings.RedeBoost.get());
				vClip(-0.5);
				hClip(2);
				setSpeed(1);
				mc.thePlayer.motionY = -0.01;
			}
		}
 
		if(module.settings.Mode.get() == "OldRedesky5") {
			yClip(dist)
            hClip(module.settings.Rede5B.get())
            hClip2(2)
            vClip2(module.settings.Rede5Y.get())
            setSpeed(1)
            mc.timer.timerSpeed = 0.3;
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
 
		if (module.settings.Mode.get() == "OldMatrixNoVoid") {
			if (mc.thePlayer.onGround) {
				mc.thePlayer.jump();
			}
			mc.timer.timerSpeed = 0.4;
		}
 
 
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
		if (module.settings.Mode.get() == "SpieleOase") {
			yClip(dist);
		}
		});
 
 
		if (fstate == 7 || fstate == 4 || fstate == 14 || fstate == 17) {
			if (module.settings.Mode.get() == "OldMatrixNoVoid" && mc.thePlayer.fallDistance >= 1) {
				mc.thePlayer.motionY = -0.05;
			}
		}
 
		if (module.settings.Mode.get() == "OldCubecraft") {
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
 
		if (module.settings.Mode.get() == "OldAntiAC") {
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
 
		if (module.settings.Mode.get() == "OldRedesky6/Taka") {
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
 
		if (module.settings.Mode.get() == "OldMatrixNoVoid") {
			if (mc.thePlayer.fallDistance > 3) {
				mc.timer.timerSpeed = 0.4;
				mc.thePlayer.onGround = false;
				if (mc.thePlayer.ticksExisted % 2 == 0) {
				  	mc.thePlayer.motionY = -0.01;
				}
			}
		}
 
		if (fstate == 7 || fstate == 14 || fstate == 17) {
			if (module.settings.Mode.get() == "OldMatrix" && mc.thePlayer.fallDistance >= 2) {
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
 
 
//functions
 
function vClip(d) {
	mc.thePlayer.setPosition(mc.thePlayer.posX, mc.thePlayer.posY + d, mc.thePlayer.posZ);
}
function yClip(d) {
    mc.thePlayer.setPosition(mc.thePlayer.posX, d, mc.thePlayer.posZ);
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

var C03 = Java.type("net.minecraft.network.play.client.C03PacketPlayer");
var C04 = Java.type("net.minecraft.network.play.client.C03PacketPlayer.C04PacketPlayerPosition");
var C02 = Java.type("net.minecraft.network.play.client.C03PacketPlayer.C04PacketPlayerPosition");
var S08 = Java.type('net.minecraft.network.play.server.S08PacketPlayerPosLook');
var S12 = Java.type('net.minecraft.network.play.server.S12PacketEntityVelocity');
var BlockPos = Java.type('net.minecraft.util.BlockPos');
var Block = Java.type('net.minecraft.block.Block');
var Blocks = Java.type('net.minecraft.init.Blocks');

Math.radians = function(degrees) {
	return degrees * Math.PI / 180;
};
