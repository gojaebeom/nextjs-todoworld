/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable @next/next/no-img-element */
import { useState, useEffect } from "react";
import { useForm } from "react-hook-form";
import { ThemeArea, ThemeButton } from "src/components";
import { useSchedule, useStorage, useTheme, useWorld } from "src/hooks";

import { DateRange } from "react-date-range";
import ko from "date-fns/locale/ko";
import "react-date-range/dist/styles.css"; // main style file
import "react-date-range/dist/theme/default.css";

export default function ScheduleForm() {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();
  const [dates, setDates] = useState([
    {
      startDate: new Date(),
      endDate: new Date(),
      key: "selection",
    },
  ]);
  const [checkedGroupId, setCheckedGroupId] = useState(null);

  const { getMatchedThemeData } = useTheme();
  const { type } = getMatchedThemeData();
  const { worldDetail } = useWorld();
  const { store } = useSchedule();
  const { setStorage, getStorage, destroyStorage } = useStorage();

  useEffect(() => {
    const item = getStorage("s_scgi");
    setCheckedGroupId(item);
  }, []);

  return (
    <form
      onSubmit={handleSubmit((form) => store(form, dates, checkedGroupId))}
      className="min-w-[350px] max-w-[350px]"
    >
      <ThemeArea
        reactHookFormObj={{
          ...register("title", {
            required: "업무 내용은 필수입니다.",
            minLength: {
              value: 2,
              message: "두글자도 안쓰다니 거 너무한거 아니오..",
            },
          }),
        }}
        label="업무내용"
        name="title"
        type="text"
        placeholder={`간단하게 일정을 작성해보세요.\n상세한 일정은 더더욱 좋아요!`}
        errors={errors}
      />
      <label className="text-xs text-gray-500">그룹선택</label>
      <div className="flex flex-wrap mb-4">
        <button
          type="button"
          className="flex px-2 mb-1 mr-1 text-sm text-white bg-gray-500 cursor-pointer rounded-xl"
          onClick={() => {
            setCheckedGroupId(null);
            destroyStorage("s_scgi");
          }}
        >
          전체
          <span className={`${checkedGroupId === null ? "block" : "hidden"}`}>
            <i className="ml-1 fa-light fa-location-check"></i>
          </span>
        </button>
        {worldDetail.groups?.map((group, i) => {
          return (
            <button
              type="button"
              key={i}
              className="flex px-2 mb-1 mr-1 text-sm text-white cursor-pointer rounded-xl"
              style={{ backgroundColor: group.color }}
              onClick={() => {
                setCheckedGroupId(group.id);
                setStorage("s_scgi", group.id);
              }}
            >
              {group.name}
              <span
                className={`${
                  checkedGroupId === group.id ? "block" : "hidden"
                }`}
              >
                <i className="ml-1 fa-light fa-location-check"></i>
              </span>
            </button>
          );
        })}
      </div>
      <label className="text-xs text-gray-500">
        날짜선택 (오늘날짜가 기본값입니다.)
      </label>
      <DateRange
        className="w-full"
        editableDateInputs={true}
        onChange={(item) => {
          console.debug(item.selection);
          console.debug(item.selection);
          setDates([item.selection]);
        }}
        moveRangeOnFirstSelection={false}
        ranges={dates}
        months={1}
        color={type}
        rangeColors={[type]}
        // direction="horizontal"
        locale={ko}
      />

      <br />

      <ThemeButton className="mt-2">생성하기</ThemeButton>
    </form>
  );
}
