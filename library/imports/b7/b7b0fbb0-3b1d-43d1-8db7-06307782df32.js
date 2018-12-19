"use strict";
cc._RF.push(module, 'b7b0fuwOx1D0Y23BjB3gt8y', 'Player');
// scripts/Player.js

'use strict';

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
        moveDownDuration: 1,
        moveDuration: 1
    },

    // LIFE-CYCLE CALLBACKS:

    onLoad: function onLoad() {

        // this.node.runAction(cc.rotateBy(0.1,30));
    },
    start: function start() {},


    // update (dt) {},

    moveDown: function moveDown(postion, callback, target) {
        this.node.runAction(cc.sequence(new cc.moveTo(this.moveDownDuration, postion), cc.callFunc(callback, target)));
    },

    move: function move(postion) {

        var animation = this.getComponent(cc.Animation);
        var animState = animation.play("playermove");

        animState.speed = 10;
        animState.wrapMode = cc.WrapMode.Loop;
        animState.repeatCount = Infinity;

        var finishAction = cc.callFunc(function () {

            animState.stop();
            this.node.dispatchEvent(new cc.Event.EventCustom('playerMoveOver', true));
        }, this, animState);

        return this.node.runAction(cc.sequence(new cc.moveBy(this.moveDuration, postion), finishAction));
    },

    moveAndFail: function moveAndFail(postion) {
        //移动结束
        var finishAction = cc.callFunc(function () {
            this.node.dispatchEvent(new cc.Event.EventCustom('gameOver', true));
        }, this);

        this.node.runAction(cc.sequence(new cc.moveBy(this.moveDuration, postion), finishAction));
    },

    getFooterPostion: function getFooterPostion() {
        return cc.v2(this.node.x, this.node.y - this.node.height / 2);
    }

});

cc._RF.pop();