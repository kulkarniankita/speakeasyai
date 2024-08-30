import BgGradient from "@/components/common/bg-gradient";
import { SignUp } from "@clerk/nextjs";

export default function Page() {
  return (
    <section className="flex justify-center items-center py-16">
      <BgGradient>
        <SignUp />
      </BgGradient>
    </section>
  );
}
