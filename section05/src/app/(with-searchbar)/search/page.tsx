import BookItem from "@/components/book-item";
import { BookData } from "@/types";
//동적 함수 사용하기 때문에 Dynamic page 로 자동 설정 됨.
//Full Route Cache 포기해야하지만 , 데이터 패치만 사용할 수 있음.
export default async function Page({
  searchParams,
}: {
  searchParams: {
    q?: string;
  };
}) {
  const response = await fetch(
    `${process.env.NEXT_PUBLIC_API_URL}/book/search?q=${searchParams.q}`,
    { cache: "force-cache" }
  );
  if (!response.ok) {
    return <div>검색 된 도서가 없습니다.</div>;
  }
  const books: BookData[] = await response.json();
  return (
    <div>
      {books.map((book) => (
        <BookItem key={book.id} {...book} />
      ))}
    </div>
  );
}
