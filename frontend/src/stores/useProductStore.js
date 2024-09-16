import { create } from "zustand";
import toast from "react-hot-toast";
import axios from "../lib/axios";

// export const useProductStore = create((set) => ({
//   products: [],
//   loading: false,

//   setProducts: (products) => set({ products }),

//   createProduct: async (productData) => {
//     set({ loading: true });
//     try {
//       const res = await axios.post("/products", productData);

//       set((prevState) => ({
//         // Check if prevState.products is an array before updating
//         products: Array.isArray(prevState.products)
//           ? [...prevState.products, res.data]
//           : [res.data],
//         loading: false,
//       }));

//       toast.success("Product created successfully");
//       return res.data; // Return the created product data
//     } catch (error) {
//       set({ loading: false }); // Stop loading on error
//       // Display error toast message based on the error response
//       const errorMessage =
//         error.response?.data?.error || "Error creating product";
//       toast.error(errorMessage);
//       console.error("Error creating product:", error);

//       // Re-throw the error to handle it in the calling function
//       throw error;
//     }
//   },

//   // fetchAllProducts: async () => {
//   //   set({ loading: true });
//   //   try {
//   //     const response = await axios.get("/products");
//   //     console.log("API response:", response.data);
//   //     set({ products: response.data.products || [], loading: false });
//   //   } catch (error) {
//   //     set({ error: "Failed to fetch products", loading: false });
//   //     toast.error(error.response.data.error || "Failed to fetch products");
//   //   }
//   // },

//   fetchAllProducts: async () => {
//     set({ loading: true });
//     try {
//       const response = await axios.get("/products");
//       const fetchedProducts = response.data.products || []; // Ensure fallback to empty array
//       set({ products: fetchedProducts, loading: false });
//     } catch (error) {
//       set({ loading: false });
//       toast.error(error.response?.data?.error || "Failed to fetch products");
//     }
//   },

//   fetchProductsByCategory: async (category) => {
//     set({ loading: true });
//     try {
//       const response = await axios.get(`/products/category/${category}`);
//       set({ products: response.data.products, loading: false });
//     } catch (error) {
//       set({ error: "Failed to fetch products", loading: false });
//       toast.error(error.response.data.error || "Failed to fetch products");
//     }
//   },
//   // deleteProduct: async (productId) => {
//   //   set({ loading: true });
//   //   try {
//   //     await axios.delete(`/products/${productId}`);
//   //     set((prevProducts) => ({
//   //       products: prevProducts.products.filter(
//   //         (product) => product._id !== productId
//   //       ),
//   //       loading: false,
//   //     }));
//   //   } catch (error) {
//   //     set({ loading: false });
//   //     toast.error(error.response.data.error || "Failed to delete product");
//   //   }
//   // },

//   deleteProduct: async (productId) => {
//     set({ loading: true });
//     try {
//       await axios.delete(`/products/${productId}`);
//       set((prevState) => ({
//         products: prevState.products.filter(
//           (product) => product._id !== productId
//         ),
//         loading: false,
//       }));
//       toast.success("Product deleted successfully");
//     } catch (error) {
//       set({ loading: false });
//       toast.error(error.response?.data?.error || "Failed to delete product");
//     }
//   },

//   toggleFeaturedProduct: async (productId) => {
//     set({ loading: true });
//     try {
//       const response = await axios.patch(`/products/${productId}`);
//       // this will update the isFeatured prop of the product
//       set((prevProducts) => ({
//         products: prevProducts.products.map((product) =>
//           product._id === productId
//             ? { ...product, isFeatured: response.data.isFeatured }
//             : product
//         ),
//         loading: false,
//       }));
//     } catch (error) {
//       set({ loading: false });
//       toast.error(error.response.data.error || "Failed to update product");
//     }
//   },
//   fetchFeaturedProducts: async () => {
//     set({ loading: true });
//     try {
//       const response = await axios.get("/products/featured");
//       set({ products: response.data, loading: false });
//     } catch (error) {
//       set({ error: "Failed to fetch products", loading: false });
//       console.log("Error fetching featured products:", error);
//     }
//   },
// }));

// export const useProductStore = create((set) => ({
//   products: [],
//   loading: false,

//   setProducts: (products) => set({ products }),

//   createProduct: async (productData) => {
//     set({ loading: true });
//     try {
//       const res = await axios.post("/products", productData);

//       set((prevState) => ({
//         // Check if prevState.products is an array before updating
//         products: Array.isArray(prevState.products)
//           ? [...prevState.products, res.data]
//           : [res.data],
//         loading: false,
//       }));

