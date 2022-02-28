import { atom, useRecoilState, useResetRecoilState } from "recoil";

const modalState = atom({
  key: "modalState",
  default: {
    type: "THEME", // WORLD, SCHAJULE
    isOpen: false,
    title: "modal title",
    backgroundClick: false,
  },
});

export default function useGlobalModal() {
  const [modal, setModal] = useRecoilState(modalState);
  const reset = useResetRecoilState(modalState);

  const openModal = (type, title, backgroundClick = false) => {
    setModal({ ...modal, isOpen: true, type, title, backgroundClick });
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
