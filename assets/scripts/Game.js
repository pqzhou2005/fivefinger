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

        minDistance:50,

        maxDistance:500,

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
        },

        gameCamera: {
            default: null,
            type: cc.Node      
        },

        scoreLabel : {
            default: null,
            type: cc.Label    
        },
        
    },

    // LIFE-CYCLE CALLBACKS:

    onLoad () { 

        this.score = 0;
        //生成第一个指头
        this.spawnFisrtFinger();

        //猴子移动结束
        this.node.on('playerMoveOver',function() {
            
            if( Math.abs(this.currentDistance - this.stick.getComponent("Stick").getCurrentLength() ) < this.finger.width/2)  {                
    
                this.stick.destroy();
                this.gameCamera.runAction(new cc.moveBy(1,cc.v2(this.currentDistance,0)));
                this.score += 1;   
                console.log(this.score);
                this.scoreLabel.string = "Score:"+this.score;        
                this.spawnRandomFinger();

            } else {                
                this.player.getComponent('Player').moveAndFail(cc.v2(0,-this.node.height/2));
            }
        },this);

        //游戏结束，切换场景
        this.node.on('gameOver', function (event) {
            event.stopPropagation();
            cc.director.loadScene('start');
        },this);
    },

    start () {

    },

    onTouchStart: function(event) {

        if(!cc.isValid(this.stick)) {            
            this.spawnStick();               
        } else {
            this.stick.getComponent('Stick').rotate(function() {
                this.player.getComponent('Player').move(cc.v2(this.stick.getComponent("Stick").getCurrentLength(),0));
            },this);        
            this.node.off(cc.Node.EventType.TOUCH_START, this.onTouchStart, this);
        }
    },

    // update (dt) {},

    spawnStick: function() {
        // 使用给定的模板在场景中生成一个新节点
        this.stick = cc.instantiate(this.stickPrefab);
        // 将新增的节点添加到 Canvas 节点下面
        this.node.addChild(this.stick);     

        var postion = this.player.getComponent("Player").getFooterPostion();
        postion.x = this.lastFinger.x;
        this.stick.setPosition(postion);
    }, 

    //生成第一个指头和猴头
    spawnFisrtFinger: function() {
        this.fisrtFinger = this.finger = cc.instantiate(this.fingerPrefab);
        this.node.addChild(this.fisrtFinger);
        
        var postion = cc.v2(0,0);
        postion.x -= this.node.width/2-this.fisrtFinger.width/2;
        postion.y -= this.node.height/2+this.fisrtFinger.height/2;

        this.fisrtFinger.setPosition(postion);
        this.fisrtFinger.getComponent("Finger").moveUp(function(){
            this.spawnPlayer();
        },this);
    },  

    //生成第二个指头
    spawnRandomFinger: function() {

        this.currentDistance =  this.random(this.minDistance,this.maxDistance);

        this.lastFinger = this.finger;
        this.finger = cc.instantiate(this.fingerPrefab);
        this.node.addChild(this.finger);

        var postion = cc.v2(0,0);
        postion.x = this.lastFinger.x + this.currentDistance;
        postion.y -= this.node.height/2 + this.fisrtFinger.height/2;

        this.finger.setPosition(postion);
        this.finger.getComponent("Finger").moveUp(function() {
            this.node.on(cc.Node.EventType.TOUCH_START, this.onTouchStart, this);
        },this);
    },  
    
    //生成猴头
    spawnPlayer: function() {

        this.player = cc.instantiate(this.playerPrefab);
        this.node.addChild(this.player);

        var postion = cc.v2(0,0);
        postion.x = this.fisrtFinger.x;
        postion.y = this.node.height/2;

        this.player.setPosition(postion);
        this.player.getComponent("Player").moveDown(cc.v2(postion.x,-this.node.height/2+this.fisrtFinger.height+this.player.height/2),function(){
            this.spawnRandomFinger();
        },this);
    },  

    //随机
    random: function(min, max) {        
        return Math.floor(Math.random()*(max-min+1)+min);
    },
});
