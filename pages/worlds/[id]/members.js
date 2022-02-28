import { useRouter } from "next/router";

export default function WorldMemberPage() {
  const router = useRouter();
  const { id } = router.query;
  return <div>{id}:번 맴버</div>;
}
