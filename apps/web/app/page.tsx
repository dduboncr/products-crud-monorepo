import { trpc } from '@web/app/trpc';

export default async function Home() {
	const { greeting } = await trpc.world.query({});
	return <div>{greeting}</div>;
}
