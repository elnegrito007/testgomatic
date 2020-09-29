
//node consult.js 1

var redis = require('redis'),
	redisClient = redis.createClient({host : 'redis-16446.c228.us-central1-1.gce.cloud.redislabs.com', port : 16446});
redisClient.auth('fDDMk1f5hN0cQe6Buv9xKliziGgnDssv',function(err,reply) {
	if(!err) {
		console.log(Date()," Ok: redis init");
	}else{
		console.log(Date()," Not: redis ");
	}
});

redisClient.on('ready',function() {
	console.log(Date()," Ok: redis ready");
});

redisClient.on('error',function() {
	console.log(Date()," Not: redis ready");
});


var pag = process.argv[2];

const chrome = require('selenium-webdriver/chrome');

if(pag!==undefined){

	require('chromedriver');
	const {Builder, By, Key, until} = require('selenium-webdriver');

	(async function example() {

	  var driver = await new Builder().forBrowser('chrome').setChromeOptions(new chrome.Options().addArguments('--headless','--log-level=2')).build();

	  try {

		await driver.get('https://www.grants.gov/web/grants/search-grants.html');
		await driver.switchTo().frame(0);
		await driver.findElement(By.id("searchBtn")).sendKeys(Key.ENTER);

		function extract(){
			setTimeout(async function () {
				var num = 0,list = [];

				async function consultCel(num) {
					if (num == 27) {
						console.log("FINISH");
					} else {
						let Colum1 = await driver.findElement(By.xpath("//div/table/tbody/tr[" + num + "]/td/a")).getText();
						let Colum2 = await driver.findElement(By.xpath("//div/table/tbody/tr[" + num + "]/td[2]")).getText();
						let Colum3 = await driver.findElement(By.xpath("//div/table/tbody/tr[" + num + "]/td[3]")).getText();
						let Colum4 = await driver.findElement(By.xpath("//div/table/tbody/tr[" + num + "]/td[4]")).getText();
						let Colum5 = await driver.findElement(By.xpath("//div/table/tbody/tr[" + num + "]/td[5]")).getText();
						let Colum6 = await driver.findElement(By.xpath("//div/table/tbody/tr[" + num + "]/td[6]")).getText();

						var obj = {
							"opportunity_number": Colum1,
							"opportunity_tittle": Colum2,
							"agency": Colum3,
							"opportunity_status": Colum4,
							"posted_date": Colum5,
							"posted_close": Colum6,
							"extraInfo": "x"
						};

						await driver.findElement(By.xpath("//a[contains(text(),'"+Colum1+"')]")).sendKeys(Key.ENTER);
						setTimeout(async function () {

							let selector = "";
							try{
								let elector = await driver.findElement(By.xpath("//div[@id='forecastDetailsContent']/table/tbody/tr[2]/td")).getText();
								if(elector!==""){
									selector = "forecastDetailsGeneralInfoTableLeft";
								}

								let Colunm1 = await driver.findElement(By.xpath("//div[@id='"+selector+"']/table/tbody/tr[1]/td/span")).getText();
								let Colunm2 = await driver.findElement(By.xpath("//div[@id='"+selector+"']/table/tbody/tr[2]/td/span")).getText();
								let Colunm3 = await driver.findElement(By.xpath("//div[@id='"+selector+"']/table/tbody/tr[3]/td/span")).getText();
								let Colunm4 = await driver.findElement(By.xpath("//div[@id='"+selector+"']/table/tbody/tr[4]/td/span")).getText();
								let Colunm5 = await driver.findElement(By.xpath("//div[@id='"+selector+"']/table/tbody/tr[5]/td/span")).getText();
								let Colunm6 = await driver.findElement(By.xpath("//div[@id='"+selector+"']/table/tbody/tr[6]/td/span")).getText();
								let Colunm7 = await driver.findElement(By.xpath("//div[@id='"+selector+"']/table/tbody/tr[7]/td/span")).getText();
								let Colunm8 = await driver.findElement(By.xpath("//div[@id='"+selector+"']/table/tbody/tr[8]/td/span")).getText();
								let Colunm9 = await driver.findElement(By.xpath("//div[@id='"+selector+"']/table/tbody/tr[9]/td/span")).getText();
								let Colunm10 = await driver.findElement(By.xpath("//div[@id='"+selector+"']/table/tbody/tr[10]/td/span")).getText();
								let Colunm11 = await driver.findElement(By.xpath("//div[@id='"+selector+"']/table/tbody/tr[11]/td/span")).getText();

								obj.extraInfo =  {"GI1":Colunm1,"GI2":Colunm2,"GI3":Colunm3,"GI4":Colunm4,"GI5":Colunm5,"GI6":Colunm6,"GI7":Colunm7,"GI8":Colunm8,"GI9":Colunm9,"GI10":Colunm10,"GI11":Colunm11};
								list.push(obj);

								redisClient.set("reg_"+obj.opportunity_number,JSON.stringify(obj),function () {
									console.log("Almacenado "+ Colunm1);
								});
								setTimeout(async function () {
									await driver.executeScript('javascript:history.back();');

									setTimeout(async function () {
										num++;
										await consultCel(num);
									},3000);

								},3000);

							}catch (e) {
								selector = "synopsisDetailsGeneralInfoTableLeft";

								let Colunm1 = await driver.findElement(By.xpath("//div[@id='"+selector+"']/table/tbody/tr[1]/td/span")).getText();
								let Colunm2 = await driver.findElement(By.xpath("//div[@id='"+selector+"']/table/tbody/tr[2]/td/span")).getText();
								let Colunm3 = await driver.findElement(By.xpath("//div[@id='"+selector+"']/table/tbody/tr[3]/td/span")).getText();
								let Colunm4 = await driver.findElement(By.xpath("//div[@id='"+selector+"']/table/tbody/tr[4]/td/span")).getText();
								let Colunm5 = await driver.findElement(By.xpath("//div[@id='"+selector+"']/table/tbody/tr[5]/td/span")).getText();
								let Colunm6 = await driver.findElement(By.xpath("//div[@id='"+selector+"']/table/tbody/tr[6]/td/span")).getText();
								let Colunm7 = await driver.findElement(By.xpath("//div[@id='"+selector+"']/table/tbody/tr[7]/td/span")).getText();
								let Colunm8 = await driver.findElement(By.xpath("//div[@id='"+selector+"']/table/tbody/tr[8]/td/span")).getText();
								let Colunm9 = await driver.findElement(By.xpath("//div[@id='"+selector+"']/table/tbody/tr[9]/td/span")).getText();
								let Colunm10 = await driver.findElement(By.xpath("//div[@id='"+selector+"']/table/tbody/tr[10]/td/span")).getText();
								let Colunm11 = await driver.findElement(By.xpath("//div[@id='"+selector+"']/table/tbody/tr[11]/td/span")).getText();

								obj.extraInfo =  {"GI1":Colunm1,"GI2":Colunm2,"GI3":Colunm3,"GI4":Colunm4,"GI5":Colunm5,"GI6":Colunm6,"GI7":Colunm7,"GI8":Colunm8,"GI9":Colunm9,"GI10":Colunm10,"GI11":Colunm11};
								list.push(obj);

								redisClient.set("reg_"+obj.opportunity_number,JSON.stringify(obj),function () {
									console.log("Almacenado "+ Colunm1);
								});

								setTimeout(async function () {
									await driver.executeScript('javascript:history.back();');

									setTimeout(async function () {
										num++;
										await consultCel(num);
									},2000);

								},2000);

							}

						},2000);

					}
				}

				consultCel(2);
			}, 2000);
		}

		if(pag>1){
			await driver.executeScript('javascript:pageSearchResults("'+pag+'");');
			extract();
		}else if(pag==1) {
			extract();
		}else{
			console.log("Not found arg");
		}
	  } finally {}

	})();

}else{
	console.log('Not found arg');
}
