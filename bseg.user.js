// ==UserScript==
// @name         百度网盘资源_搜索引擎_聚合
// @version      3.23
// @description  在百度云盘页面中新增百度网盘资源_搜索引擎_(争取一网打尽)
// @match        *://pan.baidu.com/*
// @match        *://yun.baidu.com/*
// @match        *://wangpan.baidu.com/*
// @match        *://duanxin.baidu.com/*
// @match        *://note.baidu.com/*
// @match        *://tonghuajilu.baidu.com/*
// @match        *://tongxunlu.baidu.com/*
// @match        *://wenzhang.baidu.com/*
// @match        *://zhaohui.baidu.com/*
// @grant        来自各个网盘百度资源搜索引擎开发者
// @author       太史子义慈
// @namespace    qs93313@sina.cn
// ==/UserScript==

!(function() {
	//处理css
	bsegCss();

	//处理dom
	bseg(0);
})();

function bseg(ttime) {
	//获取body
	var body = document.body;
	//获取域名
	var wlhost = window.location.host;
	//域名是否包含百度？
	var find_baidu = (wlhost.indexOf("baidu") != -1);

	//最多找100次
	if(ttime < 100) {

		var ins = (document.querySelector("#id_new_span") == null);

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

		//人脸搜索（https://pan.baidu.com/disk/facesearch）
		var find_face = (document.querySelector(".face-search-body") !== null);

		//综合
		var find_or = (find_home || find_init || find_download || find_version || find_checkout || find_mall || find_center || find_error || find_wenzhang || find_notlogin || find_sx || find_face);

		//确定显示点是否存在
		if(find_baidu) {
			if(ins && find_or) {
				//循环索引
				var i, j;

				//搜索引擎网址目录
				var dirall = [];
				//搜索引擎所有目录
				var dirallot = dir_all_ot();
				for(i in dirallot) {
					//某个搜索引擎的全部内容
					var bse = dirallot[i];
					//搜索引擎名称（like云盘恶魔）
					var bsen = bse[1];
					//搜索引擎区分目录（like a,b,c）所包含的内容的数组
					var bseot = bse[2];
					for(j in bseot) {
						//搜索引擎目录下的区分具体的搜索引擎
						var bsedif = bseot[j];
						//搜索引擎名称补充（like a,b,c）
						var bseno = bsedif[0];
						//搜索引擎名称全部（like 云盘恶魔a,云盘恶魔b,云盘恶魔c）
						var bsenall = bsen + bseno;
						//搜索引擎需要替换关键词的网址
						var bsesv = bsedif[1];
						//搜索引擎的样式
						var bsestyle = bsedif[2];
						//组成数组
						var dirallotita = [bsenall, bsesv, bsestyle];
						//组成二维数组
						dirall.push(dirallotita);
					}
				}

				//新建span子节点
				var new_span = document.createElement('span');
				new_span.classList.add('bseg_s');
				new_span.setAttribute("id", "id_new_span");

				//span节点建div解释说明子节点
				var new_div_instruct = document.createElement('div');
				new_div_instruct.classList.add('bseg_instruct', 'bseg_cursor_pointer', 'bseg_user_select');
				new_div_instruct.setAttribute("id", "instruct");
				new_div_instruct.innerHTML = "释";
				new_span.appendChild(new_div_instruct);

				//span节点再建【选择框】子节点
				var new_select = document.createElement('select');
				new_select.classList.add('bseg_select', 'bseg_cursor_pointer');
				new_span.appendChild(new_select);

				//选择框子节点下面要建立大量【选项】子节点
				for(i in dirall) {
					var v = dirall[i][0];
					var i1 = "new_opt_" + i;
					var oc = dirall[i][2];
					new_option(v, i1, new_select, oc);
				}

				//span节点再建【输入框】子节点
				var new_input = document.createElement('input');
				new_input.classList.add('bseg_scont');
				new_input.setAttribute("id", "scont");
				new_input.setAttribute("placeholder", "请输入内容[油猴脚本]");
				new_input.setAttribute("autocomplete", "off");
				new_span.appendChild(new_input);

				//span节点再建【清除输入框】子节点
				var new_x_btnd = document.createElement('div');
				new_x_btnd.classList.add('bseg_x_btnd', 'bseg_cursor_pointer', 'bseg_user_select');
				new_x_btnd.innerHTML = "×";
				new_span.appendChild(new_x_btnd);

				//span节点再建【按钮】子节点
				var new_btn = document.createElement('button');
				new_btn.innerHTML = "搜索";
				new_btn.classList.add('bseg_btn', 'bseg_btn_bg_mouseleave', 'bseg_user_select');
				new_span.appendChild(new_btn);
				new_btn.onmouseenter = function() {
					new_btn.classList.remove('bseg_btn_bg_mouseleave');
					new_btn.classList.add('bseg_btn_bg_mouseenter');
				};
				new_btn.onmouseleave = function() {
					new_btn.classList.remove('bseg_btn_bg_mouseenter');
					new_btn.classList.add('bseg_btn_bg_mouseleave');
				};

				//找到【父亲节点】【！！！注意每个页面父节点不同！！！】
				if(find_home) {
					//首页
					var father_home = document.getElementsByClassName("vyQHNyb")[0];
					if(father_home) {
						father_home.classList.add('bseg_f_home');
						//主页清除广告，腾位置
						var cMEMEF = document.getElementsByClassName("cMEMEF");
						if(cMEMEF) {
							var cMEMEF_len = cMEMEF.length;
							for(i = 0; i < cMEMEF_len; i++) {
								var cMEMEFi = cMEMEF[i];
								cMEMEFi.classList.add('bseg_cMEMEF');
								if(i == 2) {
									cMEMEFi.classList.add('bseg_none');
								}
							}
						}
						var gOIbzPb = document.getElementsByClassName("gOIbzPb")[0];
						gOIbzPb.classList.add('bseg_none');
						//新建span子节点
						father_home.appendChild(new_span);
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
						father_init.classList.add('bseg_f_init');
						//新建span子节点
						father_init.appendChild(new_span);
						//清理版面
						var verify_input = document.getElementsByClassName('verify-input')[0];
						if(verify_input) {
							verify_input.classList.add('bseg_verify_input');
						}
					}
				} else if(find_download) {
					//客户端下载页
					var father_download = document.getElementsByClassName("logo-main")[0];
					if(father_download) {
						father_download.classList.add('bseg_f_download');
						//新建span子节点
						father_download.appendChild(new_span);
						new_input.focus();
					}
				} else if(find_version) {
					//版本更新页
					var father_version = document.getElementsByClassName("hd-main")[0];
					if(father_version) {
						father_version.classList.add('bseg_f_version');
						//新建span子节点
						father_version.appendChild(new_span);
						new_input.focus();
					}
				} else if(find_checkout) {
					//支付中心页
					var father_checkout = document.getElementsByClassName("cashier-page-header")[0];
					var bro_checkout = document.getElementsByClassName("cashier-page-ul")[0];
					if(father_checkout && bro_checkout) {
						father_checkout.classList.add('bseg_f_checkout');
						//新建span子节点
						father_checkout.insertBefore(new_span, bro_checkout);
						new_input.focus();
					}
				} else if(find_mall) {
					//内容商城页
					var father_mall = document.getElementsByClassName("ts-category")[0];
					if(father_mall) {
						father_mall.classList.add('bseg_f_mall');
						//新建span子节点
						father_mall.appendChild(new_span);
						//设置兄弟节点样式
						var tce = document.getElementsByClassName("ts-category__entry");
						if(tce) {
							var tce_len = tce.length;
							for(i = 0; i < tce_len; i++) {
								tce[i].classList.add('bseg_tce');
							}
						}
					}
				} else if(find_center) {
					//会员中心页
					var father_center = document.getElementsByClassName("header-content")[0];
					var bro_center = document.getElementsByClassName("activation-code")[0];
					if(father_center && bro_center) {
						father_center.classList.add('bseg_f_center', 'bseg_header_content');
						//删除log，腾地方
						var lml = document.getElementsByClassName("logo-main-link")[0];
						if(lml) {
							lml.classList.add('bseg_none');
						}
						//设置侄节点样式
						var nb = document.getElementsByClassName("nav-button");
						if(nb) {
							var nb_len = nb.length;
							for(i = 0; i < nb_len; i++) {
								nb[i].classList.add('bseg_nav_button');
							}
						}
						var fnbs = document.getElementsByClassName("first-nav-button-sub")[0];
						if(fnbs) {
							fnbs.classList.add('bseg_first_nav_button_sub');
						}
						//新建span子节点
						father_center.insertBefore(new_span, bro_center);
						new_input.focus();
					}
				} else if(find_error) {
					//页面不存在
					var father_error = document.getElementsByClassName("hd-main")[0];
					var bro_error = document.getElementsByClassName("info")[0];
					if(father_error && bro_error) {
						father_error.classList.add('bseg_f_error');
						//新建span子节点
						father_error.insertBefore(new_span, bro_error);
						new_input.focus();
					}
				} else if(find_wenzhang) {
					//文章页
					var father_wenzhang = document.getElementsByClassName("__header")[0];
					var bro_wenzhang = document.getElementsByClassName("__tools")[0];
					if(father_wenzhang && bro_wenzhang) {
						father_wenzhang.classList.add('bseg_f_wenzhang');
						//新建span子节点
						father_wenzhang.insertBefore(new_span, bro_wenzhang);
						new_input.focus();
					}
				} else if(find_notlogin) {
					//未登录页
					var father_notlogin = document.getElementById("login-header");
					var bro_notlogin = document.getElementsByClassName("login-title")[0];
					if(father_notlogin && bro_notlogin) {
						father_notlogin.classList.add('bseg_f_notlogin');
						//新建span子节点
						father_notlogin.insertBefore(new_span, bro_notlogin);
						new_input.focus();
						//版面清理
						var b_no_ln = document.getElementsByClassName("b-no-ln");
						if(b_no_ln) {
							var b_no_ln_len = b_no_ln.length;
							for(i = 0; i < b_no_ln_len; i++) {
								b_no_ln[i].classList.add('bseg_b_no_ln');
							}
						}
					}
				} else if(find_sx) {
					//失效邀请
					var father_sx = document.getElementsByClassName('share-invite-box')[0];
					var bro_sx = document.getElementsByClassName('invite-bg-container')[0];
					if(father_sx && bro_sx) {
						father_sx.classList.add('bseg_f_sx');
						//新建span子节点
						father_sx.insertBefore(new_span, bro_sx);
						new_input.focus();
					}
				} else if(find_face) {
					//人脸搜索
					var father_face = document.getElementsByClassName('module-facesearch-header')[0];
					if(father_face) {
						father_face.classList.add('bseg_f_face');
						//新建span子节点
						father_face.appendChild(new_span);
						new_input.focus();
					}
				}

				//提示事件
				var new_div_alert = document.createElement('div');
				new_div_alert.classList.add('bseg_alert');
				new_div_alert.setAttribute("id", "alert");
				new_div_alert.classList.add('bseg_none');
				body.appendChild(new_div_alert);

				//提示文字
				var new_div_alert_c = document.createElement('div');
				new_div_alert_c.classList.add('bseg_alert_c');
				new_div_alert_c.innerHTML = "<a href='https://greasyfork.org/zh-CN/scripts/375337' target='_blank' class='bseg_a_alert_c'>[油猴脚本][百度网盘资源搜索引擎聚合]</a>提示您：<br><span class='bseg_n_alert_c'>请在输入框输入要搜索的内容。</span>";
				new_div_alert.appendChild(new_div_alert_c);

				//确定按钮
				var new_alert_btn = document.createElement('button');
				new_alert_btn.classList.add('bseg_alert_btn', 'bseg_cursor_pointer');
				new_alert_btn.innerHTML = "确定";
				new_div_alert.appendChild(new_alert_btn);

				//删除按钮点击事件
				new_x_btnd.onclick = function() {
					new_input.value = "";
					new_btn.classList.remove('bseg_cursor_pointer');
					new_btn.classList.add('bseg_cursor_not_allowed');
				}

				//获得输入框数据
				var new_input_val;
				//计算输入框数据长度
				var new_input_val_len;
				//默认鼠标样式
				new_btn.classList.add('bseg_cursor_not_allowed');
				//监控输入框
				new_input.oninput = function() {
					new_input_val = new_input.value;
					new_input_val_len = new_input_val.length;
					//如果输入框有数据
					if(new_input_val_len > 0) {
						//鼠标样式变为手指
						new_btn.classList.remove('bseg_cursor_not_allowed');
						new_btn.classList.add('bseg_cursor_pointer');
					} else {
						//鼠标样式变为禁止
						new_btn.classList.remove('bseg_cursor_pointer');
						new_btn.classList.add('bseg_cursor_not_allowed');
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
						//根据id和网址目录获得网址
						var pcsearch = dirall[option_index][1];
						//用输入框的数据替换掉网址内的替换符
						var dti = pcsearch.replace("%sv%", new_input_val);
						//网址跳转
						window.open(dti);
					} else {
						//出现提示
						new_div_alert.classList.remove('bseg_none');
						new_div_alert.classList.add('bseg_block');
						//几秒后自动消失
						setTimeout(function() {
							new_div_alert.classList.remove('bseg_block');
							new_div_alert.classList.add('bseg_none');
						}, 2100);
						new_input.focus();
					}
				}

				//确定按钮点击事件
				new_alert_btn.onclick = function() {
					new_div_alert.classList.remove('bseg_block');
					new_div_alert.classList.add('bseg_none');
					new_input.focus();
				}

				//建立解释说明弹出页
				var new_div_in_all = document.createElement('div');
				new_div_in_all.classList.add('bseg_in_all');
				new_div_in_all.setAttribute("id", "in_all");
				new_div_in_all.classList.add('bseg_none');
				body.appendChild(new_div_in_all);

				//说明书标题
				var new_div_in_title = document.createElement('div');
				new_div_in_title.classList.add('bseg_in_title');
				new_div_in_title.innerHTML = "<a href='https://greasyfork.org/zh-CN/scripts/375337' target='_blank' class='bseg_a_blank'>[油猴脚本][百度网盘资源_搜索引擎_聚合]</a>使用说明书"
				new_div_in_all.appendChild(new_div_in_title);

				//隐藏说明书
				xxlar(new_div_in_all, new_div_in_title);

				//说明书内容
				var new_div_in_text = document.createElement('div');
				new_div_in_text.classList.add('bseg_in_text');
				var in_text = inText();
				new_div_in_text.innerHTML = in_text;
				new_div_in_all.appendChild(new_div_in_text);

				//span节点再建div求赏点击子节点
				var new_div_reward = document.createElement('div');
				new_div_reward.classList.add('bseg_reward', 'bseg_cursor_pointer', 'bseg_user_select');
				new_div_reward.setAttribute("id", "reward");
				new_div_reward.innerHTML = "助";
				new_span.appendChild(new_div_reward);

				//建div支持作者二维码放置子节点
				var new_div_qr_all = document.createElement('div');
				new_div_qr_all.classList.add('bseg_qr_all', 'bseg_user_select');
				new_div_qr_all.setAttribute("id", "qr_all");
				new_div_qr_all.classList.add('bseg_none');
				body.appendChild(new_div_qr_all);

				//支持作者标题
				var new_div_qr_title = document.createElement('div');
				new_div_qr_title.classList.add('bseg_qr_title');
				new_div_qr_title.innerHTML = "感谢您支持<a href='https://greasyfork.org/zh-CN/scripts/375337' target='_blank' class='bseg_a_blank'> [油猴脚本] [百度网盘资源_搜索引擎_聚合] </a>的开发者,谢谢"
				new_div_qr_all.appendChild(new_div_qr_title);

				//关闭按钮
				xxlar(new_div_qr_all, new_div_qr_title);

				//放二维码的父节点
				var new_div_qr_text = document.createElement('div');
				new_div_qr_text.classList.add('bseg_qr_text');
				new_div_qr_all.appendChild(new_div_qr_text);

				//二维码
				var qrArr = qrAll();
				for(i in qrArr) {
					var qrArr_i = qrArr[i];
					var qrArr_i_0 = qrArr_i[0];
					var qrArr_i_1 = qrArr_i[1];
					qrGenerate(new_div_qr_text, qrArr_i_0, qrArr_i_1);
				}

				//说明书点击事件
				new_div_instruct.onclick = function() {
					var ndin_display = new_div_in_all.classList.contains('bseg_none');
					if(ndin_display) {
						new_div_in_all.classList.remove('bseg_none');
						new_div_in_all.classList.add('bseg_block');
					} else {
						new_div_in_all.classList.remove('bseg_block');
						new_div_in_all.classList.add('bseg_none');
					}
				}

				//求赏点击事件
				new_div_reward.onclick = function() {
					var ndqr_display = new_div_qr_all.classList.contains('bseg_none');
					if(ndqr_display) {
						new_div_qr_all.classList.remove('bseg_none');
						new_div_qr_all.classList.add('bseg_block');
					} else {
						new_div_qr_all.classList.remove('bseg_block');
						new_div_qr_all.classList.add('bseg_none');
					}
				}

				//说明书中的支持作者
				var zczz = document.getElementById('zczz');
				zczz.onclick = function() {
					var ndqr_display = new_div_qr_all.classList.contains('bseg_none');
					if(ndqr_display) {
						new_div_qr_all.classList.remove('bseg_none');
						new_div_qr_all.classList.add('bseg_block');
					}
				}
			} else {
				ttime++;
				//显示点不存在，一段时间后再次执行
				setTimeout(function() {
					bseg(ttime);
				}, 250);

			}
		}
	} else {
		console.log("脚本开发者还未涉及本页，请提示开发者修改脚本。[油猴脚本]（https://greasyfork.org/zh-CN/scripts/375337）");
	}
}

