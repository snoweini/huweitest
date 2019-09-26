<template>
	<view class="content">
		
		<view class="index_main">
			<view class="top">
				<text class="top-txt">九九乘法表</text>
			</view>
			<view class="main">
				
				<view class="number-index">
					<img v-for="(item,key) in numberIndex" :key="key" :src="item.src"
					 mode="widthFix" class="num-pic" @tap="numberIndexTap(item)"/>
				</view>
				<view class="content-wrap">
					<view class="content">
						<view class="text-wrap" v-for="(item,key) in numberList" :key="key">
							<text class="text num">{{currentNumber}}</text>
							<text class="text">X</text>
							<text class="text num">{{item}}</text>
							<text class="text">=</text>
							<text class="text num">{{currentNumber*item}}</text>
						</view>
					</view>
					<view class="button">
							<img @tap="handleAudioTap" class="icon-speaker" mode="widthFix" src="../../static/img/speaker.png"/>
							<text class="text" @tap="handleAudioTap">{{audioText}}</text>
					</view>
				</view>
				<view class="calculation-wrap">
					<view class="select-wrap">
						<view class="select">
							<view  :class="[item.isSelected?'selected':'','number']" v-for="(item,key) in numberIndexTop" :key="key" @tap="handleNumToptap(item)">{{item.num}}</view>
						</view>
						<text>乘</text>
						<view class="select">
							<view :class="[item.isSelected?'selected':'','number']" v-for="(item,key) in numberIndexBottom" :key="key" @tap="handleNumBottomtap(item)">{{item.num}}</view>
						</view>
					</view>
					<view @tap="calculateNum" class="button">计算</view>
					<view class="result">
						<text class="text">{{currentNumTop}}</text>
						<text class="text">X</text>
						<text class="text">{{currentNumBottom}}</text>
						<text class="text">=</text>
						<text class="text">{{resultNum}}</text>
					</view>
				</view>
				
			</view>
		</view>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				numberIndex: [ {
						key: 0,
						isSelected: !1,
						src: "../../static/img/one.png",
						seleSrc: "../../static/img/one_sele.png"
					}, {
						key: 1,
						isSelected: !1,
						src: "../../static/img/two.png",
						seleSrc: "../../static/img/two_sele.png"
					}, {
						key: 2,
						isSelected: !1,
						src: "../../static/img/three.png",
						seleSrc: "../../static/img/three_sele.png"
					}, {
						key: 3,
						isSelected: !1,
						src: "../../static/img/four.png",
						seleSrc: "../../static/img/four_sele.png"
					}, {
						key: 4,
						isSelected: !1,
						src: "../../static/img/five.png",
						seleSrc: "../../static/img/five_sele.png"
					}, {
						key: 5,
						isSelected: !1,
						src: "../../static/img/six.png",
						seleSrc: "../../static/img/six_sele.png"
					}, {
						key: 6,
						isSelected: !1,
						src: "../../static/img/seven.png",
						seleSrc: "../../static/img/seven_sele.png"
					}, {
						key: 7,
						isSelected: !1,
						src: "../../static/img/eight.png",
						seleSrc: "../../static/img/eight_sele.png"
					}, {
						key: 8,
						isSelected: !1,
						src: "../../static/img/nine.png",
						seleSrc: "../../static/img/nine_sele.png"
					} ],
				numberList: [ 1, 2, 3, 4, 5, 6, 7, 8, 9 ],
				numberIndexTop: [ {
					key: 0,
					isSelected: !0,
					num: 1
				}, {
					key: 1,
					isSelected: !1,
					num: 2
				}, {
					key: 2,
					isSelected: !1,
					num: 3
				}, {
					key: 3,
					isSelected: !1,
					num: 4
				}, {
					key: 4,
					isSelected: !1,
					num: 5
				}, {
					key: 5,
					isSelected: !1,
					num: 6
				}, {
					key: 6,
					isSelected: !1,
					num: 7
				}, {
					key: 7,
					isSelected: !1,
					num: 8
				}, {
					key: 8,
					isSelected: !1,
					num: 9
				} ],
				numberIndexBottom: [ {
					key: 0,
					isSelected: !0,
					num: 1
				}, {
					key: 1,
					isSelected: !1,
					num: 2
				}, {
					key: 2,
					isSelected: !1,
					num: 3
				}, {
					key: 3,
					isSelected: !1,
					num: 4
				}, {
					key: 4,
					isSelected: !1,
					num: 5
				}, {
					key: 5,
					isSelected: !1,
					num: 6
				}, {
					key: 6,
					isSelected: !1,
					num: 7
				}, {
					key: 7,
					isSelected: !1,
					num: 8
				}, {
					key: 8,
					isSelected: !1,
					num: 9
				} ],
				currentNumber: 1,
				currentNumTop: 1,
				currentNumBottom: 1,
				resultNum: 1,
				isAudioPlaying: !1,
				music:'../../static/music/mcltable.mp3',
				audio:null,
				audioText: "播放乘法口诀表"
			}
		},
		onLoad() {
			  
		},
		methods: {
		  handleAudioTap(){
			 var _this = this;
			 if(!this.audio){
				 this.audio = uni.createInnerAudioContext();
				 this.audio.src = this.music;
				 this.audio.loop = true;
				 this.audio.play();
				 this.audio.onPlay(()=>{
					 _this.audioText = '轻触暂停'
				 })
			 }else{
				 if(!this.audio.paused){
					this.audio.pause(); 
					this.audio.onPause(()=>{
						 _this.audioText = '轻触继续'
					 }) 
				 }else{
					 this.audio.play();
					 this.audio.onPlay(()=>{
						 _this.audioText = '轻触暂停'
					 }) 
				 }
				 
			 }
			 
		  },
		  numberIndexTap(item){ 
			 if(!item.isSelected){
				 this.numberIndex.forEach(item=>{
					 if(item.isSelected){
						 [item.src,item.seleSrc] = [item.seleSrc,item.src]
						 item.isSelected = !1
					 }
				 });
				 
				 [item.src,item.seleSrc] = [item.seleSrc,item.src]
				 this.currentNumber = item.key+1 
				 item.isSelected = !0
			 }
		  },
		  handleNumToptap(item){
			  this.numberIndexTop.forEach((item,key)=>{
				  item.isSelected = !1
			  })
			  item.isSelected = !0
			  this.currentNumTop = item.num
			  this.resultNum = ''
		  },
		  handleNumBottomtap(item){
			  this.numberIndexBottom.forEach((item,key)=>{
				  item.isSelected = !1
			  })
			  item.isSelected = !0
			  this.currentNumBottom = item.num
			  this.resultNum = ''
		  },
		  calculateNum(){
			  this.resultNum = this.currentNumTop*this.currentNumBottom
		  },
       
		}
	}
