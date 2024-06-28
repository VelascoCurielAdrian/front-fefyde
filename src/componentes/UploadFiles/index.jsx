import React, { useEffect, useState } from 'react';
import * as xlsx from 'xlsx';
import PropTypes from 'prop-types';
import CancelIcon from '@mui/icons-material/Cancel';
import CloudDownloadIcon from '@mui/icons-material/CloudDownload';
import Inventory2Icon from '@mui/icons-material/Inventory2';
import Button from '../Button';

const UploadFile = ({
  type,
  onCancel,
  getFiles,
  plantilla,
  handlePlantilla,
}) => {
  const [file, setFile] = useState(null);
  const [typeFiles, setTypeFiles] = useState('.png, .jpg');
  const [filePreview, setFilePreview] = useState('');

  const onChangeFile = async (e) => {
    const archivo = e.target.files[0];
    if (type === 'Excel') {
      const data = await archivo.arrayBuffer(archivo);
      const excelFile = xlsx.read(data);
      const exelsheet = excelFile.Sheets[excelFile.SheetNames[0]];
      const excelJson = xlsx.utils.sheet_to_json(exelsheet);
      getFiles(
        excelJson.map((el) => ({
          ...el,
        })),
      );
    }
    if (!archivo) return;

    const reader = new FileReader();
    reader.addEventListener('load', () => {
      setFilePreview(reader.result);
    });
    reader.readAsDataURL(archivo);

    setFile(archivo);
  };

  useEffect(() => {
    switch (type) {
      case 'Excel':
        setTypeFiles('.xlsx, .xls, .csv');
        break;
      case 'Pdf':
        setTypeFiles('.pdf');
        break;
      default:
        setTypeFiles('.pdf');
        break;
    }
  }, [type]);

  const handleClose = () => {
    setFilePreview('');
    setFile(null);
    onCancel();
  };

  return (
    <>
      <div className="mt-3 mb-4 flex justify-center rounded-md border-2 border-dashed border-slate-700 bg-slate-100 px-6 pt-5 pb-6">
        {filePreview !== '' ? (
          <div className="min-h-80 aspect-w-1 aspect-h-1 w-full overflow-hidden rounded-md bg-gray-500 group-hover:opacity-75 lg:aspect-none lg:h-50">
            {file.type === 'image/png' || file.type === 'image/jpg' ? (
              <img
                src={filePreview}
                alt="hola"
                className="h-full w-full object-cover object-center lg:h-full lg:w-full"
              />
            ) : (
              <div className="space-y-1 p-2 text-center">
                <Inventory2Icon
                  className="mx-auto h-12 w-12 text-white"
                  stroke="currentColor"
                />
                <p className="text-md text-gray-50">
                  {`Archivo: ${file.name}`}
                </p>
              </div>
            )}
          </div>
        ) : (
          <div className="space-y-1 text-center">
            <svg
              className="mx-auto h-12 w-12 text-gray-400"
              stroke="currentColor"
              fill="none"
              viewBox="0 0 48 48"
              aria-hidden="true"
            >
              <path
                d="M28 8H12a4 4 0 00-4 4v20m32-12v8m0 0v8a4 4 0 01-4 4H12a4 4 0 01-4-4v-4m32-4l-3.172-3.172a4 4 0 00-5.656 0L28 28M8 32l9.172-9.172a4 4 0 015.656 0L28 28m0 0l4 4m4-24h8m-4-4v8m-12 4h.02"
                strokeWidth={2}
                strokeLinecap="round"
                strokeLinejoin="round"
              />
            </svg>
            <div className="flex text-sm text-gray-600">
              <label
                htmlFor="SubidaArchivo"
                className="relative cursor-pointer rounded-md bg-slate-200 font-medium text-slate-800 focus-within:outline-none focus-within:ring-2 focus-within:ring-slate-600 focus-within:ring-offset-2 hover:text-slate-600"
              >
                <span>Subir Archivo</span>
                <input
                  id="SubidaArchivo"
                  name="file-upload"
                  type="file"
                  className="sr-only"
                  accept={typeFiles}
                  onChange={(e) => onChangeFile(e)}
                />
              </label>
              <p className="pl-1">o arrastrar y soltar</p>
            </div>
            <p className="text-xs text-gray-500">{type}</p>
          </div>
        )}
      </div>
      <div className="flex space-x-3 mb-3">
        <Button
          size="medium"
          variant="outlined"
          onClick={handleClose}
          icono={<CancelIcon size={18} />}
          label="Cancelar"
        />
        {plantilla && (
          <Button
            size="medium"
            variant="contained"
            onClick={handlePlantilla}
            icono={<CloudDownloadIcon size={18} />}
            label="Descargar plantilla"
          />
        )}
      </div>
    </>
  );
};

UploadFile.propTypes = {
  getFiles: PropTypes.func.isRequired,
  type: PropTypes.string,
  onCancel: PropTypes.func.isRequired,
  handlePlantilla: PropTypes.func,
  plantilla: PropTypes.bool,
};

UploadFile.defaultProps = {
  plantilla: false,
  type: 'PDF',
  handlePlantilla: () => {},
};

export default UploadFile;
