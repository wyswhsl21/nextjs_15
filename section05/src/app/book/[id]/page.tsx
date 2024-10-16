import { notFound } from "next/navigation";
import style from "./page.module.css";

// dynamicParams 를 false 로 하면 설정해놓은 id 외에꺼는 404로 보냄
export const dynamicParams = true;
//server 측 full route cache 로 static 페이지로 변경 하는 함수
export function generateStaticParams() {
  return [{ id: "1" }, { id: "2" }, { id: "3" }];
}
export default async function Page({
  params,
}: {
  params: { id: string | string[] };
}) {
  const response = await fetch(
    `${process.env.NEXT_PUBLIC_API_URL}/book/${params.id}`,
    { cache: "force-cache" }
  );

  if (!response.ok) {
    if (response.status === 404) {
      notFound();
    }
    return <div>특정 도서를 불러오지 못했습니다...</div>;
  }
  const loadBook = await response.json();
  const { id, title, subTitle, description, author, publisher, coverImgUrl } =
    loadBook;

  return (
    <div className={style.container}>
      <div
        className={style.cover_img_container}
        style={{ backgroundImage: `url('${coverImgUrl}')` }}
      >
        <img src={coverImgUrl} />
      </div>
      <div className={style.title}>{title}</div>
      <div className={style.subTitle}>{subTitle}</div>
      <div className={style.author}>
        {author} | {publisher}
      </div>
      <div className={style.description}>{description}</div>
    </div>
  );
}
