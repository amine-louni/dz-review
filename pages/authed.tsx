import { requireAuthentication } from "../utils/requireAuthentication";

interface IProtected {
  email: string;
}

const Authed = ({ email }: IProtected) => {
  return <div>portected {email}</div>;
};

export default Authed;

export const getServerSideProps = requireAuthentication(async (_context) => {
  // Your normal `getServerSideProps` code here
  const email = "test";
  return {
    props: {
      email,
    },
  };
});
