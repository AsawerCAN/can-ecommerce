import Product from "../models/product.model.js";
import { redis } from "../lib/redis.js";
import cloudinary from "../lib/cloudinary.js";

// export const getAllProducts = async (req, res) => {
//   try {
//     const allProducts = await Product.find({}).sort({ createdAt: -1 });
//     res.status(200).json(allProducts);
//   } catch (error) {
//     console.log("Error in getAllProducts controller", error.message);
//     res.status(500).json({ message: "Server Error", error: error.message });
//   }
// };

// export const getFeaturedProducts = async (req, res) => {
//   try {
//     let featuredProducts = await redis.get("featured_products");
//     if (featuredProducts) {
//       return res.status(200).json(JSON.parse(featuredProducts));
//     }

//     // if not in redis fetch from mongodb
//     featuredProducts = await Product.find({ isFeatured: true })
//       .sort({
//         createdAt: -1,
//       })
//       .lean(); /* .lean() converts Mongoose documents to plain JavaScript objects, which increase performance */

//     if (!featuredProducts) {
//       return res.status(404).json({ message: "No featured products found" });
//     }

//     // store in redis for future quick access
//     await redis.set("featured_products", JSON.stringify(featuredProducts));
//     res.status(200).json(featuredProducts);
//   } catch (error) {
//     console.log("Error in getFeaturedProducts controller", error.message);
//     res.status(500).json({ message: "Server Error", error: error.message });
//   }
// };

// export const createProduct = async (req, res) => {
//   try {
//     const { name, description, price, image, category } = req.body;

//     let cloudinaryResponse = null;

//     // Upload image to Cloudinary
//     if (image) {
//       cloudinaryResponse = await cloudinary.uploader.upload(image, {
//         folder: "products",
//       });
//     }

//     // Create new product
//     const newProduct = await Product.create({
//       name,
//       description,
//       price,
//       image: cloudinaryResponse?.secure_url
//         ? cloudinaryResponse.secure_url
//         : "",
//       category,
//     });

//     res.status(201).json(newProduct);
//   } catch (error) {
//     console.log("Error in createProduct controller", error.message);
//     res.status(500).json({ message: "Server Error", error: error.message });
//   }
// };

// export const deleteProduct = async (req, res) => {
//   try {
//     const product = await Product.findById(req.params.id);
//     if (!product) {
//       return res.status(404).json({ message: "Product not found" });
//     }

//     if (product.image) {
//       const publicId = product.image.split("/").pop().split("."[0]);
//       try {
//         await cloudinary.uploader.destroy(`products/${publicId}`);
//         console.log("Image deleted from cloudinary");
//       } catch (error) {
//         console.log("Error deleting image from cloudinary", error);
//       }
//     }

//     await Product.findByIdAndDelete(req.params.id);
//     res.status(200).json({ message: "Product deleted successfully" });
//   } catch (error) {
//     console.log("Error in deleteProduct controller", error.message);
//     res.status(500).json({ message: "Server Error", error: error.message });
//   }
// };

// export const getRecommendedProducts = async (req, res) => {
//   try {
//     const products = await Product.aggregate([
//       {
//         $sample: { size: 4 },
//       },
//       {
//         $project: {
//           _id: 1,
//           name: 1,
//           description: 1,
//           price: 1,
//           image: 1,
//         },
//       },
//     ]);

//     res.json(products);
//   } catch (error) {
//     console.log("Error in getRecommendedProducts controller", error.message);
//     res.status(500).json({ message: "Server Error", error: error.message });
//   }
// };

// export const getProductsByCategory = async (req, res) => {
//   const { category } = req.params;
//   try {
//     const products = await Product.find({ category });
//     res.json({ products });
//   } catch (error) {
//     console.log("Error in getProductsByCategory controller", error.message);
//     res.status(500).json({ message: "Server Error", error: error.message });
//   }
// };

// export const toggleFeaturedProduct = async (req, res) => {
//   try {
//     const product = await Product.findById(req.params.id);
//     if (!product) {
//       return res.status(404).json({ message: "Product not found" });
//     }
//     product.isFeatured = !product.isFeatured;
//     const updatedProduct = await product.save();

//     // update redis cache
//     await updateFeatureProductCache();
//     res
//       .status(200)
//       .json(updatedProduct)
//       .json({ message: "Product updated successfully" });
//   } catch (error) {
//     console.log("Error in toggleFeaturedProduct controller", error.message);
//     res.status(500).json({ message: "Server Error", error: error.message });
//   }
// };

// async function updateFeatureProductCache() {
//   try {
//     const featuredProducts = await Product.find({ isFeatured: true }).lean();
//     await redis.set("featured_products", JSON.stringify(featuredProducts));
//   } catch (error) {
//     console.log("Error updating feature product cache", error.message);
//   }
// }

