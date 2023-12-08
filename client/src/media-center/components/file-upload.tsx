import CloudDoneOutlined from "@mui/icons-material/CloudDoneOutlined";
import CloudOffOutlined from "@mui/icons-material/CloudOffOutlined";
import CloudUploadOutlined from "@mui/icons-material/CloudUploadOutlined";
import PendingOutlined from "@mui/icons-material/PendingOutlined";
import { Box } from "@mui/material";
import { useMutation } from "@tanstack/react-query";
import { PostFileQuery } from "media-center/repositories";
import React from "react";

const MAX_FILES = 5;
const MAX_FILE_SIZE_MB = 2;

type State = "idle" | "invalid" | "loading" | "success" | "error";

interface Content {
  icon: React.ReactElement;
  caption: string;
  color: string;
}

export const FileUpload = () => {
  const [content, setContent] = React.useState<Content>(ContentStates["idle"]);
  const mutation = useMutation(PostFileQuery());

  React.useEffect(() => {
    setContent(ContentStates[mutation.status]);
  }, [mutation.status]);

  const onInputChange: React.ChangeEventHandler<HTMLInputElement> = ({
    target,
  }) => {
    const files = Array.from(target.files!);
    const validationErrors = validate(files);

    if (validationErrors.length) {
      setContent({
        icon: <CloudOffOutlined fontSize="large" />,
        caption: validationErrors[0],
        color: "error",
      });

      return;
    }

    // since we can use 5 TCP connections at once,
    // and file limit is 5 too, parallel upload is possible
    files.forEach((file) => mutation.mutate(file));
  };

  return (
    <Box
      sx={{
        // height: "100%",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
      }}
    >
      <Box
        sx={{
          border: 1,
          borderRadius: 1,
          borderColor: `${content.color}.light`,
          color: `${content.color}.main`,
          borderStyle: "dashed",
          position: "relative",
          width: "100%",
          textAlign: "center",
          p: 3,
        }}
      >
        <label htmlFor="file-upload">
          {content.icon}
          <div>{content.caption}</div>
          <Box
            component="input"
            type="file"
            accept="image/*,application/pdf"
            name="file-upload"
            multiple
            disabled={mutation.status === "loading"}
            sx={{
              position: "absolute",
              left: 0,
              top: 0,
              opacity: 0,
              width: "100%",
              height: "100%",
              cursor: "pointer",
            }}
            onChange={onInputChange}
          />
        </label>
      </Box>
    </Box>
  );
};

// `invalid` state requires dynamic content. Made me less convinced of this pattern here.
const ContentStates: Record<Exclude<State, "invalid">, Content> = {
  idle: {
    icon: <CloudUploadOutlined fontSize="large" />,
    caption: "Choose a file or drag it here.",
    color: "primary",
  },
  loading: {
    icon: <PendingOutlined fontSize="large" />,
    caption: "Uploading...",
    color: "primary",
  },
  success: {
    icon: <CloudDoneOutlined fontSize="large" />,
    caption: "Success! Upload more?",
    color: "success",
  },
  error: {
    icon: <CloudOffOutlined fontSize="large" />,
    caption: "Something went wrong! Try again?",
    color: "error",
  },
};

// API is based on Yup
const validate = (files: File[]): string[] => {
  const errors: string[] = [];

  if (files.length > MAX_FILES) {
    errors.push(`Max file count is ${MAX_FILES}.`);
  }

  const isValidType = ({ type }: File) => {
    return type.startsWith("image/") || type === "application/pdf";
  };

  if (!files.every(isValidType)) {
    errors.push("Only image and PDF.");
  }

  if (files.some((file) => file.size > MAX_FILE_SIZE_MB * 1024 * 1024)) {
    errors.push(`Max file size is ${MAX_FILE_SIZE_MB} MB.`);
  }

  return errors;
};
