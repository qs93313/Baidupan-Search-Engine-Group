// ==UserScript==
// @name         百度网盘资源_搜索引擎_聚合
// @version      2.95
// @description  在百度云盘页面中新增百度网盘资源_搜索引擎_聚合
// @match        *://pan.baidu.com/*
// @match        *://yun.baidu.com/*
// @match        *://zhaohui.baidu.com/*
// @match        *://duanxin.baidu.com/*
// @match        *://note.baidu.com/*
// @match        *://wenzhang.baidu.com/*
// @match        *://tongxunlu.baidu.com/*
// @match        *://tonghuajilu.baidu.com/*
// @grant        来自各个网盘百度资源搜索引擎开发者
// @author       太史子义慈
// @namespace    qs93313@sina.cn
// ==/UserScript==

!(function() {
	bseg(0);
})();

function bseg(t) {
	//最多找100次
	if(t < 100) {
		//获取body
		var body = document.body;

		//获取域名
		var wlhost = window.location.host;

		//主页（https://pan.baidu.com/netdisk/home，等）
		var find_home = (document.querySelector(".find-light-icon") !== null);

		//密码填写页（https://pan.baidu.com/share/init?surl=……）
		var find_init = (document.querySelector(".verify-form") !== null);

		//客户端下载页（https://pan.baidu.com/download || 无视https://pan.baidu.com/disk/award）
		var find_download = (document.querySelector("#logo-main") !== null);

		//版本更新页 | 服务协议（https://pan.baidu.com/disk/version/ || https://pan.baidu.com/disk/duty/ || https://yun.baidu.com/disk/autoduty || https://pan.baidu.com/disk/protocol 等）
		var find_version = (document.querySelector(".help-all") !== null || document.querySelector(".main-i") !== null);

		//支付中心页（https://pan.baidu.com/buy/checkoutcounter）
		var find_checkout = (document.querySelector(".cashier-page-header") !== null);

		//内容商城（https://pan.baidu.com/mall/home?from=panhome）
		var find_mall = (document.querySelector(".ts-logo__text") !== null);

		//会员中心（https://pan.baidu.com/buy/center || https://pan.baidu.com/buy/card）
		var find_center = (document.querySelector(".header-content") !== null);

		//页面不存在
		var find_error = (document.querySelector(".hd-main") !== null);

		//文章页（https://wenzhang.baidu.com/ || https://pan.baidu.com/tools 等）
		var find_wenzhang = (document.querySelector(".__header") !== null);

		//未登录页
		var find_notlogin = (document.querySelector("#login-header") !== null);

		//失效邀请
		var find_sx = (document.querySelector(".share-invite-box") !== null);

		//综合
		var find_or = (find_home || find_init || find_download || find_version || find_checkout || find_mall || find_center || find_error || find_wenzhang || find_notlogin || find_sx);
		//确定显示点是否存在
		if(find_or) {
			//循环索引
			var i, j;

			//搜索引擎网址目录
			var dirall = [];
			var dirallot = dir_all_ot();
			for(i in dirallot) {
				for(j in dirallot[i][2]) {
					var dirallotita = [dirallot[i][1] + dirallot[i][2][j][0], dirallot[i][2][j][1], dirallot[i][2][j][2], dirallot[i][0]];
					dirall.push(dirallotita);
				}
			}

			//新建span子节点
			var new_span = document.createElement('span');
			new_span.setAttribute("id", "id_new_span");

			//span节点建div解释说明子节点
			var new_div_instruct = document.createElement('div');
			new_div_instruct.setAttribute("id", "instruct");
			new_div_instruct.innerHTML = "释";
			new_div_instruct.style.cssText = "display:inline-block;border-top:1px solid lightgray;border-left:1px solid lightgray;border-bottom:1px solid lightgray;font-size:10px;width: 15px;height:20px;line-height:20px;border-radius: 12px 0 0 12px;color:lightgrey;cursor:pointer;text-align:right;-webkit-user-select:none;-moz-user-select:none;-ms-user-select:none;user-select:none;";
			new_span.appendChild(new_div_instruct);

			//span节点再建【选择框】子节点
			var new_select = document.createElement('select');
			new_span.appendChild(new_select);
			new_select.style.cssText = "font-size:15px;border:1px solid #A9A9A9;color:black;background-color:white;";

			//选择框子节点下面要建立大量【选项】子节点
			for(i in dirall) {
				var v = dirall[i][0];
				var i1 = "new_opt_" + i;
				new_option(v, i1, new_select);
			}

			//span节点再建【输入框】子节点
			var new_input = document.createElement('input');
			new_input.setAttribute("id", "scont");
			new_input.setAttribute("class", "scont");
			new_input.setAttribute("placeholder", "请输入内容[油猴脚本]");
			new_input.setAttribute("autocomplete", "off");
			new_span.appendChild(new_input);
			new_input.style.cssText = "display:inline-block;border-top:1px solid #A9A9A9;border-bottom:1px solid #A9A9A9;border-left:0;border-right:0;font-size:15px;color:black;outline:none;padding:2px;background-color:white;outline:none;box-sizing:content-box;margin:0;cursor:text;font-family:'Microsoft YaHei',arial,SimSun,宋体;"

			//span节点再建【清除输入框】子节点
			var new_x_btnd = document.createElement('div');
			new_x_btnd.innerHTML = "×";
			new_span.appendChild(new_x_btnd);
			new_x_btnd.style.cssText = "font-size:15px;width:16px;height:24px;line-height:24px;color:black;background-color:white;border-top:1px solid #a9a9a9;border-bottom:1px solid #a9a9a9;border-left:0;border-right:0;padding:2px 0;text-align:center;outline:none;display:inline-block;cursor:pointer;-webkit-user-select: none;-moz-user-select:none;-ms-user-select:none;user-select:none;"

			//span节点再建【按钮】子节点
			var new_btn = document.createElement('button');
			new_btn.innerHTML = "搜索";
			new_span.appendChild(new_btn);
			new_btn.style.cssText = "font-size:14px;width:52px;height:29px;color:white;border:1px solid #A9A9A9;padding:0;-webkit-user-select: none;-moz-user-select: none;-ms-user-select: none;user-select: none";
			new_btn.style.background = "#3B8CFF";
			new_btn.onmouseenter = function() {
				new_btn.style.background = "#7EB2FF";
			};
			new_btn.onmouseleave = function() {
				new_btn.style.background = "#3B8CFF";
			};

			//找到【父亲节点】【！！！注意每个页面父节点不同！！！】
			if(find_home) {
				//首页
				var father_home = document.getElementsByClassName("vyQHNyb")[0];
				if(father_home) {
					father_home.style.cssText = "margin-left: 0!important;;";
					//主页清除广告，腾位置
					var cMEMEF = document.getElementsByClassName("cMEMEF");
					if(cMEMEF) {
						var cMEMEF_len = cMEMEF.length;
						for(i = 0; i < cMEMEF_len; i++) {
							cMEMEF[i].style.cssText = "margin:0 8px!important;";
							if(i == 2) {
								cMEMEF[i].style.display = "none";
							}
						}
					}
					//新建span子节点
					father_home.appendChild(new_span);
					new_span.style.cssText = "margin:0 0 0 10px;";
					//设置新建的选择框的样式
					new_select.style.cssText += "height:30px;";
					//设置新建的输入框的样式
					new_input.style.cssText += "width:264px;height:24px;";
					new_input.focus();
					//短信、通讯录的搜索框
					if(wlhost == "duanxin.baidu.com" || wlhost == "tongxunlu.baidu.com") {
						barSearch(0, new_input);
					}
				}
			} else if(find_init) {
				//密码填写页
				var father_init = document.getElementsByClassName("pickpw")[0];
				if(father_init) {
					//新建span子节点
					father_init.appendChild(new_span);
					//设置新建的span节点样式
					new_span.style.cssText = "display:inline-block;margin:35px 0 0 0;";
					//设置新建的选择框的样式
					new_select.style.cssText += "height:30px;width:100px;display:inline-block;";
					//设置新建的输入框的样式
					new_input.style.cssText += "width:202px;height:24px;";
					new_btn.style.width = "42px";
					//清理版面
					var verify_input = document.getElementsByClassName('verify-input')[0];
					verify_input.style.paddingBottom = "20px";
				}
			} else if(find_download) {
				//客户端下载页
				var father_download = document.getElementsByClassName("logo-main")[0];
				if(father_download) {
					//新建span子节点
					father_download.appendChild(new_span);
					//设置新建的span节点样式
					new_span.style.cssText = "display:inline-block;margin:5px 0 0 48px;";
					//设置新建的选择框的样式
					new_select.style.cssText += "height:30px;";
					//设置新建的输入框的样式
					new_input.style.cssText += "width:234px;height:24px;";
					new_input.focus();
				}
			} else if(find_version) {
				//版本更新页
				var father_version = document.getElementsByClassName("hd-main")[0];
				if(father_version) {
					//新建span子节点
					father_version.appendChild(new_span);
					//设置新建的span节点样式
					new_span.style.cssText = "display:inline-block;margin:5px 0 0 85px;";
					//设置新建的选择框的样式
					new_select.style.cssText += "height:30px;";
					//设置新建的输入框的样式
					new_input.style.cssText += "width:234px;height:24px;";
					new_input.focus();
				}
			} else if(find_checkout) {
				//支付中心页
				var father_checkout = document.getElementsByClassName("cashier-page-header")[0];
				if(father_checkout) {
					var bro_checkout = document.getElementsByClassName("cashier-page-ul")[0];
					//新建span子节点
					father_checkout.insertBefore(new_span, bro_checkout);
					//设置新建的span节点样式
					new_span.style.cssText = "display:inline-block;margin:5px 0 0 10px;";
					//设置新建的选择框的样式
					new_select.style.cssText += "height:30px;";
					//设置新建的输入框的样式
					new_input.style.cssText += "width:234px;height:24px;";
					//设置按钮样式
					new_btn.style.height = "31px";
					new_btn.style.lineHeight = "31px";
					new_input.focus();
				}
			} else if(find_mall) {
				//内容商城页
				var father_mall = document.getElementsByClassName("ts-category")[0];
				if(father_mall) {
					//新建span子节点
					father_mall.appendChild(new_span);
					//设置新建的span节点样式
					new_span.style.cssText = "margin:0 0 0 3px;";
					//设置新建的选择框的样式
					new_select.style.cssText += "height:30px;";
					//设置新建的输入框的样式
					new_input.style.cssText += "width:215px;height:20px;padding:4px 2px;border-left:1px solid black;";
					//设置新建的按钮样式
					new_btn.style.height = "30px";
					new_btn.style.lineHeight = "4px";
					//设置父节点样式
					father_mall.style.left = "200px";
					//设置兄弟节点样式
					var tce = document.getElementsByClassName("ts-category__entry");
					if(tce) {
						var tce_len = tce.length;
						for(i = 0; i < tce_len; i++) {
							tce[i].style.cssText = "padding:0 8px!important;";
						}
					}
				}
			} else if(find_center) {
				//会员中心页
				var father_center = document.getElementsByClassName("header-content")[0];
				var bro_center = document.getElementsByClassName("activation-code")[0];
				if(father_center && bro_center) {
					//新建span子节点
					father_center.insertBefore(new_span, bro_center);
					new_span.style.cssText = "display:inline-block;float:left;margin:19px 0 0 7px;";
					//删除log，腾地方
					var lml = document.getElementsByClassName("logo-main-link")[0];
					if(lml) {
						lml.style.display = "none";
					}
					//拓宽header
					var hc = document.getElementsByClassName("header-content")[0];
					if(hc) {
						hc.style.width = "1140px";
					}
					//设置侄节点样式
					var nb = document.getElementsByClassName("nav-button");
					if(nb) {
						var nb_len = nb.length;
						for(i = 0; i < nb_len; i++) {
							nb[i].style.cssText = "margin:0 5px!important;";
						}
					}
					var fnbs = document.getElementsByClassName("first-nav-button-sub")[0];
					if(fnbs) {
						fnbs.style.marginLeft = "250px";
					}
					//设置新建的选择框的样式
					new_select.style.cssText += "height:30px;width:100px;";
					//设置新建的输入框的样式
					new_input.style.cssText += "width:176px;height:24px;";
					new_input.focus();
					//设置新建的按钮样式
					new_btn.style.height = "30px";
					new_btn.style.lineHeight = "30px";
				}
			} else if(find_error) {
				//页面不存在
				var father_error = document.getElementsByClassName("hd-main")[0];
				var bro_error = document.getElementsByClassName("info")[0];
				if(father_error && bro_error) {
					//新建span子节点
					father_error.insertBefore(new_span, bro_error);
					new_span.style.cssText = "display:inline-block;float:left;margin:7px 0 0 85px;";
					//设置新建的选择框的样式
					new_select.style.cssText += "height:30px;";
					//设置新建的输入框的样式
					new_input.style.cssText += "width:255px;height:24px;";
					new_input.focus();
					//设置新建的按钮样式
					new_btn.style.height = "30px";
					new_btn.style.lineHeight = "30px";
				}
			} else if(find_wenzhang) {
				//文章页
				var father_wenzhang = document.getElementsByClassName("__header")[0];
				var bro_wenzhang = document.getElementsByClassName("__tools")[0];
				if(father_wenzhang && bro_wenzhang) {
					//新建span子节点
					father_wenzhang.insertBefore(new_span, bro_wenzhang);
					//设置新建的span节点样式
					new_span.style.cssText = "display:inline-block;margin:11px 0px 0px 50px";
					//设置新建的选择框的样式
					new_select.style.cssText += "height:30px;display:inline-block;";
					//设置新建的输入框的样式
					new_input.style.cssText += "width:264px;height:24px;";
				}
			} else if(find_notlogin) {
				//未登录页
				var father_notlogin = document.getElementById("login-header");
				var bro_notlogin = document.getElementsByClassName("login-title")[0];
				if(father_notlogin && bro_notlogin) {
					//新建span子节点
					father_notlogin.insertBefore(new_span, bro_notlogin);
					//设置新建的span节点样式
					new_span.style.cssText = "display:inline-block;margin:18px 0px 0px 2px";
					//设置新建的选择框的样式
					new_select.style.cssText += "height:30px;display:inline-block;";
					//设置新建的输入框的样式
					new_input.style.cssText += "width:214px;height:24px;";

					//版面清理
					var b_no_ln = document.getElementsByClassName("b-no-ln");
					if(b_no_ln) {
						var b_no_ln_len = b_no_ln.length;
						for(i = 0; i < b_no_ln_len; i++) {
							b_no_ln[i].style.marginRight = "4px";
						}
					}
				}
			} else if(find_sx) {
				//失效邀请
				var father_sx = document.getElementsByClassName('share-invite-box')[0];
				var bro_sx = document.getElementsByClassName('invite-bg-container')[0];
				if(father_sx && bro_sx) {
					//新建span子节点
					father_sx.insertBefore(new_span, bro_sx);
					//设置新建的span节点样式
					new_span.style.cssText = "display:inline-block;margin:18px 0px 0px 240px";
					//设置新建的选择框的样式
					new_select.style.cssText += "height:30px;display:inline-block;";
					//设置新建的输入框的样式
					new_input.style.cssText += "width:214px;height:24px;";
				}
			}

			//提示事件
			var new_div_alert = document.createElement('div');
			new_div_alert.setAttribute("id", "alert");
			new_div_alert.style.cssText = "position: absolute;width:450px;height:120px;top:62px;background-color:white;border:1px solid lightgray;z-index:9999;border-radius:7px;margin:0 auto;left:0;right:0;";
			new_div_alert.style.display = "none";
			body.appendChild(new_div_alert);

			//提示文字
			var new_div_alert_c = document.createElement('div');
			new_div_alert_c.innerHTML = "<a href='https://greasyfork.org/zh-CN/scripts/375337' target='_blank' style='color:green;font-size:15px;'>[油猴脚本][百度网盘资源搜索引擎聚合]</a>提示您：<br><span style='font-size:18px;color:red;'>请在输入框输入要搜索的内容。</span>";
			new_div_alert_c.style.cssText = "height:42px;font-size:14px;padding:15px;letter-spacing:1px;"
			new_div_alert.appendChild(new_div_alert_c);

			//确定按钮
			var new_alert_btn = document.createElement('button');
			new_alert_btn.innerHTML = "确定";
			new_alert_btn.style.cssText = "font-size:14px;width:64px;height:32px;color:white;cursor:pointer;padding:0;border:0;background:rgb(59,140,255);border-radius:3px;margin-left:370px;";
			new_div_alert.appendChild(new_alert_btn);

			//删除按钮点击事件
			new_x_btnd.onclick = function() {
				new_input.value = "";
				new_btn.style.cursor = "not-allowed";
			}

			//获得输入框数据
			var new_input_val;
			//计算输入框数据长度
			var new_input_val_len;
			//默认鼠标样式
			new_btn.style.cursor = "not-allowed";
			//监控输入框
			new_input.oninput = function() {
				new_input_val = new_input.value;
				new_input_val_len = new_input_val.length;
				//如果输入框有数据
				if(new_input_val_len > 0) {
					//鼠标样式变为手指
					new_btn.style.cursor = "pointer";
				} else {
					//鼠标样式变为禁止
					new_btn.style.cursor = "not-allowed";
				}
			}
			//搜索按钮点击事件
			new_btn.onclick = function() {
				new_input_val = new_input.value;
				new_input_val_len = new_input_val.length;
				//如果输入框有数据
				if(new_input_val_len > 0) {
					//获得选择框里被选中的选项索引
					var option_index = new_select.selectedIndex;
					//判断是get还是post
					var http_ajax = dirall[option_index][2];
					if(http_ajax == "get") {
						//根据id和网址目录获得网址
						var pcsearch = dirall[option_index][1];
						//用输入框的数据替换掉网址内的替换符
						var dti = pcsearch.replace("%sv%", new_input_val);
						//网址跳转
						window.open(dti);
					} else if(http_ajax == "post") {
						var p_url = dirall[option_index][3];
						var p_params = {
							kw: new_input_val
						};
						httpPost(p_url, p_params);
					}
				} else {
					//出现提示
					new_div_alert.style.display = "block";
					//几秒后自动消失
					setTimeout(function() {
						new_div_alert.style.display = "none";
					}, 2100);
					new_input.focus();
				}
			}

			//确定按钮点击事件
			new_alert_btn.onclick = function() {
				new_div_alert.style.display = "none";
				new_input.focus();
			}

			//建立解释说明弹出页
			var new_div_in_all = document.createElement('div');
			new_div_in_all.setAttribute("id", "in_all");
			new_div_in_all.style.cssText = "position: absolute;width:614px;height:410px;top:62px;left:14px;background-color:white;border:1px solid lightgray;z-index:998;border-radius:7px;";
			new_div_in_all.style.display = "none";
			body.appendChild(new_div_in_all);

			//说明书标题
			var new_div_in_title = document.createElement('div');
			new_div_in_title.innerHTML = "<a href='https://greasyfork.org/zh-CN/scripts/375337' target='_blank' style='color:green;text-decoration:underline;'>[油猴脚本][百度网盘资源_搜索引擎_聚合]</a>使用说明书"
			new_div_in_title.style.cssText = "height:20px;border-bottom:1px solid lightgray;text-align:center;font-size:14px;padding:5px;font-weight:700;letter-spacing:1px;"
			new_div_in_all.appendChild(new_div_in_title);

			//隐藏说明书
			xxlar(new_div_in_all, new_div_in_title);

			//说明书内容
			var new_div_in_text = document.createElement('div');
			new_div_in_text.style.cssText = "margin:10px 10px 10px 10px;width:594px;height:360px;font-size:15px;overflow-y:auto;text-align:justify;text-indent:30px;"
			var in_text = inText();
			new_div_in_text.innerHTML = in_text;
			new_div_in_all.appendChild(new_div_in_text);

			//span节点再建div求赏点击子节点
			var new_div_reward = document.createElement('div');
			new_div_reward.setAttribute("id", "reward");
			new_div_reward.innerHTML = "助";
			new_div_reward.style.cssText = "display:inline-block;border-top:1px solid lightgray;border-right:1px solid lightgray;border-bottom:1px solid lightgray;font-size:10px;width: 15px;height:20px;line-height:20px;border-radius: 0 12px 12px 0;color:lightgrey;cursor:pointer;-webkit-user-select:none;-moz-user-select:none;-ms-user-select:none;user-select:none;";
			new_span.appendChild(new_div_reward);

			//建div支持作者二维码放置子节点
			var new_div_qr_all = document.createElement('div');
			new_div_qr_all.setAttribute("id", "qr_all");
			new_div_qr_all.style.cssText = "position: absolute;width:820px;height:410px;top:62px;right:14px;background-color:white;border:1px solid lightgray;z-index:999;border-radius:7px;-webkit-user-select:none;-moz-user-select:none;-ms-user-select:none;user-select:none;";
			new_div_qr_all.style.display = "none";
			body.appendChild(new_div_qr_all);

			//支持作者标题
			var new_div_qr_title = document.createElement('div');
			new_div_qr_title.innerHTML = "感谢你支持<a href='https://greasyfork.org/zh-CN/scripts/375337' target='_blank' style='color:green'> [油猴脚本] [百度网盘资源_搜索引擎_聚合] </a>的作者,谢谢"
			new_div_qr_title.style.cssText = "height:20px;border-bottom:1px solid lightgray;text-align:center;font-size:14px;padding:5px;font-weight:700;letter-spacing:1px;"
			new_div_qr_all.appendChild(new_div_qr_title);

			xxlar(new_div_qr_all, new_div_qr_title);

			//
			var new_div_qr_text = document.createElement('div');
			new_div_qr_text.style.cssText = "overflow-y:auto;height:370px;";
			new_div_qr_all.appendChild(new_div_qr_text);

			var gg = "<span style='background-color:red;color:white;'>&nbsp;广告&nbsp;</span>&nbsp;";
			var qrArr = [
				//支付宝红包
				[qrAlipayHongbao(), "<span style='color:#2790D6'>支付宝</span>扫描<br><span style='color:red;'>领红包</span>"],
				//支付宝
				[qrAlipay(), "<span style='color:#2790D6'>支付宝</span>扫描<br>捐助支持"],
				//微信
				[qrWechat(), "<span style='color:#7CAA0D'>微信</span>扫描<br>捐助支持"],
				//QQ
				[qrQQ(), "QQ扫描<br>捐助支持"],
				//百度网盘
				[qrBaiduPan(), "<span style='color:#2F73EF'>百度网盘</span><br>一起领极速下载特权"],
				//天天趣闻
				[qrTtqw(), gg + "<span style='color:#FA394E'>天天趣闻</span><br>看新闻 赚零钱"],
				//淘新闻
				[qrTxw(), gg + "<span style='color:#FF4424'>淘新闻</span>(<span style='color:#7CAA0D'>微信</span>扫描)<br>看新闻 赚零花"],
				//大众看点
				[qrDzkd(), gg + "<span style='color:#C70000'>大众看点</span><br>大众有看点 人人有价值"],
				//一淘
				[qrYt(), gg + "<span style='color:#EA100F'>一淘官方返利</span><br>上一淘 能省会赚"],
				//一折特卖
				[qrYztm(), gg + "<span style='color:#EE4C40'>一折特卖</span><br>送集分宝 能淘宝抵现"],
				//淘粉吧
				[qrTfb(), gg + "<span style='color:#FE5100'>淘粉吧</span><br>所见即有返利"],
				//利趣网
				[qrLq(), gg + "<span style='color:#FE5100'>利趣网</span><br>返利拿到手软"],
				//惠头条
				[qrHtt(), gg + "<span style='color:#FE3D44'>惠头条</span> 浏览赚金币<br>邀请码：<span style='background-color:#950AD3;color:white;'>&nbsp;81060729&nbsp;</span>"],
				//蚂蚁头条
				[qrMytt(), gg + "<span style='color:#E83425'>蚂蚁头条</span>(<span style='color:#7CAA0D'>微信</span>扫描)<br>让阅读更有价值"],
				//东方头条
				[qrDftt(), gg + "<span style='color:#F90000'>东方头条</span><br>做您关注的头条"],
				//4399
				[qr4399(), gg + "<span style='color:#067707'>4399游戏盒</span><br>玩游戏 赚盒币 抵集分宝"],

			];
			for(i in qrArr) {
				var qrArr_i = qrArr[i];
				var qrArr_i_0 = qrArr_i[0];
				var qrArr_i_1 = qrArr_i[1];
				qrGenerate(new_div_qr_text, qrArr_i_0, qrArr_i_1);
			}

			//说明书点击事件
			new_div_instruct.onclick = function() {
				var ndin_display = new_div_in_all.style.display;
				if(ndin_display == "none") {
					new_div_in_all.style.display = "block";
				} else if(ndin_display == "block") {
					new_div_in_all.style.display = "none";
				}
			}

			//求赏点击事件
			new_div_reward.onclick = function() {
				var ndqr_display = new_div_qr_all.style.display;
				if(ndqr_display == "none") {
					new_div_qr_all.style.display = "block";
				} else if(ndqr_display == "block") {
					new_div_qr_all.style.display = "none";
				}
			}
		} else {
			t++;
			console.log("创建网盘资源搜索框已失败" + t + "次。[油猴脚本]");
			//显示点不存在，一段时间后再次执行
			setTimeout(function() {
				bseg(t);
			}, 250);
		}
	} else {
		console.log("脚本作者还未涉及本页，请提示作者修改脚本。[油猴脚本]");
	}
}

