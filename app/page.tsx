import Link from "next/link";
import AuthModal from "./(auth)/components/AuthModal";
import BackgroundSlider from "./(auth)/components/BackgroundSlider";
export default function Home() {
  return (
    <div className="h-screen w-full relative flex flex-col items-center justify-between">
      <BackgroundSlider />
      <div className="relative z-10 flex flex-col items-center justify-center flex-1 px-4 text-white">
        <span className="text-4xl font-pacifico mb-12">Taegram</span>

        <span className="text-xl font-bold mb-4">
          2,283,922명의 사람들이 태글램을 탈퇴했어요
        </span>

        <p className="text-center text-lg mb-4 max-w-md text-gray-200">
          태글램 3개월차, 드디어 마음에 드는 분을 만나 태글램을 삭제합니다.
          이번에는 정말 평생 삭제할 수 있으면 좋겠네요
        </p>

        <p className="text-gray-300">이○○, 25</p>
      </div>

      <div className="relative z-10 w-full p-2 space-y-3 max-w-md mx-auto ">
        <Link href="/signUp">
          <button className="w-full bg-sky-400 hover:bg-sky-500 transition-colors text-white py-3 rounded-lg font-medium">
            전화번호로 계속하기
          </button>
        </Link>
      </div>

      <AuthModal />
    </div>
  );
}
