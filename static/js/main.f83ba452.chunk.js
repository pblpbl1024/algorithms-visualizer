(this["webpackJsonpalgorithms-visualizer"]=this["webpackJsonpalgorithms-visualizer"]||[]).push([[0],{55:function(t,e,a){},59:function(t,e,a){"use strict";a.r(e);var r=a(3),i=a(0),s=a(20),n=a.n(s),o=a(27),c=a(28),h=a(34),l=a(32),d=function(t){Object(h.a)(a,t);var e=Object(l.a)(a);function a(){var t;Object(o.a)(this,a);for(var r=arguments.length,i=new Array(r),s=0;s<r;s++)i[s]=arguments[s];return(t=e.call.apply(e,[this].concat(i))).state={displayBio:!1,displayScores:!1},t.toggleBio=function(){t.setState({displayBio:!t.state.displayBio})},t.toggleScores=function(){t.setState({displayScores:!t.state.displayScores})},t}return Object(c.a)(a,[{key:"render",value:function(){return Object(r.jsxs)("div",{children:[Object(r.jsx)("h2",{children:"Algorithms Visualizer"}),Object(r.jsx)("p",{children:"This is a project I made to visualize various algorithms in computer science."}),Object(r.jsx)("hr",{}),Object(r.jsx)("h4",{children:"Sort"}),Object(r.jsx)("p",{children:"Simulates various sorting algorithms on an array. Includes merge sort, heap sort, bubble sort, and quick sort."}),Object(r.jsx)("hr",{}),Object(r.jsx)("h4",{children:"Graph"}),Object(r.jsx)("p",{children:"Simulates graph theory algorithms on a grid of nodes."})]})}}]),a}(i.Component),u=a(45),b=a(62),j=a(61),m=a(63);function y(t,e,a,r){if(a!=r){var i=Math.floor((a+r)/2);y(t,e,a,i),y(t,e,i+1,r);for(var s=[],n=[],o=a;o<=i;o++)s.push(t[o]);s.push(Number.MAX_SAFE_INTEGER);for(var c=i+1;c<=r;c++)n.push(t[c]);n.push(Number.MAX_SAFE_INTEGER);for(var h=a,l=0,d=0;h<=r;h++){var u=l==s.length-1?-1:a+l,b=d==n.length-1?-1:i+1+d;e.push([u,b,1]),s[l]<=n[d]?(e.push([h,s[l],2]),t[h]=s[l++]):(e.push([h,n[d],2]),t[h]=n[d++]),e.push([u,b,0])}}}function g(t,e,a,r){for(var i=t.length-1;i>0;i--)for(var s=0;s<i;s++){if(e.push([s,s+1,1]),t[s]>t[s+1]){var n=t[s];t[s]=t[s+1],t[s+1]=n,e.push([s,s+1,3])}e.push([s,s+1,0])}}function p(t,e){return Math.floor(Math.random()*(e-t+1)+t)}var v=function(t){Object(h.a)(a,t);var e=Object(l.a)(a);function a(){var t;Object(o.a)(this,a);for(var r=arguments.length,i=new Array(r),s=0;s<r;s++)i[s]=arguments[s];return(t=e.call.apply(e,[this].concat(i))).timeouts=[],t.state={array:[],anim:[],btnActive:!0,showModal:!0,arraySize:180,animDelay:3,arrayWidth:(window.innerWidth-80)/360,arrayMargin:(window.innerWidth-80)/720},t.updWidth=function(){t.setState({arrayWidth:(window.innerWidth-80)/360,arrayMargin:(window.innerWidth-80)/720})},t.hideModal=function(){t.setState({showModal:!1})},t.resetArray=function(){for(var e=[],a=0;a<t.state.arraySize;a++)e.push(p(100,600));t.setState({array:e})},t.playAnimations=function(){for(var e=function(e){var a=document.getElementsByClassName("array-bar"),r=Object(u.a)(t.state.anim[e],3),i=r[0],s=r[1];switch(r[2]){case 0:t.timeouts.push(setTimeout((function(){-1!==i&&(a[i].style.backgroundColor="lightskyblue"),-1!==s&&(a[s].style.backgroundColor="lightskyblue")}),e*t.state.animDelay));break;case 1:t.timeouts.push(setTimeout((function(){-1!==i&&(a[i].style.backgroundColor="crimson"),-1!==s&&(a[s].style.backgroundColor="crimson")}),e*t.state.animDelay));break;case 2:t.timeouts.push(setTimeout((function(){t.state.array[i]=s,a[i].style.height="".concat(s/10,"vh")}),e*t.state.animDelay));break;case 3:t.timeouts.push(setTimeout((function(){var e=t.state.array[i];t.state.array[i]=t.state.array[s],t.state.array[s]=e,a[i].style.height="".concat(t.state.array[i]/10,"vh"),a[s].style.height="".concat(t.state.array[s]/10,"vh")}),e*t.state.animDelay))}},a=0;a<t.state.anim.length;a++)e(a);t.timeouts.push(t.timeout=setTimeout((function(){t.setState({btnActive:!0})}),t.state.anim.length*t.state.animDelay))},t.bubbleSort=function(){t.setState({anim:[],btnActive:!1}),g(t.state.array.slice(),t.state.anim,0,t.state.array.length),t.playAnimations()},t.mergeSort=function(){t.setState({anim:[],btnActive:!1}),y(t.state.array.slice(),t.state.anim,0,t.state.array.length-1),t.playAnimations()},t.quickSort=function(){},t.heapSort=function(){},t.stopAlgorithm=function(){for(var e=document.getElementsByClassName("array-bar"),a=0;a<e.length;a++)e[a].style.backgroundColor="lightskyblue";for(a=0;a<t.timeouts.length;a++)clearTimeout(t.timeouts[a]);t.setState({btnActive:!0})},t.changedSize=function(e){t.setState({arraySize:e.target.value})},t.changedDelay=function(e){t.setState({animDelay:e.target.value})},t}return Object(c.a)(a,[{key:"componentDidMount",value:function(){this.resetArray(),window.addEventListener("resize",this.updWidth),console.log(.003*window.innerWidth)}},{key:"componentWillUnmount",value:function(){for(var t=0;t<this.timeouts.length;t++)clearTimeout(this.timeouts[t]);window.removeEventListener("resize",this.updWidth)}},{key:"render",value:function(){var t=this,e=this.state.array;return Object(r.jsxs)("div",{children:[Object(r.jsxs)(b.a,{show:this.state.showModal,size:"lg","aria-labelledby":"contained-modal-title-vcenter",centered:!0,children:[Object(r.jsxs)(b.a.Body,{children:[Object(r.jsx)("h4",{children:"Sorting Visualizer"}),Object(r.jsx)("p",{children:"This app visualizes sorting algorithms on an array. Here are the algorithms it supports:"}),Object(r.jsx)("hr",{}),Object(r.jsx)("h5",{children:"Bubble Sort"}),Object(r.jsx)("p",{children:"A simple sorting algorithm that repeatedly steps through the list, compares adjacent elements and swaps them if they are in the wrong order."}),Object(r.jsx)("hr",{}),Object(r.jsx)("h5",{children:"Merge Sort"}),Object(r.jsx)("p",{children:"A divide and conquer sorting algorithm that merges two sorted arrays in O(n) time."}),Object(r.jsx)("hr",{}),Object(r.jsx)("h5",{children:"Heap Sort"}),Object(r.jsx)("p",{children:"A comparison-based sorting algorithm that reduces unsorted regions by extracting the largest element from it and inserting it into the sorted regions."}),Object(r.jsx)("hr",{}),Object(r.jsx)("h5",{children:"Quick Sort"}),Object(r.jsx)("p",{children:"A divide and conquer sorting algorithm that uses a pivot to sort subarrays recursively."})]}),Object(r.jsx)(b.a.Footer,{children:Object(r.jsx)(j.a,{onClick:this.hideModal,children:"Close"})})]}),Object(r.jsx)("div",{className:"array-bar-fake",style:{height:"".concat(65,"vh")}}),e.map((function(e,a){return Object(r.jsx)("div",{className:"array-bar",style:{height:"".concat(e/10,"vh"),width:t.state.arrayWidth,margin:"0px ".concat(t.state.arrayMargin,"px")}},a)})),Object(r.jsx)("div",{className:"array-bar-fake",style:{height:"".concat(65,"vh")}}),Object(r.jsx)("hr",{}),Object(r.jsxs)("div",{style:{display:"inline-block"},children:[Object(r.jsx)(j.a,{variant:"success",disabled:!this.state.btnActive,onClick:this.resetArray,children:"New Array"}),Object(r.jsx)(j.a,{variant:"primary",disabled:!this.state.btnActive,onClick:this.bubbleSort,children:"Bubble Sort"}),Object(r.jsx)(j.a,{variant:"info",disabled:!this.state.btnActive,onClick:this.mergeSort,children:"Merge Sort"}),Object(r.jsx)(j.a,{variant:"secondary",disabled:!this.state.btnActive,onClick:this.quickSort,children:"Quick Sort"}),Object(r.jsx)(j.a,{variant:"dark",disabled:!this.state.btnActive,onClick:this.heapSort,children:"Heap Sort"}),Object(r.jsx)(j.a,{variant:"danger",disabled:this.state.btnActive,onClick:this.stopAlgorithm,children:"Stop Algorithm"}),Object(r.jsx)(m.a,{children:Object(r.jsxs)(m.a.Group,{controlId:"formBasicRange",children:[Object(r.jsxs)(m.a.Label,{children:["Array Size: ",this.state.arraySize]}),Object(r.jsx)(m.a.Control,{disabled:!this.state.btnActive,type:"range",defaultValue:this.state.arraySize,min:"10",max:"180",tooltip:"auto",onChange:function(e){return t.changedSize(e)}}),Object(r.jsxs)(m.a.Label,{children:["Animation Delay: ",this.state.animDelay," ms"]}),Object(r.jsx)(m.a.Control,{disabled:!this.state.btnActive,type:"range",defaultValue:this.state.animDelay,min:"1",max:"200",tooltip:"auto",onChange:function(e){return t.changedDelay(e)}})]})})]})]})}}]),a}(i.Component),O=a(65),f=a(64),x=a.p+"static/media/icon.df8e9b2c.png",S=function(t){var e=t.Component,a=t.activeKey;return Object(r.jsxs)("div",{children:[Object(r.jsxs)(O.a,{bg:"dark",variant:"dark",children:[Object(r.jsx)(O.a.Brand,{href:"#/",children:Object(r.jsx)("img",{src:x,alt:"Icon",className:"icon"})}),Object(r.jsxs)(f.a,{activeKey:a,className:"mr-auto",children:[Object(r.jsx)(f.a.Link,{href:"#/",children:"Home"}),Object(r.jsx)(f.a.Link,{href:"#/sort",children:"Sort"})]})]}),Object(r.jsx)(e,{})]})},k=a(43),A=a(7);a(55);n.a.render(Object(r.jsxs)(k.a,{basename:"/",children:[Object(r.jsx)(A.a,{exact:!0,path:"/",render:function(){return Object(r.jsx)(S,{Component:d,activeKey:"#/"})}}),Object(r.jsx)(A.a,{path:"/sort",render:function(){return Object(r.jsx)(S,{Component:v,activeKey:"#/sort"})}})]}),document.getElementById("root"))}},[[59,1,2]]]);
//# sourceMappingURL=main.f83ba452.chunk.js.map