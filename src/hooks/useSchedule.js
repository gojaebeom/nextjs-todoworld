import { addDays } from "@fullcalendar/react";
import { atom, useRecoilState } from "recoil";
import { dateToString } from "src/util/date";
import { db } from "src/util/firebase";
import { useGlobalModal, useLoading, useWorld } from ".";
import useUser from "./useUser";

const scheduleListState = atom({
  key: "scheduleListState",
  default: [],
});

const scheduleObj = {
  title: "",
  start: dateToString(),
  end: dateToString(addDays(new Date(), 1)),
  isFinished: false,
  color: null,
};

export default function useSchedule() {
  const [scheduleList, setScheduleList] = useRecoilState(scheduleListState);
  const { worldDetail, memberLevelUpdate } = useWorld();
  const { loadingOff, loadingOn } = useLoading();
  const { closeModal } = useGlobalModal();
  const { user } = useUser();

  // ? 접속중인 월드의 스케줄 리스트 저장
  const setScheduleListStream = async () => {
    return db
      .collection("worlds")
      .doc(worldDetail.id)
      .collection("schedules")
      .orderBy("start", "asc")
      .onSnapshot((snapshot) => {
        let list = [];
        snapshot.docs.forEach((schedule) => {
          console.debug(schedule.data());
          list.push({
            id: schedule.id,
            ...schedule.data(),
          });
        });
        console.debug(list);
        setScheduleList(list);
      });
  };

  // ? 스캐줄 필터링
  const getFilterScheduleList = (
    groupId,
    isFinishedView = false,
    day = null
  ) => {
    return scheduleList.filter((schedule) => {
      if (isFinishedView || !schedule.isFinished) {
        if (groupId) {
          if (schedule.groupId === groupId) {
            if (day === null) {
              return schedule;
            } else {
              if (
                new Date(schedule.start) <= new Date(day) &&
                new Date(day) <= addDays(new Date(schedule.end), -1)
              ) {
                return schedule;
              }
            }
          }
        } else {
          if (day === null) {
            return schedule;
          } else {
            if (
              new Date(schedule.start) <= new Date(day) &&
              new Date(day) <= addDays(new Date(schedule.end), -1)
            ) {
              return schedule;
            }
          }
        }
      }
    });
  };

  // ? 스캐줄 생성
  const store = async (form, dates, groupId) => {
    loadingOn();
    console.debug(dates);

    const start = dateToString(dates[0].startDate);
    const end = dateToString(addDays(dates[0].endDate, 1));

    await db
      .collection("worlds")
      .doc(worldDetail.id)
      .collection("schedules")
      .add({
        ...scheduleObj,
        userId: user.id,
        groupId: groupId,
        title: form.title,
        start: start,
        end: end,
        isFinished: false,
      });

    // ? 레벨 업데이트
    console.debug(worldDetail.members.filter((m) => m.id === user.id)[0].exp);

    memberLevelUpdate(form.title.length);

    loadingOff();
    closeModal();
  };

  // ? 스캐줄 수정
  const edit = async (form, dates, groupId) => {
    loadingOn();
    console.debug("스캐줄 수정!!");
    const start = dateToString(dates[0].startDate);
    const end = dateToString(addDays(dates[0].endDate, 1));

    await db
      .collection("worlds")
      .doc(worldDetail.id)
      .collection("schedules")
      .doc(form.id)
      .set({
        ...scheduleObj,
        userId: user.id,
        groupId: groupId,
        title: form.title,
        start: start,
        end: end,
        isFinished: false,
      });
    loadingOff();
    closeModal();
  };

  const changeFinished = async (schedule) => {
    loadingOn();
    await db
      .collection("worlds")
      .doc(worldDetail.id)
      .collection("schedules")
      .doc(schedule.id)
      .set({
        ...schedule,
        isFinished: !schedule.isFinished,
      });
    loadingOff();
  };

  const destroy = async (scheduleId) => {
    const result = window.confirm("정말 삭제하실건가요?");
    if (!result) return;
    loadingOn();
    await db
      .collection("worlds")
      .doc(worldDetail.id)
      .collection("schedules")
      .doc(scheduleId)
      .delete();
    closeModal();
    loadingOff();
  };

  return {
    scheduleList,
    setScheduleListStream,
    store,
    edit,
    changeFinished,
    getFilterScheduleList,
    destroy,
  };
}
