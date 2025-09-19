import React from "react";

const Textarea = ({
  field, // Field props from Formik
  form: { touched, errors }, // Formik props to display errors
  rows = 6,
  placeholder,
  className = "",
  label,
  fixedHeight = false,
  ...props
}) => {
  return (
    <>
      <div className={`xl:mb-2 lg:mb-2 mb-2 ${className}`}>
        {label && (
          <label className="block text-sm font-medium text-gray-700 pb-1.5">
            {label}
          </label>
        )}
        {fixedHeight ? (
          <div className="relative">
            <textarea
              className={`w-full text-slate-600 bg-white border border-[#D9D9D9] appearance-none rounded-lg px-3.5 py-2.5 pr-12 outline-none focus:bg-white focus:border-indigo-400 focus:ring-2 focus:ring-indigo-100 resize-none overflow-y-auto h-32 ${
                touched[field.name] && errors[field.name] ? "border-red-500" : ""
              }`}
              placeholder={placeholder}
              {...field} // Formik's field props
              {...props} // Additional props
            ></textarea>
          </div>
        ) : (
          <div className="grid text-sm after:px-3.5 after:py-2.5 after:pr-12 [&>textarea]:text-inherit after:text-inherit [&>textarea]:resize-none [&>textarea]:[grid-area:1/1/2/2] after:[grid-area:1/1/2/2] after:whitespace-pre-wrap after:invisible after:content-[attr(data-cloned-val)_'_'] after:border">
            <textarea
              className={`w-full text-slate-600 bg-white border border-[#D9D9D9] appearance-none rounded-lg px-3.5 py-2.5 pr-12 outline-none focus:bg-white focus:border-indigo-400 focus:ring-2 focus:ring-indigo-100 ${
                touched[field.name] && errors[field.name] ? "border-red-500" : ""
              }`}
              rows={rows}
              placeholder={placeholder}
              {...field} // Formik's field props
              {...props} // Additional props
              onInput={(e) =>
                (e.target.parentNode.dataset.clonedVal = e.target.value)
              }
            ></textarea>
          </div>
        )}
        {touched[field.name] && errors[field.name] && (
          <div className="text-red text-sm mt-1">{errors[field.name]}</div>
        )}
      </div>

      {/* <div className="xl:mb-2 lg:mb-2 mb-2">
        <div className="grid text-sm after:px-3.5 after:py-2.5 [&>textarea]:text-inherit after:text-inherit [&>textarea]:resize-none [&>textarea]:overflow-hidden [&>textarea]:[grid-area:1/1/2/2] after:[grid-area:1/1/2/2] after:whitespace-pre-wrap after:invisible after:content-[attr(data-cloned-val)_'_'] after:border">
          <textarea
            className="w-full text-slate-600 bg-white border border-[#D9D9D9]  appearance-none rounded-lg px-3.5 py-2.5 outline-none focus:bg-white focus:border-indigo-400 focus:ring-2 focus:ring-indigo-100"
            name={name}
            id={id}
            rows={rows}
            onInput="this.parentNode.dataset.clonedVal = this.value"
            placeholder={placeholder}
            required={required}
            value={value}
            onChange={onChange}
          ></textarea>
        </div>
      </div> */}
    </>
  );
};

export default Textarea;
