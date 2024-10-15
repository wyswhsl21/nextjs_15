"use client";
import styles from "./page.module.css";
import ClientComponent from "./components/client-component";
import SearchBar from "./components/searchbar";
import ServerComponent from "./components/server-component";

export default function Home() {
  console.log("Home 컴포넌트 실행");
  return (
    <div className={styles.page}>
      <SearchBar />
      인덱스 페이지
      <ClientComponent>
        <ServerComponent />
      </ClientComponent>
    </div>
  );
}
