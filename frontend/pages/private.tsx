import { requireAuthentication } from "../utils/requireAuthentication";

interface IProtected {
  email: string;
}

const Private = ({ email }: IProtected) => {
  return <div>portected {email}</div>;
};

export default Private;

export const getServerSideProps = requireAuthentication(async (_context) => {
  // Your normal `getServerSideProps` code here
  const email = "test";
  return {
    props: {
      email,
    },
  };
});
