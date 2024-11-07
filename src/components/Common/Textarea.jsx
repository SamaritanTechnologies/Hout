import React from "react";

const Textarea = ({ id, name, rows = 6, value, onChange, required, placeholder }) => {
  return (
    <div class="xl:mb-2 lg:mb-2 mb-2">
      <div class="grid text-sm after:px-3.5 after:py-2.5 [&>textarea]:text-inherit after:text-inherit [&>textarea]:resize-none [&>textarea]:overflow-hidden [&>textarea]:[grid-area:1/1/2/2] after:[grid-area:1/1/2/2] after:whitespace-pre-wrap after:invisible after:content-[attr(data-cloned-val)_'_'] after:border">
        <textarea
          class="w-full text-slate-600 bg-white border border-[#D9D9D9]  appearance-none rounded-lg px-3.5 py-2.5 outline-none focus:bg-white focus:border-indigo-400 focus:ring-2 focus:ring-indigo-100"
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
    </div>
  );
};

export default Textarea;
