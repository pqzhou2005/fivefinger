"use strict";
cc._RF.push(module, '71d3fvgmz1BMIy3ia+/4+gT', 'Game');
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

        minDistance: 10,

        maxDistance: 500,

        stickPrefab: {
            default: null,
            type: cc.Prefab
        },

        fingerPrefab: {
            default: null,
            type: cc.Prefab
        },

        playerPrefab: {
            default: null,
            type: cc.Prefab
        }

    },

    // LIFE-CYCLE CALLBACKS:

    onLoad: function onLoad() {

        //开启碰撞系统
        var manager = cc.director.getCollisionManager();
        manager.enabled = true;

        //生成指头
        this.spawnFinger(cc.v2(0, 0));
        this.currentDistance = this.random(this.minDistance, this.maxDistance);
        this.spawnFinger(cc.v2(this.currentDistance, 0));

        //指头准备结束，生成猴子
        this.node.on('fingerReady', function () {
            if (!cc.isValid(this.player)) {
                this.spawnPlayer(cc.v2(0, 0));
            } else {}
        }, this);

        //猴子准备结束，绑定触摸事件
        this.node.on('playerReady', function () {
            this.node.on(cc.Node.EventType.TOUCH_START, this.onTouchStart, this);
        }, this);

        //棍子旋转结束，猴子开始移动
        this.node.on('stickRotateOver', function () {

            this.player.getComponent('Player').move(cc.v2(this.stick.getComponent("Stick").getCurrentLength(), 0));
        }, this);

        //猴子移动结束
        this.node.on('playerMoveOver', function () {

            console.log(this.stick.getComponent("Stick").getCurrentLength());

            console.log(this.currentDistance);

            if (Math.abs(this.currentDistance - this.stick.getComponent("Stick").getCurrentLength()) < this.finger.width / 2) {

                console.log(Math.abs(this.currentDistance - this.stick.getComponent("Stick").getCurrentLength()));
                console.log(this.finger.width / 2);
                this.stick.destroy();
            } else {
                this.player.getComponent('Player').moveAndFail(cc.v2(0, -this.node.height / 2));
            }
        }, this);

        //游戏结束，切换场景
        this.node.on('gameOver', function (event) {
            console.log('gameover.................................');
            event.stopPropagation();

            cc.director.loadScene('start');
        }, this);
    },
    start: function start() {},


    onTouchStart: function onTouchStart(event) {

        if (!cc.isValid(this.stick)) {

            this.spawnStick(cc.v2(this.player.x + this.player.width / 2, this.player.y - this.player.height / 2));
        } else {

            this.stick.getComponent('Stick').rotate();

            this.node.off(cc.Node.EventType.TOUCH_START, this.onTouchStart, this);
        }

        console.log(event);
    },

    // update (dt) {},

    spawnStick: function spawnStick(postion) {
        // 使用给定的模板在场景中生成一个新节点
        this.stick = cc.instantiate(this.stickPrefab);
        // 将新增的节点添加到 Canvas 节点下面
        this.node.addChild(this.stick);

        this.stick.setPosition(postion);
    },

    spawnFinger: function spawnFinger(postion) {

        this.finger = cc.instantiate(this.fingerPrefab);
        if (!cc.isValid(this.firstFinger)) this.firstFinger = this.finger;

        this.node.addChild(this.finger);

        postion.x -= this.node.width / 2 - this.finger.width / 2;
        postion.y -= this.node.height / 2 + this.finger.height / 2;

        this.finger.setPosition(postion);

        this.finger.getComponent("Finger").moveUp();
    },

    spawnPlayer: function spawnPlayer(postion) {

        this.player = cc.instantiate(this.playerPrefab);
        this.node.addChild(this.player);

        postion.x = this.firstFinger.x;
        postion.y = this.node.height / 2;

        this.player.setPosition(postion);

        this.player.getComponent("Player").moveDown(cc.v2(postion.x, -this.node.height / 2 + this.firstFinger.height + this.player.height / 2));
    },

    random: function random(min, max) {
        return Math.floor(Math.random() * (max - min + 1) + min);
    }
});

cc._RF.pop();