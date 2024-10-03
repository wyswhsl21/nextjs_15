import React from "react";
import style from "./[id].module.css";
import { GetStaticPropsContext, InferGetStaticPropsType } from "next";
import fetchOneBook from "@/lib/fetch-one-book";
import { useRouter } from "next/router";

export const getStaticPaths = () => {
  return {
    paths: [
      { params: { id: "1" } },
      { params: { id: "2" } },
      { params: { id: "3" } },
    ],
    //fallback 상태: 페이지 컴포넌트가 아직 서버로 부터 데이터를 전달 받지 못한 상태를 말한다.

    //fallback :false 일 경우 404 path에 설정되지 않은 경로는 모두 404 화면으로 보냄.
    // fallback blocking 일 경우에는 즉각적으로 page 를 생성해서 return 해준다.
    // fallback true일 경우에는 ui 먼저 전송해주고 나중에 서버에서 필요한 값들을 계산해서 보내준다.
    // true :SSR 방식 + 데이터가 없는 풀백 상태의 페이지부터 반환
    fallback: true,
  };
};
// 넥스트에서 SSG 정적 경로 페이지 함수
export const getStaticProps = async (context: GetStaticPropsContext) => {
  const id = context.params!.id;
  const book = await fetchOneBook(Number(id));
  if (!book) {
    return {
      notFound: true,
    };
  }
  return {
    props: { book },
  };
};
export default function Page({
  book,
}: InferGetStaticPropsType<typeof getStaticProps>) {
  const router = useRouter();

  if (router.isFallback) return "로딩중입니다.";
  if (!book) return "문제가 발생 했습니다. 다시 시도하세요";

  const { title, subTitle, description, author, publisher, coverImgUrl } = book;
  return (
    <div className={style.container}>
      <div
        className={style.cover_img_container}
        style={{ backgroundImage: `url(${coverImgUrl})` }}
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
