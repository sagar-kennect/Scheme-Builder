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
      color="blue-grey lighten-5"
      permanent
      rail
    >
      <v-spacer></v-spacer>
      <v-list nav>
        <v-list-item> <v-icon :icon="mdiAccount"></v-icon></v-list-item>
        <v-list-item> <v-icon :icon="mdiAccount"></v-icon></v-list-item>
        <v-list-item> <v-icon :icon="mdiAccount"></v-icon></v-list-item>
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
    };
  },
  components: { CSnackbar },
};
</script>
