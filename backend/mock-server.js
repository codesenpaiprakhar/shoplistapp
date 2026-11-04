// Zero-dependency REST API server implementing the exact Spring Boot endpoints
// Runs directly with `node mock-server.js`
const http = require('http');

let categories = [
  { id: 1, name: 'Vegetable Shop', icon: 'Carrot', description: 'Fresh greens, onions, potatoes, tomatoes, herbs', displayOrder: 1 },
  { id: 2, name: 'Dairy & Milk Booth', icon: 'Milk', description: 'Milk pouches, curd, paneer, butter, cheese, eggs', displayOrder: 2 },
  { id: 3, name: 'Grocery Store / Kirana', icon: 'ShoppingBag', description: 'Rice, atta, dal, spices, cooking oils, sugar, tea', displayOrder: 3 },
  { id: 4, name: 'Fruit Shop', icon: 'Apple', description: 'Seasonal fresh fruits, bananas, apples, oranges', displayOrder: 4 },
  { id: 5, name: 'Bakery', icon: 'Wheat', description: 'Bread, buns, cookies, rusks, cakes', displayOrder: 5 },
  { id: 6, name: 'Meat & Fish Market', icon: 'Fish', description: 'Chicken, mutton, fish, seafood', displayOrder: 6 },
  { id: 7, name: 'Chemist & Personal Care', icon: 'HeartPulse', description: 'Toothpaste, soap, shampoo, basic first aid', displayOrder: 7 }
];

let activeList = {
  id: 1,
  name: 'Weekend Market Run',
  createdAt: new Date().toISOString(),
  status: 'ACTIVE'
};

let listItems = [
  { id: 1, listId: 1, itemName: 'Tomatoes', category: categories[0], plannedQuantity: 2, unit: 'kg', status: 'PENDING', estimatedPrice: 60, notes: 'Firm and red' },
  { id: 2, listId: 1, itemName: 'Onions', category: categories[0], plannedQuantity: 3, unit: 'kg', status: 'PENDING', estimatedPrice: 90, notes: 'Medium sized' },
  { id: 3, listId: 1, itemName: 'Full Cream Milk', category: categories[1], plannedQuantity: 2, unit: 'litre', status: 'PENDING', estimatedPrice: 130, notes: '2 packets of 1L' },
  { id: 4, listId: 1, itemName: 'Fresh Paneer', category: categories[1], plannedQuantity: 500, unit: 'g', status: 'PENDING', estimatedPrice: 200, notes: 'Soft cube' },
  { id: 5, listId: 1, itemName: 'Basmati Rice', category: categories[2], plannedQuantity: 5, unit: 'kg', status: 'PENDING', estimatedPrice: 450, notes: 'Royal brand' },
  { id: 6, listId: 1, itemName: 'Toor Dal', category: categories[2], plannedQuantity: 1, unit: 'kg', status: 'PENDING', estimatedPrice: 160, notes: 'Polished or unpolished' },
  { id: 7, listId: 1, itemName: 'Bananas', category: categories[3], plannedQuantity: 1, unit: 'dozen', status: 'PENDING', estimatedPrice: 60, notes: 'Slightly ripe' },
  { id: 8, listId: 1, itemName: 'Whole Wheat Bread', category: categories[4], plannedQuantity: 1, unit: 'packet', status: 'PENDING', estimatedPrice: 45, notes: 'Fresh bake' }
];

let nextItemId = 9;

function setCorsHeaders(res) {
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PUT, PATCH, DELETE, OPTIONS');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type, Authorization');
}

