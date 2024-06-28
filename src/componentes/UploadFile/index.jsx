import React, { useMemo } from 'react';
import PropTypes from 'prop-types';
import { useDropzone } from 'react-dropzone';
import { getFilePlugin } from '@react-pdf-viewer/get-file';
import { Viewer } from '@react-pdf-viewer/core';

const baseStyle = {
  flex: 1,
  display: 'flex',
  flexDirection: 'column',
  alignItems: 'center',
  padding: '20px',
  borderWidth: 2,
  borderRadius: 2,
  borderColor: 'rgba(0, 0, 0, 0.23)',
  borderStyle: 'dashed',
  backgroundColor: '#fafafa',
  color: '#bdbdbd',
  outline: 'none',
  transition: 'border .24s ease-in-out',
};

const focusedStyle = {
  borderColor: '#2196f3',
};

const acceptStyle = {
  borderColor: '#00e676',
};

const rejectStyle = {
  borderColor: '#ff1744',
};

const Component = ({
  title, subtitle, multiple, fileSelected, onDrop, fileUrl, disabled,
}) => {
  const getFilePluginInstance = getFilePlugin();
  const {
    getRootProps, getInputProps, isFocused, isDragAccept, isDragReject,
  } = useDropzone({
    accept: {
      'aplication/pdf': ['.pdf'],
    },
    multiple,
    onDrop,
    disabled,
  });

  const style = useMemo(
    () => ({
      ...baseStyle,
      ...(isFocused ? focusedStyle : {}),
      ...(isDragAccept ? acceptStyle : {}),
      ...(isDragReject ? rejectStyle : {}),
    }),
    [isFocused, isDragAccept, isDragReject],
  );

  return (
    <div className="containerDropzone">
      <div {...getRootProps({ style })}>
        <input {...getInputProps()} />
        <p className="text-center">{title}</p>
        <p className="text-center">{subtitle}</p>
        {fileSelected && (
          <Viewer
            fileUrl={fileUrl}
            plugins={[getFilePluginInstance]}
          />
        )}
      </div>
    </div>
  );
};

Component.propTypes = {
  title: PropTypes.string,
  subtitle: PropTypes.string,
  fileUrl: PropTypes.string,
  type: PropTypes.string,
  multiple: PropTypes.bool,
  disabled: PropTypes.bool,
  fileSelected: PropTypes.oneOfType([PropTypes.any]),
  onDrop: PropTypes.func.isRequired,
};

Component.defaultProps = {
  title: 'Arrastre y suelte algunos archivos aquí o haga click para seleccionar archivos.',
  subtitle: '',
  type: 'application/pdf',
  multiple: false,
  fileSelected: null,
  disabled: false,
  fileUrl: null,
};

export default React.memo(Component);
