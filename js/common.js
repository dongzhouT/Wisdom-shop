//声明一些共用变量和方法
var url = "http://127.0.0.1/shop/";
var METHODS = {
	"haier_partner_info": "haier_partner_info",
	"user_sex_count": "user_sex_count",
	"user_time_range_count": "user_time_range_count",
	"user_stay_time_count": "user_stay_time_count",
	"user_stay_time_aver": "user_stay_time_aver",
	"ad_click_count": "ad_click_count",
	"apartner_compete_count": "apartner_compete_count",
	"user_source_count": "user_source_count"
};
var PARTNER_NO_KEY = "partner_no";
var PARTNER_NO = "";
if ($.cookie(PARTNER_NO_KEY)) {
	PARTNER_NO = $.cookie(PARTNER_NO_KEY);
}
var EXPIRES_TIME = getIDStorageTime(); //cookie保存时间n天
//获取昨天日期
function getDate() {
	var mydate = new Date();
	var yesterday_ms = mydate.getTime() - 1000 * 60 * 60 * 24;
	mydate.setTime(yesterday_ms);
	var str = "" + mydate.getFullYear();
	var month = mydate.getMonth() + 1;
	if (month < 10) {
		str += "0" + month;
	} else {
		str += "" + month;
	}
	var day = mydate.getDate();
	if (day < 10) {
		str += "0" + day;
	} else {
		str += "" + day;
	}
	return str;
}

function getIDStorageTime() {
	var storageTime = new Date();
	//超时时间为第二天时
	storageTime.setTime(storageTime.getTime() + 3600 * 24 * 1000 * 3650);
	return storageTime;
}
//返回设定的超时时间 ：当天24点
function getExpireTime() {
	var expireTime = new Date();
	//设置4秒超时
	//	expireTime.setTime(expireTime.getTime() + 4000);
	//超时时间为第二天时
	//	expireTime.setTime(expireTime.getTime()+3600*24*1000);
	expireTime.setHours(24, 0, 0, 0);
	//	var duration1 = expireTime.getTime() - (new Date()).getTime();
	//	var duration = duration1 / 1000;
	//	console.log("now:" + now + ",exp:" + expireTime + ",duration:" + duration / 3600 + ":" + (duration % 3600) / 60 + ":" + duration % 60);
	return expireTime;
}

/**
 * 公用获取API方法
 * @param {Object} data_type 数据类型
 * @param {Object} partner_no 商家ID
 * @param {Object} count_date 数据统计的时间 格式20150102
 * @param {Object} count_type 统计方式 1：表示统计一天，7表示统计7天的数据，30表示统计30天的数据。
 * @param {Function} callback 回调函数
 */
function selectData(data_type, partner_no, count_date, count_type, callback) {
	if (partner_no == null || partner_no == "")
		return;
	var cookieName = partner_no + "_" + data_type + "_" + count_date + "_" + count_type;
	var old = $.cookie(cookieName);
	//	console.log(cookieName + ":" + old);
	if (old) {
		var oldData = JSON.parse(old);
		callback(oldData, cookieName);
		//		console.log("oldData-->" + old);
	} else {
		$.ajax({
			type: 'POST',
			url: url,
			data: {
				"data_type": data_type,
				"partner_no": partner_no,
				"count_date": count_date,
				"count_type": count_type
			},
			success: function(data) {
				callback(data, cookieName);
				//				console.log("newData-->" + JSON.stringify(data));
			}
		});
	}
}
//商户验证
function checkPartner(type, no, callback, error) {
	$.ajax({
		type: 'POST',
		url: url,
		data: {
			"data_type": type,
			"partner_no": no
		},
		success: function(data) {
			callback(data);
		},
		error: function(obj, msg, msg2) {
			error(obj, msg, msg2);
		}
	});
}
$(function() {
	//设置table第一行颜色
	$("#container_table tr:first td").css("background-color", "#DDDDDD");
	$(".time-filter div").click(function() {
		$(this).siblings().removeClass("select-item");
		$(this).addClass("select-item");
	});
	//点击登录按钮
	$("#loggin").click(function() {
		var username = $("#username").val().trim();
		var password = $("#password").val().trim();
		if (username == "" || password == "") {
			if (username == "") {
				$("#user-error").show();
			} else {
				$("#user-error").hide();
			}
			if (password == "") {
				$("#pwd-error").show();
			} else {
				$("#pwd-error").hide();
			}
			return false;
		}
		$("#user-error,#pwd-error").hide();
		checkPartner(METHODS.haier_partner_info, username, function(data) {
			var partNo = data.result[0].partner_no;
			if (partNo && partNo != "") {
				//商户cookie保留时间
				$.cookie(PARTNER_NO_KEY, username, {
					expires: EXPIRES_TIME
				});
				location.href = "./cloudshop.html";
			} else {
				$("#user-error").show();
			}

		}, function(obj, msg, msg2) {
			alert("发生错误，错误信息为：" + msg);
		});

	});
	$("#logout").click(function() {
		if (confirm("确定要退出吗？")) {
			//是的，退出，清空cookie
			$.cookie(PARTNER_NO_KEY, null);
			PARTNER_NO = "";
		} else {
			//否，不退出
			return false;
		}

	});
});