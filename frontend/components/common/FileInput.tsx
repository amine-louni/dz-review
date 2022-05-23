import { css } from "@emotion/react";
import { CircularProgress, Typography } from "@mui/material";
import { Box } from "@mui/system";
import { FormEvent, useState } from "react";
import { IoCloudUploadOutline } from "react-icons/io5";
import { mediaHTTP } from "../../api";

interface IFileInput {
  getUrl: (url: string) => void;
  label: string;
  caption?: string | null;
}

const FileInput = ({ getUrl, label, caption }: IFileInput) => {
  const [loading, setLoading] = useState(false);
  const [url, setUrl] = useState<string | null>(null);

  const onFileChange = async (event: FormEvent<HTMLInputElement>) => {
    const element = event.currentTarget as HTMLInputElement;
    let fileList: FileList | null = element.files;
    if (fileList) {
      setLoading(true);
      const formData = new FormData();

      if (!fileList[0]) return;

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
      <Typography variant="subtitle1">{label}</Typography>
      <Box
        sx={{
          backgroundImage: `url(${url})`,
          position: "relative",
          height: "9rem",
          borderRadius: "4px",
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          overflow: "hidden",
        }}
      >
        <Box
          sx={{
            position: "absolute",
            height: " 100%",
            width: " 100%",
            backgroundColor: "rgba(225,0,0, 0.2)",
          }}
        />
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
            cursor: pointer;
          `}
        />

        {loading ? <CircularProgress /> : <IoCloudUploadOutline size={35} />}
      </Box>
      {caption && (
        <>
          <Typography variant="caption" color="red">
            {caption}
          </Typography>
        </>
      )}
    </>
  );
};

export default FileInput;
