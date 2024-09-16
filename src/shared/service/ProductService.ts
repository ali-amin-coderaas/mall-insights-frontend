export interface Product {
	id: string;
	code: string;
	name: string;
	description: string;
	image: string;
	price: number;
	category: string;
	quantity: number;
	inventoryStatus: string;
	rating: number;
}

export class ProductService {
	getProducts() {
		return new Promise<Product[]>((resolve) => {
			const products: Product[] = [
				{
					id: "1000",
					code: "f230fh0g3",
					name: "Bamboo Watch",
					description: "Product Description",
					image: "bamboo-watch.jpg",
					price: 65,
					category: "Accessories",
					quantity: 24,
					inventoryStatus: "INSTOCK",
					rating: 5,
				},
				{
					id: "1001",
					code: "nvklal433",
					name: "Black Watch",
					description: "Product Description",
					image: "black-watch.jpg",
					price: 72,
					category: "Accessories",
					quantity: 61,
					inventoryStatus: "LOWSTOCK",
					rating: 4,
				},
				{
					id: "1002",
					code: "zz21cz3c1",
					name: "Blue Band",
					description: "Product Description",
					image: "blue-band.jpg",
					price: 79,
					category: "Fitness",
					quantity: 2,
					inventoryStatus: "OUTOFSTOCK",
					rating: 3,
				},
				// Add more product data as needed
			];

			setTimeout(() => {
				resolve(products);
			}, 1000); // Simulate a network delay of 1 second
		});
	}
}
