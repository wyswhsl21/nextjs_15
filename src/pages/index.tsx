import SearchableLayout from "@/components/searchable-layout";
import style from "./index.module.css";
import { ReactNode } from "react";
import BookItem from "@/components/book-item";
import fetchBooks from "@/lib/fetch-books";
import { InferGetServerSidePropsType } from "next";
import fetchRandomBooks from "@/lib/fetch-random";

//server side rendering 함수
//서버 측에서만 나오는 함수

//api 를 병렬 구조로 통신하는 법
//자바스크립트 비동기 함수인 Promise 를 이용해서 모든 조회 함수를 한번에 받아오게끔 할 수 있음.
export const getServerSideProps = async () => {
  const [allBooks, recoBooks] = await Promise.all([
    fetchBooks(),
    fetchRandomBooks(),
  ]);
  return {
    props: { allBooks, recoBooks },
    revalidate: 3,
  };
};

export default function Home({
  recoBooks,
}: InferGetServerSidePropsType<typeof getServerSideProps>) {
  return (
    <div className={style.container}>
      <section>
        <h3>지금 추천하는 도서</h3>
        {recoBooks?.map((book) => (
          <BookItem key={book.id} {...book} />
        ))}
      </section>
      <section>
        <h3>등록된 모든 도서</h3>
      </section>
    </div>
  );
}

//스타일링 하는 방법

// 별도의 레이아웃으로 감싸진 형태로  return  시키는 방법
Home.getLayout = (page: ReactNode) => {
  return <SearchableLayout>{page}</SearchableLayout>;
};
