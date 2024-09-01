import BgGradient from "@/components/common/bg-gradient";
import getDbConnection from "@/lib/db";
import { currentUser } from "@clerk/nextjs/server";
import { ArrowRight } from "lucide-react";
import Link from "next/link";
import { redirect } from "next/navigation";

export default async function Page() {
  const user = await currentUser();

  if (!user) {
    return redirect("/sign-in");
  }

  const sql = await getDbConnection();
  const posts = await sql`SELECT * from posts where user_id = ${user.id}`;

  return (
    <main className="mx-auto w-full max-w-screen-xl px-2.5 lg:px-0 mb-12 mt-28">
      <h2 className="text-2xl font-semibold text-gray-800 mb-2">
        Your posts ✍️
      </h2>

      {posts.length === 0 && (
        <div>
          <p className="text-gray-600 text-lg lg:text-xl mb-4 line-clamp-3">
            You have no posts yet. Upload a video or audio to get started.
          </p>
          <Link
            href={`/dashboard`}
            className="text-purple-600 hover:text-purple-800 font-medium flex gap-2 items-center"
          >
            Go to Dashboard <ArrowRight className="w-4 h-4" />
          </Link>
        </div>
      )}

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {posts.map((post) => (
          <BgGradient key={post.id}>
            <div className="bg-white shadow-md rounded-lg p-6 hover:shadow-lg transition-shadow duration-300">
              <h3 className="text-xl font-semibold text-gray-800 mb-2 truncate">
                {post.title}
              </h3>
              <p className="text-gray-600 text-sm mb-4 line-clamp-3">
                {post.content.split("\n").slice(1).join("\n")}
              </p>
              <Link
                href={`/posts/${post.id}`}
                className="text-purple-600 hover:text-purple-800 font-medium flex gap-1 items-center"
              >
                Read more <ArrowRight className="w-5 h-5 pt-1" />
              </Link>
            </div>
          </BgGradient>
        ))}
      </div>
    </main>
  );
}
