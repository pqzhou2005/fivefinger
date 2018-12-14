"use strict";
cc._RF.push(module, 'b7b0fuwOx1D0Y23BjB3gt8y', 'Player');
// scripts/Player.js

"use strict";

// Learn cc.Class:
//  - [Chinese] http://docs.cocos.com/creator/manual/zh/scripting/class.html
//  - [English] http://www.cocos2d-x.org/docs/creator/en/scripting/class.html
// Learn Attribute:
//  - [Chinese] http://docs.cocos.com/creator/manual/zh/scripting/reference/attributes.html
//  - [English] http://www.cocos2d-x.org/docs/creator/en/scripting/reference/attributes.html
// Learn life-cycle callbacks:
//  - [Chinese] http://docs.cocos.com/creator/manual/zh/scripting/life-cycle-callbacks.html
//  - [English] http://www.cocos2d-x.org/docs/creator/en/scripting/life-cycle-callbacks.html

cc.Class({
    extends: cc.Component,

    properties: {},

    // LIFE-CYCLE CALLBACKS:

    onLoad: function onLoad() {

        var animation = this.getComponent(cc.Animation);
        var animState = animation.play("playermove");
        // console.log(animState);
        animState.speed = 10;
        animState.wrapMode = cc.WrapMode.Loop;
        animState.repeatCount = Infinity;

        // this.node.runAction(cc.rotateBy(0.1,30));
    },
    start: function start() {}
}

// update (dt) {},
);

cc._RF.pop();