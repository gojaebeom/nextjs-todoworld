/* eslint-disable react-hooks/exhaustive-deps */
import { useForm } from "react-hook-form";
import { useState } from "react";
import { ImageOrDefault, ThemeButton, ThemeInput } from "src/components";
import { useGlobalModal, useGroup } from "src/hooks";
import { useEffect } from "react";

export default function MemberGroupForm() {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();
  const { edit, destroy, memberCopyList, setMemberCopyList, color, setColor } =
    useGroup();
  const { modal } = useGlobalModal();
  // on : 맴버 선택박스로 이동
  const [memberChoose, setMemberChoose] = useState(false);

  useEffect(() => {
    setColor(modal.data.color);
  }, []);

  return !memberChoose ? (
    <form
      onSubmit={handleSubmit((form) => edit(form))}
      className="min-w-[350px] max-w-[350px]"
    >
      <input
        {...register("id", {
          required: "그룹 아이디는 필수값입니다.",
        })}
        value={modal.data.id}
        className="hidden text-xs"
      />
      <ThemeInput
        reactHookFormObj={{
          ...register("name", {
            required: "그룹 이름은 필수 입력값입니다.",
          }),
        }}
        label="name"
        name="name"
        value={modal.data.name}
        type="text"
        placeholder="그룹 이름 입력"
        errors={errors}
      />
      <div className="flex items-center">
        <button
          type="button"
          onClick={() => setMemberChoose(true)}
          className="p-2 border rounded-md"
        >
          그룹원 선택
        </button>
        {memberCopyList.filter((m) => m.checked).length > 0 && (
          <div className="mt-1 ml-2">
            ...{memberCopyList.filter((m) => m.checked).length}명 선택됨
          </div>
        )}
      </div>
      <div>
        <p className="mt-2 mb-1 text-xs text-gray-600">그룹 색상</p>
        <div>
          <button
            type="button"
            className={`w-10 h-10 mr-2 bg-[#27aae1] border-4 border-[#85C1E9] rounded-full cursor-pointer ${
              color === "#27aae1" && "animate-pulse"
            }`}
            onClick={() => setColor("#27aae1")}
          ></button>
          <button
            type="button"
            className={`w-10 h-10 mr-2 bg-[#ef404a] border-4 border-[#ed7279] rounded-full cursor-pointer ${
              color === "#ef404a" && "animate-pulse"
            }`}
            onClick={() => setColor("#ef404a")}
          ></button>
          <button
            type="button"
            className={`w-10 h-10 mr-2 bg-[#f2728c] border-4 border-[#f09eaf] rounded-full cursor-pointer ${
              color === "#f2728c" && "animate-pulse"
            }`}
            onClick={() => setColor("#f2728c")}
          ></button>
          <button
            type="button"
            className={`w-10 h-10 mr-2 bg-[#ffd400] border-4 border-[#ffe359] rounded-full cursor-pointer ${
              color === "#ffd400" && "animate-pulse"
            }`}
            onClick={() => setColor("#ffd400")}
          ></button>
          <button
            type="button"
            className={`w-10 h-10 mr-2 border-4 bg-[#80b463] border-[#9dbb8c] rounded-full cursor-pointer ${
              color === "#80b463" && "animate-pulse"
            }`}
            onClick={() => setColor("#80b463")}
          ></button>
          <button
            type="button"
            className={`w-10 h-10 mr-2 bg-[#4eb8b9] border-4 border-[#7ec4c4] rounded-full cursor-pointer ${
              color === "#4eb8b9" && "animate-pulse"
            }`}
            onClick={() => setColor("#4eb8b9")}
          ></button>
          <button
            type="button"
            className={`w-10 h-10 mr-2 bg-[#9e7eb9] border-4 border-[#bda3d4] rounded-full cursor-pointer ${
              color === "#9e7eb9" && "animate-pulse"
            }`}
            onClick={() => setColor("#9e7eb9")}
          ></button>
        </div>
        <div className="mt-1">
          <button
            type="button"
            className={`w-10 h-10 mr-2 bg-[#a7a9ac] border-4 border-[#bdbdbd] rounded-full cursor-pointer ${
              color === "#a7a9ac" && "animate-pulse"
            }`}
            onClick={() => setColor("#a7a9ac")}
          ></button>
          <button
            type="button"
            className={`w-10 h-10 mr-2 border-4 bg-[#f79552] border-[#f0a472] rounded-full cursor-pointer ${
              color === "#f79552" && "animate-pulse"
            }`}
            onClick={() => setColor("#f79552")}
          ></button>
          <button
            type="button"
            className={`w-10 h-10 mr-2 bg-[#f7c0c7] border-4 border-[#f7ced3] rounded-full cursor-pointer ${
              color === "#f7c0c7" && "animate-pulse"
            }`}
            onClick={() => setColor("#f7c0c7")}
          ></button>
          <button
            type="button"
            className={`w-10 h-10 mr-2 bg-[#ffcc4e] border-4 border-[#ffd771] rounded-full cursor-pointer ${
              color === "#ffcc4e" && "animate-pulse"
            }`}
            onClick={() => setColor("#ffcc4e")}
          ></button>
          <button
            type="button"
            className={`w-10 h-10 mr-2 bg-[#d5e05b] border-4 border-[#e8f371] rounded-full cursor-pointer ${
              color === "#d5e05b" && "animate-pulse"
            }`}
            onClick={() => setColor("#d5e05b")}
          ></button>
          <button
            type="button"
            className={`w-10 h-10 mr-2 bg-[#81d3eb] border-4 border-[#91e1fa] rounded-full cursor-pointer ${
              color === "#81d3eb" && "animate-pulse"
            }`}
            onClick={() => setColor("#81d3eb")}
          ></button>
          <button
            type="button"
            className={`w-10 h-10 mr-2 border-4 bg-[#b0dfdb] border-[#beebe7] rounded-full cursor-pointer ${
              color === "#b0dfdb" && "animate-pulse"
            }`}
            onClick={() => setColor("#b0dfdb")}
          ></button>
        </div>
        <div className="mt-1">
          <button
            type="button"
            className={`w-10 h-10 mr-2 bg-[#bbb8dc] border-4 border-[#cccaeb] rounded-full cursor-pointer ${
              color === "#bbb8dc" && "animate-pulse"
            }`}
            onClick={() => setColor("#bbb8dc")}
          ></button>
        </div>
      </div>
      <ThemeButton className="mt-2">만들기</ThemeButton>
      <button
        type="button"
        className="w-full mt-4 text-sm text-right text-red-500"
        onClick={() => destroy(modal.data.id)}
      >
        삭제하기
      </button>
    </form>
  ) : (
    <div className="flex flex-col">
      {memberCopyList.map((member) => {
        return (
          <div
            key={member.id}
            className="flex items-center justify-between p-2 mb-2 border rounded-md"
          >
            <div className="flex items-center">
              <ImageOrDefault
                src={member.profileURL}
                width={40}
                height={40}
                className="rounded-full"
              />
              <span className="ml-2">{member.nickname}</span>
            </div>
            <input
              // value={member.checked}
              defaultChecked={member.checked}
              type="checkbox"
              className="text-xl"
              onChange={(e) => {
                const checked = e.target.checked;
                const filterList = memberCopyList.map((m) => {
                  if (m.id === member.id) {
                    return {
                      ...m,
                      checked: checked,
                    };
                  } else {
                    return m;
                  }
                });
                setMemberCopyList(filterList);
              }}
            />
          </div>
        );
      })}
      <ThemeButton clickEvent={() => setMemberChoose(false)} className="mt-2">
        선택 완료
      </ThemeButton>
    </div>
  );
}
