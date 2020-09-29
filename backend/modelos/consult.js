eje = function(arrays,redisClient,ws) {
	return new Promise(function(resolve, reject) {

		//{"r":"consult","d":[1]}
		var numero = /^[0-9\.\,]{0,3}/;

		if (arrays[0]!=="" && arrays.length<3 && numero.test(arrays[0]) && arrays[0]>0){

			function search(init,end,values){
				if(init == end){
					console.log("finish");
				}else{
					redisClient.get(values[init],function(err,data){
						ws.send(JSON.stringify({"db":true,"data":data}));
						init++;
						search(init,end,values);
					});
				}
			}

			redisClient.keys("reg_*",function(err,values){
				if(values.length>0){
					var maxi = parseInt(arrays[0]) * 20, min = maxi - 20;
					search(min,maxi,values);
				}else{
					reject([false,"4"]);
				}
			});

		}else{
			reject([false,"3"]);
		}

	});
};

module.exports = eje;
