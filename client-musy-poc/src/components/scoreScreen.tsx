// score screen
import React from "react";

interface User {
  pseudo: string;
  score: number;
  previousPosition: number;
  currentPosition: number;
}

interface ScoreScreenProps {
  users: User[];
}

const ScoreScreen: React.FC<ScoreScreenProps> = ({ users }) => {
  const sortedUsers = [...users].sort((a, b) => b.score - a.score);

  return (
    <div className="my-8 w-full flex flex-col">
      <h1 className="text-4xl mb-8">Leaderboard</h1>
      {sortedUsers.map((user) => (
        <div key={user.pseudo} className="w-full flex justify-between">
          <div className="flex items-center gap-2">
            <div className="w-6">
              {user.previousPosition > 0 &&
                user.previousPosition > user.currentPosition && (
                  <svg
                    width="24"
                    height="24"
                    viewBox="0 0 24 24"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path
                      d="M3.00009 19.0001H21.0001C21.1823 18.9995 21.361 18.9492 21.5168 18.8547C21.6726 18.7601 21.7996 18.6249 21.8843 18.4635C21.9689 18.3021 22.008 18.1207 21.9972 17.9388C21.9864 17.7569 21.9262 17.5813 21.8231 17.4311L12.8231 4.43106C12.4501 3.89206 11.5521 3.89206 11.1781 4.43106L2.17809 17.4311C2.07391 17.581 2.01282 17.7566 2.00145 17.9389C1.99008 18.1211 2.02887 18.3029 2.1136 18.4647C2.19833 18.6264 2.32576 18.7618 2.48205 18.8562C2.63834 18.9506 2.81751 19.0003 3.00009 19.0001Z"
                      fill="#3CB949"
                    />
                  </svg>
                )}
              {user.previousPosition > 0 &&
                user.previousPosition < user.currentPosition && (
                  <svg
                    width="24"
                    height="24"
                    viewBox="0 0 24 24"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path
                      d="M20.9999 5.00006L2.99992 5.00006C2.81767 5.00063 2.63904 5.0509 2.48324 5.14544C2.32744 5.23998 2.20037 5.37523 2.11572 5.53661C2.03107 5.698 1.99203 5.87942 2.00281 6.06134C2.01359 6.24327 2.07379 6.4188 2.17692 6.56906L11.1769 19.5691C11.5499 20.1081 12.4479 20.1081 12.8219 19.5691L21.8219 6.56906C21.9261 6.41912 21.9872 6.24349 21.9986 6.06127C22.0099 5.87904 21.9711 5.69718 21.8864 5.53546C21.8017 5.37373 21.6742 5.23831 21.518 5.14392C21.3617 5.04953 21.1825 4.99977 20.9999 5.00006Z"
                      fill="#C42F2F"
                    />
                  </svg>
                )}
            </div>
            <div>{user.pseudo}</div>
          </div>
          <div>{user.score}</div>
        </div>
      ))}
    </div>
  );
};

export default ScoreScreen;
