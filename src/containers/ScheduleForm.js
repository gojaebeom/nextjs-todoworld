/* eslint-disable @next/next/no-img-element */
import { useState } from "react";
import { useForm } from "react-hook-form";
import { ThemeArea, ThemeButton } from "src/components";
import { useSchedule, useTheme } from "src/hooks";

import { DateRange } from "react-date-range";
import ko from "date-fns/locale/ko";
import "react-date-range/dist/styles.css"; // main style file
import "react-date-range/dist/theme/default.css";

export default function ScheduleForm() {
  const { store } = useSchedule();
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

  const { getMatchedThemeData } = useTheme();
  const { type } = getMatchedThemeData();

  return (
    <form
      onSubmit={handleSubmit((form) => store(form, dates))}
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

      <label className="text-xs text-gray-500">날짜선택</label>
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
