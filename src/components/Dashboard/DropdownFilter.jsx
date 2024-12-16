import { Menu } from "@headlessui/react";

export default function DropdownFilter({ options, selected, onChange, label }) {
  const handleSelect = (value) => {
    onChange(
      selected.includes(value)
        ? selected.filter((item) => item !== value)
        : [...selected, value]
    );
  };

  return (
    <Menu as="div" className="relative inline-block text-left">
      <Menu.Button className="inline-flex items-center">{label}</Menu.Button>

      <Menu.Items className="fillters absolute left-0 z-10 py-1 w-44 max-h-40 overflow-y-auto origin-top-right bg-white shadow-lg rounded-md focus:outline-none flex flex-col justify-center">
        {options && options.length > 0 ? (
          options.map((option) => (
            <Menu.Item key={option.value} as="div">
              {({ active }) => (
                <div
                  onClick={(e) => {
                    e.stopPropagation(); // Prevent menu from closing
                    handleSelect(option.value);
                  }}
                  className={`${
                    active ? "bg-gray-100" : ""
                  } flex items-center px-4 py-2 cursor-pointer`}
                >
                  <input
                    type="checkbox"
                    checked={selected?.includes(option.value)}
                    readOnly
                    className="mr-2"
                  />
                  <span>{option.label}</span>
                </div>
              )}
            </Menu.Item>
          ))
        ) : (
          <div className="flex items-center justify-center text-center text-gray2 text-sm min-h-[100px]">
            No options available
          </div>
        )}
      </Menu.Items>
    </Menu>
  );
}
