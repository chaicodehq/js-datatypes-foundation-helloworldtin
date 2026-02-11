/**
 * 🍽️ Thali Combo Platter - Mixed Methods Capstone
 *
 * Grand Indian Thali restaurant mein combo platter system banana hai.
 * String, Number, Array, aur Object — sab methods mila ke ek complete
 * thali banao. Yeh capstone challenge hai — sab kuch combine karo!
 *
 * Data format: thali = {
 *   name: "Rajasthani Thali",
 *   items: ["dal baati", "churma", "papad"],
 *   price: 250,
 *   isVeg: true
 * }
 *
 * Functions:
 *
 *   1. createThaliDescription(thali)
 *      - Template literal, .join(", "), .toUpperCase(), .toFixed(2) use karo
 *      - Format: "{NAME} (Veg/Non-Veg) - Items: {items joined} - Rs.{price}"
 *      - name ko UPPERCASE karo, price ko 2 decimal places tak
 *      - isVeg true hai toh "Veg", false hai toh "Non-Veg"
 *      - Agar thali object nahi hai ya required fields missing hain, return ""
 *      - Required fields: name (string), items (array), price (number), isVeg (boolean)
 *      - Example: createThaliDescription({name:"Rajasthani Thali", items:["dal","churma"], price:250, isVeg:true})
 *                 => "RAJASTHANI THALI (Veg) - Items: dal, churma - Rs.250.00"
 *
 *   2. getThaliStats(thalis)
 *      - Array of thali objects ka stats nikalo
 *      - .filter() se veg/non-veg count
 *      - .reduce() se average price
 *      - Math.min/Math.max se cheapest/costliest
 *      - .map() se saare names
 *      - Return: { totalThalis, vegCount, nonVegCount, avgPrice (2 decimal string),
 *                  cheapest (number), costliest (number), names (array) }
 *      - Agar thalis array nahi hai ya empty hai, return null
 *
 *   3. searchThaliMenu(thalis, query)
 *      - .filter() + .includes() se search karo (case-insensitive)
 *      - Thali match karti hai agar name ya koi bhi item query include kare
 *      - Agar thalis array nahi hai ya query string nahi hai, return []
 *      - Example: searchThaliMenu(thalis, "dal") => thalis with "dal" in name or items
 *
 *   4. generateThaliReceipt(customerName, thalis)
 *      - Template literals + .map() + .join("\n") + .reduce() se receipt banao
 *      - Format:
 *        "THALI RECEIPT\n---\nCustomer: {NAME}\n{line items}\n---\nTotal: Rs.{total}\nItems: {count}"
 *      - Line item: "- {thali name} x Rs.{price}"
 *      - customerName UPPERCASE mein
 *      - Agar customerName string nahi hai ya thalis array nahi hai/empty hai, return ""
 *
 * @example
 *   createThaliDescription({name:"Rajasthani Thali", items:["dal"], price:250, isVeg:true})
 *   // => "RAJASTHANI THALI (Veg) - Items: dal - Rs.250.00"
 */
export function createThaliDescription(thali) {
  if (thali === null || typeof thali !== "object") return "";
  if (
    !Object.hasOwn(thali, "name") ||
    !Object.hasOwn(thali, "items") ||
    !Object.hasOwn(thali, "price") ||
    !Object.hasOwn(thali, "isVeg")
  )
    return "";
  const NAME = thali.name.toUpperCase();
  const VEGORNOT = thali.isVeg ? "Veg" : "Non-Veg";
  const ITEMS = thali.items.join(", ");
  const PRICE = thali.price.toFixed(2);

  return `${NAME} (${VEGORNOT}) - Items: ${ITEMS} - Rs.${PRICE}`;
}

export function getThaliStats(thalis) {
  if (!Array.isArray(thalis) || thalis.length === 0) return null;

  const totalThalis = thalis.length;
  const vegCount = thalis.filter((thail) => thail.isVeg === true).length;
  const nonVegCount = thalis.filter((thail) => thail.isVeg === false).length;

  const avgPrice = (
    thalis.reduce((prevVal, currThail) => prevVal + currThail.price, 0) /
    totalThalis
  ).toFixed(2);

  const allPriceList = thalis.map((thail) => thail.price);
  const cheapest = Math.min(...allPriceList);
  const costliest = Math.max(...allPriceList);

  const names = thalis.map((thail) => thail.name);

  return {
    totalThalis,
    vegCount,
    nonVegCount,
    avgPrice,
    cheapest,
    costliest,
    names,
  };
}

export function searchThaliMenu(thalis, query) {
  if (!Array.isArray(thalis) || typeof query !== "string") return [];
  if (thalis.length === 0) return [];

  const filtered_thail = thalis.filter((thali) => {
    const is_in_item = thali.items.filter((item) => {
      const res = item.toLowerCase().includes(query.toLowerCase());
      return res;
    });

    return (
      thali.name.toLowerCase().includes(query.toLowerCase()) ||
      is_in_item.length > 0
    );
  });
  return filtered_thail;
}

export function generateThaliReceipt(customerName, thalis) {
  if (
    typeof customerName !== "string" ||
    !Array.isArray(thalis) ||
    thalis.length === 0
  )
    return "";
  const NAME = customerName.toUpperCase();
  const total = thalis.reduce((prevVal, curr) => prevVal + curr.price, 0);
  const count = thalis.length;
  const thali_names = thalis.map((thail) => thail.name);
  const thail_prices = thalis.map((thail) => thail.price);

  let lineItem = "";
  for (let i = 0; i < thail_prices.length; i++) {
    const new_item = `- ${thali_names[i]} x Rs.${thail_prices[i]}` + "\n";
    lineItem += new_item;
  }

  return `THALI RECEIPT\n---\nCustomer: ${NAME}\n${lineItem}\n---\nTotal: Rs.${total}\nItems: ${count}`;
}
