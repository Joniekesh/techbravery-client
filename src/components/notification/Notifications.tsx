import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { toast } from "sonner";
import {
  Bell,
  CheckSquare,
  MessageSquare,
  FileText,
  Users,
  Calendar,
  AlertCircle,
  DollarSign,
  GitCommit,
  Bug,
  ArrowLeft,
  Check,
  Trash2,
} from "lucide-react";
import { INotification } from "@/types/notification";
import { format } from "timeago.js";
import { makeRequest } from "@/utils/makeRequest";
import { mutationOptions, useMutation } from "@tanstack/react-query";
import { useAppSelector } from "@/redux/hooks";
import { TextTabs } from "../shared/TextTabs";
import { useState } from "react";
import { queryClient } from "@/services/queryClient";

interface Props {
  notifications: any;
  setNotifications: React.Dispatch<React.SetStateAction<any>>;
  text: string;
  unread?: number;
  myNotifs: INotification[];
}

const Notifications = ({
  notifications,
  setNotifications,
  text,
  unread,
  myNotifs,
}: Props) => {
  const auth = useAppSelector((state) => state.auth);
  const userId = auth.user?.id;

  const [activeTab, setActiveTab] = useState("all");

  console.log("My Notifs:", myNotifs);
  console.log("Unread:", unread);

  const tabs = [
    { value: "all", label: `All (${myNotifs?.length})` },
    { value: "unread", label: `Unread (${unread})` },
    { value: "tasks", label: "Tasks" },
    { value: "messages", label: "Messages" },
    { value: "hr", label: "HR" },
  ];

  const newNotifsCount = myNotifs?.filter(
    (notif: INotification) => !notif.recipients.every((r) => r.isRead),
  ).length;

  const getIcon = (type: string) => {
    switch (type) {
      case "task":
        return <CheckSquare className="h-5 w-5 text-green-600" />;
      case "message":
        return <MessageSquare className="h-5 w-5 text-blue-600" />;
      case "file":
        return <FileText className="h-5 w-5 text-orange-600" />;
      case "team":
        return <Users className="h-5 w-5 text-purple-600" />;
      case "calendar":
        return <Calendar className="h-5 w-5 text-red-600" />;
      case "hr":
        return <DollarSign className="h-5 w-5 text-yellow-600" />;
      case "commit":
        return <GitCommit className="h-5 w-5 text-primary" />;
      case "bug":
        return <Bug className="h-5 w-5 text-red-600" />;
      default:
        return <Bell className="h-5 w-5" />;
    }
  };

  const getPriorityBadge = (priority: string) => {
    switch (priority) {
      case "high":
        return (
          <Badge variant="destructive" className="text-xs">
            High
          </Badge>
        );
      case "normal":
        return (
          <Badge variant="secondary" className="text-xs">
            Normal
          </Badge>
        );
      case "low":
        return (
          <Badge variant="outline" className="text-xs">
            Low
          </Badge>
        );
      default:
        return null;
    }
  };

  const markAsRead = async (id: string) => {
    const res = await makeRequest.put(`/notification/${id}/read`);
    return res.data;
  };

  const markAsReadMutation = useMutation({
    mutationFn: (id: string) => markAsRead(id),

    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: ["unread-count"],
      });

      queryClient.invalidateQueries({
        queryKey: ["my-notifications", userId],
      });
      toast.success("Notification has been marked as read");
    },

    onError: (error: any) => {
      toast.error("Failed to mark notification as read", error);
    },
  });

  const handleMarkAsRead = async (id: string) => {
    markAsReadMutation.mutate(id);
  };

  const handleMarkAllAsRead = async () => {
    await Promise.all(
      myNotifs
        .filter((notif) => !notif.recipients.every((r) => r.isRead))
        .map((notif) => markAsReadMutation.mutateAsync(notif.id)),
    );
    toast.success("All notifications have been marked as read");
  };

  const handleDelete = (id: string) => {
    setNotifications(notifications.filter((notif) => notif.id !== id));
    toast.success("Notification has been removed");
  };

  const handleDeleteAll = () => {
    setNotifications([]);
    toast.success("All notifications have been cleared");
  };

  const unreadCount = notifications.filter((n) => !n.read).length;
  const unreadNotifications = myNotifs.filter(
    (notif) => !notif.recipients.every((r) => r.isRead),
  );
  const readNotifications = notifications.filter((n) => n.read);

  return (
    <main className="">
      <div className="flex items-center justify-between mb-8">
        <div>
          <h1 className="text-4xl font-bold bg-gradient-to-r from-primary to-primary-glow bg-clip-text text-transparent flex items-center gap-3">
            <Bell className="h-8 w-8 text-primary" />
            Notifications
          </h1>
          <p className="text-muted-foreground mt-2">{text}</p>
        </div>
        <div className="flex gap-2">
          <Button variant="outline" onClick={handleMarkAllAsRead}>
            <Check className="h-4 w-4 mr-2" />
            Mark All Read
          </Button>
          <Button variant="outline" onClick={handleDeleteAll}>
            <Trash2 className="h-4 w-4 mr-2" />
            Clear All
          </Button>
        </div>
      </div>

      <Tabs
        value={activeTab}
        onValueChange={setActiveTab}
        className="space-y-6"
      >
        <TextTabs tabs={tabs} />

        {/* All Notifications */}
        <TabsContent value="all" className="space-y-3">
          {myNotifs?.length === 0 ? (
            <Card>
              <CardContent className="pt-6 text-center py-12">
                <Bell className="h-12 w-12 text-muted-foreground mx-auto mb-4" />
                <p className="text-muted-foreground">No notifications yet</p>
              </CardContent>
            </Card>
          ) : (
            myNotifs?.map((notification: INotification) => (
              <Card
                key={notification.id}
                className={`hover:shadow-lg transition-shadow ${
                  !notification.recipients.every((r) => r.isRead)
                    ? "border-primary/50 bg-accent/30"
                    : ""
                }`}
              >
                <CardContent className="pt-6">
                  <div className="flex items-start gap-4">
                    <div className="mt-1">
                      {getIcon(notification.notifType)}
                    </div>
                    <div className="flex-1 min-w-0">
                      <div className="flex items-start justify-between gap-2 mb-1">
                        <h3 className="font-semibold">{notification.title}</h3>
                        <div className="flex items-center gap-2">
                          {/* {getPriorityBadge(notification.priority)} */}
                          {!notification.recipients.every((r) => r.isRead) && (
                            <Badge className="bg-primary text-xs">New</Badge>
                          )}
                        </div>
                      </div>
                      <p className="text-sm text-muted-foreground mb-2">
                        {notification.description}
                      </p>
                      <div className="flex items-center justify-between">
                        <p className="text-xs text-muted-foreground">
                          {format(notification.createdAt)}
                        </p>
                        <div className="flex gap-2">
                          {!notification.recipients.every((r) => r.isRead) && (
                            <Button
                              size="sm"
                              variant="outline"
                              onClick={() => handleMarkAsRead(notification.id)}
                            >
                              <Check className="h-3 w-3 mr-1" />
                              Mark Read
                            </Button>
                          )}
                          <Button
                            size="sm"
                            variant="ghost"
                            onClick={() => handleDelete(notification.id)}
                          >
                            <Trash2 className="h-3 w-3" />
                          </Button>
                        </div>
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))
          )}
        </TabsContent>

        {/* Unread Notifications */}
        <TabsContent value="unread" className="space-y-3">
          {unreadNotifications.length === 0 ? (
            <Card>
              <CardContent className="pt-6 text-center py-12">
                <CheckSquare className="h-12 w-12 text-green-600 mx-auto mb-4" />
                <p className="text-muted-foreground">
                  All caught up! No unread notifications
                </p>
              </CardContent>
            </Card>
          ) : (
            unreadNotifications.map((notification) => (
              <Card
                key={notification.id}
                className="hover:shadow-lg transition-shadow border-primary/50 bg-accent/30"
              >
                <CardContent className="pt-6">
                  <div className="flex items-start gap-4">
                    <div className="mt-1">
                      {getIcon(notification.notifType)}
                    </div>
                    <div className="flex-1 min-w-0">
                      <div className="flex items-start justify-between gap-2 mb-1">
                        <h3 className="font-semibold">{notification.title}</h3>
                        <div className="flex items-center gap-2">
                          {/* {getPriorityBadge(notification.priority)} */}
                          <Badge className="bg-primary text-xs">New</Badge>
                        </div>
                      </div>
                      <p className="text-sm text-muted-foreground mb-2">
                        {notification.description}
                      </p>
                      <div className="flex items-center justify-between">
                        <p className="text-xs text-muted-foreground">
                          {format(notification.createdAt)}
                        </p>
                        <div className="flex gap-2">
                          <Button
                            size="sm"
                            variant="outline"
                            onClick={() => handleMarkAsRead(notification.id)}
                          >
                            <Check className="h-3 w-3 mr-1" />
                            Mark Read
                          </Button>
                          <Button
                            size="sm"
                            variant="ghost"
                            onClick={() => handleDelete(notification.id)}
                          >
                            <Trash2 className="h-3 w-3" />
                          </Button>
                        </div>
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))
          )}
        </TabsContent>

        {/* Task Notifications */}
        <TabsContent value="tasks" className="space-y-3">
          {notifications
            .filter((n) => n.type === "task" || n.type === "bug")
            .map((notification) => (
              <Card
                key={notification.id}
                className={`hover:shadow-lg transition-shadow ${
                  !notification.read ? "border-primary/50 bg-accent/30" : ""
                }`}
              >
                <CardContent className="pt-6">
                  <div className="flex items-start gap-4">
                    <div className="mt-1">{getIcon(notification.type)}</div>
                    <div className="flex-1 min-w-0">
                      <div className="flex items-start justify-between gap-2 mb-1">
                        <h3 className="font-semibold">{notification.title}</h3>
                        <div className="flex items-center gap-2">
                          {getPriorityBadge(notification.priority)}
                          {!notification.read && (
                            <Badge className="bg-primary text-xs">New</Badge>
                          )}
                        </div>
                      </div>
                      <p className="text-sm text-muted-foreground mb-2">
                        {notification.message}
                      </p>
                      <div className="flex items-center justify-between">
                        <p className="text-xs text-muted-foreground">
                          {notification.time}
                        </p>
                        <div className="flex gap-2">
                          {!notification.read && (
                            <Button
                              size="sm"
                              variant="outline"
                              onClick={() => handleMarkAsRead(notification.id)}
                            >
                              <Check className="h-3 w-3 mr-1" />
                              Mark Read
                            </Button>
                          )}
                          <Button
                            size="sm"
                            variant="ghost"
                            onClick={() => handleDelete(notification.id)}
                          >
                            <Trash2 className="h-3 w-3" />
                          </Button>
                        </div>
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
        </TabsContent>

        {/* Message Notifications */}
        <TabsContent value="messages" className="space-y-3">
          {notifications
            .filter((n) => n.type === "message" || n.type === "commit")
            .map((notification) => (
              <Card
                key={notification.id}
                className={`hover:shadow-lg transition-shadow ${
                  !notification.read ? "border-primary/50 bg-accent/30" : ""
                }`}
              >
                <CardContent className="pt-6">
                  <div className="flex items-start gap-4">
                    <div className="mt-1">{getIcon(notification.type)}</div>
                    <div className="flex-1 min-w-0">
                      <div className="flex items-start justify-between gap-2 mb-1">
                        <h3 className="font-semibold">{notification.title}</h3>
                        <div className="flex items-center gap-2">
                          {getPriorityBadge(notification.priority)}
                          {!notification.read && (
                            <Badge className="bg-primary text-xs">New</Badge>
                          )}
                        </div>
                      </div>
                      <p className="text-sm text-muted-foreground mb-2">
                        {notification.message}
                      </p>
                      <div className="flex items-center justify-between">
                        <p className="text-xs text-muted-foreground">
                          {notification.time}
                        </p>
                        <div className="flex gap-2">
                          {!notification.read && (
                            <Button
                              size="sm"
                              variant="outline"
                              onClick={() => handleMarkAsRead(notification.id)}
                            >
                              <Check className="h-3 w-3 mr-1" />
                              Mark Read
                            </Button>
                          )}
                          <Button
                            size="sm"
                            variant="ghost"
                            onClick={() => handleDelete(notification.id)}
                          >
                            <Trash2 className="h-3 w-3" />
                          </Button>
                        </div>
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
        </TabsContent>

        {/* HR Notifications */}
        <TabsContent value="hr" className="space-y-3">
          {notifications
            .filter((n) => n.type === "hr")
            .map((notification) => (
              <Card
                key={notification.id}
                className={`hover:shadow-lg transition-shadow ${
                  !notification.read ? "border-primary/50 bg-accent/30" : ""
                }`}
              >
                <CardContent className="pt-6">
                  <div className="flex items-start gap-4">
                    <div className="mt-1">{getIcon(notification.type)}</div>
                    <div className="flex-1 min-w-0">
                      <div className="flex items-start justify-between gap-2 mb-1">
                        <h3 className="font-semibold">{notification.title}</h3>
                        <div className="flex items-center gap-2">
                          {getPriorityBadge(notification.priority)}
                          {!notification.read && (
                            <Badge className="bg-primary text-xs">New</Badge>
                          )}
                        </div>
                      </div>
                      <p className="text-sm text-muted-foreground mb-2">
                        {notification.message}
                      </p>
                      <div className="flex items-center justify-between">
                        <p className="text-xs text-muted-foreground">
                          {notification.time}
                        </p>
                        <div className="flex gap-2">
                          {!notification.read && (
                            <Button
                              size="sm"
                              variant="outline"
                              onClick={() => handleMarkAsRead(notification.id)}
                            >
                              <Check className="h-3 w-3 mr-1" />
                              Mark Read
                            </Button>
                          )}
                          <Button
                            size="sm"
                            variant="ghost"
                            onClick={() => handleDelete(notification.id)}
                          >
                            <Trash2 className="h-3 w-3" />
                          </Button>
                        </div>
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
        </TabsContent>
      </Tabs>
    </main>
  );
};

export default Notifications;
