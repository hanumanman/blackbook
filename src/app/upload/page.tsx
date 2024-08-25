'use client';

import { Button } from '@/components/ui/button';
import { useCallback, useState } from 'react';
import { useDropzone } from 'react-dropzone';
import { useUploadNovels } from './mutations';

//TODO: Send novel id along with the text content
const Page = () => {
  const [file, setFile] = useState<File>();

  //Dropzone setup
  const onDropAccepted = useCallback((acceptedFiles: any[]) => {
    setFile(acceptedFiles[0]);
  }, []);
  const { getRootProps, getInputProps, isDragActive, fileRejections } =
    useDropzone({
      onDropAccepted,
      maxFiles: 1,
      accept: {
        'text/plain': ['.txt'],
      },
    });

  //Handle upload
  const uploadNovels = useUploadNovels();
  const handleUpload = (file: File) => {
    const reader = new FileReader();
    reader.onload = () => {
      uploadNovels.mutate(reader.result as string);
    };
    reader.readAsText(file);
  };

  return (
    <div className="flex flex-col p-24 gap-4 items-center">
      <div
        {...getRootProps()}
        className="flex flex-col gap-4 justify-center items-center w-full border-dashed border-primary border-2 p-2 rounded-lg h-48"
      >
        <input {...getInputProps()} />
        {isDragActive ? (
          <p>Drop the files here ...</p>
        ) : (
          <>
            <p>
              Drag &apos;n&apos; drop some files here, or click to select files
            </p>
          </>
        )}
      </div>
      {fileRejections.length > 0 && (
        <p key={fileRejections[0].file.name} className="font-bold text-red-500">
          {fileRejections[0].errors[0].message}
        </p>
      )}
      {!!file && (
        <div>
          <p>File uploaded: {file.name}</p>
          <Button onClick={() => handleUpload(file)}>Upload</Button>
        </div>
      )}
    </div>
  );
};

export default Page;
