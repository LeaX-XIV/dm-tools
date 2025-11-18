import { createRouter, createWebHistory } from "vue-router";

import InitiativeTracker from "@/components/initiative-tracker/InitiativeTracker.vue";

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
        // left: undefined,
        default: InitiativeTracker,
        // right: undefined,
      },
    },
  ],
});

export default router;
