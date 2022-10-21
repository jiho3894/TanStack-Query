import { useInfiniteQuery } from "@tanstack/react-query";
import Image from "next/image";
import React, { useCallback, useEffect, useRef } from "react";
import { ProfileProps } from "../core/api/profile/types";
import { getScrollProfile } from "../core/api/scroll/queries";
import { Header, ProfileBox } from "../styles/Home";
import { InfiniteWrapper } from "../styles/Home/InfiniteContainer";

const InfiniteContainer = () => {
  const boxRef = useRef<HTMLDivElement>(null);
  const observerRef = useRef<IntersectionObserver>();
  const {
    data: List,
    fetchNextPage,
    hasNextPage,
  } = useInfiniteQuery(
    ["scroll"],
    async ({ pageParam = 1 }) => {
      return await getScrollProfile(pageParam === null ? 1 : pageParam);
    },
    {
      getNextPageParam: (_, allPages) => {
        return allPages.length + 1;
      },
    }
  );
  const intersectionObserver = useCallback(
    (entries: IntersectionObserverEntry[], io: IntersectionObserver) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          // 관찰하고 있는 entry가 화면에 보여지는 경우
          io.unobserve(entry.target); // entry 관찰 해제
          if (hasNextPage) {
            fetchNextPage(); // 다음 페이지 데이터 요청
          }
        }
      });
    },
    [fetchNextPage, hasNextPage]
  );

  useEffect(() => {
    if (observerRef.current) {
      // 기존에 IntersectionObserver이 있을 경우
      observerRef.current.disconnect(); // 연결 해제
    }
    observerRef.current = new IntersectionObserver(intersectionObserver); // IntersectionObserver 새롭게 정의
    boxRef.current && observerRef.current.observe(boxRef.current); // boxRef 관찰 시작
  }, [List, intersectionObserver]);
  return (
    <InfiniteWrapper>
      <Header>무한 프로필</Header>
      {List?.pages.map((list: ProfileProps[], pageIndex) =>
        list.map((item, itemIndex) => {
          return (
            <ProfileBox
              key={item.id}
              ref={
                list.length * pageIndex + itemIndex ===
                List.pages.length * list.length - 1
                  ? boxRef
                  : null
              }
            >
              <span>{item.name}</span>
              <Image
                width={48}
                height={48}
                src={item.avatar}
                alt={item.avatar}
                placeholder="blur"
                blurDataURL={item.avatar}
              />
            </ProfileBox>
          );
        })
      )}
    </InfiniteWrapper>
  );
};

export default InfiniteContainer;
