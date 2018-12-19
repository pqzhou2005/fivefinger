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
        
        rotateDuration: 0.5,

    },

    // LIFE-CYCLE CALLBACKS:

    onLoad () {

        this.currentLength = 0;
        //伸缩状态
        this.state = 0;   
    },

    start () {

    },

    update (dt) {

        if(this.state == 0 && this.currentLength < this.node.height) {

            this.currentLength += this.stretchEachLength;
            this.node.setScale(this.currentLength/this.node.height);
        }      
    }, 

    stopStretch : function() {        
        //停止伸缩
        this.state = 1; 
    },    

    rotate : function(callback,target) {

        if(this.state==0 && this.currentLength >= 10) {
            this.stopStretch();
            this.node.runAction(cc.sequence(new cc.RotateBy(this.currentLength*this.rotateDuration/100, 90),cc.callFunc(callback,target)));
        }        
    },

    getCurrentLength() {
        return this.currentLength;
    },    

});
