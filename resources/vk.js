var VKID=0;
var VKNAME='UNKNOWN VK USER';
function VKTest(){
	if(typeof VK !='undefined'){
		try{
		  VK.init(function() {
			 console.log( 'API initialization succeeded');
			 VKGetInfo();
		  }, function() {
			 console.log( 'API initialization failed');
			 VKID=0;
			 VKNAME="UNKNOWN VK USER";
		}, '5.28');
		}catch(e){
		 console.log( 'VKTest: '+e);
		}
		}
}

function VKGetInfo(){
		
			VK.api("users.get", {}, function(data) {  
			if(data.response)
				if(data.response.length>0){
					VKID=data.response[0].id;
					VKNAME =data.response[0].first_name +' '+ data.response[0].last_name ;
				}
			
		  });  
	 
}

VKTest();