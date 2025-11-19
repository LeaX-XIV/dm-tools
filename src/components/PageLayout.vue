<script lang="ts" setup>
import { computed } from "vue";
import { useTheme } from "vuetify";

import { mdiThemeLightDark } from "@mdi/js";

const theme = useTheme();

const tabsColor = computed(() => (theme.current.value.dark ? "grey-lighten-2" : "grey-darken-2"));

const mainClassObject = computed(() => ({
  "bg-grey-lighten-3": !theme.current.value.dark,
  "bg-grey-darken-3": theme.current.value.dark,
}));
</script>

<template>
  <v-app id="inspire">
    <v-app-bar class="px-3" density="compact" flat>
      <v-spacer></v-spacer>
      <v-tabs align-tabs="center" :color="tabsColor">
        <v-tab
          v-for="route in $router.getRoutes()"
          :key="route.name"
          :text="route.name?.toString() ?? route.path"
          :to="route.path"
        ></v-tab>
      </v-tabs>
      <v-spacer></v-spacer>
      <v-btn @click="theme.toggle()" :icon="mdiThemeLightDark"></v-btn>
    </v-app-bar>

    <v-main :class="mainClassObject">
      <v-container>
        <v-row>
          <v-col cols="12" md="2">
            <v-sheet rounded="lg">
              <router-view class="view main-content" name="left" />
            </v-sheet>
          </v-col>

          <v-col cols="12" md="8">
            <v-sheet min-height="70vh" rounded="lg">
              <router-view class="view main-content" />
            </v-sheet>
          </v-col>

          <v-col cols="12" md="2">
            <v-sheet rounded="lg">
              <router-view class="view main-content" name="right" />
            </v-sheet>
          </v-col>
        </v-row>
      </v-container>
    </v-main>
  </v-app>
</template>
