import shortid from "shortid";

import {Product} from "../types";
import schemas from "../schemas";

import {database, firestore} from "~/firebase/admin";
import {ClientTenant} from "~/tenant/types";

const slugify = (text) => {
  return text
    .toString()                   // Cast to string (optional)
    .normalize('NFKD')            // The normalize() using NFKD method returns the Unicode Normalization Form of a given string.
    .toLowerCase()                // Convert the string to lowercase letters
    .trim()                       // Remove whitespace from both sides of a string (optional)
    .replace(/\s+/g, '-')         // Replace spaces with -
    .replace(/[^\w\-]+/g, '')     // Remove all non-word chars
    .replace(/\_/g,'-')           // Replace _ with -
    .replace(/\-\-+/g, '-')       // Replace multiple - with single -
    .replace(/\-$/g, '');         // Remove trailing -
}

export default {
  list: async (tenant: ClientTenant["id"]): Promise<Product[]> => {
    return database
      .collection("tenants")
      .doc(tenant)
      .collection("products")
      .get()
      .then((snapshot) => snapshot.docs.map((doc) => ({...(doc.data() as Product), id: doc.id})))
      .then((products) => products.map((product) => schemas.client.fetch.cast(product)));
  },
  orders: async (tenant: ClientTenant["id"]) => {
    return database
      .collection("tenants")
      .doc(tenant)
      .collection("orders")
      .get()
      .then((snapshot) => snapshot.docs.map(doc => ({...(doc.data()), id: doc.id})))
      .then((orders) => orders.map((order) => order));
  },
  create: (tenant: ClientTenant["id"], product: Product) => {
    const newProduct = database.collection("tenants").doc(tenant).collection("products").doc();
    product["slug"] = slugify(product.title) + "-" + newProduct.id;
    product["id"] = newProduct.id;
    const casted = schemas.server.create.cast(product);

    return newProduct
      .set(casted)
      .then((snapshot) => {
        const product: Product = {...casted, id: snapshot['id']};

        return product;
      });
  },
  remove: (tenant: ClientTenant["id"], product: Product["id"]) =>
    database
      .collection("tenants")
      .doc(tenant)
      .collection("products")
      .doc(product)
      .delete()
      .then(() => product),
  remorder: (tenant: ClientTenant["id"], order) =>
    database
      .collection("tenants")
      .doc(tenant)
      .collection("orders")
      .doc(order)
      .delete()
      .then(() => order),
  update: (tenant: ClientTenant["id"], {id, ...product}: Product) => {
    product["slug"] = slugify(product.title) + "-" + id;
    const casted = schemas.server.update.cast(product);


    return database
      .collection("tenants")
      .doc(tenant)
      .collection("products")
      .doc(id)
      .update(casted)
      .then(() => casted);
  },
  updateorder: (tenant: ClientTenant["id"], order) => {
    return database
      .collection("tenants")
      .doc(tenant)
      .collection("orders")
      .doc(order.id)
      .update(order)
      .then(() => order);
  },
  upsert: (tenant: ClientTenant["id"], products: Product[]) => {
    const batch = database.batch();

    products.forEach((product) => {
      if (product.id) {
        const {id, ...formatted} = schemas.server.update.cast(product);

        batch.update(
          database.collection("tenants").doc(tenant).collection("products").doc(id),
          formatted,
        );

        return {id, ...formatted};
      } else {
        // added
        const docId = shortid.generate();
        product["slug"] = slugify(product.title) + "-" + docId;
        product["id"] = docId;
        // end-added

        // const formatted = schemas.server.create.cast(product);
        // const docId = shortid.generate();
        const formatted = schemas.server.create.cast(product);

        batch.create(
          database.collection("tenants").doc(tenant).collection("products").doc(docId),
          formatted,
        );

        return {...formatted, id: docId} as Product;
      }
    });

    return batch.commit().then(() => products);
  },

  hookorder: async (tenant: ClientTenant["id"], order) => {
    //const casted = schemas.server.create.cast(product);
    // let now = ;
    // let dateMinusHours = firestore.Timestamp.fromMillis(now.toMillis() - (3600000*5));
    order['createdAt'] = firestore.Timestamp.now().seconds;
    order['checked'] = false;
    order['deleted'] = false;

    return database
      .collection("tenants")
      .doc(tenant)
      .collection("orders")
      .add(order)
      .then();
  },
};
