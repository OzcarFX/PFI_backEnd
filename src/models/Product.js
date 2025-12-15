
import { db } from "./data.js";

import {
  collection,
  doc,
  getDoc,
  getDocs,
  addDoc,
  updateDoc,
  deleteDoc,
} from "firebase/firestore";

const ColeccionDeProductos = collection(db, "productos");

export const getAllProducts = async () => {
  try {
    const snapshot = await getDocs(ColeccionDeProductos);
    return snapshot.docs.map((doc) => ({ id: doc.id, ...doc.data() }));
  } catch (error) {
    console.error(error);
  }
};

export const getProductById = async (id) => {
  try {
    const productRef = doc(ColeccionDeProductos, id);
    const snapshot = await getDoc(productRef);
    return snapshot.exists() ? { id: snapshot.id, ...snapshot.data() } : null;
  } catch (error) {
    console.error(error);
  }
};

export const createProduct = async (productData) => {

    const docRef = await addDoc(collection(db, "productos"), productData);
    return { id: docRef.id, ...productData };
};

export const updateProduct = async (id, productData) => {
  console.log(id, productData);
  try {
    const productRef = doc(ColeccionDeProductos, id);
    const snapshot = await getDoc(productRef);

    if (!snapshot.exists()) {
      return false;
    }

    await updateDoc(productRef, productData);
    return { id, ...productData };
  } catch (error) {
    console.error(error);
  }
};

export const deleteProduct = async (id) => {
  try {
    const productRef = doc(ColeccionDeProductos, id);
    const snapshot = await getDoc(productRef);

    if (!snapshot.exists()) {
      return false;
    }

    await deleteDoc(productRef);
    return true;
  } catch (error) {
    console.error(error);
  }
};
