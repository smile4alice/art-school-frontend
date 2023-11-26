export const InputSm = ({ value, label, setSmInput, placeholder, isLink = false, isEmptyInput, onChange, error, showHint, hint, emptyInputMessage }) => {
   const inputClassName = isLink ? styles.InputLink : styles.SmInput;
   const commonClassName = isEmptyInput ? `${inputClassName} ${styles.EmptyInput}` : inputClassName;

   return (
      <div className={styles.InputHint}>
         <p className={styles.InputLiable}>{label}</p>
         <div className={commonClassName}>
            <input
               value={value || ""}
               type="text"
               placeholder={placeholder}
               className={styles.InputField}
               onChange={onChange}
            />
         </div>
         {isEmptyInput && <p className={styles.ErrorMessage}>{emptyInputMessage}</p>}
         {showHint && <p className={styles.HintText}>{hint}</p>}
      </div>
   );
};

export default InputSm;
