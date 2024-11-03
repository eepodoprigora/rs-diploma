import { useEffect } from "react";
import { useStore } from "react-redux";
import { RootState } from "../store/store";

export const useResetForm = (reset: () => void) => {
  const store = useStore();

  useEffect(() => {
    const unsubscribe = store.subscribe(() => {
      const state = store.getState() as RootState; // Приведение типа здесь для ясности
      const wasLogout = state.app.wasLogout;

      // Если состояние `wasLogout` истинно, сбрасываем форму
      if (wasLogout) {
        reset();
      }
    });

    // Очистка подписки при размонтировании компонента
    return () => {
      unsubscribe();
    };
  }, [reset, store]);
};
