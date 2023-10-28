"use client"
import { sessionState } from "@/app/login/page";
import { useRouter } from "next/navigation";
import { useRecoilValue } from "recoil";
import Login from "@/app/login/page";


export const ProtectRoute = ({
  children,
}: {
  children: React.ReactNode
}) => {
  const session = useRecoilValue(sessionState);
  const router = useRouter()
  if (!session || !session.token) {
    return <Login />
  }else {
    return children;
  }
};