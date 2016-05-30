//顾客停留时长
$(function() {
	var data_type = METHODS.user_stay_time_count;
	//初始化
	
	selectData(data_type, PARTNER_NO, getDate(), "1", setData2);
	$("#user_stay_time_count>div").click(function() {
		var type = $(this).attr("count_type");
		selectData(data_type, PARTNER_NO, getDate(), type, setData2);
	});
	//解析json数据
	function setData2(newData, cookieName) {
		var datas = new Array();
		var objArray = newData.result;
		$.each(objArray, function(index, value) {
			var item = new Array();
			item.push(value.stay_time_range);
			item.push(value.stay_time_count);
			datas.push(item);
		});
		showChart(datas);
		var dd = JSON.stringify(newData);
		//如果cookie 是null，重新缓存
		if ($.cookie(cookieName) == null) {
			$.cookie(cookieName, dd, {
				expires: getExpireTime()
			});
		}
	}
//	var datas = [
//		['10分钟', 52],
//		['10-30分钟', 28],
//		['30-60分钟', 10],
//		['60分钟以上', 10]
//	];
//	showChart(datas);

	function showChart(param1) {
		$('#container_pie').highcharts({
			chart: {
				type: 'pie',
				plotBackgroundColor: null,
				plotBorderWidth: null,
				plotShadow: false
			},
			title: {
				text: ' '
			},
			tooltip: {
				pointFormat: '<b>{point.percentage:.1f}%</b>'
			},
			plotOptions: {
				pie: {
					allowPointSelect: true,
					cursor: 'pointer',
					dataLabels: {
						enabled: true,
						color: '#000000',
						connectorColor: '#000000',
						format: '{point.percentage:.1f} %',
						distance: 20
					},
					showInLegend: true,
					minSize: 120
				}
			},
			series: [{
				name: ' ',
				data: param1
			}],
			//			legend: {
			//				align: 'right',
			//				verticalAlign: 'middle',
			//				x: -30,
			//				y: -10,
			//				layout: 'vertical'
			//			},
			credits: {
				enabled: false
			}
		});
	}

});