import Image from "next/image";

const UserInfo = ({ userInfo }) => {
  console.log(userInfo);
  return (
    <div className="flex flex-col items-center gap-3 mt-10">
      <div>
        <Image
          src={userInfo.image}
          width={100}
          height={100}
          alt="user-profile-photo"
          className="rounded-full"
        />
      </div>
      <div>
        <h3>{userInfo.name}</h3>
      </div>
      <div>
        <h5 className="text-gray-500">{userInfo.email}</h5>
      </div>
      <div>
        <button className="btn">Share</button>
      </div>
    </div>
  );
};

export default UserInfo;
