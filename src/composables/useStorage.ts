import { fromJSON } from "@decorators/JsonSerializable";
import { ref, watchEffect } from "vue";

function readFromStorage<T extends object>(
  initialState: T,
  storageKey: string,
  storage: Storage,
): T {
  const inStorage: string | null = storage.getItem(storageKey);
  if (inStorage === null) return initialState;

  try {
    return JSON.parse(inStorage, fromJSON) as T;
  } catch {
    return initialState;
  }
}

function writeToStorage<T extends object>(
  currentState: T,
  initialState: T,
  storageKey: string,
  storage: Storage,
): void {
  try {
    storage.setItem(storageKey, JSON.stringify(currentState));
  } catch {
    storage.setItem(storageKey, JSON.stringify(initialState));
  }
}

export function useStorage<T extends object>(
  initialState: T,
  storageKey: string,
  storage: Storage = localStorage,
) {
  const state = ref(readFromStorage<T>(initialState, storageKey, storage));

  watchEffect(() => {
    console.debug(`[${storageKey}] Writing out...`);
    writeToStorage(state.value, initialState, storageKey, storage);
    console.debug(`[${storageKey}] Write out complete!`);
  });

  return state;
}
