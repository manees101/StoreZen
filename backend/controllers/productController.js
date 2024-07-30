import Order from "../models/order.js";
import Product from "../models/product.js"
import ErrorHandler from "../utils/ErrorHandler.js"

export const getAllProducts = async (req, res) => {
  const { featured,category, company, name,bestSelling, sort, fields, numericFilters } = req.query;
  const queryObject = {};

  if (featured) {
    queryObject.featured = featured === 'true' ? true : false;
  }
  if (company) {
    queryObject.company = company;
  }
  if (name) {
    queryObject.name = { $regex: name, $options: 'i' };
  }
  if(category)
    {
      queryObject.category=category;
    }
  if (numericFilters) {
    const operatorMap = {
      '>': '$gt',
      '>=': '$gte',
      '=': '$eq',
      '<': '$lt',
      '<=': '$lte',
    };
    const regEx = /\b(<|>|>=|=|<|<=)\b/g;
    let filters = numericFilters.replace(
      regEx,
      (match) => `-${operatorMap[match]}-`
    );
    const options = ['originalPrice', 'rating'];
    filters = filters.split(',').forEach((item) => {
      const [field, operator, value] = item.split('-');
      if (options.includes(field)) {
        queryObject[field] = { [operator]: Number(value) };
      }
    });
  }

  let result = Product.find(queryObject);
  // sort
  if (bestSelling && bestSelling === 'true') {
    result = result.sort('-sold_out');
  } else if (sort) {
    const sortList = sort.split(',').join(' ');
    result = result.sort(sortList);
  } else {
    result = result.sort('createdAt');
  }

  if (fields) {
    const fieldsList = fields.split(',').join(' ');
    result = result.select(fieldsList);

  }
  const page = Number(req.query.page) || 1;
  const limit = Number(req.query.limit) || 10;
  const skip = (page - 1) * limit;

  result = result.skip(skip).limit(limit);
  
  const products = await result;
  const count=await Product.countDocuments()
  res.status(200).json({ products, count });
};
// Function to fetch product sales data
const getProductSalesData = async (productId) => {
  try {
    const result = await Order.aggregate([
      { $unwind: "$cart" },
      { $match: { "cart._id": mongoose.Types.ObjectId(productId) } },
      { $group: { _id: null, totalSales: { $sum: "$cart.quantity" } } }
    ]);

    const totalSales = result.length > 0 ? result[0].totalSales : 0;
    return totalSales;
  } catch (error) {
    console.error(`Error fetching sales data for product ${productId}:`, error);
    throw error;
  }
};


// Controller function to fetch products and analyze sales
export const fetchProductsAndAnalyzeSales = async (req, res) => {
  try {
    const products = await Product.find({});

    const notifications = await Promise.all(products.map(async (product) => {
      const totalSales = await getProductSalesData(product._id);
      const systemContent ="i have given product id and its sales "

      const response = await axios.post(aiModelApiUrl, {
        productId: product._id,
        totalSales
      });

      const prediction = response.data.prediction;

      return {
        id: product._id,
        message: `The future demand for product ${product.title} is predicted to be ${prediction}.`,
        type: 'demand',
        productId: product._id,
        date: new Date().toISOString()
      };
    }));

    // Send notifications to the sellers
    // Assuming you have a function to send notifications
    notifications.forEach(notification => {
      sendNotificationToSeller(notification);
    });

    res.status(200).json({
      success: true,
      notifications
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message
    });
  }
};

// Mock function to send notification to the seller
const sendNotificationToSeller = (notification) => {
  // Implement your notification logic here
  console.log('Notification sent to seller:', notification);
};

//get product inventory notifications
export const getInventoryNotifications = async (req, res) => {
  try {
    // Fetch products whose stock is equal to the threshold
    const products = await Product.find({ stock: { $lte: threshold } });

    // Format the notifications
    const notifications = products.map((product) => ({
      id: product._id,
      message: `Product ${product.title} has reached its stock threshold.`,
      type: "inventory",
      productId: product._id,
      date: new Date().toISOString(),
    }));

    res.status(200).json({ notifications });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};
//get products count
export const productCount=async(req,res,next)=>{
  try
  {
    const count=await Product.countDocuments();
    res.status(200).json(count)
  }
  catch(err)
  {
    return next(new ErrorHandler(err.message,500))
  }
}
//create product
export const createProduct=async(req,res,next)=>{
    try
    {
       const {title,description,originalPrice,discountPrice,category,sellerId,stock,tags,images}=req.body
       if(!title || title==='' || !description || description==="" || !originalPrice || originalPrice===""
        || !category || category==="" || !sellerId || sellerId ==="" || !stock || stock===0
       )
       {
        return next(new ErrorHandler("Please provide all fields",400))
       }
       console.log("Create product route hit...")
       const productObj={
        title,
        description,
        originalPrice,
        discountPrice,
        category,
        sellerId,
        stock,
        tags,
        images
       }
       const newProduct=await Product.create(productObj)
       console.log(newProduct)
       res.status(201).json({success:true,product:newProduct})
    }
    catch(err)
    {
      return next(new ErrorHandler(err.message,500))
    }
}
//get All Seller Products
export const getAllSellerProducts=async(req,res,next)=>{
  try
  {
    const products=await Product.find({sellerId:req.params.id})
    res.status(200).json({products})
  }
  catch(err)
  {
    return next(new ErrorHandler(err.message,500))
  }
}
//Delete Product
export const deleteProduct=async(req,res,next)=>{
  try
  {
      await Product.deleteById(req.params.id)
      res.status(200).json({
        message:"Product deleted successfully"
      })
  }
  catch(err)
  {
    return next(new ErrorHandler(err.message,500))
  }
}
//get Product by category
export const getProductByCategory=async(req,res,next)=>{
  try
  {
    const products=await Product.find({category:req.params.category})
    res.status(200).json({products})
  }
  catch(err)
  {
    return next(new ErrorHandler(err.message,500))
  }
}