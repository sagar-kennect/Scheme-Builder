<template>
  <div>
    <v-card flat style="background-color: transparent">
      <v-tabs v-model="tab" hide-slider selected-class="active">
        <v-tab
          value="Scheme Setting"
          density="compact"
          class="mr-2 border_solid_1"
          >Scheme Setting</v-tab
        >
        <v-tab value="Scheme Set" density="compact" class="mr-2 border_solid_1"
          >Scheme Set</v-tab
        >
        <v-tab
          v-for="(tab, ind) in tabs"
          :key="tab.id"
          density="compact"
          :value="tab.id"
          class="mr-2 rounded-xl border_solid_1"
          >{{ tab.name }}
          <v-icon
            :icon="mdiCloseCircleOutline"
            @click="handelRemoveTab(ind)"
            class="ml-3 hover"
          >
          </v-icon>
        </v-tab>
      </v-tabs>
    </v-card>
    <p class="my-4 text-caption">Scheme Set > {{ tab }}</p>
    <v-card class="h-screen lighten-5">
      <v-window v-model="tab">
        <v-window-item value="Scheme Setting">
          <v-container fluid>Scheme Setting</v-container>
        </v-window-item>
        <v-window-item value="Scheme Set">
          <v-container fluid>
            <v-row class="d-flex align-center px-5">
              <input
                @input="handelSearch($event)"
                type="text"
                placeholder="Search"
                class="mr-3 px-2 rounded border_solid_1 input_search"
              />
              <v-menu>
                <template v-slot:activator="{ props }">
                  <v-btn v-bind="props" variant="outlined" class="mr-3">
                    {{ selectedValue }}
                  </v-btn>
                </template>
                <v-list @click="handelFilter($event)">
                  <v-list-item>
                    <v-list-item-title value="all">All</v-list-item-title>
                  </v-list-item>
                  <v-list-item>
                    <v-list-item-title value="kpi">KPI</v-list-item-title>
                  </v-list-item>
                  <v-list-item>
                    <v-list-item-title value="normal">Normal</v-list-item-title>
                  </v-list-item>
                </v-list>
              </v-menu>

              <v-btn variant="outlined" class="mr-3"> Category </v-btn>
              <div>
                <v-switch label="Show Archive List" class="mr-3 mt-5">
                </v-switch>
              </div>
              <v-btn
                @click="() => handelCreateNewScheme()"
                variant="outlined"
                class="ml-auto bg-black"
              >
                <v-icon :icon="mdiPlus"> </v-icon>
                Create Scheme
              </v-btn>
            </v-row>

            <div>
              <v-table class="mt-5">
                <tbody>
                  <tr v-for="item in tableData" :key="item.name">
                    <td>
                      <div
                        @click="handelAddNewTab(item)"
                        class="cursor_pointer"
                      >
                        <p>{{ item.name }}</p>
                        <p class="text-caption">{{ item.displayName }}</p>
                      </div>
                    </td>
                    <td>
                      <div
                        class="d-flex align-center ml-auto"
                        style="width: 250px"
                      >
                        <div
                          :class="`${
                            item.type.toLocaleLowerCase() === 'kpi'
                              ? 'bg-green '
                              : 'bg-blue '
                          } accent-3 text-center rounded-xl py-1`"
                          style="width: 70px"
                        >
                          <p class="text-caption">{{ item.type }}</p>
                        </div>
                        <div class="ml-10 d-flex" style="gap: 10px">
                          <v-icon
                            @click="handelAddNewTab(item)"
                            class="action-icon"
                            :icon="mdiEyeOutline"
                          >
                          </v-icon>
                          <v-icon class="action-icon" :icon="mdiPencilOutline">
                          </v-icon>
                          <v-icon
                            class="action-icon"
                            :icon="mdiContentCopy"
                            @click="handleCopyScheme(item)"
                          >
                          </v-icon>
                          <v-icon class="action-icon" :icon="mdiDotsVertical">
                          </v-icon>
                        </div>
                      </div>
                    </td>
                  </tr>
                </tbody>
              </v-table>
            </div>
          </v-container>
        </v-window-item>
        <v-window-item :value="tab.id" v-for="(tab, ind) in tabs" :key="ind">
          <v-container fluid>
            <v-list>
              <v-list-item> {{ tab.id }}</v-list-item>
              <v-list-item> {{ tab.name }}</v-list-item>
              <v-list-item> {{ tab.displayName }}</v-list-item>
              <v-list-item> {{ tab.type }}</v-list-item>
            </v-list>
          </v-container>
        </v-window-item>
      </v-window>
    </v-card>
    <v-dialog v-model="createSchemeDialog" width="500"
      ><CreateScheme
        :dataObject="duplicateScheme"
        :isDuplicate="isDuplicate"
        @child-event="handleChildEvent"
      />
    </v-dialog>
  </div>
</template>
<script>
import {
  mdiAccount,
  mdiCloseCircleOutline,
  mdiPlus,
  mdiEyeOutline,
  mdiPencilOutline,
  mdiContentCopy,
  mdiDotsVertical,
} from "@mdi/js";
import schemeData from "../data/schems.json";

export default {
  data: () => ({
    tab: null,
    tabs: [],
    tableData: schemeData,
    mdiAccount,
    mdiCloseCircleOutline,
    mdiPlus,
    mdiEyeOutline,
    mdiPencilOutline,
    mdiContentCopy,
    mdiDotsVertical,
    selectedValue: "Filter",
    createSchemeDialog: false,
    duplicateScheme: {},
    isDuplicate: false,
  }),
  watch: {
    tab(newValue) {
      if (newValue == undefined) {
        if (this.tabs.length > 0) {
          let size = this.tabs.length;
          this.tab = this.tabs[size - 1]?.id;
        } else {
          this.tab = "Scheme Set";
        }
      }
      console.log(this.tabs[0]?.id);
      console.log("Active tab:", newValue);
    },
  },
  methods: {
    handelRemoveTab(index) {
      this.tabs.splice(index, 1);
    },
    handelAddNewTab(item) {
      const existingTab = this.tabs.filter((tabItem) => tabItem.id == item.id);

      if (existingTab.length > 0) {
        console.log("exist");
        this.tab = existingTab[0].id;
      } else {
        console.log("not exist");
        this.tabs.push(item);
        this.tab = item.id;
      }
    },
    handelSearch(event) {
      console.log(event.target.value);
      const searchQuery = event.target.value;
      this.tableData = schemeData.filter((item) =>
        item.name.toLowerCase().includes(searchQuery.toLowerCase())
      );
    },
    handelFilter(event) {
      this.selectedValue = event.target.getAttribute("value");
      console.log(this.selectedValue);
      if (this.selectedValue === null) {
        this.selectedValue == "all";
        this.tableData = schemeData;
      } else if (this.selectedValue === "all") {
        this.tableData = schemeData;
      } else {
        this.tableData = schemeData.filter(
          (item) => item.type.toLowerCase() == this.selectedValue
        );
      }
    },
    handleChildEvent(payload) {
      let isSchemExist = this.tableData.filter(
        (item) => item.name == payload.name
      );

      if (isSchemExist.length > 0) {
        alert("Scheme Name Should be uniq");
      } else {
        (this.createSchemeDialog = false), this.tableData.push(payload);
      }
    },
    handelCreateNewScheme() {
      this.isDuplicate = false;
      this.createSchemeDialog = true;
    },
    handleCopyScheme(data) {
      this.duplicateScheme = data;
      this.isDuplicate = true;
      this.createSchemeDialog = true;
    },
  },
};
</script>

<style scoped>
.active {
  background: white;
}
.hover:hover {
  color: red;
  cursor: pointer;
  transition: all 0.3s;
}
.action-icon:hover {
  cursor: pointer;
  scale: 1.2;
  transition: all 0.3s;
}
.border_solid_1 {
  border: 1px solid gray;
}
.input_search {
  outline: none;
  height: 35px;
  width: 400px;
}
.cursor_pointer {
  cursor: pointer;
}
</style>