const server = http.createServer((req, res) => {
  setCorsHeaders(res);

  if (req.method === 'OPTIONS') {
    res.writeHead(204);
    res.end();
    return;
  }

  const url = new URL(req.url, `http://${req.headers.host}`);
  const pathname = url.pathname;

  // GET /api/categories
  if (req.method === 'GET' && pathname === '/api/categories') {
    res.writeHead(200, { 'Content-Type': 'application/json' });
    res.end(JSON.stringify(categories));
    return;
  }

  // GET /api/shopping-lists/active
  if (req.method === 'GET' && pathname === '/api/shopping-lists/active') {
    res.writeHead(200, { 'Content-Type': 'application/json' });
    res.end(JSON.stringify(activeList));
    return;
  }

  // GET /api/shopping-lists/:id/items
  const listItemsMatch = pathname.match(/^\/api\/shopping-lists\/(\d+)\/items$/);
  if (req.method === 'GET' && listItemsMatch) {
    const categoryId = url.searchParams.get('categoryId');
    let filtered = listItems;
    if (categoryId) {
      filtered = filtered.filter(item => item.category && item.category.id == categoryId);
    }
    res.writeHead(200, { 'Content-Type': 'application/json' });
    res.end(JSON.stringify(filtered));
    return;
  }

  // POST /api/shopping-lists/:id/items
  if (req.method === 'POST' && listItemsMatch) {
    let body = '';
    req.on('data', chunk => body += chunk);
    req.on('end', () => {
      try {
        const payload = JSON.parse(body);
        const category = categories.find(c => c.id == (payload.category?.id || payload.categoryId)) || categories[0];
        const newItem = {
          id: nextItemId++,
          listId: Number(listItemsMatch[1]),
          itemName: payload.itemName,
          category: category,
          plannedQuantity: Number(payload.plannedQuantity) || 1,
          receivedQuantity: null,
          unit: payload.unit || 'piece',
          status: 'PENDING',
          estimatedPrice: Number(payload.estimatedPrice) || 0,
          actualPrice: 0,
          notes: payload.notes || ''
        };
        listItems.push(newItem);
        res.writeHead(201, { 'Content-Type': 'application/json' });
        res.end(JSON.stringify(newItem));
      } catch (err) {
        res.writeHead(400, { 'Content-Type': 'application/json' });
        res.end(JSON.stringify({ error: err.message }));
      }
    });
    return;
  }

  // PATCH /api/shopping-lists/items/:itemId/status
  const patchStatusMatch = pathname.match(/^\/api\/shopping-lists\/items\/(\d+)\/status$/);
  if (req.method === 'PATCH' && patchStatusMatch) {
    const itemId = Number(patchStatusMatch[1]);
    let body = '';
    req.on('data', chunk => body += chunk);
    req.on('end', () => {
      try {
        const payload = JSON.parse(body);
        const item = listItems.find(i => i.id === itemId);
        if (!item) {
          res.writeHead(404, { 'Content-Type': 'application/json' });
          res.end(JSON.stringify({ error: 'Item not found' }));
          return;
        }
        item.status = payload.status || item.status;
        if (payload.receivedQuantity !== undefined) {
          item.receivedQuantity = payload.receivedQuantity;
        } else if (item.status === 'PURCHASED' && item.receivedQuantity == null) {
          item.receivedQuantity = item.plannedQuantity;
        }
        res.writeHead(200, { 'Content-Type': 'application/json' });
        res.end(JSON.stringify(item));
      } catch (err) {
        res.writeHead(400, { 'Content-Type': 'application/json' });
        res.end(JSON.stringify({ error: err.message }));
      }
    });
    return;
  }

  // DELETE /api/shopping-lists/items/:itemId
  const deleteItemMatch = pathname.match(/^\/api\/shopping-lists\/items\/(\d+)$/);
  if (req.method === 'DELETE' && deleteItemMatch) {
    const itemId = Number(deleteItemMatch[1]);
    listItems = listItems.filter(i => i.id !== itemId);
    res.writeHead(204);
    res.end();
    return;
  }

  // DELETE /api/shopping-lists/:id/clear-purchased
  const clearMatch = pathname.match(/^\/api\/shopping-lists\/(\d+)\/clear-purchased$/);
  if (req.method === 'DELETE' && clearMatch) {
    listItems = listItems.filter(i => i.status !== 'PURCHASED');
    res.writeHead(204);
    res.end();
    return;
  }

  res.writeHead(404, { 'Content-Type': 'application/json' });
  res.end(JSON.stringify({ error: 'Not Found' }));
});

const PORT = 8080;
server.listen(PORT, () => {
  console.log(`[ShopList API Mock Server] running on http://localhost:${PORT}`);
  console.log(`Endpoints available:`);
  console.log(`- GET  /api/categories`);
  console.log(`- GET  /api/shopping-lists/active`);
  console.log(`- GET  /api/shopping-lists/1/items`);
  console.log(`- POST /api/shopping-lists/1/items`);
  console.log(`- PATCH /api/shopping-lists/items/:id/status`);
  console.log(`- DELETE /api/shopping-lists/items/:id`);
  console.log(`- DELETE /api/shopping-lists/1/clear-purchased`);
});
