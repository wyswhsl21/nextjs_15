"use client";

import { ReactNode } from "react";

//클라이언트 컴포넌트에서 서버 컴포넌트를 가져올땐 children 으로 prop으로 받아 사용하자!
export default function ClientComponent({ children }: { children: ReactNode }) {
  console.log("클라이언트 섬포넌트");
  return <div>{children}</div>;
}
