(this.webpackJsonpphonebook=this.webpackJsonpphonebook||[]).push([[0],{13:function(e,n,t){},15:function(e,n,t){e.exports=t(38)},37:function(e,n,t){},38:function(e,n,t){"use strict";t.r(n);var a=t(0),r=t.n(a),o=t(14),u=t.n(o),c=t(2),l=function(e){var n=e.persons,t=e.newFilter,a=e.remove;return r.a.createElement("div",null,r.a.createElement("h3",null,"Numbers"),n.filter((function(e){return e.name.toLowerCase().includes(t.toLowerCase())})).map((function(e){return r.a.createElement("div",{key:e.name},e.name," ",e.number," ",r.a.createElement("button",{onClick:function(){return a(e.id)}},"delete"))})))},i=function(e){var n=e.value,t=e.onChange;return r.a.createElement("div",null,r.a.createElement("h2",null,"Phonebook"),r.a.createElement("input",{value:n,onChange:t}))},m=function(e){var n=e.message,t=e.type;return null===n?null:"error"===t?r.a.createElement("div",{className:"error"},n):r.a.createElement("div",{className:"notification"},n)},d=function(e){return r.a.createElement("div",null,r.a.createElement("h3",null,"add a new "),r.a.createElement("form",{onSubmit:e.addPerson},r.a.createElement("div",null,"name: ",r.a.createElement("input",{value:e.newName,onChange:e.handleNameChange})),r.a.createElement("div",null,"number: ",r.a.createElement("input",{value:e.newNumber,onChange:e.handleNumberChange})),r.a.createElement("div",null,r.a.createElement("button",{type:"submit"},"add"))))},f=t(3),s=t.n(f),h="/api/persons",b=function(){return s.a.get(h).then((function(e){return e.data}))},v=function(e){return s.a.post(h,e).then((function(e){return e.data}))},p=function(e,n){return s.a.put("".concat(h,"/").concat(e),n).then((function(e){return e.data}))},E=function(e){return s.a.delete("".concat(h,"/").concat(e))},w=(t(37),t(13),function(){var e=Object(a.useState)([]),n=Object(c.a)(e,2),t=n[0],o=n[1],u=Object(a.useState)(""),f=Object(c.a)(u,2),s=f[0],h=f[1],w=Object(a.useState)(""),g=Object(c.a)(w,2),C=g[0],y=g[1],O=Object(a.useState)(""),j=Object(c.a)(O,2),N=j[0],k=j[1],S=Object(a.useState)(null),L=Object(c.a)(S,2),T=L[0],J=L[1],P=Object(a.useState)(null),x=Object(c.a)(P,2),D=x[0],F=x[1];Object(a.useEffect)((function(){b().then((function(e){o(e)}))}),[]);var A=function(e,n){var a=t.find((function(n){return n.name.toLowerCase()===e.toLowerCase()}));a.number=n,p(a.id,a).then((function(e){o(t.map((function(n){return n.id!==a.id?n:e})))})).then((function(e){J("".concat(a.name,"'s number updated")),F("notification"),setTimeout((function(){J(null),F(null)}),5e3)})).catch((function(e){J("".concat(a.name," has already been deleted")),F("error"),setTimeout((function(){J(null),F(null)}),5e3)}))};return r.a.createElement("div",null,r.a.createElement(i,{value:C,onChange:function(e){y(e.target.value)}}),r.a.createElement("p",null),r.a.createElement(m,{message:T,type:D}),r.a.createElement(d,{newName:s,handleNameChange:function(e){h(e.target.value)},newNumber:N,handleNumberChange:function(e){k(e.target.value)},addPerson:function(e){e.preventDefault();var n={name:s,number:N};if(t.some((function(e){return e.name.toLowerCase()===n.name.toLowerCase()}))){if(!window.confirm("".concat(n.name," is already added to the phonebook. Do you want to replace the old number with a new one?"))){return J({type:"notification",text:"Number was not changed"}),void setTimeout((function(){J(null)}),5e3)}A(n.name,n.number),h(""),k("")}else v(n).then((function(e){o(t.concat(e)),J("".concat(n.name," added")),F("notification"),setTimeout((function(){J(null)}),5e3),h(""),k("")})).catch((function(e){var n=JSON.stringify(e.response.data);console.log(e.response.data),J("".concat(n)),F("error"),setTimeout((function(){J(null),F(null)}),5e3)}))}}),r.a.createElement(l,{persons:t,newFilter:C,remove:function(e){var n=t.find((function(n){return n.id===e}));window.confirm("Are you sure you want to delete the entry ".concat(n.name,"?"))&&E(e).catch((function(e){F("error"),J("".concat(n.name," has already been deleted")),F("error"),setTimeout((function(){J(null),F(null)}),5e3)})).then((function(n){var a=t.filter((function(n){return n.id!==e}));o(a)}))}}))});u.a.render(r.a.createElement(w,null),document.getElementById("root"))}},[[15,1,2]]]);
//# sourceMappingURL=main.0cffbc26.chunk.js.map