<template>
  <v-card>
    <v-tabs v-model="tab" bg-color="red-lighten-2">
      <v-tab v-for="n in tabs" :key="n" :value="n"> Item {{ n }} </v-tab>
    </v-tabs>
    <v-card-text class="text-center">
      <v-btn variant="text" @click="removeTab()"> Remove Tab </v-btn>
      <v-divider class="mx-4" vertical></v-divider>
      <v-btn variant="text" @click="() => addTab()"> Add Tab </v-btn>
    </v-card-text>
  </v-card>
</template>
<script>
export default {
  data: () => ({
    tabs: [1, 2, 3, 4],
    tab: null,
  }),

  watch: {
    tabs(val) {
      this.tab = val - 1;
      console.log(val);
    },
  },
  methods: {
    addTab() {
      const nextTab = this.tabs.length + 1;
      this.tabs.push(nextTab);
      this.tab = nextTab;
    },
    removeTab() {
      if (this.tabs.length > 1) {
        this.tabs.pop();
        this.tab = this.tabs.length; // Set the second last tab as active
      }
    },
  },
};
</script>
