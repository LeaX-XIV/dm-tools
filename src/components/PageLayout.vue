<script lang="ts" setup></script>

<template>
  <v-app id="inspire">
    <v-app-bar class="px-3" density="compact" flat>
      <v-spacer></v-spacer>
      <v-tabs align-tabs="center" color="grey-darken-2">
        <v-tab
          v-for="route in $router.getRoutes()"
          :key="route.name"
          :text="route.name?.toString() ?? route.path"
          :to="route.path"
        ></v-tab>
      </v-tabs>
      <v-spacer></v-spacer>
    </v-app-bar>

    <v-main class="bg-grey-lighten-3">
      <v-container>
        <v-row>
          <v-col cols="12" md="2">
            <v-sheet min-height="268" rounded="lg">
              <router-view class="view main-content" name="left" />
            </v-sheet>
          </v-col>

          <v-col cols="12" md="8">
            <v-sheet min-height="70vh" rounded="lg">
              <router-view class="view main-content" />
            </v-sheet>
          </v-col>

          <v-col cols="12" md="2">
            <v-sheet min-height="268" rounded="lg">
              <router-view class="view main-content" name="right" />
            </v-sheet>
          </v-col>
        </v-row>
      </v-container>
    </v-main>
  </v-app>
</template>
