import { useEffect } from 'react';
import Dropzone from 'react-dropzone';
import { AiOutlinePlus } from 'react-icons/ai';
import styles from './PdfInput.module.scss';

const FileInput = ({
  label,
  field,
  pdf,
  form: { errors, setFieldValue },
  ...props
}) => {
  const name = field.name;

  useEffect(() => {
    if (!pdf) return;
    setFieldValue(`${name}`, [new File([], pdf, { type: 'for-url' })]);
  }, [pdf, setFieldValue, name]);

  const onDrop = async files => {
    setFieldValue('document', files);
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
          <section className={styles.section}>
            <div className={styles.dropzone} {...getRootProps()}>
              <input {...getInputProps()} />
              {field.value?.[0] ? (
                <div className={styles.imagePreview}>
                  <img src="/pdf-icon.png" />
                </div>
              ) : null}
              {!field.value?.[0] && (
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
