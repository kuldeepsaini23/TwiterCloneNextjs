import TwitterLayout from "@/components/Layout/TwitterLayout";
import TweetMainComponent from "@/components/core/Home/TweetMainComponent";



export default function Home() {
  

  return (
    <main className="">
      <TwitterLayout>
        <TweetMainComponent/>
      </TwitterLayout>
    </main>
  );
}
