/* ==========================================================
 * constructor of test-forms
 * date: 14.09.2018
 * author: snikos
 * last update: --.--.----
 * web: http://
 * email: snikos@yandex.ru
 * Free to use under the MIT license.
 * ========================================================== */
(function($){
	//"use strict";
	$.fn.buildTest = function (opts) {
		var defs = {
			localObject: {},
			inputStyle: 'styled-input-a',
			radioStyle: '',//'checkbox-a',
			currentObj : 'test0',
			tplLoad: '<span class="loading"></span>?',
			tplHonour: '<div class="box_honor_min"><div class="planka"></div><div class="lenta_block"></div><div class="lenta_block_back"></div><div class="revers_block"><div class="coin_back2"></div><div class="coin_back"></div><div class="coin20"><div class="coin_inner"></div><div class="coin_sub"></div><div class="coin_text"><span>1</span></div><!--div class="block_ruby"><span class="top"></span><span class="pot"></span></div--></div></div></div>',
		};
		
		var sets = $.extend({}, defs, opts);
		
		return this.each(function () {
			var $wd = $(this);
			var arrayTotal = [];
			var arrayCurrent = [];
			var won = '';
			
			var widget = {
				init: function(){
					widget.hellLocalObject("test", 17);
					widget.counter();
					widget.testStarter( (sets.localObject)[sets.currentObj] );
					widget.events.loadTest();
					widget.events.radioIndependent();
					widget.events.testResult();
					widget.events.toggleNav('.navMenuBox');
					widget.loadNavy('.ultrachoc');
					
					
					/*test crc*/
					//console.log( this.crc( 'Kevin van Zonneveld' ));
					/*test chr*/
					//for(var i=100; i<200; i++){ console.log(i, ' : ', this.chr(i)) }
					/*test scrumbler*/
					//console.log( this.scrumbler("7765726520796f75", "num") );
					//console.log( this.scrumbler('626f6f6b20626173696e', 'str') );
					/*test pad*/
					//console.log( this.pad('superstr', ('superstr'.length*2), 0x1, 3) );
				},
				/*shuffleArray: function(array) {
					//for ES6-ECMAS2015
					for (let i = array.length - 1; i > 0; i--) {
						const j = Math.floor(Math.random() * (i + 1));
						[array[i], array[j]] = [array[j], array[i]]; // eslint-disable-line no-param-reassign
					}
				},*/
				shuffleArray: function(array) {
					for (var i = array.length - 1; i > 0; i--) {
						var j = Math.floor(Math.random() * (i + 1));
						var temp = array[i];
						array[i] = array[j];
						array[j] = temp;
					}
					return array;
				},
				shuffleArraySort: function(array){
					/*return array.sort(() => Math.random() - 0.5);*/
					return array.sort(function() {
						.5 - Math.random();
					});
				},
				chr: function(ascii){
					return String.fromCharCode(ascii);
				},
				pad: function(str, len, pad, dir){
					/*** Javascript string pad http://www.webtoolkit.info/ ***/
					var STR_PAD_LEFT = 1;
					var STR_PAD_RIGHT = 2;
					var STR_PAD_BOTH = 3;
					if (typeof(len) == "undefined") { var len = 0; }
					if (typeof(pad) == "undefined") { var pad = ' '; }
					if (typeof(dir) == "undefined") { var dir = STR_PAD_RIGHT; }
					if (len + 1 >= str.length) {
						switch (dir){
							case STR_PAD_LEFT:
								str = Array(len + 1 - str.length).join(pad) + str;
							break;
							case STR_PAD_BOTH:
								var padlen = len - str.length;
								var right = Math.ceil((padlen) / 2);
								var left = padlen - right;
								str = Array(left+1).join(pad) + str + Array(right+1).join(pad);
							break;
							default:
								str = str + Array(len + 1 - str.length).join(pad);
							break;
						}
					}
					return str;
				},
				crc: function(str){
					var makeCRCTable = function(){
						var c;
						var crcTable = [];
						for(var n =0; n < 256; n++){
							c = n;
							for(var k =0; k < 8; k++){
								c = ((c&1) ? (0xEDB88320 ^ (c >>> 1)) : (c >>> 1));
							}
							crcTable[n] = c;
						}
						return crcTable;
					};

					var crc32 = function(str) {
						var crcTable = window.crcTable || (window.crcTable = makeCRCTable());
						var crc = 0 ^ (-1);

						for (var i = 0; i < str.length; i++ ) {
							crc = (crc >>> 8) ^ crcTable[(crc ^ str.charCodeAt(i)) & 0xFF];
						}

						return (crc ^ (-1)) >>> 0;
					};
					
					return crc32(str);
				},
				scrumbler: function(str, choc){
					var bin2hex = function(bin){// UTF-8 string -> ASCII hex
					  var hex = '';
					  for(var i = 0; i<bin.length; i++){
						var c = bin.charCodeAt(i);
						if (c>0xFF) c -= 0x350;// UTF-8 -> ASCII
						hex += c.toString(16);
					  }
					  return hex;
					};

					var hex2bin = function(hex) {// ASCII hex-> UTF-8 string
					  var bin = '';
					  for (var i=0; i<hex.length; i=i+2) {
						var c = parseInt(''+hex[i]+hex[i+1], 16);
						if (c>0x7F) c += 0x350;// ASCII -> UTF-8
						bin += String.fromCharCode(c);
					  }
					  return bin;
					};
					
					switch(choc){
						case'num': return bin2hex(str);break;
						case'str': return hex2bin(str);break;
						default: return bin2hex(str);break;
					}
				},
				alphabet: function(first, last) {
					var a = first.charCodeAt(0);
					var b = last.charCodeAt(0) + 1;
					return Array.apply(null, {length: Math.abs(b - a)}).map(function (x,i) { return String.fromCharCode(Math.min(a, b) + i) });
				},
				setData: function(a,b,c){
					return $.data(a,b,c)//$.data(widget.supObj, 'yoda', 'values'),//el,key,[val]
				},
				getData: function(a,b){
					return $.data(a,b)//$.data(widget.supObj, 'yoda'),//el,key,[val]
				},
				//wd: $(document).find('.widBox'),
				hellLocalObject: function(key, count){
					var keys = key;
					for( var c=0; c<=count; c++){
						if( Object.keys(sets.localObject)['length'] >= count-1 ) return;
						var g = key+c;
						sets.localObject[g] = eval( g );
					}
					return sets.localObject;
				},
				allJson: function(){
					return Object.keys(sets.localObject)["length"];
				},
				counter: function(){
					var o = Object.keys(sets.localObject), total=0;
					$.each(o, function(idx, el){
						total += (sets.localObject)[el]['length'];
					});
					//console.log( 'total: ', total );
					return total;
				},
				clearAll: function(){
					arrayTotal = [];
					arrayCurrent = [];
					$wd.find('.testBoxDescH2').empty();
					$wd.find('.testBoxDescP').empty();
					$wd.find('.testBoxList').empty();
				},
				testStarter: function(obj){
					widget.clearAll();
					widget.addListTest(obj);
					widget.addNameTest(obj);
				},
				buildTag: function(tg, attrObject){
					var tg = $("<"+tg+"/>", attrObject);
					return tg;
				},
				addListTest: function(nameList){
					$.each(nameList, function(i,o){
						var repaExec = (o['question']).replace('___', '<dfn class="exec false">...</dfn>');
						var notes = (o['note'] !== undefined) ? widget.buildTag("header", {
							"class": "testBoxListUnitHeader",
							"text": o['note'],
						}) : "";
						var count = widget.buildTag("span", {
							"class": "testBoxListUnitCount",
							"text": (i+1) + ".",
						});
						var questos = widget.buildTag("legend", {
							"class": "testBoxListUnitLegend",
							"html": repaExec,
						});
						questos.prepend(count);
						
						var trustos = (o.answers).toString().split('|');
						//just test by functions shuffle
						var sh2 = widget.shuffleArraySort(trustos);
						//console.log('suffle2: ', sh2);
						
						widget.shuffleArray(trustos);
						var ra = widget.scrumbler(o.ghost, 'str');
						
						var wrapin = widget.buildTag('div', {"class":"wrap"});//'';
						//var class3 = sets.inputStyle;

						$.each(trustos, function(idx,v){
							var rs = null;
							if( sets.radioStyle.length === 0 ){
								var aph = 'abcdefghijklmnopqrstuvwx';
								var ran = Math.round( Math.random()*(aph.length-1) );
								rs = 'checkbox-'+(aph[ran]);
							} else {
								rs = sets.radioStyle;
							}
							var radios = widget.buildTag("div", {
								"class": "styled-input-single "+(sets.inputStyle),
								"data-index": idx,
							});
							
							var inputT = widget.buildTag("input", {
								"type": "radio",
								"name": "ar"+''+i,
								"id": "input"+idx+''+i,
								//"class": sets.radioStyle,
								"class": rs,
								"value": v,
							});
							radios.prepend( inputT );

							var choc = widget.buildTag("span", {
								"class": "choc",
							});

							var labelT = widget.buildTag("label", {"class": "testBoxListBrick","for": "input"+idx+''+i,"text": v});
							labelT.append( choc );
							radios.append( labelT );
							wrapin.append( radios );
						});
						
						var repaExecAnw = (o.question).replace('___', '<dfn class="exec truly">'+(ra)+'</dfn>');
						
						var everyAnswer = '<p>'+(i+1)+'. '+(repaExecAnw)+'</p>';

						var btnTO = widget.buildTag("button", {
							"class": "testBoxResBtn",
							"type": "submit",
							"text": "Result",
						});

						var boldTO = widget.buildTag("b", {
							"class": "testBoxResText",
							"text": "Status task",
						});

						var sub = widget.buildTag("fieldset", {
							"class": "testBoxRes",
						});
						sub.prepend(btnTO).append(boldTO);
						
						var every = widget.buildTag("fieldset", {
							"class": "testBoxListUnit",
							"title": "title",
						});
						every.prepend( questos ).append( wrapin );
						$(every).data({
							'data-ghost': ra,
							'data-truly': everyAnswer,
						}).appendTo( $wd.find('.testBoxList') );
						
						arrayTotal.push( ra );
						if( i === nameList.length-1 ) $(sub).appendTo( $wd.find('.testBoxList') );
					});
					/*Clear Honor Container*/
					$wd.find('.mohWin').empty();
				},
				addNameTest: function(nameList){
					var res = nameList;
					if( res[0]['nameTest'] !== undefined ) $wd.find('.testBoxDescH2').text(res[0].nameTest);
					if( res[0]['descTest'] !== undefined ) $wd.find('.testBoxDescP').text(res[0].descTest);
				},
				loadNavy: function(a){
					var tpl = '';
					var strike = widget.allJson();
					var arr = Object.keys(sets.localObject);
					var cur = +(sets.currentObj.replace(/\D+/,''));
					for( var t=0; t<strike; t++ ){
						tpl += '<li><button type="button" name="test'+t+'" class="navTestBoxLink '+((cur===t)?'navTestBoxLinkCur':'')+'">Load '+t+' - test: '+(sets.localObject[arr[t]][0]['nameTest'])+'</button></li>';
						//console.log( 'strike: ', (sets.localObject[arr[t]][0]['nameTest']) );
					}
					//$('.navTestBox ul').append(tpl);
					$wd.find('.navTestBoxList').append(tpl);
				},
				winner: function(box,cls,num){
					var tpl = $(sets.tplHonour);
					$(box).html( tpl );
					$(box).find('.box_honor_min').addClass(cls);
					$(box).find('.coin_text span').text(num);
				},
				events: {
					loadTest: function(){
						$wd.on('click', '.navTestBoxLink', function(event){
							var nameList = $(this).prop('name');
							sets.currentObj = nameList;
							widget.testStarter( (sets.localObject)[nameList] );
							//$wd.find('.navMenuBoxToggle').removeClass('navMenuBoxToggleOpen');
							$wd.find('.navTestBoxLink').each( function(i,el){
								$(el).removeClass('navTestBoxLinkCur');
							});
							$(this).addClass('navTestBoxLinkCur');
							event.stopPropagation();
							event.preventDefault();
						});
					},
					radioIndependent: function(){
						$wd.find('.testBoxList').on('click', ':radio', function(ev){
							ev.stopPropagation();
							//ev.preventDefault();
							var $that = $(this);
							var $exec = $that.closest('fieldset');

							arrayCurrent[$exec.index()] = $that.val();

							if( $that.is(':radio:checked') ) { 
								$exec.find('.exec').text( $that.val() ) }
							else {
								$exec.find('.exec').text( sets.tplLoad )
							}
						});
					},
					testResult: function(){
						$wd.on('click', '.testBoxResBtn', function(event){
							event.stopPropagation();
							event.preventDefault();
							var colorful = ['gold','silver','bronze'];
							var $that = $(this);
							var res = (sets.localObject)[ sets.currentObj ];
							var cur = arrayCurrent;
							var tot = arrayTotal;
							var cherad = $('.testBoxList :radio').filter(':checked').length;

							//console.log('%: ', cherad, tot.length, cherad === tot.length);
							if( cherad === tot.length ){
								var msg = '-';
								var msg_sum = function(a,b){
									var counter = 0;
									var percent = 0;
									for( var r=0; r<b.length; r++ ){
										(a[r]==b[r]) ? counter++ : counter;
									}
									var procent = Math.floor(counter/b.length*100);
									won = procent;
									return 'You answered correctly to: <b>'+counter+'</b> from <b>'+ b.length+'</b> questions. Your level of education: <b>'+(procent)+'%</b>. In the top this page, you can look at the Medal for you.';
								};
								$wd.find('.testBoxListUnit').each( function(i,el){
									//console.log( 'tot[i] & cur[i]: ', tot[i], cur[i] );
									($(el).find('legend .false').text()).replace(cur[i], function(str){
										return (tot[i] != cur[i]) ? $(el).find('legend .false').html('<del>'+str+'</del>') : $(el).find('legend .false').text(str);
									});
									$(el).find('.styled-input-single').each(function(idx,elem){
										//console.log('f:', tot[i] === $(elem).find('input:checked').val() );
										(tot[i] == $(elem).find('input:checked').val()) ? $(elem).addClass('truth') : (cur[i] == $(elem).find('input:checked').val()) ? $(elem).addClass('lie') : '';
									});
									$(el).find('legend').prepend( $(el).data('data-truly') );
									$(el).find('input').prop('disabled', true);
									($(el).is('header')) ? $(el).find('header').addClass('testBoxListUnitHeaderOpen') : '';
								});
								$that.prop('disabled', true).html( msg ).next('.testBoxResText').html( msg_sum(cur, tot) );

								var demo = (won >= 77) ? 0 : (won <= 33) ? 2 : 1;
								widget.winner($wd.find('.mohWin'), colorful[demo], (demo+1));
							} else {
								var msg = 'check answers';
								$wd.find('.testBoxResText').html( msg );
							}
						});
					},
					toggleNav: function(a){
						$wd.on('click', a, function(e){
							var thatClass = a.replace('.','');
							$(this).find("."+thatClass+"Toggle").toggleClass(thatClass+"ToggleOpen");
							$wd.find('.navTestBoxList').toggleClass('navTestBoxListOpen');
							return false;
						});
					},
				},
	        };
		    widget.init();
	    });
	}
})(jQuery);