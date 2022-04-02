import { GetServerSideProps, GetServerSidePropsContext } from "next";
import { useRouter } from "next/router";
import React from "react";
import { businessHTTP } from "../../api";

export const getServerSideProps: GetServerSideProps = async (
  ctx: GetServerSidePropsContext
) => {
  const response = await businessHTTP.get(`/${ctx.params?.uuid}`);

  return {
    props: {
      business: response.data.data,
    },
  };
};

type BusinessDetailsProps = {
  business: any;
};
const BusinessDetails = ({ business }: BusinessDetailsProps) => {
  const {
    query: { uuid },
  } = useRouter();
  console.log(business);
  return (
    <div>
      <h3>status: {business.status}</h3>
    </div>
  );
};

export default BusinessDetails;
