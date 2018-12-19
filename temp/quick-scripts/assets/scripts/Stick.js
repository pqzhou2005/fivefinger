(function() {"use strict";var __module = CC_EDITOR ? module : {exports:{}};var __filename = 'preview-scripts/assets/scripts/Stick.js';var __require = CC_EDITOR ? function (request) {return cc.require(request, require);} : function (request) {return cc.require(request, __filename);};function __define (exports, require, module) {"use strict";
cc._RF.push(module, 'a2b4aaajL1DQqrzVf5XyySW', 'Stick', __filename);
// scripts/Stick.js

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

        stretchEachLength: 7,

        rotateDuration: 0.5

    },

    // LIFE-CYCLE CALLBACKS:

    onLoad: function onLoad() {

        this.currentLength = 0;
        //伸缩状态
        this.state = 0;
    },
    start: function start() {},
    update: function update(dt) {

        if (this.state == 0 && this.currentLength < this.node.height) {

            this.currentLength += this.stretchEachLength;
            this.node.setScale(this.currentLength / this.node.height);
        }
    },


    stopStretch: function stopStretch() {
        //停止伸缩
        this.state = 1;
    },

    rotate: function rotate(callback, target) {

        if (this.state == 0 && this.currentLength >= 10) {
            this.stopStretch();
            this.node.runAction(cc.sequence(new cc.RotateBy(this.currentLength * this.rotateDuration / 100, 90), cc.callFunc(callback, target)));
        }
    },

    getCurrentLength: function getCurrentLength() {
        return this.currentLength;
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
        //# sourceMappingURL=Stick.js.map
        