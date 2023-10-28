"use client"
import { sessionState } from "@/app/login/page";
import { useRouter } from "next/navigation";
import { useRecoilValue } from "recoil";


export const ProtectRoute = ({
  children,
}: {
  children: React.ReactNode
}) => {
  const session = useRecoilValue(sessionState);
  const router = useRouter()
  if (!session || !session.token) {
    if (typeof window !== "undefined") {
      router.push("/login");
    }
  }
  return children;
};