// ==UserScript==
// @name         百度网盘与阿里网盘资源_搜索引擎_聚合
// @version      3.79
// @description  在百度云盘与阿里云盘页面中新增网盘资源_搜索引擎_(争取一网打尽)
// @match        *://pan.baidu.com/*
// @match        *://yun.baidu.com/*
// @match        *://wangpan.baidu.com/*
// @match        *://duanxin.baidu.com/*
// @match        *://note.baidu.com/*
// @match        *://tonghuajilu.baidu.com/*
// @match        *://tongxunlu.baidu.com/*
// @match        *://wenzhang.baidu.com/*
// @match        *://zhaohui.baidu.com/*
// @match        *://photo.baidu.com/*
// @match        *://www.aliyundrive.com/*
// @grant        来自各个网盘资源搜索引擎开发者
// @author       太史子义慈
// @namespace    qs93313@sina.cn
// ==/UserScript==

!(function() {
	//处理css
	bsegCss();

	//处理dom
	bseg(0);

	return;
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
		
		//新主页 https://pan.baidu.com/disk/main#/index?category=all
		var find_main = (document.querySelector(".wp-disk-header") !== null);

		//阿里主页 https://www.aliyundrive.com/drive

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

		//阿里下载页 https://www.aliyundrive.com/

		//失效邀请
		var find_sx = (document.querySelector(".share-invite-box") !== null);

		//人脸搜索（https://pan.baidu.com/disk/facesearch）
		var find_face = (document.querySelector(".face-search-body") !== null);
		
		//一刻相册 https://photo.baidu.com/
		var find_ykp = (document.querySelector(".yk-header") !== null);
		
		
		
		
		
		//综合
		var find_or = (find_home || find_main || find_init || find_download || find_version || find_checkout || find_mall || find_center || find_error || find_wenzhang || find_notlogin || find_sx || find_face|| find_ykp);

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
								//if(i == 2) {
									//cMEMEFi.classList.add('bseg_none');
								//}
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
				} else if(find_main) {
					//新主页
					var father_face = document.getElementsByClassName('wp-disk-header__left')[0];
					if(father_face) {
						father_face.classList.add('bseg_f_main');
						//新建span子节点
						father_face.appendChild(new_span);
						new_input.focus();
					}
				}else if(find_init) {
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
				} else if(find_ykp) {
					//一刻相册
					var father_face = document.getElementsByClassName('yk-header__left')[0];
					if(father_face) {
						father_face.classList.add('bseg_f_ykp');
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
		['https://www.zhihu.com/question/36935371/answer/547905809', '知乎'],
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
	te += '<b class="bseg_lookout">注意：该脚本可能会频繁更新。</b>由于这是脚本，数据并非存在某服务器的数据库里，而是直接写死在脚本里，数据更新即脚本更新。这些百度网盘搜索引擎网站的规则数据是会发生改变的，开发者会注意网站的规则变化并更新脚本。';
	te += '</p><br><p>';
	te += '<b class="bseg_lookout">注意！这些搜索网页上难免有广告，推荐使用<a href="https://www.adtchrome.com/help/index.html" target=_blank" class="bseg_a_blank">广告终结者</a>等扩展屏蔽广告。</b>';
	te += '</p><br><p>';
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
		["https://www.yubaipan.com/", "玉白盘", [
			["", "https://www.yubaipan.com/#/main/search?keyword=%sv%", "bseg_option_1", ],
		], ],
		["https://www.dashengpan.com/", "大圣盘", [
			["", "https://www.dashengpan.com/search?keyword=%sv%", "bseg_option_1", ],
		], ],
		["https://www.feifeipan.com/", "飞飞盘", [
			["", "https://www.feifeipan.com/search?keyword=%sv%", "bseg_option_1", ],
		], ],
		["https://www.baimapan.com/", "白马盘", [
			["", "https://www.baimapan.com//search?keyword=%sv%", "bseg_option_1", ],
		], ],
		["https://www.feizhupan.com/", "飞猪盘", [
			["", "https://www.feizhupan.com/search?keyword=%sv%", "bseg_option_1", ],
		], ],
		["https://www.luomapan.com/", "罗马盘", [
			["", "https://www.luomapan.com/search?keyword=%sv%", "bseg_option_1", ],
		], ],
		["https://www.xiaomapan.com/", "小马盘", [
			["", "https://www.xiaomapan.com/search?keyword=%sv%", "bseg_option_1", ],
		], ],
		["https://www.iizhi.cn/", "毕方铺", [
			["", "https://www.iizhi.cn/resource/search/%sv%", "bseg_option_1", ],
		], ],
		["https://dalipan.com/", "大力盘", [
			["", "https://www.dalipan.com/search?keyword=%sv%", "bseg_option_1", ],
		], ],
		["https://www.panother.com/", "盘他", [
			["", "https://www.panother.com/search?query=%sv%", "bseg_option_1", ],
		], ],
		["https://www.xiaozhukuaipan.com/", "小猪块盘", [
			["", "https://www.xiaozhukuaipan.com/s/search?q=%sv%", "bseg_option_1", ],
		], ],
		["https://ujuso.com/", "优聚搜", [
			["", "https://ujuso.com/#/main?kw=%sv%", "bseg_option_4", ],
		], ],
		["https://www.alipanso.com", "阿里盘搜", [
			["", "https://www.alipanso.com/search.html?page=1&keyword=%sv%", "bseg_option_4", ],
		], ],
		["http://www.panmeme.com/", "盘么么", [
			["", "http://www.panmeme.com/query?key=%sv%", "bseg_option_2", ],
		], ],
		["http://www.xiaobaipan.com/", "小白盘", [
			["", "http://www.xiaobaipan.com/list-%sv%.html", "bseg_option_2", ],
		], ],
		["http://www.kengso.com/", "坑搜网", [
			["", "http://www.kengso.com/s?wd=%sv%", "bseg_option_2", ],
		], ],
		["http://www.repanso.com", "热盘搜", [
			["", "http://www.repanso.com/q?wd=%sv%", "bseg_option_2", ],
		], ],
		["https://www.haogow.com/", "好去网", [
			["", "https://www.haogow.com/search?keyword=%sv%", "bseg_option_2", ],
		], ],
		["http://www.vpansou.com/", "V盘搜", [
			["", "http://www.vpansou.com/query?wd=%sv%", "bseg_option_2", ],
		], ],
		["http://aizhaomu.com/", "创业招", [
			["", "http://aizhaomu.com/search/kw%sv%", "bseg_option_2", ],
		], ],
		["http://www.sodu123.com/", "搜度", [
			["", "http://www.sodu123.com/sodu/so.php?q=%sv%", "bseg_option_2", ],
		], ],
		//以下的更新慢
		["http://www.pansou.com/", "盘搜", [
			["", "http://www.pansou.com/?q=%sv%", "bseg_option_3", ],
		], ],
		["https://www.fastsoso.cn/", "fastsoso", [
			["", "https://www.fastsoso.cn/search?k=%sv%", "bseg_option_3", ],
		], ],
		["http://www.51sopan.cn/", "51搜盘", [
			["", "http://www.51sopan.cn/s?wd=%sv%", "bseg_option_3", ],
		], ],
		["http://www.baiduyunsousou.com/", "两鸟仪", [
			["", "http://www.baiduyunsousou.com/search?kw=%sv%", "bseg_option_3", ],
		], ],
		["http://www.vpanso.com/", "微盘搜", [
			["", "http://www.vpanso.com/s?wd=%sv%", "bseg_option_3", ],
		], ],
		["https://www.xxhh360.com/", "云搜大师", [
			["", "https://www.xxhh360.com/search?q=%sv%", "bseg_option_3", ],
		], ],
		["http://www.jisoupan.com/", "及搜盘", [
			["", "http://www.jisoupan.com/search/%sv%.html", "bseg_option_3", ],
		], ],
		["https://www.sosuopan.cn/", "搜索盘", [
			["", "https://www.sosuopan.cn/search?q=%sv%", "bseg_option_3", ],
		], ],
		["http://www.yunpz.net/wangpan.html", "云铺子", [
			["", "http://www.yunpz.net/wangpan.html", "bseg_option_3", ],
		], ],
		["https://www.pandada.net/", "盘大大", [
			["", "https://www.pandada.net/", "bseg_option_3", ],
		], ],
		["http://chawangpan.com/", "盘搜大师", [
			["", "http://chawangpan.com/paymentList.html?field=%sv%", "bseg_option_3", ],
		], ],
		["http://www.qiaomi.cn/", "巧迷网", [
			["", "http://www.qiaomi.cn/", "bseg_option_3", ],
		], ],
		//以下是搜书的
		["http://ibooks.org.cn/", "读书小站", [
			["", "http://ibooks.org.cn/?s=下载 %sv%", "bseg_option_9", ],
		], ],
		["https://sobooks.cc/", "sobooks", [
			["", "https://sobooks.cc/search/%sv%", "bseg_option_9", ],
		], ],
		["https://www.xssousou.com/", "小说搜搜", [
			["", "https://www.xssousou.com/s/%sv%.html://neikuw.com/?s=%sv%", "bseg_option_9", ],
		], ],
		["https://www.junengfan.cn/bd", "点点文档", [
			["", "https://www.junengfan.cn/c/%sv%", "bseg_option_9", ],
		], ],
		//以下不是专门的搜索引擎
		["https://www.baidu.com/s?wd=(pan|yun).baidu.com&ct=1", "百度搜索", [
			["", "https://www.baidu.com/s?wd=%sv%%20(pan|yun).baidu.com&ct=1", "bseg_option_5", ],
		], ],
		["https://www.google.com.hk/search?q=pan%20or%20yun%20.baidu.com", "谷歌搜索", [
			["", "https://www.google.com.hk/search?q=%sv%%20pan%20or%20yun%20.baidu.com", "bseg_option_5", ],
		], ],
		["https://www.sogou.com/web?ie=utf8&query=pan.baidu.com", "搜狗搜索", [
			["", "https://www.sogou.com/web?ie=utf8&query=%sv%%20pan.baidu.com", "bseg_option_5", ],
		], ],
		["https://so.toutiao.com/search?keyword=pan.baidu.com", "头条搜索", [
			["", "https://so.toutiao.com/search?keyword=%sv%%20pan.baidu.com", "bseg_option_5", ],
		], ],
		["https://www.so.com/s?q=pan.baidu.com", "360好搜", [
			["", "https://www.so.com/s?q=%sv%%20pan.baidu.com", "bseg_option_5", ],
		], ],
		["https://cn.bing.com/search?q=pan.baidu.com", "必应搜索", [
			["", "https://cn.bing.com/search?q=%sv%%20pan.baidu.com", "bseg_option_5", ],
		], ],
		["https://m.sm.cn/s?q=pan.baidu.com", "神马搜索", [
			["", "https://m.sm.cn/s?q=%sv%%20pan.baidu.com", "bseg_option_5", ],
		], ],
		["http://www.chinaso.com/search/pagesearch.htm?q=pan.baidu.com", "中国搜索", [
			["", "http://www.chinaso.com/search/pagesearch.htm?q=%sv%%20pan.baidu.com", "bseg_option_5", ],
		], ],
		["https://magi.com/search?q=pan.baidu.com", "Magi搜索", [
			["", "https://magi.com/search?q=%sv%%20pan.baidu.com", "bseg_option_5", ],
		], ],
		["http://www.sousuobd.com/?q=pan.baidu.com", "必达搜索", [
			["", "http://www.sousuobd.com/?q=%sv%%20pan.baidu.com", "bseg_option_5", ],
		], ],
		["https://mijisou.com/?language=zh-CN&q=pan.baidu.com", "秘迹搜索", [
			["", "https://mijisou.com/?language=zh-CN&q=%sv%%20pan.baidu.com", "bseg_option_5", ],
		], ],
		["https://www.damingweb.com/pan.baidu.com.html", "大明网", [
			["", "https://www.damingweb.com/%sv%%20pan.baidu.com.html", "bseg_option_5", ],
		], ],
		["http://www.dgso.cn/k/pan.baidu.com", "稻搜", [
			["", "http://www.dgso.cn/k/%sv%%20pan.baidu.com", "bseg_option_5", ],
		], ],
		["https://www.ecosia.org/search?q=pan.baidu.com", "ecosia", [
			["", "https://www.ecosia.org/search?q=%sv%%20pan.baidu.com", "bseg_option_5", ],
		], ],
		["https://duckduckgo.com/?q=pan.baidu.com&ia=web", "duck*2go", [
			["", "https://duckduckgo.com/?q=%sv%+pan.baidu.com&ia=web", "bseg_option_5", ],
		], ],
		["https://www.webcrawler.com/serp?q=pan.baidu.com", "crawler", [
			["", "https://www.webcrawler.com/serp?q=%sv%%20pan.baidu.com", "bseg_option_5", ],
		], ],
		["https://swisscows.ch/web?query=pan.baidu.com&region=zh-CN", "swisscows", [
			["", "https://swisscows.ch/web?query=%sv%%20pan.baidu.com&region=zh-CN", "bseg_option_5", ],
		], ],
		["https://suche.web.de/web/result?q=pan.baidu.com", "web.de", [
			["", "https://suche.web.de/web/result?q=%sv%%20pan.baidu.com", "bseg_option_5", ],
		], ],
		["https://wangpan.renrensousuo.com/", "众人搜网盘", [
			["", "https://wangpan.renrensousuo.com/jieguo?sa=网盘搜索&q=%sv%", "bseg_option_5", ],
		], ],
		//以下的要收费
		["https://www.laisoyixia.com/", "去转盘", [
			["", "https://www.laisoyixia.com/s/search?q=%sv%", "bseg_option_6", ],
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
		//以下是其他网盘
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
	//支付宝
	var qrAlipay = "data:image/png;base64,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";
	//微信
	var qrWechat = "data:image/png;base64,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";
	//qq
	var qrQQ = "data:image/png;base64,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";
	
	var qrAllArr = [
		//支付宝
		[qrAlipay, "<span class='bseg_alipay'>支付宝</span>扫一扫<br>捐助支持"],
		//微信
		[qrWechat, "<span class='bseg_Wechat'>微信</span>扫一扫<br>捐助支持"],
		//QQ
		[qrQQ, "QQ扫一扫<br>捐助支持"],
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
	bsegAddCss(`.bseg_none {
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
.bseg_s {
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
	background-color: #FFF;
	color: #000;
	text-align: right;
	font-size: 10px;
	line-height: 27px;
}
.bseg_close {
	width: 22px;
	height: 22px;
	border-radius: 11px;
	background-color: #B4E3FF;
	color: #f00;
	font-family: 'Microsoft YaHei', arial, SimSun, 宋体!important;
	line-height: normal;
}
.bseg_select {
	width: 104px;
	outline: 0;
	border: 1px solid #A9A9A9;
	border-radius: 0;
	background-color: #fff;
	color: #000;
	font-size: 15px;
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
	border-radius: 0;
	background-color: #fff;
	color: #000;
	font-size: 15px;
	font-family: 'Microsoft YaHei', arial, SimSun, 宋体;
	cursor: text;
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
	line-height: 29px;
	border: 1px solid #A9A9A9;
	border-radius: 0;
	color: #fff;
	font-size: 14px;
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
	background-color: #FFF;
	color: #000;
	font-size: 10px;
	line-height: 27px;
}
.bseg_qr_all {
	position: absolute;
	top: 62px;
	right: 14px;
	z-index: 999;
	width: 612px;
	height: 285px;
	border: 1px solid #d3d3d3;
	border-radius: 7px;
	background-color: #fff;
	line-height: normal;
}
.bseg_qr_title {
	padding: 5px;
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
.bseg_f_main {
	margin-left: 20px!important;
}
.bseg_f_mall {
	left: 200px;
}
.bseg_f_home > .bseg_s {
	margin: 0 0 0 10px;
}
.bseg_f_main > .bseg_s {
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
.bseg_f_ykp > .bseg_s {
	display: inline-block;
	margin: 10px 0 0 10px;
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
.bseg_f_main > .bseg_s > .bseg_select {
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
.bseg_f_ykp > .bseg_s > .bseg_select {
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
.bseg_f_main > .bseg_s > .bseg_scont {
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
.bseg_f_ykp > .bseg_s > .bseg_scont {
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
	font-size: 15px;
	line-height: 4px;
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
.bseg_option {
	background-color: #FFF;
	text-align: center;
	text-align-last: center;
}
.bseg_option_1 {
	color: #9B0A0F;
	font-weight: bold;
	background-color:#d8fbd0;
}
.bseg_option_2 {
	color: #F00;
}
.bseg_option_3 {
	color: #E38600;
}
.bseg_option_4 {
	color: #29C90A;
}
.bseg_option_5 {
	color: #00C4D3;
}
.bseg_option_6 {
	color: #3931FF;
}
.bseg_option_9 {
	color: #A0A70F;
}
.bseg_option_7 {
	color: #ABC;
}
.bseg_option_8 {
	color: #dfc5f7;
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
