import FullCalendar from "@fullcalendar/react";
import dayGridPlugin from "@fullcalendar/daygrid"; // a plugin!
import interactionPlugin from "@fullcalendar/interaction"; // needed for dayClick
import { useSchedule, useTheme, useWorld } from "src/hooks";
import { useState } from "react";
import { dateToString } from "src/util/date";
import { ImageOrDefault } from "src/components";

export default function ScheduleRoom() {
  const { getMatchedThemeData } = useTheme();
  const { type } = getMatchedThemeData();
  const { worldDetail, memberList } = useWorld();
  const [checkedGroupId, setCheckedGroupId] = useState(null);
  const [checkedDate, setCheckedDate] = useState(null);
  const { getFilterScheduleList } = useSchedule();

  return (
    <>
      <div className="w-full h-full p-6">
        <div className="flex flex-wrap">
          <button
            type="button"
            className={`px-2 mb-1 mr-1 text-sm text-white rounded-xl bg-gray-500 ${
              checkedGroupId === null && "border-2 border-gray-600"
            }`}
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
                  checkedGroupId === group.id && "border-2 border-gray-600"
                }`}
                style={{ backgroundColor: group.color }}
                onClick={() => setCheckedGroupId(group.id)}
              >
                {group.name}
              </button>
            );
          })}
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
          // dateClick={handleDateClick} // 달력 클릭시 이벤트
          dateClick={(e) => setCheckedDate(e.dateStr)}
          dayMaxEvents={true} // 이벤트가 오버되면 높이 제한 (+ 몇 개식으로 표현)
          //scheduleList
          events={getFilterScheduleList(checkedGroupId)}
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
      <div className="w-[400px] max-w-[400px] h-full bg-gray-50 p-4 text-gray-700">
        <div className="mb-4 text-2xl font-pre-bb">
          {checkedDate === null ? "오늘" : checkedDate}
          &nbsp;일정
        </div>
        <div>
          {getFilterScheduleList(
            checkedGroupId,
            true,
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
                      <div className="flex items-center justify-start pt-2 pl-2">
                        <ImageOrDefault
                          src={member.profileURL}
                          width={30}
                          height={30}
                          className="rounded-full"
                        />
                        <div className="ml-1">{member.nickname}</div>
                      </div>
                    );
                  }
                })}
                <pre className="p-2 text-sm font-pre-l">{schedule.title}</pre>
                <div className="">
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
          })}
        </div>
      </div>
    </>
  );
}
