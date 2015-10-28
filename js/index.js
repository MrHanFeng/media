var video_play
var back_fn;

$(function(){
    /*导航切换*/
    var menu_li=$('.menu li');
    var detail=$('.details .detail');
    menu_li.click(function(){
        menu_li.removeClass('cate-hover');
        detail.removeClass('dt-hover');
        $(this).addClass('cate-hover');
        var key=$(this).index();
        detail.eq(key).addClass('dt-hover');
    });

    /*广告滚动*/
    var ad_img=$('.ad_img li');
    var a_i=$('.ad_tip .a_i');
    a_i.click(function(){
        var key=a_i.index($(this));
        ad_img.removeClass('img-hover');
        ad_img.eq(key).addClass('img-hover');
        a_i.removeClass('a_i-hover');
        $(this).addClass('a_i-hover');
    });

    /*添加音乐榜单*/
    var vo_data=['默 - 那英.mp3','汪峰 - 北京北京.mp3','周华健-朋友.mp3','陈奕迅 - 兄弟.mp3','筷子兄弟 - 老男孩.mp3','陈奕迅 - 浮夸.mp3','张宇 - 雨一直下.mp3','郑智化-水手.mp3','凤凰传奇 - 荷塘月色.mp3'];
    var list_detail=$('.list_detail');
    var music_controll=$('.music_controll');//获取音频控制模块

    /*导入音乐列表*/
    show_list();
    function show_list(){
        var tpl="<ul>";
        tpl +="<li><cneter><h3>当前音乐</h3></cneter></li>";
        $.each(vo_data,function(i,v){
            var music_name= v.split(".");
            tpl += "<li class='list_li'>"+music_name[0];
            tpl += "</li>"
        });
        tpl +="</ul>";
        //alert(tpl);
        list_detail.html(tpl);
        list_li=$('.list_li');
    }
    list_li.click(function(){
       list_li.removeClass('list_li-hover')
       $(this).addClass('list_li-hover');
        var key=list_li.index($(this));
        show_music_controll(key);
        music_controll.css("display","block");
    });
    /*切换播放音乐，切换控制台*/
    function show_music_controll(i){
        var tpl ='<audio controls="controls" loop="loop" id="vo-id" autoplay="autoplay">';
        tpl +='<source src="audio/'+vo_data[i]+'" type="audio/mpeg">';
        tpl +=' </audio>'+" <div class='ms_word'>当前歌曲:"+vo_data[i]+"</div>";
        music_controll.html(tpl);
    }

    /*导入播放音乐*/


    var home=$('.home');
    var index=$('.index');//获取第一页CLASS
    var music_list=$('.music_list');//获取音乐列表页面
    var play_video=$('.play_video');//获取视频播放页面
    var video=document.getElementById('video');//获取VIDEO控制台


    /*进入音乐列表页面*/ /*muisc_list_fn()在每个music_box后边加onclick事件*/
    //function muisc_list_fn(){
    //    home.removeClass('show-hover');
    //    music_list.addClass('show-hover');
    //}
    var music_box=$('.music_box');
    music_box.click(function(){
        //alert($(this).attr('data-cs'));//
        home.removeClass('show-hover');
        music_list.addClass('show-hover');
       var k= $('.music_list').find('.music_cate').html($(this).attr('data-cs')+"风格");//把当前播放的类型参数赋值
    });


    /*进入视频页面*/
    /*参数i为视频ID编号*/
    video_play=function (i){
        home.removeClass('show-hover');//不显示所有页面
        play_video.addClass('show-hover');//显示视频播放页面
        var vo_id=document.getElementById('vo-id');
        vo_id.pause();  //音乐播放暂停
        music_controll.css("display","none");//隐藏控制台
    };

    /*视频播放页面的相关操作*/
    var video_data=[
        'mtv1.mp4','mtv2.mp4','mtv3.mp4'
    ];
    var play_window=$('.play_window');
    var cn_play=$('.cn-play');
    var pre=$('.pre');
    var next=$('.next');
    var play_now=$('.play_now');
    var key=0;
    play_now.html(turn_video(key));
    cn_play.click(function(){
            if(video.paused){
                video.play();
                cn_play.html('暂停');
            }else{
                video.pause();
                cn_play.html('播放');
            }
        }
    );

    pre.click(function(){
        key-=1;
        if(key<0)key=video_data.length-1;
        play_now.html(turn_video(key));
    });
    next.click(function(){
        key+=1;
        if(key>=video_data.length)key=0;
        play_now.html(turn_video(key));
    });
    function turn_video(i){
        var change=' <video controls="controls" preload="meta" id="video"> <source src="mp4/'+video_data[i]+'" type="video/mp4"> </video>';
        play_window.html(change);
        video=document.getElementById('video'); //重新获取到VIDEO的标签
        cn_play.html('播放');
        return video_data[i];
    }




    /*返回主页*/
    back_fn=function(){
        home.removeClass('show-hover');
        index.addClass('show-hover');
        if(!video.paused){//如果返回是视屏没有暂停，让其暂停
            video.pause();
        }
    }
});




