var _gsScope="undefined"!=typeof module&&module.exports&&"undefined"!=typeof global?global:this||window;(_gsScope._gsQueue||(_gsScope._gsQueue=[])).push(function(){"use strict";var p,_colorStringFilter,_numExp=/(\d|\.)+/g,_relNumExp=/(?:\d|\-\d|\.\d|\-\.\d|\+=\d|\-=\d|\+=.\d|\-=\.\d)+/g,_colorLookup={aqua:[0,255,255],lime:[0,255,0],silver:[192,192,192],black:[0,0,0],maroon:[128,0,0],teal:[0,128,128],blue:[0,0,255],navy:[0,0,128],white:[255,255,255],fuchsia:[255,0,255],olive:[128,128,0],yellow:[255,255,0],orange:[255,165,0],gray:[128,128,128],purple:[128,0,128],green:[0,128,0],red:[255,0,0],pink:[255,192,203],cyan:[0,255,255],transparent:[255,255,255,0]},_hue=function(h,m1,m2){return h=0>h?h+1:h>1?h-1:h,255*(1>6*h?m1+(m2-m1)*h*6:.5>h?m2:2>3*h?m1+(m2-m1)*(2/3-h)*6:m1)+.5|0},_parseColor=function(v,toHSL){var a,r,g,b,h,s,l,max,min,d,wasHSL;if(v)if("number"==typeof v)a=[v>>16,v>>8&255,255&v];else{if(","===v.charAt(v.length-1)&&(v=v.substr(0,v.length-1)),_colorLookup[v])a=_colorLookup[v];else if("#"===v.charAt(0))4===v.length&&(r=v.charAt(1),g=v.charAt(2),b=v.charAt(3),v="#"+r+r+g+g+b+b),v=parseInt(v.substr(1),16),a=[v>>16,v>>8&255,255&v];else if("hsl"===v.substr(0,3))if(a=wasHSL=v.match(_numExp),toHSL){if(-1!==v.indexOf("="))return v.match(_relNumExp)}else h=Number(a[0])%360/360,s=Number(a[1])/100,l=Number(a[2])/100,g=.5>=l?l*(s+1):l+s-l*s,r=2*l-g,a.length>3&&(a[3]=Number(v[3])),a[0]=_hue(h+1/3,r,g),a[1]=_hue(h,r,g),a[2]=_hue(h-1/3,r,g);else a=v.match(_numExp)||_colorLookup.transparent;a[0]=Number(a[0]),a[1]=Number(a[1]),a[2]=Number(a[2]),a.length>3&&(a[3]=Number(a[3]))}else a=_colorLookup.black;return toHSL&&!wasHSL&&(r=a[0]/255,g=a[1]/255,b=a[2]/255,max=Math.max(r,g,b),min=Math.min(r,g,b),l=(max+min)/2,max===min?h=s=0:(d=max-min,s=l>.5?d/(2-max-min):d/(max+min),h=max===r?(g-b)/d+(b>g?6:0):max===g?(b-r)/d+2:(r-g)/d+4,h*=60),a[0]=h+.5|0,a[1]=100*s+.5|0,a[2]=100*l+.5|0),a},_formatColors=function(s,toHSL){var i,color,temp,colors=(s+"").match(_colorExp)||[],charIndex=0,parsed=colors.length?"":s;for(i=0;i<colors.length;i++)color=colors[i],temp=s.substr(charIndex,s.indexOf(color,charIndex)-charIndex),charIndex+=temp.length+color.length,color=_parseColor(color,toHSL),3===color.length&&color.push(1),parsed+=temp+(toHSL?"hsla("+color[0]+","+color[1]+"%,"+color[2]+"%,"+color[3]:"rgba("+color.join(","))+")";return parsed+s.substr(charIndex)},TweenLite=_gsScope.TweenLite,_colorExp="(?:\\b(?:(?:rgb|rgba|hsl|hsla)\\(.+?\\))|\\B#(?:[0-9a-f]{3}){1,2}\\b",ColorPropsPlugin=_gsScope._gsDefine.plugin({propName:"colorProps",version:"1.5.0",priority:-1,API:2,global:!0,init:function(target,value,tween,index){var p,proxy,pt,val;this._target=target,this._proxy=proxy="NUMBER"===(value.format+"").toUpperCase()?{}:0;for(p in value)"format"!==p&&(proxy?(this._firstNumPT=pt={_next:this._firstNumPT,t:target,p:p,f:"function"==typeof target[p]},proxy[p]="rgb("+_parseColor(pt.f?target[p.indexOf("set")||"function"!=typeof target["get"+p.substr(3)]?p:"get"+p.substr(3)]():target[p]).join(",")+")",val=value[p],"function"==typeof val&&(val=val(index,target)),this._addTween(proxy,p,"get","number"==typeof val?"rgb("+_parseColor(val,!1).join(",")+")":val,p,null,null,_colorStringFilter)):this._addTween(target,p,"get",value[p],p,null,null,_colorStringFilter,index));return!0},set:function(v){var val,pt=this._firstNumPT;for(this._super.setRatio.call(this,v);pt;)val=_parseColor(this._proxy[pt.p],!1),val=val[0]<<16|val[1]<<8|val[2],pt.f?this._target[pt.p](val):this._target[pt.p]=val,pt=pt._next}});for(p in _colorLookup)_colorExp+="|"+p+"\\b";_colorExp=new RegExp(_colorExp+")","gi"),ColorPropsPlugin.colorStringFilter=_colorStringFilter=function(a){var toHSL,combined=a[0]+a[1];_colorExp.lastIndex=0,_colorExp.test(combined)&&(toHSL=-1!==combined.indexOf("hsl(")||-1!==combined.indexOf("hsla("),a[0]=_formatColors(a[0],toHSL),a[1]=_formatColors(a[1],toHSL))},TweenLite.defaultStringFilter||(TweenLite.defaultStringFilter=ColorPropsPlugin.colorStringFilter),ColorPropsPlugin.parseColor=_parseColor,p=ColorPropsPlugin.prototype,p._firstNumPT=null,p._kill=function(lookup){for(var prev,pt=this._firstNumPT;pt;)pt.p in lookup?(pt===p._firstNumPT&&(this._firstNumPT=pt._next),prev&&(prev._next=pt._next)):prev=pt,pt=pt._next;return this._super._kill(lookup)}}),_gsScope._gsDefine&&_gsScope._gsQueue.pop()();