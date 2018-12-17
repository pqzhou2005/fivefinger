(function() {"use strict";var __module = CC_EDITOR ? module : {exports:{}};var __filename = 'preview-scripts/assets/scripts/Player.js';var __require = CC_EDITOR ? function (request) {return cc.require(request, require);} : function (request) {return cc.require(request, __filename);};function __define (exports, require, module) {"use strict";
cc._RF.push(module, 'b7b0fuwOx1D0Y23BjB3gt8y', 'Player', __filename);
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
        moveDownDuration: 1
    },

    // LIFE-CYCLE CALLBACKS:

    onLoad: function onLoad() {

        // this.node.runAction(cc.rotateBy(0.1,30));
    },
    start: function start() {},


    // update (dt) {},

    moveDown: function moveDown(postion) {
        //移动结束
        var finishAction = cc.callFunc(function () {
            this.node.dispatchEvent(new cc.Event.EventCustom('playerReady', true));
        }, this);

        this.node.runAction(cc.sequence(new cc.moveTo(this.moveDownDuration, postion), finishAction));
    },

    move: function move(postion) {

        var animation = this.getComponent(cc.Animation);
        var animState = animation.play("playermove");
        // console.log(animState);
        animState.speed = 10;
        animState.wrapMode = cc.WrapMode.Loop;
        animState.repeatCount = Infinity;

        var finishAction = cc.callFunc(function () {

            animState.stop();
            this.node.dispatchEvent(new cc.Event.EventCustom('playerMoveOver', true));
        }, this, animState);

        return this.node.runAction(cc.sequence(new cc.moveBy(this.moveDownDuration, postion), finishAction));
    },

    moveAndFail: function moveAndFail(postion) {
        //移动结束
        var finishAction = cc.callFunc(function () {
            this.node.dispatchEvent(new cc.Event.EventCustom('gameOver', true));
        }, this);

        this.node.runAction(cc.sequence(new cc.moveBy(this.moveDownDuration, postion), finishAction));
    }

});

cc._RF.pop();
        }
        if (CC_EDITOR) {
            __define(__module.exports, __require, __module);
        }
        else {
            cc.registerModuleFunc(__filename, function () {
                __define(__module.exports, __require, __module);
            });
        }
        })();
        //# sourceMappingURL=Player.js.map
        