<template>
  <v-card flat style="background-color: transparent">
    <v-tabs v-model="tab" hide-slider selected-class="active">
      <v-tab
        value="one"
        density="compact"
        class="mr-2"
        style="border: 1px solid gray"
        >Scheme Setting</v-tab
      >
      <v-tab
        density="compact"
        value="two"
        class="mr-2"
        style="border: 1px solid gray"
        >Scheme Set</v-tab
      >
      <v-tab
        density="compact"
        value="three"
        class="mr-2"
        style="border: 1px solid gray; border-radius: 50px"
        >Scheme Set 1
        <v-icon :icon="mdiCloseCircleOutline" class="ml-3 hover"> </v-icon
      ></v-tab>
    </v-tabs>
  </v-card>
  <p class="my-4 text-caption">Scheme Set > Plan</p>
  <v-card class="h-screen">
    <v-window v-model="tab">
      <v-window-item value="one"> Scheme Setting </v-window-item>
      <v-window-item value="two">
        <v-container fluid>
          <v-row class="d-flex align-center px-5">
            <input
              type="text"
              placeholder="Search"
              class="mr-3 px-2 rounded"
              style="
                border: 1px solid black;
                outline: none;
                height: 35px;
                width: 400px;
              "
            />
            <v-btn variant="outlined" class="mr-3"> Filter </v-btn>
            <v-btn variant="outlined" class="mr-3"> Category </v-btn>
            <div>
              <v-switch label="Show Archive List" class="mr-3 mt-5"> </v-switch>
            </div>
            <v-btn variant="outlined" class="ml-auto bg-black">
              <v-icon :icon="mdiPlus"> </v-icon>
              Create Scheme
            </v-btn>
          </v-row>

          <div>
            <v-table>
              <thead>
                <tr>
                  <th class="text-left">Name</th>
                  <th class="text-left">Calories</th>
                </tr>
              </thead>
              <tbody>
                <tr v-for="item in tableData" :key="item.name">
                  <td>{{ item.displayName }}</td>
                  <td>{{ item.type }}</td>
                </tr>
              </tbody>
            </v-table>
          </div>
        </v-container>
      </v-window-item>
      <v-window-item value="three"> Three </v-window-item>
    </v-window>
  </v-card>
</template>
<script>
import { mdiAccount, mdiCloseCircleOutline, mdiPlus } from "@mdi/js";
import schemeData from "../data/schems.json";

export default {
  data: () => ({
    tab: null,
    mdiAccount,
    mdiCloseCircleOutline,
    mdiPlus,
    tableData: schemeData,
  }),
};
</script>

<style scoped>
.active {
  background: white;
}
.hover:hover {
  color: red;
}
</style>
