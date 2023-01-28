import Link from "next/link";
import { usePathname } from "next/navigation";
import { FiMenu } from "react-icons/fi";
import { ImSwitch } from "react-icons/im";
import { useFetchUser } from "../../../hooks/useFetchUser";
import { SkeletonCircle } from "../../skeleton/Skeleton";
import { auth } from "../../../firebase";
import { signOut } from "firebase/auth";
import { useRouter } from "next/router";
import MobileSideNav from "../side-nav/mobile-sidenav";
import { useState } from "react";

const Header = () => {
  const pathname = usePathname();
  const header = pathname?.split("/")[1];
  const { loading, userState: user }: any = useFetchUser();
  const router = useRouter();
  const [hide, setHide] = useState(true);

  const logOut = () => {
    signOut(auth);
    router.push("/");
  };

  return (
    <>
      <div className="p-3 bg-card">
        {/* parent div */}
        <div className="flex justify-between items-center ">
          {/* flex item child */}
          <div className="flex items-center w-[90%] text-2xl font-bold font-sec text-paper py-2 capitalize">
            {header}
          </div>
          {/* icons div */}
          <div className="flex items-center flex-1 gap-4">
            {loading && <SkeletonCircle height={40} width={40} />}
            {!loading && (
              <Link
                href="/account-profile"
                className=" hidden md:flex uppercase text-bg font-semibold cursor-pointer text-xl font-sec bg-[#e9e9e9] p-2  items-center justify-center rounded-full"
              >
                {user?.Name?.slice(0, 2)}
              </Link>
            )}

            <div>
              <ImSwitch
                className="fill-text_main text-xl cursor-pointer"
                onClick={logOut}
              />
            </div>
            <div className="block md:hidden">
              <FiMenu
                className="text-paper text-2xl cursor-pointer"
                onClick={() => setHide(false)}
              />
            </div>
          </div>
        </div>
      </div>
      <MobileSideNav hide={hide} setHide={setHide} />
    </>
  );
};

export default Header;