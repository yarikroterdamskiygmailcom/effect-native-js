var _gsScope="undefined"!=typeof module&&module.exports&&"undefined"!=typeof global?global:this||window;(_gsScope._gsQueue||(_gsScope._gsQueue=[])).push(function(){"use strict";var RoundPropsPlugin=_gsScope._gsDefine.plugin({propName:"roundProps",version:"1.6.0",priority:-1,API:2,init:function(target,value,tween){return this._tween=tween,!0}}),_roundLinkedList=function(node){for(;node;)node.f||node.blob||(node.m=Math.round),node=node._next},p=RoundPropsPlugin.prototype;p._onInitAllProps=function(){for(var prop,pt,next,tween=this._tween,rp=tween.vars.roundProps.join?tween.vars.roundProps:tween.vars.roundProps.split(","),i=rp.length,lookup={},rpt=tween._propLookup.roundProps;--i>-1;)lookup[rp[i]]=Math.round;for(i=rp.length;--i>-1;)for(prop=rp[i],pt=tween._firstPT;pt;)next=pt._next,pt.pg?pt.t._mod(lookup):pt.n===prop&&(2===pt.f&&pt.t?_roundLinkedList(pt.t._firstPT):(this._add(pt.t,prop,pt.s,pt.c),next&&(next._prev=pt._prev),pt._prev?pt._prev._next=next:tween._firstPT===pt&&(tween._firstPT=next),pt._next=pt._prev=null,tween._propLookup[prop]=rpt)),pt=next;return!1},p._add=function(target,p,s,c){this._addTween(target,p,s,s+c,p,Math.round),this._overwriteProps.push(p)}}),_gsScope._gsDefine&&_gsScope._gsQueue.pop()();