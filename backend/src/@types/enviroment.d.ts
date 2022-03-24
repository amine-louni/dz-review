import { JwtDecodeOptions } from "jwt-decode";

declare global {
  namespace NodeJS {
    interface ProcessEnv {
      NODE_ENV: "development" | "production" | "test";
      FRONT_END_URL: string;
      PORT: number;
      DB_HOST: string;
      DB_PORT: number;
      DB_NAME: string;
      DB_NAME_TEST: string;
      DB_USERNAME: string;
      DB_PASSWORD: string;

      JWT_ACCESS_SECRET_KEY: string;
      JWT_REFRESH_SECRET_KEY: string;
      JWT_ACCESS_EXPIRED_IN: string;
      JWT_REFRESH_EXPIRED_IN: string;
      JWT_COOKIE_EXPIRED_IN: string;
      HASH_PASS_SALT: number;

      MAILGUN_PRIVATE_API_KEY: string;
      MAILGUN_DOMAIN: string;

      MAILTRAP_USERNAME: string;
      MAILTRAP_PASSWORD: string;
      MAILTRAP_HOST: string | undefined;
      MAILTRAP_PORT: number;


      CLOUDINARY_URL: string
      CLOUDINARY_CLOUD_NAME: string;
      CLOUDINARY_API_KEY: string;
      CLOUDINARY_API_SECRET: string
    }
  }
}

export { };
