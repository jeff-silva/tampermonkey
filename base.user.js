// ==UserScript==
// @name         Test
// @namespace    http://tampermonkey.net/
// @version      0.1
// @description  try to take over the world!
// @author       Jeff Silva (https://github.com/jeff-silva)
// @match        *://*/*
// @icon         https://cdn-icons-png.flaticon.com/512/616/616423.png
// @grant        unsafeWindow
// @grant        GM.addElement
// @require      https://unpkg.com/vue@3/dist/vue.global.js
// @require      https://unpkg.com/vuetify@3.3.23/dist/vuetify.js
// @run-at       document-start
// ==/UserScript==

(function() {
  "use strict";
  const ELEMENT_ID = 'app-test';

  if (document.querySelector(`#${ELEMENT_ID}`)) return;
  unsafeWindow.Vue = Vue;

  GM.addElement(document.body, 'style', {
    textContent: `
      @import url('https://cdn.jsdelivr.net/npm/vuetify@3.3.23/dist/vuetify.min.css');
      [data-v-app] {display: initial !important;}
    `,
  });

  document.body.appendChild(Object.assign(document.createElement('div'), {
    id: ELEMENT_ID,
    style: `position:fixed; bottom:10px; right:10px; width:400px; display:none;`,
    innerHTML: `<v-card elevation="3">
      <v-card-text>
        <v-text-field v-model="hello"></v-text-field>
        <div>Hello {{ hello }}</div>
      </v-card-text>
    </v-card>`,
  }));

  const { createApp, ref } = Vue;

  const app = createApp({
    setup() {
      const hello = ref('World!')
      return { hello };
    }
  });

  app.use(Vuetify.createVuetify());
  app.mount('#app-test');
})();
