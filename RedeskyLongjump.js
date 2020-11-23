var MovementUtils = Java.type("net.ccbluex.liquidbounce.utils.MovementUtils");

module = {
    name: "RedeskyLongjump",
    description: "Discord -> https://discord.gg/K9X57pHYzx /// discord.io/redesky",
    author: "mmk",
    version: 1.0,
    tag: "u: 0.5, f: 0.5",
    onEnable: function () {
        mc.thePlayer.motionY = 0.521;
        mc.thePlayer.speedInAir = 0.025236;
    },
    onDisable: function () {
        mc.thePlayer.motionY = -0.4
        mc.timer.timerSpeed = 1.0
        mc.thePlayer.speedInAir = 0.02
    },
    onMove: function () {
        if(mc.gameSettings.keyBindForward.pressed)
            MovementUtils.forward(clip_distance=0.5);
    },
}

script.import("Core.lib"); //https://github.com/CzechHek/Core
