(window.webpackJsonp=window.webpackJsonp||[]).push([[0],{146:function(e,t,n){e.exports=n(290)},151:function(e,t,n){},152:function(e,t,n){},290:function(e,t,n){"use strict";n.r(t);var a=n(0),r=n.n(a),i=n(8),l=n.n(i),o=(n(151),n(19)),c=(n(152),n(320)),s=n(324),u=n(325),d=n(327),m=n(328),f=n(326),p=n(31),g=n(74),v=n(329),h=n(134),b=n.n(h),E=n(21),I=n(50),w=n.n(I),N=n(321),y=n(335),O=n(323),x=n(133),j=n.n(x),k=48,T=Object(c.a)(function(e){return{card:{marginTop:"10px"},media:{height:0,paddingTop:"56.25%"},expand:{transform:"rotate(0deg)",marginLeft:"auto",transition:e.transitions.create("transform",{duration:e.transitions.duration.shortest})},expandOpen:{transform:"rotate(180deg)"},avatar:{backgroundColor:g.a[500]}}});function C(e){var t=e.store,n=T(),i=r.a.useState(!0),l=Object(o.a)(i,2),c=l[0],g=l[1];function h(e,n){var a=e.target.files[0];t.processFile(a,n,function(e){g(!c)})}function I(e,t){e.setVisibility(t);var n=document.getElementById(e.publicId);n?t?n.play():n.pause():console.log("not found")}Object(a.useEffect)(function(){setTimeout(function(){t.levels.filter(function(e){return e.isVisible}).map(function(e){I(e,!0)})},2e3)},[]);var x=r.a.useState(null),C=Object(o.a)(x,2),L=C[0],S=C[1],D=Boolean(L);function F(e){t.setLevelFilter(e),S(null)}return r.a.createElement("div",{className:"game"},r.a.createElement(N.a,{"aria-label":"More","aria-controls":"long-menu","aria-haspopup":"true",onClick:function(e){S(e.currentTarget)}},r.a.createElement(j.a,null),t.levelFilter.text),r.a.createElement(y.a,{id:"long-menu",anchorEl:L,keepMounted:!0,open:D,onClose:F,PaperProps:{style:{maxHeight:4.5*k,width:200}}},t.levelFilters.map(function(e){return r.a.createElement(O.a,{key:e.id,selected:e.id===t.levelFilter,onClick:function(){return F(e)}},e.text)})),t.filteredLevels.map(function(e,t){return r.a.createElement(w.a,{key:e.publicId,onChange:function(t){return I(e,t)}},r.a.createElement(s.a,{key:e.level,className:n.card},r.a.createElement(u.a,{avatar:r.a.createElement(f.a,{"aria-label":"Recipe",className:n.avatar},e.level),title:e.name,subheader:e.category}),r.a.createElement(d.a,null,r.a.createElement(E.Video,{id:e.publicId,cloudName:"deolievif",publicId:e.publicId,width:"100%",height:"100%",loop:!0,muted:!0,playsInline:!0,preload:"none",poster:e.poster}),r.a.createElement("div",{className:"card-content"},r.a.createElement(p.a,{variant:"body2",color:"textSecondary",component:"p"},e.details))),r.a.createElement(m.a,{in:c,timeout:"auto",unmountOnExit:!0},r.a.createElement(d.a,null,r.a.createElement("div",{className:"card-content2"},r.a.createElement("div",{className:"fileinputs"},r.a.createElement("input",{type:"file",className:"file",onChange:function(t){return h(t,e)}}),r.a.createElement("div",{className:"fakefile"},r.a.createElement(v.a,{variant:"outlined"},"Ladda upp ",r.a.createElement(b.a,null)))))))))}))}var L=n(45),S=n(51),D=n.n(S),F=n(94),P=n.n(F);var V=Object(L.a)(function(e){var t=e.store;return r.a.createElement("div",null,r.a.createElement(P.a,{onClick:function(){return t.selectProfile()}})," ",t.selectedProfile.name,r.a.createElement(E.Image,{cloudName:"deolievif",publicId:t.selectedProfile.profileImage,width:"100%",height:"100%"}))}),z=Object(c.a)(function(e){return{card:{marginTop:"10px"},media:{height:0,paddingTop:"56.25%"},expand:{transform:"rotate(0deg)",marginLeft:"auto",transition:e.transitions.create("transform",{duration:e.transitions.duration.shortest})},expandOpen:{transform:"rotate(180deg)"},avatar:{backgroundColor:g.a[500]}}});function B(e,t){e.setVisibility(t);var n=document.getElementById(e.publicId);n?t?n.play():n.pause():console.log("not found")}var A=Object(L.a)(function(e){var t=e.store,n=z();return Object(a.useEffect)(function(){setTimeout(function(){t.items.filter(function(e){return e.isVisible}).map(function(e){B(e,!0)})},2e3)},[]),r.a.createElement("div",{className:"item-container"},r.a.createElement("div",{className:"item-list"},r.a.createElement(w.a,{offset:{top:80},onChange:function(e){return function(e,t){t&&e.refresh()}(t,e)}},r.a.createElement("div",{className:"refresh-div"},"dra f\xf6r att ladda")),!t.selectedProfile&&t.items.map(function(e,a){return r.a.createElement(w.a,{key:e.publicId,onChange:function(t){return B(e,t)}},r.a.createElement(s.a,{key:e.publicId,className:n.card},r.a.createElement(u.a,{avatar:r.a.createElement(f.a,{"aria-label":"Recipe",className:n.avatar},r.a.createElement(E.Image,{cloudName:"deolievif",publicId:e.user.profileImage,width:"100%",height:"100%"})),action:e.isDone&&r.a.createElement(D.a,null),title:r.a.createElement("div",{onClick:function(){return t.selectProfile(e.user)}},e.user.name),subheader:e.game.name}),r.a.createElement(d.a,null,r.a.createElement(E.Video,{id:e.publicId,cloudName:"deolievif",publicId:e.publicId,width:"100%",height:"100%",loop:!0,muted:!0,playsInline:!0,preload:"none",poster:e.poster})),r.a.createElement(d.a,null,r.a.createElement("div",{className:"item-date"},e.date," - ",e.isVisible?"visible":"none"))))}),t.selectedProfile&&r.a.createElement(V,{store:t})))}),H=n(330),R=n(336),J=n(331),_=n(137),G=n.n(_),q=n(136),U=n.n(q),M=n(322),X=n(291),K=n(333),W=n(332),Y=n(334),Q=n(14),$=n(135),Z=n.n($);var ee=Object(L.a)(function(e){var t=e.store,n=e.onLogout;return r.a.createElement(r.a.Fragment,null,r.a.createElement("div",{className:"profile"},t.loggedIn.name,r.a.createElement(E.Image,{cloudName:"deolievif",publicId:t.loggedIn.profileImage,width:"100%",height:"100%"}),r.a.createElement("div",{className:"fileinputs"},r.a.createElement("input",{type:"file",className:"file",onChange:function(e){return function(e,n){var a=e.target.files[0];t.uploadImage(a,function(e){})}(e)}}),r.a.createElement("div",{className:"fakefile"},r.a.createElement(v.a,{variant:"outlined"},"Ladda upp ",r.a.createElement(Z.a,null))))),r.a.createElement("br",null),r.a.createElement("div",null,r.a.createElement(v.a,{variant:"outlined",onClick:function(){window.localStorage.removeItem("loggedIn"),n()}},"Logga ut")))});function te(e){return r.a.createElement(p.a,{component:"div",style:{padding:24}},e.children)}var ne=Object(c.a)(function(e){return{root:{flexGrow:1,width:"100%",backgroundColor:"#f5f5f5"}}});var ae=Object(Q.c)(function(e){var t=e.store,n=e.onLogout,a=ne(),i=r.a.useState(0),l=Object(o.a)(i,2),c=l[0],s=l[1];return r.a.createElement("div",{className:a.root},r.a.createElement(H.a,{position:"fixed",color:"default"},r.a.createElement(R.a,{value:c,onChange:function(e,t){s(t)},variant:"scrollable",scrollButtons:"on",indicatorColor:"primary",textColor:"primary"},r.a.createElement(J.a,{label:"Fl\xf6de",icon:r.a.createElement(U.a,null)}),r.a.createElement(J.a,{label:"Utmaningar",icon:r.a.createElement(D.a,null)}),r.a.createElement(J.a,{label:"Topplista",icon:r.a.createElement(D.a,null)}),r.a.createElement(J.a,{label:t.loggedIn.userName,icon:r.a.createElement(G.a,null)}))),0===c&&r.a.createElement(te,null,r.a.createElement(A,{store:t})),1===c&&r.a.createElement(te,null,r.a.createElement(C,{store:t})),2===c&&r.a.createElement(te,null,r.a.createElement("div",{className:"profile"},"Topplista"),r.a.createElement("div",{className:"highscore"},r.a.createElement(M.a,{className:a.root},t.users.map(function(e){return r.a.createElement(r.a.Fragment,null,r.a.createElement(X.a,null,r.a.createElement(W.a,null,r.a.createElement(f.a,null,r.a.createElement(E.Image,{cloudName:"deolievif",publicId:e.profileImage,width:"100%",height:"100%"}))),r.a.createElement(K.a,{primary:e.name,secondary:e.highscore})),r.a.createElement(Y.a,{variant:"inset",component:"li"}))})))),3===c&&r.a.createElement(te,null,r.a.createElement(ee,{store:t,onLogout:n})))});function re(e){var t=e.store,n=e.onLogin,i=Object(a.useState)(""),l=Object(o.a)(i,2),c=l[0],s=l[1],u=Object(a.useState)(""),d=Object(o.a)(u,2),m=d[0],f=d[1],p=function(e,t){var n=Object(a.useState)(function(){try{var n=window.localStorage.getItem(e);return n?JSON.parse(n):t}catch(a){return console.log(a),t}}),r=Object(o.a)(n,2),i=r[0],l=r[1];return[i,function(t){try{var n=t instanceof Function?t(i):t;l(n),window.localStorage.setItem(e,JSON.stringify(n))}catch(a){console.log(a)}}]}("loggedIn",{userName:void 0}),g=Object(o.a)(p,2),h=(g[0],g[1]);return r.a.createElement("div",null,r.a.createElement("div",null,"Anv\xe4ndarnamn"," ",r.a.createElement("input",{value:c,onInput:function(e){return s(e.target.value)}})),r.a.createElement("div",null,"L\xf6senord"," ",r.a.createElement("input",{type:"password",value:m,onInput:function(e){return f(e.target.value)}})),r.a.createElement(v.a,{variant:"outlined",onClick:function(e){return function(e){e.preventDefault(),t.login(c.toLowerCase(),m)?(h(t.loggedIn.id),n()):alert("fel anv\xe4ndarnamn/l\xf6senord")}(e)}},"LOGIN"))}var ie=n(22),le=n.n(ie),oe=n(52),ce=n(7),se=ce.d.model("Level",{level:ce.d.integer,details:ce.d.string,name:ce.d.string,category:ce.d.string,publicId:ce.d.string}).volatile(function(e){return{isVisible:!1}}).actions(function(e){return{setPublicId:function(t){e.publicId=t},setName:function(t){e.name=t},setVisibility:function(t){e.isVisible=t}}}).views(function(e){return{get status(){return e.is_done?"Done":"Not Done"},get isDone(){var t=Object(ce.c)(e);return t.items.some(function(n){return n.user.id===t.loggedIn.id&&n.isDone&&n.level===e.level})},get poster(){return{publicId:e.publicId+".jpg",resourceType:"video"}}}});function ue(e){return e<=9?"0"+e:e}var de=ce.d.model("Item",{id:ce.d.string,createdTime:ce.d.Date,userName:ce.d.string,publicId:ce.d.string,level:ce.d.integer,isDone:ce.d.maybeNull(ce.d.boolean)}).volatile(function(e){return{isVisible:!1}}).actions(function(e){return{setVisibility:function(t){e.isVisible=t}}}).views(function(e){return{get date(){return e.createdTime.getFullYear()+"-"+ue(e.createdTime.getMonth()+1)+"-"+ue(e.createdTime.getDate())},get user(){return Object(ce.c)(e).users.find(function(t){return t.userName===e.userName})},get game(){return Object(ce.c)(e).levels.find(function(t){return t.level===e.level})},get poster(){return{publicId:e.publicId+".jpg",resourceType:"video"}}}}),me=ce.d.model("User",{id:ce.d.string,userName:ce.d.string,name:ce.d.string,password:ce.d.string,profileImage:ce.d.string}).views(function(e){return{get levelStore(){return Object(ce.c)(e)},get items(){return e.levelStore.items.filter(function(t){return t.userName===e.userName})},get highscore(){return 0===e.items.length?0:e.items.length},get nextChallange(){return e.levelStore.levels[e.items.length]}}}).actions(function(e){return{setProfileImage:function(t){e.profileImage=t}}}),fe="appC7N77wl4iVEXGD",pe="Levels",ge="Grid%20view",ve="keyHQ5GM7ktar7YtG",he=20,be=(new Request("https://api.airtable.com/v0/appC7N77wl4iVEXGD/Levels",{method:"post",body:JSON.stringify({fields:{level:11,name:"Bell Taps",details:"Transfer ball from side to side in a \u201cbell ringing\u201d motion, using the inside of both feet",is_done:!1,publicId:"xriaksiq3gipz0dupgny",category:"Beginner"}}),headers:new Headers({Authorization:"Bearer ".concat(ve),"Content-Type":"application/json"})}),new Request("https://api.airtable.com/v0/".concat(fe,"/").concat(pe,"?maxRecords=").concat(he,"&view=").concat(ge),{method:"get",headers:new Headers({Authorization:"Bearer ".concat(ve)})})),Ee=new Request("https://api.airtable.com/v0/".concat(fe,"/Items?maxRecords=").concat(he,"&view=").concat(ge),{method:"get",headers:new Headers({Authorization:"Bearer ".concat(ve)})}),Ie=new Request("https://api.airtable.com/v0/".concat(fe,"/Users?maxRecords=").concat(he,"&view=").concat(ge),{method:"get",headers:new Headers({Authorization:"Bearer ".concat(ve)})}),we=[{id:0,text:"Alla"},{id:1,text:"Ej klarade"},{id:2,text:"Klarade"}],Ne=ce.d.model("LevelStore",{levels:ce.d.array(se),items:ce.d.array(de),users:ce.d.array(me)}).views(function(e){return{get test(){return"testing"},get filteredLevels(){return 0===e.levelFilter.id?e.levels:1===e.levelFilter.id?e.levels.filter(function(e){return!e.isDone}):2===e.levelFilter.id?e.levels.filter(function(e){return e.isDone}):[]},get levelFilters(){return we}}}).volatile(function(e){return{loggedIn:null,initzialize:!1,height:null,selectedProfile:null,levelFilter:e.levelFilters[0]}}).actions(function(e){return{selectProfile:function(t){e.selectedProfile=t},setLevelFilter:function(t){e.levelFilter=t},refresh:function(){var t=Object(oe.a)(le.a.mark(function t(){var n,a;return le.a.wrap(function(t){for(;;)switch(t.prev=t.next){case 0:return t.next=2,e.fetchItems();case 2:return n=t.sent,a=[],n.reverse(),n.forEach(function(e){e.fields.id=e.id,e.fields.createdTime=new Date(e.createdTime),a.push(e.fields)}),Object(ce.a)(e.items,a),t.abrupt("return",!0);case 8:case"end":return t.stop()}},t)}));return function(){return t.apply(this,arguments)}}(),setHeight:function(t){e.height=t},logout:function(){e.loggedIn=null},login:function(t,n){return e.loggedIn=e.users.find(function(e){return e.userName===t&&e.password===n}),!!e.loggedIn},login2:function(t){return e.loggedIn=e.users.find(function(e){return e.id===JSON.parse(t)}),!!e.loggedIn},add:function(t){e.levels.push(t)},addItem:function(t){e.items.push(t)},fetchAirtable:function(){var e=Object(oe.a)(le.a.mark(function e(){var t,n;return le.a.wrap(function(e){for(;;)switch(e.prev=e.next){case 0:return e.next=2,fetch(be).catch(function(e){console.log(e)});case 2:if(!((t=e.sent).status>=200&&t.status<300)){e.next=8;break}return e.next=6,t.json();case 6:return n=e.sent,e.abrupt("return",n.records);case 8:case"end":return e.stop()}},e)}));return function(){return e.apply(this,arguments)}}(),fetchItems:function(){var e=Object(oe.a)(le.a.mark(function e(){var t,n;return le.a.wrap(function(e){for(;;)switch(e.prev=e.next){case 0:return e.next=2,fetch(Ee).catch(function(e){console.log(e)});case 2:if(!((t=e.sent).status>=200&&t.status<300)){e.next=8;break}return e.next=6,t.json();case 6:return n=e.sent,e.abrupt("return",n.records);case 8:case"end":return e.stop()}},e)}));return function(){return e.apply(this,arguments)}}(),insertItem:function(e){fetch(new Request("https://api.airtable.com/v0/appC7N77wl4iVEXGD/Items",{method:"post",body:JSON.stringify({fields:e}),headers:new Headers({Authorization:"Bearer ".concat(ve),"Content-Type":"application/json"})})).catch(function(e){console.log(e)})},updateUser:function(e){var t="https://api.airtable.com/v0/appC7N77wl4iVEXGD/Users/recPDEuzfAvPaJ5Jf";console.log(t),fetch(new Request(t,{method:"put",body:JSON.stringify({fields:{name:"Gustav Karlsson",userName:"gk",password:"gk",profileImage:e.profileImage}}),headers:new Headers({Authorization:"Bearer ".concat(ve),"Content-Type":"application/json"})})).catch(function(e){alert(e)})},fetchUsers:function(){var e=Object(oe.a)(le.a.mark(function e(){var t,n;return le.a.wrap(function(e){for(;;)switch(e.prev=e.next){case 0:return e.next=2,fetch(Ie).catch(function(e){console.log(e)});case 2:if(!((t=e.sent).status>=200&&t.status<300)){e.next=8;break}return e.next=6,t.json();case 6:return n=e.sent,e.abrupt("return",n.records);case 8:case"end":return e.stop()}},e)}));return function(){return e.apply(this,arguments)}}(),init:Object(ce.b)(le.a.mark(function t(n){var a,r,i,l;return le.a.wrap(function(t){for(;;)switch(t.prev=t.next){case 0:return t.next=2,e.fetchAirtable();case 2:return a=t.sent,t.next=5,e.fetchUsers();case 5:return r=t.sent,t.next=8,e.fetchItems();case 8:i=t.sent,l={users:[],items:[],levels:[]},a.forEach(function(e){l.levels.push(e.fields)}),r.forEach(function(e){e.fields.id=e.id,l.users.push(e.fields)}),i.reverse(),i.forEach(function(e){e.fields.id=e.id,e.fields.createdTime=new Date(e.createdTime),l.items.push(e.fields)}),Object(ce.a)(e,l),n&&e.login2(n),e.initzialize=!0;case 17:case"end":return t.stop()}},t)})),uploadImage:function(t,n){var a=new FormData;a.append("file",t),a.append("cloud_name","deolievif"),a.append("upload_preset","kv0do7lj"),a.append("title",e.loggedIn.userName),a.append("tags",e.loggedIn.userName);var r=new XMLHttpRequest;r.open("POST","https://api.cloudinary.com/v1_1/deolievif/image/upload",!0),r.onload=function(){var t=JSON.parse(this.responseText);e.loggedIn.setProfileImage(t.public_id),e.updateUser(e.loggedIn),n(this.responseText)},r.send(a)},processFile:function(t,n,a){var r=new FormData;r.append("file",t),r.append("cloud_name","deolievif"),r.append("upload_preset","kv0do7lj"),r.append("resource_type","raw"),r.append("title",e.loggedIn.userName),r.append("tags",e.loggedIn.userName);var i=new XMLHttpRequest;i.open("POST","https://api.cloudinary.com/v1_1/deolievif/video/upload/",!0),i.onload=function(){var t=JSON.parse(this.responseText);console.log(t),console.log(this.responseText);var r={userName:e.loggedIn.userName,publicId:t.public_id,level:n.level,isDone:!1};e.insertItem(r),e.addItem(r),console.log(e.items),a(this.responseText)},i.send(r)}}}).create();Ne.init(window.localStorage.getItem("loggedIn"));var ye=Object(Q.c)(function(){var e=Object(a.useState)("Login"),t=Object(o.a)(e,2),n=t[0],i=t[1];if(Object(a.useEffect)(function(){Ne.setHeight(window.innerHeight)},[]),!Ne.initzialize)return r.a.createElement("div",null,"loading");if(Ne.initzialize&&Ne.loggedIn)return r.a.createElement(ae,{store:Ne,onLogout:function(){Ne.logout(),i("Login")}});var l="Login"===n?r.a.createElement(re,{store:Ne,onLogin:i}):r.a.createElement(ae,{store:Ne});return r.a.createElement("div",{id:"outer-container"},r.a.createElement("main",{id:"page-wrap"},r.a.createElement("div",{className:"App"},r.a.createElement("header",{className:"App-header"},l))))});Boolean("localhost"===window.location.hostname||"[::1]"===window.location.hostname||window.location.hostname.match(/^127(?:\.(?:25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)){3}$/));l.a.render(r.a.createElement(ye,null),document.getElementById("root")),"serviceWorker"in navigator&&navigator.serviceWorker.ready.then(function(e){e.unregister()})}},[[146,1,2]]]);
//# sourceMappingURL=main.1ec290d1.chunk.js.map