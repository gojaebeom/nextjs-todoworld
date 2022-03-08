/* eslint-disable @next/next/no-img-element */
import FullCalendar, { addDays } from "@fullcalendar/react";
import dayGridPlugin from "@fullcalendar/daygrid"; // a plugin!
import interactionPlugin from "@fullcalendar/interaction"; // needed for dayClick
import { useGlobalModal, useSchedule, useTheme, useWorld } from "src/hooks";
import { useState } from "react";
import { dateToString } from "src/util/date";
import { ImageOrDefault } from "src/components";
import { GlobalModal, WorldScheduleEditForm } from "src/containers";

export default function ScheduleRoom() {
  const { getMatchedThemeData } = useTheme();
  const { type } = getMatchedThemeData();
  const { worldDetail, memberList } = useWorld();
  const [checkedGroupId, setCheckedGroupId] = useState(null);
  const [checkedDate, setCheckedDate] = useState(null);
  const [checkedFinishView, setCheckedFinishView] = useState(true);
  const { scheduleList, getFilterScheduleList, changeFinished } = useSchedule();
  const { openModal, drawTypeMatchedModal } = useGlobalModal();

  return (
    <>
      <div className="w-full h-full p-6">
        <div className="flex flex-wrap">
          <button
            type="button"
            className={`px-2 mb-1 mr-1 text-sm text-white rounded-xl ${
              checkedGroupId === null && `border border-black`
            }`}
            style={{ backgroundColor: type }}
            onClick={() => setCheckedGroupId(null)}
          >
            전체
          </button>
          {worldDetail?.groups?.map((group, i) => {
            return (
              <button
                type="button"
                key={i}
                className={`px-2 mb-1 mr-1 text-sm text-white rounded-xl ${
                  checkedGroupId === group.id && `border border-black`
                }`}
                style={{ backgroundColor: group.color }}
                onClick={() => setCheckedGroupId(group.id)}
              >
                {group.name}
              </button>
            );
          })}
          <button
            className={`px-2 mb-1 border ml-2 text-xs rounded-xl`}
            style={{
              color: !checkedFinishView && type,
              border: !checkedFinishView && `1px solid ${type}`,
            }}
            onClick={() => setCheckedFinishView(!checkedFinishView)}
          >
            완료한 일정 숨기기
          </button>
        </div>
        <FullCalendar
          eventClassNames="text-red-500"
          eventChange={() => {}}
          // editable={true}
          width="100%"
          height="100%"
          headerToolbar={{
            left: "title",
            right: "prev,today,next",
          }}
          plugins={[dayGridPlugin, interactionPlugin]}
          initialView="dayGridMonth" //
          eventClick={(e) => {
            openModal("SCHEDULE_EDIT_FORM", "일정 수정", false, {
              id: e.event.id,
              title: e.event.title,
              groupId: e.event.groupId,
              start: e.event.start,
              end: addDays(e.event.end, -1),
            });
          }}
          dateClick={(e) => setCheckedDate(e.dateStr)}
          dayMaxEvents={true} // 이벤트가 오버되면 높이 제한 (+ 몇 개식으로 표현)
          //scheduleList
          events={getFilterScheduleList(checkedGroupId, checkedFinishView)}
          eventContent={(target) => {
            let color = null;
            worldDetail.groups.forEach((group) => {
              if (target.event.groupId === group.id) color = group.color;
            });
            return (
              <div className="bg-white rounded-3xl">
                <div
                  className="px-2 overflow-hidden text-white border border-white rounded-3xl"
                  style={{
                    backgroundColor: color ? color : type,
                  }}
                >
                  {target.event.title}
                </div>
              </div>
            );
          }}
          // eslint-disable-next-line react/jsx-no-duplicate-props
        />
      </div>
      <div className="min-w-[320px] max-w-[320px] h-full bg-gray-50 p-2 text-gray-700">
        <div className="mb-4 text-2xl font-pre-bb">
          {checkedDate === null ? "오늘" : checkedDate}
          &nbsp;일정
        </div>
        <div className="h-[95%] overflow-y-auto custom-scroll">
          {scheduleList.length ? (
            getFilterScheduleList(
              checkedGroupId,
              checkedFinishView,
              checkedDate ? checkedDate : dateToString()
            ).map((schedule) => {
              return (
                <div
                  key={schedule.id}
                  className="mb-2 bg-white border rounded-md"
                >
                  {memberList.map((member) => {
                    if (member.id === schedule.userId) {
                      return (
                        <div
                          className="relative flex items-center justify-start pt-2 pl-2"
                          key={member.id}
                        >
                          <ImageOrDefault
                            src={member.profileURL}
                            width={30}
                            height={30}
                            className="rounded-full"
                          />
                          <div className="ml-1">{member.nickname}</div>
                          <button
                            style={{
                              color: schedule.isFinished && type,
                            }}
                            onClick={() => changeFinished(schedule)}
                          >
                            <i className="absolute top-0 right-0 m-2 text-xl fa-light fa-badge-check"></i>
                          </button>
                        </div>
                      );
                    }
                  })}
                  <pre className="p-2 text-sm whitespace-pre-wrap font-pre-l">
                    {schedule.title}
                  </pre>
                  <div>
                    {worldDetail.groups.map((group) => {
                      if (group.id === schedule.groupId) {
                        return (
                          <div
                            key={group.id}
                            className="p-1 text-sm text-white rounded-b-md"
                            style={{ backgroundColor: group.color }}
                          >
                            #{group.name}
                          </div>
                        );
                      }
                    })}
                  </div>
                </div>
              );
            })
          ) : (
            <div className="w-full h-[95%] flex flex-col items-center justify-center">
              <img src="/await.svg" alt="img" />
              <span>아직 작성된 일정이 없어요.</span>
            </div>
          )}
        </div>
      </div>
      {/** @글로벌모달_초대폼 */}
      {drawTypeMatchedModal(
        "SCHEDULE_EDIT_FORM",
        <GlobalModal>
          <WorldScheduleEditForm />
        </GlobalModal>
      )}
    </>
  );
}