//新建option
function new_option(ih, aid, ns, oc) {
	var new_opt = document.createElement('option');
	new_opt.classList.add('bseg_option', oc, 'bseg_cursor_pointer');
	new_opt.innerHTML = ih;
	new_opt.setAttribute("id", aid);
	ns.appendChild(new_opt);
}

//短信、通讯录的搜索框
function barSearch(t1, ni) {
	if(t1 < 10) {
		var bar_search = (document.querySelector(".bar-search") !== null);
		if(bar_search) {
			ni.classList.add('bseg_ni');
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
	new_close.classList.add('bseg_close', 'bseg_cursor_pointer', lar);
	new_close.innerHTML = "×";
	f.appendChild(new_close);
	new_close.onclick = function() {
		gf.classList.remove('bseg_block');
		gf.classList.add('bseg_none');
	}
}

//关闭按钮左右两个
function xxlar(gf, f) {
	xx(gf, f, "bseg_float_left");
	xx(gf, f, "bseg_float_right");
}

//拼接说明书
function inText() {
	var i;
	var te = '';
	te += '<div id="zczz" class="bseg_zczz bseg_cursor_pointer bseg_user_select">';
	te += '支持开发者';
	te += '</div><br><p>';
	te += '脚本在 ';
	var user_scripts = [
		['https://greasyfork.org/zh-CN/scripts/375337', 'Greasy Fork', ],
		['https://github.com/qs93313/Baidupan-Search-Engine-Group/blob/master/bseg.user.js', 'github', ],
		['https://mp.weixin.qq.com/s/k1KEn0KJhS5eHOEVoCAEZg', '微信公众号', ],
		//['https://www.zhihu.com/question/54772214/answer/547902024', '知乎'],
		['https://tieba.baidu.com/p/5974006313', 'tampermonkey吧', ],
		['https://tieba.baidu.com/p/5993472277', 'chrome吧', ],
		['https://tieba.baidu.com/p/5993474487', 'firefox吧', ],
		['https://juejin.im/post/5c0fc011f265da615d727f00', '掘金', ],
		['https://segmentfault.com/a/1190000017500890', 'segmentfault', ],
		['https://www.v2ex.com/t/524418', 'V2EX', ],
		['https://blog.csdn.net/weixin_43219705/article/details/84889289', 'CSDN', ],
		['https://my.oschina.net/u/3498250/blog/2987043', '开源中国', ],
		['https://www.cnblogs.com/tszyc/p/10105746.html', '博客园', ],
		['https://blog.51cto.com/11254154/2328001', '51CTO', ],
		['https://www.douban.com/group/topic/131325841/', '豆瓣', ],
	];
	var uslf = user_scripts.length - 1;
	for(i in user_scripts) {
		var uc = user_scripts[i];
		var uc0 = uc[0];
		var uc1 = uc[1];
		te += '<a href="';
		te += uc0;
		te += '" target="_blank" class="bseg_a_blank">';
		te += uc1;
		te += '</a>';
		if(i < uslf) {
			te += '、';
		}
	}
	te += ' 分享。';
	te += '</p><br><p>';
	te += '<b class="bseg_lookout">注意：该脚本将会频繁更新。</b>由于这是脚本，数据并非存在某服务器的数据库里，而是直接写死在脚本里，数据更新即脚本更新。这些百度网盘搜索引擎网站的规则数据是会发生改变的，开发者会注意网站的规则变化并立即更新脚本。';
	te += '</p><br><p>';
	te += '<b class="bseg_lookout">注意！这些搜索网页上难免有广告，推荐使用<a href="https://www.yiclear.com/download/" target=_blank" class="bseg_a_blank">广告净化器</a>等扩展屏蔽广告。</b>';
	te += '</p><br><p>';
	te += '<b class="bseg_lookout">注意！自动填写密码的浏览器扩展有：';
	var other_pwd = [
		['https://www.aisouziyuan.com/helper.html', '爱搜资源助手', ],
		['https://ypsuperkey.meek.com.cn/', '云盘万能钥匙', ],
		['http://www.oceancoder.cn/post/BaiduYunAutoVisit.html', 'YunpanQV', ],
	];
	var oplf = other_pwd.length - 1;
	for(i in other_pwd) {
		var op = other_pwd[i];
		var op0 = op[0];
		var op1 = op[1];
		te += '<a href="';
		te += op0;
		te += '" target=_blank" class="bseg_a_blank">';
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
		te += '<div class="bseg_bse">';
		te += '<div class="bseg_bse_i">';
		te += a1;
		te += '</div>';
		te += '<a href="';
		te += teaa0;
		te += '" target=_blank" class="bseg_a_blank">';
		te += '[';
		te += teaa1;
		te += '] ';
		te += '</a>';
		te += '</div>'
	}
	te += '</p><br><p>';
	te += '搜索引擎的排序权重为：';
	var ws = [
		['网站必须能访问，不能访问的网站观察一段时间后删除。'],
		['网站访问要稳定，网站访问稳定的靠前。'],
		['搜索引擎是否收费，免费的搜索引擎靠前。'],
		['搜索引擎是否专门搜索百度网盘资源，专门搜索百度网盘资源的靠前。'],
		['网站服务器的位置，服务器在境内的靠前。'],
		['搜索结果的数量，数量多的靠前。'],
		['搜索结果的质量，失效链接少的靠前。'],
		['搜索结果是否及时更新，及时更新的靠前。'],
		['网站请求采用的字符编码，已知编码的保留，未知编码的删除。'],
		['已知字符编码的排序，从前往后依次是单层url编码、双层url编码、gbk编码、Escape编码、Base64编码、Unicode编码。'],
		['网站采用的HTTP请求方法，采用get方法的收录。'],
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
	te += '还可以尝试开发者其他脚本：';
	te += '</p>';
	var other_scripts = [
		['https://greasyfork.org/zh-CN/scripts/39971', '同一词条在百度百科维基百科等网络百科中互相跳转', ],
		['https://greasyfork.org/zh-CN/scripts/376187', '百度首页自定义导航直接展开', ],
		['https://greasyfork.org/zh-CN/scripts/375838', 'Greasy Fork 简体汉字页面显示日均安装量', ],
		['https://greasyfork.org/zh-CN/scripts/375799', '全网禁用input自动完成', ],
	];
	for(i in other_scripts) {
		var osb = other_scripts[i];
		var osb0 = osb[0];
		var osb1 = osb[1];
		te += '<p><a href="';
		te += osb0;
		te += '" target=_blank" class="bseg_a_blank">';
		te += '[';
		te += osb1;
		te += '] ';
		te += '</a></p>';
	}
	return te;
}

//二维码生成
function qrGenerate(f, qrm, cih) {
	//包含二维码和解释的div
	var div_qr_c = document.createElement('div');
	div_qr_c.classList.add('bseg_qr_c');
	f.appendChild(div_qr_c);
	//二维码图片
	var img_qr = document.createElement('img');
	img_qr.classList.add('bseg_img_qr');
	var base64_qr = qrm;
	img_qr.setAttribute('src', base64_qr);
	div_qr_c.appendChild(img_qr);
	//二维码
	var div_c = document.createElement('div');
	div_c.classList.add('bseg_cih');
	div_c.innerHTML = cih;
	div_qr_c.appendChild(div_c);
}

//搜索引擎目录
function dir_all_ot() {
	var tea = [
		["http://www.pansoso.com/", "盘搜搜", [
			["", "http://www.pansoso.com/zh/%sv%", "bseg_option_1", ],
		], ],
		["https://www.panhim.com/", "盘他", [
			["", "https://www.panhim.com/search?query=%sv%", "bseg_option_1", ],
		], ],
		["https://www.52sopan.com/", "我爱搜盘", [
			["", "https://www.52sopan.com/s.php?keyword=%sv%", "bseg_option_1", ],
		], ],
		["https://www.xiaokesoso.com/", "小可搜搜", [
			["", "https://www.xiaokesoso.com/s/search?q=%sv%", "bseg_option_1", ],
		], ],
		["https://www.yunpanjingling.com/", "云盘精灵", [
			["", "https://www.yunpanjingling.com/search/%sv%", "bseg_option_1", ],
		], ],
		["https://yunpanem.com/", "云盘恶魔", [
			["a", "https://yunpanem.com/search/a/%sv%/1.html", "bseg_option_2", ],
			["f", "https://yunpanem.com/search/f/%sv%/1.html", "bseg_option_2", ],
			["g", "https://yunpanem.com/search/g/%sv%/1.html", "bseg_option_2", ],
		], ],
		["http://www.xiaobaipan.com/", "小白盘", [
			["", "http://www.xiaobaipan.com/list-%sv%.html", "bseg_option_2", ],
		], ],
		["http://www.shiyue.org/", "十月搜索", [
			["", "http://www.shiyue.org/s/%sv%", "bseg_option_2", ],
		], ],
		["https://www.xiaobd.net/", "小不点搜索", [
			["", "https://www.xiaobd.net/m/search?wd=%sv%", "bseg_option_2", ],
		], ],
		["http://www.panduoduo.net/", "盘多多", [
			["", "http://www.panduoduo.net/s/name/%sv%", "bseg_option_2", ],
		], ],
		["http://www.slimego.cn/", "史莱姆", [
			["", "http://www.slimego.cn/search.html?q=%sv%", "bseg_option_2", ],
		], ],
		["http://www.kengso.com/", "坑搜网", [
			["", "http://www.kengso.com/s?wd=%sv%", "bseg_option_2", ],
		], ],
		["http://www.repanso.com", "热盘搜", [
			["", "http://www.repanso.com/q?wd=%sv%", "bseg_option_2", ],
		], ],
		["http://www.panmeme.com/", "盘么么", [
			["", "http://www.panmeme.com/query?key=%sv%", "bseg_option_2", ],
		], ],
		["http://wx01.51caichang.com/", "51网盘", [
			["", "http://wx01.51caichang.com/so?keyword=%sv%", "bseg_option_2", ],
		], ],
		["http://wx.haogow.com/", "西部维度", [
			["", "http://wx.haogow.com/so?keyword=%sv%", "bseg_option_2", ],
		], ],
		["http://wx.xingtuhua.com/", "商务中国", [
			["", "http://wx.xingtuhua.com/so?keyword=%sv%", "bseg_option_2", ],
		], ],
		["http://www.58wangpan.com/", "58网盘", [
			["", "http://www.58wangpan.com/search/kw%sv%", "bseg_option_2", ],
		], ],
		["https://www.56wangpan.com/", "56网盘", [
			["", "https://www.56wangpan.com/search/kw%sv%", "bseg_option_2", ],
		], ],
		["http://www.vpansou.com/", "V盘搜", [
			["", "http://www.vpansou.com/query?wd=%sv%", "bseg_option_2", ],
		], ],
		["https://www.xalssy.com.cn", "搜盘8", [
			["", "https://www.xalssy.com.cn/search/kw%sv%", "bseg_option_2", ],
		], ],
		["http://aizhaomu.com/", "创业招", [
			["", "http://aizhaomu.com/search/kw%sv%", "bseg_option_2", ],
		], ],
		["http://www.sodu123.com/", "搜度", [
			["", "http://www.sodu123.com/sodu/so.php?q=%sv%", "bseg_option_2", ],
		], ],
		["https://uzi8.cn/", "优质吧", [
			["", "https://uzi8.cn/search/kw%sv%", "bseg_option_2", ],
		], ],
		//以下的更新慢
		["https://www.qzhou.com.cn/", "轻舟网", [
			["", "https://www.qzhou.com.cn/search?keyword=%sv%", "bseg_option_3", ],
		], ],
		["http://www.59pan.com/", "59网盘", [
			["", "http://www.59pan.com/search/%sv%/", "bseg_option_3", ],
		], ],
		["http://www.99baiduyun.com/", "99搜索", [
			["", "http://www.99baiduyun.com/baidu/%sv%", "bseg_option_3", ],
		], ],
		["http://www.pansou.com/", "盘搜", [
			["", "http://www.pansou.com/?q=%sv%", "bseg_option_3", ],
		], ],
		["https://www.fastsoso.cn/", "fastsoso", [
			["", "https://www.fastsoso.cn/search?k=%sv%", "bseg_option_3", ],
		], ],
		["http://www.51sopan.cn/", "51搜盘", [
			["", "http://www.51sopan.cn/s?wd=%sv%", "bseg_option_3", ],
		], ],
		["http://www.baiduyunsousou.com/", "暮无雪", [
			["", "http://www.baiduyunsousou.com/search?kw=%sv%", "bseg_option_3", ],
		], ],
		["https://www.dupanbang.com/", "度盘帮", [
			["", "https://www.dupanbang.com/q/%sv%", "bseg_option_3", ],
		], ],
		["http://www.xilinjie.com/", "西林街", [
			["", "http://www.xilinjie.com/s?q=%sv%&t=pan", "bseg_option_3", ],
		], ],
		["http://www.vpanso.com/", "微盘搜", [
			["", "http://www.vpanso.com/s?wd=%sv%", "bseg_option_3", ],
		], ],
		["https://www.xxhh360.com/", "云搜大师", [
			["", "https://www.xxhh360.com/search?q=%sv%", "bseg_option_3", ],
		], ],
		["https://www.esopan.com/", "易搜盘", [
			["", "https://www.esopan.com/share/kw%sv%", "bseg_option_3", ],
		], ],
		["http://www.panpanso.com/", "盘盘搜", [
			["", "http://www.panpanso.com/baiduwp?qiehuan=1&sousuo=%sv%", "bseg_option_3", ],
		], ],
		["http://www.lsdy8.com/bdpan.php", "猎手电影", [
			["", "http://www.lsdy8.com/bdpan.php?sousuo=%sv%", "bseg_option_3", ],
		], ],
		["https://jidanso.com/", "网盘传奇", [
			["", "https://www.jidanso.com/index.php/search/?q=%sv%", "bseg_option_3", ],
		], ],
		["https://pan.here325.com/", "325搜", [
			["", "https://pan.here325.com/s?q=%sv%", "bseg_option_3", ],
		], ],
		["http://chawangpan.com/", "盘搜大师", [
			["", "http://chawangpan.com/paymentList.html?field=%sv%&pgtype=search&pg=1&type=1&btn=1&flag=1&ctype=1", "bseg_option_3", ],
		], ],
		["http://www.jisoupan.com/", "及搜盘", [
			["", "http://www.jisoupan.com/search/%sv%.html", "bseg_option_3", ],
		], ],
		["http://www.jisoupan.com/", "多多下载", [
			["", "http://www.jisoupan.com/search/%sv%.html", "bseg_option_3", ],
		], ],
		["http://www.sowangpan.com/", "搜网盘", [
			["", "http://www.sowangpan.com/search/%sv%-0-全部-0.html", "bseg_option_3", ],
		], ],
		["https://www.soohub.com/", "soohub", [
			["", "https://www.soohub.com/search/%sv%/1", "bseg_option_3", ],
		], ],
		["http://www.xxdown.cn/", "西西", [
			["", "http://www.xxdown.cn/e/action/ListInfo.php?title=%sv%&mid=1&tempid=10&ph=1", "bseg_option_3", ],
		], ],
		//以下是搜书的
		["http://mebook.cc/", "小书屋", [
			["", "http://mebook.cc/?s=%sv%", "bseg_option_9", ],
		], ],
		["http://www.ireadweek.com/index.php", "周读", [
			["", "http://www.ireadweek.com/index.php?g=portal&m=search&a=index&keyword=%sv%", "bseg_option_9", ],
		], ],
		["http://ibooks.org.cn/", "读书小站", [
			["", "http://ibooks.org.cn/?s=下载 %sv%", "bseg_option_9", ],
		], ],
		["https://sobooks.cc/", "sobooks", [
			["", "https://sobooks.cc/search/%sv%", "bseg_option_9", ],
		], ],
		["http://neikuw.com/", "内酷网", [
			["", "http://neikuw.com/?s=%sv%", "bseg_option_9", ],
		], ],
		["https://www.xssousou.com/", "小说搜搜", [
			["", "https://www.xssousou.com/s/%sv%.html://neikuw.com/?s=%sv%", "bseg_option_9", ],
		], ],
		["http://www.tushupan.com", "图书盘", [
			["", "http://www.tushupan.com/search?query=%sv%", "bseg_option_9", ],
		], ],
		//以下的搜不到
		["http://www.sosoyunpan.com/", "搜搜云盘", [
			["", "http://www.sosoyunpan.com/search.asp?wd=%sv%", "bseg_option_4", ],
		], ],
		["https://www.panuso.com/", "盘优搜", [
			["", "https://www.panuso.com/s/%sv%.html", "bseg_option_4", ],
		], ],
		["https://pan.90xz.com/", "90网盘", [
			["", "https://pan.90xz.com/search/%sv%", "bseg_option_4", ],
		], ],
		["https://www.dyroy.com/", "乐依分享", [
			["", "https://www.dyroy.com/html/search.html?q=%sv%", "bseg_option_4", ],
		], ],
		["https://www.0933.me/", "网盘资源网", [
			["", "https://www.0933.me/search.html?wd=%sv%", "bseg_option_4", ],
		], ],
		["https://www.sov5.cn/", "SoV5", [
			["", "https://www.sov5.cn/search?q=%sv%", "bseg_option_4", ],
		], ],
		["http://www.zhaoyunpan.cn/", "找云盘", [
			["", "http://www.zhaoyunpan.cn/share.php?key=%sv%", "bseg_option_4", ],
		], ],
		["http://sou.wolfbe.com/", "云搜一下", [
			["", "http://sou.wolfbe.com/s?q=%sv%", "bseg_option_4", ],
		], ],
		["http://www.soupan.info/", "搜盘", [
			["", "http://www.soupan.info/search.php?q=%sv%", "bseg_option_4", ],
		], ],
		["https://tool.lu/pansou/", "在线工具", [
			["", "https://tool.lu/pansou/index.html?q=%sv%", "bseg_option_4", ],
		], ],
		["http://www.pan131.com/", "盘131", [
			["", "http://www.pan131.com/yun/%sv%/", "bseg_option_4", ],
		], ],
		//以下不是专门的搜索引擎
		["https://www.baidu.com/s?wd=(pan|yun).baidu.com&ct=1", "百度搜索", [
			["", "https://www.baidu.com/s?wd=%sv%%20(pan|yun).baidu.com&ct=1", "bseg_option_5", ],
		], ],
		["https://www.google.com.hk/search?q=pan%20or%20yun%20.baidu.com", "谷歌搜索", [
			["", "https://www.google.com.hk/search?q=%sv%%20pan%20or%20yun%20.baidu.com", "bseg_option_5", ],
		], ],
		["https://mijisou.com/?language=zh-CN&q=pan.baidu.com", "秘迹搜索", [
			["", "https://mijisou.com/?language=zh-CN&q=%sv%%20pan.baidu.com", "bseg_option_5", ],
		], ],
		["https://so.mezw.com/Search?wd=pan.baidu.com", "MEZW", [
			["", "https://so.mezw.com/Search?wd=%sv%%20pan.baidu.com", "bseg_option_5", ],
		], ],
		["https://searx.me/?language=zh-CN&q=pan.baidu.com", "searx", [
			["", "https://searx.me/?language=zh-CN&q=%sv%%20pan.baidu.com", "bseg_option_5", ],
		], ],
		["https://www.sogou.com/web?ie=utf8&query=pan.baidu.com", "搜狗搜索", [
			["", "https://www.sogou.com/web?ie=utf8&query=%sv%%20pan.baidu.com", "bseg_option_5", ],
		], ],
		["https://www.so.com/s?q=pan.baidu.com", "360好搜", [
			["", "https://www.so.com/s?q=%sv%%20pan.baidu.com", "bseg_option_5", ],
		], ],
		["http://www.chinaso.com/search/pagesearch.htm?q=pan.baidu.com", "中国搜索", [
			["", "http://www.chinaso.com/search/pagesearch.htm?q=%sv%%20pan.baidu.com", "bseg_option_5", ],
		], ],
		["https://cn.bing.com/search?q=pan.baidu.com", "必应搜索", [
			["", "https://cn.bing.com/search?q=%sv%%20pan.baidu.com", "bseg_option_5", ],
		], ],
		["https://m.sm.cn/s?q=pan.baidu.com", "神马搜索", [
			["", "https://m.sm.cn/s?q=%sv%%20pan.baidu.com", "bseg_option_5", ],
		], ],
		["http://www.sousuobd.com/?q=pan.baidu.com", "必达搜索", [
			["", "http://www.sousuobd.com/?q=%sv%%20pan.baidu.com", "bseg_option_5", ],
		], ],
		["https://lookao.com/search?q=pan.baidu.com", "lookao", [
			["", "https://lookao.com/search?q=pan.baidu.com+%sv%", "bseg_option_5", ],
		], ],
		["https://dogedoge.com/results?q=pan.baidu.com", "多吉搜索", [
			["", "https://dogedoge.com/results?q=pan.baidu.com+%sv%", "bseg_option_5", ],
		], ],
		["https://www.httpso.cn/pan.baidu.com.html", "网页搜", [
			["", "https://www.httpso.cn/%sv%%20pan.baidu.com.html", "bseg_option_5", ],
		], ],
		["http://www.yhso.com/k/pan.baidu.com", "易好搜", [
			["", "http://www.yhso.com/k/%sv%%20pan.baidu.com", "bseg_option_5", ],
		], ],
		["http://www.saoso.net.cn/web/pan.baidu.com/", "扫搜", [
			["", "http://www.saoso.net.cn/web/%sv%%20pan.baidu.com/", "bseg_option_5", ],
		], ],
		["http://www.bangsou.com/q/pan.baidu.com", "帮搜", [
			["", "http://www.bangsou.com/q/%sv%%20pan.baidu.com", "bseg_option_5", ],
		], ],
		["http://www.dgso.cn/k/pan.baidu.com", "稻谷搜索", [
			["", "http://www.dgso.cn/k/%sv%%20pan.baidu.com", "bseg_option_5", ],
		], ],
		["http://www.ruonu.com/pan.baidu.com.html", "若怒搜索", [
			["", "http://www.ruonu.com/%sv%%20pan.baidu.com.html", "bseg_option_5", ],
		], ],
		["http://i.easou.com/s.m?q=pan.baidu.com", "宜搜", [
			["", "http://i.easou.com/s.m?q=%sv%%20pan.baidu.com", "bseg_option_5", ],
		], ],
		["https://www.ecosia.org/search?q=pan.baidu.com", "ecosia", [
			["", "https://www.ecosia.org/search?q=%sv%%20pan.baidu.com", "bseg_option_5", ],
		], ],
		["https://duckduckgo.com/?q=pan.baidu.com&ia=web", "duckgo", [
			["", "https://duckduckgo.com/?q=%sv%+pan.baidu.com&ia=web", "bseg_option_5", ],
		], ],
		["https://www.webcrawler.com/serp?q=pan.baidu.com", "crawler", [
			["", "https://www.webcrawler.com/serp?q=%sv%%20pan.baidu.com", "bseg_option_5", ],
		], ],
		["https://suche.web.de/web/result?q=pan.baidu.com", "web.de", [
			["", "https://suche.web.de/web/result?q=%sv%%20pan.baidu.com", "bseg_option_5", ],
		], ],
		["https://swisscows.ch/web?query=pan.baidu.com&region=zh-CN", "swisscows", [
			["", "https://swisscows.ch/web?query=%sv%%20pan.baidu.com&region=zh-CN", "bseg_option_5", ],
		], ],
		["https://wangpan.renrensousuo.com/", "众人搜网盘", [
			["", "https://wangpan.renrensousuo.com/jieguo?sa=网盘搜索&q=%sv%", "bseg_option_5", ],
		], ],
		//以下的要收费
		["http://tansuo233.com/", "探索云盘", [
			["", "http://tansuo233.com/?search=%sv%", "bseg_option_6", ],
		], ],
		["https://www.quzhuanpan.com/", "去转盘", [
			["", "https://www.quzhuanpan.com/source/search.action?q=%sv%", "bseg_option_6", ],
		], ],
		["http://www.zhuzhupan.com/", "猪猪盘", [
			["总线", "http://www.zhuzhupan.com/search?s=100&query=%sv%", "bseg_option_6", ],
			["1", "http://www.zhuzhupan.com/search?s=1&query=%sv%", "bseg_option_6", ],
			["2", "http://www.zhuzhupan.com/search?s=2&query=%sv%", "bseg_option_6", ],
			["3", "http://www.zhuzhupan.com/search?s=3&query=%sv%", "bseg_option_6", ],
			["4", "http://www.zhuzhupan.com/search?s=4&query=%sv%", "bseg_option_6", ],
			["5", "http://www.zhuzhupan.com/search?s=5&query=%sv%", "bseg_option_6", ],
			["6", "http://www.zhuzhupan.com/search?s=6&query=%sv%", "bseg_option_6", ],
			["7", "http://www.zhuzhupan.com/search?s=7&query=%sv%", "bseg_option_6", ],
			["8", "http://www.zhuzhupan.com/search?s=8&query=%sv%", "bseg_option_6", ],
		], ],
		["https://www.soyunpan.com/", "搜云盘", [
			["", "https://www.soyunpan.com/search/%sv%-0-全部-0.html", "bseg_option_6", ],
		], ],
		["http://www.olecn.com/", "资源下载", [
			["", "http://www.olecn.com/?s=%sv%", "bseg_option_6", ],
		], ],
		//以下的什么都搜不到
		["https://www.xiazaisou.com/", "下载搜", [
			["", "https://www.xiazaisou.com/wangpan?s=%sv%", "bseg_option_7", ],
		], ],
		["http://www.13910.com/", "盘找找", [
			["", "http://www.13910.com/s/?kw=%sv%", "bseg_option_7", ],
		], ],
		["http://www.verypan.com/", "verypan", [
			["", "http://www.verypan.com/index/index/baidusearch?keyword=%sv%", "bseg_option_7", ],
		], ],
		["https://www.ttyunsou.com/", "天天云搜", [
			["", "https://www.ttyunsou.com/s?keyword=%sv%", "bseg_option_7", ],
		], ],
		["http://www.wodepan.com/", "我的盘", [
			["", "http://www.wodepan.com/list/%sv%-1.html", "bseg_option_7", ],
		], ],
		["http://www.aiyoweia.com/", "哎呦喂啊", [
			["", "http://www.aiyoweia.com/search/%sv%", "bseg_option_7", ],
		], ],
		["http://www.iwapan.com/", "爱挖盘", [
			["", "http://www.iwapan.com/so.aspx?wd=%sv%", "bseg_option_7", ],
		], ],
		["http://www.xibianyun.com/wp/", "西边云", [
			["", "http://www.xibianyun.com/wp/search?q=%sv%", "bseg_option_7", ],
		], ],
		["http://yun.java1234.com/", "专搜java", [
			["", "http://yun.java1234.com/search?q=%sv%", "bseg_option_7", ],
		], ],
		["https://www.sosobtp.com/", "网盘搜索BT", [
			["", "https://www.sosobtp.com/search/%sv%", "bseg_option_7", ],
		], ],
		["http://baiduyun.6miu.com/", "6miu", [
			["", "http://baiduyun.6miu.com/word.html?kw=%sv%", "bseg_option_7", ],
		], ],
		["http://www.sowp.cn/", "网盘搜搜", [
			["", "http://www.sowp.cn/list/%sv%-1.html", "bseg_option_7", ],
		], ],
		["http://www.friok.com/", "百度盘资源", [
			["", "http://www.friok.com/?s=%sv%", "bseg_option_7", ],
		], ],
		["http://www.pansousou.net/", "盘搜搜", [
			["", "http://www.pansousou.net/s?wd=%sv%", "bseg_option_7", ],
		], ],
		["http://www.sodwz.com/", "网盘资源网", [
			["", "http://www.sodwz.com/search/type_0_1_%sv%/", "bseg_option_7", ],
		], ],
		["http://www.yigeju.cn/", "一个桔", [
			["", "http://www.yigeju.cn/s.php?kw=%sv%", "bseg_option_7", ],
		], ],
		["http://www.pan91.com/", "pan91", [
			["", "http://www.pan91.com/index/index/search?key=%sv%", "bseg_option_7", ],
		], ],
		["http://kaopu.so/", "靠谱搜索", [
			["", "http://kaopu.so/pan/%sv%", "bseg_option_7", ],
		], ],
		["https://www.xiazaisou.com/wangpan", "下载搜", [
			["", "https://www.xiazaisou.com/wangpan?s=%sv%", "bseg_option_7", ],
		], ],
		["http://pan.muyi.so/", "沐依神器", [
			["", "http://pan.muyi.so/index.php/home/index/result.html?q=%sv%", "bseg_option_7", ],
		], ],
		//以下的不稳定
		["https://www.panc.cc/", "胖次搜索", [
			["", "https://www.panc.cc/s/%sv%/td_0", "bseg_option_8", ],
		], ],
		["https://www.pp93.com/", "泡泡", [
			["史莱姆", "http://www.pp93.com/pp93sou.php?Slime=%sv%", "bseg_option_8", ],
			["盘搜", "http://www.pp93.com/pp93sou.php?pansou=%sv%", "bseg_option_8", ],
			["胖次", "http://www.pp93.com/pp93sou.php?panc=%sv%", "bseg_option_8", ],
			["盘搜搜", "http://www.pp93.com/pp93sou.php?pansoso=%sv%", "bseg_option_8", ],
		], ],
		["http://www.daysou.com/", "云搜", [
			["全量", "http://www.daysou.com/s?q=%sv%&start=0&isget=1&tp=all&cl=0&line=4", "bseg_option_8", ],
			["加密", "http://www.daysou.com/s?q=%sv%&start=0&isget=1&tp=all&cl=0&line=3", "bseg_option_8", ],
			["1", "http://www.daysou.com/s?q=%sv%&start=0&isget=1&tp=all&cl=0&line=0", "bseg_option_8", ],
			["3", "http://www.daysou.com/s?q=%sv%&start=0&isget=1&tp=all&cl=0&line=2", "bseg_option_8", ],
			["2", "http://www.daysou.com/s?q=%sv%&start=0&isget=1&tp=all&cl=0&line=4", "bseg_option_8", ],
		], ],
		["http://www.wanpan.info/", "万盘搜索", [
			["", "http://www.wanpan.info/k/%sv%", "bseg_option_8", ],
		], ],
		["https://www.yumuso.com/", "榆木搜", [
			["", "https://www.yumuso.com/q/%sv%", "bseg_option_8", ],
		], ],
		["http://so.hzbslp.com/", "特多盘", [
			["", "http://so.hzbslp.com/api.php?pn=1&sr=%sv%", "bseg_option_8", ],
		], ],
		//以下的可能已失效
		["https://www.h2ero.com/", "咕咕云", [
			["", "https://www.h2ero.com/search?keywords=%sv%", "bseg_option_8", ],
		], ],
		["https://nyaso.com/", "喵搜动漫", [
			["", "https://nyaso.com/dong/%sv%.html", "bseg_option_8", ],
		], ],
		["https://www.fqsousou.com/", "番茄搜搜", [
			["", "https://www.fqsousou.com/s/%sv%.html", "bseg_option_8", ],
		], ],
		["http://www.sopanba.com/", "搜盘吧", [
			["", "http://www.sopanba.com/s/name/%sv%", "bseg_option_8", ],
		], ],
		["http://wjsou.com/", "文件搜", [
			["", "http://wjsou.com:8080/s2.jsp?q=%sv%", "bseg_option_8", ],
		], ],
		["https://wangpan007.com/", "网盘007", [
			["", "https://wangpan007.com/share/kw%sv%", "bseg_option_8", ],
		], ],
		["https://www.yunpuzi.net/", "云铺子", [
			["", "https://www.yunpuzi.net/all/s-%sv%.html", "bseg_option_8", ],
		], ],
		["https://www.cilimao.io/", "磁力猫", [
			["", "https://www.cilimao.io/search?word=%sv%&resourceSource=1", "bseg_option_8", ],
		], ],
		["https://www.lesouyun.com/", "乐搜云", [
			["", "https://www.lesouyun.com/s?wd=%sv%", "bseg_option_8", ],
		], ],
		["http://www.guanggua.com/", "盘115", [
			["", "http://www.guanggua.com/search?key=%sv%", "bseg_option_8", ],
		], ],
		["http://www.sosuopan.com/", "搜索盘", [
			["", "http://www.sosuopan.com/search?q=%sv%", "bseg_option_8", ],
		], ],
		["http://www.tuoniao.me/", "鸵鸟搜索", [
			["", "http://www.tuoniao.me/search/%sv%/list", "bseg_option_8", ],
		], ],
		["http://www.91sousou.cn/", "91搜搜", [
			["", "http://www.91sousou.cn/s/%sv%/", "bseg_option_8", ],
		], ],
		["https://www.aisouziyuan.com/", "爱搜资源", [
			["", "https://www.aisouziyuan.com/?name=%sv%", "bseg_option_1", ],
		], ],
	];
	return tea;
}

//二维码
//感谢 二维码解析【https://cli.im/deqr/】
//感谢 二维码生成【https://cli.im/】
//感谢 应用宝图标【https://sj.qq.com/myapp/】
//感谢 转base64【http://imgbase64.duoshitong.com/】
function qrAll() {
	var gg = "<span class='bseg_gg'>&nbsp;广告&nbsp;</span>&nbsp;";
	//支付宝红包
	var qrAlipayHongbao = "data:image/png;base64,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";
	//支付宝
	var qrAlipay = "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAALQAAAC0CAIAAACyr5FlAAANIklEQVR4nO2dXWwcVxXHz5nZ3dmNHceJk9ZN0iaFtmlCo35CAgkUKFQBKQ8IJAStSPlqpQIPfWgoSAiJp9CKB17TB+CFBySQIKiqWqIKETdJaQNS0kpASJM6JI5bx3Hij/2YncPDnZldj31ndjIz6/Xk/3twsvade+fj7zPnnnPuNYsIAbAYxlKfAOhdIA6gBeIAWiAOoKUQ+MzMXRs74AsHhg73lCPPM7zz8MZxidV5io3TZeFNgOUAWiAOoAXiAFogDqAl6JAGSDd+mqJ7FXliscYK94VjecqdNEhCip1H3iJYDqAF4gBaIA6gBeIAWiIc0gCxvLxMw46RY8VyKgM/DR868sTCx1pCHz/u0LAcQAvEAbRAHEALxAG0xHNIMyWWuxTpQoa7gXGDnuFjxWqf4plkDSwH0AJxAC0QB9ACcQAtPeSQpkuSlH1ckhR+9pQHGgCWA2iBOIAWiANogTiAlngOaabeU6xYYVwfMEkMNNN61QBx73CmTwSWA2iBOIAWiANogTiAFogDaImYrXRzC4BwEi47S1JU0c2hI+nmE4HlAFogDqAF4gBaIA6ghXunniDTQtwkO3Flukatd+7/QmA5gBaIA2iBOIAWiANoieeQJiydTTdWGD5WLDLdHzfu4bFIcSxsUgtiAHEALRAH0AJxAC3xUvYJXchu7oOQxO9L97rCG6dLuuFXWA6gBeIAWiAOoAXiAFoiIqTpRi2TBOwy3SUh05jmEtYDhJ9JJLAcQAvEAbRAHEALxAG0BB3Sbkb3UiwajdykNsUzWUh29zDd6woHKXsQA4gDaIE4gBaIA2iJFyFN6Hll6qml1fN1kGTFVDhLW4eb2x2Me3kl2XIhn68VKCMV8mY5lkQWatDe2egmLfJpOeLSLinxWMLz6RFyJY5YT7RdAczsf2SPuN3mT09LuQVDigXG130VTZHJqkzW5GpdqraUCzxQ4tUWry6zOV8fHb41lM46P9V0yzvSnV3mzecIx7/+ptDpKefls/VjY41z15wrNXFERIiZDOZBizetNHYOF/dsLt2xyigYTHH0kRtuFMvhNxCiNy7ZB09Wj4/ZDUeImIiYyf+537MIFQ3aMVx4anv5ozcX/PEi/5h5bizHDSEO35mYmHMOvDV36EzdESFiYiFiFhEmJla2wbcQQsJKOkR7P1R67sHKmjIvOnrgxCCOFOiOOHxlnBi3nz0yc37aIVEPnsTtRx3b1qH743kT1I39xgu7+x64qeB327kXEnKqy0kcKe6dlW5dboBY4mDmv55v7B+Zmaw6RK4MWIg8fYgQkxAzifs91cZ963imZdDi53f1PbyxSKHiWKosQdzOI8nVVDaAmp0qm7F/ZGay5hC3DIQoJaiPLKJmsyzCJCxCIiREIiTCbneTNWf/yMyJcdvvv/sX1U3yLA7FxJzz7BHPZijE++q/UlrfJSLm+a8Y918mIpqsybNHZibmHMpjSDRAzsUhRAfenDs/7bgPUoh828H+V1ljGd/aVv7uPeXHtpTnCcZv1vat89POgbfmZH4YLZfkPM7xxiX70Lt1Uq8A9iyF64QyeW7p2go/c3+lZNAHc/Lbf1VJmJlFOSRERMolIe8jHTpT//IdpR03FyjX8Y944sjUxwwfK3BsJ4GNptDBk1Vv1kokrrspLVX4z7/9PcKt7lm1dpuJJzEROXiy+tBN/SZH1wBHxkXCryK8fXbzCcqr5VDXeXrKOT6mnEdhUpaAlA5++XDfimLr1vQVqGgQEa2y+ODn+tu7sh356bHZ8VmndeuEmPn4mH16ytkyaMByLDPU03r5bL2hftWl3ZEQIjo1YZcMdogcIREaqvB96womk+3QvyebjjtREUfIFqo3g/2LSIP45bP1LfeV86oMyqs4RMQhOjbW8F8K851MevFUtf2h3jlofn2LZTLNNOQXJ+bcTtp6azkovsyEjo01fkBlM79uRw7FoR7V5Jxz7ppDLJ4bOv8ry48eqmweMNUhfcXWa+VXn+8XIYdIhK7U5SdHZ+ZsJpWUIy82xkRE5645k1VZW+FcKoMixZFuOO86EiIddt7eWGU3JmtypSbUNuVQ7byQJ/3xTL2vuHifD6wrPHN/mZnfvGTP2W4c3QuTunaISa7UaLImaysh57UIsTzKhN5uwlB9Di0HETHzVE2ajnhxcDdTon751U1557LtRjnIzbn5yZSHNxTVfTw8WicvUduaw7j5GHGErtZbJUJLdK0Zkk9xiEit6U1G/ReCuPq4baX5mVuL96wxB8vGnC3vXXPenrDfnmiOzTqNphQN2rOpSETX6vLqaIOE2JvoMHmBUtf7oKqNINiyQvkclsnMJK36DCFmk+mJreWntlv1Jl2YcUTorkHz0xvYMq1qk85MNV+/aE/WnFtXmkR0eLR+/prjJu3nx9PdLB1JucALc/S5IYfiUKyy2GB2xJtKCDHLo7eV9m2z9h+ZPXqxUWsKExkG3z5gfHJ98UsftrauMT8y5GfkaeSibTLNMw0i7Tl+g3mgpGqFcvhOoYQr3iK6TrZ9QMIz+WDO2Xvo6uXqvGYvPtL/h9O1l841qC1n4udYPn5L4Wc7VyizofjftHN4tP7qe40T43a7SoSIhdZU+NDegbWVYH4q3ZsWoJuVtrm1HKvLvGmlcbnaCmCZTIMWj0471HJQ3VovZV029BnrKgYRTdWc/iKbBm/oN76xtfzY3db4rBwerf9ltPHP9+3Zhvta2bTSWF3Op81Q5FYcJvPO4eI/3m/6hV5NoctV+cQtxZMTNrXNb4VkoGQ8fW/58S1WyeT/TjW/99r0uorxzW3lXesLlskm8y19/Pjd5a/dZV2alb9daLx0tn5szN45XFQV6giCLT/2bC69eKpqC3s5Ffn96dqBXX1M9Od361frIkQDJf7UhuK+rdbtA4YQjVxo/Pj12Yszzpmrzpvj0/cMmfu2lj97a7FSYCYyDV7fz1+9yxpeYbw1Pr1nc0kNlEtlUI59DpWVffLw9MhFm7ycm2nQt7eVv39vmZkmqiJCQ2UuF9gRuTDj/Pqd2u/+U6vZrTiqmgbfOWju22p9cXNpRYGYuenIdw5PM9HBRxbPyubG50hTHJGNk+w+EDe6qmaYxy/ZT7wy7bhhLjcgtnnA+MKm0va15qBlTNfl3avNoxfto2ONqi1elIzYy8l4EXPZuNJ8/G7rK3dYf79kP/3a9G8e7d8xvHgxaZLLDBD3FyyJDYtdfb5MxeE3EKIfjsz+6UxdlRCL35U/S3FbB3Mvrj7c/7sZf2ZebTEz7V5f/PmuFcZ1FRiHX2ZkV90UR27LBNnLkz33YGVjv+EGwFmVeHl1P66CVKGXV+6lzIs/wVX/Z7deaLImKwr83IMVjm+llx25FYfPUMV4YXffoMWtYj+vnpzJKwFS7xxxK9JVG9fQKAWJq6hBi1/Y3TdUMSi/fqhPnsXB7CbT719nPr+rb7BseHV/7PoUrJa8uR9dE+Ed7H/TzbsxD5aN53e11jXlnkRr98KJtLrpLs8Kaam6aq14c39AwsKu8+F6ne3Rj5YXQkLE7SveYgU2MvXbMp285F8c7bSvlXVT9F5OzXVfW6VB7PkibHhrZYe8SDnEscjxPSuODlOjyn9oW2WvIuhEbUH09olMgWnHcOHJ7eWP3VwwOguGLjwTiGMRek0c7c/VdmTB/hzua8VgSrI/B8TREb0mjoU9MLO/s89UTWpNsUxeZc3b2Sdu3gTi6Igui6OTEf1j2zv3Py5a8BerCnDR08iPODIlyW3qkOuzH7p+sohkJHS0U/TTIx/HjTJl16G717kPcHVC3oJgfuALJCdv4lB0Ux851mJuXysBlzPT/vNKonlXsK9khSopTpTi0jtjRZ5JF+LIPvl8rYBUgDiAFogDaIE4gJYMZytxQ7/pulopemqxi7a7GOEOkCTofAPVkILkQBxAC8QBtEAcQEuam9TGje6FkzA4m2LIPNPIb3hXkdeVrgcaAJYDaIE4gBaIA2iBOICWeA5pusWxKXaeMGAaTsKEfrplD0lqvAPHRj4vWA6gBeIAWiAOoAXiAFp6aGvmTFeGBUh3PVWSe5gwRx+rBDVu57AcQAvEAbRAHEALxAG0BCOk3VzIlST73E0/OjJCmp1XGLcUIe5WIuE9w3IALRAH0AJxAC0QB9ACcQAtaf7R4UjS9aXDiVXKEH5sQjLddC/J0CgwBtcPxAG0QBxAC8QBtKS54i1AwtKEWI2Xdqff5Hsvd3hsJOleJiwH0AJxAC0QB9ACcQAtvbuDccKtCgIkcfQyjdWGN448mVg/jTsWLAfQAnEALRAH0AJxAC2965AGSLgKLUnUMt0/VpewQribW97CcgAtEAfQAnEALRAH0JLmnmAJ6WZINFOfMcVVg3G3log8PKQrpOxBDCAOoAXiAFogDqAlwiFdwj+tm+SPDcQl07VDAbq5nirhzr6wHEALxAG0QBxAC8QBtPTQJrWg14DlAFogDqAF4gBaIA6gBeIAWv4P31JVJhrOhjsAAAAASUVORK5CYII=";
	//微信
	var qrWechat = "data:image/png;base64,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";
	//qq
	var qrQQ = "data:image/png;base64,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";
	//支付宝备用金
	var qrAlipayB = "data:image/png;base64,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";
	//余额宝体验金
	var qrYuebaoT = "data:image/png;base64,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";
	//支付宝每日必抢
	var qrAlipayM = "data:image/png;base64,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";
	//一淘
	var qrYt = "data:image/png;base64,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";
	//今日头条
	var qrToutiao = "data:image/png;base64,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";
	
	var qrAllArr = [
		//支付宝红包
		[qrAlipayHongbao, "<span class='bseg_alipay'>支付宝</span>扫一扫<br>或搜<span class='bseg_lookout'> 528558941 </span><span class='bseg_lookout'>领红包</span>"],
		//余额宝体验金
		[qrYuebaoT, "<span class='bseg_alipay'>支付宝·</span><span class='bseg_YuebaoT'>余额宝·体验金</span><br>跳龙门 赢收益奖励"],
		//每日必抢
		[qrAlipayM, "天天砸金蛋<br>每天抢红包"],
		//支付宝
		[qrAlipay, "<span class='bseg_alipay'>支付宝</span>扫一扫<br>捐助支持"],
		//微信
		[qrWechat, "<span class='bseg_Wechat'>微信</span>扫一扫<br>捐助支持"],
		//QQ
		[qrQQ, "QQ扫一扫<br>捐助支持"],
		//一淘
		[qrYt, "淘宝生活<br>省钱利器"],
		//今日头条
		[qrToutiao,"今日头条<br>极速版"],
		//支付宝备用金
		[qrAlipayB, "<span class='bseg_alipay'>支付宝·备用金·500元</span><br>解决您的小尴尬"],
	];
	return qrAllArr;
}

//添加css
function bsegAddCss(cssText) {
	var acss = document.createElement('style');
	acss.textContent = cssText;
	var doc = (document.head || document.documentElement);
	doc.appendChild(acss);
}

//css整理与美化（ 感谢https://tool.lu/css/）
function bsegCss() {
	bsegAddCss(`
.bseg_none {
    display: none!important;
}
.bseg_block {
    display: block;
}
.bseg_cursor_pointer {
    cursor: pointer;
}
.bseg_cursor_not_allowed {
    cursor: not-allowed;
}
.bseg_float_left {
    float: left;
}
.bseg_float_right {
    float: right;
}
.bseg_user_select {
    -webkit-user-select: none;
    -moz-user-select: none;
    -ms-user-select: none;
    user-select: none;
}
.bseg_s{
    font-family: 'Microsoft YaHei', arial, SimSun, 宋体!important;
}
.bseg_instruct {
    display: inline-block;
    width: 15px;
    height: 25px;
    border-top: 1px solid #A9A9A9;
    border-bottom: 1px solid #A9A9A9;
    border-left: 1px solid #A9A9A9;
    border-radius: 14px 0 0 14px;
    color: #000;
    text-align: right;
    font-size: 10px;
    line-height: 27px;
    background-color: #FFF;
}
.bseg_close {
    width: 22px;
    height: 22px;
    border-radius: 11px;
    background-color: #B4E3FF;
    color: #f00;
    line-height: normal;
    font-family: 'Microsoft YaHei', arial, SimSun, 宋体!important;
}
.bseg_select {
    border: 1px solid #A9A9A9;
    background-color: #fff;
    color: #000;
    font-size: 15px;
    outline: 0;
    width: 104px;
    border-radius: 0;
}
.bseg_scont {
    display: inline-block;
    box-sizing: content-box;
    margin: 0;
    padding: 2px;
    outline: 0;
    border-top: 1px solid #A9A9A9;
    border-right: 0;
    border-bottom: 1px solid #A9A9A9;
    border-left: 0;
    background-color: #fff;
    color: #000;
    font-size: 15px;
    font-family: 'Microsoft YaHei', arial, SimSun, 宋体;
    cursor: text;
    border-radius: 0;
}
.bseg_x_btnd {
    display: inline-block;
    padding: 2px 0;
    width: 16px;
    height: 24px;
    outline: 0;
    border-top: 1px solid #a9a9a9;
    border-right: 0;
    border-bottom: 1px solid #a9a9a9;
    border-left: 0;
    background-color: #fff;
    color: #000;
    text-align: center;
    font-size: 15px;
    line-height: 24px;
}
.bseg_btn {
    padding: 0;
    width: 52px;
    height: 29px;
    border: 1px solid #A9A9A9;
    color: #fff;
    font-size: 14px;
    border-radius: 0;
}
.bseg_alert {
    position: absolute;
    top: 62px;
    right: 0;
    left: 0;
    z-index: 9999;
    margin: 0 auto;
    width: 450px;
    height: 120px;
    border: 1px solid #d3d3d3;
    border-radius: 7px;
    background-color: #fff;
}
.bseg_alert_c {
    padding: 15px;
    height: 42px;
    letter-spacing: 1px;
    font-size: 14px;
}
.bseg_alert_btn {
    margin-left: 370px;
    padding: 0;
    width: 64px;
    height: 32px;
    border: 0;
    border-radius: 3px;
    background: #3b8cff;
    color: #fff;
    font-size: 14px;
}
.bseg_in_all {
    position: absolute;
    top: 62px;
    left: 14px;
    z-index: 998;
    width: 614px;
    height: 410px;
    border: 1px solid #d3d3d3;
    border-radius: 7px;
    background-color: #fff;
    line-height: normal;
}
.bseg_in_title {
    padding: 5px;
    height: 20px;
    border-bottom: 1px solid #d3d3d3;
    text-align: center;
    letter-spacing: 1px;
    font-weight: 700;
    font-size: 14px;
}
.bseg_in_text {
    overflow-y: auto;
    margin: 10px 10px 10px 10px;
    width: 594px;
    height: 360px;
    text-align: justify;
    text-indent: 30px;
    font-size: 15px;
}
.bseg_reward {
    display: inline-block;
    width: 15px;
    height: 25px;
    border-top: 1px solid #A9A9A9;
    border-right: 1px solid #A9A9A9;
    border-bottom: 1px solid #A9A9A9;
    border-radius: 0 14px 14px 0;
    color: #000;
    font-size: 10px;
    line-height: 27px;
    background-color: #FFF;
}
.bseg_qr_all {
    position: absolute;
    top: 62px;
    right: 14px;
    z-index: 999;
    width: 612px;
    height: 550px;
    border: 1px solid #d3d3d3;
    border-radius: 7px;
    background-color: #fff;
    line-height: normal;
}
.bseg_qr_title {
    padding: 5px;
    height: 20px;
    border-bottom: 1px solid #d3d3d3;
    text-align: center;
    letter-spacing: 1px;
    font-weight: 700;
    font-size: 14px;
}
.bseg_qr_text {
    overflow-y: auto;
    height: 515px;
}
.bseg_bse {
    display: inline-block;
    width: 144px;
    text-indent: 0;
}
.bseg_bse_i {
    display: inline-block;
    margin: 1px 3px 1px 1px;
    width: 33px;
    height: 22px;
    border: 1px solid #f00;
    border-radius: 17px 17px 17px 17px/12px 12px 12px 12px;
    background-color: #ff0;
    text-align: center;
}
.bseg_qr_c {
    display: inline-block;
    width: 200px;
    height: 254px;
    border-bottom: 1px dotted #d3d3d3;
}
.bseg_img_qr {
    margin: 9px 9px 0 9px;
    width: 180px;
    height: 180px;
    border: 1px solid #d3d3d3;
}
.bseg_cih {
    display: inline-block;
    width: 200px;
    height: 60px;
    text-align: center;
    font-size: 16px;
}
.bseg_btn_bg_mouseleave {
    background-color: #3B8CFF;
}
.bseg_btn_bg_mouseenter {
    background-color: #7EB2FF;
}
.bseg_cMEMEF {
    margin: 0 8px!important;
}
.bseg_ni {
    width: 240px;
}
.bseg_f_home {
    margin-left: 0!important;
}
.bseg_f_mall {
    left: 200px;
}
.bseg_f_home > .bseg_s {
    margin: 0 0 0 10px;
}
.bseg_f_init > .bseg_s {
    display: inline-block;
    margin: 35px 0 0 0;
}
.bseg_f_center > .bseg_s {
    display: inline-block;
    margin: 19px 0 0 7px;
}
.bseg_f_error > .bseg_s {
    display: inline-block;
    margin: 7px 0 0 85px;
}
.bseg_f_face > .bseg_s {
    display: inline-block;
    margin: 10px 0 0 200px;
}
.bseg_f_wenzhang > .bseg_s {
    display: inline-block;
    margin: 11px 0 0 50px;
}
.bseg_f_sx > .bseg_s {
    display: inline-block;
    margin: 18px 0 0 240px;
}
.bseg_f_notlogin > .bseg_s {
    display: inline-block;
    margin: 18px 0 0 2px;
}
.bseg_f_checkout > .bseg_s {
    display: inline-block;
    margin: 5px 0 0 10px;
}
.bseg_f_download > .bseg_s {
    display: inline-block;
    margin: 5px 0 0 48px;
}
.bseg_f_version > .bseg_s {
    display: inline-block;
    margin: 5px 0 0 85px;
}
.bseg_f_mall > .bseg_s {
    margin: 0 0 0 3px;
}
.bseg_f_home > .bseg_s > .bseg_select {
    height: 30px;
}
.bseg_f_init > .bseg_s > .bseg_select {
    display: inline-block;
    width: 100px;
    height: 30px;
}
.bseg_f_download > .bseg_s > .bseg_select {
    height: 30px;
}
.bseg_f_version > .bseg_s > .bseg_select {
    height: 30px;
}
.bseg_f_checkout > .bseg_s > .bseg_select {
    height: 30px;
}
.bseg_f_mall > .bseg_s > .bseg_select {
    height: 30px;
}
.bseg_f_error > .bseg_s > .bseg_select {
    height: 30px;
}
.bseg_f_face > .bseg_s > .bseg_select {
    height: 30px;
}
.bseg_f_wenzhang > .bseg_s > .bseg_select {
    display: inline-block;
    height: 30px;
}
.bseg_f_notlogin > .bseg_s > .bseg_select {
    display: inline-block;
    height: 30px;
}
.bseg_f_sx > .bseg_s > .bseg_select {
    display: inline-block;
    height: 30px;
}
.bseg_f_center > .bseg_s > .bseg_select {
    width: 100px;
    height: 30px;
}
.bseg_f_home > .bseg_s > .bseg_scont {
    width: 264px;
    height: 24px;
}
.bseg_f_init > .bseg_s > .bseg_scont {
    width: 202px;
    height: 24px;
}
.bseg_f_download > .bseg_s > .bseg_scont {
    width: 234px;
    height: 24px;
}
.bseg_f_version > .bseg_s > .bseg_scont {
    width: 234px;
    height: 24px;
}
.bseg_f_checkout > .bseg_s > .bseg_scont {
    width: 234px;
    height: 24px;
}
.bseg_f_mall > .bseg_s > .bseg_scont {
    padding: 4px 2px;
    width: 215px;
    height: 20px;
    border-left: 1px solid #000;
}
.bseg_f_center > .bseg_s > .bseg_scont {
    width: 176px;
    height: 24px;
}
.bseg_f_error > .bseg_s > .bseg_scont {
    width: 255px;
    height: 24px;
}
.bseg_f_wenzhang > .bseg_s > .bseg_scont {
    width: 264px;
    height: 24px;
}
.bseg_f_notlogin > .bseg_s > .bseg_scont {
    width: 214px;
    height: 24px;
}
.bseg_f_sx > .bseg_s > .bseg_scont {
    width: 214px;
    height: 24px;
}
.bseg_f_face > .bseg_s > .bseg_scont {
    width: 264px;
    height: 24px;
}
.bseg_f_init > .bseg_s > .bseg_btn {
    width: 42px;
}
.bseg_f_checkout > .bseg_s > .bseg_btn {
    height: 31px;
    line-height: 31px;
}
.bseg_f_mall > .bseg_s > .bseg_btn {
    height: 30px;
    line-height: 4px;
    font-size: 15px;
}
.bseg_f_center > .bseg_s > .bseg_btn {
    font-size: 15px;
}
.father_center > .bseg_s > .bseg_btn {
    height: 30px;
    line-height: 30px;
}
.father_error > .bseg_s > .bseg_btn {
    height: 30px;
    line-height: 30px;
}
.bseg_verify_input {
    padding-bottom: 20px;
}
.bseg_tce {
    padding: 0 8px!important;
}
.bseg_header_content {
    width: 1140px;
}
.bseg_nav_button {
    margin: 0 5px!important;
}
.bseg_first_nav_button_sub {
    margin-left: 250px;
}
.bseg_b_no_ln {
    margin-right: 4px!important;
}
.bseg_a_alert_c {
    color: #008000;
    font-size: 15px;
}
.bseg_n_alert_c {
    color: #f00;
    font-size: 18px;
}
.bseg_a_blank {
    color: green!important;
    text-decoration: underline!important;
}
.bseg_lookout {
    color: #f00;
}
.bseg_gg {
    background-color: red;
    color: #fff;
}
.bseg_alipay {
    color: #2790D6;
}
.bseg_YuebaoT {
    color: #EB0A0A;
}
.bseg_Jdjr {
    color: #FD3414;
}
.bseg_Wechat {
    color: #7CAA0D;
}
.bseg_BaiduPan {
    color: #2F73EF;
}
.bseg_Ttqw {
    color: #FA394E;
}
.bseg_Txw {
    color: #FF4424;
}
.bseg_Dzkd {
    color: #C70000;
}
.bseg_Yt {
    color: #EA100F;
}
.bseg_Yztm {
    color: #EE4C40;
}
.bseg_Tfb {
    color: #FE5100;
}
.bseg_Lq {
    color: #00B7A8;
}
.bseg_Htt {
    color: #FE3D44;
}
.bseg_Xtt {
    color: #FE0000;
}
.bseg_Wlkk {
    color: #FF120D;
}
.bseg_yqm {
    background-color: #950AD3;
    color: #fff;
}
.bseg_Mytt {
    color: #E83425;
}
.bseg_Dftt {
    color: #F90000;
}
.bseg_4399 {
    color: #067707;
}
.bseg_Zh {
    color: #0F88EB;
}
.bseg_option{
	text-align: center;
    text-align-last: center;
	background-color: #FFF;
}
.bseg_option_1{
	font-weight: bold;
}
.bseg_option_2{
	color: #F00;
}
.bseg_option_3{
	color: #E38600;
}
.bseg_option_4{
	color: #29C90A;
}
.bseg_option_5{
	color: #00C4D3;
}
.bseg_option_6{
	color: #3931FF;
}
.bseg_option_9{
	color: #A0A70F;
}
.bseg_option_7{
	color: #ABC;
}
.bseg_option_8{
	color: #8E059D;
}
.bseg_zczz {
	margin: 0 auto;
	width: 114px;
	height: 30px;
	border-radius: 5px;
	background-color: #fb1d1d;
	color: white;
	text-align: center;
	text-indent: 0;
	font-size: 18px;
	line-height: 30px;
}
`);
}
