//用户性别
$(function() {
	var data_type = METHODS.user_sex_count;
	selectData(data_type, PARTNER_NO, getDate(), "1", setData);
	$("#user_sex_count>div").click(function() {
		var type = $(this).attr("count_type");
		selectData(data_type, PARTNER_NO, getDate(), type, setData);
	});
	//解析json数据
	function setData(newData, cookieName) {
		var male_count = newData.result[0].male_count;
		var female_count = newData.result[0].female_count;
		showChart(male_count, female_count);
		var dd = JSON.stringify(newData);
		//如果cookie 是null，重新缓存
		if ($.cookie(cookieName) == null) {
			$.cookie(cookieName, dd, {
				expires: getExpireTime()
			});
		}
	}
	//显示图标
	function showChart(param1, param2) {
		$('#container_sex').highcharts({
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
				categories: [
					'男',
					'女'
				],
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
				pointFormat: '<tr><td style="padding:0"><b>{point.y:.f} 人</b></td></tr>',
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
				data: [{
					color: '#4C93D3',
					y: param1
				}, {
					color: '#F2846B',
					y: param2
				}]
			}],
			credits: {
				enabled: false
			}

		});
	}

});