import { useState } from "react";
import { db } from "src/util/firebase";
import useLoading from "./useLoading";
import useGlobalModal from "./useModal";
import useWorld from "./useWorld";
import { v4 } from "uuid";

export default function useGroup() {
  const { closeModal } = useGlobalModal();
  const { loadingOn, loadingOff } = useLoading();
  const { worldDetail, memberList } = useWorld();

  const [memberCopyList, setMemberCopyList] = useState([...memberList]);
  const [color, setColor] = useState(null);

  const getGroupMembers = (members) => {
    const filterList = [];
    memberList.map((member) => {
      members.map((m) => {
        if (member.id === m) {
          filterList.push(member);
        }
      });
    });
    return filterList;
  };

  // ? 그룹 생성
  const storeGroup = async (form) => {
    if (memberCopyList.filter((m) => m.checked).length === 0) {
      return window.alert("최소 한명 이상의 그룹원이 필요합니다.");
    }
    if (color === null) {
      return window.alert("그룹 색상을 선택해주세요.");
    }
    loadingOn();
    const memberIdList = [];
    memberCopyList.forEach((m) => {
      if (m.checked) memberIdList.push(m.id);
    });
    console.debug(memberIdList);
    await db
      .collection("worlds")
      .doc(worldDetail.id)
      .set({
        ...worldDetail,
        groups: [
          ...worldDetail.groups,
          {
            id: v4(),
            name: form.name,
            color: color,
            members: memberIdList,
          },
        ],
      });
    closeModal();
    loadingOff();
  };

  return {
    memberCopyList,
    setMemberCopyList,
    storeGroup,
    color,
    setColor,
    getGroupMembers,
  };
}
