import { useGlobalModal, useGroup, useTheme, useWorld } from "src/hooks";
import { GlobalModal, WorldMemberGroupForm } from "src/containers";

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
      <div className="flex w-full mt-4">
        {worldDetail?.groups?.map((group, i) => {
          return (
            <div
              key={i}
              className="p-2 m-2 rounded-xl"
              style={{ border: `2px solid ${group.color}` }}
            >
              <p>
                {group.name}
                <span className="px-2 ml-2 text-xs bg-gray-200 rounded-xl">
                  {group.members.length}명
                </span>
              </p>
              <div>
                {getGroupMembers(group.members).map((member) => {
                  return <div key={member.id} className="ml-2">| {member.nickname}</div>;
                })}
              </div>
            </div>
          );
        })}
      </div>
      {/** @글로벌모달_초대폼 */}
      {drawTypeMatchedModal(
        "GROUP_FORM",
        <GlobalModal>
          <WorldMemberGroupForm />
        </GlobalModal>
      )}
    </div>
  );
}