//补零，num传入的数字，n需要的字符长度
function PrefixInteger(num, n) {
	return(Array(n).join(0) + num).slice(-n);
}

//新建option
function new_option(ih, aid, ns) {
	var new_opt = document.createElement('option');
	new_opt.innerHTML = ih;
	new_opt.setAttribute("id", aid);
	ns.appendChild(new_opt);
}

//短信、通讯录的搜索框
function barSearch(t1, ni) {
	if(t1 < 10) {
		var bar_search = (document.querySelector(".bar-search") !== null);
		if(bar_search) {
			ni.style.width = "240px";
		} else {
			t1++;
			setTimeout(function() {
				barSearch(t1, ni);
			}, 500);
		}
	}
}

//关闭按钮
function xx(gf, f, lar) {
	var new_close = document.createElement('div');
	new_close.innerHTML = "×";
	new_close.style.cssText = "width:22px;height:22px;background-color:#B4E3FF;border-radius:11px;color:red;cursor:pointer;line-height:normal;"
	new_close.style.float = lar;
	f.appendChild(new_close);
	new_close.onclick = function() {
		gf.style.display = "none";
	}
}

//关闭按钮左右两个
function xxlar(gf, f) {
	xx(gf, f, "left");
	xx(gf, f, "right");
}

//拼接说明书
function inText() {
	var i;
	var te = '';
	te += '<p>';
	te += '脚本在 ';
	var user_scripts = [
		['https://greasyfork.org/zh-CN/scripts/375337', 'Greasy Fork', ],
		['https://github.com/qs93313/Baidupan-Search-Engine-Group/blob/master/bseg.user.js', 'github', ],
		['https://52youhou.com/userscript/userjs-rqj9q', '吾爱油猴', ],
	];
	var uslf = user_scripts.length - 1;
	for(i in user_scripts) {
		var uc = user_scripts[i];
		var uc0 = uc[0];
		var uc1 = uc[1];
		te += '<a href="';
		te += uc0;
		te += '" target=_blank" style="color:green;text-decoration:underline;">';
		te += uc1;
		te += '</a>';
		if(i < uslf) {
			te += '、';
		}
	}
	te += ' 分享。';
	te += '</p><br><p>';
	te += '该脚本将会频繁更新。由于这是脚本，数据并非存在某服务器的数据库里，而是直接写死在脚本里，数据更新即脚本更新。这些百度网盘搜索引擎网站的规则数据是会发生改变的，作者会注意网站的规则变化并立即更新脚本。';
	te += '</p><br><p>';
	te += '<b style="color:red;">注意！这些搜索网页上难免有广告，推荐使用<a href="https://www.yiclear.com/download/" target=_blank" style="color:green;text-decoration:underline;">广告净化器</a>等扩展屏蔽广告。</b>';
	te += '</p><br><p>';
	te += '<b style="color:red;">注意！自动填写密码的浏览器扩展有：';
	var other_pwd = [
		['https://www.aisouziyuan.com/helper.html', '爱搜资源助手', ],
		['https://ypsuperkey.meek.com.cn/', '云盘万能钥匙', ],
		['http://www.bmqy.net/1466.html', '百度云分享链接一键登录', ],
	];
	var oplf = other_pwd.length - 1;
	for(i in other_pwd) {
		var op = other_pwd[i];
		var op0 = op[0];
		var op1 = op[1];
		te += '<a href="';
		te += op0;
		te += '" target=_blank" style="color:green;text-decoration:underline;">';
		te += op1;
		te += '</a>';
		if(i < oplf) {
			te += '、';
		} else {
			te += '。';
		}
	}
	te += '</b>它们的数据来源不同，都装上有更大几率获取密码。';
	te += '</p></br><p>';
	te += '下面列举脚本中已聚合的百度网盘资源_搜索引擎：';
	te += '<br>';
	var tea = dir_all_ot();
	for(i in tea) {
		var teaa = tea[i];
		var teaa0 = teaa[0];
		var teaa1 = teaa[1];
		var a1 = parseInt(i) + 1;
		a1 = (a1 < 10) ? ('0' + a1) : a1;
		a1 = (a1 < 100) ? ('0' + a1) : a1;
		te += '<div style="display:inline-block;width:144px;text-indent:0;">';
		te += '<div style="display:inline-block;width:33px;height:22px;margin:1px 3px 1px 1px;border:1px solid red;text-align:center;background-color:yellow;border-radius: 17px 17px 17px 17px / 12px 12px 12px 12px;">';
		te += a1;
		te += '</div>';
		te += '<a href="';
		te += teaa0;
		te += '" target=_blank" style="color:green;text-decoration:underline;">';
		te += '[';
		te += teaa1;
		te += '] ';
		te += '</a>';
		te += '</div>'
	}
	te += '</p><br><p>';
	te += '搜索引擎的排序权重为：';
	var ws = [
		['网站必须能访问，网站不能访问删除。'],
		['网站访问要稳定，网站访问稳定的靠前。'],
		['搜索引擎是否收费，免费的搜索引擎靠前。'],
		['搜索引擎是否专门搜索百度网盘资源，专门搜索百度网盘资源的靠前。'],
		['网站服务器的位置，服务器在境内的靠前。'],
		['搜索结果的数量，数量多的靠前。'],
		['搜索结果的质量，失效链接少的靠前。'],
		['搜索结果是否及时更新，及时更新的靠前。'],
		['网站请求采用的字符编码，已知编码的靠前，MD5编码的靠最后，未知编码的删除。'],
		['已知字符编码的排序，从前往后依次是单层url编码、双层url编码、gbk编码、Escape编码、Base64编码、Unicode编码。'],
		['网站采用的HTTP请求方法，采用get方法的靠前。'],
		['是否有加密分享结果，有加密分享结果的靠前。'],
		['在已采用广告屏蔽插件的情况下，依然有广告的靠后。'],
		['是否有自动填加密分享密码的插件，有插件的靠前。'],
		['网站使用HTTPS协议的靠前。'],
	];
	for(i in ws) {
		te += "</p><p>";
		var wsi = ws[i];
		var a2 = parseInt(i) + 1;
		a2 = (a2 < 10) ? ('0' + a2) : a2;
		te += a2;
		te += "：";
		te += wsi;
	}
	te += '</p><br><p>';
	te += '说明书还在进一步完善中。';
	te += '</p><br><p>';
	te += '还可以尝试作者其他脚本：';
	te += '</p>';
	var other_scripts = [
		['https://greasyfork.org/zh-CN/scripts/39971', '同一词条在百度百科维基百科等网络百科中互相跳转', ],
		['https://greasyfork.org/zh-CN/scripts/376187', '百度首页自定义导航直接展开', ],
		['https://greasyfork.org/zh-CN/scripts/375776', '吾爱油猴自动签到', ],
		['https://greasyfork.org/zh-CN/scripts/375838', 'Greasy Fork 简体汉字页面显示日均安装量', ],
		['https://greasyfork.org/zh-CN/scripts/375799', '全网禁用input自动完成', ],
	];
	for(i in other_scripts) {
		var osb = other_scripts[i];
		var osb0 = osb[0];
		var osb1 = osb[1];
		te += '<p><a href="';
		te += osb0;
		te += '" target=_blank" style="color:green;text-decoration:underline;">';
		te += '[';
		te += osb1;
		te += '] ';
		te += '</a></p>';
	}
	return te;
}

