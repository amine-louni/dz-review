import { css, useTheme } from "@emotion/react";
import { Avatar, CircularProgress, Typography } from "@mui/material";
import { Box } from "@mui/system";
import { FormEvent, useState } from "react";
import { IoPencil } from "react-icons/io5";
import { mediaHTTP } from "../../api";

interface IFileInputAvatar {
  getUrl: (url: string) => void;
  caption?: string | null;
  defaultUrl?: string | null;
}

const FileInputAvatar = ({ getUrl, caption, defaultUrl }: IFileInputAvatar) => {
  const [loading, setLoading] = useState(false);
  const [url, setUrl] = useState<string | null>(null);
  const theme = useTheme();

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
    <Box
      sx={{
        position: "relative",
        borderRadius: "7rem",
        overflow: "hidden",
      }}
    >
      <Avatar src={url || defaultUrl!} sx={{ height: "7rem", width: "7rem" }} />
      <Box
        sx={{
          position: "absolute",
          height: "30%",
          bottom: 0,
          cursor: "pointer",
          zIndex: 5,
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          width: "100%",
          background: theme.palette?.secondary.main,
          ":hover": {
            background: theme.palette?.secondary.dark,
            cursor: "pointer",
          },
        }}
      >
        {loading ? (
          <CircularProgress size={15} color="success" />
        ) : (
          <IoPencil color={theme.palette?.common.white} size={15} />
        )}
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
            top: 0;
          `}
        />
      </Box>
      {caption && (
        <Typography variant="caption" color="red">
          {caption}
        </Typography>
      )}
    </Box>
  );
};

export default FileInputAvatar;
