import Button from "@mui/material/Button";

import TextField from "@mui/material/TextField";
import FormControlLabel from "@mui/material/FormControlLabel";
import Checkbox from "@mui/material/Checkbox";
import Link from "../src/Link";
import Paper from "@mui/material/Paper";
import Box from "@mui/material/Box";
import Grid from "@mui/material/Grid";
import { css } from "@emotion/react";
import Typography from "@mui/material/Typography";
import Image from "next/image";
import { useTheme } from "@mui/system";

const Copyright = (props: any) => {
  return (
    <Typography
      variant="body2"
      color="text.secondary"
      align="center"
      {...props}
    >
      {"Copyright © "}
      <Link color="inherit" href="https://mui.com/">
        DZ review
      </Link>{" "}
      {new Date().getFullYear()}
      {"."}
    </Typography>
  );
};

const Login = () => {
  const handleSubmit = (event: any) => {
    event.preventDefault();
    const data = new FormData(event.currentTarget);
    // eslint-disable-next-line no-console
    console.log({
      email: data.get("email"),
      password: data.get("password"),
    });
  };

  const theme = useTheme();

  return (
    <Box
      component="main"
      sx={{
        height: "100vh",
        padding: { xs: 0, md: 4 },
        background: theme.palette.grey["200"],
      }}
    >
      <Grid
        container
        component={Paper}
        sx={{ height: "100%", overflow: "hidden", borderRadius: 3 }}
      >
        <Grid item xs={12} sm={12} md={6} sx={{ paddingX: { xs: 1, md: 3 } }}>
          <Box
            css={css`
              display: flex;
              height: 100%;
              align-items: center;
              justify-content: center;
            `}
          >
            <Box
              sx={{
                display: "flex",
                flexDirection: "column",
              }}
            >
              <Typography component="h1" variant="h3" marginBottom={1}>
                Sign in ✌
              </Typography>
              <Typography component="p" variant="caption" marginBottom={2}>
                Lorem ipsum dolor sit amet consectetur adipisicing elit.
                Laudantium, quos?
              </Typography>
              <Box
                component="form"
                noValidate
                onSubmit={handleSubmit}
                sx={{ mt: 1 }}
              >
                <TextField
                  size="small"
                  margin="dense"
                  fullWidth
                  id="email"
                  label="Email"
                  name="email"
                  autoComplete="email"
                  autoFocus
                  css={css`
                    background: ${theme.palette.grey["200"]} !important;
                    border: none !important;
                  `}
                />
                <TextField
                  size="small"
                  margin="dense"
                  fullWidth
                  name="password"
                  label="Password"
                  type="password"
                  id="password"
                  autoComplete="current-password"
                  css={css`
                    background: ${theme.palette.grey["200"]};
                  `}
                />
                <Grid container>
                  <Grid item xs>
                    <Link href="#" variant="caption">
                      {"Don't have an account?"}
                    </Link>
                  </Grid>
                  <Grid item>
                    <Link href="#" variant="caption">
                      Forgot password?
                    </Link>
                  </Grid>
                </Grid>

                <Button
                  type="submit"
                  fullWidth
                  variant="contained"
                  sx={{ mt: 3, mb: 2 }}
                >
                  Sign In
                </Button>

                <Copyright sx={{ mt: 1 }} />
              </Box>
            </Box>
          </Box>
        </Grid>
        <Grid
          item
          md={6}
          sx={{
            display: { xs: "none", md: "flex" },
            backgroundRepeat: "no-repeat",
            background: (theme) =>
              theme.palette.mode === "light"
                ? "linear-gradient(180deg, rgba(18,57,143,1) 0%, rgba(0,212,255,0.5690651260504201) 100%);"
                : theme.palette.grey[900],
            backgroundSize: "cover",
            backgroundPosition: "center",
          }}
          css={css`
            display: flex;
            justify-content: center;
            align-items: center;
          `}
        >
          <Box
            css={css`
              box-shadow: inset 0 0 0 3000px rgba(255, 255, 255, 0.3);
              border-radius: 20px;
              height: 80%;
              width: 70%;
              padding: 3rem;
              position: relative;

              :before {
                box-shadow: inset 0 0 2000px rgba(255, 255, 255, 0.5);
                filter: blur(10px);
              }
              :after {
                content: "💯";
                position: absolute;
                display: flex;
                justify-content: center;
                align-items: center;
                font-size: 1.7rem;
                bottom: 3rem;
                left: -2rem;
                height: 5rem;
                width: 5rem;
                background-color: ${theme.palette.common.white};
                border-radius: 5rem;
              }
            `}
          >
            <Typography
              variant="h3"
              css={css`
                color: ${theme.palette.common.white};
                margin-bottom: 1rem;
              `}
            >
              We are waiting for your to share your review 🤞
            </Typography>
          </Box>
          <Box
            css={css`
              position: absolute;
              bottom: 0;
              right: 0;
            `}
          >
            <Image
              src={require("../public/png/login.png")}
              height={400}
              width={280}
            />
          </Box>
        </Grid>
      </Grid>
    </Box>
  );
};

export default Login;
