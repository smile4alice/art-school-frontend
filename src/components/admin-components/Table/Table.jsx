import React, { useState } from 'react';

import InputSm from '../../admin-components/formElement/Inputs/InputSm';
import TextArea from '../formElement/TextArea/TextArea';
import styles from './Table.module.scss';


const Table = () => {
   return(
      <div className={styles.table}>
         <InputSm label="Заголовок*" maxLength={50} showCharacterCount={false} />

         <TextArea label="Текст*" maxLength={2000} errorMessage="Текст перевищує 2000 символів" />         
      </div>
   )
}
export default Table;