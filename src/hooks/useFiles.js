import { useState, useCallback, useEffect } from 'react';
import axios from 'axios';
import { toast } from 'react-toastify';

const useFiles = ({ archivo }) => {
  const [selectedFile, setSelectedFile] = useState(null);
  const [fileUrl, setFileUrl] = useState(null);
  const [pathFile, setPathFile] = useState(null);

  const onDrop = useCallback((acceptedFiles) => {
    const file = acceptedFiles[0];
    setSelectedFile(file);
    setFileUrl(URL.createObjectURL(file));
    setPathFile(null);
  }, []);

  useEffect(() => {
    if (archivo) {
      setPathFile(archivo);
      axios
        .get(archivo, {
          responseType: 'blob',
        })
        .then((response) => {
          const blob = new Blob([response.data], {
            type: response.headers['content-type'],
          });

          const archivoInfo = {
            path: archivo,
            name: archivo,
            size: blob.size,
            type: blob.type,
          };
          const file = new File([], archivoInfo.name, { type: archivoInfo.type });
          file.path = archivoInfo.path;
          setSelectedFile(file);
          setFileUrl(file.path);
        })
        .catch((error) => {
          toast.error('Error al descargar el archivo:', error);
        });
    }
  }, [archivo]);

  return {
    selectedFile,
    onDrop,
    fileUrl,
    pathFile,
  };
};

export default useFiles;
