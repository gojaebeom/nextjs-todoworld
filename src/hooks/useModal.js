import { atom, useRecoilState, useResetRecoilState } from "recoil";

const modalState = atom({
  key: "modalState",
  default: {
    type: "THEME", // WORLD, SCHAJULE
    isOpen: false,
    title: "modal title",
    backgroundClick: false,
    data: null,
  },
});

export default function useGlobalModal() {
  const [modal, setModal] = useRecoilState(modalState);
  const reset = useResetRecoilState(modalState);

  const openModal = (type, title, backgroundClick = false, data = null) => {
    setModal({ ...modal, isOpen: true, type, title, backgroundClick, data });
  };

  const closeModal = () => reset();

  const drawTypeMatchedModal = (type, component) => {
    if (modal.isOpen && type === modal.type) {
      return component;
    }
    return null;
  };

  return {
    modal,
    openModal,
    closeModal,
    drawTypeMatchedModal,
  };
}
