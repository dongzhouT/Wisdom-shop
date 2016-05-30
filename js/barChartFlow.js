//客流热力分布
$(function() {
	var data_type = METHODS.apartner_compete_count;
	//初始化
	selectData(data_type, PARTNER_NO, getDate(), "1", setData);
	$("#apartner_compete_count>div").click(function() {
		var type = $(this).attr("count_type");
		selectData(data_type, PARTNER_NO, getDate(), type, setData);
	});
	//解析json数据
	function setData(newData, cookieName) {
		var shops = new Array();
		var shop_indexs = new Array();
		var objArray = newData.result;
		$.each(objArray, function(index, value) {
			shops.push(value.apartner_name);
			shop_indexs.push(value.aflow_count);
		});
		showChart(shops, shop_indexs);
		var dd = JSON.stringify(newData);
		//如果cookie 是null，重新缓存
		if ($.cookie(cookieName) == null) {
			$.cookie(cookieName, dd, {
				expires: getExpireTime()
			});
		}
	}
	//	var shops = ['肯德基', '麦当劳', '过桥米线', '东北饺子馆', '麻辣香锅', '周记成都美食'];
	//	var shop_indexs = [200, 250, 100, 300, 210, 180];
	//	showChart(shops, shop_indexs);

	function showChart(param1, param2) {
		$('#container_flow').highcharts({
			chart: {
				type: 'column'
			},
			title: {
				text: ' '
			},
			subtitle: {
				text: ' '
			},
			xAxis: {
				categories: param1,
				crosshair: true
			},
			yAxis: {
				min: 0,
				title: {
					text: ' '
				}
			},
			tooltip: {
				headerFormat: '<span style="font-size:10px">{point.key}</span><table>',
				pointFormat: '<tr><td style="padding:0"><b>{point.y:.f}</b></td></tr>',
				footerFormat: '</table>',
				shared: true,
				useHTML: true
			},
			plotOptions: {
				column: {
					pointPadding: 0.2,
					borderWidth: 0
				},
				series: {
					dataLabels: {
						enabled: true,
						format: '{y}'
					}
				}
			},
			legend: {
				enabled: false
			},

			series: [{
				name: ' ',
				color: '#4C93D3',
				data: param2
			}],
			credits: {
				enabled: false
			}

		});
	}

});