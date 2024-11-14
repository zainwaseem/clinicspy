import React from "react";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import Link from "next/link";
import facbookIcon from "@/assets/svgs/facebook.svg";
import instagramIcon from "@/assets/svgs/instagram.svg";
import twitterIcon from "@/assets/svgs/twitter.svg";
import linkedinIcon from "@/assets/svgs/linkedin.svg";
import youtubeIcon from "@/assets/svgs/youtube.svg";
import Image from "next/image";

// disable eslint warning
/* eslint-disable */
const Analytics = ({ data, platform }: { data?: any; platform?: string }) => {
  return (
    <section className="container mx-auto px-4 py-8">
      {/* Heading Section */}
      <div className="flex flex-col md:flex-row items-start md:items-center space-y-4 md:space-y-0 md:space-x-2 mb-6">
        <h2 className="text-xl font-semibold flex items-center gap-2">
          {platform === "Facebook" && (
            <Image src={facbookIcon} alt="Facebook" width={32} height={32} />
          )}
          {platform === "Instagram" && (
            <Image src={instagramIcon} alt="Instagram" width={32} height={32} />
          )}
          {platform === "Twitter" && (
            <Image src={twitterIcon} alt="Twitter" width={32} height={32} />
          )}
          {platform === "YouTube" && (
            <Image src={youtubeIcon} alt="YouTube" width={32} height={32} />
          )}
          {platform === "LinkedIn" && (
            <Image src={linkedinIcon} alt="LinkedIn" width={32} height={32} />
          )}{" "}
          Integrated {platform} Account –{" "}
          {(data?.name && data?.name) ||
            data?.username ||
            data?.title ||
            data?.headline}
        </h2>
        {(data?.link || data?.query || data?.channel_url || data?.url) && (
          <a
            href={
              (data?.link ||
                data?.query ||
                data?.channel_url ||
                data?.url) as string
            }
            target="_blank"
            className="text-primary hover:underline min-w-52 max-w-60  truncate"
          >
            {(data?.link && data?.link) ||
              data?.query ||
              data?.channel_url ||
              data?.url}
          </a>
        )}
      </div>

      {/* Profile Summary */}
      <div className="mb-6 py-4 border-b border-gray-200">
        <h3 className="text-lg font-semibold">
          {data?.name || data?.industries || data?.title}
        </h3>
        <p className="text-gray-500">{data?.about || data?.description}</p>
        <p className="text-gray-500">
          {data?.address ||
            (Array.isArray(data?.locations) && data?.locations[0])}
        </p>
      </div>

      {/* Example Stats (followers, likes, etc.) */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-6 p-4 rounded-lg mb-6">
        {(data?.followers || data?.edge_follow) > 0 && (
          <div className="text-center">
            <p className="text-gray-500">Followers</p>
            <p className="text-xl font-semibold">
              {data?.followers || data?.edge_follow}
            </p>
          </div>
        )}
        {(data?.followings || data?.edge_followed_by) > 0 && (
          <div className="text-center">
            <p className="text-gray-500">Following</p>
            <p className="text-xl font-semibold">
              {data?.followings || data?.edge_followed_by}
            </p>
          </div>
        )}{" "}
        {(data?.edge_owner_to_timeline_media_count || data?.videos_count) >
          0 && (
          <div className="text-center">
            <p className="text-gray-500">Posts</p>
            <p className="text-xl font-semibold">
              {data?.edge_owner_to_timeline_media_count || data?.videos_count}
            </p>
          </div>
        )}
        {data?.likes > 0 && (
          <div className="text-center">
            <p className="text-gray-500">Likes</p>
            <p className="text-xl font-semibold">{data?.likes}</p>
          </div>
        )}
        {data?.subscribers_count > 0 && (
          <div className="text-center">
            <p className="text-gray-500">Subscribers</p>
            <p className="text-xl font-semibold">{data?.subscribers_count}</p>
          </div>
        )}
        {data?.views_count > 0 && (
          <div className="text-center">
            <p className="text-gray-500">Views</p>
            <p className="text-xl font-semibold">{data?.views_count}</p>
          </div>
        )}{" "}
        {data?.size > 0 && (
          <div className="text-center">
            <p className="text-gray-500">Size</p>
            <p className="text-xl font-semibold">{data?.size}</p>
          </div>
        )}
        {/* Add more data fields as needed */}
      </div>

      {/* Example Table for recent posts (if available) */}
      {platform === "Facebook" && (
        <div className="overflow-x-auto">
          <Table className="min-w-full bg-white shadow-lg rounded-lg">
            <TableHeader className="bg-[#304FFE14]">
              <TableRow>
                <TableHead className="text-gray-500 font-semibold">
                  No
                </TableHead>
                <TableHead className="text-gray-500 font-semibold">
                  Post Url
                </TableHead>
                <TableHead className="text-gray-500 font-semibold">
                  Likes
                </TableHead>
                <TableHead className="text-gray-500 font-semibold">
                  Comments
                </TableHead>
                {/* Add more headers as needed */}
              </TableRow>
            </TableHeader>
            <TableBody>
              {data?.recent_posts &&
                data?.recent_posts?.map((post: any, index: number) => (
                  <TableRow key={index} className="hover:bg-gray-100">
                    <TableCell className="py-4">{index + 1}</TableCell>
                    <TableCell className="py-4">
                      <a
                        href={post.url}
                        target="_blank"
                        className="text-primary hover:underline"
                      >
                        {post.url}
                      </a>
                    </TableCell>
                    <TableCell className="py-4">{post?.likes}</TableCell>
                    <TableCell className="py-4">{post?.comments}</TableCell>
                    {/* Add more columns as needed */}
                  </TableRow>
                ))}
            </TableBody>
          </Table>
        </div>
      )}
      {platform === "Instagram" && (
        <div className="overflow-x-auto">
          <Table className="min-w-full bg-white shadow-lg rounded-lg">
            <TableHeader className="bg-[#304FFE14]">
              <TableRow>
                <TableHead className="text-gray-500 font-semibold">
                  No
                </TableHead>
                <TableHead className="text-gray-500 font-semibold">
                  Post Url
                </TableHead>
                <TableHead className="text-gray-500 font-semibold">
                  Likes
                </TableHead>
                <TableHead className="text-gray-500 font-semibold">
                  Comments
                </TableHead>
                <TableHead className="text-gray-500 font-semibold">
                  Views
                </TableHead>
                {/* Add more headers as needed */}
              </TableRow>
            </TableHeader>
            <TableBody>
              {data?.edge_owner_to_timeline_media?.edges &&
                data?.edge_owner_to_timeline_media?.edges?.map(
                  (post: any, index: number) => (
                    <TableRow key={index} className="hover:bg-gray-100">
                      <TableCell className="py-4">{index + 1}</TableCell>
                      <TableCell className="py-4 truncate min-w-40 max-w-44">
                        <a
                          href={
                            post?.node?.display_url && post?.node?.display_url
                          }
                          target="_blank"
                          className="text-primary text-start hover:underline truncate min-w-36 max-w-40"
                        >
                          {post?.node?.display_url && post?.node?.display_url}
                        </a>
                      </TableCell>
                      <TableCell className="py-4">
                        {post?.node?.edge_liked_by?.count &&
                          post?.node?.edge_liked_by?.count}
                      </TableCell>
                      <TableCell className="py-4">
                        {post?.node?.edge_media_to_comment?.count &&
                          post?.node?.edge_media_to_comment?.count}
                      </TableCell>
                      <TableCell className="py-4">
                        {post?.node?.video_view_count &&
                          post?.node?.video_view_count}
                      </TableCell>
                      {/* Add more columns as needed */}
                    </TableRow>
                  )
                )}
            </TableBody>
          </Table>
        </div>
      )}
      {platform === "YouTube" && (
        <div className="overflow-x-auto">
          <Table className="min-w-full bg-white shadow-lg rounded-lg">
            <TableHeader className="bg-[#304FFE14]">
              <TableRow>
                <TableHead className="text-gray-500 font-semibold">
                  No
                </TableHead>
                <TableHead className="text-gray-500 font-semibold">
                  Post Url
                </TableHead>
                <TableHead className="text-gray-500 font-semibold">
                  Likes
                </TableHead>
                <TableHead className="text-gray-500 font-semibold">
                  Comments
                </TableHead>
                <TableHead className="text-gray-500 font-semibold">
                  Views
                </TableHead>
                {/* Add more headers as needed */}
              </TableRow>
            </TableHeader>
            <TableBody>
              {data?.edge_owner_to_timeline_media?.edges &&
                data?.edge_owner_to_timeline_media?.edges?.map(
                  (post: any, index: number) => (
                    <TableRow key={index} className="hover:bg-gray-100">
                      <TableCell className="py-4">{index + 1}</TableCell>
                      <TableCell className="py-4 truncate min-w-40 max-w-44">
                        <Link
                          href="#"
                          // href={
                          //   post?.node?.display_url && post?.node?.display_url
                          // }
                          target="_blank"
                          className="text-primary text-start hover:underline truncate min-w-36 max-w-40"
                        >
                          {post?.node?.display_url && post?.node?.display_url}
                        </Link>
                      </TableCell>
                      <TableCell className="py-4">
                        {post?.node?.edge_liked_by?.count &&
                          post?.node?.edge_liked_by?.count}
                      </TableCell>
                      <TableCell className="py-4">
                        {post?.node?.edge_media_to_comment?.count &&
                          post?.node?.edge_media_to_comment?.count}
                      </TableCell>
                      <TableCell className="py-4">
                        {post?.node?.video_view_count &&
                          post?.node?.video_view_count}
                      </TableCell>
                      {/* Add more columns as needed */}
                    </TableRow>
                  )
                )}
            </TableBody>
          </Table>
        </div>
      )}
    </section>
  );
};

export default Analytics;
