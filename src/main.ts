import { createApp } from "vue";
import App from "./App.vue";
import router from "./router";

// Vuetify
// import "vuetify/styles"; // Probably an error on node_modules/vuetify/package.json, exports
import "vuetify/styles/main.css";
import { createVuetify } from "vuetify";
import { aliases, mdi } from "vuetify/iconsets/mdi-svg";
import * as components from "vuetify/components";
import * as directives from "vuetify/directives";
import "unfonts.css";

const vuetify = createVuetify({
  components,
  directives,
  icons: {
    defaultSet: "mdi",
    aliases,
    sets: {
      mdi,
    },
  },
});

const app = createApp(App);

app.use(router);
app.use(vuetify);

app.mount("#app");