export const getAllProducts = async (req, res) => {
  const { page = 1, limit = 10 } = req.query; // Default pagination
  try {
    const products = await Product.find({})
      .sort({ createdAt: -1 })
      .skip((page - 1) * limit)
      .limit(parseInt(limit));

    const totalProducts = await Product.countDocuments();

    res.status(200).json({
      total: totalProducts,
      page: parseInt(page),
      limit: parseInt(limit),
      products,
    });
  } catch (error) {
    console.log("Error in getAllProducts controller:", error.message);
    res.status(500).json({ message: "Server Error", error: error.message });
  }
};

export const getFeaturedProducts = async (req, res) => {
  try {
    let featuredProducts = await redis.get("featured_products");
    if (featuredProducts) {
      return res.status(200).json(JSON.parse(featuredProducts));
    }

    // If not in Redis, fetch from MongoDB
    featuredProducts = await Product.find({ isFeatured: true })
      .sort({ createdAt: -1 })
      .lean();
    if (!featuredProducts) {
      return res.status(404).json({ message: "No featured products found" });
    }

    // Store in Redis for future access
    await redis.set("featured_products", JSON.stringify(featuredProducts));
    res.status(200).json(featuredProducts);
  } catch (error) {
    console.log("Error in getFeaturedProducts controller:", error.message);
    res.status(500).json({ message: "Server Error", error: error.message });
  }
};

export const createProduct = async (req, res) => {
  try {
    const { name, description, price, image, category } = req.body;

    let cloudinaryResponse = null;

    // Upload image to Cloudinary if present
    if (image) {
      cloudinaryResponse = await cloudinary.uploader.upload(image, {
        folder: "products",
      });
    }

    // Create new product
    const newProduct = await Product.create({
      name,
      description,
      price,
      image:
        cloudinaryResponse?.secure_url ||
        "https://default-url.com/default-image.jpg", // Default image
      category,
    });

    res.status(201).json(newProduct);
  } catch (error) {
    console.log("Error in createProduct controller:", error.message);
    res.status(500).json({ message: "Server Error", error: error.message });
  }
};

export const deleteProduct = async (req, res) => {
  try {
    const product = await Product.findById(req.params.id);
    if (!product) {
      return res.status(404).json({ message: "Product not found" });
    }

    if (product.image) {
      const publicId = product.image.split("/").pop().split(".")[0]; // Extract public ID
      try {
        await cloudinary.uploader.destroy(`products/${publicId}`);
        console.log("Image deleted from Cloudinary");
      } catch (error) {
        console.log("Error deleting image from Cloudinary:", error);
      }
    }

    await Product.findByIdAndDelete(req.params.id);
    res.status(200).json({ message: "Product deleted successfully" });
  } catch (error) {
    console.log("Error in deleteProduct controller:", error.message);
    res.status(500).json({ message: "Server Error", error: error.message });
  }
};

export const getRecommendedProducts = async (req, res) => {
  try {
    const products = await Product.aggregate([
      {
        $sample: { size: 3 }, // Random 3 products
      },
      {
        $project: {
          _id: 1,
          name: 1,
          description: 1,
          price: 1,
          image: 1,
        },
      },
    ]);

    res.status(200).json(products);
  } catch (error) {
    console.log("Error in getRecommendedProducts controller:", error.message);
    res.status(500).json({ message: "Server Error", error: error.message });
  }
};

export const getProductsByCategory = async (req, res) => {
  const { category } = req.params;
  try {
    const products = await Product.find({ category });
    res.status(200).json({ products });
  } catch (error) {
    console.log("Error in getProductsByCategory controller:", error.message);
    res.status(500).json({ message: "Server Error", error: error.message });
  }
};

export const toggleFeaturedProduct = async (req, res) => {
  try {
    const product = await Product.findById(req.params.id);
    if (!product) {
      return res.status(404).json({ message: "Product not found" });
    }

    // Toggle featured status
    product.isFeatured = !product.isFeatured;
    const updatedProduct = await product.save();

    // Update Redis cache
    await updateFeatureProductCache();

    res.status(200).json({
      message: "Product updated successfully",
      product: updatedProduct,
    });
  } catch (error) {
    console.log("Error in toggleFeaturedProduct controller:", error.message);
    res.status(500).json({ message: "Server Error", error: error.message });
  }
};

// Helper function to update Redis cache
async function updateFeatureProductCache() {
  try {
    const featuredProducts = await Product.find({ isFeatured: true }).lean();
    await redis.set("featured_products", JSON.stringify(featuredProducts));
  } catch (error) {
    console.log("Error updating featured product cache:", error.message);
  }
}
