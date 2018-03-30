// 柱状图

var H5ComponentBar_v = function(name,cfg){
    var component = new H5ComponentBase(name,cfg);
    
    $.each(cfg.data,function(idx,item){

    	var width = ( 100 / cfg.data.length) >>0;

    	var line = $('<div class="line"></div>')
    	var name = $('<div class="name">	</div>')
    	var rate = $('<div class="rate">	</div>')
    	var per = $('<div class="per">	</div>')

    	var height = item[1]*100+ '%';

    	line.css('width',width+'%');

    	var bgStyle='';
    	if(item[2]){
    		bgStyle = 'style = "background-color:'+item[2]+';"'
    	}

    	rate.html('<div class="bg" '+bgStyle+'></div>');

    	rate.css('height',height);

    	name.text(item[0]);

    	per.text(height);

    	rate.append(per);

    	line.append(name).append(rate);

    	component.append(line);



    })

    return component;
}
