/* eslint-disable react-hooks/exhaustive-deps */
import { ImageOrDefault } from "src/components";
import { useGlobalModal, useTheme, useWorld } from "src/hooks";
import { GlobalModal, WorldMemberInviteForm } from "src/containers";

export default function MemberRoom() {
  const { openModal, drawTypeMatchedModal } = useGlobalModal();
  const { getMatchedThemeData } = useTheme();
  const { type } = getMatchedThemeData();
  const { memberList, getCredentialsUserRole, changeRole, doExit } = useWorld();

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
            <th>
              <button>
                <span className="mr-1">이름(닉네임)</span>
                <i className="fa-light fa-arrow-down-a-z"></i>
              </button>
            </th>
            <th>레벨</th>
            <th>권한</th>
            <th></th>
          </tr>
        </thead>
        <tbody>
          {memberList.map((member, i) => {
            return (
              <tr key={member.id} className="text-center border-t border-b">
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
                <td>
                  <select
                    value={member.role}
                    className="px-2 border rounded-md"
                    disabled={
                      getCredentialsUserRole() === "ADMIN" ? false : true
                    }
                    onChange={(e) => {
                      changeRole(member.id, e.target.value);
                    }}
                  >
                    <option value="ADMIN">관리자</option>
                    <option value="MEMBER">일반</option>
                  </select>
                </td>
                <td>
                  <button onClick={() => doExit(member.id)}>
                    <i className="fa-light fa-arrow-right-from-bracket"></i>
                  </button>
                </td>
              </tr>
            );
          })}
        </tbody>
      </table>
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
