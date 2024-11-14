"use client"; // Add this line at the top to ensure it's treated as a client component
import facebookIcon from "@/assets/svgs/facebook.svg";
import instagramIcon from "@/assets/svgs/instagram.svg";
import linkedinIcon from "@/assets/svgs/linkedin.svg";

import Image from "next/image";
// disable eslint warning
/* eslint-disable */
const SocialMediaStats = ({
  facebook,
  instagram,
  youtube,
  linkedin,
  twitter,
}: any) => {
  // const stats = [
  //   {
  //     icon: <ThumbsUp size={32} className="text-primary" />,
  //     label: "Facebook Shares",
  //     value: 26,
  //   },
  //   {
  //     icon: <ThumbsUp size={32} className="text-blue-400" />,
  //     label: "Facebook Reactions",
  //     value: 32,
  //   },
  //   {
  //     icon: <ThumbsUp size={32} className="text-red-600" />,
  //     label: "Pinterest Pins",
  //     value: "02",
  //   },
  // ];

  return (
    <div className="container mx-auto bg-white  py-10 my-3 p-6">
      <div className="flex justify-between items-center lg:flex-row flex-col lg:space-y-2 space-y-10">
        {/* facebook shares */}
        <div className="flex flex-col items-center space-y-2 text-center">
          <Image src={facebookIcon} alt="Facebook" width={32} height={32} />

          <span className="text-gray-500">Facebook Followers</span>
          {facebook?.followers && (
            <span className="text-lg font-semibold">{facebook?.followers}</span>
          )}
        </div>{" "}
        <div className="flex flex-col items-center space-y-2 text-center">
          <Image src={facebookIcon} alt="Facebook" width={32} height={32} />

          <span className="text-gray-500">Facebook Likes</span>
          {facebook?.followers && (
            <span className="text-lg font-semibold">{facebook?.likes}</span>
          )}
        </div>{" "}
        {/* instagram pins */}
        <div className="flex flex-col items-center space-y-2 text-center">
          <Image src={instagramIcon} alt="Facebook" width={32} height={32} />

          <span className="text-gray-500">Instagram Followers</span>
          {instagram?.edge_followed_by ? (
            <span className="text-lg font-semibold">
              {instagram?.edge_followed_by}
            </span>
          ) : (
            <span className="text-lg font-semibold">None found</span>
          )}
        </div>{" "}
        <div className="flex flex-col items-center space-y-2 text-center">
          <Image src={linkedinIcon} alt="Facebook" width={32} height={32} />

          <span className="text-gray-500">Linkedin Company</span>
          {linkedin?.size ? (
            <span className="text-lg font-semibold">{linkedin?.size}</span>
          ) : (
            <span className="text-lg font-semibold">None found</span>
          )}
        </div>
      </div>
    </div>
  );
};

export default SocialMediaStats;
