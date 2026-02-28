import { ref, toValue, watch, type Ref } from "vue";

function equals(a: unknown, b: unknown): boolean {
  return JSON.stringify(a) === JSON.stringify(b);
}

export function useEditable(...props: Ref<unknown>[]) {
  let originals: unknown[] = props.map((e) => toValue(e));

  const isDirty = ref(false);

  watch(props, (n, o) => {
    console.debug("dirty", o, n);
    isDirty.value = n
      .map((e, i) => [e, originals[i]])
      .map(([n, o]) => !equals(n, o))
      .reduce((a, b) => a || b, false);
  });

  return {
    isDirty: isDirty,
    reset: () => {
      originals = props.map((e) => toValue(e));
      isDirty.value = false;
      console.debug("Resetting dirty bit");
    },
  };
}
