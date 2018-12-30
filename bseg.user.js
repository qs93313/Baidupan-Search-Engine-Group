// ==UserScript==
// @name         百度网盘资源_搜索引擎_聚合
// @version      2.5
// @description  在百度云盘页面中新增百度网盘资源_搜索引擎_聚合
// @include      /https?\:\/\/(pan|yun|duanxin|note|tonghuajilu|tongxunlu|wenzhang|zhaohui)\.baidu\.com.*/
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
		var find_init = (document.querySelector("#cnwp8RJ8") !== null);

		//客户端下载页（https://pan.baidu.com/download || 无视https://pan.baidu.com/disk/award）
		var find_download = (document.querySelector("#login-header") !== null);

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

		//综合
		var find_or = (find_home || find_init || find_download || find_version || find_checkout || find_mall || find_center || find_error || find_wenzhang);
		//确定显示点是否存在
		if(find_or) {
			//循环索引
			var i, j;

			//搜索引擎网址目录
			var dirall = [];
			var dirallot = dir_all_ot();
			for(i in dirallot) {
				for(j in dirallot[i][2]) {
					var dirallotita = [dirallot[i][1] + dirallot[i][2][j][0], dirallot[i][2][j][1]];
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
			new_div_instruct.style.cssText = "display:inline-block;border-top:1px solid lightgray;border-left:1px solid lightgray;border-bottom:1px solid lightgray;font-size:10px;width: 15px;height:20px;line-height:20px;border-radius: 12px 0 0 12px;color:lightgrey;cursor:pointer;text-align:right;";
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
			new_input.style.cssText = "display:inline-block;border-top:1px solid #A9A9A9;border-bottom:1px solid #A9A9A9;border-left:0;border-right:0;font-size:15px;color:black;outline:none;padding:2px;background-color:white;outline:none;"

			//span节点再建【清除输入框】子节点
			var new_x_btnd = document.createElement('div');
			new_x_btnd.innerHTML = "×";
			new_span.appendChild(new_x_btnd);
			new_x_btnd.style.cssText = "font-size:15px;width:16px;height:24px;line-height:24px;color:black;background-color:white;border-top:1px solid #a9a9a9;border-bottom:1px solid #a9a9a9;border-left:0;border-right:0;padding:2px 0;text-align:center;outline:none;display:inline-block;cursor:pointer;-webkit-user-select: none;-moz-user-select:none;-ms-user-select:none;user-select:none;"

			//span节点再建【按钮】子节点
			var new_btn = document.createElement('button');
			new_btn.innerHTML = "搜索";
			new_span.appendChild(new_btn);
			new_btn.style.cssText = "font-size:14px;width:52px;height:29px;color:white;border:1px solid #A9A9A9;cursor:pointer;padding:0;";
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
			}

			//提示事件
			var new_div_alert = document.createElement('div');
			new_div_alert.setAttribute("id", "alert");
			new_div_alert.style.cssText = "position: absolute;width:450px;height:120px;top:62px;background-color:white;border:1px solid lightgray;z-index:9999;border-radius:7px;margin:0 auto;left:0;right:0;";
			new_div_alert.style.display = "none";
			body.appendChild(new_div_alert);

			//提示文字
			var new_div_alert_c = document.createElement('div');
			new_div_alert_c.innerHTML = "<a href='https://greasyfork.org/zh-CN/scripts/375337' target='_blank' style='color:green'>[油猴脚本][百度网盘资源搜索引擎聚合]</a>提示您：<br>请在输入框输入要搜索的内容。";
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
			}

			//搜索按钮点击事件
			new_btn.onclick = function() {
				//获得输入框数据
				var new_input_val = new_input.value;
				//计算输入框数据长度
				var new_input_val_len = new_input_val.length;
				//如果输入框有数据
				if(new_input_val_len > 0) {
					//获得选择框里被选中的选项索引
					var option_index = new_select.selectedIndex;
					//根据id和网址目录获得网址
					var pcsearch = dirall[option_index][1];
					//用输入框的数据替换掉网址内的替换符
					var dti = pcsearch.replace("%sv%", new_input_val);
					//网址跳转
					window.open(dti);
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

			//隐藏说明书栏，左边的叉叉
			var new_in_close_left = document.createElement('div');
			new_in_close_left.innerHTML = "×";
			new_div_in_all.setAttribute("class", "in_close");
			new_in_close_left.style.cssText = "float:left;width:22px;height:22px;background-color:#B4E3FF;border-radius:11px;color:red;cursor:pointer;line-height:normal;"
			new_div_in_title.appendChild(new_in_close_left);

			//隐藏说明书栏，右边的叉叉
			var new_in_close_right = document.createElement('div');
			new_in_close_right.innerHTML = "×";
			new_div_in_all.setAttribute("class", "in_close");
			new_in_close_right.style.cssText = "float:right;width:22px;height:22px;background-color:#B4E3FF;border-radius:11px;color:red;cursor:pointer;line-height:normal;"
			new_div_in_title.appendChild(new_in_close_right);

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
			new_div_reward.style.cssText = "display:inline-block;border-top:1px solid lightgray;border-right:1px solid lightgray;border-bottom:1px solid lightgray;font-size:10px;width: 15px;height:20px;line-height:20px;border-radius: 0 12px 12px 0;color:lightgrey;cursor:pointer;";
			new_span.appendChild(new_div_reward);

			//建div支持作者二维码放置子节点
			var new_div_qr_all = document.createElement('div');
			new_div_qr_all.setAttribute("id", "qr_all");
			new_div_qr_all.style.cssText = "position: absolute;width:810px;height:270px;top:62px;right:14px;background-color:white;border:1px solid lightgray;z-index:999;border-radius:7px;";
			new_div_qr_all.style.display = "none";
			body.appendChild(new_div_qr_all);

			//支持作者标题
			var new_div_qr_title = document.createElement('div');
			new_div_qr_title.innerHTML = "感谢你支持<a href='https://greasyfork.org/zh-CN/scripts/375337' target='_blank' style='color:green'> [油猴脚本] [百度网盘资源_搜索引擎_聚合] </a>的作者,谢谢"
			new_div_qr_title.style.cssText = "height:20px;border-bottom:1px solid lightgray;text-align:center;font-size:14px;padding:5px;font-weight:700;letter-spacing:1px;"
			new_div_qr_all.appendChild(new_div_qr_title);

			//隐藏支持作者栏，左边的叉叉
			var new_qr_close_left = document.createElement('div');
			new_qr_close_left.innerHTML = "×";
			new_div_qr_all.setAttribute("class", "qr_close");
			new_qr_close_left.style.cssText = "float:left;width:22px;height:22px;background-color:#B4E3FF;border-radius:11px;color:red;cursor:pointer;line-height:normal;"
			new_div_qr_title.appendChild(new_qr_close_left);

			//隐藏支持作者栏，右边的叉叉
			var new_qr_close_right = document.createElement('div');
			new_qr_close_right.innerHTML = "×";
			new_div_qr_all.setAttribute("class", "qr_close");
			new_qr_close_right.style.cssText = "float:right;width:22px;height:22px;background-color:#B4E3FF;border-radius:11px;color:red;cursor:pointer;line-height:normal;"
			new_div_qr_title.appendChild(new_qr_close_right);

			//支付宝红包二维码
			var img_qr_alipay_hongbao = document.createElement('img');
			img_qr_alipay_hongbao.style.cssText = "width:180px;height:180px;border:1px solid lightgray;margin:9px 9px 0 9px;";
			var base64_qr_alipay_hongbao = qrAlipayHongbao();
			img_qr_alipay_hongbao.setAttribute('src', base64_qr_alipay_hongbao);
			new_div_qr_all.appendChild(img_qr_alipay_hongbao);

			//支付宝二维码
			var img_qr_alipay = document.createElement('img');
			img_qr_alipay.style.cssText = "width:180px;height:180px;border:1px solid lightgray;margin:9px 9px 0 14px";
			var base64_qr_alipay = qrAlipay();
			img_qr_alipay.setAttribute('src', base64_qr_alipay);
			new_div_qr_all.appendChild(img_qr_alipay);

			//微信二维码
			var img_qr_wechat = document.createElement('img');
			img_qr_wechat.style.cssText = "width:180px;height:180px;border:1px solid lightgray;margin:9px 9px 0 9px;";
			var base64_qr_wechat = qrWechat();
			img_qr_wechat.setAttribute('src', base64_qr_wechat);
			new_div_qr_all.appendChild(img_qr_wechat);

			//qq二维码
			var img_qr_qq = document.createElement('img');
			img_qr_qq.style.cssText = "width:180px;height:180px;border:1px solid lightgray;margin:9px 14px 0 9px;";
			var base64_qr_qq = qrQQ();
			img_qr_qq.setAttribute('src', base64_qr_qq);
			new_div_qr_all.appendChild(img_qr_qq);

			//解释
			var new_div_qr_c = document.createElement('div');
			new_div_qr_c.style.cssText = "width:100%;height:30px;font-size:16px;color:black;"
			new_div_qr_all.appendChild(new_div_qr_c);

			//支付宝红包解释
			var new_div_qr_c_alipay_hongbao = document.createElement('div');
			new_div_qr_c_alipay_hongbao.innerHTML = "<span style='color:#2790D6'>支付宝</span>扫描<span style='color:red;'>领红包</span>";
			new_div_qr_c_alipay_hongbao.style.cssText = "width:200px;height:30px;display:inline-block;text-align:center;"
			new_div_qr_c.appendChild(new_div_qr_c_alipay_hongbao);

			//支付宝解释
			var new_div_qr_c_alipay = document.createElement('div');
			new_div_qr_c_alipay.innerHTML = "<span style='color:#2790D6'>支付宝</span>扫描捐助支持";
			new_div_qr_c_alipay.style.cssText = "width:200px;height:30px;margin-left:5px;display:inline-block;text-align:center;"
			new_div_qr_c.appendChild(new_div_qr_c_alipay);

			//微信解释
			var new_div_qr_c_wechat = document.createElement('div');
			new_div_qr_c_wechat.innerHTML = "<span style='color:#7CAA0D'>微信</span>扫描捐助支持";
			new_div_qr_c_wechat.style.cssText = "width:200px;height:30px;display:inline-block;text-align:center;"
			new_div_qr_c.appendChild(new_div_qr_c_wechat);

			//qq解释
			var new_div_qr_c_qq = document.createElement('div');
			new_div_qr_c_qq.innerHTML = "QQ扫描捐助支持";
			new_div_qr_c_qq.style.cssText = "width:200px;height:30px;display:inline-block;text-align:center;margin-right:5px;"
			new_div_qr_c.appendChild(new_div_qr_c_qq);

			//说明书点击事件
			new_div_instruct.onclick = function() {
				var ndin_display = new_div_in_all.style.display;
				if(ndin_display == "none") {
					new_div_in_all.style.display = "block";
				} else if(ndin_display == "block") {
					new_div_in_all.style.display = "none";
				}
			}

			//关闭说明书点击事件
			new_in_close_left.onclick = function() {
				new_div_in_all.style.display = "none";
			}
			new_in_close_right.onclick = function() {
				new_div_in_all.style.display = "none";
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

			//关闭求赏点击事件
			new_qr_close_left.onclick = function() {
				new_div_qr_all.style.display = "none";
			}
			new_qr_close_right.onclick = function() {
				new_div_qr_all.style.display = "none";
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
	for(var i in user_scripts) {
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
	te += '<b>注意：自动填写密码的浏览器扩展有：';
	var other_pwd = [
		['https://www.aisouziyuan.com/helper.html', '爱搜资源助手', ],
		['https://ypsuperkey.meek.com.cn/', '云盘万能钥匙', ],
		['http://www.bmqy.net/1466.html', '百度云分享链接一键登录', ],
	];
	var oplf = other_pwd.length - 1;
	for(var i in other_pwd) {
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
		}else{
			te += '。';
		}
	}
	te += '它们的数据来源不同，都装上有更大几率获取密码。</b>';
	te += '</p></br><p>';
	te += '下面列举脚本中已聚合的百度网盘资源_搜索引擎：';
	te += '<br>';
	var tea = dir_all_ot();
	for(var i in tea) {
		var teaa = tea[i];
		var teaa0 = teaa[0];
		var teaa1 = teaa[1];
		var a1 = parseInt(i) + 1;
		a1 = (a1 < 10) ? '0' + a1 : a1;
		te += '<div style="display:inline-block;width:144px;text-indent:0;">';
		te += '<div style="display:inline-block;width:22px;height:22px;margin:1px 3px 1px 1px;border:1px solid red;text-align:center;background-color:yellow;border-radius:12px;">';
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
	te += '说明书还在进一步完善中。';
	te += '</p><br><p>';
	te += '还可以尝试作者其他脚本：';
	te += '</p>';
	var other_scripts = [
		['https://greasyfork.org/zh-CN/scripts/39971', '同一词条在百度百科维基百科等网络百科中互相跳转', ],
		['https://greasyfork.org/zh-CN/scripts/375776', '吾爱油猴自动签到', ],
		['https://greasyfork.org/zh-CN/scripts/375838', 'Greasy Fork 简体汉字页面显示日均安装量', ],
		['https://greasyfork.org/zh-CN/scripts/375799', '全网禁用input自动完成', ],
	];
	for(var i in other_scripts) {
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

function dir_all_ot() {
	var tea = [
		["https://www.aisouziyuan.com/", "爱搜资源", [
			["", "https://www.aisouziyuan.com/?name=%sv%", ],
		], ],
		["https://www.52sopan.com/", "我爱搜盘", [
			["", "https://www.52sopan.com/s.php?keyword=%sv%", ],
		], ],
		["https://www.yunpanjingling.com/", "云盘精灵", [
			["", "https://www.yunpanjingling.com/search/%sv%", ],
		], ],
		["http://www.h2ero.com/", "闪电云", [
			["", "http://www.h2ero.com/search?keywords=%sv%", ],
		], ],
		["https://yunpanem.com/", "云盘恶魔", [
			["a", "https://yunpanem.com/search/a/%sv%/1.html", ],
			["c", "https://yunpanem.com/search/c/%sv%/1.html", ],
			["f", "https://yunpanem.com/search/f/%sv%/1.html", ],
		], ],
		["http://www.slimego.cn/", "史莱姆", [
			["", "http://www.slimego.cn/search.html?q=%sv%", ],
		], ],
		["https://jidanso.com/", "网盘传奇", [
			["", "https://www.jidanso.com/index.php/search/?q=%sv%", ],
		], ],
		["https://nyaso.com/", "喵搜", [
			["", "https://nyaso.com/dong/%sv%.html", ],
		], ],
		["http://www.3134.cc/", "sola资源站", [
			["", "http://www.3134.cc/search.php?kw=%sv%", ],
		], ],
		["http://www.59pan.com/", "59网盘", [
			["", "http://www.59pan.com/search/%sv%/", ],
		], ],
		["http://www.huisou.me/", "麦库搜索", [
			["", "http://www.huisou.me/index.php?k=%sv%", ],
		], ],
		["http://www.kengso.com/", "坑搜网", [
			["", "http://www.kengso.com/s?wd=%sv%", ],
		], ],
		["http://pan.here325.com/", "325搜", [
			["", "http://pan.here325.com/s?q=%sv%", ],
		], ],
		["http://www.pansoso.com/", "盘搜搜", [
			["", "http://www.pansoso.com/zh/%sv%", ],
		], ],
		["http://www.99baiduyun.com/", "99搜索", [
			["", "http://www.99baiduyun.com/baidu/%sv%", ],
		], ],
		["http://www.dmpans.com/", "大漠搜索", [
			["", "http://www.dmpans.com/search?wd=%sv%", ],
		], ],
		["https://www.cilimao.me/", "磁力猫", [
			["", "https://www.cilimao.me/search?word=%sv%&resourceSource=1", ],
		], ],
		["https://www.xiaoso.net/", "小不点", [
			["", "https://www.xiaobd.net/m/search?wd=%sv%", ],
		], ],
		["https://wangpan007.com/", "网盘007", [
			["", "https://wangpan007.com/share/kw%sv%", ],
		], ],
		["http://www.panduoduo.net/", "盘多多", [
			["", "http://www.panduoduo.net/s/name/%sv%", ],
		], ],
		["http://www.tushupan.com", "图书盘", [
			["", "http://www.tushupan.com/search?query=%sv%", ],
		], ],
		["http://www.yunpuzi.net/", "云铺子", [
			["", "http://www.yunpuzi.net/all/s-%sv%.html", ],
		], ],
		["http://www.56wangpan.com/", "56网盘", [
			["", "http://www.56wangpan.com/search/kw%sv%", ],
		], ],
		["http://www.58wangpan.com/", "58网盘", [
			["", "http://www.58wangpan.com/search/kw%sv%", ],
		], ],
		["http://wx01.51caichang.com/", "58网盘2", [
			["", "http://wx01.51caichang.com/so?keyword=%sv%", ],
		], ],
		["http://www.jisoupan.com/", "及搜盘", [
			["", "http://www.jisoupan.com/search/%sv%.html", ],
		], ],
		["http://www.pansou.com/", "盘搜", [
			["", "http://www.pansou.com/?q=%sv%", ],
		], ],
		["http://tansuo233.com/", "探索云盘", [
			["", "http://tansuo233.com/?search=%sv%", ],
		], ],
		["http://uzi8.cn/", "优质吧", [
			["", "http://uzi8.cn/search/kw%sv%", ],
		], ],
		["https://www.xalssy.com.cn", "百度网盘搜", [
			["", "https://www.xalssy.com.cn/search/kw%sv%", ],
		], ],
		["http://wjsou.com/", "文件搜", [
			["", "http://wjsou.com:8080/s2.jsp?q=%sv%", ],
		], ],
		["https://www.fastsoso.cn/", "fastsoso", [
			["", "https://www.fastsoso.cn/search?k=%sv%", ],
		], ],
		["https://www.soohub.com/", "soohub", [
			["", "https://www.soohub.com/search/%sv%/1", ],
		], ],
		["http://www.sowangpan.com/", "搜网盘", [
			["", "http://www.sowangpan.com/search/%sv%-0-全部-0.html", ],
		], ],
		["https://www.yumuso.com/", "榆木搜", [
			["", "https://www.yumuso.com/q/%sv%", ],
		], ],
		["http://www.bdsoba.com/", "搜百度吧", [
			["", "http://www.bdsoba.com/search/type_0_1_%sv%/", ],
		], ],
		["http://www.guanggua.com/", "盘115", [
			["", "http://www.guanggua.com/search?key=%sv%", ],
		], ],
		["https://pan.90xz.com/", "90网盘", [
			["", "https://pan.90xz.com/search/%sv%", ],
		], ],
		["http://www.tuoniao.me/", "鸵鸟搜索", [
			["", "http://www.tuoniao.me/search/%sv%/list", ],
		], ],
		["https://www.dyroy.com/", "乐依分享", [
			["", "https://www.dyroy.com/html/search.html?q=%sv%", ],
		], ],
		["http://sou.wolfbe.com/", "云搜一下", [
			["", "http://sou.wolfbe.com/s?q=%sv%", ],
		], ],
		["http://www.sosoyunpan.com/", "搜搜云盘", [
			["", "http://www.sosoyunpan.com/search.asp?wd=%sv%", ],
		], ],
		["https://www.sov5.cn/", "SoV5", [
			["", "https://www.sov5.cn/search?q=%sv%", ],
		], ],
		["http://www.pan131.com/", "盘131", [
			["", "http://www.pan131.com/yun/%sv%/", ],
		], ],
		["https://www.xiazaisou.com/", "下载搜", [
			["", "https://www.xiazaisou.com/wangpan?s=%sv%", ],
		], ],
		["http://www.13910.com/", "盘找找", [
			["", "http://www.13910.com/s/?kw=%sv%", ],
		], ],
		["http://www.verypan.com/", "verypan", [
			["", "http://www.verypan.com/index/index/baidusearch?keyword=%sv%", ],
		], ],
		["https://www.ttyunsou.com/", "天天云搜", [
			["", "https://www.ttyunsou.com/s?keyword=%sv%", ],
		], ],
		["http://www.wodepan.com/", "我的盘", [
			["", "http://www.wodepan.com/list/%sv%-1.html", ],
		], ],
		["http://www.aiyoweia.com/", "哎呦喂啊", [
			["", "http://www.aiyoweia.com/search/%sv%", ],
		], ],
		["http://www.iwapan.com/", "爱挖盘", [
			["", "http://www.iwapan.com/so.aspx?wd=%sv%", ],
		], ],
		["http://www.xibianyun.com/wp/", "西边云", [
			["", "http://www.xibianyun.com/wp/search?q=%sv%", ],
		], ],
		["http://www.sosobta.cn/", "网盘搜索BT", [
			["", "http://www.sosobta.cn/search/%sv%", ],
		], ],
		["http://baiduyun.6miu.com/", "6miu", [
			["", "http://baiduyun.6miu.com/word.html?kw=%sv%", ],
		], ],
		["http://www.0933.me/", "网盘资源网", [
			["", "http://www.0933.me/search.html?wd=%sv%", ],
		], ],
		["http://www.panuso.com/", "盘优搜", [
			["", "http://www.panuso.com/s/%sv%.html", ],
		], ],
		["http://www.sowp.cn/", "搜网盘2", [
			["", "http://www.sowp.cn/list/%sv%-1.html", ],
		], ],
		["http://www.xilinjie.com/", "西林街", [
			["", "http://www.xilinjie.com/s?q=%sv%&t=pan", ],
		], ],
		["http://www.friok.com/", "百度盘资源", [
			["", "http://www.friok.com/?s=%sv%", ],
		], ],
		["http://www.soupan.info/", "搜盘", [
			["", "http://www.soupan.info/search.php?q=%sv%", ],
		], ],
		["https://www.baidu.com/s?wd=pan.baidu.com&ct=1", "百度搜索", [
			["", "https://www.baidu.com/s?wd=%sv%%20pan.baidu.com&ct=1", ],
		], ],
		["https://www.google.com.hk/search?q=pan.baidu.com", "谷歌搜索", [
			["", "https://www.google.com.hk/search?q=%sv%%20pan.baidu.com", ],
		], ],
		["https://so.mezw.com/Search?wd=pan.baidu.com", "MEZW", [
			["", "https://so.mezw.com/Search?wd=%sv%%20pan.baidu.com", ],
		], ],
		["https://searx.me/?language=zh-CN&q=pan.baidu.com", "searx", [
			["", "https://searx.me/?language=zh-CN&q=%sv%%20pan.baidu.com", ],
		], ],
		["https://www.sogou.com/web?ie=utf8&query=pan.baidu.com", "搜狗搜索", [
			["", "https://www.sogou.com/web?ie=utf8&query=%sv%%20pan.baidu.com", ],
		], ],
		["https://www.so.com/s?q=pan.baidu.com", "360好搜", [
			["", "https://www.so.com/s?q=%sv%%20pan.baidu.com", ],
		], ],
		["http://www.chinaso.com/search/pagesearch.htm?q=pan.baidu.com", "中国搜索", [
			["", "http://www.chinaso.com/search/pagesearch.htm?q=%sv%%20pan.baidu.com", ],
		], ],
		["https://cn.bing.com/search?q=pan.baidu.com", "必应搜索", [
			["", "https://cn.bing.com/search?q=%sv%%20pan.baidu.com", ],
		], ],
		["https://m.sm.cn/s?q=pan.baidu.com", "神马搜索", [
			["", "https://m.sm.cn/s?q=%sv%%20pan.baidu.com", ],
		], ],
		["http://wangpan.renrensousuo.com/", "众人搜网盘", [
			["", "http://wangpan.renrensousuo.com/jieguo?sa=网盘搜索&q=%sv%", ],
		], ],
		["https://www.ecosia.org/search?q=pan.baidu.com", "ecosia", [
			["", "https://www.ecosia.org/search?q=%sv%%20pan.baidu.com", ],
		], ],
		["https://duckduckgo.com/?q=pan.baidu.com&ia=web", "duckgo", [
			["", "https://duckduckgo.com/?q=%sv%+pan.baidu.com&ia=web", ],
		], ],
		["http://www.webcrawler.com/serp?q=pan.baidu.com", "crawler", [
			["", "http://www.webcrawler.com/serp?q=%sv%%20pan.baidu.com", ],
		], ],
		["https://suche.web.de/web/result?q=pan.baidu.com", "web.de", [
			["", "https://suche.web.de/web/result?q=%sv%%20pan.baidu.com", ],
		], ],
		["https://swisscows.ch/web?query=pan.baidu.com&region=zh-CN", "swisscows", [
			["", "https://swisscows.ch/web?query=%sv%%20pan.baidu.com&region=zh-CN", ],
		], ],
		["http://www.quzhuanpan.com/", "去转盘", [
			["", "http://www.quzhuanpan.com/source/search.action?q=%sv%", ],
		], ],
		["http://www.zhuzhupan.com/", "猪猪盘", [
			["总线", "http://www.zhuzhupan.com/search?s=100&query=%sv%", ],
			["1", "http://www.zhuzhupan.com/search?s=1&query=%sv%", ],
			["2", "http://www.zhuzhupan.com/search?s=2&query=%sv%", ],
			["3", "http://www.zhuzhupan.com/search?s=3&query=%sv%", ],
			["4", "http://www.zhuzhupan.com/search?s=4&query=%sv%", ],
			["5", "http://www.zhuzhupan.com/search?s=5&query=%sv%", ],
			["6", "http://www.zhuzhupan.com/search?s=6&query=%sv%", ],
			["7", "http://www.zhuzhupan.com/search?s=7&query=%sv%", ],
			["8", "http://www.zhuzhupan.com/search?s=8&query=%sv%", ],
		], ],
		["http://www.soyunpan.com/", "搜云盘", [
			["", "http://www.soyunpan.com/search/%sv%-0-全部-0.html", ],
		], ],
		["http://www.tebaidu.com/", "特百度", [
			["", "http://www.tebaidu.com/search.asp?so_md5key=205f43408dc113b6c9f152efaf756fb9&wd=%sv%", ],
		], ],
		["https://www.panc.cc/", "胖次搜索", [
			["", "https://www.panc.cc/s/%sv%/td_0", ],
		], ],
		["http://www.daysou.com/", "云搜", [
			["全量", "http://www.daysou.com/s?q=%sv%&start=0&isget=1&tp=all&cl=0&line=4", ],
			["加密", "http://www.daysou.com/s?q=%sv%&start=0&isget=1&tp=all&cl=0&line=3", ],
			["1", "http://www.daysou.com/s?q=%sv%&start=0&isget=1&tp=all&cl=0&line=0", ],
			["3", "http://www.daysou.com/s?q=%sv%&start=0&isget=1&tp=all&cl=0&line=2", ],
			["2", "http://www.daysou.com/s?q=%sv%&start=0&isget=1&tp=all&cl=0&line=4", ],
		], ],
		["http://www.xiaobaipan.com/", "小白盘", [
			["", "http://www.xiaobaipan.com/list-%svh%", ],
		], ],
		["http://so.hzbslp.com/", "特多盘", [
			["", "http://so.hzbslp.com/api.php?pn=1&sr=%sv%", ],
		], ],
		["http://www.wangpanzhijia.net", "网盘之家", [
			["", "http://www.wangpanzhijia.net/search.html?wd=%sv%", ],
		], ],
		["http://www.v1248.com/", "v搜索", [
			["", "http://www.v1248.com/index.htm?kw=%sv%", ],
		], ],
	];
	return tea;
}

//支付宝二维码图片的base64编码
function qrAlipay() {
	var qa = "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAALQAAAC0CAIAAACyr5FlAAANIklEQVR4nO2dXWwcVxXHz5nZ3dmNHceJk9ZN0iaFtmlCo35CAgkUKFQBKQ8IJAStSPlqpQIPfWgoSAiJp9CKB17TB+CFBySQIKiqWqIKETdJaQNS0kpASJM6JI5bx3Hij/2YncPDnZldj31ndjIz6/Xk/3twsvade+fj7zPnnnPuNYsIAbAYxlKfAOhdIA6gBeIAWiAOoKUQ+MzMXRs74AsHhg73lCPPM7zz8MZxidV5io3TZeFNgOUAWiAOoAXiAFogDqAl6JAGSDd+mqJ7FXliscYK94VjecqdNEhCip1H3iJYDqAF4gBaIA6gBeIAWiIc0gCxvLxMw46RY8VyKgM/DR868sTCx1pCHz/u0LAcQAvEAbRAHEALxAG0xHNIMyWWuxTpQoa7gXGDnuFjxWqf4plkDSwH0AJxAC0QB9ACcQAtPeSQpkuSlH1ckhR+9pQHGgCWA2iBOIAWiANogTiAlngOaabeU6xYYVwfMEkMNNN61QBx73CmTwSWA2iBOIAWiANogTiAFogDaImYrXRzC4BwEi47S1JU0c2hI+nmE4HlAFogDqAF4gBaIA6ghXunniDTQtwkO3Flukatd+7/QmA5gBaIA2iBOIAWiANoieeQJiydTTdWGD5WLDLdHzfu4bFIcSxsUgtiAHEALRAH0AJxAC3xUvYJXchu7oOQxO9L97rCG6dLuuFXWA6gBeIAWiAOoAXiAFoiIqTpRi2TBOwy3SUh05jmEtYDhJ9JJLAcQAvEAbRAHEALxAG0BB3Sbkb3UiwajdykNsUzWUh29zDd6woHKXsQA4gDaIE4gBaIA2iJFyFN6Hll6qml1fN1kGTFVDhLW4eb2x2Me3kl2XIhn68VKCMV8mY5lkQWatDe2egmLfJpOeLSLinxWMLz6RFyJY5YT7RdAczsf2SPuN3mT09LuQVDigXG130VTZHJqkzW5GpdqraUCzxQ4tUWry6zOV8fHb41lM46P9V0yzvSnV3mzecIx7/+ptDpKefls/VjY41z15wrNXFERIiZDOZBizetNHYOF/dsLt2xyigYTHH0kRtuFMvhNxCiNy7ZB09Wj4/ZDUeImIiYyf+537MIFQ3aMVx4anv5ozcX/PEi/5h5bizHDSEO35mYmHMOvDV36EzdESFiYiFiFhEmJla2wbcQQsJKOkR7P1R67sHKmjIvOnrgxCCOFOiOOHxlnBi3nz0yc37aIVEPnsTtRx3b1qH743kT1I39xgu7+x64qeB327kXEnKqy0kcKe6dlW5dboBY4mDmv55v7B+Zmaw6RK4MWIg8fYgQkxAzifs91cZ963imZdDi53f1PbyxSKHiWKosQdzOI8nVVDaAmp0qm7F/ZGay5hC3DIQoJaiPLKJmsyzCJCxCIiREIiTCbneTNWf/yMyJcdvvv/sX1U3yLA7FxJzz7BHPZijE++q/UlrfJSLm+a8Y918mIpqsybNHZibmHMpjSDRAzsUhRAfenDs/7bgPUoh828H+V1ljGd/aVv7uPeXHtpTnCcZv1vat89POgbfmZH4YLZfkPM7xxiX70Lt1Uq8A9iyF64QyeW7p2go/c3+lZNAHc/Lbf1VJmJlFOSRERMolIe8jHTpT//IdpR03FyjX8Y944sjUxwwfK3BsJ4GNptDBk1Vv1kokrrspLVX4z7/9PcKt7lm1dpuJJzEROXiy+tBN/SZH1wBHxkXCryK8fXbzCcqr5VDXeXrKOT6mnEdhUpaAlA5++XDfimLr1vQVqGgQEa2y+ODn+tu7sh356bHZ8VmndeuEmPn4mH16ytkyaMByLDPU03r5bL2hftWl3ZEQIjo1YZcMdogcIREaqvB96womk+3QvyebjjtREUfIFqo3g/2LSIP45bP1LfeV86oMyqs4RMQhOjbW8F8K851MevFUtf2h3jlofn2LZTLNNOQXJ+bcTtp6azkovsyEjo01fkBlM79uRw7FoR7V5Jxz7ppDLJ4bOv8ry48eqmweMNUhfcXWa+VXn+8XIYdIhK7U5SdHZ+ZsJpWUIy82xkRE5645k1VZW+FcKoMixZFuOO86EiIddt7eWGU3JmtypSbUNuVQ7byQJ/3xTL2vuHifD6wrPHN/mZnfvGTP2W4c3QuTunaISa7UaLImaysh57UIsTzKhN5uwlB9Di0HETHzVE2ajnhxcDdTon751U1557LtRjnIzbn5yZSHNxTVfTw8WicvUduaw7j5GHGErtZbJUJLdK0Zkk9xiEit6U1G/ReCuPq4baX5mVuL96wxB8vGnC3vXXPenrDfnmiOzTqNphQN2rOpSETX6vLqaIOE2JvoMHmBUtf7oKqNINiyQvkclsnMJK36DCFmk+mJreWntlv1Jl2YcUTorkHz0xvYMq1qk85MNV+/aE/WnFtXmkR0eLR+/prjJu3nx9PdLB1JucALc/S5IYfiUKyy2GB2xJtKCDHLo7eV9m2z9h+ZPXqxUWsKExkG3z5gfHJ98UsftrauMT8y5GfkaeSibTLNMw0i7Tl+g3mgpGqFcvhOoYQr3iK6TrZ9QMIz+WDO2Xvo6uXqvGYvPtL/h9O1l841qC1n4udYPn5L4Wc7VyizofjftHN4tP7qe40T43a7SoSIhdZU+NDegbWVYH4q3ZsWoJuVtrm1HKvLvGmlcbnaCmCZTIMWj0471HJQ3VovZV029BnrKgYRTdWc/iKbBm/oN76xtfzY3db4rBwerf9ltPHP9+3Zhvta2bTSWF3Op81Q5FYcJvPO4eI/3m/6hV5NoctV+cQtxZMTNrXNb4VkoGQ8fW/58S1WyeT/TjW/99r0uorxzW3lXesLlskm8y19/Pjd5a/dZV2alb9daLx0tn5szN45XFQV6giCLT/2bC69eKpqC3s5Ffn96dqBXX1M9Od361frIkQDJf7UhuK+rdbtA4YQjVxo/Pj12Yszzpmrzpvj0/cMmfu2lj97a7FSYCYyDV7fz1+9yxpeYbw1Pr1nc0kNlEtlUI59DpWVffLw9MhFm7ycm2nQt7eVv39vmZkmqiJCQ2UuF9gRuTDj/Pqd2u/+U6vZrTiqmgbfOWju22p9cXNpRYGYuenIdw5PM9HBRxbPyubG50hTHJGNk+w+EDe6qmaYxy/ZT7wy7bhhLjcgtnnA+MKm0va15qBlTNfl3avNoxfto2ONqi1elIzYy8l4EXPZuNJ8/G7rK3dYf79kP/3a9G8e7d8xvHgxaZLLDBD3FyyJDYtdfb5MxeE3EKIfjsz+6UxdlRCL35U/S3FbB3Mvrj7c/7sZf2ZebTEz7V5f/PmuFcZ1FRiHX2ZkV90UR27LBNnLkz33YGVjv+EGwFmVeHl1P66CVKGXV+6lzIs/wVX/Z7deaLImKwr83IMVjm+llx25FYfPUMV4YXffoMWtYj+vnpzJKwFS7xxxK9JVG9fQKAWJq6hBi1/Y3TdUMSi/fqhPnsXB7CbT719nPr+rb7BseHV/7PoUrJa8uR9dE+Ed7H/TzbsxD5aN53e11jXlnkRr98KJtLrpLs8Kaam6aq14c39AwsKu8+F6ne3Rj5YXQkLE7SveYgU2MvXbMp285F8c7bSvlXVT9F5OzXVfW6VB7PkibHhrZYe8SDnEscjxPSuODlOjyn9oW2WvIuhEbUH09olMgWnHcOHJ7eWP3VwwOguGLjwTiGMRek0c7c/VdmTB/hzua8VgSrI/B8TREb0mjoU9MLO/s89UTWpNsUxeZc3b2Sdu3gTi6Igui6OTEf1j2zv3Py5a8BerCnDR08iPODIlyW3qkOuzH7p+sohkJHS0U/TTIx/HjTJl16G717kPcHVC3oJgfuALJCdv4lB0Ux851mJuXysBlzPT/vNKonlXsK9khSopTpTi0jtjRZ5JF+LIPvl8rYBUgDiAFogDaIE4gJYMZytxQ7/pulopemqxi7a7GOEOkCTofAPVkILkQBxAC8QBtEAcQEuam9TGje6FkzA4m2LIPNPIb3hXkdeVrgcaAJYDaIE4gBaIA2iBOICWeA5pusWxKXaeMGAaTsKEfrplD0lqvAPHRj4vWA6gBeIAWiAOoAXiAFp6aGvmTFeGBUh3PVWSe5gwRx+rBDVu57AcQAvEAbRAHEALxAG0BCOk3VzIlST73E0/OjJCmp1XGLcUIe5WIuE9w3IALRAH0AJxAC0QB9ACcQAtaf7R4UjS9aXDiVXKEH5sQjLddC/J0CgwBtcPxAG0QBxAC8QBtKS54i1AwtKEWI2Xdqff5Hsvd3hsJOleJiwH0AJxAC0QB9ACcQAtvbuDccKtCgIkcfQyjdWGN448mVg/jTsWLAfQAnEALRAH0AJxAC2965AGSLgKLUnUMt0/VpewQribW97CcgAtEAfQAnEALRAH0JLmnmAJ6WZINFOfMcVVg3G3log8PKQrpOxBDCAOoAXiAFogDqAlwiFdwj+tm+SPDcQl07VDAbq5nirhzr6wHEALxAG0QBxAC8QBtPTQJrWg14DlAFogDqAF4gBaIA6gBeIAWv4P31JVJhrOhjsAAAAASUVORK5CYII=";
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

//支付宝红二维码图片的base64编码
function qrAlipayHongbao() {
	var qah = "data:image/png;base64,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";
	return qah;
}
