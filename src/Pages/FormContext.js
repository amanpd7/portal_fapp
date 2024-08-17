import React, { createContext, useState } from 'react';

export const FormContext = createContext();

export const FormProvider = ({ children }) => {
  const [formData, setFormData] = useState({});
  const [documents, setDocuments] = useState([]);

  return (
    <FormContext.Provider value={{ formData, setFormData, documents, setDocuments }}>
      {children}
    </FormContext.Provider>
  );
};