function qrGenerate(f, qrm, cih) {

	var div_qr_c = document.createElement('div');
	div_qr_c.style.cssText = "width:200px;height:254px;border-bottom:1px dotted lightgray;display:inline-block;";
	f.appendChild(div_qr_c);

	var img_qr = document.createElement('img');
	img_qr.style.cssText = "width:180px;height:180px;border:1px solid lightgray;margin:9px 9px 0 9px;";
	var base64_qr = qrm;
	img_qr.setAttribute('src', base64_qr);
	div_qr_c.appendChild(img_qr);

	var div_c = document.createElement('div');
	div_c.innerHTML = cih;
	div_c.style.cssText = "width:200px;height:60px;display:inline-block;text-align:center;font-size:16px;"
	div_qr_c.appendChild(div_c);
}

//模拟post访问
function httpPost(URL, PARAMS, AC) {
	//建元素节点。返回一个 Element 对象。
	var temp = document.createElement("form");
	//设置属性：新标签打开
	temp.target = "_blank";
	//设置属性：要访问的地址
	temp.action = URL;
	//设置属性：数据请求方式：post
	temp.method = "post";
	//设置属性：数据编码"GB2312"这种。默认"UTF-8"
	temp.acceptCharset = AC;
	//设置属性class
	temp.className = 'tpost';
	for(var x in PARAMS) {
		var opt = document.createElement("textarea");
		opt.name = x;
		opt.value = PARAMS[x];
		temp.appendChild(opt);
	}
	document.body.appendChild(temp);
	temp.submit();
	return temp;
}

