import '@/styles/globals.css';
import type { AppProps } from 'next/app';

import GlobalLayout from '@/components/global-layout';
import { ReactNode } from 'react';
import { NextPage } from 'next';
//모든 컴포넌트의 부모 컴포넌트 역할을 한다.
/**
 *
 * @param Component
 *  렌더링 할 컴포넌트
 * @returns
 * pageProps -> 렌더링할 컴포넌트의 Props를 객체로 관리한다.
 */

type NextPageWithLayout = NextPage & {
  getLayout: (page: ReactNode) => ReactNode;
};
export default function App({
  Component,
  pageProps,
}: AppProps & {
  Component: NextPageWithLayout;
}) {
  const getLayout = Component.getLayout ?? ((page: ReactNode) => page);

  // const router = useRouter();

  //프로그매틱한 Navigation
  // const onClickButton = () => {
  //   router.push('/test');
  // };
  // useEffect(() => {
  //   router.prefetch('test');
  // }, []);
  return <GlobalLayout>{getLayout(<Component {...pageProps} />)}</GlobalLayout>;
}
