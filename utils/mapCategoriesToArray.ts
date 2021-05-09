import { get } from "./apiCalls";

//OK JEDINO STO ZNAM ZA SAD JE DA OCU DA MI SE VRACA OBJEKAT KOJI IMA ATRIBUTE label I value I TO label = ime i value = id ZA POTREBE DODAVANJA KATEGORIJE JELTE JESTE DA
export const categoriesArray = async () => {
  try {
    const res = await get("products/categories");
    const data: Array<any> = res?.data;

    const categoriesObjectArray: Array<object> = [];

    data.map((value, _) => {
      categoriesObjectArray.push({
        label: value.name,
        value: value.id,
      });
    });
    return categoriesObjectArray;
  } catch (err) {
    console.log(err);
  }
};
