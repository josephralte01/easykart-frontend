const mongoose = require('mongoose');
const axios = require('axios');
require('dotenv').config({ path: '../backend/.env' });

// Import Product model
const Product = require('../backend/models/Product');

// Categories mapping for better organization
const categoryMapping = {
  'grocery': 'groceries',
  'food': 'groceries',
  'personal care': 'personal-care',
  'beauty': 'personal-care',
  'household': 'household',
  'cleaning': 'household',
  'health': 'health',
  'medicine': 'health',
  'beverage': 'beverages',
  'drink': 'beverages',
  'snack': 'snacks',
  'dairy': 'dairy',
  'fruit': 'fruits-vegetables',
  'vegetable': 'fruits-vegetables'
};

// Placeholder images for different categories
const placeholderImages = {
  'groceries': 'https://images.pexels.com/photos/264636/pexels-photo-264636.jpeg?auto=compress&cs=tinysrgb&w=400',
  'personal-care': 'https://images.pexels.com/photos/3785147/pexels-photo-3785147.jpeg?auto=compress&cs=tinysrgb&w=400',
  'household': 'https://images.pexels.com/photos/4239091/pexels-photo-4239091.jpeg?auto=compress&cs=tinysrgb&w=400',
  'health': 'https://images.pexels.com/photos/3683107/pexels-photo-3683107.jpeg?auto=compress&cs=tinysrgb&w=400',
  'beverages': 'https://images.pexels.com/photos/544961/pexels-photo-544961.jpeg?auto=compress&cs=tinysrgb&w=400',
  'snacks': 'https://images.pexels.com/photos/1640777/pexels-photo-1640777.jpeg?auto=compress&cs=tinysrgb&w=400',
  'dairy': 'https://images.pexels.com/photos/236010/pexels-photo-236010.jpeg?auto=compress&cs=tinysrgb&w=400',
  'fruits-vegetables': 'https://images.pexels.com/photos/1300972/pexels-photo-1300972.jpeg?auto=compress&cs=tinysrgb&w=400'
};

// Sample products data (fallback if API fails)
const sampleProducts = [
  {
    name: 'Basmati Rice 1kg',
    description: 'Premium quality basmati rice, perfect for daily meals',
    price: 120,
    category: 'groceries',
    featured: true
  },
  {
    name: 'Whole Wheat Flour 1kg',
    description: 'Fresh whole wheat flour for healthy rotis and bread',
    price: 45,
    category: 'groceries'
  },
  {
    name: 'Toor Dal 500g',
    description: 'High quality toor dal, rich in protein',
    price: 85,
    category: 'groceries'
  },
  {
    name: 'Sunflower Oil 1L',
    description: 'Pure sunflower cooking oil for healthy cooking',
    price: 140,
    category: 'groceries',
    featured: true
  },
  {
    name: 'Himalaya Face Wash',
    description: 'Gentle face wash for all skin types',
    price: 95,
    category: 'personal-care'
  },
  {
    name: 'Colgate Toothpaste',
    description: 'Advanced whitening toothpaste for healthy teeth',
    price: 65,
    category: 'personal-care'
  },
  {
    name: 'Head & Shoulders Shampoo',
    description: 'Anti-dandruff shampoo for healthy scalp',
    price: 180,
    category: 'personal-care',
    featured: true
  },
  {
    name: 'Dettol Hand Sanitizer',
    description: 'Kills 99.9% germs, alcohol based sanitizer',
    price: 45,
    category: 'health'
  },
  {
    name: 'Surf Excel Detergent',
    description: 'Powerful stain removal detergent powder',
    price: 220,
    category: 'household'
  },
  {
    name: 'Vim Dishwash Liquid',
    description: 'Effective dishwashing liquid with lemon fragrance',
    price: 75,
    category: 'household'
  },
  {
    name: 'Harpic Toilet Cleaner',
    description: 'Powerful toilet bowl cleaner and disinfectant',
    price: 110,
    category: 'household'
  },
  {
    name: 'Coca Cola 600ml',
    description: 'Refreshing cola drink, chilled and ready to serve',
    price: 35,
    category: 'beverages'
  },
  {
    name: 'Amul Fresh Milk 1L',
    description: 'Fresh full cream milk, rich in calcium',
    price: 55,
    category: 'dairy',
    featured: true
  },
  {
    name: 'Amul Butter 100g',
    description: 'Creamy and delicious butter for bread and cooking',
    price: 50,
    category: 'dairy'
  },
  {
    name: 'Britannia Good Day Cookies',
    description: 'Crunchy and tasty cookies for tea time',
    price: 25,
    category: 'snacks'
  },
  {
    name: 'Lay\'s Potato Chips',
    description: 'Crispy potato chips with classic salted flavor',
    price: 20,
    category: 'snacks'
  },
  {
    name: 'Fresh Bananas 1kg',
    description: 'Fresh and ripe bananas, rich in potassium',
    price: 60,
    category: 'fruits-vegetables'
  },
  {
    name: 'Fresh Tomatoes 1kg',
    description: 'Fresh red tomatoes, perfect for cooking',
    price: 40,
    category: 'fruits-vegetables'
  },
  {
    name: 'Fresh Onions 1kg',
    description: 'Fresh onions, essential for Indian cooking',
    price: 35,
    category: 'fruits-vegetables'
  },
  {
    name: 'Green Tea Bags',
    description: 'Healthy green tea bags for daily wellness',
    price: 150,
    category: 'beverages',
    featured: true
  }
];

