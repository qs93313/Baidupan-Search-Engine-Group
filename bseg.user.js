// ==UserScript==
// @name         百度网盘搜索引擎聚合
// @version      1.1
// @description  在百度云盘页面中新增百度网盘搜索引擎聚合
// @match        *://pan.baidu.com/*
// @grant        来自各个网盘搜索引擎开发者
// @author       太史子义慈
// @namespace    qs93313@sina.cn
// ==/UserScript==

!(function() {
	bdyjuhe();
})();

function bdyjuhe() {
	//确定显示点是否存在
	if(document.querySelector(".find-light-icon") !== null) {

		//搜索引擎网址目录，%sv%为替换符
		var dirall = {
			"id_opt_00": {
				0: "爱搜资源",
				1: "https://www.aisouziyuan.com/?name=%sv%",
			},
			"id_opt_01": {
				0: "云盘精灵",
				1: "https://www.yunpanjingling.com/search/%sv%",
			},
			"id_opt_02": {
				0: "云盘恶魔a",
				1: "https://pan.09l.me/search/a/%sv%/1.html",
			},
			"id_opt_03": {
				0: "云盘恶魔c",
				1: "https://pan.09l.me/search/c/%sv%/1.html",
			},
			"id_opt_04": {
				0: "云盘恶魔f",
				1: "https://pan.09l.me/search/f/%sv%/1.html",
			},
			"id_opt_05": {
				0: "磁力猫",
				1: "https://www.cilimao.me/search?word=%sv%",
			},
			"id_opt_06": {
				0: "小不点搜索",
				1: "https://www.xiaobd.net/m/search?wd=%sv%",
			},
			"id_opt_07": {
				0: "胖次搜索",
				1: "https://www.panc.cc/s/%sv%/td_0",
			},
			"id_opt_08": {
				0: "去转盘",
				1: "http://www.quzhuanpan.com/source/search.action?q=%sv%",
			},
			"id_opt_09": {
				0: "天天云搜",
				1: "https://www.ttyunsou.com/s?keyword=%sv%",
			},
			"id_opt_10": {
				0: "猪猪盘1",
				1: "http://www.zhuzhupan.com/search?s=1&query=%sv%",
			},
			"id_opt_11": {
				0: "猪猪盘2",
				1: "http://www.zhuzhupan.com/search?s=2&query=%sv%",
			},
			"id_opt_12": {
				0: "猪猪盘3",
				1: "http://www.zhuzhupan.com/search?s=3&query=%sv%",
			},
			"id_opt_13": {
				0: "猪猪盘4",
				1: "http://www.zhuzhupan.com/search?s=4&query=%sv%",
			},
			"id_opt_14": {
				0: "猪猪盘5",
				1: "http://www.zhuzhupan.com/search?s=5&query=%sv%",
			},
			"id_opt_15": {
				0: "猪猪盘6",
				1: "http://www.zhuzhupan.com/search?s=6&query=%sv%",
			},
			"id_opt_16": {
				0: "猪猪盘7",
				1: "http://www.zhuzhupan.com/search?s=7&query=%sv%",
			},
			"id_opt_17": {
				0: "猪猪盘8",
				1: "http://www.zhuzhupan.com/search?s=8&query=%sv%",
			},
			"id_opt_18": {
				0: "猪猪盘总线",
				1: "http://www.zhuzhupan.com/search?s=100&query=%sv%",
			},
			"id_opt_19": {
				0: "云搜全量",
				1: "http://www.daysou.com/s?q=%sv%&start=0&isget=1&tp=all&cl=0&line=4",
			},
			"id_opt_20": {
				0: "云搜加密",
				1: "http://www.daysou.com/s?q=%sv%&start=0&isget=1&tp=all&cl=0&line=3",
			},
			"id_opt_21": {
				0: "云搜引擎1",
				1: "http://www.daysou.com/s?q=%sv%&start=0&isget=1&tp=all&cl=0&line=0",
			},
			"id_opt_22": {
				0: "云搜引擎3",
				1: "http://www.daysou.com/s?q=%sv%&start=0&isget=1&tp=all&cl=0&line=2",
			},
			"id_opt_23": {
				0: "云搜引擎2",
				1: "http://www.daysou.com/s?q=%sv%&start=0&isget=1&tp=all&cl=0&line=1",
			},
			"id_opt_24": {
				0: "网盘007",
				1: "https://wangpan007.com/share/kw%sv%",
			},
			"id_opt_25": {
				0: "鸵鸟搜索",
				1: "http://www.tuoniao.me/search/%sv%/list",
			},
			"id_opt_26": {
				0: "盘找找",
				1: "http://www.13910.com/s/?kw=%sv%",
			},
			"id_opt_27": {
				0: "搜云盘",
				1: "http://www.soyunpan.com/search/%sv%-0-全部-0.html",
			},
			"id_opt_28": {
				0: "verypan",
				1: "http://www.verypan.com/index/index/baidusearch?keyword=%sv%",
			},
			"id_opt_29": {
				0: "西林街搜索",
				1: "http://www.xilinjie.com/s?q=%sv%&t=pan",
			},
			"id_opt_30": {
				0: "小白盘",
				1: "http://www.xiaobaipan.com/list-%svh%",
			},
			"id_opt_31": {
				0: "盘多多",
				1: "http://www.panduoduo.net/s/name/%sv%",
			},
			"id_opt_32": {
				0: "图书盘",
				1: "http://www.tushupan.com/search?query=%sv%",
			},
			"id_opt_33": {
				0: "史莱姆搜索",
				1: "http://www.slimego.cn/search.html?q=%sv%",
			},
			"id_opt_34": {
				0: "云铺子",
				1: "http://www.yunpuzi.net/all/s-%sv%.html",
			},
			"id_opt_35": {
				0: "sola资源站",
				1: "http://www.3134.cc/search.php?kw=%sv%",
			},
			"id_opt_36": {
				0: "盘115",
				1: "http://www.guanggua.com/search?key=%sv%",
			},
			"id_opt_37": {
				0: "58网盘",
				1: "http://www.58wangpan.com/search/kw%sv%",
			},
			"id_opt_38": {
				0: "56网盘",
				1: "http://www.56wangpan.com/search/kw%sv%",
			},
			"id_opt_39": {
				0: "58网盘2",
				1: "http://wx01.51caichang.com/so?keyword=%sv%",
			},
			"id_opt_40": {
				0: "我的盘",
				1: "http://www.wodepan.com/list/%sv%-1.html",
			},
			"id_opt_41": {
				0: "及搜盘",
				1: "http://www.jisoupan.com/search/%sv%.html",
			},
			"id_opt_42": {
				0: "哎呦喂啊",
				1: "http://www.aiyoweia.com/search/%sv%",
			},
			"id_opt_43": {
				0: "爱挖盘",
				1: "http://www.iwapan.com/so.aspx?wd=%sv%",
			},
			"id_opt_44": {
				0: "盘搜",
				1: "http://www.pansou.com/?q=%sv%",
			},
			"id_opt_45": {
				0: "云搜一下",
				1: "http://sou.wolfbe.com/s?q=%sv%",
			},
			"id_opt_46": {
				0: "麦库搜索",
				1: "http://www.huisou.me/index.php?k=%sv%",
			},
			"id_opt_47": {
				0: "探索云盘",
				1: "http://tansuo233.com/?search=%sv%",
			},
			"id_opt_48": {
				0: "坑搜网",
				1: "http://www.kengso.com/s?wd=%sv%",
			},
			"id_opt_49": {
				0: "喵搜",
				1: "https://nyaso.com/dong/%sv%.html",
			},
			"id_opt_50": {
				0: "西边云",
				1: "http://www.xibianyun.com/wp/search?q=%sv%",
			},
			"id_opt_51": {
				0: "网盘搜索BT",
				1: "http://www.sosobta.cn/search/%sv%",
			},
			"id_opt_52": {
				0: "百度盘资源",
				1: "http://www.friok.com/?s=%sv%",
			},
			"id_opt_53": {
				0: "325搜",
				1: "http://pan.here325.com/s?q=%sv%",
			},
			"id_opt_54": {
				0: "6miu",
				1: "http://baiduyun.6miu.com/word.html?kw=%sv%",
			},
			"id_opt_55": {
				0: "90网盘",
				1: "https://pan.90xz.com/search/%sv%",
			},
			"id_opt_56": {
				0: "fastsoso",
				1: "https://www.fastsoso.cn/search?k=%sv%",
			},
			"id_opt_57": {
				0: "v搜索",
				1: "http://www.v1248.com/index.htm?kw=%sv%",
			},
			"id_opt_58": {
				0: "搜盘",
				1: "http://www.soupan.info/search.php?q=%sv%",
			},
			"id_opt_59": {
				0: "特多盘",
				1: "http://so.hzbslp.com/api.php?pn=1&sr=%sv%",
			},
			"id_opt_60": {
				0: "网盘资源网",
				1: "http://www.0933.me/search.html?wd=%sv%",
			},
			"id_opt_61": {
				0: "百度网盘搜",
				1: "https://www.xalssy.com.cn/search/kw%sv%",
			},
			"id_opt_62": {
				0: "特百度",
				1: "http://www.tebaidu.com/search.asp?wd=%sv%",
			},
			"id_opt_63": {
				0: "搜搜云盘",
				1: "http://www.sosoyunpan.com/search.asp?wd=%sv%",
			},
			"id_opt_64": {
				0: "云网盘之家",
				1: "http://www.wowenda.com/search?wd=%sv%",
			},
			"id_opt_65": {
				0: "盘优搜",
				1: "http://www.panuso.com/s/%sv%.html",
			},
			"id_opt_66": {
				0: "麦库搜索",
				1: "http://huisou.me/index.php?k=%sv%",
			},
			"id_opt_67": {
				0: "网盘传奇",
				1: "https://www.jidanso.com/index.php/search/?q=%sv%",
			},
			"id_opt_68": {
				0: "SoV5",
				1: "https://www.sov5.cn/search?q=%sv%",
			},
			"id_opt_69": {
				0: "下载搜",
				1: "https://www.xiazaisou.com/wangpan?s=%sv%",
			},
			"id_opt_70": {
				0: "优质吧",
				1: "http://uzi8.cn/search/kw%sv%",
			},
			"id_opt_71": {
				0: "网盘之家",
				1: "http://www.wangpanzhijia.net/search.html?wd=%sv%",
			},
			"id_opt_72": {
				0: "众人搜网盘",
				1: "http://wangpan.renrensousuo.com/jieguo?sa=网盘搜索&q=%sv%",
			},
			"id_opt_73": {
				0: "乐依分享",
				1: "https://www.dyroy.com/html/search.html?q=%sv%",
			},

		};

		//找到父亲节点
		var father = document.getElementsByClassName("vyQHNyb")[0];

		//新建span子节点
		var new_span = document.createElement('span');
		new_span.setAttribute("id", "id_new_span");
		father.appendChild(new_span);

		//span节点再建【选择框】子节点
		var new_select = document.createElement('select');
		new_span.appendChild(new_select);
		new_select.style.cssText = "font-size: 15px;height: 30px;color: black;";

		//选择框子节点下面要建立大量【选项】子节点
		for(var i in dirall) {
			var v = dirall[i][0];
			new_option(v, i, new_select);
		}

		//span节点再建【输入框】子节点
		var new_input = document.createElement('input');
		new_input.setAttribute("id", "scont");
		new_input.setAttribute("class", "scont");
		new_input.setAttribute("placeholder", "请输入要搜索的内容");
		new_span.appendChild(new_input);
		new_input.style.cssText = "font-size: 15px;width: 180px;height: 22px;color: black;padding: 2px;";
		new_input.focus();

		//span节点再建【按钮】子节点
		var new_btn = document.createElement('button');
		new_btn.innerHTML = "搜索";
		new_span.appendChild(new_btn);
		new_btn.style.cssText = "font-size: 14px;width: 52px;height: 29px;color: black;";

		//按钮点击事件
		new_btn.onclick = function() {
			//获得输入框数据
			var new_input_val = new_input.value;
			//计算输入框数据长度
			var new_input_val_len = new_input_val.length;
			//如果输入框有数据
			if(new_input_val_len > 0) {
				//获得选择框里被选中的选项索引
				var option_index = new_select.selectedIndex;
				//根据索引获得获得选择框里被选中的选项id
				var option_select_id = new_select.options[option_index].id;
				//根据id和网址目录获得网址
				var pcsearch = dirall[option_select_id][1];
				//用输入框的数据替换掉网址内的替换符
				var dti = pcsearch.replace("%sv%", new_input_val);
				//网址跳转
				window.open(dti);
			} else {
				alert("请在前面的输入框输入要搜索的内容。");
				new_input.focus();
			}
		}

		//清除广告，腾位置
		var zzy = father.childNodes[2];
		zzy.style.cssText = "display: none!important;";
	} else {
		console.log("失败一次");
		//显示点不存在，50毫秒后再次执行
		setTimeout(function() {
			bdyjuhe();
		}, 50);
	}

	//新建option
	function new_option(ih, aid, ns) {
		var new_opt = document.createElement('option');
		new_opt.innerHTML = ih;
		new_opt.setAttribute("id", aid);
		ns.appendChild(new_opt);
	}
}
