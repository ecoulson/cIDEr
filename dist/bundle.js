!function(e){var t={};function n(r){if(t[r])return t[r].exports;var o=t[r]={i:r,l:!1,exports:{}};return e[r].call(o.exports,o,o.exports,n),o.l=!0,o.exports}n.m=e,n.c=t,n.d=function(e,t,r){n.o(e,t)||Object.defineProperty(e,t,{enumerable:!0,get:r})},n.r=function(e){"undefined"!=typeof Symbol&&Symbol.toStringTag&&Object.defineProperty(e,Symbol.toStringTag,{value:"Module"}),Object.defineProperty(e,"__esModule",{value:!0})},n.t=function(e,t){if(1&t&&(e=n(e)),8&t)return e;if(4&t&&"object"==typeof e&&e&&e.__esModule)return e;var r=Object.create(null);if(n.r(r),Object.defineProperty(r,"default",{enumerable:!0,value:e}),2&t&&"string"!=typeof e)for(var o in e)n.d(r,o,function(t){return e[t]}.bind(null,o));return r},n.n=function(e){var t=e&&e.__esModule?function(){return e.default}:function(){return e};return n.d(t,"a",t),t},n.o=function(e,t){return Object.prototype.hasOwnProperty.call(e,t)},n.p="",n(n.s=2)}([function(e,t){e.exports=React},function(e,t,n){"use strict";Object.defineProperty(t,"__esModule",{value:!0}),function(e){e[e.Alt=0]="Alt",e[e.ArrowLeft=1]="ArrowLeft",e[e.ArrowRight=2]="ArrowRight",e[e.ArrowUp=3]="ArrowUp",e[e.ArrowDown=4]="ArrowDown",e[e.Backspace=5]="Backspace",e[e.CapsLock=6]="CapsLock",e[e.Character=7]="Character",e[e.Clear=8]="Clear",e[e.ContextMenu=9]="ContextMenu",e[e.Control=10]="Control",e[e.Delete=11]="Delete",e[e.End=12]="End",e[e.Enter=13]="Enter",e[e.Escape=14]="Escape",e[e.F1=15]="F1",e[e.F2=16]="F2",e[e.F3=17]="F3",e[e.F4=18]="F4",e[e.F5=19]="F5",e[e.F6=20]="F6",e[e.F7=21]="F7",e[e.F8=22]="F8",e[e.F9=23]="F9",e[e.F10=24]="F10",e[e.F11=25]="F11",e[e.F12=26]="F12",e[e.F13=27]="F13",e[e.Help=28]="Help",e[e.Home=29]="Home",e[e.Meta=30]="Meta",e[e.PageDown=31]="PageDown",e[e.PageUp=32]="PageUp",e[e.Shift=33]="Shift",e[e.Tab=34]="Tab"}(t.Key||(t.Key={}))},function(e,t,n){"use strict";Object.defineProperty(t,"__esModule",{value:!0});var r=n(0),o=n(3),i=n(4);o.render(r.createElement(i.MainWindow,null),document.getElementById("app"))},function(e,t){e.exports=ReactDOM},function(e,t,n){"use strict";var r=this&&this.__extends||function(){var e=function(t,n){return(e=Object.setPrototypeOf||{__proto__:[]}instanceof Array&&function(e,t){e.__proto__=t}||function(e,t){for(var n in t)t.hasOwnProperty(n)&&(e[n]=t[n])})(t,n)};return function(t,n){function r(){this.constructor=t}e(t,n),t.prototype=null===n?Object.create(n):(r.prototype=n.prototype,new r)}}();Object.defineProperty(t,"__esModule",{value:!0});var o=n(0),i=n(5),s=function(e){function t(){return null!==e&&e.apply(this,arguments)||this}return r(t,e),t.prototype.render=function(){return o.createElement("div",{className:"cIDEr-container"},o.createElement(i.Editor,null))},t}(o.Component);t.MainWindow=s},function(e,t,n){"use strict";var r=this&&this.__extends||function(){var e=function(t,n){return(e=Object.setPrototypeOf||{__proto__:[]}instanceof Array&&function(e,t){e.__proto__=t}||function(e,t){for(var n in t)t.hasOwnProperty(n)&&(e[n]=t[n])})(t,n)};return function(t,n){function r(){this.constructor=t}e(t,n),t.prototype=null===n?Object.create(n):(r.prototype=n.prototype,new r)}}();Object.defineProperty(t,"__esModule",{value:!0});var o=n(0),i=n(6),s=n(12),u=n(13),c=function(e){function t(t){var n=e.call(this,t)||this;return n.cursor=new s.Cursor,n.state=new u.EditorState,n.editorKeyPressAction=n.editorKeyPressAction.bind(n),n.updateLinePosition=n.updateLinePosition.bind(n),n.updateLine=n.updateLine.bind(n),n}return r(t,e),t.prototype.render=function(){return o.createElement("div",{style:{width:"100vw"}},this.renderLines())},t.prototype.renderLines=function(){var e=this;return this.state.lines.map(function(t,n){return o.createElement(i.Line,{key:n,lineNumber:n,line:t,cursor:e.cursor,focused:n==e.cursor.getCurrentLine(),editorKeyPressAction:e.editorKeyPressAction,updateLinePosition:e.updateLinePosition,updateLine:e.updateLine})})},t.prototype.editorKeyPressAction=function(e){this.enterWasPressed(e)&&this.createNewLine(e),this.shouldRemoveLine(e)&&this.deleteLine(),this.displayCursor()},t.prototype.displayCursor=function(){if(console.log(this.getCurrentLineElement().childNodes,this.cursor.getCurrentColumn()),this.getCurrentLineElement().childNodes.length>0){var e=window.getSelection(),t=document.createRange();t.setStart(this.getCurrentLineElement().childNodes[0],this.cursor.getCurrentColumn()-1),t.collapse(!0),e.removeAllRanges(),e.addRange(t)}},t.prototype.getCurrentLineElement=function(){var e='[data-line-number="'+this.cursor.getCurrentLine()+'"]';return document.querySelector(e)},t.prototype.enterWasPressed=function(e){return 13==e.keyCode},t.prototype.createNewLine=function(e){e.preventDefault(),this.state.lines.splice(this.cursor.getCurrentLine()+1,0,""),this.cursor.seekLines(1),this.setState({lines:this.state.lines})},t.prototype.updateLinePosition=function(e){this.isLineInEditor(e)&&(this.cursor.setLinePosition(e),this.focusOnCurrentLine())},t.prototype.isLineInEditor=function(e){return e>=0&&e<this.state.lines.length},t.prototype.focusOnCurrentLine=function(){this.getCurrentLineElement().focus()},t.prototype.shouldRemoveLine=function(e){return 8==e.keyCode&&0==this.cursor.getCurrentColumn()},t.prototype.deleteLine=function(){this.canDeleteLine()&&(this.state.lines[this.cursor.getCurrentLine()-1]+=this.state.lines[this.cursor.getCurrentLine()],this.state.lines.splice(this.cursor.getCurrentLine(),1),this.cursor.seekLines(-1),this.setState({lines:this.state.lines}))},t.prototype.canDeleteLine=function(){return this.cursor.getCurrentLine()>0},t.prototype.updateLine=function(e,t){this.state.lines[e]=t,this.setState({lines:this.state.lines})},t.prototype.componentDidUpdate=function(){this.focusOnCurrentLine()},t}(o.Component);t.Editor=c},function(e,t,n){"use strict";var r=this&&this.__extends||function(){var e=function(t,n){return(e=Object.setPrototypeOf||{__proto__:[]}instanceof Array&&function(e,t){e.__proto__=t}||function(e,t){for(var n in t)t.hasOwnProperty(n)&&(e[n]=t[n])})(t,n)};return function(t,n){function r(){this.constructor=t}e(t,n),t.prototype=null===n?Object.create(n):(r.prototype=n.prototype,new r)}}();Object.defineProperty(t,"__esModule",{value:!0});var o=n(0),i=n(7),s=n(8),u=n(9),c=n(10),p=n(1),a=function(e){function t(t){var n=e.call(this,t)||this;return n.state=new s.LineState,n.keyCombination=new c.KeyCombination,n.setCurrentLine=n.setCurrentLine.bind(n),n.handleLineKeyDownAction=n.handleLineKeyDownAction.bind(n),n.setColumnPosition=n.setColumnPosition.bind(n),n}return r(t,e),t.prototype.render=function(){return o.createElement("div",{key:this.props.lineNumber,style:{display:"flex"}},o.createElement(u.LineNumber,{focused:this.props.focused,lineNumber:this.props.lineNumber}),o.createElement("div",{"data-line-number":this.props.lineNumber,onMouseUp:this.setCurrentLine,onKeyDown:this.handleLineKeyDownAction,tabIndex:-1,suppressContentEditableWarning:!0,contentEditable:!0,style:i.LineStyle},this.props.line))},t.prototype.setCurrentLine=function(e){if(this.isTargetElementRendered(e.target)){var t=this.getLineElement(e.target);this.setColumnPosition(),this.setLinePosition(t)}},t.prototype.isTargetElementRendered=function(e){return null!=e},t.prototype.getLineElement=function(e){return this.isLineElement(e)?e:this.getLineElement(e.parentElement)},t.prototype.isLineElement=function(e){return e.hasAttribute("data-line-number")},t.prototype.setColumnPosition=function(){this.props.cursor.setColumnPosition(window.getSelection().getRangeAt(0).endOffset)},t.prototype.setLinePosition=function(e){this.props.cursor.setLinePosition(parseInt(e.getAttribute("data-line-number"),10))},t.prototype.handleLineKeyDownAction=function(e){e.preventDefault(),this.keyCombination.setCombination(e),this.lineChangeKeyPressed(e)&&this.changeLine(e),this.keyCombination.isCharacterKeyPressed()&&this.appendCharacterToLine(),this.isDeleteKeyPressed()&&this.deleteLineContent(),this.props.editorKeyPressAction(e)},t.prototype.lineChangeKeyPressed=function(e){return this.keyCombination.isKeyPressed(p.Key.ArrowUp)||this.keyCombination.isKeyPressed(p.Key.ArrowDown)},t.prototype.changeLine=function(e){var t=this.props.cursor.getCurrentLine();switch(e.keyCode){case 38:this.props.updateLinePosition(t-1);break;case 40:this.props.updateLinePosition(t+1)}},t.prototype.appendCharacterToLine=function(){this.props.cursor.seekColumns(1),this.props.updateLine(this.props.lineNumber,this.props.line+this.keyCombination.getKey())},t.prototype.isDeleteKeyPressed=function(){return this.keyCombination.isKeyPressed(p.Key.Delete)||this.keyCombination.isKeyPressed(p.Key.Backspace)},t.prototype.deleteLineContent=function(){if(this.props.cursor.getCurrentColumn()>0){var e=this.props.line.substring(0,this.props.cursor.getCurrentColumn()-1)+this.props.line.substring(this.props.cursor.getCurrentColumn()+1,this.props.line.length);this.props.cursor.seekColumns(-1),this.props.updateLine(this.props.lineNumber,e)}},t}(o.Component);t.Line=a},function(e,t,n){"use strict";Object.defineProperty(t,"__esModule",{value:!0}),t.LineStyle={width:"100%",backgroundColor:"rgb(240,240,240)",whiteSpace:"nowrap",outline:"none"}},function(e,t,n){"use strict";Object.defineProperty(t,"__esModule",{value:!0});var r=function(){return function(){this.focused=!1}}();t.LineState=r},function(e,t,n){"use strict";var r=this&&this.__extends||function(){var e=function(t,n){return(e=Object.setPrototypeOf||{__proto__:[]}instanceof Array&&function(e,t){e.__proto__=t}||function(e,t){for(var n in t)t.hasOwnProperty(n)&&(e[n]=t[n])})(t,n)};return function(t,n){function r(){this.constructor=t}e(t,n),t.prototype=null===n?Object.create(n):(r.prototype=n.prototype,new r)}}();Object.defineProperty(t,"__esModule",{value:!0});var o=n(0),i=function(e){function t(){return null!==e&&e.apply(this,arguments)||this}return r(t,e),t.prototype.render=function(){return o.createElement("span",null,this.props.lineNumber+1)},t}(o.Component);t.LineNumber=i},function(e,t,n){"use strict";Object.defineProperty(t,"__esModule",{value:!0});var r=n(11),o=n(1),i=function(){function e(){}return e.prototype.setCombination=function(e){this.event=e,this.key=r.KeyMapper(e.keyCode)},e.prototype.isCharacterKeyPressed=function(){return!this.event.ctrlKey&&!this.event.metaKey&&this.key==o.Key.Character},e.prototype.isKeyPressed=function(e){return e==this.key},e.prototype.getKey=function(){return this.event.key},e}();t.KeyCombination=i},function(e,t,n){"use strict";Object.defineProperty(t,"__esModule",{value:!0});var r=n(1),o={8:r.Key.Backspace,9:r.Key.Tab,12:r.Key.Clear,13:r.Key.Enter,16:r.Key.Shift,17:r.Key.Control,18:r.Key.Alt,20:r.Key.CapsLock,27:r.Key.Escape,33:r.Key.PageUp,34:r.Key.PageDown,35:r.Key.End,36:r.Key.Home,37:r.Key.ArrowLeft,38:r.Key.ArrowUp,39:r.Key.ArrowRight,40:r.Key.ArrowDown,45:r.Key.Help,46:r.Key.Delete,91:r.Key.Meta,93:r.Key.ContextMenu,112:r.Key.F1,113:r.Key.F2,114:r.Key.F3,115:r.Key.F4,116:r.Key.F5,117:r.Key.F6,118:r.Key.F7,119:r.Key.F8,120:r.Key.F9,121:r.Key.F10,122:r.Key.F11,123:r.Key.F12,124:r.Key.F13},i=Object.keys(o);t.KeyMapper=function(e){return function(e){return-1!=i.indexOf(e.toString())}(e)?o[e]:r.Key.Character}},function(e,t,n){"use strict";Object.defineProperty(t,"__esModule",{value:!0});var r=function(){function e(){this.line=0,this.column=0}return e.prototype.seekLines=function(e){this.line+=e},e.prototype.seekColumns=function(e){this.column+=e},e.prototype.setLinePosition=function(e){this.line=e},e.prototype.setColumnPosition=function(e){this.column=e},e.prototype.getCurrentLine=function(){return this.line},e.prototype.getCurrentColumn=function(){return this.column},e}();t.Cursor=r},function(e,t,n){"use strict";Object.defineProperty(t,"__esModule",{value:!0});var r=function(){return function(){this.lines=[""]}}();t.EditorState=r}]);
//# sourceMappingURL=bundle.js.map