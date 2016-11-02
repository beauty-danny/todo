$(function(){
	var add=$('.add');
	var input=$('input');
	var ul=$('.todolist');
	var arr=[];//数组
	var leftpos;//起始位置
	if(localStorage.arr){
		arr=JSON.parse(localStorage.arr);
		render();
	}
	//render位置	
	function render(){
		for(var i=0;i<arr.length;i++){
			var cla=(arr[i].states)? 'down':'';
			$("<li class='"+cla+"'><div class='content'>"+arr[i].name+"</div><div class='delete'></div></li>").appendTo('ul');
		}
	}
	//添加事件
	add.on('touchstart',function(){
		var val=$.trim(input.val());//input值
		if(val==''){
			return;
		}
		var todotext={
			name:val,
			states:0
		}
		arr.push(todotext);//对象放入数组
		localStorage.arr=JSON.stringify(arr);
		$("<li><div class='content'>"+todotext.name+"</div><div class='delete'></div></li>").appendTo('ul');
		input.val('');
	})
	//左右确定
	$('ul').on('touchstart','li',function(e){
			leftpos=e.originalEvent.changedTouches[0].clientX;
	})
	$('ul').on('touchend','li',function(e){
			var rightpos=e.originalEvent.changedTouches[0].clientX;
			if(rightpos-leftpos>40){
				var index=$(this).index();
				$('ul li').eq(index).addClass('down');				
				arr[index].states=1;
				localStorage.arr=JSON.stringify(arr);
				
			}else if(rightpos-leftpos<-40){
				var index=$(this).index();
				$('ul li').eq(index).removeClass('down');				
				arr[index].states=0;
				localStorage.arr=JSON.stringify(arr);
			}
	})
	
})





//
