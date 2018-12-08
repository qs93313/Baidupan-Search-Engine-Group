// ==UserScript==
// @name         百度网盘搜索引擎聚合
// @version      1.0
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
		var new_opt_01 = document.createElement('option');
		new_opt_01.innerHTML = "爱搜资源";
		new_opt_01.setAttribute("id", "id_opt_01");
		new_select.appendChild(new_opt_01);

		var new_opt_02 = document.createElement('option');
		new_opt_02.innerHTML = "云盘精灵";
		new_opt_02.setAttribute("id", "id_opt_02");
		new_select.appendChild(new_opt_02);

		var new_opt_03 = document.createElement('option');
		new_opt_03.innerHTML = "云盘恶魔a";
		new_opt_03.setAttribute("id", "id_opt_03");
		new_select.appendChild(new_opt_03);

		var new_opt_04 = document.createElement('option');
		new_opt_04.innerHTML = "云盘恶魔c";
		new_opt_04.setAttribute("id", "id_opt_04");
		new_select.appendChild(new_opt_04);

		var new_opt_05 = document.createElement('option');
		new_opt_05.innerHTML = "云盘恶魔f";
		new_opt_05.setAttribute("id", "id_opt_05");
		new_select.appendChild(new_opt_05);

		var new_opt_06 = document.createElement('option');
		new_opt_06.innerHTML = "磁力猫";
		new_opt_06.setAttribute("id", "id_opt_06");
		new_select.appendChild(new_opt_06);

		var new_opt_07 = document.createElement('option');
		new_opt_07.innerHTML = "小不点搜索";
		new_opt_07.setAttribute("id", "id_opt_07");
		new_select.appendChild(new_opt_07);

		var new_opt_08 = document.createElement('option');
		new_opt_08.innerHTML = "胖次搜索";
		new_opt_08.setAttribute("id", "id_opt_08");
		new_select.appendChild(new_opt_08);

		var new_opt_09 = document.createElement('option');
		new_opt_09.innerHTML = "去转盘";
		new_opt_09.setAttribute("id", "id_opt_09");
		new_select.appendChild(new_opt_09);

		var new_opt_10 = document.createElement('option');
		new_opt_10.innerHTML = "天天云搜";
		new_opt_10.setAttribute("id", "id_opt_10");
		new_select.appendChild(new_opt_10);

		var new_opt_11 = document.createElement('option');
		new_opt_11.innerHTML = "猪猪盘";
		new_opt_11.setAttribute("id", "id_opt_11");
		new_select.appendChild(new_opt_11);

		var new_opt_12 = document.createElement('option');
		new_opt_12.innerHTML = "云搜全量";
		new_opt_12.setAttribute("id", "id_opt_12");
		new_select.appendChild(new_opt_12);

		var new_opt_13 = document.createElement('option');
		new_opt_13.innerHTML = "云搜加密";
		new_opt_13.setAttribute("id", "id_opt_13");
		new_select.appendChild(new_opt_13);

		var new_opt_14 = document.createElement('option');
		new_opt_14.innerHTML = "云搜引擎1";
		new_opt_14.setAttribute("id", "id_opt_14");
		new_select.appendChild(new_opt_14);

		var new_opt_15 = document.createElement('option');
		new_opt_15.innerHTML = "云搜引擎3";
		new_opt_15.setAttribute("id", "id_opt_15");
		new_select.appendChild(new_opt_15);

		var new_opt_16 = document.createElement('option');
		new_opt_16.innerHTML = "云搜引擎2";
		new_opt_16.setAttribute("id", "id_opt_16");
		new_select.appendChild(new_opt_16);

		var new_opt_17 = document.createElement('option');
		new_opt_17.innerHTML = "网盘007";
		new_opt_17.setAttribute("id", "id_opt_17");
		new_select.appendChild(new_opt_17);

		var new_opt_18 = document.createElement('option');
		new_opt_18.innerHTML = "鸵鸟搜索";
		new_opt_18.setAttribute("id", "id_opt_18");
		new_select.appendChild(new_opt_18);

		var new_opt_19 = document.createElement('option');
		new_opt_19.innerHTML = "盘找找";
		new_opt_19.setAttribute("id", "id_opt_19");
		new_select.appendChild(new_opt_19);

		var new_opt_20 = document.createElement('option');
		new_opt_20.innerHTML = "搜云盘";
		new_opt_20.setAttribute("id", "id_opt_20");
		new_select.appendChild(new_opt_20);

		var new_opt_21 = document.createElement('option');
		new_opt_21.innerHTML = "verypan";
		new_opt_21.setAttribute("id", "id_opt_21");
		new_select.appendChild(new_opt_21);

		var new_opt_22 = document.createElement('option');
		new_opt_22.innerHTML = "西林街搜索";
		new_opt_22.setAttribute("id", "id_opt_22");
		new_select.appendChild(new_opt_22);

		var new_opt_23 = document.createElement('option');
		new_opt_23.innerHTML = "小白盘";
		new_opt_23.setAttribute("id", "id_opt_23");
		new_select.appendChild(new_opt_23);

		var new_opt_24 = document.createElement('option');
		new_opt_24.innerHTML = "盘多多";
		new_opt_24.setAttribute("id", "id_opt_24");
		new_select.appendChild(new_opt_24);

		var new_opt_25 = document.createElement('option');
		new_opt_25.innerHTML = "图书盘";
		new_opt_25.setAttribute("id", "id_opt_25");
		new_select.appendChild(new_opt_25);

		var new_opt_26 = document.createElement('option');
		new_opt_26.innerHTML = "史莱姆搜索";
		new_opt_26.setAttribute("id", "id_opt_26");
		new_select.appendChild(new_opt_26);

		var new_opt_27 = document.createElement('option');
		new_opt_27.innerHTML = "云铺子";
		new_opt_27.setAttribute("id", "id_opt_27");
		new_select.appendChild(new_opt_27);

		var new_opt_28 = document.createElement('option');
		new_opt_28.innerHTML = "sola资源站";
		new_opt_28.setAttribute("id", "id_opt_28");
		new_select.appendChild(new_opt_28);

		var new_opt_29 = document.createElement('option');
		new_opt_29.innerHTML = "盘115";
		new_opt_29.setAttribute("id", "id_opt_29");
		new_select.appendChild(new_opt_29);

		var new_opt_30 = document.createElement('option');
		new_opt_30.innerHTML = "58网盘";
		new_opt_30.setAttribute("id", "id_opt_30");
		new_select.appendChild(new_opt_30);

		var new_opt_31 = document.createElement('option');
		new_opt_31.innerHTML = "56网盘";
		new_opt_31.setAttribute("id", "id_opt_31");
		new_select.appendChild(new_opt_31);

		var new_opt_32 = document.createElement('option');
		new_opt_32.innerHTML = "58网盘2";
		new_opt_32.setAttribute("id", "id_opt_32");
		new_select.appendChild(new_opt_32);

		var new_opt_33 = document.createElement('option');
		new_opt_33.innerHTML = "我的盘";
		new_opt_33.setAttribute("id", "id_opt_33");
		new_select.appendChild(new_opt_33);

		var new_opt_34 = document.createElement('option');
		new_opt_34.innerHTML = "及搜盘";
		new_opt_34.setAttribute("id", "id_opt_34");
		new_select.appendChild(new_opt_34);

		var new_opt_35 = document.createElement('option');
		new_opt_35.innerHTML = "哎呦喂啊";
		new_opt_35.setAttribute("id", "id_opt_35");
		new_select.appendChild(new_opt_35);

		var new_opt_36 = document.createElement('option');
		new_opt_36.innerHTML = "爱挖盘";
		new_opt_36.setAttribute("id", "id_opt_36");
		new_select.appendChild(new_opt_36);

		var new_opt_37 = document.createElement('option');
		new_opt_37.innerHTML = "盘搜";
		new_opt_37.setAttribute("id", "id_opt_37");
		new_select.appendChild(new_opt_37);

		var new_opt_38 = document.createElement('option');
		new_opt_38.innerHTML = "云搜一下";
		new_opt_38.setAttribute("id", "id_opt_38");
		new_select.appendChild(new_opt_38);

		var new_opt_39 = document.createElement('option');
		new_opt_39.innerHTML = "麦库搜索";
		new_opt_39.setAttribute("id", "id_opt_39");
		new_select.appendChild(new_opt_39);

		var new_opt_40 = document.createElement('option');
		new_opt_40.innerHTML = "探索云盘";
		new_opt_40.setAttribute("id", "id_opt_40");
		new_select.appendChild(new_opt_40);

		var new_opt_41 = document.createElement('option');
		new_opt_41.innerHTML = "坑搜网";
		new_opt_41.setAttribute("id", "id_opt_41");
		new_select.appendChild(new_opt_41);

		var new_opt_42 = document.createElement('option');
		new_opt_42.innerHTML = "喵搜";
		new_opt_42.setAttribute("id", "id_opt_42");
		new_select.appendChild(new_opt_42);

		var new_opt_43 = document.createElement('option');
		new_opt_43.innerHTML = "西边云";
		new_opt_43.setAttribute("id", "id_opt_43");
		new_select.appendChild(new_opt_43);

		var new_opt_44 = document.createElement('option');
		new_opt_44.innerHTML = "网盘搜索BT";
		new_opt_44.setAttribute("id", "id_opt_44");
		new_select.appendChild(new_opt_44);

		var new_opt_45 = document.createElement('option');
		new_opt_45.innerHTML = "百度盘资源";
		new_opt_45.setAttribute("id", "id_opt_45");
		new_select.appendChild(new_opt_45);

		var new_opt_48 = document.createElement('option');
		new_opt_48.innerHTML = "325搜";
		new_opt_48.setAttribute("id", "id_opt_48");
		new_select.appendChild(new_opt_48);

		var new_opt_49 = document.createElement('option');
		new_opt_49.innerHTML = "6miu";
		new_opt_49.setAttribute("id", "id_opt_49");
		new_select.appendChild(new_opt_49);

		var new_opt_50 = document.createElement('option');
		new_opt_50.innerHTML = "90网盘";
		new_opt_50.setAttribute("id", "id_opt_50");
		new_select.appendChild(new_opt_50);

		var new_opt_51 = document.createElement('option');
		new_opt_51.innerHTML = "fastsoso";
		new_opt_51.setAttribute("id", "id_opt_51");
		new_select.appendChild(new_opt_51);

		var new_opt_52 = document.createElement('option');
		new_opt_52.innerHTML = "v搜索";
		new_opt_52.setAttribute("id", "id_opt_52");
		new_select.appendChild(new_opt_52);

		var new_opt_53 = document.createElement('option');
		new_opt_53.innerHTML = "搜盘";
		new_opt_53.setAttribute("id", "id_opt_53");
		new_select.appendChild(new_opt_53);

		var new_opt_54 = document.createElement('option');
		new_opt_54.innerHTML = "特多盘";
		new_opt_54.setAttribute("id", "id_opt_54");
		new_select.appendChild(new_opt_54);

		var new_opt_55 = document.createElement('option');
		new_opt_55.innerHTML = "网盘资源网";
		new_opt_55.setAttribute("id", "id_opt_55");
		new_select.appendChild(new_opt_55);

		var new_opt_56 = document.createElement('option');
		new_opt_56.innerHTML = "百度网盘搜";
		new_opt_56.setAttribute("id", "id_opt_56");
		new_select.appendChild(new_opt_56);

		var new_opt_57 = document.createElement('option');
		new_opt_57.innerHTML = "特百度";
		new_opt_57.setAttribute("id", "id_opt_57");
		new_select.appendChild(new_opt_57);

		var new_opt_58 = document.createElement('option');
		new_opt_58.innerHTML = "搜搜云盘";
		new_opt_58.setAttribute("id", "id_opt_58");
		new_select.appendChild(new_opt_58);

		var new_opt_59 = document.createElement('option');
		new_opt_59.innerHTML = "云网盘之家";
		new_opt_59.setAttribute("id", "id_opt_59");
		new_select.appendChild(new_opt_59);

		var new_opt_60 = document.createElement('option');
		new_opt_60.innerHTML = "盘优搜";
		new_opt_60.setAttribute("id", "id_opt_60");
		new_select.appendChild(new_opt_60);

		var new_opt_61 = document.createElement('option');
		new_opt_61.innerHTML = "麦库搜索";
		new_opt_61.setAttribute("id", "id_opt_61");
		new_select.appendChild(new_opt_61);

		var new_opt_62 = document.createElement('option');
		new_opt_62.innerHTML = "网盘传奇";
		new_opt_62.setAttribute("id", "id_opt_62");
		new_select.appendChild(new_opt_62);

		var new_opt_63 = document.createElement('option');
		new_opt_63.innerHTML = "SoV5";
		new_opt_63.setAttribute("id", "id_opt_63");
		new_select.appendChild(new_opt_63);

		var new_opt_64 = document.createElement('option');
		new_opt_64.innerHTML = "下载搜";
		new_opt_64.setAttribute("id", "id_opt_64");
		new_select.appendChild(new_opt_64);

		var new_opt_65 = document.createElement('option');
		new_opt_65.innerHTML = "优质吧";
		new_opt_65.setAttribute("id", "id_opt_65");
		new_select.appendChild(new_opt_65);

		var new_opt_67 = document.createElement('option');
		new_opt_67.innerHTML = "网盘之家";
		new_opt_67.setAttribute("id", "id_opt_67");
		new_select.appendChild(new_opt_67);

		var new_opt_68 = document.createElement('option');
		new_opt_68.innerHTML = "众人搜网盘";
		new_opt_68.setAttribute("id", "id_opt_68");
		new_select.appendChild(new_opt_68);

		var new_opt_69 = document.createElement('option');
		new_opt_69.innerHTML = "乐依分享";
		new_opt_69.setAttribute("id", "id_opt_69");
		new_select.appendChild(new_opt_69);
		//【选项】结束

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

		//搜索引擎网址目录，%sv%为替换符
		var dirall = {
			"id_opt_01": "https://www.aisouziyuan.com/?name=%sv%",
			"id_opt_02": "https://www.yunpanjingling.com/search/%sv%",
			"id_opt_03": "https://pan.09l.me/search/a/%sv%/1.html",
			"id_opt_04": "https://pan.09l.me/search/c/%sv%/1.html",
			"id_opt_05": "https://pan.09l.me/search/f/%sv%/1.html",
			"id_opt_06": "https://www.cilimao.me/search?word=%sv%",
			"id_opt_07": "https://www.xiaobd.net/m/search?wd=%sv%",
			"id_opt_08": "https://www.panc.cc/s/%sv%/td_0",
			"id_opt_09": "http://www.quzhuanpan.com/source/search.action?q=%sv%",
			"id_opt_10": "https://www.ttyunsou.com/s?keyword=%sv%",
			"id_opt_11": "http://www.zhuzhupan.com/search?query=%sv%",
			"id_opt_12": "http://www.daysou.com/s?q=%sv%&start=0&isget=1&tp=all&cl=0&line=4",
			"id_opt_13": "http://www.daysou.com/s?q=%sv%&start=0&isget=1&tp=all&cl=0&line=3",
			"id_opt_14": "http://www.daysou.com/s?q=%sv%&start=0&isget=1&tp=all&cl=0&line=0",
			"id_opt_15": "http://www.daysou.com/s?q=%sv%&start=0&isget=1&tp=all&cl=0&line=2",
			"id_opt_16": "http://www.daysou.com/s?q=%sv%&start=0&isget=1&tp=all&cl=0&line=1",
			"id_opt_17": "https://wangpan007.com/share/kw%sv%",
			"id_opt_18": "http://www.tuoniao.me/search/%sv%/list",
			"id_opt_19": "http://www.13910.com/s/?kw=%sv%",
			"id_opt_20": "http://www.soyunpan.com/search/%sv%-0-全部-0.html",
			"id_opt_21": "http://www.verypan.com/index/index/baidusearch?keyword=%sv%",
			"id_opt_22": "http://www.xilinjie.com/s?q=%sv%&t=pan",
			"id_opt_23": "http://www.xiaobaipan.com/list-%svh%",
			"id_opt_24": "http://www.panduoduo.net/s/name/%sv%",
			"id_opt_25": "http://www.tushupan.com/search?query=%sv%",
			"id_opt_26": "http://www.slimego.cn/search.html?q=%sv%",
			"id_opt_27": "http://www.yunpuzi.net/all/s-%sv%.html",
			"id_opt_28": "http://www.3134.cc/search.php?kw=%sv%",
			"id_opt_29": "http://www.guanggua.com/search?key=%sv%",
			"id_opt_30": "http://www.58wangpan.com/search/kw%sv%",
			"id_opt_31": "http://www.56wangpan.com/search/kw%sv%",
			"id_opt_32": "http://wx01.51caichang.com/so?keyword=%sv%",
			"id_opt_33": "http://www.wodepan.com/list/%sv%-1.html",
			"id_opt_34": "http://www.jisoupan.com/search/%sv%.html",
			"id_opt_35": "http://www.aiyoweia.com/search/%sv%",
			"id_opt_36": "http://www.iwapan.com/so.aspx?wd=%sv%",
			"id_opt_37": "http://www.pansou.com/?q=%sv%",
			"id_opt_38": "http://sou.wolfbe.com/s?q=%sv%",
			"id_opt_39": "http://www.huisou.me/index.php?k=%sv%",
			"id_opt_40": "http://tansuo233.com/?search=%sv%",
			"id_opt_41": "http://www.kengso.com/s?wd=%sv%",
			"id_opt_42": "https://nyaso.com/dong/%sv%.html",
			"id_opt_43": "http://www.xibianyun.com/wp/search?q=%sv%",
			"id_opt_44": "http://www.sosobta.cn/search/%sv%",
			"id_opt_45": "http://www.friok.com/?s=%sv%",
			"id_opt_48": "http://pan.here325.com/s?q=%sv%",
			"id_opt_49": "http://baiduyun.6miu.com/word.html?kw=%sv%",
			"id_opt_50": "https://pan.90xz.com/search/%sv%",
			"id_opt_51": "https://www.fastsoso.cn/search?k=%sv%",
			"id_opt_52": "http://www.v1248.com/index.htm?kw=%sv%",
			"id_opt_53": "http://www.soupan.info/search.php?q=%sv%",
			"id_opt_54": "http://so.hzbslp.com/api.php?pn=1&sr=%sv%",
			"id_opt_55": "http://www.0933.me/search.html?wd=%sv%",
			"id_opt_56": "https://www.xalssy.com.cn/search/kw%sv%",
			"id_opt_57": "http://www.tebaidu.com/search.asp?wd=%sv%",
			"id_opt_58": "http://www.sosoyunpan.com/search.asp?wd=%sv%",
			"id_opt_59": "http://www.wowenda.com/search?wd=%sv%",
			"id_opt_60": "http://www.panuso.com/s/%sv%.html",
			"id_opt_61": "http://huisou.me/index.php?k=%sv%",
			"id_opt_62": "https://www.jidanso.com/index.php/search/?q=%sv%",
			"id_opt_63": "https://www.sov5.cn/search?q=%sv%",
			"id_opt_64": "https://www.xiazaisou.com/wangpan?s=%sv%",
			"id_opt_65": "http://uzi8.cn/search/kw%sv%",
			"id_opt_67": "http://www.wangpanzhijia.net/search.html?wd=%sv%",
			"id_opt_68": "http://wangpan.renrensousuo.com/jieguo?sa=网盘搜索&q=%sv%",
			"id_opt_69": "https://www.dyroy.com/html/search.html?q=%sv%",
		};

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
				var pcsearch = dirall[option_select_id];
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
}
