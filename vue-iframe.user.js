// ==UserScript==
// @name         Test
// @namespace    http://tampermonkey.net/
// @version      0.1
// @description  Test script
// @author       Jeff Silva (https://github.com/jeff-silva)
// @match        *://*/*
// @icon         https://cdn-icons-png.flaticon.com/512/616/616423.png
// @updateURL    https://github.com/jeff-silva/tampermonkey/raw/main/vue-iframe.user.js
// @grant        unsafeWindow
// @grant        GM.addElement
// @require      https://unpkg.com/vue@3/dist/vue.global.js
// @require      https://unpkg.com/vuetify@3.3.23/dist/vuetify.js
// @run-at       document-start
// ==/UserScript==

const createElement = (tagName, attributes = {}) => {
  return Object.assign(document.createElement(tagName), attributes);
};

(function () {
  "use strict";

  const iframe = createElement("iframe", {
    style: "position:fixed; bottom:0; right:0; width:400px; height:400px; border: solid 1px red;",
  });

  document.body.appendChild(iframe);

  console.log(iframe.contentWindow.document.body);
})();
