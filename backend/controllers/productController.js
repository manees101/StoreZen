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