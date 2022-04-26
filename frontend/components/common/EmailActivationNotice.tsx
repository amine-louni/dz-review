import { useTheme } from "@emotion/react";
import {
  Box,
  Button,
  CircularProgress,
  Container,
  TextField,
  Typography,
} from "@mui/material";
import { useState } from "react";
import { auth } from "../../api";
import { useAppDispatch, useAppSelector } from "../../redux/hooks";
import { setToast } from "../../redux/slices/toastSlice";
import { setUser } from "../../redux/slices/userSlice";

const EmailActivationNotice = () => {
  const dispatch = useAppDispatch();
  const { user } = useAppSelector((state) => state);

  const theme = useTheme();
  const [pinInputOpen, setPinInputOpen] = useState(true);
  const [pin, setPin] = useState("");
  const [loading, setLoading] = useState(false);

  if (!user?.accessToken || user?.userData?.emailValidateAt) return null;

  const handlePinChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setPin(event.target.value);
  };
  const resendPin = async () => {
    setLoading(true);
    try {
      await auth.post("resend-validation-email");
    } catch (e) {
      console.error(e);
    } finally {
      setLoading(false);
      setPinInputOpen(true);
    }
  };

  const validateEmail = async (selectedPin: string) => {
    setLoading(true);
    try {
      const response = await auth.patch("validate-email", { pin: selectedPin });

      if (response.data?.status === "success") {
        dispatch(
          setUser({ accessToken: user?.accessToken, data: response.data?.user })
        );
        dispatch(
          setToast({
            message: "You emai has been validted 🥳",
            autoHideDuration: 5000,
            open: true,
          })
        );
      }
    } catch (error: any) {
      console.error(error);
      dispatch(
        setToast({
          open: true,
          autoHideDuration: 5000,
          message: error?.response.data?.code,
        })
      );
    } finally {
      setLoading(false);
    }
  };

  return (
    <Box
      sx={{
        background: "red",
        paddingY: ".6rem",
        textAlign: "center",
      }}
    >
      <Container maxWidth="lg">
        <Box
          sx={{
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
          }}
        >
          <Box />

          <Box
            sx={{
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
            }}
          ></Box>

          <Box
            sx={{
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
            }}
          >
            <Typography
              sx={{
                color: theme.palette?.common.white,
                fontWeight: "semibold",
              }}
              variant="caption"
            >
              check your email and confirm your account at{" "}
              <Box component="span" sx={{ fontWeight: "bold" }}>
                {user?.userData?.email}
              </Box>
            </Typography>
            <Button
              onClick={resendPin}
              size="small"
              variant="text"
              color="inherit"
              sx={{ marginX: ".2rem", color: theme.palette?.common.white }}
            >
              Not your email?
            </Button>
            <Button
              onClick={resendPin}
              size="small"
              variant="text"
              color="inherit"
              sx={{ marginX: ".2rem", color: theme.palette?.common.white }}
            >
              Resend
            </Button>
            <TextField
              sx={{ width: "10rem" }}
              size="small"
              margin="none"
              placeholder="Enter the pin"
              onChange={handlePinChange}
            />

            <Button
              onClick={() => validateEmail(pin)}
              size="small"
              variant="contained"
              color="primary"
              sx={{ marginLeft: ".4rem" }}
            >
              Validate
            </Button>
          </Box>

          {loading ? (
            <CircularProgress
              size={15}
              color="inherit"
              sx={{
                right: 0,
                top: 0,

                color: theme.palette?.secondary.contrastText,
              }}
            />
          ) : (
            <Box />
          )}
        </Box>
      </Container>
    </Box>
  );
};

export default EmailActivationNotice;
