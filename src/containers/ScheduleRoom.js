import FullCalendar from "@fullcalendar/react";
import dayGridPlugin from "@fullcalendar/daygrid"; // a plugin!
import interactionPlugin from "@fullcalendar/interaction"; // needed for dayClick
import { useSchedule, useTheme } from "src/hooks";

export default function ScheduleRoom() {
  const { scheduleList } = useSchedule();
  const { getMatchedThemeData } = useTheme();
  const { type, particleColor } = getMatchedThemeData();

  return (
    <>
      <div className="w-full h-full p-6">
        <FullCalendar
          eventClassNames="text-red-500"
          customButtons={{
            workCreateButton: {
              text: "일정추가",
              click: function () {
                workFormModalOpen();
              },
            },
          }}
          eventChange={() => {}}
          editable={true}
          width="100%"
          height="100%"
          headerToolbar={{
            left: "title",
            right: "prev,today,next",
          }}
          plugins={[dayGridPlugin, interactionPlugin]}
          initialView="dayGridMonth" //
          // dateClick={handleDateClick} // 달력 클릭시 이벤트
          eventClick={() => {}} // 이벤트 클릭시 이벤트
          dayMaxEvents={true} // 이벤트가 오버되면 높이 제한 (+ 몇 개식으로 표현)
          //scheduleList
          events={scheduleList}
          eventContent={(target) => {
            const title = target.event.title;
            return (
              <div className="bg-white rounded-3xl">
                <div
                  className="px-2 overflow-hidden text-white border border-white rounded-3xl"
                  style={{ backgroundColor: type }}
                >
                  {title}
                </div>
              </div>
            );
          }}
          // eslint-disable-next-line react/jsx-no-duplicate-props
        />
      </div>
      <div className="w-[400px] h-full bg-gray-50"></div>
    </>
  );
}
