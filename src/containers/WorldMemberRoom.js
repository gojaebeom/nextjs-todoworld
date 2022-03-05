/* eslint-disable react-hooks/exhaustive-deps */
import { ImageOrDefault } from "src/components";
import { useGlobalModal, useTheme, useWorld } from "src/hooks";
import { GlobalModal, MemberGroupForm, WorldMemberInviteForm } from ".";

export default function MemberRoom() {
  const { openModal, drawTypeMatchedModal } = useGlobalModal();
  const { getMatchedThemeData } = useTheme();
  const { type, particleColor } = getMatchedThemeData();
  const { memberList } = useWorld();

  return (
    <div className="flex flex-col items-start w-full h-full p-10">
      {/* <button
        className="px-4 py-2 text-white rounded-md"
        style={{
          backgroundColor: type,
        }}
        onClick={() => openModal("MEMBER_GROUP_FORM", "그룹 생성", true)}
      >
        그룹 생성
        <i className="ml-2 text-xl fa-solid fa-users-medical"></i>
      </button> */}

      <button
        className="px-4 py-2 text-white rounded-md"
        style={{
          backgroundColor: type,
        }}
        onClick={() => openModal("MEMBER_SEARCH_FORM", "맴버 초대", true)}
      >
        맴버 초대하기
        <i className="ml-2 text-xl fa-light fa-face-smile-plus"></i>
      </button>
      <table className="w-full mt-4">
        <thead>
          <tr>
            <th>#</th>
            <th>프로필</th>
            <th>이름(닉네임)</th>
            <th>레벨</th>
            <th>권한</th>
            <th>설정</th>
          </tr>
        </thead>
        <tbody>
          {memberList.map((member, i) => {
            return (
              <tr key={member.id} className="border-t border-b text-center">
                <td>{i + 1}</td>
                <td className="p-2">
                  <div className="flex items-center justify-center">
                    <ImageOrDefault
                      src={member.profileURL}
                      width={30}
                      height={30}
                      className="rounded-full"
                    />
                  </div>
                </td>
                <td>{member.nickname}</td>
                <td>LV. {member.level}</td>
                <td>{member.role}</td>
                <td>
                  <button>탈퇴</button>
                </td>
              </tr>
            );
          })}
        </tbody>
      </table>

      {/** @글로벌모달_그룹폼 */}
      {drawTypeMatchedModal(
        "MEMBER_GROUP_FORM",
        <GlobalModal>
          <MemberGroupForm />
        </GlobalModal>
      )}

      {/** @글로벌모달_초대폼 */}
      {drawTypeMatchedModal(
        "MEMBER_SEARCH_FORM",
        <GlobalModal>
          <WorldMemberInviteForm />
        </GlobalModal>
      )}
    </div>
  );
}
