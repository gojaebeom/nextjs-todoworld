import { useEffect } from "react";
import { useRecoilSnapshot } from "recoil";

/**
 * @DebugObserver
 * Recoil 라이브러리에서 제공하는 컴포넌트
 * 상태가 변화되었을 때 conosole에서 힌트 제공
 */
function DebugObserver() {
  const snapshot = useRecoilSnapshot();
  useEffect(() => {
    console.debug("%c[ATOM 상태 변화 감지]", "color:purple");
    for (const node of snapshot.getNodes_UNSTABLE({ isModified: true })) {
      console.debug(node.key, snapshot.getLoadable(node));
    }
  }, [snapshot]);

  return null;
}

export default DebugObserver;
