/*基本折线对象*/

var H5ComponentPolyline = function(name,cfg){

    var component = new H5ComponentBase(name,cfg);

    // 绘制网格-背景层
    
    var w = cfg.width;
    var h = cfg.height;
    // 加入一块画布
    var cns = document.createElement('canvas');
    var cxt = cns.getContext('2d');
    cns.width = cxt.width =w;
    cns.height = cxt.height =h;
    component.append(cns);

    // 水平网格  100份  ->  10份
    var step = 10;
    cxt.beginPath();
    cxt.lineWidth = 1;
    cxt.strokeStyle = '#aaaaaa';

    window.cxt = cxt;

    for(var i=0;i<step+1;i++){
        var y = (h/step)*i;
        cxt.moveTo(0,y);
        cxt.lineTo(w,y);
    }

    // 垂直网格线

    step = cfg.data.length+1;
    var text_w = w/step;
    for(var i=0;i<step+1;i++){
        var x =(w/step)*i;
        cxt.moveTo(x,0);
        cxt.lineTo(x,h);
    

        if(cfg.data[i]){
            var text = $('<div class="text"></div>')
            text.text( cfg.data[i][0]);
            text.css('width',text_w/2).css('left',(x/2-text_w/4)+text_w/2)

            component.append(text);
    
        }
    } 

    cxt.stroke();
    component.append(cns);
    
    // 绘制折线-折现层
    var cns = document.createElement('canvas');
    var cxt = cns.getContext('2d');
    cns.width = cxt.width =w;
    cns.height = cxt.height =h;
    

    // 绘制折线以及对应的阴影
    var draw = function( per ){
    //清空画布
    cxt.clearRect(0,0,w,h);
    // 绘制折线数据
    cxt.beginPath();
    cxt.lineWidth = 3;
    cxt.strokeStyle = '#ff8878';

    var x = 0;
    var y = 0;
    // cxt.moveTo(10,10);
    // cxt.arc(10,10,5,0,2*Math.PI);

    var row_w = w/(cfg.data.length+1);

    for(i in cfg.data){
        var item = cfg.data[i];
        x = row_w*i+row_w;
        y = h-item[1]*h*per;
        cxt.moveTo(x,y);
        cxt.arc(x,y,5,0,2*Math.PI);
    }

    // 连线
      //  移动画笔到第一个数据点的位置
    cxt.moveTo(row_w,h-cfg.data[0][1]*h*per);
    for(i in cfg.data){
        var item = cfg.data[i];
        x = row_w*i+row_w;
        y = h-item[1]*h*per;
        cxt.lineTo(x,y);
    }

    cxt.stroke();

    cxt.lineWidth = 1;
    cxt.strokeStyle =  'rgba(255,136,120,0)';

    //绘制阴影
    cxt.lineTo(x,h);
    cxt.lineTo(row_w,h);
    cxt.fillStyle =  'rgba(255,136,120,0.2)';
    cxt.fill();

    //写数据
    for(i in cfg.data){
        var item = cfg.data[i];
        x = row_w*i+row_w;
        y = h-item[1]*h*per;
        cxt.fillStyle = item[2]?item[2]:'#595959';
        cxt.fillText((item[1]*100)+'%',x-10,y-10);
    }

    cxt.stroke();

    };

    component.on('onLoad',function(){
        //折线生长动画
        var s = 0;
        for(var i=0;i<100;i++){
            setTimeout(function(){
                s += .01;
                draw(s);
            },i*10+500);
            
        }
    })

    component.on('onLeave',function(){
        //折线生长动画
        var s = 1;
        for(var i=0;i<100;i++){
            setTimeout(function(){
                s -= .01;
                draw(s);
            },i*10);
            
        }
    })



    component.append(cns);

    return component;
}