</script>

<style>
ul,li{margin:0;padding:0;}
uni-page-body, uni-page-refresh{height:100%;}
.content{height:100%; width:100%;background:url(../../static/img/bg.png) no-repeat;
background-size:cover;}
view,text {box-sizing: border-box;}
.index_main {width: 100%;height: 100%;font-size: 30rpx;overflow: hidden;display: flex; flex-direction: column; }
.index_main .top { width: 100%;font-size: 30rpx;height:150upx; position: relative;}
.top-txt{font-size:40upx;position: absolute;left: 30upx;bottom: 30upx;color: #333;}
.main{width:100%;height:auto;flex:1;overflow: auto;}
.number-index {
    width: 690rpx;
    height: 70rpx;
    margin: 0 auto;
    margin-top: 30rpx;
    padding: 0 50rpx;
    display: flex;
    justify-content: space-between;
    align-items: center;
    background: #fff;
    border-radius: 35rpx;
    box-sizing: border-box;
}

.number-index .num-pic {width: 40rpx; height: 40rpx;}

.content-wrap {
    width: 690rpx;
    height: 330rpx;
    margin: 30rpx auto 0 auto;
    overflow: hidden;
    border-radius: 25rpx;
    background: #fff;
    box-sizing: border-box;
    padding: 40rpx 0 30rpx 0;
}

.content-wrap .content {
    height: 195rpx;
    padding: 0 50rpx;
    display: flex;
    flex-wrap: wrap;
    justify-content: space-between;
    align-content: space-between;
	background:#fff;
}
.content-wrap .content .text-wrap {
    width: 150rpx;
    display: flex;
    justify-content: space-between;
    align-content: center;
}

.content-wrap .content .text-wrap:nth-child(3n) {
    margin-right: 0;
}

.content-wrap .content .text {
    color: #222;
    font-size: 40rpx;
}

.content-wrap .content .num {
    width: 26rpx;
}

.content-wrap .button {
    height: 35rpx;
    margin-top: 30rpx;
    margin-left: 50rpx;
    display: flex;
    justify-content: flex-start;
    align-items: center;
}

.content-wrap .button .icon-speaker {
    width: 40rpx;
    height: 40rpx;
    margin-right: 15rpx;
}

.content-wrap .button .text {
    color: #bbbbbb;
    font-size: 24rpx;
}

.calculation-wrap {
    width: 690rpx;
    height: 520rpx;
    margin: 40rpx auto 0 auto;
    padding: 50rpx;
    overflow: hidden;
    border-radius: 25rpx;
    background: #fff;
    box-sizing: border-box;
}

.calculation-wrap .select-wrap {
    display: flex;
    flex-direction: column;
    justify-content: flex-start;
    align-items: center;
}

.calculation-wrap .select-wrap .select {
    width: 100%;
    display: flex;
    justify-content: space-between;
    align-items: center;
}

.calculation-wrap .select-wrap .select .number {
    width: 68rpx;
    height: 68rpx;
    line-height: 68rpx;
    text-align: center;
    border-radius: 50%;
    color: #222;
    font-size: 43rpx;
}

.calculation-wrap .select-wrap .select .selected {
    color: #fff;
    background: #94bd3a;
}

.calculation-wrap .select-wrap text {
    color: #aaa;
    font-size: 30rpx;
    margin: 28rpx 0;
}

.calculation-wrap .button {
    width: 280rpx;
    height: 70rpx;
    line-height: 70rpx;
    margin: 60rpx auto 0 auto;
    border-radius: 35rpx;
    background: #94bd3a;
    color: #fff;
    font-size: 36rpx;
    text-align: center;
}

.calculation-wrap .result {
    margin-top: 30rpx;
    text-align: center;
    font-size: 45rpx;
    color: #222;
}
</style>