function dir_all_ot() {
	var tea = [
		["https://www.aisouziyuan.com/", "爱搜资源", [
			["", "https://www.aisouziyuan.com/?name=%sv%", "get", ],
		], ],
		["https://www.52sopan.com/", "我爱搜盘", [
			["", "https://www.52sopan.com/s.php?keyword=%sv%", "get", ],
		], ],
		["https://www.yunpanjingling.com/", "云盘精灵", [
			["", "https://www.yunpanjingling.com/search/%sv%", "get", ],
		], ],
		["http://www.pansoso.com/", "盘搜搜", [
			["", "http://www.pansoso.com/zh/%sv%", "get", ],
		], ],
		["https://www.h2ero.com/", "闪电云", [
			["", "https://www.h2ero.com/search?keywords=%sv%", "get", ],
		], ],
		["https://yunpanem.com/", "云盘恶魔", [
			["c", "https://yunpanem.com/search/c/%sv%/1.html", "get", ],
			["a", "https://yunpanem.com/search/a/%sv%/1.html", "get", ],
			["f", "https://yunpanem.com/search/f/%sv%/1.html", "get", ],
		], ],
		["http://www.xiaobaipan.com/", "小白盘", [
			["", "http://www.xiaobaipan.com/list-%sv%.html", "get", ],
		], ],
		["https://nyaso.com/", "喵搜", [
			["", "https://nyaso.com/dong/%sv%.html", "get", ],
		], ],
		["https://www.fqsousou.com/", "番茄搜搜", [
			["", "https://www.fqsousou.com/s/%sv%.html", "get", ],
		], ],
		["https://www.xiaoso.net/", "小不点搜索", [
			["", "https://www.xiaobd.net/m/search?wd=%sv%", "get", ],
		], ],
		["http://www.panduoduo.net/", "盘多多", [
			["", "http://www.panduoduo.net/s/name/%sv%", "get", ],
		], ],
		["http://www.slimego.cn/", "史莱姆", [
			["", "http://www.slimego.cn/search.html?q=%sv%", "get", ],
		], ],
		["http://www.kengso.com/", "坑搜网", [
			["", "http://www.kengso.com/s?wd=%sv%", "get", ],
		], ],
		["http://www.repanso.com", "热盘搜", [
			["", "http://www.repanso.com/q?wd=%sv%", "get", ],
		], ],
		["http://www.dmpans.com/", "大漠搜索", [
			["", "http://www.dmpans.com/search?wd=%sv%", "get", ],
		], ],
		["http://www.panmeme.com/", "盘么么", [
			["", "http://www.panmeme.com/query?key=%sv%", "get", ],
		], ],
		["http://www.58wangpan.com/", "58网盘", [
			["", "http://www.58wangpan.com/search/kw%sv%", "get", ],
		], ],
		["https://www.56wangpan.com/", "56网盘", [
			["", "https://www.56wangpan.com/search/kw%sv%", "get", ],
		], ],
		["http://wx01.51caichang.com/", "51网盘", [
			["", "http://wx01.51caichang.com/so?keyword=%sv%", "get", ],
		], ],
		["http://www.vpansou.com/", "V盘搜", [
			["", "http://www.vpansou.com/query?wd=%sv%", "get", ],
		], ],
		["http://tansuo233.com/", "探索云盘", [
			["", "http://tansuo233.com/?search=%sv%", "get", ],
		], ],
		["https://uzi8.cn/", "优质吧", [
			["", "https://uzi8.cn/search/kw%sv%", "get", ],
		], ],
		["https://www.xalssy.com.cn", "税友", [
			["", "https://www.xalssy.com.cn/search/kw%sv%", "get", ],
		], ],
		["http://aizhaomu.com/", "创业招", [
			["", "http://aizhaomu.com/search/kw%sv%", "get", ],
		], ],
		["http://www.wwaaffxx.com/search/", "我爱分享", [
			["", "kw", "post", ],
		], ],
		["https://www.57fx.com/search/", "57分享", [
			["", "kw", "post", ],
		], ],
		["http://www.panyisou.com/search/", "盘易搜", [
			["", "kw", "post", ],
		], ],
		//以下的更新慢
		["http://www.59pan.com/", "59网盘", [
			["", "http://www.59pan.com/search/%sv%/", "get", ],
		], ],
		["http://www.99baiduyun.com/", "99搜索", [
			["", "http://www.99baiduyun.com/baidu/%sv%", "get", ],
		], ],
		["http://www.pansou.com/", "盘搜", [
			["", "http://www.pansou.com/?q=%sv%", "get", ],
		], ],
		["https://www.fastsoso.cn/", "fastsoso", [
			["", "https://www.fastsoso.cn/search?k=%sv%", "get", ],
		], ],
		["http://wjsou.com/", "文件搜", [
			["", "http://wjsou.com:8080/s2.jsp?q=%sv%", "get", ],
		], ],
		["http://www.51sopan.cn/", "51搜盘", [
			["", "http://www.51sopan.cn/s?wd=%sv%", "get", ],
		], ],
		["https://www.qzhou.com.cn/", "轻舟网", [
			["", "https://www.qzhou.com.cn/search?keyword=%sv%", "get", ],
		], ],
		["http://www.baiduyunsousou.com/", "暮无雪", [
			["", "http://www.baiduyunsousou.com/search?kw=%sv%", "get", ],
		], ],
		["https://www.dupanbang.com/", "度盘帮", [
			["", "https://www.dupanbang.com/q/%sv%", "get", ],
		], ],
		["http://www.xilinjie.com/", "西林街", [
			["", "http://www.xilinjie.com/s?q=%sv%&t=pan", "get", ],
		], ],
		["https://wangpan007.com/", "网盘007", [
			["", "https://wangpan007.com/share/kw%sv%", "get", ],
		], ],
		["https://www.yunpuzi.net/", "云铺子", [
			["", "https://www.yunpuzi.net/all/s-%sv%.html", "get", ],
		], ],
		["http://www.vpanso.com/", "微盘搜", [
			["", "http://www.vpanso.com/s?wd=%sv%", "get", ],
		], ],
		["https://www.xxhh360.com/", "云搜大师", [
			["", "https://www.xxhh360.com/search?q=%sv%", "get", ],
		], ],
		["http://www.panpanso.com/", "盘盘搜", [
			["", "http://www.panpanso.com/baiduwp?qiehuan=1&sousuo=%sv%", "get", ],
		], ],
		["https://jidanso.com/", "网盘传奇", [
			["", "https://www.jidanso.com/index.php/search/?q=%sv%", "get", ],
		], ],
		["https://pan.here325.com/", "325搜", [
			["", "https://pan.here325.com/s?q=%sv%", "get", ],
		], ],
		["https://www.cilimao.io/", "磁力猫", [
			["", "https://www.cilimao.me/search?word=%sv%&resourceSource=1", "get", ],
		], ],
		["http://www.jisoupan.com/", "及搜盘", [
			["", "http://www.jisoupan.com/search/%sv%.html", "get", ],
		], ],
		["http://www.tushupan.com", "图书盘", [
			["", "http://www.tushupan.com/search?query=%sv%", "get", ],
		], ],
		["http://www.sowangpan.com/", "搜网盘", [
			["", "http://www.sowangpan.com/search/%sv%-0-全部-0.html", "get", ],
		], ],
		["https://www.soohub.com/", "soohub", [
			["", "https://www.soohub.com/search/%sv%/1", "get", ],
		], ],
		//以下的搜不到
		["http://www.guanggua.com/", "盘115", [
			["", "http://www.guanggua.com/search?key=%sv%", "get", ],
		], ],
		["http://www.sosoyunpan.com/", "搜搜云盘", [
			["", "http://www.sosoyunpan.com/search.asp?wd=%sv%", "get", ],
		], ],
		["https://www.panuso.com/", "盘优搜", [
			["", "https://www.panuso.com/s/%sv%.html", "get", ],
		], ],
		["http://www.sosuopan.com/", "搜索盘", [
			["", "http://www.sosuopan.com/search?q=%sv%", "get", ],
		], ],
		["https://pan.90xz.com/", "90网盘", [
			["", "https://pan.90xz.com/search/%sv%", "get", ],
		], ],
		["https://www.dyroy.com/", "乐依分享", [
			["", "https://www.dyroy.com/html/search.html?q=%sv%", "get", ],
		], ],
		["https://www.0933.me/", "网盘资源网", [
			["", "https://www.0933.me/search.html?wd=%sv%", "get", ],
		], ],
		["https://www.sov5.cn/", "SoV5", [
			["", "https://www.sov5.cn/search?q=%sv%", "get", ],
		], ],
		["http://www.pan131.com/", "盘131", [
			["", "http://www.pan131.com/yun/%sv%/", "get", ],
		], ],
		["http://www.zhaoyunpan.cn/", "找云盘", [
			["", "http://www.zhaoyunpan.cn/share.php?key=%sv%", "get", ],
		], ],
		["http://sou.wolfbe.com/", "云搜一下", [
			["", "http://sou.wolfbe.com/s?q=%sv%", "get", ],
		], ],
		["http://www.tuoniao.me/", "鸵鸟搜索", [
			["", "http://www.tuoniao.me/search/%sv%/list", "get", ],
		], ],
		["http://www.soupan.info/", "搜盘", [
			["", "http://www.soupan.info/search.php?q=%sv%", "get", ],
		], ],
		["https://tool.lu/pansou/", "在线工具", [
			["", "https://tool.lu/pansou/index.html?q=%sv%", "get", ],
		], ],
		//以下不是专门的搜索引擎
		["https://www.baidu.com/s?wd=pan.baidu.com&ct=1", "百度搜索", [
			["", "https://www.baidu.com/s?wd=%sv%%20pan.baidu.com&ct=1", "get", ],
		], ],
		["https://www.google.com.hk/search?q=pan.baidu.com", "谷歌搜索", [
			["", "https://www.google.com.hk/search?q=%sv%%20pan.baidu.com", "get", ],
		], ],
		["https://so.mezw.com/Search?wd=pan.baidu.com", "MEZW", [
			["", "https://so.mezw.com/Search?wd=%sv%%20pan.baidu.com", "get", ],
		], ],
		["https://searx.me/?language=zh-CN&q=pan.baidu.com", "searx", [
			["", "https://searx.me/?language=zh-CN&q=%sv%%20pan.baidu.com", "get", ],
		], ],
		["https://www.sogou.com/web?ie=utf8&query=pan.baidu.com", "搜狗搜索", [
			["", "https://www.sogou.com/web?ie=utf8&query=%sv%%20pan.baidu.com", "get", ],
		], ],
		["https://www.so.com/s?q=pan.baidu.com", "360好搜", [
			["", "https://www.so.com/s?q=%sv%%20pan.baidu.com", "get", ],
		], ],
		["http://www.chinaso.com/search/pagesearch.htm?q=pan.baidu.com", "中国搜索", [
			["", "http://www.chinaso.com/search/pagesearch.htm?q=%sv%%20pan.baidu.com", "get", ],
		], ],
		["https://cn.bing.com/search?q=pan.baidu.com", "必应搜索", [
			["", "https://cn.bing.com/search?q=%sv%%20pan.baidu.com", "get", ],
		], ],
		["https://m.sm.cn/s?q=pan.baidu.com", "神马搜索", [
			["", "https://m.sm.cn/s?q=%sv%%20pan.baidu.com", "get", ],
		], ],
		["https://wangpan.renrensousuo.com/", "众人搜网盘", [
			["", "https://wangpan.renrensousuo.com/jieguo?sa=网盘搜索&q=%sv%", "get", ],
		], ],
		["https://www.ecosia.org/search?q=pan.baidu.com", "ecosia", [
			["", "https://www.ecosia.org/search?q=%sv%%20pan.baidu.com", "get", ],
		], ],
		["https://duckduckgo.com/?q=pan.baidu.com&ia=web", "duckgo", [
			["", "https://duckduckgo.com/?q=%sv%+pan.baidu.com&ia=web", "get", ],
		], ],
		["https://www.webcrawler.com/serp?q=pan.baidu.com", "crawler", [
			["", "https://www.webcrawler.com/serp?q=%sv%%20pan.baidu.com", "get", ],
		], ],
		["https://suche.web.de/web/result?q=pan.baidu.com", "web.de", [
			["", "https://suche.web.de/web/result?q=%sv%%20pan.baidu.com", "get", ],
		], ],
		["https://swisscows.ch/web?query=pan.baidu.com&region=zh-CN", "swisscows", [
			["", "https://swisscows.ch/web?query=%sv%%20pan.baidu.com&region=zh-CN", "get", ],
		], ],
		//以下的要收费
		["https://www.quzhuanpan.com/", "去转盘", [
			["", "https://www.quzhuanpan.com/source/search.action?q=%sv%", "get", ],
		], ],
		["http://www.zhuzhupan.com/", "猪猪盘", [
			["总线", "http://www.zhuzhupan.com/search?s=100&query=%sv%", "get", ],
			["1", "http://www.zhuzhupan.com/search?s=1&query=%sv%", "get", ],
			["2", "http://www.zhuzhupan.com/search?s=2&query=%sv%", "get", ],
			["3", "http://www.zhuzhupan.com/search?s=3&query=%sv%", "get", ],
			["4", "http://www.zhuzhupan.com/search?s=4&query=%sv%", "get", ],
			["5", "http://www.zhuzhupan.com/search?s=5&query=%sv%", "get", ],
			["6", "http://www.zhuzhupan.com/search?s=6&query=%sv%", "get", ],
			["7", "http://www.zhuzhupan.com/search?s=7&query=%sv%", "get", ],
			["8", "http://www.zhuzhupan.com/search?s=8&query=%sv%", "get", ],
		], ],
		["https://www.soyunpan.com/", "搜云盘", [
			["", "https://www.soyunpan.com/search/%sv%-0-全部-0.html", "get", ],
		], ],
		//以下的有md5
		["https://www.lingfengyun.com/", "凌风云", [
			["", "https://www.lingfengyun.com/search.asp?so_md5key=74520f7a96596c3328fc0dec611fe290&wd=%sv%", "get", ],
		], ],
		["http://www.tebaidu.com/", "特百度", [
			["", "http://www.tebaidu.com/search.asp?so_md5key=205f43408dc113b6c9f152efaf756fb9&wd=%sv%", "get", ],
		], ],
		["http://www.wowenda.com/", "云网盘之家", [
			["", "http://www.wowenda.com/search?so_md5key=c9d19ba6ed27dc2ee307d585e0942ebe&wd=%sv%", "get", ],
		], ],
		["http://www.sobaidupan.com/", "搜百度盘", [
			["", "http://www.sobaidupan.com/search?so_md5key=74fe55625afdc6f58071691ecfac6e35&wd=%sv%", "get", ],
		], ],
		//以下的什么都搜不到
		["https://www.xiazaisou.com/", "下载搜", [
			["", "https://www.xiazaisou.com/wangpan?s=%sv%", "get", ],
		], ],
		["http://www.13910.com/", "盘找找", [
			["", "http://www.13910.com/s/?kw=%sv%", "get", ],
		], ],
		["http://www.verypan.com/", "verypan", [
			["", "http://www.verypan.com/index/index/baidusearch?keyword=%sv%", "get", ],
		], ],
		["https://www.ttyunsou.com/", "天天云搜", [
			["", "https://www.ttyunsou.com/s?keyword=%sv%", "get", ],
		], ],
		["http://www.wodepan.com/", "我的盘", [
			["", "http://www.wodepan.com/list/%sv%-1.html", "get", ],
		], ],
		["http://www.aiyoweia.com/", "哎呦喂啊", [
			["", "http://www.aiyoweia.com/search/%sv%", "get", ],
		], ],
		["http://www.iwapan.com/", "爱挖盘", [
			["", "http://www.iwapan.com/so.aspx?wd=%sv%", "get", ],
		], ],
		["http://www.xibianyun.com/wp/", "西边云", [
			["", "http://www.xibianyun.com/wp/search?q=%sv%", "get", ],
		], ],
		["https://www.sosobtp.com/", "网盘搜索BT", [
			["", "https://www.sosobtp.com/search/%sv%", "get", ],
		], ],
		["http://baiduyun.6miu.com/", "6miu", [
			["", "http://baiduyun.6miu.com/word.html?kw=%sv%", "get", ],
		], ],
		["http://www.sowp.cn/", "网盘搜搜", [
			["", "http://www.sowp.cn/list/%sv%-1.html", "get", ],
		], ],
		["http://www.friok.com/", "百度盘资源", [
			["", "http://www.friok.com/?s=%sv%", "get", ],
		], ],
		["http://kaopu.so/", "靠谱搜索", [
			["", "http://kaopu.so/pan/%sv%", "get", ],
		], ],
		["https://www.xiazaisou.com/wangpan", "下载搜", [
			["", "https://www.xiazaisou.com/wangpan?s=%sv%", "get", ],
		], ],
		["http://pan.muyi.so/", "沐依神器", [
			["", "http://pan.muyi.so/index.php/home/index/result.html?q=%sv%", "get", ],
		], ],
		//以下的不稳定
		["http://www.3134.cc/", "sola资源站", [
			["", "http://www.3134.cc/search.php?kw=%sv%", "get", ],
		], ],
		["http://www.huisou.me/", "麦库搜索", [
			["", "http://www.huisou.me/index.php?k=%sv%", "get", ],
		], ],
		["https://www.panc.cc/", "胖次搜索", [
			["", "https://www.panc.cc/s/%sv%/td_0", "get", ],
		], ],
		["https://www.pp93.com/", "泡泡", [
			["史莱姆", "http://www.pp93.com/pp93sou.php?Slime=%sv%", "get", ],
			["盘搜", "http://www.pp93.com/pp93sou.php?pansou=%sv%", "get", ],
			["胖次", "http://www.pp93.com/pp93sou.php?panc=%sv%", "get", ],
			["盘搜搜", "http://www.pp93.com/pp93sou.php?pansoso=%sv%", "get", ],
		], ],
		["http://www.daysou.com/", "云搜", [
			["全量", "http://www.daysou.com/s?q=%sv%&start=0&isget=1&tp=all&cl=0&line=4", "get", ],
			["加密", "http://www.daysou.com/s?q=%sv%&start=0&isget=1&tp=all&cl=0&line=3", "get", ],
			["1", "http://www.daysou.com/s?q=%sv%&start=0&isget=1&tp=all&cl=0&line=0", "get", ],
			["3", "http://www.daysou.com/s?q=%sv%&start=0&isget=1&tp=all&cl=0&line=2", "get", ],
			["2", "http://www.daysou.com/s?q=%sv%&start=0&isget=1&tp=all&cl=0&line=4", "get", ],
		], ],
		["http://www.wanpan.info/", "万盘搜索", [
			["", "http://www.wanpan.info/k/%sv%", "get", ],
		], ],
		["https://www.yumuso.com/", "榆木搜", [
			["", "https://www.yumuso.com/q/%sv%", "get", ],
		], ],
		["http://so.hzbslp.com/", "特多盘", [
			["", "http://so.hzbslp.com/api.php?pn=1&sr=%sv%", "get", ],
		], ],
		["http://www.wangpanzhijia.net", "网盘之家", [
			["", "http://www.wangpanzhijia.net/search.html?wd=%sv%", "get", ],
		], ],
		["http://www.bdsoba.com/", "搜百度吧", [
			["", "http://www.bdsoba.com/search/type_0_1_%sv%/", "get", ],
		], ],
	];
	return tea;
}

