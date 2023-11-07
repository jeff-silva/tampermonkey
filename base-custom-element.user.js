// ==UserScript==
// @name         Test
// @namespace    http://tampermonkey.net/
// @version      0.1
// @description  Test script
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
  unsafeWindow.Vue = Vue;
  unsafeWindow.Vuetify = Vuetify;
  const { createApp, getCurrentInstance, ref } = Vue;

  const BaseApp = Vue.defineCustomElement({
    setup() {
      const inst = getCurrentInstance();
      const app = createApp();
      app.use(Vuetify.createVuetify());
      Object.assign(inst.appContext, app._context);
      Object.assign(inst.provides, app._context.provides);

      const hello = ref('World!');
      return { hello };
    },

    styles: [`
      @import url('https://cdn.jsdelivr.net/npm/vuetify@3.3.23/dist/vuetify.min.css');
      [data-v-app] { display: block !important;}
    `],

    template: `<div style="position:fixed; bottom:15px; right:15px; width:400px; z-index:9;">
      <v-card elevation="3">
        <v-card-text>
          <v-text-field v-model="hello"></v-text-field>
          <div>Hello {{ hello }}</div>
          <v-btn>Aaa</v-btn>
        </v-card-text>
      </v-card>
    </div>`,
  }, { shadowRoot: false });

  customElements.define('base-app', BaseApp);
  document.querySelector('body').appendChild(new BaseApp({ }));
})();