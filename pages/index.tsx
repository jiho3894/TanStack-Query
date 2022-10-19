import { dehydrate, QueryClient, useQuery } from "@tanstack/react-query";
import type { NextPage } from "next";
import Image from "next/image";
import Link from "next/link";
import Seo from "../components/common/Seo";
import { getProfile, useGetProfile } from "../core/api/profile/queries";
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
      <Header>프로필</Header>
      <ProfileWrapper>
        {List?.map((data) => {
          return (
            <Link key={data.id} href={`/${data.id}`}>
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
    </HomeContainer>
  );
};

export default Home;

export const getStaticProps = async () => {
  try {
    await queryClient.fetchQuery(["profile"], getProfile);
    return {
      props: {
        dehydratedState: dehydrate(queryClient),
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
