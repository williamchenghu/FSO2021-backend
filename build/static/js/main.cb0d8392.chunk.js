(this.webpackJsonpphonebook=this.webpackJsonpphonebook||[]).push([[0],{40:function(e,t,n){"use strict";n.r(t);var r=n(1),c=n.n(r),a=n(16),o=n.n(a),s=n(3),i=n(4),u=n.n(i),d="/api/persons",l={getAll:function(){return u.a.get(d).then((function(e){return e.data}))},create:function(e){return u.a.post(d,e).then((function(e){return e.data}))},update:function(e,t){return u.a.put("".concat(d,"/").concat(e),t).then((function(e){return e.data}))},remove:function(e){return u.a.delete("".concat(d,"/").concat(e)).then((function(e){return e.data}))}},b=n(0),j=function(e){var t=e.inputLable,n=e.inputValue,r=e.changeHandler;return Object(b.jsxs)("div",{children:[t," ",Object(b.jsx)("input",{value:n,onChange:r})]})},m=function(e){var t=e.personList,n=e.setPersonList,r=e.newName,c=e.newNumber,a=e.setNewName,o=e.setNewNumber,s=e.setMessageType,i=e.setMessage;return Object(b.jsx)(b.Fragment,{children:Object(b.jsxs)("form",{onSubmit:function(e){e.preventDefault();var u={name:r,number:c};t.find((function(e){return e.name===r}))?window.confirm("".concat(r," is already added to phonebook, replace the old number with a new one?"))&&l.update(t.find((function(e){return e.name===r})).id,u).then((function(e){console.log("updatedPerson",e),s(!0),i("Phone number of ".concat(e.name," updated.")),setTimeout((function(){s(),i(null)}),3e3),n(t.filter((function(e){return e.name!==r})).concat(e))})).catch((function(e){s(!1),i("".concat(u.name," info cannot be updated, maybe it was removed?")),setTimeout((function(){i(null),s()}),3e3),console.log("err",e)})):l.create(u).then((function(e){s(!0),n(t.concat(e)),i("Added ".concat(e.name)),setTimeout((function(){s(),i(null)}),3e3),a(""),o("")})).catch((function(e){return console.log("oops, sth had gone wrong...",e)}))},children:[Object(b.jsx)(j,{inputLable:"name: ",inputValue:r,changeHandler:function(e){return a(e.target.value)}}),Object(b.jsx)(j,{inputLable:"number: ",inputValue:c,changeHandler:function(e){return o(e.target.value)}}),Object(b.jsx)("div",{children:Object(b.jsx)("button",{type:"submit",children:"add"})})]})})},f=function(e){var t=e.filter,n=e.setFilter,r=e.filterLable;return Object(b.jsxs)("div",{children:[r,Object(b.jsx)("input",{value:t,onChange:function(e){return n(e.target.value)}})]})},h=function(e){var t=e.text,n=e.eventHandler;return Object(b.jsx)(b.Fragment,{children:Object(b.jsx)("button",{onClick:n,children:t})})},g=function(e){var t=e.id,n=e.name,r=e.number,c=e.setMessage,a=e.setMessageType;return Object(b.jsxs)("div",{children:[n," ",r,Object(b.jsx)(h,{text:"delete",eventHandler:function(){window.confirm("Delete ".concat(n,"?"))&&l.remove(t).catch((function(e){a(!1),c("".concat(n," cannot be deleted, maybe it has been already!")),setTimeout((function(){c(null),a()}),3e3),console.log("err",e)}))}})]})},p=function(e){var t=e.personList,n=e.personFilter,r=e.setMessageType,c=e.setMessage;return Object(b.jsx)(b.Fragment,{children:n?t.filter((function(e){return e.name.toLowerCase().includes(n.toLowerCase())})).map((function(e){return Object(b.jsx)(g,{id:e.id,name:e.name,number:e.number,setMessageType:r,setMessage:c},e.id)})):t.map((function(e){return Object(b.jsx)(g,{id:e.id,name:e.name,number:e.number,setMessageType:r,setMessage:c},e.id)}))})},O=function(e){var t=e.message,n=e.messageType;return void 0===n?Object(b.jsx)(b.Fragment,{}):n?Object(b.jsx)("div",{style:{color:"#82B366",background:"#D5E8D4",fontSize:20,borderStyle:"solid",borderRadius:5,padding:10,marginBottom:10},children:t}):Object(b.jsx)("div",{style:{color:"#b85450",background:"#f8cecc",fontSize:20,borderStyle:"solid",borderRadius:5,padding:10,marginBottom:10},children:t})},x=function(){var e=Object(r.useState)([]),t=Object(s.a)(e,2),n=t[0],c=t[1],a=Object(r.useState)(""),o=Object(s.a)(a,2),i=o[0],u=o[1],d=Object(r.useState)(""),j=Object(s.a)(d,2),h=j[0],g=j[1],x=Object(r.useState)(""),v=Object(s.a)(x,2),w=v[0],y=v[1],M=Object(r.useState)(null),L=Object(s.a)(M,2),N=L[0],T=L[1],S=Object(r.useState)(),k=Object(s.a)(S,2),F=k[0],C=k[1];return Object(r.useEffect)((function(){l.getAll().then((function(e){return c(e)})).catch((function(e){return console.log("oops, sth had gone wrong...",e)}))}),[]),Object(b.jsxs)("div",{children:[Object(b.jsx)("h2",{children:"Phonebook"}),Object(b.jsx)(O,{message:N,messageType:F}),Object(b.jsx)(f,{filter:i,setFilter:u,filterLable:"filter shown with "}),Object(b.jsx)("h3",{children:"Add a new"}),Object(b.jsx)(m,{personList:n,setPersonList:c,newName:h,newNumber:w,setNewName:g,setNewNumber:y,setMessageType:C,setMessage:T}),Object(b.jsx)("h3",{children:"Numbers"}),Object(b.jsx)(p,{personList:n,personFilter:i,setMessageType:C,setMessage:T})]})};o.a.render(Object(b.jsx)(c.a.StrictMode,{children:Object(b.jsx)(x,{})}),document.getElementById("root"))}},[[40,1,2]]]);
//# sourceMappingURL=main.cb0d8392.chunk.js.map