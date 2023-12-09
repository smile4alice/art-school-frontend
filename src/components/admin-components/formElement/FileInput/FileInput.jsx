import { useState } from 'react';
import Dropzone from 'react-dropzone';
import { AiOutlinePlus } from 'react-icons/ai';
import styles from './FileInput.module.scss';

const FileInput = ({ label, prevImage }) => {
  const [image, setImage] = useState('');
  const [videoName, setVideoName] = useState('');

  const setFileToBase64 = file => {
    const reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onloadend = () => {
      setImage(reader.result);
    };
  };

  const onDrop = async files => {
    const file = files[0];
    setVideoName(file.name);
    setFileToBase64(file);
  };

  return (
    <div className={styles.wrapper}>
      <label htmlFor="dropzone" className={styles.inputLabel}>
        {label}
      </label>
      <Dropzone
        onDrop={onDrop}
        multiple={false}
        maxSize={8000000000}
        id="dropzone"
      >
        {({ getRootProps, getInputProps }) => (
          <section>
            <div className={styles.dropzone} {...getRootProps()}>
              <input {...getInputProps()} />
              {image || prevImage ? (
                <div className={styles.imagePreview}>
                  <img src={image || prevImage} />
                </div>
              ) : null}
              {!videoName && (
                <div className={styles.innerWrapper}>
                  <AiOutlinePlus className={styles.icon} />
                  <p>Перетягніть або натисніть тут, щоб завантажити файл</p>
                </div>
              )}
            </div>
          </section>
        )}
      </Dropzone>
    </div>
  );
};

export default FileInput;
