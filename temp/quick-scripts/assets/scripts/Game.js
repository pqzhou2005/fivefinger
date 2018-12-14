(function() {"use strict";var __module = CC_EDITOR ? module : {exports:{}};var __filename = 'preview-scripts/assets/scripts/Game.js';var __require = CC_EDITOR ? function (request) {return cc.require(request, require);} : function (request) {return cc.require(request, __filename);};function __define (exports, require, module) {"use strict";
cc._RF.push(module, '71d3fvgmz1BMIy3ia+/4+gT', 'Game', __filename);
// scripts/Game.js

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

        stickPrefab: {
            default: null,
            type: cc.Prefab
        },

        fingerPrefab: {
            default: null,
            type: cc.Prefab
        }

    },

    // LIFE-CYCLE CALLBACKS:

    onLoad: function onLoad() {

        var manager = cc.director.getCollisionManager();
        manager.enabled = true;
        // manager.enabledDebugDraw = true;

        this.node.on(cc.Node.EventType.TOUCH_START, this.onTouchStart, this);

        this.spawnFinger(cc.v2(0, 0));

        this.node.on('gameover', function (event) {
            console.log('gameover.................................');
            event.stopPropagation();
        });
    },
    start: function start() {},


    onTouchStart: function onTouchStart(event) {

        if (!cc.isValid(this.stick)) {

            console.log(event.getLocation());
            this.spawnStick(event.getLocation());
        } else {

            this.stick.getComponent('Stick').rotate();
        }

        console.log(event);
    },

    // update (dt) {},

    spawnStick: function spawnStick(postion) {
        // 使用给定的模板在场景中生成一个新节点
        this.stick = cc.instantiate(this.stickPrefab);
        // 将新增的节点添加到 Canvas 节点下面
        this.node.addChild(this.stick);
        // 设置一个随机位置

        postion.x -= this.node.width / 2;
        postion.y -= this.node.height / 2;

        this.stick.setPosition(postion);
    },

    spawnFinger: function spawnFinger(postion) {

        this.finger = cc.instantiate(this.fingerPrefab);
        this.node.addChild(this.finger);

        postion.x -= this.node.width / 2 - this.finger.width / 2;
        postion.y -= this.node.height / 2 - this.finger.height / 2;

        this.finger.setPosition(postion);

        this.finger.getComponent("Finger").moveUp();
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
        //# sourceMappingURL=Game.js.map
        