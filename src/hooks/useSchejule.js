import { addDays } from "@fullcalendar/react";
import { atom, useRecoilState } from "recoil";
import { dateToString } from "src/util/date";
import { db } from "src/util/firebase";
import { useGlobalModal, useLoading, useWorld } from ".";

const scheduleListState = atom({
  key: "scheduleListState",
  default: [],
});

const scheduleObj = {
  title: "",
  party: null,
  start: dateToString(),
  end: dateToString(addDays(new Date(), 1)),
};

export default function useSchejule() {
  const [scheduleList, setScheduleList] = useRecoilState(scheduleListState);
  const { worldDetail } = useWorld();
  const { loadingOff, loadingOn } = useLoading();
  const { closeModal } = useGlobalModal();

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

  // ? 스캐출 생성
  const store = async (form, dates) => {
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
        title: form.title,
        start: start,
        end: end,
        party: null,
      });
    loadingOff();
    closeModal();
  };

  return { scheduleList, setScheduleListStream, store };
}