//支付宝二维码图片的base64编码
function qrAlipay() {
	var qa = "data:image/png;base64,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";
	return qa;
}

//微信二维码图片的base64编码
function qrWechat() {
	var qw = "data:image/png;base64,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";
	return qw;
}

//qq二维码图片的base64编码
function qrQQ() {
	var qq = "data:image/png;base64,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";
	return qq;
}

//支付宝红包二维码图片的base64编码
function qrAlipayHongbao() {
	var qah = "data:image/png;base64,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";
	return qah;
}

//百度网盘
function qrBaiduPan() {
	var qbdp = "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAALQAAAC0CAIAAACyr5FlAAAPRElEQVR4nO2da6xdVRGAZ+1z7qP3FmxLedc2QHm2RXnfookEQvhh0TbRKKYGJD5iNFF5aeI/E4FiYiBG/WFoYiAo4Qdq4IfxVQjQ1kYsVEjL+xZCLbSW0gf3tdf449zunrvXmbVmzVr3Us6dL4Ze95712OfMmVlrZtY5BhFBUTpRfNgTUI5dmq1/jDHiLji2x+2/1aq6XnVCSbq3Usb1SLoC1IvjTszzFHz4tpz/WskmoJZDIVHlUEiatf8ftT6lbJfHRNdkoixzcG6ecWvdBifm74SaoceYB91o0CPItg4pTkoth0KiyqGQ1N1KRdBCeuC7Bo9lDnbiSgrW6p7hgp1wXAN/c8RvIkD2bqrlUEhUORQS0q2kwHEN1G7F7YRCFvChXFIKnKeoDRT14NQks4S8PKjlUEhUORSSnG6FY9wEBjDF8gf3Apz5pDSh8kGc7UNw35TXObqo5VBIVDkUEtKtCCxV1OI5uHoXeARBXoaTZBHsOCgZT7wu5QXPKNmOWg6FRJVDIam7lSwBfH4+WmZUgwE0ztz4ApRr4Mf6Khl+MQNnXM7kU95QtRwKyaTlmLEadP46VNCJS5ZSmuCnn3+FMwp/XA9Z3lC1HAqJKodCElHsw1/s8FeInj759acu/EIhQSw8i8XmLCEFYQx+YRQHtRwKiSqHQmIyFjn6hmFX7vAnEFUXyZ88f9yo8Dklyd+/cN4IweE8D2o5FBJVDoWEDJ8Lqjs5Vi7FqgfhG94ZTiBTXfk78bTiI3jBK9RyKCSqHApJfbeSxaaluAYP/Owof4ZU5/4JBMdNOfGWMpwAz8uolkMhUeVQSMggWAfR+CIUQZQmOJzbJKrMP1bAlZH5SipwF1VvEJSkxhVIgloOxYMqh0IS/jbBYGZcVqHET9mnHFYT1H3xvYZgg5N3+5bX7+huRYkg4qxsSig6WH0elOTPp2MntSuyD256mY9nXHeq/BBU8JUXGDlQy6F4UOVQSAy/3D6i0xyl+pzeqBmmhKI9Ewg24WeDo2bCjycFF+9Rk1fLoZCocigkETWk7q0a0+SSBE2yTN69JUAQpEl5R4LPG/WYajkUElUOhYQMn/PDJlnaupGfYLdRIXAqjM1pK4iY8T2RZ7igfxHgccG6W1EiUOVQSMK7lSApOQ5Ob1S3WSpVpzstLDgZkLJd4rfl7ArVcigkqhwKScQXxqVEtDj9iyU9BD1OVA49xdWmS0btCoN1r5xx1XIoJKocCkk9Ze+S5XhBUFiQhnYRrNU5wwl2SRk3ZZ45c4ZLSQyp5VBIwoeaBMooyx+K2wqysin52yj4BtIlo9WRTUAth0KiyqGQRJyVPdomvqbSFc5o3gU1pB4Ec/ZMSVBbxB93umuppuWnQ481ol5ETjZ/ltC1yjEDb2QwCvBRp17sIzsaFWxCwYleu+MKHM30gYhZcg7B6htZfIXSYM6cdUGaAUTsSo+jyqGQkF8Yl+VEQkr9aYe5xgeFjh2CO46U0tG8qV11K0oYVQ6FJGkrG7RmfAFPgTx1hX9SIUhrx+HfdzChIoQptZwUAhfsaete6X7L0Xpm97/tdz2rmVoTt4cupkuUI/gZcv/bftf9u7pSa3JMhVimG8nRhKA959fsp9T4tLelZKpROgp0vF7zLymm2yOTNy2SN4c1W3Yr1UefumJg8m+LMFaCxc6OwxwBujpeXqNrcys1XBUBAES0CM8OTzz2nH1xFx4aNYO9eP5pZtUnikuWNAuDBjroVscOu5Ikt0J2Gr8CjxqOvz1pl6laTToOgIOjuO7x0T+/ANZOGb0weO0y+NGq3rl9BUx1NMz8Dt+b8KNhgpfII+DSYSbdrRwdu2q92eMl/uDBkU2vVveq3if/vfxMvHftnN5mB1MR3PR2h3JEfIOxwKIKgsSecYOd8+cDAA89PbrxpbL193H9cO2KxuKFxfAe+9dt5YERAIDNL8ODT43cfNWcqJQmdTc9v5+yNJaluCOOJmR5MP7HIkuCvrZbqf74YBw/v+7g3oMAAIsWwC9unrN44eTnZHjPxHfXH377fwYAFgzCn344d6CvcN2KZ2Iy5RB8foIz8cDJ+8+W3cqUvYaBF3aOv7vf2hKxtLd9rnfxwma1H1lyYvP26/uwtLbEPe/bbTvH252IaePDfLAZYfLj4nFaHs2imkRVo/j79Mi0z9Af53DZ+a6FEgFwsB8vPbO3Jnnpmb1zmocPjxoA2PlOefnSzhYoyzqJHyzhmBbBCtLTtsstR4tafGLc4siY7ZkYgdJiaXGqPTDGICCWFkoLFj8Yx/Gynh/ppjCohy6Pc7QbFUR8/q3y4S323zth/we9p83Z94XtP9903FVbt19/5YXHQ9sHdMtLYyPYU8zrM83GrzfC77aWFy3GL11WXLioAQyz0TXM9M94xXbuoV3SPxACliX+5snyt8+Y8Ymj3d6+9VsX7Nv03pJLl/103YLTT2pdfG33xPcfsm8fmPqxMdBT4I1X4jc+02g0TBVX9T+Lf87ULapDQdS8uiJY5ELXW47qtXjgmXL9EwUiGAA0YADnj+5edOhlgzh/eMvm79367Kp7Tj15cHiPfXJ44OBEc0pQA4yxMFGa9U+a/p7ypk83EWaF5ehy5WgZlZ177foNYEsAgHkD9stDsGIRnDT8yvi7C8de2QsIi/Zu/dvjf3x43uqeE+YXvU0EMIBnn4I3rISTjjfb3rS/3wT7DxcWYP0GuPp8u2Rh48N+spkgXEMq2K3wiTKVlEzIVOKv/jKxfoMBMAN9+MuvwfJFjdaqszx06LVbvz6yfZsBs2NgxV3L7je9fa1Y6dBSe9cNzbn9xoBBxP+8VX5nPRweMwB481X47WubTM/Cz44GX3mOw+VvJDnMht2Kef4NBARAvPp829IMADBgGgODJ679pgHzfs+CR866w/T0AqJBGDrL3n1Dc27f5NrCGLN8UePqZRYQAeH5N9CvGV1Dl7sVAADA9w8ZsAAAi08o2j92xpj+0xcf6D3hvnPue31wubEAAFcstXd/pTnYZ2qSixcUxgIC7D80W3YrpHL4Qu753Adnve2axNoKPLRbMfMH0FgDAK/uslMKeQDfeWvPvUvve31geUt7rjjbrlvbHOiv70cQ8dVdFmxhABYMhDUjGLDix6/c5/X4lyxJltkSPgcAALz4DAMlgIUntpnNOyaqcp59B+yPn7rg9TnLwQKUMLTUrvtqc04v/P25iQf+MbbvYFlJbt4xsWGbaYldfIZpy+F2M+SCNC/8sDF/Idwu4LUcuGufXfsze2CkAIC+Jn72MrtiSbF7P/5hI/x3XwEGEHHlefbOG5uDfeapF8vb7gdEc8p8u3olnPwxs23YPr6lGJ0wAHBcv33w9uLU+QXwlh2ylWDHtoJQEAffijgllcwPsARX7x5J95bblV85EOHRjRP3PGIsGoAOpRtD55Z33tQc7DfGmMc2T/zkoSNeZapkYfCOL+Kalc3JFW3oYd3ZRuU4BIGsqE9UsLfudyuIAMasHmresgYHemzLv0z+r4QC8bqLjmoGAFzzyeK6i8sCsSY50IO3rMHVQ03wakY3MRssx1Hh4d3lo0/jv17C9w6a/l489+Owaqi4/LxGYdrGBbQW/rm9fGyT3fEmjIyZeXPxknNgzaeKJSc3/Daj4zzbJ/DRshyS33iryWSJ+XvIki9ARGOgJYgI4yU0CmgUk3EMatRWaranAaaoNEK41OCn3alb/I9NRxkB3R/naNu7Tv5rDPQVk9cR0RwRgzahVh6/2YBm48jdWRDYqEF+s09UoDcoWcHX6Fw1E64z6miu/DaM2YmnYcrjpLhgvluZdXEORKx8EPX2VDLVHx1lXOFpmfGxRJe7lVoIHKdWg3aU8fczG6LmFeEaUhfBjiMlgJPx/fDHmzlaEkvQqnPsPLNzThNPW5cudytKCqocCkn4Z7z4Ww9PQpXqP2pP9JF2/JQLrgl0hIoJ8R1QVIykQi2HQqLKoZDUcytZkh2+8RKaUFa048RmLA7hrxwIBsEE+4uoNysYtvf01rVxDna1R54hupKuVY52XEWRrbuDi8ouI1wJFrRdUeF6ch5RqWR2NpiaUsquwZXMolh8ByQIJMoUWhekCokqh0JSX3NE2dv04L9bIeBKClxS1JRiBaIKlKgrsvI56nrQnUVtUirUcigkqhwKCZlb4SyJgzud4K2olArlgwSFASmP6RnXM1CQYG+yHQe1o3SZdZVgSgrhs7LBz6VsLRmMkeSlNiX+Us7tJCpvLFiHUr3xTWnHyfsfqiNqORQSVQ6FhPx666B1Bcc1RMWzKVPpIgiWCMLYnCvBqXqEKXcmc3DM4RIl1XIoJKocCglZ7JNlg54SFBc0kQW2Y8eVeYSMGeyUObvjetqq5VBIVDkUknAlWNDupQSyOJsUfumo5xY/KBRE4Hld4ajQe9D1e14rfqrBfdHUcigkqhwKCfm1T9NU9i5IOmRMbHLaesblV3dSMrKQV8Z8U1TnajkUElUOhURyNKHeRUxQqNYqi8FMcUlRMSj+nIOvQNScU3JY/IIst4laDoVElUMhIb9NsEJw/sC9leU4l6Bkle/OBEcEPDPJUhAqqIR1bwn2ehVqORSS8DcYu6SscWqt+NEU94qg6Dw4H3+3FIIFuKDYfZrSFJ4JqOVQSFQ5FBKJW6HgGOQslTuCMHZwYSh4Xg7T6iNSamY9vVWo5VBIVDkUEvJoQoWg2Me9NR25Vlk9ZtB6811h1NPVzLvHIwTD51GTT0Eth0KiyqGQRPzGW5bMarAuMqoTftssmxH+nFOC1imJcf5wnKCfWg6FRJVDISF/jIdDcPU+rRYyalyKKNcgcKPBcxX8fWKWKtco1HIoJKocCkk4CBZkxtbbKV6D2iW5EwjGzQSlPZ5x+dEwzvk2jzCFZ85qORQSVQ6FJOLrrV2CK/BgnkIWR+IH7vhMUw0pdT0q+sfP6QQnEDWuWg6FJPw9pC78xCZ//ZWSTsz7oQ/2n+VQUxZJmQwftRwKiSqHQpLzN95kAYAggrM9/IIdfp1OR+GgQBY3KmgreOU1K6tEoMqhkEzLT4fyd/MeScGBNo9f45+WSynhEdQu8VPZnuOvQTcqq/NVy6GQqHIoJKRbEUSlsqyQswhHWeB0+H1GvUTUxirqQCF/i+eilkMhUeVQSMhfh0wh6jgXdT2l6EZwwI5/fi6qZFVwwM4zpXRJTlsNgilhVDkUEvL7ORRFLYdCosqhkPwfoDGVlPiZlJkAAAAASUVORK5CYII=";
	return qbdp;
}

