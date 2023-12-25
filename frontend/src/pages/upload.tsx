import { Button } from "@/components/ui/button";
import type { DataPayload, ResponsePayload } from "@/types";
import { toast } from "sonner";
import React, { useState } from "react";
import { cn } from "@/lib/utils";
import useSlice from "@/store";
import SparklesCore from "@/components/ui/Sparkets";
import api from "@/utils/api";
import axios from "axios";
import DataDialog from "@/components/DataDialog";

const Upload = () => {
  const file = useSlice((state) => state.file);

  const setFile = useSlice((state) => state.setFile);

  const [loading, setLoading] = useState<boolean>(false);

  const [data, setData] = useState<DataPayload | null>(null);

  const [open, setOpen] = useState<boolean>(false);

  const handleOpenChange = (open: boolean) => {
    setOpen(open);
    setData(null);
    setLoading(false);
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const localFile = e.target.files?.[0];

    if (file) {
      toast.error("You have already uploaded a file");

      return;
    }

    if (!localFile) {
      toast.error("No file selected");

      return;
    }

    if (localFile.size > 2000000) {
      toast.error("File size is too large, Max Size 2MB");

      return;
    }

    setFile(localFile);
  };

  const handleRemove = () => {
    setFile(null);

    toast.success("File Removed Successfully");
  };

  const handleUpload = async () => {
    try {
      if (!file) {
        toast.error("No file selected");
        return;
      }

      console.log({ file });

      const formData = new FormData();

      formData.append("file", file);

      setLoading(true);

      const resp = await axios.post<ResponsePayload>(
        "https://quola-server.onrender.com/api/analyse",
        formData,
        {
          headers: {
            "Content-Type": "multipart/form-data",
          },
        },
      );

      console.log({ resp });
      const ocrData = resp.data.data;

      const creatResp = await api.post<ResponsePayload>("/create", ocrData, {
        headers: {
          "Content-Type": "application/json",
        },
      });

      console.log(creatResp);

      if (creatResp.status === 201 && creatResp.data.data) {
        setData(creatResp.data.data);
        setOpen(true);
        toast.success("File Analyzed Successfully");
      } else if (
        creatResp.status === 201 &&
        creatResp.data.status === "error"
      ) {
        toast.error(creatResp.data.message);
      } else {
        toast.error("Unable to Analyse Data");
      }

      setLoading(false);
      setFile(null);
    } catch (error) {
      toast.error("Unable to Upload the File");
      setFile(null);

      setLoading(false);
    }
  };

  return (
    <>
      <div className="relative grid h-screen place-content-center gap-3 bg-black font-mono text-white">
        <div className="absolute inset-0 h-screen w-full">
          <SparklesCore
            id="tsparticlesfullpage"
            background="transparent"
            minSize={0.6}
            maxSize={1.4}
            particleDensity={100}
            className="h-full w-full"
            particleColor="#FFFFFF"
          />
        </div>
        <p className="text-base font-bold">
          Upload your ID card to verify your identity.
        </p>

        <div className="flex flex-col items-center gap-2 text-sm">
          <p>Things to Remember</p>
          <div>
            <p>1. Your ID card must be valid</p>
            <p>2. Your ID card must be in good condition</p>
            <p>3. Your ID card must be clear and readable</p>
            <p>4. Your ID card must be in PNG / JPEG format</p>
            <p>5. Your ID card must not be expired</p>
          </div>
        </div>

        <Button
          className={cn(
            "relative cursor-pointer",
            file && "bg-green-700 hover:bg-green-600",
          )}
        >
          <UploadFile
            file={file}
            onFileChange={handleFileChange}
            removeFile={handleRemove}
          />
          <span className="w-2/2 absolute inset-x-0 -bottom-px mx-auto h-px bg-gradient-to-r from-transparent via-blue-500  to-transparent" />
        </Button>

        {file ? (
          <Button
            onClick={handleUpload}
            className={cn(
              "relative cursor-pointer",
              loading && "disabled cursor-wait bg-gray-700",
            )}
          >
            {loading ? <p>Loading</p> : <p>Submit</p>}
            <span className="w-2/2 absolute inset-x-0 -bottom-px mx-auto h-px bg-gradient-to-r from-transparent via-blue-500  to-transparent" />
          </Button>
        ) : null}
      </div>

      <DataDialog
        open={open}
        ocrData={data}
        handleOpenChange={handleOpenChange}
      />
    </>
  );
};

export default Upload;

export type UploadProps = {
  file: File | null;
  onFileChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  removeFile?: () => void;
};

const UploadFile: React.FC<UploadProps> = ({ file, onFileChange, ...rest }) => {
  const handleRemove = () => {
    if (rest.removeFile) {
      rest.removeFile();
    }
  };

  if (file) {
    return (
      <div className="flex w-full items-center gap-2">
        <div className="flex flex-1 items-center justify-center gap-2 text-center">
          <p>File</p>
          <p className="text-slate-300 underline hover:text-slate-400">
            {file.name}
          </p>
          <p>Added</p>
        </div>
        <p onClick={handleRemove} className="rounded-md bg-red-500 p-1 px-2">
          X
        </p>
      </div>
    );
  }

  return (
    <>
      <p>Add ID File</p>
      <input
        className="absolute inset-0 h-full w-full cursor-pointer text-white opacity-0"
        id="picture"
        type="file"
        placeholder="Upload Your ID Card"
        title="Upload Your ID Card"
        accept="image/png, image/jpeg"
        onChange={onFileChange}
      />
    </>
  );
};
