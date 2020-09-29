eje = function(arrays,redisClient,ws) {
	return new Promise(function(resolve, reject) {

		//{"r":"request","d":[1]}
		var numero = /^[0-9\.\,]{0,3}/;

		if (arrays[0]!=="" && arrays.length<3 && numero.test(arrays[0])){

            redisClient.monitor(function(err, res) {});

            redisClient.on("monitor", function(time, args, rawReply) {
                if(args[0]=="set"){
                    ws.send(args[2]);
                }
            });

			try{
				const { exec } = require('child_process');
				exec('node consult.js '+arrays[0], (error, stdout, stderr) => {
					if (error) {
						require('child_process').exec(`killall chrome`);
					}
				});
			}catch(e){
				require('child_process').exec(`killall chrome`);
			}

		}else{
			reject([false,"3"]);
		}

	});
};

module.exports = eje;
