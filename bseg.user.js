// ==UserScript==
// @name         百度网盘搜索引擎聚合
// @version      1.82
// @description  在百度云盘页面中新增百度网盘搜索引擎聚合
// @match        *://pan.baidu.com/*
// @match        *://yun.baidu.com/*
// @grant        来自各个网盘搜索引擎开发者
// @author       太史子义慈
// @namespace    qs93313@sina.cn
// ==/UserScript==

!(function() {
	bseg(0);
})();

function bseg(t) {
	//最多找100次
	if(t < 100) {
		//主页
		let find_home = (document.querySelector(".find-light-icon") !== null);
		//密码填写页
		let find_init = (document.querySelector("#hgejgNaM") !== null);
		//客户端下载页
		let find_download = (document.querySelector("#login-header") !== null);
		//版本更新页 | 服务协议
		let find_version = (document.querySelector(".help-all") !== null || document.querySelector(".main-i") !== null);
		//综合
		let find_or = (find_home || find_init || find_download || find_version);
		//确定显示点是否存在
		if(find_or) {
			//搜索引擎网址目录
			let dirall = dir_all();

			//新建span子节点（！！！注意每个页面父节点不同！！！）
			let new_span = document.createElement('span');
			new_span.setAttribute("id", "id_new_span");

			//span节点再建【选择框】子节点
			let new_select = document.createElement('select');
			new_span.appendChild(new_select);

			//选择框子节点下面要建立大量【选项】子节点
			for(let i in dirall) {
				let v = dirall[i][0];
				new_option(v, i, new_select);
			}

			//span节点再建【输入框】子节点
			let new_input = document.createElement('input');
			new_input.setAttribute("id", "scont");
			new_input.setAttribute("class", "scont");
			new_input.setAttribute("placeholder", "请输入要搜索的内容");
			new_input.setAttribute("autocomplete", "off");
			new_span.appendChild(new_input);

			//span节点再建【按钮】子节点
			let new_btn = document.createElement('button');
			new_btn.innerHTML = "搜索";
			new_span.appendChild(new_btn);
			new_btn.style.cssText = "font-size: 14px;width: 52px;height: 29px;color: white;border:0px;";
			new_btn.style.background = "#3B8CFF";
			new_btn.onmouseenter = function() {
				new_btn.style.background = "#7EB2FF";
			};
			new_btn.onmouseleave = function() {
				new_btn.style.background = "#3B8CFF";
			};

			//找到父亲节点
			if(find_home) {
				//首页
				let father_home = document.getElementsByClassName("vyQHNyb")[0];
				father_home.style.cssText = "margin-left: 0!important;;";
				//主页清除广告，腾位置
				let zzy = father_home.childNodes[2];
				zzy.style.cssText = "display: none!important;";
				//.vyQHNyb
				//新建span子节点
				father_home.appendChild(new_span);
				//设置新建的选择框的样式
				new_select.style.cssText = "font-size:15px;height:30px;color:black;border-right:0;outline:none;";
				//设置新建的输入框的样式
				new_input.style.cssText = "font-size:15px;width:240px;height: 22px;color:black;padding:2px;outline:none;";
				new_input.focus();
			} else if(find_init) {
				//密码填写页
				let father_init = document.getElementsByClassName("pickpw")[0];
				//新建span子节点
				father_init.appendChild(new_span);
				//设置新建的span节点样式
				new_span.style.cssText = "display:inline-block;margin:30px 0 0 0;";
				//设置新建的选择框的样式
				new_select.style.cssText = "font-size:15px;height:30px;color:black;display:inline-block;margin:5px 0 0 0;border-right:0;outline:none;";
				//设置新建的输入框的样式
				new_input.style.cssText = "font-size:15px;width:231px;height: 22px;color:black;padding:2px;outline:none;";
			} else if(find_download) {
				//客户端下载页
				let father_download = document.getElementsByClassName("logo-main")[0];
				//新建span子节点
				father_download.appendChild(new_span);
				//设置新建的span节点样式
				new_span.style.cssText = "display:inline-block;margin:5px 0 0 60px;";
				//设置新建的选择框的样式
				new_select.style.cssText = "font-size:15px;height:30px;color:black;border-right:0;outline:none;";
				//设置新建的输入框的样式
				new_input.style.cssText = "font-size:15px;width:250px;height: 22px;color:black;padding:2px;outline:none;";
				new_input.focus();
			} else if(find_version) {
				//版本更新页
				let father_version = document.getElementsByClassName("hd-main")[0];
				//新建span子节点
				father_version.appendChild(new_span);
				//设置新建的span节点样式
				new_span.style.cssText = "display:inline-block;margin:5px 0 0 100px;";
				//设置新建的选择框的样式
				new_select.style.cssText = "font-size:15px;height:30px;color:black;border-right:0;outline:none;";
				//设置新建的输入框的样式
				new_input.style.cssText = "font-size:15px;width:250px;height: 22px;color:black;padding:2px;outline:none;";
				new_input.focus();
			}

			//按钮点击事件
			new_btn.onclick = function new_btn_click() {
				//获得输入框数据
				let new_input_val = new_input.value;
				//计算输入框数据长度
				let new_input_val_len = new_input_val.length;
				//如果输入框有数据
				if(new_input_val_len > 0) {
					//获得选择框里被选中的选项索引
					let option_index = new_select.selectedIndex;
					//根据索引获得获得选择框里被选中的选项id
					let option_select_id = new_select.options[option_index].id;
					//根据id和网址目录获得网址
					let pcsearch = dirall[option_select_id][1];
					//用输入框的数据替换掉网址内的替换符
					let dti = pcsearch.replace("%sv%", new_input_val);
					//网址跳转
					window.open(dti);
				} else {
					alert("请在前面的输入框输入要搜索的内容。");
					new_input.focus();
				}
			}
		} else {
			t++;
			console.log("创建网盘搜索框已失败" + t + "次");
			//显示点不存在，一段时间后再次执行
			setTimeout(function() {
				bseg(t);
			}, 250);
		}
	} else {
		console.log("脚本作者还未涉及本页，请提示作者修改脚本。");
	}
}

