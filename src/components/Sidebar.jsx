import { getUserProfileApi, getUserPostsApi } from "../apis/Api";
import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";

const Sidebar = ({ user }) => {
  const userId = JSON.parse(localStorage.getItem("user"))._id;

  const [userDetails, setUserDetails] = useState({});

  const [posts, setPosts] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchUserPosts = async () => {
      try {
        const response = await getUserPostsApi(userId);
        setPosts(response.data.posts);
      } catch (error) {
        console.error("Error fetching user posts:", error);
        // toast.error('Failed to fetch posts');
      } finally {
        setLoading(false);
      }
    };

    fetchUserPosts();
  }, [userId]);

  useEffect(() => {
    const fetchUserProfile = async () => {
      try {
        const response = await getUserProfileApi(userId);
        if (response.data.success) {
          setUserDetails(response.data.user);
        }
      } catch (error) {
        console.error("Error fetching user profile:", error);
      }
    };

    fetchUserProfile();
  }, [userId]);

  return (
    <div className="flex sticky flex-col justify-between border-e border-geda bg-geda2">
      <div className="px-6 py-6">
        <ul className="mt-6 space-y-1">
          <li>
            <a
              href="#"
              className="block rounded-lg bg-merogreen px-4 py-2 text-sm font-medium text-gray-700"
            >
              Home
            </a>
          </li>
          <Link
            to={`/user/user_posts/${userId}`}
            className="block rounded-lg text-gray-500 hover:bg-merogreen px-4 py-2 text-sm font-medium"
          >
            My Posts
          </Link>
          <li>
            <Link
              to={"/user/games"}
              className="block rounded-lg px-4 py-2 text-sm font-medium text-gray-500 hover:bg-merogreen hover:text-gray-700"
            >
              Games
            </Link>
          </li>

          <li>
            <Link
              to={"/admin/game"}
              className="block rounded-lg px-4 py-2 text-sm font-medium text-gray-500 hover:bg-merogreen hover:text-gray-700"
            >
              Add Games
            </Link>
          </li>

          <li>
            <Link
              to={"/help"}
              className="block rounded-lg px-4 py-2 text-sm font-medium text-gray-500 hover:bg-merogreen hover:text-gray-700"
            >
              Help Center
            </Link>
          </li>
        </ul>
      </div>
      <div className="sticky inset-x-0 bottom-0 border-t border-backgeda">
        <a href="#" className="flex items-center gap-2 text-white bg-geda p-4">
          <img
            alt=""
            src={userDetails.profilePicture}
            className="size-10 rounded-full object-cover"
          />
          <div>
            <p className="text-xs">
              <strong className="block font-medium">{user.fullName}</strong>
              <span>{user.email}</span>
            </p>
          </div>
        </a>
      </div>
    </div>
  );
};

export default Sidebar;