//模板
function qrTtqw() {
	var qttqw = "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAALQAAAC0CAIAAACyr5FlAAAMkElEQVR4nO2dz28cSRXHv697fjhOiJPYyg+WBRZpCZHILnsDIbihZeEAJ66cEGIPXBBX/gbEKeKAtEJISHABCcEBaS9IIKSVkCBLWJG1gLArZdk4seNk7Omux6Fn2m1Pva7qqu6xt/0+suzxTP2a7jfv1Xv1qoaYGYpiIznuASgnFxUORWRQPiKithotTVVYm87q/qawbMFZpX6o1er1bVbbCTPZAe13ce+gmkOpQYVDEVHhUEQG1mcDjKXT7NW3aa0uVfEvbLXK9U/692gt0GjMnm02osV7p5pDEVHhUETsZqUk0lg48decTrtQb2usvmgY/vbLv7qTLqyScySqORQRFQ5FRIVDEXHMOSIJCwD7x7yd7fvXsmJtyt/8+090/J3qZa6iq+ZQRFQ4FJFuzUqVehUdZiAaxVX9mw0gbCXZ+vatTx5LTpZqDkVEhUMRUeFQRBxzjhaj4wFpS41c2YCZRBezk7AhRS4aO0cShmoORUSFQxGxm5UunD0rYck4AWnDkSWdvTs78n+nnuOU+mrx3qnmUERUOBQRFQ5F5GDOsbQArdPZqzfqYX11kaAV738GrPo6p0QtoppDEVHhUEQocr9GpIfm37vTxAQse/oT1rtzJNY229oBG58JpZpDEVHhUERUOBQRR/jc30fyX0ENy9r1DxtbE6j8jXrk7KRRlQBPPnL208jpVc2hiKhwKCKtJRhb9XZHK5z1nTYaakCVSBfRP67qb3/DDFD9OKGaQ6lBhUMRUeFQREKOmgzzACPzZiM7jVy3jF/2jPRaPdtBk+vsnNup5lBEVDgUEYqMIR40dNzbVttKeOl6r41/p1KBgJEEJBBBNYdSgwqHIqLCoYjEhs8jdw1FZoKFmdXIkmHLywFOu//ig7OjsDiCag5FRIVDEbG7siUtLvdZ2/Qn0qn2H0kXhwU6O7USuX6rq7JKh6hwKCIqHIqIfa9s5HG7AfnJzjZbXFZta4dq5FqoT4EA2ko5g2oOpQYVDkVEhUMRaRA+DzCQYf63M6Dib+D9Q92dJq/7DGBxJJHRi/gsf9UciogKhyLS4HyOtjJXw3y5sF1PVgKS1uKD1ks7daPF7DXVHIqICocisrwv4zk5BBijjo7rO+HYNzVZ9wJFHhHRaf70YoEl3M6ii6Jf54Qscsu4lbZcWWnM/TQry/yg91ip9M2sHMut6qt82F3Z5as7awGnipaaPUacCcZdu7IBtdSVVRqjwqGIqHAoIo45h5PIJcTIULT/8La3tx8+fMjMRFS6oNZ2RqPRtWvXjDGbm5t5ni8WWF9fX19fly5Ri1vDnUTud3dexr55K0cor8Xa2tra2lp94UJ0ysd5nlcjGSVZli1TAo6RU2FWrDG94nH1d/HgyOepGuOytiP11QNiv1c2LPQWWX3xgyuN02QZA1tbW/v7+/VvpNr4xsYGM3OeM1C2y/PfJs+Ll5JBg6sXcJhTmJy1mLTcc7Oy/eABAzydJsYUz1DlfoMZ1avGXFzFx1tbuTFPdnZgu9AD4NFwCODi5cvdjv646blwTP/4RvEgbVIrAwybcw8fMbgUJwIV/w7Ho2z1LAB87ZXWB3yi6LlwXPrN60eeKe629cnypeLBhrXFquY5PcIRsNUnvmRAVrBUy17y3ju26oelYAB8hPgqMAY/Bu4B9ys9WKWpvtPmJ2T4T7mark7XDMlZsueag3Z2i/da/cCXl4RTxhdTvJziMiElAGDGFNg0+FWG24dEqISPTFz6S8+FA5jdzNkdLT4WRADjDPDqADfTQ3NSEEbA9RTfS/DbPfwSYDoiHVT53W/swhGQbessWV/AuT82NEJafswP7jAzMAK+O8CNFEQMAExFsJjm+iMFfXXMmNAvQEWZw4OpGYN/VlTk6nfkxdcI6dw9ZZopjeLuf4UKyQBAzNhh3M5pB7hGuJ5gSABAwCsrfHuCN4kYhRgRwFz6vD2n58Kxn+8NkhFAxb2cWZbzwJdGM8EB4y8GP5lieyZI/BzhOwO+nACglPD1If6eMVM5/yjEYz/bWz3GN7YUeh4+T8ajCU+eZrt72cSYbKZIP53wOSoC4rjP+HFGj2ZKlpnpbYNbGU2L/xifSHG1ECo2JtvPnj7Ndvd4b3DmzDG/t+7p9puanNQ7ePHh8+FgZThYMcbk+f50um/yCQyPr+ykj1MenkUy4tdT7FJ1xmkA3M3x14xuTimbIHuyvzHM/r0CoiQdDMYr48GQqO5D5Zw/Lb6RSCPV4izwFLmybJjABAzS0TAdMxjMdP6fyd49PAEzTe6+mOWXKpNNLmzQ6B+bw2c2QUCK0YUXRqtXQcksVMqHJqc9pufCAWMqt32ukFLwGMVi63i0Olo5v1iPRiOcnT9OiBlgM29n/qvvhBz7ZCUyFbnRbo4GfZWyQZW7ypU4mOGDMof6ALhwcQg8L1NppOYC+TuobWV3hy2eL756hL5rDjYoQ6SYB8RMcZcZIJBhw7OcjcJkFIWTnEsZyGmmNmYScyoiYOi9t8KGZxguHsMwdkYAwASArm2DDRtTqJCyMD68TQABxOBHo1n1eQvF42N+b93Tf+HA/OfgBr99YR4LZfr8v7CyX75UFMNHt+j6/4p5J08T/u+5IwVOiXA4VmWdJipy2dbf6wvEWO4hv3kJ22M+PwFAG0+Sb71hXrvJW2cKkwFG8tn/YGAAEMHcvcjvrcxno8QeU9EAZ3Ixf1Eq6WwqYEgSPZ9zcL6whErgnSF+91z6jTsgMHPyqffpB3/gty6Zh6PJ2WTw1s385zcGjwfplzfZUP7r5zkr6/rIRn/ouXAYy9YCADC//xg9/yB56T4RmBkrU3rxPuVsti+kXxiZj6f7P/3k4N6H6MIkv3NxuUM+QThWZf1Db/7elPPVSMesiiQcyJP9W58ZfvNv6efeORTtZCCh9OURnk2nP3yG3mtNUQQs1VYJSM+OvCPo/YTU5OAcpvJT/pvvppNbL+z96KX8zkXeO3odkhtJ+u1Rnh2qe+Sn9/TcrHBOPJtnziYffJC/AWQ0/dPV6Z+v0PokubLLKzmPz+D7NCszpjxHStUISTHtOCVhjr4Lh8mwEMxc/Jfw7mr+7ioDeLaQAAIzGJzDHK11WiQDUvjc+mTApMH5ZNfhc5fyL3PO53k8Wzz52bQwtnyfOSfTPGHUOv62Uuac6KYmX0xuuyiHlkZovisFAOF97L2WzV6nYq8KTpW2qHIKhMP5sS9Vw+wBYf730IdwIV5ib6xH6YMNjmAI8G+7OJdBauoEErlVuEUHNWz5t+eurBJDf4SjT/r8hNAf4YDKR9s02NQUlk202Gb8WuJJFoJGx2PWv+o/ZakScJ2ljnqlOXCy5eYDR9+EQ2mRkC/jadB6UPXIM5D8d7W0SJirGbBtJ9LWNKLnQbCCRud8fNCDKy2iZkURUeFQRKje84kMdUcmIznP54i0yv6uZnxWVVsXKnLqVj+2I6jmUERUOBQRFQ5FxBHnCGy0JfvtDJ/7r3RbB9DiRMHZe8BcITKny/86SKjmUERUOBQRhytbJTJY24UDaSXMBPhXry8ZRpgJaCtSflpWZZUWUeFQRFQ4FBHHmWBh84OArCcnYZHy+urWAv5vpIpzSG0dsxb2Rqyc9o3USgwqHIpIA1e2JDL05jQQzk7rCTNbkR5gZJtL2/3VaMyqORQRFQ5FRIVDEWlwJlg9kZ5wR3QR9m7x3bV1/GbkPmxp8Ko5FBEVDkWkQYS0Hv/dnvHLv/660f8EpshTMSIzmFqMREduf6qimkMRUeFQRFQ4FJEGZ4KVhE1EjiXtKmD91or/5Ck+rTdgVF1MWaCaQ6lBhUMRcXwZTxX/tdZ6usjQaURk3k29Mm9kv5aWPxVmy1RzKCIqHIqICoci4vjWBH+ccwL/8HbkqunSTt1oNM76QH6Ypx05C9S9sko4KhyKSANX1p9SX7W4whkWbYxcvw2g0REMASvJ/qvfzjY1QqqEo8KhiKhwKCINvjWhnhaP93AOo8VkJ2dfNR0t83yOSJ/cPz+5imoORUSFQxFxHIzfxVKtf4ZtR4uNix2F0WhVNmDniNOWBYy/kSesmkMRUeFQRFQ4FJFj+DKeyFxfZ7ORMfXI9OmwOUGLm139R+L0yVVzKCIqHIrI8sxKgAWJzwDyX8y04q/hIzfgRO40DrNKuldWCUeFQxFR4VBEHHOOjtKiPNuXjGJby6FhB4FENhXmKvunOrd4/qRqDkVEhUMRsZuVpZ3811Zar9SCf/v+HmDY/t7I4xKc7de3GZagpJpDEVHhUERUOBSRTr5XVukHqjkUERUORUSFQxH5PwlUZF18blUkAAAAAElFTkSuQmCC";
	return qttqw;
}

//淘新闻
function qrTxw() {
	var qtxw = "data:image/png;base64,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";
	return qtxw;
}

//东方头条
function qrDftt() {
	var qdftt = "data:image/png;base64,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";
	return qdftt;
}

//模板
function qrDzkd() {
	var qdzkd = "data:image/png;base64,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";
	return qdzkd;
}

//惠头条
function qrHtt() {
	var qhtt = "data:image/png;base64,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";
	return qhtt;
}

//蚂蚁头条
function qrMytt() {
	var qmytt = "data:image/png;base64,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";
	return qmytt;
}

//模板
function qrYt() {
	var qyt = "data:image/png;base64,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";
	return qyt;
}

//一折特卖
function qrYztm() {
	var qyztm = "data:image/png;base64,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";
	return qyztm;
}

//淘粉吧
function qrTfb() {
	var qtfb = "data:image/png;base64,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";
	return qtfb;
}

//4399
function qr4399() {
	var q4399 = "data:image/png;base64,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";
	return q4399;
}

//利趣网
function qrLq() {
	var qlq = "data:image/png;base64,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";
	return qlq;
}
