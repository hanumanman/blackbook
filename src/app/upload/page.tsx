'use client';

import { Button } from '@/components/ui/button';
import { Textarea } from '@/components/ui/textarea';
import { useCallback, useState } from 'react';
import { useDropzone } from 'react-dropzone';

const Page = () => {
  const [text, setText] = useState<string>('');

  //React Dropzone setup
  const onDropAccepted = useCallback((acceptedFiles: any[]) => {
    acceptedFiles.forEach((file) => {
      const reader = new FileReader();
      reader.onabort = () => console.log('File reading was aborted');
      reader.onerror = () => console.log('File reading has failed');
      reader.onload = () => {
        const textContent = reader.result;
        setText(textContent as string);
      };
      reader.readAsText(file);
    });
  }, []);
  const { getRootProps, getInputProps, isDragActive, fileRejections, open } =
    useDropzone({
      onDropAccepted,
      maxFiles: 1,
      accept: {
        'text/plain': ['.txt'],
      },
    });

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
            <Button onClick={open}>Upload File</Button>
          </>
        )}
      </div>
      {fileRejections.length > 0 && (
        <p key={fileRejections[0].file.name} className="font-bold text-red-500">
          {fileRejections[0].errors[0].message}
        </p>
      )}
      <p>Or</p>
      <p>Input here</p>
      <Textarea
        className="h-48"
        value={text}
        onChange={(e) => setText(e.target.value)}
      />
    </div>
  );
};

export default Page;
