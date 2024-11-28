import { prisma } from "../lib/prisma";
import HomeScreen from "./home_screen";

export default async function HomePage() {
  const penduduk_list = await prisma.penduduk.findMany();

  return <HomeScreen penduduk_list={penduduk_list} />;
}
