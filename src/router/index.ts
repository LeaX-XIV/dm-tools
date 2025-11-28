import { createRouter, createWebHistory } from "vue-router";

import InitiativeTracker from "@components/initiative-tracker/InitiativeTracker.vue";
import InitiativeTrackerLeft from "@components/initiative-tracker/InitiativeTrackerLeft.vue";
import InitiativeTrackerFab from "@components/initiative-tracker/InitiativeTrackerFab.vue";

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    // {
    //   // Home
    //   path: "/",
    //   components: {
    //     left: undefined,
    //     default: undefined,
    //     right: undefined,
    //   },
    // },
    {
      path: "/initiative",
      name: "initiative",
      components: {
        left: InitiativeTrackerLeft,
        default: InitiativeTracker,
        // right: undefined,
        fab: InitiativeTrackerFab,
      },
    },
  ],
});

export default router;
