import { useGlobalModal, useTheme } from "src/hooks";

export default function GlobalModal({ children }) {
  const { modal, closeModal } = useGlobalModal();
  
  return (
    <div
      className={`fixed top-0 left-0 z-50 flex items-center justify-center w-full h-full bg-black/50
      ${modal.backgroundClick && "cursor-pointer"}`}
      onClick={() => {
        modal.backgroundClick && closeModal();
      }}
    >
      {/** @모달_박스 */}
      <div
        className={`min-w-[350px]  pb-0 flex flex-col bg-white text-black 
        overflow-hidden shadow-lg transition-all duration-200 cursor-default
        rounded-lg`}
        onClick={(e) => {
          e.stopPropagation();
        }}
      >
        {/** @모달_헤더 */}
        <div className="flex items-start justify-between w-full p-2">
          <h2 className="text-xl font-noto-b">{modal.title}</h2>
          <button onClick={closeModal}>닫기</button>
        </div>
        {/** @모달_메인 */}
        <div className="p-2 max-h-[700px] overflow-y-auto custom-scroll">
          {children}
        </div>
        {/** @모달_하단디자인 */}
      </div>
    </div>
  );
}
