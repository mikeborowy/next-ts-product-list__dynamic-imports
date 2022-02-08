import { GetServerSideProps, NextPage } from "next";

type UserProfilePageProps = { userName: string };

const UserProfilePage: NextPage<UserProfilePageProps> = (
  props: UserProfilePageProps
) => {
  const { userName } = props;
  return <div>{userName}</div>;
};

export const getServerSideProps: GetServerSideProps<
  UserProfilePageProps
> = async (context) => {
  const { params, req, res } = context;

  return {
    props: {
      userName: "Mike",
    },
  };
};

export default UserProfilePage;
