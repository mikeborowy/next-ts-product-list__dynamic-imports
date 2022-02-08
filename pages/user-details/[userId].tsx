import { GetServerSideProps, NextPage } from "next";
import { ParsedUrlQuery } from "querystring";

type UserDetailsPageProps = { userId: string };

const UserDetailsPage: NextPage<UserDetailsPageProps> = (
  props: UserDetailsPageProps
) => {
  const { userId } = props;
  return <div>{userId}</div>;
};

interface Params extends ParsedUrlQuery {
  userId: string;
}

export const getServerSideProps: GetServerSideProps<
  UserDetailsPageProps,
  Params
> = async (context) => {
  const { params, req, res } = context;
  const userId = params?.userId;

  return {
    props: {
      userId: `userId-${userId}`,
    },
  };
};

export default UserDetailsPage;
