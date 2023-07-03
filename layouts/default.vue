<template>
  <v-app>
    <v-app-bar flat app>
      <v-toolbar-title :text="title" />
      <v-spacer />
      <v-btn icon>
        <v-icon :icon="mdiAccount"></v-icon>
      </v-btn>
    </v-app-bar>
    <!-- Navigation -->

    <v-navigation-drawer
      expand-on-hover
      class="bg-white"
      theme="dark"
      permanent
      rail
    >
      <v-spacer></v-spacer>
      <v-list nav>
        <v-list-item>
          <nuxt-link to="/">
            <div style="overflow: hidden; height: 20px">
              <v-icon class="mr-3" :icon="mdiAccount"></v-icon>Scheme Builder
            </div>
          </nuxt-link>
        </v-list-item>

        <v-list-item>
          <nuxt-link to="/github">
            <div style="overflow: hidden; height: 20px">
              <v-icon class="mr-3" :icon="mdiGithub"></v-icon>Git Hub Tracker
            </div>
          </nuxt-link>
        </v-list-item>
      </v-list>
      <v-spacer></v-spacer>
    </v-navigation-drawer>

    <v-main>
      <c-snackbar>
        <v-container fluid>
          <slot />
        </v-container>
      </c-snackbar>
    </v-main>
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
  mdiGithub,
} from "@mdi/js";
import CSnackbar from "~~/components/feedback/c-snackbar.vue";

export default {
  name: "DefaultLayout",
  data() {
    return {
      drawer: true,
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
      title: "Scheme Builder",
      mdiAccount,
      mdiChevronLeft,
      mdiChevronRight,
      mdiRepeat,
      mdiGithub,
    };
  },
  components: { CSnackbar },
};
</script>
