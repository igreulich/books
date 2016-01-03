webpackJsonp([1],{0:function(e,t,a){"use strict";var n=function(e){return e&&e.__esModule?e["default"]:e},s=n(a(1)),r=a(168).render,o=n(a(202)),i=n(a(206)),l=n(a(204)),c=n(a(207)),u=s.createClass({displayName:"App",mixins:[o],getInitialState:function(){return{uid:"",ref:new Firebase("https://gobooks.firebaseio.com/items/"),books:[],query:"",searchBooks:[],errorMessage:""}},componentWillMount:function(){this.bindAsArray(this.state.ref,"books"),this.bindAsArray(this.state.ref,"searchBooks")},componentWillUnmount:function(){this.unbind("books")},render:function(){return s.createElement("div",null,s.createElement(i,{user:this.state.uid,query:this.state.query,onLogin:this.login,onLogout:this.logout,onSearch:this.search}),s.createElement(l,{user:this.state.uid,books:this.state.books,onEdit:this.edit,onUpdate:this.update,onDestroy:this.destroy,onAsecSort:this.asecSort,onDescSort:this.descSort}),s.createElement(c,{user:this.state.uid,onSubmit:this.submit}))},login:function(){var e=this,t=this.state.ref;t.authWithOAuthPopup("github",function(t,a){t?console.log("Login Failed! ",t):e.setState({uid:a.uid})})},logout:function(){var e=this.state.ref;e.unauth(),this.setState({uid:""})},search:function(e){var t=this.state.searchBooks,a=[];t.forEach(function(t){-1!==t.name.toLowerCase().indexOf(e.toLowerCase())&&a.push(t)}),this.setState({query:e,books:a})},edit:function(e){var t=this.state.books,a=t.indexOf(e);t[a].isEditing=!0,this._updateItems(t)},update:function(e){var t=this.state.books,a=t.filter(function(t){return t.id===e.id});a=a[0];var n=t.indexOf(a);e.isEditing=!1,t[n]=e,this._updateItems(t)},destroy:function(e){var t=this.state.books,a=t.filter(function(t){return t.id!==e.id});this._updateItems(a)},submit:function(e){this.state.ref.push({id:Date.now(),name:e.name,author:e.author})},asecSort:function(){var e=this.state.books,t=function(e,t){var a=0;return e.name<t.name&&(a=-1),e.name>t.name&&(a=1),a};this.setState({books:e.sort(t)})},descSort:function(){var e=this.state.books,t=function(e,t){var a=0;return e.name<t.name&&(a=1),e.name>t.name&&(a=-1),a};this.setState({books:e.sort(t)})},_updateItems:function(e){var t=this.state.ref;t.set(e),this.setState({searchItems:e})}});r(s.createElement(u,null),document.getElementById("app"))},203:function(e,t,a){"use strict";var n=function(e){return e&&e.__esModule?e["default"]:e},s=n(a(1));e.exports=s.createClass({displayName:"BookItem",render:function(){var e={display:this.props.user?"":"none"};return s.createElement("tr",null,s.createElement("td",null,this.props.book.name," ",s.createElement("span",{className:"pull-right",style:e},s.createElement("a",{href:"#",onClick:this.edit},"edit")," | ",s.createElement("a",{href:"#",onClick:this.destroy},"delete"))),s.createElement("td",null,this.props.book.author))},edit:function(e){e.preventDefault(),this.props.onEdit()},destroy:function(e){e.preventDefault(),this.props.onDestroy()}})},204:function(e,t,a){"use strict";var n=function(e){return e&&e.__esModule?e["default"]:e},s=n(a(1)),r=n(a(203)),o=n(a(205)),i=a(43),l=i.Grid,c=i.Row;e.exports=s.createClass({displayName:"BookList",getInitialState:function(){return{selectedBook:""}},render:function(){var e=this,t=function(t){return t.isEditing?s.createElement(o,{key:t.id,book:t,onUpdate:e.props.onUpdate}):s.createElement(r,{key:t.id,book:t,user:e.props.user,onEdit:function(){return e.props.onEdit(t)},onDestroy:function(){return e.props.onDestroy(t)}})};return s.createElement("section",{className:"players"},s.createElement(l,null,s.createElement("div",{className:"email-wrapper"},s.createElement("h3",{className:"pull-left"},"Greulich's Books"),s.createElement("h4",{className:"pull-right"},"Total: ",this.props.books.length),s.createElement("div",{className:"clearfix"})),s.createElement(c,{className:"table-wrapper"},s.createElement("table",{className:"table table-striped"},s.createElement("thead",null,s.createElement("tr",null,s.createElement("th",{className:"table-name"},"Book ",s.createElement("span",{className:"pull-right"},s.createElement("a",{href:"#",onClick:this.props.onAsecSort},s.createElement("span",{className:"glyphicon glyphicon-chevron-up"})),s.createElement("a",{href:"#",onClick:this.props.onDescSort},s.createElement("span",{className:"glyphicon glyphicon-chevron-down","aria-hidden":"true"})))),s.createElement("th",{className:"table-position"},"Author"))),s.createElement("tbody",null,this.props.books.map(t))))))}})},205:function(e,t,a){"use strict";var n=function(e){return e&&e.__esModule?e["default"]:e},s=n(a(1)),r=a(43).Input;e.exports=s.createClass({displayName:"EditBookForm",getInitialState:function(){return{id:this.props.book.id,name:this.props.book.name,author:this.props.book.author}},render:function(){return s.createElement("tr",null,s.createElement("td",null,s.createElement(r,{type:"text",ref:"bookName",value:this.state.name,onChange:this.onNameChange}),s.createElement("span",{className:"pull-right"},s.createElement("a",{href:"#",onClick:this.update},"save"))),s.createElement("td",null,s.createElement(r,{type:"text",ref:"bookAuthor",value:this.state.author,onChange:this.onAuthorChange})))},onNameChange:function(e){this.setState({name:e.target.value})},onAuthorChange:function(e){this.setState({author:e.target.value})},update:function(e){e.preventDefault(),this.props.onUpdate(this.state)}})},206:function(e,t,a){"use strict";var n=function(e){return e&&e.__esModule?e["default"]:e},s=n(a(1)),r=a(43),o=r.Grid,i=r.Row,l=r.Col;e.exports=s.createClass({displayName:"Nav",render:function(){var e,t={visibility:"hidden"};return e=this.props.user?s.createElement("li",null,s.createElement("a",{href:"#",onClick:this.logout},"Sign Out")):s.createElement("li",null,s.createElement("a",{href:"#",onClick:this.login},"Sign In")),s.createElement("header",{className:"header"},s.createElement(o,null,s.createElement(i,null,s.createElement(l,{md:6},s.createElement("div",{className:"logo-white"},s.createElement("img",{src:"images/logo-white.png"}),s.createElement("h3",null,"BOOKS"))),s.createElement(l,{md:6,className:"nav-wrapper"},s.createElement("nav",{className:"navbar navbar-inverse navbar-static-top",role:"navigation"},s.createElement("div",{className:"navbar-header"},s.createElement("button",{type:"button",className:"navbar-toggle collapsed",onTouchStart:this.toggeNav,onClick:this.toggleNav},s.createElement("span",{className:"sr-only"},"Toggle navigation"),s.createElement("span",{className:"icon-bar"}),s.createElement("span",{className:"icon-bar"}),s.createElement("span",{className:"icon-bar"}))),s.createElement("div",{className:"collapse navbar-collapse",id:"mobile-nav"},s.createElement("ul",{className:"nav navbar-nav"},s.createElement("li",{style:t},s.createElement("a",{href:"#"},"Profile")),e),s.createElement("form",null,s.createElement("input",{type:"text",name:"search",ref:"search",placeholder:"Search",value:this.props.query,onChange:this.search}),s.createElement("input",{type:"image",src:"images/icon-search.png",alt:"Submit"}))))))))},login:function(){this.props.onLogin()},logout:function(){this.props.onLogout()},search:function(){var e=this.refs.search.getDOMNode().value;this.props.onSearch(e)},toggleNav:function(){var e=document.getElementById("mobile-nav");e.classList.toggle("in")}})},207:function(e,t,a){"use strict";var n=function(e){return e&&e.__esModule?e["default"]:e},s=n(a(1)),r=a(43),o=r.Grid,i=r.Row,l=r.Col,c=r.Input,u=r.Button;e.exports=s.createClass({displayName:"NewBookForm",getInitialState:function(){return{name:"",author:""}},render:function(){var e=this.props.user?!0:!1,t={display:e?"":"none"};return s.createElement("section",{style:t,className:"content"},s.createElement(o,null,s.createElement("form",{onSubmit:this.submit},s.createElement(c,{label:"New Book",wrapperClassName:"wrapper"},s.createElement(i,null,s.createElement(l,{xs:6},s.createElement(c,{type:"text",ref:"bookName",placeholder:"Enter book",onChange:this.onNameChange,value:this.state.name})),s.createElement(l,{xs:6},s.createElement(c,{type:"text",ref:"bookAuthor",placeholder:"Enter author",onChange:this.onAuthorChange,value:this.state.author})))),s.createElement(u,{className:"pull-right btn-link",type:"submit"},"Save"))))},submit:function(e){e.preventDefault(),this.props.onSubmit(this.state),this.setState({name:"",author:""})},onNameChange:function(e){this.setState({name:e.target.value})},onAuthorChange:function(e){this.setState({author:e.target.value})}})}});