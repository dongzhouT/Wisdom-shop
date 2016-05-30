//广告点击率
$(function() {
	var data_type = METHODS.ad_click_count;
	selectData(data_type, PARTNER_NO, getDate(), "1", setData);
	$("#ad_click_count>div").click(function() {
		var type = $(this).attr("count_type");
		selectData(data_type, PARTNER_NO, getDate(), type, setData);
	});
	//解析json数据
	function setData(newData, cookieName) {
		var browse_count = newData.result[0].browse_count;
		var click_count = newData.result[0].click_count;
		var rate = (click_count * 100 / browse_count).toFixed(1);
		showData(browse_count, click_count, rate + "%");
		var dd = JSON.stringify(newData);
		//如果cookie 是null，重新缓存
		if ($.cookie(cookieName) == null) {
			$.cookie(cookieName, dd, {
				expires: getExpireTime()
			});
		}

	}
	//	showData(111, 222, "33%");

	function showData(param1, param2, param3) {
		$("#ad_show_count").html(param1);
		$("#click_count").html(param2);
		$("#ad_trans_rate").html(param3);
	}
});