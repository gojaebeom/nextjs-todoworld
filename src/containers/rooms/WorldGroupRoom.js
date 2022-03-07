import { useGlobalModal, useGroup, useTheme, useWorld } from "src/hooks";
import {
  GlobalModal,
  WorldMemberGroupEditForm,
  WorldMemberGroupForm,
} from "src/containers";

export default function WorldGroupRoom() {
  const { getMatchedThemeData } = useTheme();
  const { openModal, drawTypeMatchedModal } = useGlobalModal();
  const { type } = getMatchedThemeData();
  const { worldDetail } = useWorld();
  const { getGroupMembers } = useGroup();
  return (
    <div className="flex flex-col items-start w-full h-full p-10">
      <button
        className="px-4 py-2 text-white rounded-md"
        style={{
          backgroundColor: type,
        }}
        onClick={() => openModal("GROUP_FORM", "그룹 만들기")}
      >
        그룹 만들기
        <i className="ml-2 text-xl fa-light fa-party-horn"></i>
      </button>
      <div className="flex items-start w-full mt-4">
        {worldDetail?.groups?.map((group, i) => {
          return (
            <div
              key={i}
              className="h-auto p-2 m-2 rounded-xl"
              style={{ border: `2px solid ${group.color}` }}
            >
              <p>
                {group.name}
                <button
                  onClick={() =>
                    openModal("GROUP_EDIT_FORM", "그룹 수정하기", false, {
                      id: group.id,
                      name: group.name,
                      members: group.members,
                      color: group.color,
                    })
                  }
                >
                  <i
                    className="ml-4 fa-light fa-pen-to-square"
                    style={{ color: group.color }}
                  ></i>
                </button>
              </p>
              <div>
                {getGroupMembers(group.members).map((member) => {
                  return (
                    <div key={member.id}>
                      <span className="text-xs">#</span> {member.nickname}
                    </div>
                  );
                })}
              </div>
            </div>
          );
        })}
      </div>
      {/** @글로벌모달_그룹생성폼 */}
      {drawTypeMatchedModal(
        "GROUP_FORM",
        <GlobalModal>
          <WorldMemberGroupForm />
        </GlobalModal>
      )}
      {/** @글로벌모달_그룹수정폼 */}
      {drawTypeMatchedModal(
        "GROUP_EDIT_FORM",
        <GlobalModal>
          <WorldMemberGroupEditForm />
        </GlobalModal>
      )}
    </div>
  );
}
