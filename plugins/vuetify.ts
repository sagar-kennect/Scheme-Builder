import { createVuetify } from "vuetify";
import { aliases, mdi } from "vuetify/iconsets/mdi-svg";
import vue from '@vitejs/plugin-vue'

export default defineNuxtPlugin((nuxtApp) => {
  const vuetify = createVuetify({
    ssr: true,
    theme: {
      themes: {
        light: {
          colors: {
            background: "#ececec",
            primary: "#009e9b",
          },
        },
      },
    },

    icons: {
      defaultSet: "mdi",
      aliases,
      sets: {
        mdi,
      },


    },





  });

  nuxtApp.vueApp.use(vuetify);
});
