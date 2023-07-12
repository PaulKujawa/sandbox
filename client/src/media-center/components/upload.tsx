import CloudDoneOutlined from "@mui/icons-material/CloudDoneOutlined";
import CloudOffOutlined from "@mui/icons-material/CloudOffOutlined";
import CloudUploadOutlined from "@mui/icons-material/CloudUploadOutlined";
import PendingOutlined from "@mui/icons-material/PendingOutlined";
import { Box } from "@mui/material";
import { useMutation } from "@tanstack/react-query";
import { PostFileQuery } from "media-center/repositories";
import React from "react";

const MAX_FILES = 5;
const MAX_FILE_SIZE_MB = 5;

export const Upload = () => {
  const mutation = useMutation(PostFileQuery());
  const content = StateContent[mutation.status];

  const onInputChange: React.ChangeEventHandler<HTMLInputElement> = ({
    target,
  }) => {
    const files = Array.from(target.files!);
    const validationErrors = validate(files);

    // TODO convert into user-visible validation messages.
    if (validationErrors.length) {
      validationErrors.forEach(console.log);
      return;
    }

    // since we can use 5 TCP connections at once,
    // and file limit is 5 too, parallel upload is possible
    files.forEach((file) => mutation.mutate(file));
  };

  return (
    <Box
      sx={{
        height: "100%",
        mx: "25%",
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
            accept="image/*,*.pdf"
            name="file-upload"
            multiple
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

const StateContent: Record<
  "idle" | "loading" | "success" | "error",
  { icon: React.ReactElement; caption: string; color: string }
> = {
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

/*
 * the validate function returns harcoded validation messages.
 * were i18n added, one could follow https://github.com/jquense/yup#localization-and-i18n
 * and accept translation keys, but I would still return translated messages.
 */
const validate = (files: File[]): string[] => {
  const errors: string[] = [];

  if (files.length > MAX_FILES) {
    errors.push(`Max file count is ${MAX_FILES}.`);
  }

  const isValidType = ({ type }: File) => {
    return type.startsWith("image/") || type.endsWith(".pdf");
  };
  if (!files.every(isValidType)) {
    errors.push("Only image and PDF.");
  }

  if (files.some((file) => file.size > MAX_FILE_SIZE_MB * 1024 * 1024)) {
    errors.push(`Max file size is ${MAX_FILE_SIZE_MB} MB.`);
  }

  return errors;
};
