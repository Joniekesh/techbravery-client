import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { ArrowLeft } from "lucide-react";
import Notifications from "@/components/notification/Notifications";
import { useState } from "react";
import { makeRequest } from "@/utils/makeRequest";
import { useQuery } from "@tanstack/react-query";
import { INotification } from "@/types/notification";
import { notificationData } from "@/mockData";
import { useAppSelector } from "@/redux/hooks";
import Loader from "@/components/loader/Loader";

const InvestorNotification = () => {
  const navigate = useNavigate();
  const auth = useAppSelector((state) => state.auth);
  const userId = auth.user?.id;

  const [notifications, setNotifications] = useState(notificationData);

  const getMyNotifications = async () => {
    const res = await makeRequest.get("/notification/me");
    return res.data;
  };

  const getUnreadCount = async () => {
    const res = await makeRequest.get("/notification/unread/count");
    return res.data;
  };

  const { data: myNotifs = [], isLoading } = useQuery<INotification[]>({
    queryKey: ["my-notifications", userId],
    queryFn: getMyNotifications,
    enabled: !!userId,
  });

  const { data: unreadCount } = useQuery({
    queryKey: ["unread-count"],
    queryFn: getUnreadCount,
  });

  console.log("Unread Count:", unreadCount);

  if (isLoading) return <Loader type="bounce" />;

  return (
    <div className="min-h-screen flex flex-col bg-gradient-to-br from-background via-accent/20 to-background w-full">
      <main className="flex-1 container px-4 py-8 mt-20">
        <div className="mb-6">
          <Button
            variant="ghost"
            onClick={() => navigate("/employee-dashboard")}
          >
            <ArrowLeft className="h-4 w-4 mr-2" />
            Back to Dashboard
          </Button>
        </div>
        <Notifications
          notifications={notifications}
          setNotifications={setNotifications}
          myNotifs={myNotifs}
          unread={unreadCount}
          text="Investor notification text goes here"
        />
      </main>
    </div>
  );
};

export default InvestorNotification;
