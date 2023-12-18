import { useEffect, useState } from 'react';
import styles from './TextInput.module.scss';

const TextInput = ({
  id,
  field,
  text,
  label,
  form: { errors, handleBlur, touched, setFieldValue },
  maxLength,
  showCharacterCount,
  placeholder,
}) => {
  const name = field.name;
  const isFieldTouched = touched[field.name];
  const valueLength = field.value.length;
  const [isFocused, setIsFocused] = useState(false);

  useEffect(() => {
    if (!text) return;
    setFieldValue(`${name}`, text);
  }, [text, setFieldValue, name]);

  const handleFocus = () => {
    setIsFocused(true);
  };

  useEffect(() => {
    if (isFieldTouched && valueLength >= 0) {
      setIsFocused(false);
    }
  }, [isFieldTouched, valueLength]);

  const getBorderColor = () => {
    if (valueLength > maxLength) {
      return styles.redBorder;
    }
    if (errors?.[field.name]) {
      return styles.redBorder;
    }
    if (isFocused) {
      return styles.blueBorder;
    }
    if (valueLength > 0 && !isFocused) {
      return styles.greenBorder;
    } else {
      return styles.grayBorder;
    }
  };

  const getInputState = () => {
    if (valueLength > maxLength) {
      return styles.error;
    } else if (valueLength > 0 && !isFocused) {
      return styles.entered;
    } else {
      return '';
    }
  };

  return (
    <div className={styles.inputWrapper}>
      <label htmlFor={id} className={styles.inputLabel}>
        {label}
      </label>
      <input
        id={id}
        type="text"
        className={`${styles.input} ${getBorderColor()} ${getInputState()}`}
        onFocus={handleFocus}
        onBlur={handleBlur}
        onClick={() => setIsFocused(true)}
        placeholder={placeholder ? placeholder : ''}
        {...field}
      />
      {showCharacterCount && (
        <div className={styles.commentsWrapper}>
          <p
            className={`${styles.counterMessage} ${
              valueLength > maxLength ? styles.redText : ''
            }`}
          >
            {`${valueLength}/${maxLength}`}
          </p>
        </div>
      )}
      {errors?.[field.name] && (
        <div className={styles.commentsWrapper}>
          <div className={styles.errorWrap}>
            {errors?.[field.name] && isFieldTouched && (
              <p className={styles.errorMessage}>{errors?.[field.name]}</p>
            )}
          </div>
        </div>
      )}
    </div>
  );
};

export default TextInput;
