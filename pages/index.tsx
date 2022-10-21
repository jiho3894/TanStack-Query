import { dehydrate } from "@tanstack/react-query";
import type { NextPage } from "next";
import Image from "next/image";
import Link from "next/link";
import Seo from "../components/common/Seo";
import InfiniteContainer from "../components/InfiniteContainer";
import NumberCountContainer from "../components/NumberCountContainer";
import { getProfile, useGetProfile } from "../core/api/profile/queries";
import { getScrollProfile } from "../core/api/scroll/queries";
import {
  Header,
  HomeContainer,
  ProfileBox,
  ProfileWrapper,
} from "../styles/Home";
import { queryClient } from "./_app";

const Home: NextPage = () => {
  const { data: List } = useGetProfile();
  return (
    <HomeContainer>
      <Seo title="Home" />
      <ProfileWrapper>
        <Header>프로필</Header>
        {List?.map((data) => {
          return (
            <Link
              key={data.id}
              href={{
                pathname: `/${data.id}`,
                query: { name: data.name },
              }}
            >
              <ProfileBox>
                <span>{data.name}</span>
                <Image
                  width={48}
                  height={48}
                  src={data.avatar}
                  alt={data.avatar}
                  placeholder="blur"
                  blurDataURL={data.avatar}
                />
              </ProfileBox>
            </Link>
          );
        })}
      </ProfileWrapper>
      <InfiniteContainer />
      <NumberCountContainer />
    </HomeContainer>
  );
};

export default Home;

export const getStaticProps = async () => {
  try {
    await queryClient.prefetchQuery(["profile"], getProfile);
    await queryClient.prefetchInfiniteQuery(["scroll"], () =>
      getScrollProfile(1)
    );
    return {
      props: {
        dehydratedState: JSON.parse(JSON.stringify(dehydrate(queryClient))),
      },
    };
  } catch (error) {
    return {
      notFound: true,
    };
  } finally {
    queryClient.clear();
  }
};
