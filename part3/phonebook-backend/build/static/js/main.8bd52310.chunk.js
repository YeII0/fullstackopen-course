(this.webpackJsonpphonebook=this.webpackJsonpphonebook||[]).push([[0],{39:function(e,n,t){},40:function(e,n,t){"use strict";t.r(n);var c=t(15),r=t.n(c),o=t(6),a=t(3),u=t(2),i=t(4),s=t.n(i),b="/api/persons",j={getAll:function(){return s.a.get(b).then((function(e){return e.data}))},create:function(e){return s.a.post(b,e).then((function(e){return e.data}))},remove:function(e){return s.a.delete("".concat(b,"/").concat(e)).then((function(e){return e.data}))},update:function(e,n){return s.a.put("".concat(b,"/").concat(e),n).then((function(e){return e.data}))}},d=t(0),f=function(e){var n=e.onChange;return Object(d.jsx)("input",{onChange:n})},l=function(e){var n=e.onSubmit,t=e.newName,c=e.newNumber,r=e.nameOnChange,o=e.numberOnChange;return Object(d.jsxs)("form",{onSubmit:n,children:[Object(d.jsxs)("div",{children:["name: ",Object(d.jsx)("input",{value:t,onChange:r})]}),Object(d.jsxs)("div",{children:["number: ",Object(d.jsx)("input",{value:c,onChange:o})]}),Object(d.jsx)("div",{children:Object(d.jsx)("button",{type:"submit",children:"add"})})]})},m=function(e){var n=e.contacts,t=e.removeContact;return Object(d.jsx)("div",{children:n.map((function(e){return Object(d.jsx)(h,{contact:e,removeContact:t},e.id)}))})},h=function(e){var n=e.contact,t=e.removeContact;return Object(d.jsxs)("div",{children:[n.name," ",n.number,Object(d.jsx)("button",{onClick:function(){return t(n)},children:"delete"})]})},O=function(e){var n=e.message,t=e.notificationType;if(null===n)return null;if("error"!==t&&"success"!==t&&null!==t)throw Error("Incorrect notificationType parameter. Accepted values are 'error' and 'success' strings.");return Object(d.jsx)("div",{className:"notification ".concat(t),children:n})},v=function(){var e=Object(u.useState)([]),n=Object(a.a)(e,2),t=n[0],c=n[1],r=Object(u.useState)([]),i=Object(a.a)(r,2),s=i[0],b=i[1],h=Object(u.useState)(""),v=Object(a.a)(h,2),p=v[0],x=v[1],g=Object(u.useState)(""),C=Object(a.a)(g,2),w=C[0],y=C[1],S=Object(u.useState)(""),T=Object(a.a)(S,2),k=T[0],N=T[1],A=Object(u.useState)(null),E=Object(a.a)(A,2),D=E[0],I=E[1],J=Object(u.useState)(null),L=Object(a.a)(J,2),B=L[0],P=L[1];Object(u.useEffect)((function(){j.getAll().then((function(e){c(e)}))}),[]);var q=function(e,n){if(""===e)return b([]),void x(e);var t=n.filter((function(n){return n.name.toLowerCase().includes(e.toLowerCase())}));b(t),x(e)},z=function(e,n){var r=Object(o.a)(Object(o.a)({},e),{},{number:n});j.update(e.id,r).then((function(n){var r=t.map((function(t){return t.id!==e.id?t:n}));c(r),q(p,r)})).catch((function(e){I(e.response.data.error),P("error"),setTimeout((function(){I(null)}),1e4)}))};return Object(d.jsxs)("div",{children:[Object(d.jsx)("h2",{children:"Phonebook"}),Object(d.jsx)(O,{message:D,notificationType:B}),Object(d.jsxs)("div",{children:["Search: ",Object(d.jsx)(f,{onChange:function(e){return q(e.target.value,t)}})]}),Object(d.jsx)("h2",{children:"Add new"}),Object(d.jsx)(l,{onSubmit:function(e){if(e.preventDefault(),t.some((function(e){return e.number===k})))return alert("".concat(k," is already added to phonebook"));var n=t.find((function(e){return e.name===w}));if(n){if(!window.confirm("This contact already exists. Do you want update number?"))return;z(n,k)}else{var r={name:w,number:k};j.create(r).then((function(e){var n=t.concat(e);c(n),q(p,n),I("Contact added successfully"),P("success"),setTimeout((function(){I(null)}),4e3)})).catch((function(e){I(e.response.data.error),P("error"),setTimeout((function(){I(null)}),1e4)})),y(""),N("")}},newName:w,newNumber:k,nameOnChange:function(e){y(e.target.value)},numberOnChange:function(e){N(e.target.value)}}),Object(d.jsx)("h2",{children:"Numbers"}),Object(d.jsx)(m,{contacts:""===p?t:s,removeContact:function(e){j.remove(e.id).catch((function(n){I("Contact ".concat(e.name," does not exist anymore.")),P("error"),setTimeout((function(){I(null)}),4e3)})).finally((function(){var n=t.filter((function(n){return n.id!==e.id}));c(n),q(p,n)}))}})]})};t(39);r.a.render(Object(d.jsx)(v,{}),document.getElementById("root"))}},[[40,1,2]]]);
//# sourceMappingURL=main.8bd52310.chunk.js.map