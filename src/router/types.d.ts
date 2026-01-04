import { type RouteLocationNormalizedGeneric } from "vue-router";

type RouteMetaTitleFn = (to: RouteLocationNormalizedGeneric) => string | null;
type RouteMetaTitle = RouteMetaTitleFn | string;

declare module "vue-router" {
  interface RouteMeta {
    title?: RouteMetaTitle;
  }
}