async function fetchProductsFromAPI() {
  try {
    console.log('Attempting to fetch products from vedalex.in...');
    
    // Try to fetch from the API
    const response = await axios.get('https://vedalex.in/api/products', {
      timeout: 10000,
      headers: {
        'User-Agent': 'EasyKart-ProductFetcher/1.0'
      }
    });
    
    if (response.data && Array.isArray(response.data)) {
      console.log(`Fetched ${response.data.length} products from API`);
      return response.data.slice(0, 200); // Limit to 200 products
    }
  } catch (error) {
    console.log('API fetch failed:', error.message);
  }
  
  console.log('Using sample products as fallback...');
  return sampleProducts;
}

function mapCategory(originalCategory) {
  if (!originalCategory) return 'groceries';
  
  const category = originalCategory.toLowerCase();
  for (const [key, value] of Object.entries(categoryMapping)) {
    if (category.includes(key)) {
      return value;
    }
  }
  return 'groceries';
}

function generateProducts(apiProducts) {
  const products = [];
  
  // Process API products or use sample data
  apiProducts.forEach((item, index) => {
    const category = mapCategory(item.category || 'grocery');
    
    const product = {
      name: item.name || item.title || `Product ${index + 1}`,
      description: item.description || `High quality ${item.name || 'product'} for daily use`,
      price: item.price || Math.floor(Math.random() * 200) + 20,
      image: item.image || placeholderImages[category],
      category: category,
      featured: Math.random() < 0.2, // 20% chance of being featured
      inStock: true
    };
    
    products.push(product);
  });
  
  // If we have less than 50 products, generate more using variations
  while (products.length < 200) {
    const baseProduct = sampleProducts[Math.floor(Math.random() * sampleProducts.length)];
    const variations = [
      '500g', '1kg', '2kg', '250ml', '500ml', '1L',
      'Small', 'Medium', 'Large', 'Family Pack',
      'Premium', 'Regular', 'Economy'
    ];
    
    const variation = variations[Math.floor(Math.random() * variations.length)];
    
    products.push({
      name: `${baseProduct.name} ${variation}`,
      description: baseProduct.description,
      price: baseProduct.price + Math.floor(Math.random() * 50) - 25,
      image: placeholderImages[baseProduct.category],
      category: baseProduct.category,
      featured: Math.random() < 0.15,
      inStock: true
    });
  }
  
  return products.slice(0, 200);
}

async function seedProducts() {
  try {
    // Connect to MongoDB
    await mongoose.connect(process.env.MONGODB_URI || 'mongodb://localhost:27017/easykart');
    console.log('Connected to MongoDB');
    
    // Clear existing products
    await Product.deleteMany({});
    console.log('Cleared existing products');
    
    // Fetch products from API or use sample data
    const apiProducts = await fetchProductsFromAPI();
    
    // Generate product data
    const products = generateProducts(apiProducts);
    
    // Insert products
    await Product.insertMany(products);
    console.log(`Successfully seeded ${products.length} products`);
    
    // Show category breakdown
    const categoryStats = await Product.aggregate([
      { $group: { _id: '$category', count: { $sum: 1 } } },
      { $sort: { count: -1 } }
    ]);
    
    console.log('\nCategory breakdown:');
    categoryStats.forEach(stat => {
      console.log(`${stat._id}: ${stat.count} products`);
    });
    
    const featuredCount = await Product.countDocuments({ featured: true });
    console.log(`\nFeatured products: ${featuredCount}`);
    
  } catch (error) {
    console.error('Error seeding products:', error);
  } finally {
    await mongoose.connection.close();
    console.log('Database connection closed');
  }
}

// Run the script
if (require.main === module) {
  seedProducts();
}

module.exports = { seedProducts };