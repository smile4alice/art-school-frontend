import { useEffect, useState } from 'react';
import Dropzone from 'react-dropzone';
import { AiOutlinePlus } from 'react-icons/ai';
import styles from './FileInput.module.scss';

const FileInput = ({
  label,
  field,
  form: { errors, setFieldValue },
  ...props
}) => {

  const [imagePreview, setImagePreview] = useState('');
  const setFileToBase64 = file => {
    const reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onloadend = () => {
      setImagePreview(reader.result);
    };
  };
  useEffect(() => {
    if (!field.value) return;

    const file = field.value[0];
    setFileToBase64(file);
  }, [field.value, setFieldValue]);

  const onDrop = async files => {
    setFieldValue(field.name, files);
    const file = files[0];
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
        {...field}
        {...props}
      >
        {({ getRootProps, getInputProps }) => (
          <section>
            <div className={styles.dropzone} {...getRootProps()}>
              <input {...getInputProps()} />
              {imagePreview ? (
                <div className={styles.imagePreview}>
                  <img src={imagePreview} alt="Preview" />
                </div>
              ) : null}
              {!imagePreview && (
                <div className={styles.innerWrapper}>
                  <AiOutlinePlus className={styles.icon} />
                  <p>Перетягніть або натисніть тут, щоб завантажити файл</p>
                </div>
              )}
            </div>
          </section>
        )}
      </Dropzone>
      <div className={styles.errorWrap}>
        {errors?.[field.name] && (
          <p className={styles.errorMessage}>{errors?.[field.name]}</p>
        )}
      </div>
    </div>
  );
};

export default FileInput;
