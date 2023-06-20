<template>
  <v-app dark>
    <v-app-bar border flat app>
      <v-app-bar-nav-icon @click.stop="drawer = !drawer" />
      <v-btn icon @click.stop="miniVariant = !miniVariant">
        <v-icon
          :icon="!miniVariant ? mdiChevronLeft : mdiChevronRight"
        ></v-icon>
      </v-btn>
      <v-toolbar-title :text="title" />
      <v-spacer />
      <v-btn icon @click.stop="rightDrawer = !rightDrawer">
        <v-icon :icon="mdiAccount"></v-icon>
      </v-btn>
    </v-app-bar>
    <v-navigation-drawer v-model="drawer" :rail="miniVariant" app>
      <v-list nav>
        <v-list-item
          v-for="(item, i) in items"
          :key="i"
          :prepend-icon="item.icon"
          :title="item.title"
          :to="item.to"
        >
        </v-list-item>
      </v-list>
    </v-navigation-drawer>
    <v-main>
      <c-snackbar>
        <v-container fluid>
          <slot />
        </v-container>
      </c-snackbar>
    </v-main>
    <v-navigation-drawer
      v-model="rightDrawer"
      :location="right ? 'right' : 'left'"
      temporary
      fixed
    >
      <v-list>
        <v-list-item @click="right = !right">
          <v-list-item-action>
            <v-icon light :icon="mdiRepeat"> </v-icon>
          </v-list-item-action>
          <v-list-item-title>Switch drawer (click me)</v-list-item-title>
        </v-list-item>
      </v-list>
    </v-navigation-drawer>
    <v-footer app>
      <span>&copy; {{ new Date().getFullYear() }}</span>
    </v-footer>
  </v-app>
</template>

<script>
import {
  mdiAccount,
  mdiApps,
  mdiChartBubble,
  mdiChevronLeft,
  mdiChevronRight,
  mdiRepeat,
} from "@mdi/js";
import CSnackbar from "~~/components/feedback/c-snackbar.vue";
import { mapActions } from "pinia";

export default {
  name: "DefaultLayout",
  data() {
    return {
      drawer: false,
      items: [
        {
          icon: mdiApps,
          title: "Welcome",
          to: "/",
        },
        {
          icon: mdiChartBubble,
          title: "Inspire",
          to: "/inspire",
        },
      ],
      miniVariant: false,
      right: true,
      rightDrawer: false,
      title: "Vuetify.js",
      mdiAccount,
      mdiChevronLeft,
      mdiChevronRight,
      mdiRepeat,
      hashParams: { load: "", opener: "" },
    };
  },
  components: { CSnackbar },

  methods: {
    ...mapActions(useAuthStore, ["setAuth"]),
  },

  async mounted() {
    const resAuthByOpener = await authByOpener();
    if (resAuthByOpener.ok) {
      this.setAuth(resAuthByOpener.data, resAuthByOpener.conf);
      console.log(
        `%c ${resAuthByOpener.message}`,
        "color:green; font-weight:bold;font-size:20px"
      );
    } else {
      const resAuthBySessionStorage = await authBySessionStorage();
      if (resAuthBySessionStorage.ok) {
        this.setAuth(
          resAuthBySessionStorage.data,
          resAuthBySessionStorage.conf
        );
        console.log(
          `%c ${resAuthBySessionStorage.message}`,
          "color:green; font-weight:bold;font-size:20px"
        );
      } else {
        console.log(
          `%c AuthBySession: ${resAuthBySessionStorage.message}`,
          "color:red; font-weight:bold;font-size:20px"
        );
        console.log(
          `%c AuthByOpener: ${resAuthByOpener.message}`,
          "color:red; font-weight:bold;font-size:20px"
        );
        sessionStorage.clear();
        // this.$router.push({ name: 'login' })
        // window.location = '' redirect to auth.kennectweb.com
      }
    }
    authUtils.setLogoutReqFromParent(this.logout);

    window.openAdminPage = this.openAdminPage;
  },
};
</script>