//新建option
function new_option(ih, aid, ns) {
	let new_opt = document.createElement('option');
	new_opt.innerHTML = ih;
	new_opt.setAttribute("id", aid);
	ns.appendChild(new_opt);
}
//搜索引擎网址目录，%sv%为替换符
function dir_all() {
	let da = {
		"id_opt_00": {
			0: "爱搜资源",
			1: "https://www.aisouziyuan.com/?name=%sv%",
		},
		"id_opt_01": {
			0: "我爱搜盘",
			1: "https://www.52sopan.com/s.php?keyword=%sv%",
		},
		"id_opt_02": {
			0: "云盘精灵",
			1: "https://www.yunpanjingling.com/search/%sv%",
		},
		"id_opt_03": {
			0: "云盘恶魔a",
			1: "https://yunpanem.com/search/a/%sv%/1.html",
		},
		"id_opt_04": {
			0: "云盘恶魔c",
			1: "https://yunpanem.com/search/c/%sv%/1.html",
		},
		"id_opt_05": {
			0: "云盘恶魔f",
			1: "https://yunpanem.com/search/f/%sv%/1.html",
		},
		"id_opt_06": {
			0: "磁力猫",
			1: "https://www.cilimao.me/search?word=%sv%",
		},
		"id_opt_07": {
			0: "小不点搜索",
			1: "https://www.xiaobd.net/m/search?wd=%sv%",
		},
		"id_opt_08": {
			0: "胖次搜索",
			1: "https://www.panc.cc/s/%sv%/td_0",
		},
		"id_opt_09": {
			0: "天天云搜",
			1: "https://www.ttyunsou.com/s?keyword=%sv%",
		},
		"id_opt_10": {
			0: "云搜全量",
			1: "http://www.daysou.com/s?q=%sv%&start=0&isget=1&tp=all&cl=0&line=4",
		},
		"id_opt_11": {
			0: "云搜加密",
			1: "http://www.daysou.com/s?q=%sv%&start=0&isget=1&tp=all&cl=0&line=3",
		},
		"id_opt_12": {
			0: "云搜引擎1",
			1: "http://www.daysou.com/s?q=%sv%&start=0&isget=1&tp=all&cl=0&line=0",
		},
		"id_opt_13": {
			0: "云搜引擎3",
			1: "http://www.daysou.com/s?q=%sv%&start=0&isget=1&tp=all&cl=0&line=2",
		},
		"id_opt_14": {
			0: "云搜引擎2",
			1: "http://www.daysou.com/s?q=%sv%&start=0&isget=1&tp=all&cl=0&line=1",
		},
		"id_opt_15": {
			0: "鸵鸟搜索",
			1: "http://www.tuoniao.me/search/%sv%/list",
		},
		"id_opt_16": {
			0: "盘找找",
			1: "http://www.13910.com/s/?kw=%sv%",
		},
		"id_opt_17": {
			0: "verypan",
			1: "http://www.verypan.com/index/index/baidusearch?keyword=%sv%",
		},
		"id_opt_18": {
			0: "西林街搜索",
			1: "http://www.xilinjie.com/s?q=%sv%&t=pan",
		},
		"id_opt_19": {
			0: "小白盘",
			1: "http://www.xiaobaipan.com/list-%svh%",
		},
		"id_opt_20": {
			0: "盘多多",
			1: "http://www.panduoduo.net/s/name/%sv%",
		},
		"id_opt_21": {
			0: "图书盘",
			1: "http://www.tushupan.com/search?query=%sv%",
		},
		"id_opt_22": {
			0: "史莱姆搜索",
			1: "http://www.slimego.cn/search.html?q=%sv%",
		},
		"id_opt_23": {
			0: "云铺子",
			1: "http://www.yunpuzi.net/all/s-%sv%.html",
		},
		"id_opt_24": {
			0: "sola资源站",
			1: "http://www.3134.cc/search.php?kw=%sv%",
		},
		"id_opt_25": {
			0: "盘115",
			1: "http://www.guanggua.com/search?key=%sv%",
		},
		"id_opt_26": {
			0: "58网盘",
			1: "http://www.58wangpan.com/search/kw%sv%",
		},
		"id_opt_27": {
			0: "56网盘",
			1: "http://www.56wangpan.com/search/kw%sv%",
		},
		"id_opt_28": {
			0: "58网盘2",
			1: "http://wx01.51caichang.com/so?keyword=%sv%",
		},
		"id_opt_29": {
			0: "我的盘",
			1: "http://www.wodepan.com/list/%sv%-1.html",
		},
		"id_opt_30": {
			0: "及搜盘",
			1: "http://www.jisoupan.com/search/%sv%.html",
		},
		"id_opt_31": {
			0: "哎呦喂啊",
			1: "http://www.aiyoweia.com/search/%sv%",
		},
		"id_opt_32": {
			0: "爱挖盘",
			1: "http://www.iwapan.com/so.aspx?wd=%sv%",
		},
		"id_opt_33": {
			0: "盘搜",
			1: "http://www.pansou.com/?q=%sv%",
		},
		"id_opt_34": {
			0: "云搜一下",
			1: "http://sou.wolfbe.com/s?q=%sv%",
		},
		"id_opt_35": {
			0: "麦库搜索",
			1: "http://www.huisou.me/index.php?k=%sv%",
		},
		"id_opt_36": {
			0: "探索云盘",
			1: "http://tansuo233.com/?search=%sv%",
		},
		"id_opt_37": {
			0: "坑搜网",
			1: "http://www.kengso.com/s?wd=%sv%",
		},
		"id_opt_38": {
			0: "喵搜",
			1: "https://nyaso.com/dong/%sv%.html",
		},
		"id_opt_39": {
			0: "西边云",
			1: "http://www.xibianyun.com/wp/search?q=%sv%",
		},
		"id_opt_40": {
			0: "网盘搜索BT",
			1: "http://www.sosobta.cn/search/%sv%",
		},
		"id_opt_41": {
			0: "百度盘资源",
			1: "http://www.friok.com/?s=%sv%",
		},
		"id_opt_42": {
			0: "325搜",
			1: "http://pan.here325.com/s?q=%sv%",
		},
		"id_opt_43": {
			0: "6miu",
			1: "http://baiduyun.6miu.com/word.html?kw=%sv%",
		},
		"id_opt_44": {
			0: "90网盘",
			1: "https://pan.90xz.com/search/%sv%",
		},
		"id_opt_45": {
			0: "fastsoso",
			1: "https://www.fastsoso.cn/search?k=%sv%",
		},
		"id_opt_46": {
			0: "搜盘",
			1: "http://www.soupan.info/search.php?q=%sv%",
		},
		"id_opt_47": {
			0: "特多盘",
			1: "http://so.hzbslp.com/api.php?pn=1&sr=%sv%",
		},
		"id_opt_48": {
			0: "网盘资源网",
			1: "http://www.0933.me/search.html?wd=%sv%",
		},
		"id_opt_49": {
			0: "百度网盘搜",
			1: "https://www.xalssy.com.cn/search/kw%sv%",
		},
		"id_opt_50": {
			0: "特百度",
			1: "http://www.tebaidu.com/search.asp?so_md5key=79c1a7c496e5051205d46dd9b5a169a9&wd=%sv%",
		},
		"id_opt_51": {
			0: "搜搜云盘",
			1: "http://www.sosoyunpan.com/search.asp?wd=%sv%",
		},
		"id_opt_52": {
			0: "盘优搜",
			1: "http://www.panuso.com/s/%sv%.html",
		},
		"id_opt_53": {
			0: "麦库搜索",
			1: "http://huisou.me/index.php?k=%sv%",
		},
		"id_opt_54": {
			0: "网盘传奇",
			1: "https://www.jidanso.com/index.php/search/?q=%sv%",
		},
		"id_opt_55": {
			0: "SoV5",
			1: "https://www.sov5.cn/search?q=%sv%",
		},
		"id_opt_56": {
			0: "下载搜",
			1: "https://www.xiazaisou.com/wangpan?s=%sv%",
		},
		"id_opt_57": {
			0: "优质吧",
			1: "http://uzi8.cn/search/kw%sv%",
		},
		"id_opt_58": {
			0: "网盘之家",
			1: "http://www.wangpanzhijia.net/search.html?wd=%sv%",
		},
		"id_opt_59": {
			0: "众人搜网盘",
			1: "http://wangpan.renrensousuo.com/jieguo?sa=网盘搜索&q=%sv%",
		},
		"id_opt_60": {
			0: "乐依分享",
			1: "https://www.dyroy.com/html/search.html?q=%sv%",
		},
		"id_opt_61": {
			0: "网盘007",
			1: "https://wangpan007.com/share/kw%sv%",
		},
		"id_opt_62": {
			0: "百度搜索",
			1: "https://www.baidu.com/s?wd=%sv%%20pan.baidu.com&ct=1",
		},
		"id_opt_63": {
			0: "谷歌搜索",
			1: "https://www.google.com.hk/search?q=%sv%%20pan.baidu.com",
		},
		"id_opt_64": {
			0: "MEZW",
			1: "https://so.mezw.com/Search?wd=%sv%%20pan.baidu.com",
		},
		"id_opt_65": {
			0: "searx",
			1: "https://searx.me/?language=zh-CN&q=%sv%%20pan.baidu.com",
		},
		"id_opt_66": {
			0: "搜狗搜索",
			1: "https://www.sogou.com/web?ie=utf8&query=%sv%%20pan.baidu.com",
		},
		"id_opt_67": {
			0: "360好搜",
			1: "https://www.so.com/s?q=%sv%%20pan.baidu.com",
		},
		"id_opt_68": {
			0: "中国搜索",
			1: "http://www.chinaso.com/search/pagesearch.htm?q=%sv%%20pan.baidu.com",
		},
		"id_opt_69": {
			0: "必应搜索",
			1: "https://cn.bing.com/search?q=%sv%%20pan.baidu.com",
		},
		"id_opt_70": {
			0: "神马搜索",
			1: "https://m.sm.cn/s?q=%sv%%20pan.baidu.com",
		},
		"id_opt_71": {
			0: "ecosia",
			1: "https://www.ecosia.org/search?q=%sv%%20pan.baidu.com",
		},
		"id_opt_72": {
			0: "duckgo",
			1: "https://duckduckgo.com/?q=%sv%+pan.baidu.com&ia=web",
		},
		"id_opt_73": {
			0: "crawler",
			1: "http://www.webcrawler.com/serp?q=%sv%%20pan.baidu.com",
		},
		"id_opt_74": {
			0: "web.de",
			1: "https://suche.web.de/web/result?q=%sv%%20pan.baidu.com",
		},
		"id_opt_75": {
			0: "swisscows",
			1: "https://swisscows.ch/web?query=%sv%%20pan.baidu.com&region=zh-CN",
		},
		"id_opt_76": {
			0: "去转盘",
			1: "http://www.quzhuanpan.com/source/search.action?q=%sv%",
		},
		"id_opt_77": {
			0: "猪猪盘总线",
			1: "http://www.zhuzhupan.com/search?s=100&query=%sv%",
		},
		"id_opt_78": {
			0: "猪猪盘1",
			1: "http://www.zhuzhupan.com/search?s=1&query=%sv%",
		},
		"id_opt_79": {
			0: "猪猪盘2",
			1: "http://www.zhuzhupan.com/search?s=2&query=%sv%",
		},
		"id_opt_80": {
			0: "猪猪盘3",
			1: "http://www.zhuzhupan.com/search?s=3&query=%sv%",
		},
		"id_opt_81": {
			0: "猪猪盘4",
			1: "http://www.zhuzhupan.com/search?s=4&query=%sv%",
		},
		"id_opt_82": {
			0: "猪猪盘5",
			1: "http://www.zhuzhupan.com/search?s=5&query=%sv%",
		},
		"id_opt_83": {
			0: "猪猪盘6",
			1: "http://www.zhuzhupan.com/search?s=6&query=%sv%",
		},
		"id_opt_84": {
			0: "猪猪盘7",
			1: "http://www.zhuzhupan.com/search?s=7&query=%sv%",
		},
		"id_opt_85": {
			0: "猪猪盘8",
			1: "http://www.zhuzhupan.com/search?s=8&query=%sv%",
		},
		"id_opt_86": {
			0: "搜云盘",
			1: "http://www.soyunpan.com/search/%sv%-0-全部-0.html",
		},

	};
	return da;
}
