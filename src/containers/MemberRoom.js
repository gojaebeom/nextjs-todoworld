/* eslint-disable react-hooks/exhaustive-deps */
import { ImageOrDefault } from "src/components";
import { useGlobalModal, useTheme, useWorld } from "src/hooks";
import { GlobalModal, MemberInviteForm } from ".";

export default function MemberRoom() {
  const { openModal, drawTypeMatchedModal } = useGlobalModal();
  const { getMatchedThemeData } = useTheme();
  const { themeColor } = getMatchedThemeData();
  const { memberList } = useWorld();

  return (
    <div className="w-full h-full p-10 bg-gray-100">
      <button
        className="px-4 py-2 text-white rounded-md"
        style={{
          backgroundColor: themeColor,
        }}
        onClick={() => openModal("MEMBER_SEARCH_FORM", "맴버 초대", true)}
      >
        맴버 초대하기
        <i className="ml-2 text-xl fa-light fa-face-smile-plus"></i>
      </button>
      <div className="flex items-center justify-start mt-10">
        {memberList.map((member) => {
          return (
            <div
              key={member.id}
              className="p-4 bg-white rounded-xl w-[200px] mx-2 flex flex-col items-center"
            >
              <ImageOrDefault
                src={member.profileURL}
                width={90}
                height={90}
                className="rounded-full"
              />
              <div className="mt-1">{member.nickname}</div>
              <div>LV. {member.level}</div>
              <div className="font-bold text-gray-500">{member.role}</div>
            </div>
          );
        })}
      </div>

      {/** @글로벌모달_유저수정타입 */}
      {drawTypeMatchedModal(
        "MEMBER_SEARCH_FORM",
        <GlobalModal>
          <MemberInviteForm />
        </GlobalModal>
      )}
    </div>
  );
}
