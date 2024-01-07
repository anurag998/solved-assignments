/*
  Implement a function `calculateTotalSpentByCategory` which takes a list of transactions as parameter
  and return a list of objects where each object is unique category-wise and has total price spent as its value.
  transactions is an array where each
  Transaction - an object like 
        {
		id: 1,
		timestamp: 1656076800000,
		price: 10,
		category: 'Food',
		itemName: 'Pizza',
	}
  Output - [{ category: 'Food', totalSpent: 10 }] // Can have multiple categories, only one example is mentioned here
*/

// const transactions = [{
//   id: 1,
//   timestamp: 1656076800000,
//   price: 10,
//   category: 'Food',
//   itemName: 'Pizza',
// }];

function calculateTotalSpentByCategory(transactions) {
  const categoryWise = new Map();
  for(objs of transactions)
  {
    if(categoryWise.has(objs.category))
    {
      let totalPrice = categoryWise.get(objs.category);
      totalPrice += objs.price;
      categoryWise.set(objs.category, totalPrice);
    }
    else{
      categoryWise.set(objs.category, objs.price);
    }
  }

  const ans = [];

  for(const [key, value] of categoryWise)
  {
    // console.log(key, value);
    const currObj = {
      category: key,
      totalSpent: value
    }
    ans.push(currObj);
  }

  return ans;
}

// console.log(calculateTotalSpentByCategory(transactions));

module.exports = calculateTotalSpentByCategory;
