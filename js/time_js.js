var epoch = {
	name : '.epoch'
};

var clouds = {
	initialLoad: true,
	
	create_clouds: function(){
		//append a cloud to the body
		var cloud = $("<div class='clouds'></div>");
		$('body').append(cloud);
		clouds.set_clouds(cloud);
	},
	
   set_clouds: function(cloud){
	   //grab all the clouds, set them in random places
		if(clouds.initialLoad){
			$(cloud).css({'top': Math.random()*100+"%",'left': Math.random()*100+"%"});
		}else{
			$(cloud).css({'top': "100%",'left': Math.random()*100+"%"});
		}
		
		clouds.animate_clouds(cloud);
	},

    animate_clouds: function(obj){
		//all the clouds move left at different random speeds. At the end of their animation, they
		//disappear. Like tears in the rain. 
		
		//at every step, move a certain distance upwards to compensate for the background scrolling?
		$(obj).animate({
			top: "-20px"
			},{
				//(Math.random()*100000)+50000
			duration: 15000,
			step: function(now,fx){
				$(fx.elem).css("left", "-=0.2%");
			},
			complete: function(){
				(this).remove();
				clouds.create_clouds();
			}
			});
	}
};

var background = {
	background_move : function(){
		$('body').animate({backgroundPosition: '0 +=150%'},5000,"linear",function(){
			background.background_move();
		});
	}
};

//in retrospect this could be a gif
function animation_control(obj){
	obj.current_frame = obj.current_frame+1;
	if(obj.current_frame>obj.max_frames){
		obj.current_frame = 0;
	}
	$(obj.name).css('background-position', obj.frames[obj.current_frame]);
}

$(function(){
	//create a random number of clouds from 1-4. That's a good number of clouds. I like it.
	for(var i=0;i<=Math.floor((Math.random()*4)+1);i++){
		clouds.create_clouds();
	}
	
	clouds.initialLoad = false;
	background.background_move();
});