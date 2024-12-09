import { Menu } from "@headlessui/react";

export default function DropdownFilter({
  options,
  selected,
  setSelected,
  label,
}) {
  const handleSelect = (value) => {
    setSelected((prev) =>
      prev.includes(value)
        ? prev.filter((item) => item !== value)
        : [...prev, value]
    );
  };

  return (
    <Menu as="div" className="relative inline-block text-left">
      <Menu.Button className="inline-flex items-center">{label}</Menu.Button>

      <Menu.Items className="fillters absolute left-0 z-10 mt-2 w-44 origin-top-right bg-white shadow-lg rounded-md focus:outline-none">
        {options.map((option) => (
          <Menu.Item key={option.value}>
            {({ active }) => (
              <div
                onClick={() => handleSelect(option.value)}
                className={`${
                  active ? "bg-gray-100" : ""
                } flex items-center px-4 py-2 cursor-pointer`}
              >
                <input
                  type="checkbox"
                  checked={selected.includes(option.value)}
                  readOnly
                  className="mr-2"
                />
                <span>{option.label}</span>
              </div>
            )}
          </Menu.Item>
        ))}
      </Menu.Items>
    </Menu>
  );
}
