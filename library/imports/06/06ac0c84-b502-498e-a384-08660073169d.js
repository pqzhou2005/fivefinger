"use strict";
cc._RF.push(module, '06ac0yEtQJJjqOECGYAcxad', 'Finger');
// scripts/Finger.js

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

    properties: {

        moveUpDuration: 2
    },

    // LIFE-CYCLE CALLBACKS:

    onLoad: function onLoad() {},
    start: function start() {},
    update: function update(dt) {},


    moveUp: function moveUp(callback, target) {
        this.node.runAction(cc.sequence(new cc.moveBy(this.moveUpDuration, cc.v2(0, this.node.height)), cc.callFunc(callback, target)));
    }

});

cc._RF.pop();