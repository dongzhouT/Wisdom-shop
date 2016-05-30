//店铺客流量统计
$(function() {
	var data_type = METHODS.user_time_range_count;
	//初始化
	selectData(data_type, PARTNER_NO, getDate(), "1", setData);
	$("#user_time_range_count>div").click(function() {
		var type = $(this).attr("count_type");
		selectData(data_type, PARTNER_NO, getDate(), type, setData);
	});
	//	var categories = ['0:00', '2:00', '4:00', '6:00', '8:00', '10:00', '12:00', '14:00', '16:00', '18:00', '20:00', '22:00', '24:00']
	//	var datas = [29.9, 71.5, 106.4, 129.2, 144.0, 176.0, 135.6, 148.5, 216.4, 194.1, 95.6, 54.4, 10.0];

	//解析json数据
	function setData(newData, cookieName) {
		var categories = new Array();
		var datas = new Array();
		var objArray = newData.result;
		$.each(objArray, function(index, value) {
			categories.push(value.time_range);
			datas.push(value.user_flow_count);
		});
		showChart(categories, datas);
		var dd = JSON.stringify(newData);
		//如果cookie 是null，重新缓存
		if ($.cookie(cookieName) == null) {
			$.cookie(cookieName, dd, {
				expires: getExpireTime()
			});
		}
	}

	function showChart(param1, param2) {
		$('#container_line').highcharts({
			chart: {
				type: 'spline'
			},
			title: {
				text: ' '
			},
			subtitle: {
				text: ' '
			},
			legend: {
				enabled: false
			},
			tooltip: {
				pointFormat: '<b>{point.y:.1f}</b>'
			},
			xAxis: {
				categories: param1,
			},
			yAxis: {
				min: 0,
				title: ' '
			},
			series: [{
				name: ' ',
				data: param2
			}],
			credits: {
				enabled: false
			}
		});
	}

});