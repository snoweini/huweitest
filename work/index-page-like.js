 function likeFun(newsId,$obj){
    this.snum = 1;
    this.newsId = newsId;
    this.con = $obj;
 };
 likeFun.prototype = {
    init:function(){
      var _this = this;
      $.ajax({
            url:'/user/comment/article/usatcopt',
            data:{'newsId':_this.newsId},
            dataType:'json',
            type:'GET',
            success:function(data){
              if(data.status == 1214){//没登录
                 return false;
              }
              if(data.data.userArticleOpt.likeStatus>0){
                _this.snum = 0;
                _this.con.addClass('cur');
              }else{
                console.log(data.msg);
                _this.snum = 1;
                _this.con.removeClass('cur'); 
              }
            }
       });
   },
   clickfn:function(newsId,snum){
    var _this = this;
      $.ajax({
            url:'/user/comment/article/like',
            data:{'newsId':newsId,'status':snum},
            dataType:'json',
            type:'POST',
            success:function(data){
              if(data.code==0){  
                if(snum == 1){
                    _this.con.addClass('cur');
                    _this.snum = 0; 
                }else{
                    _this.con.removeClass('cur');
                    _this.snum = 1;
                }
                
              }else{
                alert('请先登录再点赞！');
                localStorage.clear();
                location.reload(); 
              }
            }
        });
   },
   start:function(){
      var _this = this;
      this.init();
      _this.con.click(function(){ 
        _this.clickfn(_this.newsId,_this.snum); 
      });
   }
 };
//each
$('.tuijian-pic li').each(function(){
    var newsId = $(this).attr('data-question');
    var $obj = $(this).find('i');
    new likeFun(newsId,$obj).start();
})

/* var likeObj = new likeFun('1000600000038461556158118507499250');

 likeObj={
   snum:1,
   urlArr : location.href.split('/').reverse(),
   newsId: location.href.split('/').reverse()[0].split('_')[0],
   

 }  
 likeObj.start();
 */
/////////////////////
