(window.webpackJsonp=window.webpackJsonp||[]).push([[0],{162:function(e,t,a){e.exports=a(306)},167:function(e,t,a){},168:function(e,t,a){},306:function(e,t,a){"use strict";a.r(t);var n=a(0),r=a.n(n),i=a(9),l=a.n(i),o=(a(167),a(18)),c=(a(168),a(349)),s=a(354),u=a(355),m=a(357),d=a(358),p=a(356),g=a(38),f=a(359),v=a(80),h=a.n(v),E=a(56),b=a.n(E),y=a(351),N=a(151),w=a(353),I=a(141),k=a.n(I),x=a(16),O=a(25);var j=Object(x.a)(function(e){e.store;var t=e.settings;function a(e){document.getElementById(e.id).webkitEnterFullscreen()}return t.hasSharedPath?r.a.createElement("video",{onClick:function(){return a(t)},id:t.id,loop:!0,playsInline:!0,preload:"none",muted:!0,width:"100%",height:"100%"},r.a.createElement("source",{src:t.dropboxLink,type:"video/mp4"})):r.a.createElement(O.Video,{onClick:function(){return a(t)},id:t.id,cloudName:"deolievif",publicId:t.publicId,width:"100%",height:"100%",loop:!0,muted:!0,playsInline:!0,preload:"none",poster:t.poster})}),C=48,T=Object(c.a)(function(e){return{card:{marginTop:"10px"},media:{height:0,paddingTop:"56.25%"},expand:{transform:"rotate(0deg)",marginLeft:"auto",transition:e.transitions.create("transform",{duration:e.transitions.duration.shortest})},expandOpen:{transform:"rotate(180deg)"},avatar:{}}});function L(e){var t=e.store,a=T(),i=r.a.useState(!0),l=Object(o.a)(i,2),c=l[0];l[1];function v(e,t){e.setVisibility(t);var a=document.getElementById(e.id);a?t?a.play():a.pause():console.log("not found")}Object(n.useEffect)(function(){setTimeout(function(){t.levels.filter(function(e){return e.isVisible}).map(function(e){v(e,!0)})},1)});var E=r.a.useState(null),I=Object(o.a)(E,2),x=I[0],O=I[1],L=Boolean(x);function S(e){t.setLevelFilter(e),O(null)}function P(e){return"MEDIUM"===e.category?{backgroundColor:"orange"}:"HARD"===e.category?{backgroundColor:"red"}:{backgroundColor:"green"}}return r.a.createElement("div",{className:"game"},r.a.createElement(y.a,{"aria-label":"More","aria-controls":"long-menu","aria-haspopup":"true",onClick:function(e){O(e.currentTarget)}},r.a.createElement(k.a,null),t.levelFilter.text),r.a.createElement(N.a,{id:"long-menu",anchorEl:x,keepMounted:!0,open:L,onClose:S,PaperProps:{style:{maxHeight:4.5*C,width:200}}},t.levelFilters.map(function(e){return r.a.createElement(w.a,{key:e.id,selected:e.id===t.levelFilter,onClick:function(){return S(e)}},e.text)})),t.filteredLevels.map(function(e,n){return r.a.createElement(b.a,{key:e.id,onChange:function(t){return v(e,t)}},r.a.createElement(s.a,{key:e.level,className:a.card},r.a.createElement(u.a,{avatar:r.a.createElement(p.a,{"aria-label":"Recipe",style:P(e),className:a.avatar},e.level),title:e.name,subheader:e.displayText}),r.a.createElement(m.a,null,r.a.createElement(j,{store:t,settings:e}),r.a.createElement("div",{className:"card-content"},r.a.createElement(g.a,{variant:"body2",color:"textSecondary",component:"p"},e.details))),r.a.createElement(d.a,{in:c,timeout:"auto",unmountOnExit:!0},r.a.createElement(m.a,null,r.a.createElement("div",{className:"card-content2"},r.a.createElement("div",{className:"fileinputs"},r.a.createElement("input",{type:"file",className:"file",onChange:function(a){return function(e,a){var n=e.target.files[0];t.processFile(n,a,function(e){alert("Uppladdning klar")})}(a,e)}}),r.a.createElement("div",{className:"fakefile"},r.a.createElement(f.a,{variant:"outlined"},"Ladda upp ",r.a.createElement(h.a,null)))))))))}))}var S=a(87),P=a(36),R=a.n(P),D=a(81),F=a.n(D),A=a(82),M=a.n(A),U=a(142),H=a.n(U),V=a(370),B=a(360),G=a(361),z=a(363),J=a(362),K=Object(c.a)(function(e){return{root:{display:"flex",flexWrap:"wrap",justifyContent:"space-around",overflow:"hidden",backgroundColor:e.palette.background.paper},gridList:{width:500,height:450},icon:{color:"rgba(255, 255, 255, 0.54)"}}});var W=Object(x.a)(function(e){e.store;var t=e.user,a=K();return r.a.createElement(B.a,{cellHeight:180,className:a.gridList},r.a.createElement(G.a,{key:"Subheader",cols:2,style:{height:"auto"}},r.a.createElement(J.a,{component:"div"},t.videoList.length," uppladdade")),t.videoList.map(function(e){return r.a.createElement(G.a,{key:e.id,onClick:function(){}},r.a.createElement("img",{src:e.img,alt:e.title}),r.a.createElement(z.a,{title:e.title,subtitle:r.a.createElement("span",null,e.challange)}))}))}),_=Object(c.a)(function(e){return{container:{display:"flex",flexWrap:"wrap"},textField:{marginLeft:e.spacing(1),marginRight:e.spacing(1),width:200},dense:{marginTop:19},menu:{width:200}}});var q=Object(x.a)(function(e){var t=e.store,a=_(),n=r.a.useState({id:t.selectedProfile.id,name:t.selectedProfile.name,userName:t.selectedProfile.userName,password:t.selectedProfile.password,profileImage:t.selectedProfile.profileImage,favoriteTeam:t.selectedProfile.favoriteTeam,playerTeam:t.selectedProfile.playerTeam,position:t.selectedProfile.position,shirtNumber:t.selectedProfile.shirtNumber}),i=Object(o.a)(n,2),l=i[0];return i[1],r.a.createElement("div",{className:"profileReadOnly"},r.a.createElement("div",null,r.a.createElement("div",{className:"left"},r.a.createElement(H.a,{onClick:function(){return t.selectProfile()}})),r.a.createElement("div",{className:"right"},t.selectedProfile.name)),r.a.createElement("form",{className:a.container,noValidate:!0,autoComplete:"off"},r.a.createElement(O.Image,{cloudName:"deolievif",publicId:t.selectedProfile.profileImage,width:"100%",height:"100%"}),r.a.createElement(V.a,{disabled:!0,id:"standard-name",label:"Namn",className:a.textField,value:l.name,margin:"normal"}),r.a.createElement(V.a,{id:"standard-name",label:"Favoritlag",className:a.textField,value:l.favoriteTeam,disabled:!0,margin:"normal"}),r.a.createElement(V.a,{id:"standard-name",label:"Lag",className:a.textField,value:l.playerTeam,disabled:!0,margin:"normal"}),r.a.createElement(V.a,{id:"standard-name",label:"Position",className:a.textField,value:l.position,disabled:!0,margin:"normal"}),r.a.createElement(V.a,{id:"standard-name",label:"Tr\xf6jnummer",className:a.textField,value:l.shirtNumber,disabled:!0,margin:"normal"}),r.a.createElement(W,{store:t,user:t.selectedProfile})))}),Y=a(364),X=Object(c.a)(function(e){return{card:{marginTop:"10px"},media:{height:0,paddingTop:"56.25%"},expand:{transform:"rotate(0deg)",marginLeft:"auto",transition:e.transitions.create("transform",{duration:e.transitions.duration.shortest})},expandOpen:{transform:"rotate(180deg)"},avatar:{backgroundColor:S.a[500]}}});function Q(e,t){e.setVisibility(t);var a=document.getElementById(e.id);a?t?a.play():a.pause():console.log("not found")}var $=Object(x.a)(function(e){var t=e.store,a=X();function i(e){var t=e.item;if(t.isDone){var a={color:"green"};return"MEDIUM"===t.game.category&&(a.color="orange"),"HARD"===t.game.category&&(a.color="red"),r.a.createElement(R.a,{style:a})}return t.isRejected?r.a.createElement(F.a,null):r.a.createElement(M.a,null)}return Object(n.useEffect)(function(){setTimeout(function(){t.items.filter(function(e){return e.isVisible}).map(function(e){Q(e,!0)})},1)}),r.a.createElement("div",{className:"item-container"},r.a.createElement("div",{className:"item-list"},r.a.createElement(b.a,{offset:{top:80},onChange:function(e){return function(e,t){t&&e.refresh()}(t,e)}},r.a.createElement("div",{className:"refresh-div"},"dra f\xf6r att ladda")),!t.selectedProfile&&t.filteredItems.map(function(e,n){return r.a.createElement(b.a,{key:e.publicId,onChange:function(t){return Q(e,t)}},r.a.createElement(s.a,{key:e.publicId,className:a.card},r.a.createElement(u.a,{avatar:r.a.createElement(p.a,{"aria-label":"Recipe",className:a.avatar},r.a.createElement(O.Image,{cloudName:"deolievif",publicId:e.user.profileImage,width:"100%",height:"100%"})),action:r.a.createElement(i,{item:e}),title:r.a.createElement("div",{onClick:function(){return t.selectProfile(e.user)}},e.user.name),subheader:e.game.name}),r.a.createElement(m.a,null,r.a.createElement(j,{store:t,settings:e}),e.hasComment&&r.a.createElement("div",{className:"comments"},r.a.createElement(g.a,{variant:"overline",style:{color:"gray",fontSize:"10px"}},"Fr\xe5n tr\xe4naren:"),r.a.createElement(g.a,{variant:"subtitle2"},e.comment))),r.a.createElement(Y.a,null,r.a.createElement(g.a,{variant:"overline",style:{color:"gray"}},e.displayText))))}),t.selectedProfile&&r.a.createElement(q,{store:t})))}),Z=a(368),ee=a(371),te=a(369),ae=a(149),ne=a.n(ae),re=a(84),ie=a.n(re),le=a(85),oe=a.n(le),ce=a(150),se=a.n(ce),ue=a(15),me=a(83),de=a(143),pe=a(144),ge=a.n(pe),fe=Object(c.a)(function(e){return{container:{display:"flex",flexWrap:"wrap"},textField:{marginLeft:e.spacing(1),marginRight:e.spacing(1),width:200},dense:{marginTop:19},menu:{width:200}}});var ve=Object(x.a)(function(e){var t=e.store,a=e.onLogout,n=fe(),i=r.a.useState({id:t.loggedIn.id,name:t.loggedIn.name,userName:t.loggedIn.userName,password:t.loggedIn.password,profileImage:t.loggedIn.profileImage,favoriteTeam:t.loggedIn.favoriteTeam,playerTeam:t.loggedIn.playerTeam,position:t.loggedIn.position,shirtNumber:t.loggedIn.shirtNumber}),l=Object(o.a)(i,2),c=l[0],s=l[1],u=function(e){return function(t){s(Object(de.a)({},c,Object(me.a)({},e,t.target.value)))}};return r.a.createElement("div",{className:"profile"},r.a.createElement("div",{className:"fileinputs"},r.a.createElement("input",{type:"file",className:"file",onChange:function(e){return function(e,a){var n=e.target.files[0];t.uploadImage(n,function(e){})}(e)}}),r.a.createElement("div",{className:"fakefile"},r.a.createElement(f.a,{variant:"outlined"},r.a.createElement(ge.a,null)))),r.a.createElement("form",{className:n.container,noValidate:!0,autoComplete:"off"},r.a.createElement(O.Image,{cloudName:"deolievif",publicId:t.loggedIn.profileImage,width:"100%",height:"100%"}),r.a.createElement(V.a,{id:"name",label:"Namn",className:n.textField,value:c.name,onChange:u("name"),margin:"normal"}),r.a.createElement(V.a,{id:"password",type:"password",label:"L\xf6senord",className:n.textField,value:c.password,onChange:u("password"),margin:"normal"}),r.a.createElement(V.a,{id:"favoriteTeam",label:"Favoritlag",className:n.textField,value:c.favoriteTeam,onChange:u("favoriteTeam"),margin:"normal"}),r.a.createElement(V.a,{id:"playerTeam",label:"Lag",className:n.textField,value:c.playerTeam,onChange:u("playerTeam"),margin:"normal"}),r.a.createElement(V.a,{id:"position",label:"Position",className:n.textField,value:c.position,onChange:u("position"),margin:"normal"}),r.a.createElement(V.a,{id:"shirtNumber",label:"Tr\xf6jnummer",className:n.textField,value:c.shirtNumber,onChange:u("shirtNumber"),margin:"normal"})),r.a.createElement(f.a,{variant:"outlined",onClick:function(){t.updateUser(c)}},"Spara"),r.a.createElement(f.a,{variant:"outlined",onClick:function(){window.localStorage.removeItem("loggedIn"),a()}},"Logga ut"))}),he=a(352),Ee=a(307),be=a(366),ye=a(365),Ne=a(367),we=Object(c.a)(function(e){return{root:{flexGrow:1,width:"100%",backgroundColor:"#f5f5f5"}}});var Ie=Object(x.a)(function(e){var t=e.store,a=we();return r.a.createElement(r.a.Fragment,null,r.a.createElement("div",{style:{marginTop:"60px",textAlign:"center"}},r.a.createElement(g.a,{variant:"h6",gutterBottom:!0},"TOPPLISTA S\xc4SONG 1"),r.a.createElement(g.a,{variant:"overline",style:{color:"gray"},gutterBottom:!0},"max 200 po\xe4ng")),r.a.createElement("div",{className:"highscore"},r.a.createElement(he.a,{className:a.root},t.highScoreList.map(function(e){return r.a.createElement("div",{key:e.id},r.a.createElement(Ee.a,{key:e.id},r.a.createElement(ye.a,null,r.a.createElement(p.a,null,r.a.createElement(O.Image,{cloudName:"deolievif",publicId:e.profileImage,width:"100%",height:"100%"}))),r.a.createElement(be.a,{primary:e.name,secondary:"Po\xe4ng: ".concat(e.highscore)})),r.a.createElement(Ne.a,{variant:"inset",component:"li"}))}))))}),ke=a(145),xe=a.n(ke),Oe=a(154);var je=Object(x.a)(function(e){var t=e.store;function a(e){t.setColorCount(e),t.setRunningApp("COLOR")}return r.a.createElement(Oe.a,{className:"help"},r.a.createElement(g.a,{paragraph:!0},"S\xe4song 1:"),r.a.createElement(g.a,{paragraph:!0},"Varje s\xe4song har 20 utmaningar."),r.a.createElement(g.a,{variant:"h6",paragraph:!0},r.a.createElement(ie.a,null)," Hem"),r.a.createElement("div",{style:{margin:"10px"}},r.a.createElement(g.a,{paragraph:!0},"H\xe4r visas fl\xf6det med alla s\xe4songens anv\xe4ndaruppladde filmer."),r.a.createElement(g.a,{paragraph:!0},r.a.createElement(M.a,null),"Under utv\xe4rdering f\xf6r att se om man klarat det."),r.a.createElement(g.a,{paragraph:!0},r.a.createElement(R.a,null),"Klarad utmaning"),r.a.createElement(g.a,{paragraph:!0},r.a.createElement(F.a,null),"Utmaning misslyckad. Bara att f\xf6rs\xf6ka igen. Kanske hade du inte flytet i utmaningen, eller missf\xf6rt\xe5tt n\xe5got. Kontrollera videon och instruktionerna och f\xf6rs\xf6k igen."),r.a.createElement(g.a,{paragraph:!0},"Om du klickar p\xe5 personens namn s\xe5 kan du se profilen."),r.a.createElement(g.a,{paragraph:!0},"Klicka p\xe5 videon f\xf6r att se den i helsk\xe4rm.")),r.a.createElement(g.a,{variant:"h6",paragraph:!0},r.a.createElement(R.a,null)," Utmaningar"),r.a.createElement("div",{style:{margin:"10px"}},r.a.createElement(g.a,{paragraph:!0},"H\xe4r visas fl\xf6det med alla s\xe4songens utmaningar. Det finns 3 olika niv\xe5er. L\xe4tt, medium, sv\xe5r."),r.a.createElement(g.a,{paragraph:!0},"10 l\xe4tta \xf6vningar, 5 po\xe4ng var"),r.a.createElement(g.a,{paragraph:!0},"5 medium \xf6vningar, 10 po\xe4ng var"),r.a.createElement(g.a,{paragraph:!0},"5 sv\xe5ra \xf6vningar, 20 po\xe4ng var"),r.a.createElement(g.a,{paragraph:!0},r.a.createElement(h.a,null),"Klicka p\xe5 denna f\xf6r att ladda upp en film. Filma alltid i horisontellt l\xe4ge.")),r.a.createElement(g.a,{variant:"h6",paragraph:!0},r.a.createElement(R.a,null)," Topplistan"),r.a.createElement("div",{style:{margin:"10px"}},r.a.createElement(g.a,{paragraph:!0},"Varje s\xe4song best\xe5r av maximalt 200 po\xe4ng. H\xe4r visas vem som f\xe5tt flest po\xe4ng.")),r.a.createElement(g.a,{variant:"h6",paragraph:!0},r.a.createElement(oe.a,null)," Profil"),r.a.createElement("div",{style:{margin:"10px"}},r.a.createElement(g.a,{paragraph:!0},"H\xe4r kan du ladda upp din profilbild och andra anv\xe4ndarinst\xe4llningar.")),r.a.createElement(g.a,{variant:"h6",paragraph:!0},r.a.createElement(xe.a,null)," Verktyg"),r.a.createElement(f.a,{variant:"outlined",onClick:function(){return t.setRunningApp("NUMBER")}},"Nummer"),r.a.createElement(f.a,{variant:"outlined",onClick:function(){return a(2)}},"Color 2 f\xe4rger"),r.a.createElement(f.a,{variant:"outlined",onClick:function(){return a(4)}},"Color 4 f\xe4rger"),r.a.createElement(g.a,{paragraph:!0},"Om det finns nya uppdateringar kan du uppdatera h\xe4r."),r.a.createElement(f.a,{variant:"outlined",onClick:function(){document.location.reload()}},"Uppdatera appen"))}),Ce=a(146),Te=a(147),Le=a(152),Se=a(148),Pe=a(153),Re=function(e){function t(){var e,a;Object(Ce.a)(this,t);for(var n=arguments.length,r=new Array(n),i=0;i<n;i++)r[i]=arguments[i];return(a=Object(Le.a)(this,(e=Object(Se.a)(t)).call.apply(e,[this].concat(r)))).generateRandomNumber=function(e,t){return Math.floor(Math.random()*(t-e+1))+e},a.generateColor=function(){var e=10*a.props.colorCount,t=Math.floor(Math.random()*(e-1+1))+1;return t<10?"yellow":t<20?"red":t<30?"blue":t<40?"white":void 0},a.state={number:a.generateRandomNumber(0,9),color:a.generateColor(),delay:3e3},a.tick=function(){a.setState({number:a.generateRandomNumber(0,9),color:a.generateColor()})},a}return Object(Pe.a)(t,e),Object(Te.a)(t,[{key:"componentDidMount",value:function(){this.interval=setInterval(this.tick,this.state.delay)}},{key:"componentDidUpdate",value:function(e,t){t.delay!==this.state.delay&&(clearInterval(this.interval),this.interval=setInterval(this.tick,this.state.delay))}},{key:"componentWillUnmount",value:function(){clearInterval(this.interval)}},{key:"render",value:function(){var e=this,t=this.props.colorCount?{color:"black"}:{color:"yellow"};return r.a.createElement("div",{style:{backgroundColor:this.state.color},className:"number",onClick:function(){return e.props.store.setRunningApp("MAIN")}},r.a.createElement("div",{className:"inner-number",style:t},this.state.number))}}]),t}(n.Component),De=Object(x.a)(Re);function Fe(e){return r.a.createElement(g.a,{component:"div",style:{padding:24}},e.children)}var Ae=Object(c.a)(function(e){return{root:{flexGrow:1,width:"100%",backgroundColor:"#f5f5f5"}}});var Me=Object(ue.c)(function(e){var t=e.store,a=e.onLogout,i=Ae(),l=Object(n.useState)(0),c=Object(o.a)(l,2),s=c[0],u=c[1];return"NUMBER"===t.appRunning?r.a.createElement(De,{store:t}):"COLOR"===t.appRunning?r.a.createElement(De,{store:t,colorCount:t.colorCount}):r.a.createElement("div",{className:i.root},r.a.createElement(Z.a,{position:"fixed",color:"default"},r.a.createElement(ee.a,{value:s,onChange:function(e,t){u(t)},variant:"scrollable",scrollButtons:"off",indicatorColor:"primary",textColor:"primary"},r.a.createElement(te.a,{icon:r.a.createElement(ie.a,null)}),r.a.createElement(te.a,{icon:r.a.createElement(R.a,null)}),r.a.createElement(te.a,{icon:r.a.createElement(ne.a,null)}),r.a.createElement(te.a,{icon:r.a.createElement(oe.a,null)}),r.a.createElement(te.a,{icon:r.a.createElement(se.a,null)}))),0===s&&r.a.createElement(Fe,null,r.a.createElement($,{store:t})),1===s&&r.a.createElement(Fe,null,r.a.createElement(L,{store:t})),2===s&&r.a.createElement(Fe,null,r.a.createElement(Ie,{store:t})),3===s&&r.a.createElement(Fe,null,r.a.createElement(ve,{store:t,onLogout:a})),4===s&&r.a.createElement(Fe,null,r.a.createElement(je,{store:t})))});function Ue(e){var t=e.store,a=e.onLogin,i=Object(n.useState)(""),l=Object(o.a)(i,2),c=l[0],s=l[1],u=Object(n.useState)(""),m=Object(o.a)(u,2),d=m[0],p=m[1],v=function(e,t){var a=Object(n.useState)(function(){try{var a=window.localStorage.getItem(e);return a?JSON.parse(a):t}catch(n){return console.log(n),t}}),r=Object(o.a)(a,2),i=r[0],l=r[1];return[i,function(t){try{var a=t instanceof Function?t(i):t;l(a),window.localStorage.setItem(e,JSON.stringify(a))}catch(n){console.log(n)}}]}("loggedIn",{userName:void 0}),h=Object(o.a)(v,2),E=(h[0],h[1]);return r.a.createElement("div",{className:"login"},r.a.createElement("img",{className:"login-img",src:"skillsta.jpg",alt:"skillsta"}),r.a.createElement("div",{className:"login-img-wrapper"},r.a.createElement(g.a,{paragraph:!0,variant:"h3"},"skillsta"),r.a.createElement("div",{className:"login-user-name"},r.a.createElement("input",{placeholder:"Anv\xe4ndarnamn",className:"login-input",value:c,onChange:function(e){return s(e.target.value)}})),r.a.createElement("div",{className:"login-password"},r.a.createElement("input",{placeholder:"L\xf6senord",className:"login-input",type:"password",value:d,onChange:function(e){return p(e.target.value)}})),r.a.createElement(f.a,{variant:"contained",onClick:function(e){return function(e){e.preventDefault(),t.login(c.toLowerCase(),d)?(E(t.loggedIn.id),a()):alert("fel anv\xe4ndarnamn/l\xf6senord")}(e)}},"LOGIN")))}var He=a(19),Ve=a.n(He),Be=a(37),Ge=a(7),ze={EASY:"L\xe4tt",MEDIUM:"Medium",HARD:"Sv\xe5r"},Je=Ge.d.model("Level",{id:Ge.d.string,level:Ge.d.integer,details:Ge.d.string,name:Ge.d.string,category:Ge.d.string,publicId:Ge.d.string,season:Ge.d.integer,sharedPath:Ge.d.maybeNull(Ge.d.string)}).volatile(function(e){return{isVisible:!1}}).actions(function(e){return{setPublicId:function(t){e.publicId=t},setName:function(t){e.name=t},setVisibility:function(t){e.isVisible=t}}}).views(function(e){return{get hasSharedPath(){return!!e.sharedPath},get dropboxLink(){return"https://www.dropbox.com/s/".concat(e.sharedPath,"/").concat(e.publicId,".mov?raw=1")},get categoryName(){return ze[e.category]},get isDone(){var t=Object(Ge.c)(e);return t.items.some(function(a){return a.user.id===t.loggedIn.id&&a.isDone&&a.level===e.level})},get points(){return"EASY"===e.category?5:"MEDIUM"===e.category?10:"HARD"===e.category?20:0},get displayText(){return"".concat(e.categoryName," - ").concat(e.points," PO\xc4NG")},get poster(){return{publicId:e.publicId+".jpg",resourceType:"video"}}}});function Ke(e){return e<=9?"0"+e:e}var We=Ge.d.model("Item",{id:Ge.d.string,createdTime:Ge.d.Date,userName:Ge.d.string,publicId:Ge.d.string,level:Ge.d.integer,status:Ge.d.string,sharedPath:Ge.d.maybeNull(Ge.d.string),comment:Ge.d.maybeNull(Ge.d.string)}).volatile(function(e){return{isVisible:!1}}).actions(function(e){return{setVisibility:function(t){e.isVisible=t}}}).views(function(e){return{get hasComment(){return!!e.comment},get hasSharedPath(){return!!e.sharedPath},get dropboxLink(){return"https://www.dropbox.com/s/".concat(e.sharedPath,"/").concat(e.publicId,".mov?raw=1")},get isDone(){return"DONE"===e.status},get isRejected(){return"REJECTED"===e.status},get isWaitingForApproval(){return"WAITINGFORAPPROVAL"===e.status},get date(){return e.createdTime.getFullYear()+"-"+Ke(e.createdTime.getMonth()+1)+"-"+Ke(e.createdTime.getDate())},get user(){return Object(Ge.c)(e).users.find(function(t){return t.userName===e.userName})},get game(){return Object(Ge.c)(e).levels.find(function(t){return t.level===e.level})},get points(){return e.isDone?"EASY"===e.game.category?5:"MEDIUM"===e.game.category?10:"HARD"===e.game.category?20:0:0},get displayText(){return e.isDone?"".concat(e.date," - ").concat(e.game.categoryName," - ").concat(e.points," PO\xc4NG"):"".concat(e.date)},get poster(){return{publicId:e.publicId+".jpg",resourceType:"video"}}}}),_e=Ge.d.model("User",{id:Ge.d.string,userName:Ge.d.string,name:Ge.d.string,password:Ge.d.string,profileImage:Ge.d.string,favoriteTeam:Ge.d.optional(Ge.d.string,""),playerTeam:Ge.d.optional(Ge.d.string,""),position:Ge.d.optional(Ge.d.string,""),shirtNumber:Ge.d.optional(Ge.d.string,"")}).views(function(e){return{get levelStore(){return Object(Ge.c)(e)},get items(){return e.levelStore.items.filter(function(t){return t.userName===e.userName})},get videoList(){return e.items.filter(function(t){return t.isDone&&t.userName===e.userName}).map(function(e){return{id:e.id,img:"http://res.cloudinary.com/deolievif/video/upload/".concat(e.publicId,".jpg"),title:e.name,challange:e.game.name}})},get highscore(){return 0===e.items.length?0:5*e.items.filter(function(e){return e.isDone&&"EASY"===e.game.category}).length+10*e.items.filter(function(e){return e.isDone&&"MEDIUM"===e.game.category}).length+20*e.items.filter(function(e){return e.isDone&&"HARD"===e.game.category}).length},get nextChallange(){return e.levelStore.levels[e.items.length]}}}).actions(function(e){return{setProfileImage:function(t){e.profileImage=t},updateUser:function(t){var a=t.name,n=t.password,r=t.profileImage,i=t.favoriteTeam,l=t.playerTeam,o=t.position,c=t.shirtNumber;e.name=a,e.password=n,e.profileImage=r,e.favoriteTeam=i,e.playerTeam=l,e.position=o,e.shirtNumber=c}}}),qe=[{id:0,text:"Alla utmaningar"},{id:1,text:"Ej klarade utmaningar"},{id:2,text:"Klarade utmaningar"}],Ye="MAIN",Xe=Ge.d.model("LevelStore",{levels:Ge.d.array(Je),items:Ge.d.array(We),users:Ge.d.array(_e)}).views(function(e){return{get filteredItems(){return e.items.filter(function(t){return t.isDone||t.userName===e.loggedIn.userName})},get highScoreList(){var t=e.users.slice(0);return t.sort(function(e,t){var a=e.highscore,n=t.highscore;return a<n?-1:a>n?1:0}),t.reverse()},get filteredLevels(){return 0===e.levelFilter.id?e.levels.filter(function(t){return t.season===e.currentSeason}):1===e.levelFilter.id?e.levels.filter(function(t){return!t.isDone&&t.season===e.currentSeason}):2===e.levelFilter.id?e.levels.filter(function(t){return t.isDone&&t.season===e.currentSeason}):[]},get levelFilters(){return qe}}}).volatile(function(e){return{loggedIn:null,initzialize:!1,height:null,selectedProfile:null,levelFilter:e.levelFilters[0],api:null,appRunning:Ye,colorCount:2,currentSeason:1}}).actions(function(e){return{setColorCount:function(t){e.colorCount=t},setRunningApp:function(t){e.appRunning=t},selectProfile:function(t){e.selectedProfile=t},setLevelFilter:function(t){e.levelFilter=t},fetchAll:function(){var t=Object(Be.a)(Ve.a.mark(function t(){var a,n,r,i;return Ve.a.wrap(function(t){for(;;)switch(t.prev=t.next){case 0:return t.next=2,e.api.getUsers();case 2:return a=t.sent,t.next=5,e.api.fetchLevels();case 5:return n=t.sent,t.next=8,e.api.fetchItems();case 8:return r=t.sent,i={users:[],items:[],levels:[]},n.forEach(function(e){e.fields.id=e.id,i.levels.push(e.fields)}),a.forEach(function(e){e.fields.id=e.id,i.users.push(e.fields)}),r.reverse(),r.forEach(function(e){e.fields.id=e.id,e.fields.createdTime=new Date(e.createdTime),i.items.push(e.fields)}),t.abrupt("return",i);case 15:case"end":return t.stop()}},t)}));return function(){return t.apply(this,arguments)}}(),refresh:function(){var t=Object(Be.a)(Ve.a.mark(function t(){var a;return Ve.a.wrap(function(t){for(;;)switch(t.prev=t.next){case 0:return t.next=2,e.fetchAll();case 2:return a=t.sent,Object(Ge.a)(e,a),t.abrupt("return",!0);case 5:case"end":return t.stop()}},t)}));return function(){return t.apply(this,arguments)}}(),setHeight:function(t){e.height=t},logout:function(){e.loggedIn=null},login:function(t,a){return e.loggedIn=e.users.find(function(e){return e.userName===t&&e.password===a}),!!e.loggedIn},login2:function(t){return e.loggedIn=e.users.find(function(e){return e.id===JSON.parse(t)}),!!e.loggedIn},add:function(t){e.levels.push(t)},addItem:function(t){e.items.push(t)},updateUser:function(t){e.api.updateUser(t)},init:Object(Ge.b)(Ve.a.mark(function t(a,n){var r;return Ve.a.wrap(function(t){for(;;)switch(t.prev=t.next){case 0:return e.api=a,t.next=3,e.fetchAll();case 3:r=t.sent,Object(Ge.a)(e,r),n&&e.login2(n),e.initzialize=!0;case 7:case"end":return t.stop()}},t)})),uploadImage:function(t,a){var n=new FormData;n.append("file",t),n.append("cloud_name","deolievif"),n.append("upload_preset","kv0do7lj"),n.append("title",e.loggedIn.userName),n.append("tags",e.loggedIn.userName);var r=new XMLHttpRequest;r.open("POST","https://api.cloudinary.com/v1_1/deolievif/image/upload",!0),r.onload=function(){var t=JSON.parse(this.responseText);e.loggedIn.setProfileImage(t.public_id),e.updateUser(e.loggedIn),a(this.responseText)},r.send(n)},processFile:function(t,a,n){var r=new FormData;r.append("file",t),r.append("cloud_name","deolievif"),r.append("upload_preset","kv0do7lj"),r.append("resource_type","raw"),r.append("title",e.loggedIn.userName),r.append("tags",e.loggedIn.userName);var i=new XMLHttpRequest;i.open("POST","https://api.cloudinary.com/v1_1/deolievif/video/upload/",!0),i.onload=function(){var t=JSON.parse(this.responseText);console.log(t),console.log(this.responseText);var r={userName:e.loggedIn.userName,publicId:t.public_id,level:a.level,status:"WAITINGFORAPPROVAL"};e.api.insertItem(r),e.refresh(),console.log(e.items),n(this.responseText)},i.send(r)}}}),Qe={base:"appC7N77wl4iVEXGD",table:"Levels",view:"Grid%20view",apiKey:"keyHQ5GM7ktar7YtG",maxRecords:100,url:"https://api.airtable.com/v0/appC7N77wl4iVEXGD"},$e={generalRequest:function(e){var t=e.maxRecords,a=e.table,n=e.view,r=Qe;return t&&(r.maxRecords=t),n&&(r.view=n),a&&(r.table=a),new Request("".concat(Qe.url,"/").concat(r.table,"?maxRecords=").concat(r.maxRecords,"&view=").concat(r.view),{method:"get",headers:new Headers({Authorization:"Bearer ".concat(r.apiKey)})})},response:function(){var e=Object(Be.a)(Ve.a.mark(function e(t){var a,n;return Ve.a.wrap(function(e){for(;;)switch(e.prev=e.next){case 0:return e.next=2,fetch(this.generalRequest(t)).catch(function(e){console.log(e)});case 2:if(!((a=e.sent).status>=200&&a.status<300)){e.next=8;break}return e.next=6,a.json();case 6:return n=e.sent,e.abrupt("return",n.records);case 8:case"end":return e.stop()}},e,this)}));return function(t){return e.apply(this,arguments)}}(),getUsers:function(){var e=Object(Be.a)(Ve.a.mark(function e(){return Ve.a.wrap(function(e){for(;;)switch(e.prev=e.next){case 0:return e.abrupt("return",this.response({table:"Users"}));case 1:case"end":return e.stop()}},e,this)}));return function(){return e.apply(this,arguments)}}(),updateUser:function(e){var t="".concat(Qe.url,"/Users/").concat(e.id);fetch(new Request(t,{method:"put",body:JSON.stringify({fields:{name:e.name,userName:e.userName,password:e.password,profileImage:e.profileImage,favoriteTeam:e.favoriteTeam,playerTeam:e.playerTeam,position:e.position,shirtNumber:e.shirtNumber}}),headers:new Headers({Authorization:"Bearer ".concat(Qe.apiKey),"Content-Type":"application/json"})})).catch(function(e){alert(e)})},fetchLevels:function(){var e=Object(Be.a)(Ve.a.mark(function e(){return Ve.a.wrap(function(e){for(;;)switch(e.prev=e.next){case 0:return e.abrupt("return",this.response({table:"Levels"}));case 1:case"end":return e.stop()}},e,this)}));return function(){return e.apply(this,arguments)}}(),fetchItems:function(){var e=Object(Be.a)(Ve.a.mark(function e(){return Ve.a.wrap(function(e){for(;;)switch(e.prev=e.next){case 0:return e.abrupt("return",this.response({table:"Items"}));case 1:case"end":return e.stop()}},e,this)}));return function(){return e.apply(this,arguments)}}(),insertItem:function(e){fetch(new Request("".concat(Qe.url,"/Items"),{method:"post",body:JSON.stringify({fields:e}),headers:new Headers({Authorization:"Bearer ".concat(Qe.apiKey),"Content-Type":"application/json"})})).catch(function(e){console.log(e)})}},Ze=Xe.create();Ze.init($e,window.localStorage.getItem("loggedIn"));var et=Object(ue.c)(function(){var e=Object(n.useState)("Login"),t=Object(o.a)(e,2),a=t[0],i=t[1];if(Object(n.useEffect)(function(){Ze.setHeight(window.innerHeight)},[]),!Ze.initzialize)return r.a.createElement("div",{style:{marginTop:"100px",textAlign:"center"}},"LADDAR...");if(Ze.initzialize&&Ze.loggedIn)return r.a.createElement(Me,{store:Ze,onLogout:function(){Ze.logout(),i("Login")}});var l="Login"===a?r.a.createElement(Ue,{store:Ze,onLogin:i}):r.a.createElement(Me,{store:Ze});return r.a.createElement("div",{id:"outer-container"},r.a.createElement("main",{id:"page-wrap"},r.a.createElement("div",{className:"App"},r.a.createElement("header",{className:"App-header"},l))))});Boolean("localhost"===window.location.hostname||"[::1]"===window.location.hostname||window.location.hostname.match(/^127(?:\.(?:25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)){3}$/));l.a.render(r.a.createElement(et,null),document.getElementById("root")),"serviceWorker"in navigator&&navigator.serviceWorker.ready.then(function(e){e.unregister()})}},[[162,1,2]]]);
//# sourceMappingURL=main.b9a08e46.chunk.js.map