//客流来源
$(function() {
	$.dataObj = function() {};
	$.extend($.d, {
		name: 5
	}, {
		count: 5
	});

	var data_type = METHODS.user_source_count;
	//初始化
	selectData(data_type, PARTNER_NO, getDate(), "1", setData);
	$("#user_source_count>div").click(function() {
		var type = $(this).attr("count_type");
		selectData(data_type, PARTNER_NO, getDate(), type, setData);
	});
	//解析json数据
	function setData(newData, cookieName) {
		var dataArray = new Array();
		var objArray = newData.result;
		$.each(objArray, function(index, value) {
			var newdata = new $.dataObj();
			newdata.name = value.from_addr;
			newdata.count = value.from_addr_count;
			dataArray.push(newdata);
		});
		showCountInfo(dataArray);
		var dd = JSON.stringify(newData);
		//如果cookie 是null，重新缓存
		if ($.cookie(cookieName) == null) {
			$.cookie(cookieName, dd, {
				expires: getExpireTime()
			});
		}
	}

//	var newdata = new $.dataObj();
//
//	newdata.name = "徐州北路";
//	newdata.count = 150;
//	dataArray.push(newdata);
//	newdata = new $.dataObj();
//	newdata.name = "山东路";
//	newdata.count = 122;
//	dataArray.push(newdata);
//	newdata = new $.dataObj();
//	newdata.name = "连云港路";
//	newdata.count = 78;
//	dataArray.push(newdata);
//	newdata = new $.dataObj();
//	newdata.name = "绍兴路";
//	newdata.count = 200;
//	dataArray.push(newdata);
	//	dataArray = [{
	//		"name":"aaa","count":"11"
	//	}, {
	//		"name":"bbb","count":"22"
	//	}, {
	//		"name":"ccc","count":"33"
	//	}, {
	//		"name":"ddd","count":"55"
	//	}];
//	showCountInfo(dataArray);

	function showCountInfo(arrData) {
		$("#table_tr").siblings().remove();
		var info = "";
		$.each(arrData, function(index, value) {
			info += "<tr><td>" + value.name + "</td><td>" + value.count + "</td></tr>";
		});
		$("#table_tr").after(info);
	}
});