//       toast.success("Product created successfully");
//       return res.data; // Return the created product data
//     } catch (error) {
//       set({ loading: false }); // Stop loading on error
//       // Display error toast message based on the error response
//       const errorMessage =
//         error.response?.data?.error || "Error creating product";
//       toast.error(errorMessage);
//       console.error("Error creating product:", error);

//       // Re-throw the error to handle it in the calling function
//       throw error;
//     }
//   },

//   fetchAllProducts: async () => {
//     set({ loading: true });
//     try {
//       const response = await axios.get("/products");
//       set({ products: response.data.products, loading: false });
//     } catch (error) {
//       set({ error: "Failed to fetch products", loading: false });
//       toast.error(error.response.data.error || "Failed to fetch products");
//     }
//   },

//   fetchProductsByCategory: async (category) => {
//     set({ loading: true });
//     try {
//       const response = await axios.get(`/products/category/${category}`);
//       set({ products: response.data.products, loading: false });
//     } catch (error) {
//       set({ error: "Failed to fetch products", loading: false });
//       toast.error(error.response.data.error || "Failed to fetch products");
//     }
//   },

//   deleteProduct: async (productId) => {
//     set({ loading: true });
//     try {
//       await axios.delete(`/products/${productId}`);
//       set((state) => ({
//         products: state.products.filter((product) => product._id !== productId),
//         loading: false,
//       }));
//       toast.success("Product deleted successfully");
//     } catch (error) {
//       toast.error(error.response?.data?.error || "Failed to delete product");
//       set({ loading: false });
//     }
//   },

//   toggleFeaturedProduct: async (productId) => {
//     set({ loading: true });
//     try {
//       const response = await axios.patch(`/products/${productId}`);
//       set((state) => ({
//         products: state.products.map((product) =>
//           product._id === productId
//             ? { ...product, isFeatured: response.data.isFeatured }
//             : product
//         ),
//         loading: false,
//       }));
//       toast.success("Product updated successfully");
//     } catch (error) {
//       toast.error(error.response?.data?.error || "Failed to update product");
//       set({ loading: false });
//     }
//   },

//   fetchFeaturedProducts: async () => {
//     set({ loading: true });
//     try {
//       const response = await axios.get("/products/featured");
//       set({ products: response.data, loading: false });
//     } catch (error) {
//       set({ error: "Failed to fetch products", loading: false });
//       console.log("Error fetching featured products:", error);
//     }
//   },
// }));

export const useProductStore = create((set) => ({
  products: [],
  loading: false,

  setProducts: (products) => set({ products }),
  createProduct: async (productData) => {
    set({ loading: true });
    try {
      const res = await axios.post("/products", productData);
      set((prevState) => ({
        products: [...prevState.products, res.data],
        loading: false,
      }));
    } catch (error) {
      toast.error(error.response.data.error);
      set({ loading: false });
    }
  },
  fetchAllProducts: async () => {
    set({ loading: true });
    try {
      const response = await axios.get("/products");
      set({ products: response.data.products, loading: false });
    } catch (error) {
      set({ error: "Failed to fetch products", loading: false });
      toast.error(error.response.data.error || "Failed to fetch products");
    }
  },
  fetchProductsByCategory: async (category) => {
    set({ loading: true });
    try {
      const response = await axios.get(`/products/category/${category}`);
      set({ products: response.data.products, loading: false });
    } catch (error) {
      set({ error: "Failed to fetch products", loading: false });
      toast.error(error.response.data.error || "Failed to fetch products");
    }
  },
  deleteProduct: async (productId) => {
    set({ loading: true });
    try {
      await axios.delete(`/products/${productId}`);
      set((prevProducts) => ({
        products: prevProducts.products.filter(
          (product) => product._id !== productId
        ),
        loading: false,
      }));
    } catch (error) {
      set({ loading: false });
      toast.error(error.response.data.error || "Failed to delete product");
    }
  },
  toggleFeaturedProduct: async (productId) => {
    set({ loading: true });
    try {
      const response = await axios.patch(`/products/${productId}`);
      // this will update the isFeatured prop of the product
      set((prevProducts) => ({
        products: prevProducts.products.map((product) =>
          product._id === productId
            ? { ...product, isFeatured: response.data.isFeatured }
            : product
        ),
        loading: false,
      }));
    } catch (error) {
      set({ loading: false });
      toast.error(error.response.data.error || "Failed to update product");
    }
  },
  fetchFeaturedProducts: async () => {
    set({ loading: true });
    try {
      const response = await axios.get("/products/featured");
      set({ products: response.data, loading: false });
    } catch (error) {
      set({ error: "Failed to fetch products", loading: false });
      console.log("Error fetching featured products:", error);
    }
  },
}));
