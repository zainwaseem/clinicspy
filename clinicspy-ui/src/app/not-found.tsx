import Image from "next/image";
import notFound from "@/assets/notfound.jpg";
import Link from "next/link";
import { Button } from "@/components/ui/button";

const NotFoundPound = () => {
  return (
    <div className="flex justify-center items-center h-[calc(100vh-64px)] w-full flex-col gap-10">
      <Image src={notFound} alt="Page Not Found" height={500} width={500} />
      <Link href={"/"} prefetch={false}>
        <Button>Go Back</Button>
      </Link>
    </div>
  );
};

export default NotFoundPound;
