import { useEffect, useState } from 'react';
import Dropzone from 'react-dropzone';
import { AiOutlinePlus } from 'react-icons/ai';
import styles from './FileInput.module.scss';

const FileInput = ({
  label,
  field,
  photo,
  form: { errors, setFieldValue },
  ...props
}) => {
  const { name } = field;
  const [imagePreview, setImagePreview] = useState('');
  const fieldValue = field.value;
  useEffect(() => {
    setImagePreview(fieldValue?.[0]?.name);
  }, [fieldValue]);

  const setFileToBase64 = file => {
    const reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onloadend = () => {
      setImagePreview(reader.result);
    };
  };

  useEffect(() => {
    if (photo) {
     // setImagePreview(photo);
      setFieldValue(`${name}`, [new File([], photo, { type: 'for-url' })]);
    }
  }, [photo, setFieldValue, name]);

  const onDrop = files => {
    const file = files[0];
    setFieldValue(name, files);
    setFileToBase64(file);
  };

  return (
    <div className={styles.wrapper}>
      <label htmlFor={`dropzone-${name}`} className={styles.inputLabel}>
        {label}
      </label>
      <Dropzone
        onDrop={onDrop}
        multiple={false}
        maxSize={8000000000}
        id={`dropzone-${name}`}
        {...field}
        {...props}
      >
        {({ getRootProps, getInputProps }) => (
          <section>
            <div className={styles.dropzone} {...getRootProps()}>
              <input {...getInputProps()} />
              {imagePreview && (
                <div className={styles.imagePreview}>
                  <img src={imagePreview} alt="Preview" />
                </div>
              )}
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
        {errors?.[name] && (
          <p className={styles.errorMessage}>{errors?.[name]}</p>
        )}
      </div>
    </div>
  );
};

export default FileInput;
