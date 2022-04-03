import { css, useTheme } from "@emotion/react";
import { LocalDiningRounded } from "@mui/icons-material";
import { Typography } from "@mui/material";
import { Box } from "@mui/system";
import { FormEvent, MouseEvent, useState } from "react";
import { IoAddCircleOutline } from "react-icons/io5";
import { mediaHTTP } from "../../api";

interface IFileInput {
  getUrl: (url: string) => void;
}

const FileInput = ({ getUrl }: IFileInput) => {
  const theme = useTheme();

  const [loading, setLoading] = useState(false);
  const [url, setUrl] = useState<string | null>(null);

  const onFileChange = async (event: FormEvent<HTMLInputElement>) => {
    const element = event.currentTarget as HTMLInputElement;
    let fileList: FileList | null = element.files;
    if (fileList) {
      setLoading(true);
      const formData = new FormData();

      formData.append("file", fileList[0], fileList[0].name);

      try {
        const res = await mediaHTTP.post("/", formData);
        getUrl(res.data.imgUrl);
        setUrl(res.data.imgUrl);
      } catch (error) {
        console.error(error);
      } finally {
        setLoading(false);
      }
    }
  };
  return (
    <>
      <Typography>title</Typography>
      <Box
        sx={{
          backgroundColor: theme.palette?.secondary.light,
          backgroundImage: `url(${url})`,
          position: "relative",
          height: "9rem",
          borderRadius: "4px",
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          cursor: "pointer",
          ":hover": {
            cursor: "pointer",
            backgroundColor: theme.palette?.secondary.main,
          },
        }}
      >
        <input
          accept="image/*"
          onChange={onFileChange}
          id="photo"
          name="photo"
          type="file"
          multiple={false}
          css={css`
            position: absolute;
            opacity: 0;
            height: 100%;
            width: 100%;
          `}
        />

        {loading ? <p>chargemtn</p> : <IoAddCircleOutline size={35} />}
      </Box>
    </>
  );
};

export default FileInput;
