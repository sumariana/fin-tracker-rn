import { useEffect, useRef } from "react";
import { isEqual } from "lodash";

export function useDeepEffect(effectFunc: () => void, deps: any) {
  const isFirst = useRef(true);
  const prevDeps = useRef(deps);

  useEffect(() => {
    const isSame = prevDeps.current.every((obj: any, index: number) => isEqual(obj, deps[index]));
    if (isFirst.current || !isSame) {
      effectFunc();
    }
    isFirst.current = false;
    prevDeps.current = deps;
  }, deps);
}
