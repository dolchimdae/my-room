import Link from "next/link";
import Image from "next/image";

export default function Header() {
  return (
    <div className="space-y-12 max-w-6xl mx-auto">
      <section className="pt-12">
        <div className="flex justify-between">
          <h1 className="text-3xl font-semibold text-gray-900  my-4 ">
            dolchimdae의 방
          </h1>
          <div className="flex gap-4 justify-center items-center">
            <Link
              href="/blog"
              className="h-fit text-lg bg-[#F4B083] text-white px-4 py-2 rounded-lg hover:bg-[#EF904F] transition-colors"
            >
              TIL 둘러보기
            </Link>
            {/* <Link
            href="/tools"
            className="bg-gray-100 text-gray-900 px-6 py-3 rounded-lg hover:bg-gray-200 transition-colors"
          >
                도구 사용하기
              </Link> */}
          </div>
        </div>
      </section>
      <div className="flex items-center">
        <Image
          src="https://avatars.githubusercontent.com/u/93670105?v=4"
          alt="logo"
          width={160}
          height={160}
          className="rounded-full"
        />
        <div className="mt-20 w-full h-fit overflow-hidden whitespace-nowrap bg-black text-white text-lg">
          <div className="inline-block animate-marquee">
            📢 안녕하세요? 제 홈피에 방문🎇 감사합니다. 현재 공사중🔨 입니다...
            빠른 시일 내로 공사가 완료할 수 있도록 🐬 최선을 다하겠습니다...
            좋은 하루 되세요...🍀 Have a nice and beautiful day...👽
          </div>
        </div>
      </div>
    </div>
  );
}
