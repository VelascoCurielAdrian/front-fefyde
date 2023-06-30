import React, { useMemo } from 'react';
import PropTypes from 'prop-types';
import { useDropzone } from 'react-dropzone';

const baseStyle = {
  flex: 1,
  display: 'flex',
  flexDirection: 'column',
  alignItems: 'center',
  padding: '20px',
  borderWidth: 2,
  borderRadius: 2,
  borderColor: '#eeeeee',
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
  title, subtitle, type, multiple,
}) => {
  const {
    getRootProps,
    getInputProps,
    isFocused,
    isDragAccept,
    acceptedFiles,
    isDragReject,
  } = useDropzone({ accept: { [type]: [] }, multiple });

  const style = useMemo(() => ({
    ...baseStyle,
    ...(isFocused ? focusedStyle : {}),
    ...(isDragAccept ? acceptStyle : {}),
    ...(isDragReject ? rejectStyle : {}),
  }), [
    isFocused,
    isDragAccept,
    isDragReject,
  ]);

  const filesPreview = acceptedFiles.map((file) => (
    <li key={file.path}>
      {file.path}
    </li>
  ));

  return (
    <div className="containerDropzone">
      <div {...getRootProps({ style })}>
        <input {...getInputProps()} />
        <p>{ title }</p>
        <p>{ subtitle }</p>
        <aside>
          <p className="file">{filesPreview}</p>
        </aside>
      </div>
    </div>
  );
};

Component.propTypes = {
  title: PropTypes.string,
  subtitle: PropTypes.string,
  type: PropTypes.string,
  multiple: PropTypes.bool,
};

Component.defaultProps = {
  title: 'Arrastre y suelte algunos archivos aquí o haga clic para seleccionar archivos.',
  subtitle: '',
  type: 'application/pdf',
  multiple: false,
};

export default Component;
