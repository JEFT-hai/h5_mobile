/*环图对象*/

var H5ComponentRing = function(name,cfg){

    var component = new H5ComponentBase(name,cfg);

    // 绘制网格-背景层

    var w = cfg.width;
    var h = cfg.height;
    // 加入一块画布
    var cns = document.createElement('canvas');
    var cxt = cns.getContext('2d');
    cns.width = cxt.width =w;
    cns.height = cxt.height =h;
    $(cns).css('z-index',1);
    component.append(cns);

    var r = w/2;

    //加入一个底层图
    cxt.beginPath();
    cxt.fillStyle='#eee';
    cxt.lineWidth = .01;
    cxt.arc(r,r,r,0,2*Math.PI);
    cxt.fill();
    cxt.stroke();

    //加入一个数据层
    var cns = document.createElement('canvas');
    var cxt = cns.getContext('2d');
    cns.width = cxt.width =w;
    cns.height = cxt.height =h;
    $(cns).css('z-index',2);
    component.append(cns);


    var colors = ['red','green','blue','orange'];//备用颜色
    var sAngel = 1.5*Math.PI;// 设置开始的角度在 12 点位置
    var eAngel = 0;
    var aAngel = Math.PI*2; // 100%的圆结束的角度

    
    
    var step = cfg.data.length;
    for(var i=0;i<step;i++){

        var item = cfg.data[i];
        var color = item[2]||( item[2] = colors.pop() );

        eAngel = sAngel + aAngel*item[1];

        cxt.beginPath();
        cxt.fillStyle=color;
        cxt.strokeStyle = color;
        cxt.lineWidth = .1;

        cxt.moveTo(r,r);
        cxt.arc(r,r,r,sAngel,eAngel);
        cxt.fill();
        cxt.stroke();

        sAngel = eAngel;

        //加入所有的项目文本以及百分比
        
        var text = $('<div class="text"></div>')
        text.text(item[0]);
        var per = $('<div class="per"></div>')
        per.text(item[1]*100+'%');

        text.append(per);

        // var x = r + Math.sin(.5*Math.PI-sAngel)*r;
        // var y = r + Math.cos(.5*Math.PI-sAngel)*r;

        // if(x>w/2){
        //     text.css('left',x/2+5);
        // }else{
        //     text.css('right',(w-x)/2+5);
        // }

        // if(y>h/2){
        //     text.css('top',y/2+5);
        // }else{
        //     text.css('bottom',(h-y)/2+5);
        // }

        if(cfg.data[i][2]){
            text.css('color',cfg.data[i][2])
        }

        text.css('opacity',0);

        var mask = $('<div class="mask"></div>')

        component.append(mask);

        mask.append(text);
        

    }
    
    //加入一个蒙板层
    var cns = document.createElement('canvas');
    var cxt = cns.getContext('2d');
    cns.width = cxt.width =w;
    cns.height = cxt.height =h;
    $(cns).css('zIndex',3);
    component.append(cns);


        cxt.fillStyle='#eee';
        cxt.strokeStyle = '#eee';
        cxt.lineWidth = .01;



    var draw = function( per ){

        cxt.clearRect(0,0,w,h);

        cxt.beginPath();
        
        cxt.moveTo(r,r);

        if(per <= 0){
        cxt.arc(r,r,r,0,Math.PI*2);
        component.find('.text').css('opacity',0);
        }else{
            cxt.arc(r,r,r,sAngel,sAngel+2*Math.PI*per,true);
        }

        if( per >= 1){
            component.find('.text').css('opacity',1);
        }

        //cxt.arc(r,r,r,sAngel,eAngel);
        cxt.fill();
        cxt.stroke();
    }

            

        
    
     draw(0);
    
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