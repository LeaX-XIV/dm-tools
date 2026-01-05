import { nextTick } from "vue";
import { createRouter, createWebHistory } from "vue-router";
import type { RouteLocationNormalizedGeneric } from "vue-router";

import InitiativeTracker from "@components/initiative-tracker/InitiativeTracker.vue";
import InitiativeTrackerLeft from "@components/initiative-tracker/InitiativeTrackerLeft.vue";
import InitiativeTrackerFab from "@components/initiative-tracker/InitiativeTrackerFab.vue";
import NameGenerator from "@components/name-generator/NameGenerator.vue";

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
      meta: { title: () => "Initiative" },
    },
    {
      path: "/namegenerator",
      name: "name generator",
      components: {
        // left: undefined,
        default: NameGenerator,
        // right: undefined,
        // fab: undefined,
      },
      meta: { title: () => "Name generator" },
    },
  ],
});

// https://github.com/vuejs/vue-router/issues/914#issuecomment-384477609
router.afterEach((to) => {
  nextTick(() => {
    document.title = processTitle(to);
  });
});

function processTitle(to: RouteLocationNormalizedGeneric): string {
  const DEFAULT_TITLE = "DM Tools";

  const metaTitle = to.meta.title;

  if (typeof metaTitle === "undefined") return DEFAULT_TITLE;

  let newTitle: string | null;
  if (typeof metaTitle === "function") newTitle = metaTitle(to);
  else if (typeof metaTitle === "string") newTitle = metaTitle;
  else newTitle = null;

  if (typeof newTitle === "undefined" || newTitle === null || newTitle.length === 0)
    return DEFAULT_TITLE;

  if (!newTitle.endsWith(DEFAULT_TITLE)) return `${newTitle} ・ ${DEFAULT_TITLE}`;

  return newTitle;
}

export default router;
