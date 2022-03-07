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
  const store = async (form) => {
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

  // ? 그룹 수정
  const edit = async (form) => {
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

    const updateList = worldDetail.groups.map((group) => {
      if (group.id === form.id) {
        return {
          ...group,
          name: form.name,
          color: color,
          members: memberIdList,
        };
      } else {
        return group;
      }
    });

    await db
      .collection("worlds")
      .doc(worldDetail.id)
      .set({
        ...worldDetail,
        groups: updateList,
      });
    closeModal();
    loadingOff();
  };

  // ? 삭제
  const destroy = async (groupId) => {
    const result = window.confirm("정말 삭제하실건가요?");
    if (!result) return;
    loadingOn();

    const filterList = worldDetail.groups.filter(
      (group) => group.id !== groupId
    );
    await db
      .collection("worlds")
      .doc(worldDetail.id)
      .set({
        ...worldDetail,
        groups: filterList,
      });
    closeModal();
    loadingOff();
  };

  return {
    memberCopyList,
    setMemberCopyList,
    store,
    edit,
    destroy,
    color,
    setColor,
    getGroupMembers,
  };
}
