/* eslint-disable react-hooks/exhaustive-deps */
import Link from "next/link";
import {
  useGlobalModal,
  useSchedule,
  useTheme,
  useUser,
  useWorld,
} from "src/hooks";
import { useRouter } from "next/router";
import { ImageOrDefault } from "src/components";
import { useEffect } from "react";
import { GlobalModal } from "src/containers";
import { ScheduleRoom, ScheduleForm } from "src/containers";
import { withPrivate } from "src/hoc";

export default withPrivate(function WorldPage() {
  const { user } = useUser();
  const { theme, getMatchedThemeData } = useTheme();
  const { particleColor, themeColor } = getMatchedThemeData();
  const { openModal, drawTypeMatchedModal } = useGlobalModal();
  const { worldDetail, isValidWorldByWid } = useWorld();
  const { setScheduleListStream } = useSchedule();

  // ? URL 파싱
  const { query } = useRouter();

  // ? 월드 입장시 유효한 월드인지 판단, 월드 디테일 값 저장
  useEffect(() => isValidWorldByWid(query.id), []);

  // ? 월드 입장시 월드의 스케줄리스트 저장
  useEffect(() => {
    if (worldDetail?.id) {
      setScheduleListStream();
    }
  }, [worldDetail]);

  return (
    <>
      <aside className="w-[300px] min-w-[300px] h-full z-20">
        <figure className="flex items-center justify-center w-full py-6 text-lg text-white">
          {worldDetail?.name}
        </figure>
        <div className="flex flex-col items-center justify-center mt-10 text-white">
          <ImageOrDefault
            className="rounded-full"
            src={user?.profileImg}
            alt="img"
            width={80}
            height={80}
          />
          <p className="mt-1">{user?.nickname}</p>
        </div>

        <div className="flex items-center justify-center w-full px-4 mt-6">
          <button
            className="w-full px-4 py-2 font-bold border-white rounded-md shadow-md"
            style={{
              backgroundColor: particleColor,
              color: themeColor,
            }}
            onClick={() => openModal("SCHEDULE_FORM", "일정 작성")}
          >
            Create Schejule
          </button>
        </div>

        <nav className="flex flex-col items-start justify-center w-full mt-10 text-lg text-white font-apple-r">
          {/** @NAV_ITEM  */}
          <Link
            href="/worlds/[id]?room=home"
            as={`/worlds/${query.id}?room=home`}
          >
            <a className="relative z-10 flex items-center justify-start w-full">
              <div
                className={`flex items-center justify-between px-10 py-1 rounded-r-full 
            ${query.room === "home" && "text-black bg-white"}`}
              >
                <i className="mr-2 fa-light fa-house-chimney"></i>
                <p>Home</p>
              </div>
              {query.room === "home" && (
                <div className="absolute -right-5 w-[30px] h-[30px] bg-white rotate-45"></div>
              )}
            </a>
          </Link>
          <Link
            href="/worlds/[id]?room=schedules"
            as={`/worlds/${query.id}?room=schedules`}
          >
            <a className="relative z-10 flex items-center justify-start w-full mt-4">
              <div
                className={`flex items-center justify-between px-10 py-1 rounded-r-full 
            ${query.room === "schedules" && "text-black bg-white"}`}
              >
                <i className="mr-2 fa-light fa-calendar-check"></i>
                <p>Schedules</p>
              </div>
              {query.room === "schedules" && (
                <div className="absolute -right-5 w-[30px] h-[30px] bg-white rotate-45"></div>
              )}
            </a>
          </Link>
          <Link
            href="/worlds/[id]?room=members"
            as={`/worlds/${query.id}?room=members`}
          >
            <a className="relative z-10 flex items-center justify-start w-full mt-4">
              <div
                className={`flex items-center justify-between px-10 py-1 rounded-r-full 
            ${query.room === "members" && "text-black bg-white"}`}
              >
                <i className="mr-2 fa-light fa-user"></i>
                <p>Members</p>
              </div>
              {query.room === "members" && (
                <div className="absolute -right-5 w-[30px] h-[30px] bg-white rotate-45"></div>
              )}
            </a>
          </Link>
          <Link
            href="/worlds/[id]?room=settings"
            as={`/worlds/${query.id}?room=settings`}
          >
            <a className="relative z-10 flex items-center justify-start w-full mt-4">
              <div
                className={`flex items-center justify-between px-10 py-1 rounded-r-full 
            ${query.room === "settings" && "text-black bg-white"}`}
              >
                <i className="mr-2 fa-light fa-screwdriver-wrench"></i>
                <p>Settings</p>
              </div>
              {query.room === "settings" && (
                <div className="absolute -right-5 w-[30px] h-[30px] bg-white rotate-45"></div>
              )}
            </a>
          </Link>
          <Link href="/users/me" as={`/users/me`}>
            <a className="relative z-10 flex items-center justify-start w-full mt-4">
              <div
                className={`flex items-center justify-between px-10 py-1 rounded-r-full `}
              >
                <i className="mr-1 fa-light fa-id-card-clip"></i>
                <p>My Profile</p>
              </div>
            </a>
          </Link>
        </nav>
      </aside>
      <div
        className={`z-50 w-full h-full transition-all 
      ${!theme.roomSizeUp && "p-4 pl-0"}`}
      >
        <main
          className={`w-full h-full overflow-hidden text-black bg-white flex
        ${!theme.roomSizeUp && "rounded-md"}`}
        >
          {query.room === "schedules" && <ScheduleRoom />}
        </main>
      </div>
      {/** @글로벌모달_유저수정타입 */}
      {drawTypeMatchedModal(
        "SCHEDULE_FORM",
        <GlobalModal>
          <ScheduleForm />
        </GlobalModal>
      )}
    </>
  );
});
