'use client';

import { Button } from '@/components/ui/button';
import { Textarea } from '@/components/ui/textarea';
import { useCallback, useState } from 'react';
import { useDropzone } from 'react-dropzone';

const Page = () => {
  const [file, setFile] = useState(null);
  const [text, setText] = useState<string>('');

  //React Dropzone setup
  const onDrop = useCallback((acceptedFiles: any[]) => {
    acceptedFiles.forEach((file) => {
      const reader = new FileReader();
      reader.onabort = () => console.log('file reading was aborted');
      reader.onerror = () => console.log('file reading has failed');
      reader.onload = () => {
        // Do whatever you want with the file contents
        const textContent = reader.result;
        setText(textContent as string);
      };
      reader.readAsText(file);
    });
  }, []);

  const { getRootProps, getInputProps, isDragActive } = useDropzone({ onDrop });

  return (
    <>
      <Button onClick={() => console.log('clicked')}>Upload File</Button>
      <div
        {...getRootProps()}
        className="border-dashed border-primary border-2 p-2 rounded-lg h-48"
      >
        <input {...getInputProps()} />
        {isDragActive ? (
          <p>Drop the files here ...</p>
        ) : (
          <p>
            Drag &apos;n&apos; drop some files here, or click to select files
          </p>
        )}
      </div>
      <p>Or</p>
      <p>Input here</p>
      <Textarea value={text} onChange={(e) => setText(e.target.value)} />
      <p>{text}</p>
    </>
  );
};

export default Page;
