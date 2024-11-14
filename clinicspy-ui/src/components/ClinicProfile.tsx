"use client"; // Mark as a client-side component

import { Mail, Phone, MapPin, Clock, Star } from "lucide-react"; // Importing icons
import Image from "next/image"; // For handling the image
import Link from "next/link";
import girl from "../assets/girl.png"; // Replace with your actual image path

// disable eslint warning
/* eslint-disable */
const ClinicProfile = ({ places }: { places: any }) => {
  const averageRating =
    places && places[0]?.rating_history && places[0]?.rating_history
      ? places[0].rating_history.reduce(
          (acc: any, entry: any) => acc + entry.value,
          0
        ) / places[0].rating_history.length
      : 0;
  const ratingCounts = [5, 4, 3, 2, 1].map(
    (rating) =>
      places[0]?.rating_history?.filter(
        (entry: any) => Math.round(entry.value) === rating
      ).length || 0
  );

  // Calculate the total number of ratings
  const totalRatings =
    (Array.isArray(places) && places[0]?.rating_history?.length) || 0;

  return (
    <div className="bg-white container mx-auto shadow-sm rounded-lg px-6 flex flex-col md:flex-row gap-6">
      {/* Left section with details */}
      <div className="bg-white flex-1 lg:p-6 p-2">
        <h1 className="text-2xl font-bold mb-4">
          {Array.isArray(places) &&
            places[0]?.display_name &&
            places[0]?.display_name}
        </h1>

        {/* Address */}
        <div className="flex items-center mb-4">
          <MapPin className="text-primary w-5 h-5 mr-2" />
          <Link href="#" target="_blank" className="text-primary">
            Address
          </Link>
        </div>
        <p className="text-gray-500 mb-2">
          {Array.isArray(places) && places[0]?.address && places[0]?.address}
        </p>

        {/* Phone and Email */}
        <div className="flex flex-col md:flex-row gap-6">
          <div className="flex flex-col">
            <div className="flex items-center mb-4">
              <Phone className="text-primary w-5 h-5 mr-2" />
              <Link href="#" className="text-primary">
                Phone
              </Link>
            </div>
            <p className="text-gray-500 mb-4">
              {Array.isArray(places) && places[0]?.phone && places[0]?.phone}
            </p>
          </div>
          <div className="flex flex-col">
            <div className="flex items-center mb-4">
              <Mail className="text-primary w-5 h-5 mr-2" />
              <a href="#" className="text-primary">
                Email
              </a>
            </div>
            <p className=" text-muted mb-4">Not available</p>
          </div>
        </div>

        {/* Working Hours */}
        <div className="flex items-center mb-2">
          <Clock className="text-primary w-5 h-5 mr-2" />
          <Link href="#" className="text-primary ">
            Working Hours
          </Link>
        </div>
        <p className="text-gray-500 mb-2">
          Monday to Friday: 08:00 AM to 07:00 PM
        </p>
        {places[0]?.working_hours &&
          Object.entries(places[0]?.working_hours)?.map(([day, hours]) => (
            <p className="text-gray-500 mb-2" key={day}>
              {day}: {String(hours)}
            </p>
          ))}

        {/* Ratings and Reviews */}
        <div className="flex flex-col md:flex-row items-start md:items-center space-y-4 md:space-y-0 md:space-x-4">
          <div className="space-y-1">
            {/* Rating Bars */}
            {[5, 4, 3, 2, 1].map((rating, index) => {
              const percentage = totalRatings
                ? (ratingCounts[index] / totalRatings) * 100
                : 0;
              return (
                <div key={index} className="flex items-center space-x-2">
                  <span className="text-gray-500">{rating}</span>
                  <div className="bg-gray-300 h-2 rounded-full w-32">
                    <div
                      className="bg-yellow-500 h-2 rounded-full"
                      style={{ width: `${percentage}%` }}
                    ></div>
                  </div>
                </div>
              );
            })}
          </div>

          {/* Average Rating */}
          <div className="flex items-center">
            <span className="text-4xl font-bold">
              {averageRating.toFixed(1)}
            </span>
            <div className="ml-2 flex">
              {[...Array(5)].map((_, index) => {
                const fullStars = Math.floor(averageRating);
                const isHalfStar =
                  index === fullStars && averageRating % 1 !== 0;

                if (isHalfStar) {
                  return (
                    <div key={index} className="relative w-5 h-5">
                      <Star className="absolute w-5 h-5 text-yellow-400" />
                      <Star className="absolute w-5 h-5 text-gray-300 clip-half" />
                    </div>
                  );
                }

                return (
                  <Star
                    key={index}
                    className={`w-5 h-5 ${
                      index < fullStars
                        ? "fill-current text-yellow-400"
                        : "text-gray-300"
                    }`}
                  />
                );
              })}
            </div>
          </div>
        </div>

        <p className="text-gray-500 mt-1">
          {places[0]?.reviews && places[0]?.reviews} reviews
        </p>
      </div>

      {/* Right section with image */}
      <div className="flex-1 flex justify-center items-center">
        <Image
          src={places[0]?.photo ? places[0]?.photo : girl} // Replace with your actual image path
          width={600}
          height={600}
          alt="Cleveland Clinic"
          className="rounded-lg object-cover w-full h-auto md:h-96"
        />
      </div>
    </div>
  );
};

export default ClinicProfile;
