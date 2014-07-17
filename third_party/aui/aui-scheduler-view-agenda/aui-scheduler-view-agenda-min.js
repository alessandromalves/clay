YUI.add("aui-scheduler-view-agenda",function(e,t){var n=e.Lang,r=n.isFunction,i=e.Array,s=e.DataType.DateMath,o=function(t){return function(n){var r=this,i=r.get("scheduler");return e.DataType.Date.format(n,{format:t,locale:i.get("locale")})}},u=function(e){return i.map(e,function(e){return+e}).sort(i.numericSort)},a=e.getClassName,f=a("scheduler-view-agenda","container"),l=a("scheduler-view-agenda","event"),c=a("scheduler-view-agenda","event","color"),h=a("scheduler-view-agenda","event","content"),p=a("scheduler-view-agenda","event","dates"),d=a("scheduler-view-agenda","event","first"),v=a("scheduler-view-agenda","info"),m=a("scheduler-view-agenda","info","biggie"),g=a("scheduler-view-agenda","info","container"),y=a("scheduler-view-agenda","info","label"),b=a("scheduler-view-agenda","info","label","biggie"),w=a("scheduler-view-agenda","info","label","small"),E=a("scheduler-view-agenda","event","last"),S=a("scheduler-view-agenda","no","events"),x=a("scheduler-view-agenda","event","past"),T=a("scheduler-view-agenda","events"),N=a("scheduler-view-agenda","header"),C=a("scheduler-view-agenda","header","day"),k=a("scheduler-view-agenda","header","extra"),L=a("scheduler-view-agenda","header","first"),A=a("scheduler-view-agenda","header","last"),O=a("clearfix"),M='<div class="'+f+'">{content}</div>',_='<div class="'+[N,O].join(" ")+' {firstClassName} {lastClassName}">'+'<div class="'+C+'">{day}</div>'+'<a href="javascript:;" class="'+k+'" data-timestamp="{timestamp}">{extra}</a>'+"</div>",D='<div class="'+T+'">{content}</div>',P='<div class="'+[l,O].join(" ")+' {firstClassName} {lastClassName} {eventClassName}" data-clientId="{clientId}">'+'<div class="'+c+'" style="background-color: {color};"></div>'+'<div class="'+h+'">{content}</div>'+'<div class="'+p+'">{dates}</div>'+"</div>",H='<div class="'+S+'">{content}</div>',B='<div class="'+g+'">'+'<div class="'+[v,O].join(" ")+'">'+'<div class="'+m+'">{day}</div>'+'<div class="'+y+'">'+'<div class="'+b+'">{labelBig}</div>'+'<div class="'+w+'">{labelSmall}</div>'+"</div>"+"</div>"+"</div>",j=e.Component.create({NAME:"scheduler-view-agenda",ATTRS:{bodyContent:{value:""},eventsDateFormatter:{value:function(e,t){var n=this,r=n.get("scheduler"),i=r.get("activeView").get("isoTime"),u="%H:%M",a="%H:%M",f,l;return i||(u="%l:%M",a="%l:%M",e.getHours()>=12&&(u+="pm"),t.getHours()>=12&&(a+="pm")),s.isDayOverlap(e,t)&&(u+=", %b %e",a+=", %b %e"),f=o.call(n,u),l=o.call(n,a),[f.call(n,e),"&mdash;",l.call(n,t)].join(" ")},validator:r},headerDayDateFormatter:{value:function(e){var t=this,n=t.get("scheduler").get("todayDate"),r,i;return s.isDayOverlap(e,n)?r="%A":r="today",i=o.call(t,r),i.call(t,e)},validator:r},headerExtraDateFormatter:{validator:r,value:o("%B %e")},infoDayDateFormatter:{validator:r,value:o("%e")},infoLabelBigDateFormatter:{validator:r,value:o("%A")},infoLabelSmallDateFormatter:{validator:r,value:o("%B %d, %Y")},name:{value:"agenda"},strings:{value:{noEvents:"No future events."}}},EXTENDS:e.SchedulerView,prototype:{bindUI:function(){var e=this,t=e.get("boundingBox");t.delegate("click",e._onSchedulerEventClick,"."+l,e),t.delegate("click",e._onEventsHeaderClick,"."+k,e)},getNextDate:function(){var e=this,t=e.get("scheduler").get("viewDate");return s.toMidnight(s.add(t,s.DAY,1))},getPrevDate:function(){var e=this,t=e.get("scheduler").get("viewDate");return s.toLastHour(s.subtract(t,s.DAY,1))},plotEvents:function(){var t=this,n=t.get("strings"),r=t.get("scheduler"),o=r.get("viewDate"),a=t.get("eventsDateFormatter"),f=t.get("headerDayDateFormatter"),l=t.get("headerExtraDateFormatter"),c=t.get("infoDayDateFormatter"),h=t.get("infoLabelBigDateFormatter"),p=t.get("infoLabelSmallDateFormatter"),v=[],m=t._getDayEventsMap(),g=e.Object.keys(m),y=g.length;t.set("headerContent",e.Lang.sub(B,{day:c.call(t,o),labelBig:h.call(t,o),labelSmall:p.call(t,o)})),e.Object.isEmpty(m)?v.push(e.Lang.sub(H,{content:n.noEvents})):i.each(u(g),function(n,r){var o=new Date(e.Lang.toInt(n)),u=m[n],c=u.length;v.push(e.Lang.sub(_,{day:f.call(t,o),extra:l.call(t,o),firstClassName:r===0?L:"",lastClassName:r===y-1?A:"",timestamp:n})),i.each(u,function(n,r){var i=s.toMidnight(new Date),o=n.get("endDate"),u=n.get("startDate");v.push(e.Lang.sub(P,{clientId:n.get("clientId"),color:n.get("color"),content:n.get("content"),dates:a.call(t,u,o),eventClassName:u.getTime()<i.getTime()?x:"",firstClassName:r===0?d:"",lastClassName:r===c-1?E:""}))})});var b=e.Lang.sub(M,{content:e.Lang.sub(D,{content:v.join("")})});t.set("bodyContent",b)},_getDayEventsMap:function(){var e=this,t=e.get("scheduler"),n=s.toMidnight(t.get("viewDate")),r={};return t.eachEvent(function(e){var t=e.get("startDate"),i=e.get("visible"),o;if(!i||t.getTime()<n.getTime())return;o=s.safeClearTime(t).getTime(),r[o]||(r[o]=[]),r[o].push(e)}),r},_onEventsHeaderClick:function(t){var n=this,r=n.get("scheduler"),i=t.currentTarget,s=e.Lang.toInt(i.getData("timestamp"))||Date.now(),o=new Date(s),u=r.getViewByName("day");u&&(r.set("date",o),r.set("activeView",u))},_onSchedulerEventClick:function(e){var t=this,n=e.currentTarget,r=t.get("scheduler"),i=r.get("eventRecorder"),s=n.getData("schedulerEvent");s||(s=r.getEventByClientId(n.getData("clientId")),n.setData("schedulerEvent",s)),s&&i&&!r.get("disabled")&&(i.set("event",s,{silent:!0}),i.showPopover(n))}}});e.SchedulerAgendaView=j},"2.5.0",{requires:["aui-scheduler-base"],skinnable:!0});
