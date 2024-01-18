import { trpc } from '@web/app/trpc';

export const revalidate = 1;
export default async function Home() {
	const products = await trpc.products.getProducts.query();
	return (
		<div>
			{products.map((p) => {
				return <div key={p.id}>{p.name}</div>;
			})}
		</div>
	);
}
