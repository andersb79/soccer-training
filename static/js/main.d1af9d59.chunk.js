(window.webpackJsonp=window.webpackJsonp||[]).push([[0],{137:function(e,t,a){e.exports=a(281)},142:function(e,t,a){},143:function(e,t,a){},281:function(e,t,a){"use strict";a.r(t);var n=a(0),r=a.n(n),o=a(13),i=a.n(o),l=(a(142),a(17)),c=(a(143),a(308)),s=(a(4),a(309)),u=a(310),d=a(312),m=a(322),p=a(311),g=a(27),f=a(62),v=a(124),h=a.n(v),b=a(26),E=a(313),I=Object(c.a)(function(e){return{card:{maxWidth:345,marginTop:"10px"},media:{height:0,paddingTop:"56.25%"},expand:{transform:"rotate(0deg)",marginLeft:"auto",transition:e.transitions.create("transform",{duration:e.transitions.duration.shortest})},expandOpen:{transform:"rotate(180deg)"},avatar:{backgroundColor:f.a[500]}}});function w(e){var t=e.store,a=I(),n=r.a.useState(!0),o=Object(l.a)(n,2),i=o[0],c=o[1];function f(e,a){var n=e.target.files[0];t.processFile(n,a,function(e){c(!i)})}var v=t.loggedIn.nextChallange;return r.a.createElement("div",{className:"game"},r.a.createElement(s.a,{key:v.level,className:a.card},r.a.createElement(u.a,{avatar:r.a.createElement(p.a,{"aria-label":"Recipe",className:a.avatar},v.level),title:v.name,subheader:v.category}),r.a.createElement(d.a,null,r.a.createElement(b.Video,{id:"myVideo",cloudName:"deolievif",publicId:v.publicId,width:"100%",height:"200px",autoPlay:!0,loop:!0,muted:!0,playsInline:!0}),r.a.createElement(g.a,{variant:"body2",color:"textSecondary",component:"p"},v.details)),r.a.createElement(m.a,{in:i,timeout:"auto",unmountOnExit:!0},r.a.createElement(d.a,null,r.a.createElement("div",{className:"fileinputs"},r.a.createElement("input",{type:"file",className:"file",onChange:function(e){return f(e,v)}}),r.a.createElement("div",{className:"fakefile"},r.a.createElement(E.a,{variant:"outlined"},"Ladda upp ",r.a.createElement(h.a,null))))))))}var N=a(125),y=a(126),x=a.n(y),O=Object(c.a)(function(e){return{card:{maxWidth:345,marginTop:"10px"},media:{height:0,paddingTop:"56.25%"},expand:{transform:"rotate(0deg)",marginLeft:"auto",transition:e.transitions.create("transform",{duration:e.transitions.duration.shortest})},expandOpen:{transform:"rotate(180deg)"},avatar:{backgroundColor:f.a[500]}}});var j=Object(N.a)(function(e){var t=e.store,a=O();return r.a.createElement("div",{className:"item-list"},t.items.map(function(e,t){return r.a.createElement(x.a,{key:e.publicId,onChange:function(t){return function(e,t){e.setVisibility(t),t?document.getElementById(e.publicId).play():document.getElementById(e.publicId).pause()}(e,t)}},r.a.createElement(s.a,{key:e.publicId,className:a.card},r.a.createElement(u.a,{avatar:r.a.createElement(p.a,{"aria-label":"Recipe",className:a.avatar},r.a.createElement(b.Image,{cloudName:"deolievif",publicId:e.user.profileImage,width:"100%",height:"100%"})),title:e.userName,subheader:e.level}),r.a.createElement(d.a,null,r.a.createElement(b.Video,{id:e.publicId,cloudName:"deolievif",publicId:e.publicId,width:"100%",height:"100%",loop:!0,muted:!0,playsInline:!0}))))}))}),k=a(314),S=a(321),L=a(315),C=a(59),T=a.n(C),z=a(127),_=a.n(z),B=a(81),R=a.n(B),A=a(316),J=a(317),D=a(319),V=a(318),G=a(128),q=a.n(G),H=a(320),P=a(10);function U(e){return r.a.createElement(g.a,{component:"div",style:{padding:24}},e.children)}var F=Object(c.a)(function(e){return{root:{flexGrow:1,width:"100%",backgroundColor:e.palette.background.paper}}});var X=Object(P.c)(function(e){var t=e.store,a=e.onLogout,n=F(),o=r.a.useState(0),i=Object(l.a)(o,2),c=i[0],s=i[1];return r.a.createElement("div",{className:n.root},r.a.createElement(k.a,{position:"fixed",color:"default"},r.a.createElement(S.a,{value:c,onChange:function(e,t){s(t)},variant:"scrollable",scrollButtons:"on",indicatorColor:"primary",textColor:"primary"},r.a.createElement(L.a,{label:"Fl\xf6de",icon:r.a.createElement(R.a,null)}),r.a.createElement(L.a,{label:"Utmaningar",icon:r.a.createElement(T.a,null)}),r.a.createElement(L.a,{label:"Topplista",icon:r.a.createElement(T.a,null)}),r.a.createElement(L.a,{label:t.loggedIn.userName,icon:r.a.createElement(_.a,null)}))),0===c&&r.a.createElement(U,null,r.a.createElement(j,{store:t})),1===c&&r.a.createElement(U,null,r.a.createElement(w,{store:t})),2===c&&r.a.createElement(U,null,r.a.createElement("div",{className:"profile"},"Topplista"),r.a.createElement("div",{className:"highscore"},r.a.createElement(A.a,{className:n.root},t.users.map(function(e){return r.a.createElement(r.a.Fragment,null,r.a.createElement(J.a,null,r.a.createElement(V.a,null,r.a.createElement(p.a,null,r.a.createElement(b.Image,{cloudName:"deolievif",publicId:e.profileImage,width:"100%",height:"100%"}))),r.a.createElement(D.a,{primary:e.name,secondary:e.highscore})),r.a.createElement(H.a,{variant:"inset",component:"li"}))})))),3===c&&r.a.createElement(U,null,r.a.createElement("div",{className:"profile"},t.loggedIn.name,r.a.createElement(b.Image,{cloudName:"deolievif",publicId:t.loggedIn.profileImage,width:"100%",height:"100%"}),r.a.createElement("div",{className:"fileinputs"},r.a.createElement("input",{type:"file",className:"file",onChange:function(e){return function(e,a){var n=e.target.files[0];t.uploadImage(n,function(e){})}(e)}}),r.a.createElement("div",{className:"fakefile"},r.a.createElement(E.a,{variant:"outlined"},"Ladda upp ",r.a.createElement(q.a,null))))),r.a.createElement(E.a,{variant:"outlined",onClick:function(){window.localStorage.removeItem("loggedIn"),a()}},"Logga ut")))});function W(e){var t=e.store,a=e.onLogin,o=Object(n.useState)(""),i=Object(l.a)(o,2),c=i[0],s=i[1],u=Object(n.useState)(""),d=Object(l.a)(u,2),m=d[0],p=d[1],g=function(e,t){var a=Object(n.useState)(function(){try{var a=window.localStorage.getItem(e);return a?JSON.parse(a):t}catch(n){return console.log(n),t}}),r=Object(l.a)(a,2),o=r[0],i=r[1];return[o,function(t){try{var a=t instanceof Function?t(o):t;i(a),window.localStorage.setItem(e,JSON.stringify(a))}catch(n){console.log(n)}}]}("loggedIn",{userName:void 0}),f=Object(l.a)(g,2),v=(f[0],f[1]);return r.a.createElement("div",null,r.a.createElement("div",null,"Anv\xe4ndarnamn"," ",r.a.createElement("input",{value:c,onInput:function(e){return s(e.target.value)}})),r.a.createElement("div",null,"L\xf6senord"," ",r.a.createElement("input",{type:"password",value:m,onInput:function(e){return p(e.target.value)}})),r.a.createElement(E.a,{variant:"outlined",onClick:function(e){return function(e){e.preventDefault(),t.login(c.toLowerCase(),m)?(v(t.loggedIn.id),a()):alert("fel anv\xe4ndarnamn/l\xf6senord")}(e)}},"LOGIN"))}var M=a(23),K=a.n(M),Q=a(63),Y=a(7),$=(a(2),Y.d.model("Level",{level:Y.d.integer,details:Y.d.string,is_done:!1,name:Y.d.string,category:Y.d.string,publicId:Y.d.string}).actions(function(e){return{markDone:function(){e.is_done=!0},setPublicId:function(t){e.publicId=t},setName:function(t){e.name=t}}}).views(function(e){return{status:function(){return e.is_done?"Done":"Not Done"}}})),Z=Y.d.model("Item",{userName:Y.d.string,publicId:Y.d.string,level:Y.d.integer}).volatile(function(e){return{isVisible:!1}}).actions(function(e){return{setVisibility:function(t){e.isVisible=t}}}).views(function(e){return{get user(){return Object(Y.c)(e).users.find(function(t){return t.userName==e.userName})}}}),ee=Y.d.model("User",{id:Y.d.string,userName:Y.d.string,name:Y.d.string,password:Y.d.string,profileImage:Y.d.string}).views(function(e){return{get levelStore(){return Object(Y.c)(e)},get items(){return e.levelStore.items.filter(function(t){return t.userName===e.userName})},get highscore(){return 0===e.items.length?0:e.items.length},get nextChallange(){return e.levelStore.levels[e.items.length]}}}).actions(function(e){return{setProfileImage:function(t){e.profileImage=t}}}),te="appC7N77wl4iVEXGD",ae="Levels",ne="Grid%20view",re="keyHQ5GM7ktar7YtG",oe=20,ie=(new Request("https://api.airtable.com/v0/appC7N77wl4iVEXGD/Levels",{method:"post",body:JSON.stringify({fields:{level:11,name:"Bell Taps",details:"Transfer ball from side to side in a \u201cbell ringing\u201d motion, using the inside of both feet",is_done:!1,publicId:"xriaksiq3gipz0dupgny",category:"Beginner"}}),headers:new Headers({Authorization:"Bearer ".concat(re),"Content-Type":"application/json"})}),new Request("https://api.airtable.com/v0/".concat(te,"/").concat(ae,"?maxRecords=").concat(oe,"&view=").concat(ne),{method:"get",headers:new Headers({Authorization:"Bearer ".concat(re)})})),le=new Request("https://api.airtable.com/v0/".concat(te,"/Items?maxRecords=").concat(oe,"&view=").concat(ne),{method:"get",headers:new Headers({Authorization:"Bearer ".concat(re)})}),ce=new Request("https://api.airtable.com/v0/".concat(te,"/Users?maxRecords=").concat(oe,"&view=").concat(ne),{method:"get",headers:new Headers({Authorization:"Bearer ".concat(re)})}),se=Y.d.model("LevelStore",{levels:Y.d.array($),items:Y.d.array(Z),users:Y.d.array(ee)}).views(function(e){return{get test(){return"testing"},get filteredLevels(){var t=[];return t.push(e.levels[0]),t}}}).volatile(function(e){return{loggedIn:null,initzialize:!1}}).actions(function(e){return{logout:function(){e.loggedIn=null},login:function(t,a){return e.loggedIn=e.users.find(function(e){return e.userName===t&&e.password===a}),!!e.loggedIn},login2:function(t){return e.loggedIn=e.users.find(function(e){return e.id===JSON.parse(t)}),!!e.loggedIn},add:function(t){e.levels.push(t)},addItem:function(t){e.items.push(t)},fetchAirtable:function(){var e=Object(Q.a)(K.a.mark(function e(){var t,a;return K.a.wrap(function(e){for(;;)switch(e.prev=e.next){case 0:return e.next=2,fetch(ie).catch(function(e){console.log(e)});case 2:if(!((t=e.sent).status>=200&&t.status<300)){e.next=8;break}return e.next=6,t.json();case 6:return a=e.sent,e.abrupt("return",a.records);case 8:case"end":return e.stop()}},e)}));return function(){return e.apply(this,arguments)}}(),fetchItems:function(){var e=Object(Q.a)(K.a.mark(function e(){var t,a;return K.a.wrap(function(e){for(;;)switch(e.prev=e.next){case 0:return e.next=2,fetch(le).catch(function(e){console.log(e)});case 2:if(!((t=e.sent).status>=200&&t.status<300)){e.next=8;break}return e.next=6,t.json();case 6:return a=e.sent,e.abrupt("return",a.records);case 8:case"end":return e.stop()}},e)}));return function(){return e.apply(this,arguments)}}(),insertItem:function(e){fetch(new Request("https://api.airtable.com/v0/appC7N77wl4iVEXGD/Items",{method:"post",body:JSON.stringify({fields:e}),headers:new Headers({Authorization:"Bearer ".concat(re),"Content-Type":"application/json"})})).catch(function(e){console.log(e)})},updateUser:function(e){var t="https://api.airtable.com/v0/appC7N77wl4iVEXGD/Users/recPDEuzfAvPaJ5Jf";console.log(t),fetch(new Request(t,{method:"put",body:JSON.stringify({fields:{name:"Gustav Karlsson",userName:"gk",password:"gk",profileImage:e.profileImage}}),headers:new Headers({Authorization:"Bearer ".concat(re),"Content-Type":"application/json"})})).catch(function(e){alert(e)})},fetchUsers:function(){var e=Object(Q.a)(K.a.mark(function e(){var t,a;return K.a.wrap(function(e){for(;;)switch(e.prev=e.next){case 0:return e.next=2,fetch(ce).catch(function(e){console.log(e)});case 2:if(!((t=e.sent).status>=200&&t.status<300)){e.next=8;break}return e.next=6,t.json();case 6:return a=e.sent,e.abrupt("return",a.records);case 8:case"end":return e.stop()}},e)}));return function(){return e.apply(this,arguments)}}(),init:Object(Y.b)(K.a.mark(function t(a){var n,r,o,i;return K.a.wrap(function(t){for(;;)switch(t.prev=t.next){case 0:return t.next=2,e.fetchAirtable();case 2:return n=t.sent,t.next=5,e.fetchUsers();case 5:return r=t.sent,t.next=8,e.fetchItems();case 8:o=t.sent,i={users:[],items:[],levels:[]},n.forEach(function(e){i.levels.push(e.fields)}),r.forEach(function(e){e.fields.id=e.id,i.users.push(e.fields)}),o.forEach(function(e){i.items.push(e.fields)}),Object(Y.a)(e,i),a&&e.login2(a),e.initzialize=!0;case 16:case"end":return t.stop()}},t)})),uploadImage:function(t,a){var n=new FormData;n.append("file",t),n.append("cloud_name","deolievif"),n.append("upload_preset","kv0do7lj"),n.append("title",e.loggedIn.userName),n.append("tags",e.loggedIn.userName);var r=new XMLHttpRequest;r.open("POST","https://api.cloudinary.com/v1_1/deolievif/image/upload",!0),r.onload=function(){var t=JSON.parse(this.responseText);e.loggedIn.setProfileImage(t.public_id),e.updateUser(e.loggedIn),a(this.responseText)},r.send(n)},processFile:function(t,a,n){var r=new FormData;r.append("file",t),r.append("cloud_name","deolievif"),r.append("upload_preset","kv0do7lj"),r.append("resource_type","raw"),r.append("title",e.loggedIn.userName),r.append("tags",e.loggedIn.userName);var o=new XMLHttpRequest;o.open("POST","https://api.cloudinary.com/v1_1/deolievif/video/upload/",!0),o.onload=function(){var t=JSON.parse(this.responseText);console.log(t),console.log(this.responseText),e.insertItem({userName:e.loggedIn.userName,publicId:t.public_id}),e.addItem({userName:e.loggedIn.userName,level:a,publicId:t.public_id}),console.log(e.items),n(this.responseText)},o.send(r)}}}).create();se.init(window.localStorage.getItem("loggedIn"));var ue=Object(P.c)(function(){var e=Object(n.useState)("Login"),t=Object(l.a)(e,2),a=t[0],o=t[1];if(!se.initzialize)return r.a.createElement("div",null,"loading");if(se.initzialize&&se.loggedIn)return r.a.createElement(X,{store:se,onLogout:function(){se.logout(),o("Login")}});var i="Login"===a?r.a.createElement(W,{store:se,onLogin:o}):r.a.createElement(X,{store:se});return r.a.createElement("div",{id:"outer-container"},r.a.createElement("main",{id:"page-wrap"},r.a.createElement("div",{className:"App"},r.a.createElement("header",{className:"App-header"},i))))});Boolean("localhost"===window.location.hostname||"[::1]"===window.location.hostname||window.location.hostname.match(/^127(?:\.(?:25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)){3}$/));i.a.render(r.a.createElement(ue,null),document.getElementById("root")),"serviceWorker"in navigator&&navigator.serviceWorker.ready.then(function(e){e.unregister()})}},[[137,1,2]]]);
//# sourceMappingURL=main.d1af9d59.chunk.js.map