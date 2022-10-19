import { dehydrate } from "@tanstack/react-query";
import Image from "next/image";
import { useRouter } from "next/router";
import Seo from "../components/common/Seo";
import instance from "../core/api/axios";
import {
  getProfileDetail,
  useGetProfileDetail,
} from "../core/api/profile/queries";
import { ProfileProps } from "../core/api/profile/types";
import { InfoWrapper, ProfileContainer } from "../styles/Profile";
import { queryClient } from "./_app";

type Profile = {
  profile: string;
};

interface PageProps {
  params: Profile;
}

const Profile = () => {
  const {
    query: { profile },
  } = useRouter();
  const { data: MyInfo } = useGetProfileDetail(String(profile));
  if (MyInfo === undefined) return;
  return (
    <ProfileContainer>
      <Seo title={`Profile / ${String(profile)}`} />
      <InfoWrapper>
        <Image
          src={MyInfo.avatar}
          alt={MyInfo.avatar}
          width={256}
          height={256}
          layout="fixed"
        />
        <span>{MyInfo.name}</span>
      </InfoWrapper>
    </ProfileContainer>
  );
};

export default Profile;

export const getStaticPaths = async () => {
  const res = await instance.get("/profile");
  return {
    paths: res.data.map((data: ProfileProps) => {
      return {
        params: {
          profile: data.id,
        },
      };
    }),
    fallback: false,
  };
};

export const getStaticProps = async (context: PageProps) => {
  try {
    await queryClient.prefetchQuery(["profile", context.params.profile], () =>
      getProfileDetail(context.params.profile)
    );
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
