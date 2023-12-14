import { useEffect, useState } from 'react';
import { FaRegEye, FaRegEyeSlash } from 'react-icons/fa';
import styles from './PasswordInput.module.scss';

const PasswordInput = ({
  id,
  field,
  label,
  form: { errors, handleBlur, touched },
  maxLength,
  showCharacterCount,
}) => {
  const isFieldTouched = touched[field.name];
  const valueLength = field.value.length;
  const [isFocused, setIsFocused] = useState(false);
  const [inputType, setInputType] = useState('password-hide');

  const handleInputType = e => {
    e.preventDefault();
    setInputType(prev =>
      prev === 'password-show' ? 'password-hide' : 'password-show'
    );
  };

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
    if (isFocused) {
      return styles.blueBorder;
    }
    if (valueLength === 0 && isFieldTouched) {
      return styles.redBorder;
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
        type={inputType === 'password-hide' ? 'password' : 'text'}
        className={`${styles.input} ${getBorderColor()} ${getInputState()}`}
        onFocus={handleFocus}
        onBlur={handleBlur}
        onClick={() => setIsFocused(true)}
        {...field}
      />
      <button className={styles.icon} onClick={handleInputType}>
        {inputType === 'password-hide' ? <FaRegEyeSlash /> : <FaRegEye />}
      </button>
      {showCharacterCount && (
        <div className={styles.commentsWrapper}>
          <div className={styles.errorWrap}>
            {errors?.[field.name] && isFieldTouched && (
              <p className={styles.errorMessage}>{errors?.[field.name]}</p>
            )}
          </div>
          <p
            className={`${styles.counterMessage} ${
              valueLength > maxLength ? styles.redText : ''
            }`}
          >
            {`${valueLength}/${maxLength}`}
          </p>
        </div>
      )}
    </div>
  );
};

export default PasswordInput;
