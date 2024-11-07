import React from "react";
import { useField, useFormikContext } from "formik";
import Multiselect from "multiselect-react-dropdown";

const FormikMultiSelect = ({
  label,
  options,
  displayValue = "name",
  name,
  required = false,
  marginTop,
  marginBottom,
  className,
  style = {
    chips: {
      background: "gray",
      borderRadius: "2px",
    },
    searchBox: {},
    option: {
      background: "white",
      color: "black",
    },
  },
  ...props
}) => {
  const { setFieldValue } = useFormikContext();
  const [field, meta] = useField(name);
  const selectedValues = field?.value?.map((item) => item.id || item);

  return (
    <div
      className={`${marginTop && "mt-4"} ${
        marginBottom && "mb-4"
      } ${className}`}
    >
      {label && (
        <label className="block text-sm font-medium text-gray-700 pb-1.5">
          {label}
        </label>
      )}
      <Multiselect
        options={options}
        displayValue={displayValue}
        selectedValues={selectedValues}
        onSelect={(selectedList) => {
          const selectedIds = selectedList.map((item) => item.id || item);
          setFieldValue(name, selectedIds);
        }}
        onRemove={(selectedList) => {
          const selectedIds = selectedList.map((item) => item.id || item);
          setFieldValue(name, selectedIds);
        }}
        // onSelect={(selectedList) => setFieldValue(name, selectedList)}
        // onRemove={(selectedList) => setFieldValue(name, selectedList)}
        style={style}
        closeIcon="close"
        {...props}
      />
      {meta.touched && meta.error ? (
        <div className="text-red-500 text-sm mt-1">{meta.error}</div>
      ) : null}
    </div>
  );
};

export default FormikMultiSelect;
