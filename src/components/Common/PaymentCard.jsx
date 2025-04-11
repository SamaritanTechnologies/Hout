export default function PaymentCard({
  img,
  name,
  isChecked,
  removeBg,
  onChange,
  item,
  isRadioRequired,
}) {
  return (
    <div
      className={`${removeBg ? "" : "bg-[#F5F4F8] rounded-md"} flex py-2 px-3`}
    >
      <label className="inline-flex items-center my-2 w-full cursor-pointer">
        {isRadioRequired ? (
          <div className="px-[17px] py-[18px] mr-[12px] flex items-center">
            <input
              type="radio"
              name="paymentMethod"
              checked={isChecked}
              onChange={() => onChange(item)}
              style={{ display: "block" }}
              className="payMain"
            />
          </div>
        ) : (
          <input
            type="checkbox"
            className="form-checkbox rounded-full mr-4 md:mr-1 sm:mr-2 xs:mr-2 min-h-[16px] min-w-[16px] text-[#15803D]"
            checked={isChecked}
            onChange={() => onChange(item)}
          />
        )}

        {img && <img src={img} alt="" className="w-8 h-8 mr-2" />}
        <span className="ml-2 text-sm w-[100%]">{name}</span>
      </label>
    </div>
  );
}
