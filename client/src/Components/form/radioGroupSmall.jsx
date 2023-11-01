const RadioGroupOptionsSmall = ({ name, label, error, options, value, checked, ...rest }) => {
  const isChecked = (value) => value === options[checked - 1].name;

  return (
    <div className="mx-auto w-full h-fit max-w-md mt-2 mb-6">
      <label className="text-center">
        <div className="mb-4 md:text-xl">
          <h2>{label.title || label}</h2>
          <span>{label.subTitle || ''}</span>
        </div>
      </label>
      <div className="flex flex-wrap w-full place-content-center space-x-2">
        {options.map((option) => (
          <div key={option._id || option.id} className={``}>
            <input
              {...rest}
              id={option.name}
              type="radio"
              name={name}
              value={option.label}
              disabled={option.disabled}
              defaultChecked={isChecked(option.name)}
              className="w-0 fixed opacity-0 cwat-ticket-option"
            />
            <label
              htmlFor={option.name}
              className={`relative p-2 px-3 block cursor-pointer rounded-lg shadow-md focus:outline-none bg-white text-md font-medium text-gray-900   
              `}
            >
              {option.label}
            </label>
          </div>
        ))}
      </div>
    </div>
  );
};

export default RadioGroupOptionsSmall;
