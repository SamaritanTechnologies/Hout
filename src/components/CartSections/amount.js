export const calculateTotal = (
  totalPrice,
  delivery,
  taxPercentage,
  coupon = null,
  selectedMethod = "delivery"
) => {
  console.log("taxPercentage", taxPercentage);
  let deliveryCharge = 0;
  const numericTotalPrice = Number(totalPrice || 0);

  if (selectedMethod !== "pickup") {
    if (numericTotalPrice < 750) {
      deliveryCharge = Number(delivery?.upto_750 || 0);
    } else if (numericTotalPrice >= 750 && numericTotalPrice <= 1500) {
      deliveryCharge = Number(delivery?.from_750_to_1500 || 0);
    } else {
      deliveryCharge = Number(delivery?.above_1500 || 0);
    }
  } else {
    deliveryCharge = 0;
  }

  const subtotal = numericTotalPrice + deliveryCharge;
  let discountAmount = 0;
  let isMinimumOrderMet = true;

  if (coupon && subtotal >= Number(coupon.minimum_order_amount)) {
    if (coupon.discount_type === "percentage") {
      discountAmount = subtotal * (Number(coupon.discount_value) / 100);
    } else if (coupon.discount_type === "fixed") {
      discountAmount = Number(coupon.discount_value);
    }
  } else if (coupon) {
    isMinimumOrderMet = false;
  }

  const amountAfterDiscount = subtotal - discountAmount;
  const taxRate = Number(taxPercentage || 0);
  let taxAmount = 0;
  let totalWithTax = amountAfterDiscount;
  if (taxRate > 0) {
    taxAmount = amountAfterDiscount * (taxRate / 100);
    totalWithTax = amountAfterDiscount + taxAmount;
  }

  return {
    total: totalWithTax,
    discount: discountAmount,
    subtotal: subtotal,
    isMinimumOrderMet,
    deliveryCharge,
    taxAmount,
  };
};
