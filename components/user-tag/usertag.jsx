import { useSession } from "next-auth/react";
import Image from "next/image";

const UserTag = () => {
  const { data: session } = useSession();

  return (
    session && (
      <div className="flex mt-10 gap-5">
        <div>
          <Image
            src={session?.user.image}
            width={50}
            height={50}
            alt="user-profile"
            className="rounded-full"
          />
        </div>
        <div>
          <h3>{session?.user?.name}</h3>
          <h3>{session?.user?.email}</h3>
        </div>
      </div>
    )
  );
};

export default UserTag;
