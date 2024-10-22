'use client';

import { useCallback, useState } from 'react';
import { Spinner } from '@/components/Spinner';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { useDropzone } from 'react-dropzone';
import { useHehe, useUploadNovels } from './mutations';

const Page = () => {
  const [file, setFile] = useState<File>();
  const [novelID, setNovelID] = useState<string>('');

  //Dropzone setup
  const onDropAccepted = useCallback((acceptedFiles: any[]) => {
    setFile(acceptedFiles[0]);
  }, []);
  const { getRootProps, getInputProps, isDragActive, fileRejections } = useDropzone({
    onDropAccepted,
    maxFiles: 1,
    accept: {
      'text/plain': ['.txt'],
    },
  });

  //Handle upload
  const uploadNovels = useUploadNovels();
  const handleUpload = ({ file, novelID }: { file: File; novelID: number }) => {
    const reader = new FileReader();
    reader.onload = () => {
      uploadNovels.mutate({
        textContent: reader.result as string,
        novelID,
      });
    };
    reader.readAsText(file);
  };

  const hehe = useHehe();
  function handleHehe() {
    hehe.mutate({
      textContent: 'Hello World!',
      randomShit: Math.random(),
    });
  }

  return (
    <div className="flex flex-col p-24 gap-4 items-center">
      <Button onClick={handleHehe}>Hehe</Button>
      <div className="flex gap-3 w-fit items-center">
        <Label className="whitespace-nowrap text-xl">Novel ID</Label>
        <Input value={novelID} onChange={(e) => setNovelID(e.target.value)} type="number" />
      </div>

      <div
        {...getRootProps()}
        className="flex flex-col gap-4 justify-center items-center w-full border-dashed border-primary border-2 p-2 rounded-lg h-48"
      >
        <input {...getInputProps()} />
        {isDragActive ? (
          <p>Drop the files here ...</p>
        ) : (
          <>
            <p>Drag &apos;n&apos; drop some files here, or click to select files</p>
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
          <Button disabled={uploadNovels.isPending} onClick={() => handleUpload({ file, novelID: Number(novelID) })}>
            {uploadNovels.isPending ? 'Uploading...' : 'Upload'}
          </Button>
        </div>
      )}
    </div>
  );
};

export default Page;
