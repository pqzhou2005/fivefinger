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
        moveDownDuration : 1,
        moveDuration : 1,
    },

    // LIFE-CYCLE CALLBACKS:

    onLoad () {
   
              
        

        // this.node.runAction(cc.rotateBy(0.1,30));
    },

    start () {

    },

    // update (dt) {},

    moveDown : function(postion,callback,target) {
        this.node.runAction(cc.sequence(new cc.moveTo(this.moveDownDuration, postion),cc.callFunc(callback,target)));  
    },

    move : function(postion) {

        var animation = this.getComponent(cc.Animation);
        var animState = animation.play("playermove");

        animState.speed = 10;    
        animState.wrapMode = cc.WrapMode.Loop;
        animState.repeatCount = Infinity;

        var finishAction = cc.callFunc(function () {           
            
            animState.stop();
            this.node.dispatchEvent( new cc.Event.EventCustom('playerMoveOver', true));

        },this,animState);

        return this.node.runAction(cc.sequence(new cc.moveBy(this.moveDuration, postion),finishAction));
    },  

    moveAndFail : function(postion) {
        //移动结束
        var finishAction = cc.callFunc(function () {
           this.node.dispatchEvent( new cc.Event.EventCustom('gameOver', true));
       },this);

       this.node.runAction(cc.sequence(new cc.moveBy(this.moveDuration, postion),finishAction));  
   },

   getFooterPostion : function() {
        return cc.v2(this.node.x,this.node.y-this.node.height/2);
   }
    

});
