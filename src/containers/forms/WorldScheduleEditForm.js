/* eslint-disable @next/next/no-img-element */
import { useState } from "react";
import { useForm } from "react-hook-form";
import { ThemeArea, ThemeButton } from "src/components";
import { useGlobalModal, useSchedule, useTheme, useWorld } from "src/hooks";

import { DateRange } from "react-date-range";
import ko from "date-fns/locale/ko";
import "react-date-range/dist/styles.css"; // main style file
import "react-date-range/dist/theme/default.css";

export default function ScheduleEditForm() {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();
  const { modal } = useGlobalModal();
  const [dates, setDates] = useState([
    {
      startDate: modal.data.start,
      endDate: modal.data.end,
      key: "selection",
    },
  ]);
  const [checkedGroupId, setCheckedGroupId] = useState(modal.data.groupId);

  const { getMatchedThemeData } = useTheme();
  const { type } = getMatchedThemeData();
  const { worldDetail } = useWorld();
  const { edit, destroy } = useSchedule();

  return (
    <form
      onSubmit={handleSubmit((form) => {
        console.debug("수정!!");
        edit(form, dates, checkedGroupId);
      })}
      className="min-w-[350px] max-w-[350px]"
    >
      <input
        {...register("id", {
          required: "업무 아이디는 필수값입니다.",
        })}
        value={modal.data.id}
        className="hidden text-xs"
      />
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
        value={modal.data.title}
        placeholder={`간단하게 일정을 작성해보세요.\n상세한 일정은 더더욱 좋아요!`}
        errors={errors}
      />
      <label className="text-xs text-gray-500">그룹선택</label>
      <div className="flex flex-wrap mb-4">
        <button
          type="button"
          className={`px-2 mb-1 mr-1 text-sm text-white rounded-xl bg-gray-500 ${
            checkedGroupId === null && "border-2 border-gray-600"
          }`}
          onClick={() => setCheckedGroupId(null)}
        >
          전체
        </button>
        {worldDetail.groups?.map((group, i) => {
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

      <ThemeButton type="submit" className="mt-2">
        수정하기
      </ThemeButton>
      <button
        type="button"
        className="w-full mt-4 text-sm text-right text-red-500"
        onClick={() => destroy(modal.data.id)}
      >
        삭제하기
      </button>
    </form>
  );
}
